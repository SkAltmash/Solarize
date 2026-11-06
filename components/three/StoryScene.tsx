"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, Lightformer } from "@react-three/drei";
import { makePanelTexture } from "./textures";
import { LAYERS } from "./layers";
import { pointer, story } from "../scroll-store";

// Real module proportions (1134 × 2278 mm), in metres.
const W = 1.134;
const L = 2.278;
const FRAME = 0.035;
const GAP_X = 0.06;
const GAP_Z = 0.06;

type Key = { pos: [number, number, number]; rot: [number, number, number]; scale: number; explode: number; array: number };

// One keyframe per story step. `wide` for landscape, `tall` for phones.
const KEYS: Record<"wide" | "tall", Key[]> = {
  wide: [
    { pos: [1.75, 0.05, 0], rot: [-0.32, -0.62, 0.1], scale: 1.18, explode: 0, array: 0 },
    { pos: [-1.8, 0, 0], rot: [0.12, 1.2, -0.06], scale: 1.18, explode: 0, array: 0 },
    { pos: [1.65, -0.15, 0], rot: [-0.95, -0.5, 0.12], scale: 0.95, explode: 1, array: 0 },
    { pos: [0, -0.75, 0], rot: [-1.08, 0, 0], scale: 0.6, explode: 0, array: 1 },
  ],
  tall: [
    { pos: [0, 0.95, 0], rot: [-0.32, -0.62, 0.1], scale: 0.72, explode: 0, array: 0 },
    { pos: [0, 0.95, 0], rot: [0.12, 1.2, -0.06], scale: 0.8, explode: 0, array: 0 },
    { pos: [0, 0.85, 0], rot: [-0.95, -0.5, 0.12], scale: 0.62, explode: 1, array: 0 },
    { pos: [0, 0.7, 0], rot: [-1.08, 0, 0], scale: 0.4, explode: 0, array: 1 },
  ],
};

const smooth = (e0: number, e1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Interpolate keyframes with a hold at each key so each story step can be read. */
function sample(keys: Key[], p: number): Key {
  const s = p * (keys.length - 1);
  const i = Math.min(Math.floor(s), keys.length - 2);
  const t = smooth(0.25, 0.85, s - i);
  const a = keys[i];
  const b = keys[i + 1];
  const l = THREE.MathUtils.lerp;
  return {
    pos: [l(a.pos[0], b.pos[0], t), l(a.pos[1], b.pos[1], t), l(a.pos[2], b.pos[2], t)],
    rot: [l(a.rot[0], b.rot[0], t), l(a.rot[1], b.rot[1], t), l(a.rot[2], b.rot[2], t)],
    scale: l(a.scale, b.scale, t),
    explode: l(a.explode, b.explode, t),
    array: l(a.array, b.array, t),
  };
}

function useMaterials() {
  return useMemo(() => {
    const cells = makePanelTexture();
    return {
      face: new THREE.MeshPhysicalMaterial({
        map: cells,
        metalness: 0.1,
        roughness: 0.42,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 0.55,
      }),
      frame: new THREE.MeshStandardMaterial({ color: "#b4bcc6", metalness: 0.9, roughness: 0.3 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#cfe6ff",
        transparent: true,
        opacity: 0.05,
        roughness: 0.02,
        metalness: 0,
        clearcoat: 1,
        depthWrite: false,
      }),
      eva: new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0, roughness: 0.5, depthWrite: false }),
      back: new THREE.MeshStandardMaterial({ color: "#f4f6f8", roughness: 0.75 }),
      dark: new THREE.MeshStandardMaterial({ color: "#1b1f24", roughness: 0.45 }),
      rail: new THREE.MeshStandardMaterial({ color: "#a9b1bb", metalness: 0.85, roughness: 0.35 }),
    };
  }, []);
}
type Mats = ReturnType<typeof useMaterials>;

function Frame({ mats }: { mats: Mats }) {
  return (
    <group>
      {[L / 2 - FRAME / 2, -L / 2 + FRAME / 2].map((z) => (
        <mesh key={z} position={[0, 0, z]} material={mats.frame} castShadow>
          <boxGeometry args={[W, 0.04, FRAME]} />
        </mesh>
      ))}
      {[W / 2 - FRAME / 2, -W / 2 + FRAME / 2].map((x) => (
        <mesh key={x} position={[x, 0, 0]} material={mats.frame} castShadow>
          <boxGeometry args={[FRAME, 0.04, L - FRAME * 2]} />
        </mesh>
      ))}
    </group>
  );
}

