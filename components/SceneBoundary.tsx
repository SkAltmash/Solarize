"use client";

import { Component, type ReactNode } from "react";

/** If WebGL is unavailable the scene throws; keep the page alive and let the loader finish. */
export default class SceneBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
