// Shared mutable state between the scroll handlers (DOM) and the 3D render loop.
// Plain objects on purpose: updated every frame without React re-renders.
export const story = { p: 0 };
export const pointer = { x: 0, y: 0 };
