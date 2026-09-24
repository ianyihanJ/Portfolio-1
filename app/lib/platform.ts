"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function isWindowsCompatibilityMode() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.platform === "windows"
  );
}

export function useWindowsCompatibilityMode() {
  return useSyncExternalStore(subscribe, isWindowsCompatibilityMode, () => false);
}