/** A finished module, used for the array copies. */
function Module({ mats }: { mats: Mats }) {
  return (
    <group>
      <Frame mats={mats} />
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mats.face}>
        <planeGeometry args={[W - FRAME * 2, L - FRAME * 2]} />
      </mesh>
      <mesh position={[0, -0.012, 0]} material={mats.back} castShadow>
        <boxGeometry args={[W - FRAME * 2, 0.01, L - FRAME * 2]} />
      </mesh>
    </group>
  );
}

const SPREAD = [0.95, 0.65, 0.35, 0.08, -0.2, -0.48, -0.78];

function HeroPanel({
  mats,
  explode,
  labels,
}: {
  mats: Mats;
  explode: React.RefObject<number>;
  labels: React.RefObject<HTMLDivElement | null>;
}) {
  const layers = useRef<(THREE.Group | null)[]>([]);
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  // Translucent layers only show once the panel opens up.
  const fade = useRef({ glass: mats.glass, eva: mats.eva });
  const inner = W - FRAME * 2;
  const innerL = L - FRAME * 2;
  const rest = [0.022, 0.016, 0.012, 0.008, -0.012, 0, -0.03];

  useFrame(() => {
    const e = explode.current ?? 0;
    fade.current.glass.opacity = 0.05 + 0.25 * e;
    fade.current.eva.opacity = 0.45 * e;
    const tags = labels.current?.children;
    const o = smooth(0.6, 1, e);
    layers.current.forEach((g, i) => {
      if (!g) return;
      g.position.y = THREE.MathUtils.lerp(rest[i], SPREAD[i], e);
      const el = tags?.[i] as HTMLElement | undefined;
      if (!el) return;
      el.style.opacity = String(o);
      if (o <= 0) return;
      g.updateWorldMatrix(true, false);
      v.set(W / 2 + 0.1, 0, -L / 2 + 0.25);
      g.localToWorld(v).project(camera);
      el.style.transform = `translate3d(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px, 0) translateY(-50%)`;
    });
  });

  const parts: React.ReactNode[] = [
    <mesh key="glass" material={mats.glass}>
      <boxGeometry args={[inner, 0.008, innerL]} />
      <Edges color="#9fb6cc" />
    </mesh>,
    <mesh key="eva1" material={mats.eva}>
      <boxGeometry args={[inner, 0.004, innerL]} />
      <Edges color="#c9d3dc" />
    </mesh>,
    <mesh key="cells" rotation={[-Math.PI / 2, 0, 0]} material={mats.face}>
      <planeGeometry args={[inner, innerL]} />
    </mesh>,
    <mesh key="eva2" material={mats.eva}>
      <boxGeometry args={[inner, 0.004, innerL]} />
      <Edges color="#c9d3dc" />
    </mesh>,
    <mesh key="back" material={mats.back} castShadow>
      <boxGeometry args={[inner, 0.01, innerL]} />
    </mesh>,
    <Frame key="frame" mats={mats} />,
    <group key="jbox" position={[0, 0, -L / 2 + 0.32]}>
      <mesh material={mats.dark} castShadow>
        <boxGeometry args={[0.18, 0.035, 0.12]} />
      </mesh>
      {[-0.06, 0.06].map((x) => (
        <mesh key={x} position={[x, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} material={mats.dark}>
          <cylinderGeometry args={[0.008, 0.008, 0.3]} />
        </mesh>
      ))}
    </group>,
  ];

  return (
    <>
      {parts.map((part, i) => (
        <group key={LAYERS[i].key} ref={(g) => void (layers.current[i] = g)}>
          {part}
        </group>
      ))}
    </>
  );
}

// 3 × 2 array; the hero panel takes the top-centre slot.
const SLOTS: [number, number][] = [
  [-1, -0.5],
  [1, -0.5],
  [-1, 0.5],
  [0, 0.5],
  [1, 0.5],
];

function Story({ labels, onReady }: { labels: React.RefObject<HTMLDivElement | null>; onReady?: () => void }) {
  const mats = useMaterials();
  const root = useRef<THREE.Group>(null);
  const hero = useRef<THREE.Group>(null);
  const copies = useRef<(THREE.Group | null)[]>([]);
  const rails = useRef<THREE.Group>(null);
  const explode = useRef(0);
  const smoothP = useRef(0);
  const { size, gl, scene, camera } = useThree();

  // Signal readiness once textures are built and shaders compiled, so the page can drop its loader.
  useEffect(() => {
    gl.compile(scene, camera);
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => onReady?.());
    });
    return () => cancelAnimationFrame(raf);
  }, [gl, scene, camera, onReady]);

  useFrame(({ clock }, dt) => {
    smoothP.current = THREE.MathUtils.damp(smoothP.current, story.p, 5, dt);
    const keys = size.width / size.height < 1.05 ? KEYS.tall : KEYS.wide;
    const k = sample(keys, smoothP.current);
    const t = clock.elapsedTime;
    const g = root.current;
    if (!g) return;

    const idle = 1 - k.array;
    g.position.set(k.pos[0], k.pos[1] + Math.sin(t * 0.8) * 0.05 * idle, k.pos[2]);
    g.rotation.set(k.rot[0] + pointer.y * 0.08 * idle, k.rot[1] + pointer.x * 0.18 * idle + Math.sin(t * 0.4) * 0.04 * idle, k.rot[2]);
    g.scale.setScalar(k.scale);
    explode.current = k.explode;

    const pitchX = W + GAP_X;
    const pitchZ = L + GAP_Z;
    if (hero.current) hero.current.position.set(0, 0, -0.5 * pitchZ * k.array);
    copies.current.forEach((c, i) => {
      if (!c) return;
      const local = smooth(i * 0.1, 0.5 + i * 0.1, k.array);
      const [sx, sz] = SLOTS[i];
      c.visible = local > 0.001;
      c.position.set(sx * pitchX * (1 + (1 - local) * 2.5), (1 - local) * 1.2, sz * pitchZ * (1 + (1 - local) * 1.5));
      c.scale.setScalar(Math.max(local, 0.001));
    });
    if (rails.current) {
      rails.current.visible = k.array > 0.01;
      rails.current.scale.x = Math.max(smooth(0.4, 1, k.array), 0.001);
    }
  });

  return (
    <group ref={root}>
      {/* Panel lies in XZ with its face +Y; tip it up to face the camera. */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group ref={hero}>
          <HeroPanel mats={mats} explode={explode} labels={labels} />
        </group>
        {SLOTS.map((_, i) => (
          <group key={i} ref={(c) => void (copies.current[i] = c)} visible={false}>
            <Module mats={mats} />
          </group>
        ))}
        <group ref={rails} visible={false}>
          {[-1, -0.35, 0.35, 1].map((f) => (
            <mesh key={f} position={[0, -0.06, f * (L + GAP_Z) * 0.75]} material={mats.rail}>
              <boxGeometry args={[3 * (W + GAP_X) + 0.3, 0.04, 0.04]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export default function StoryScene({ active = true, onReady }: { active?: boolean; onReady?: () => void }) {
  const labels = useRef<HTMLDivElement>(null);
  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 32 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 6, 6]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 2, 3]} intensity={0.6} color="#e8f5dc" />
        <Environment resolution={512} frames={1}>
          <color attach="background" args={["#f2f5ef"]} />
          <Lightformer intensity={4} position={[0, 6, 6]} rotation-x={-Math.PI / 4} scale={[14, 3, 1]} />
          <Lightformer intensity={2.5} position={[-7, 1, 2]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
          <Lightformer intensity={2} color="#cfeeb4" position={[7, -1, 2]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer intensity={1.5} position={[0, -4, 4]} rotation-x={Math.PI / 2} scale={[12, 2, 1]} />
        </Environment>
        <Story labels={labels} onReady={onReady} />
        <ContactShadows position={[0, -2.3, 0]} scale={14} blur={3} far={5} opacity={0.28} color="#0f2e0a" />
      </Canvas>
      <div ref={labels} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {LAYERS.map((l) => (
          <div key={l.key} className="absolute left-0 top-0 flex items-center gap-2 whitespace-nowrap opacity-0 will-change-transform">
            <span className="h-px w-5 bg-brand sm:w-7" />
            <span className="rounded-full border border-line bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-text shadow-sm backdrop-blur">
              <span className="sm:hidden">{l.short}</span>
              <span className="hidden sm:inline">{l.name}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
