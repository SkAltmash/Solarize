import * as THREE from "three";

/**
 * Realistic 144 half-cut monocrystalline module face:
 * 6 columns × 24 half-cells, split in two blocks, white backsheet in the gaps,
 * multi-busbar lines, faint fingers and per-cell tone variation.
 */
export function makePanelTexture() {
  const W = 1024;
  const H = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#e9edf1";
  ctx.fillRect(0, 0, W, H);

  const m = 22;
  const gx = 7;
  const gy = 5;
  const mid = 18;
  const cols = 6;
  const rowsPerBlock = 12;
  const cw = (W - m * 2 - gx * (cols - 1)) / cols;
  const ch = (H - m * 2 - mid - gy * (rowsPerBlock * 2 - 2)) / (rowsPerBlock * 2);
  const k = cw * 0.09;

  let seed = 3;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let block = 0; block < 2; block++) {
    for (let r = 0; r < rowsPerBlock; r++) {
      const y = m + block * (rowsPerBlock * (ch + gy) - gy + mid) + r * (ch + gy);
      for (let c = 0; c < cols; c++) {
        const x = m + c * (cw + gx);
        const tone = rnd() * 10 - 5;
        const g = ctx.createLinearGradient(x, y, x + cw, y + ch);
        g.addColorStop(0, `hsl(221 78% ${21 + tone * 0.4}%)`);
        g.addColorStop(1, `hsl(224 85% ${12 + tone * 0.3}%)`);
        ctx.fillStyle = g;
        // chamfer the corners away from the half-cut line
        const top = r % 2 === 0;
        ctx.beginPath();
        if (top) {
          ctx.moveTo(x + k, y);
          ctx.lineTo(x + cw - k, y);
          ctx.lineTo(x + cw, y + k);
          ctx.lineTo(x + cw, y + ch);
          ctx.lineTo(x, y + ch);
          ctx.lineTo(x, y + k);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(x + cw, y);
          ctx.lineTo(x + cw, y + ch - k);
          ctx.lineTo(x + cw - k, y + ch);
          ctx.lineTo(x + k, y + ch);
          ctx.lineTo(x, y + ch - k);
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(160,185,230,0.07)";
        for (let fy = y + 3; fy < y + ch; fy += 4) ctx.fillRect(x, fy, cw, 1);

        ctx.fillStyle = "rgba(225,232,245,0.55)";
        for (let b = 1; b <= 9; b++) ctx.fillRect(x + (cw * b) / 10 - 0.75, y - gy / 2, 1.5, ch + gy);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}
