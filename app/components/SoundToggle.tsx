"use client";

import { useEffect, useRef, useState } from "react";
import { bind, play, setEnabled, setVolume } from "cuelume";

const SOUND_PREFERENCE_KEY = "yihan-portfolio-sound";

export function SoundToggle({ className = "" }: { className?: string }) {
  const [soundOn, setSoundOn] = useState(false);
  const disableTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(SOUND_PREFERENCE_KEY);
    const shouldEnable = storedPreference === "on";

    bind();
    setVolume(0.24);
    setEnabled(shouldEnable);
    const preferenceFrame = window.requestAnimationFrame(() => {
      setSoundOn(shouldEnable);
    });

    return () => {
      window.cancelAnimationFrame(preferenceFrame);
      if (disableTimer.current) clearTimeout(disableTimer.current);
    };
  }, []);

  const toggleSound = () => {
    const nextValue = !soundOn;
    setSoundOn(nextValue);
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, nextValue ? "on" : "off");

    if (nextValue) {
      if (disableTimer.current) clearTimeout(disableTimer.current);
      setEnabled(true);
      play("ready", { volume: 0.52 });
      return;
    }

    play("droplet", { volume: 0.42 });
    disableTimer.current = setTimeout(() => setEnabled(false), 180);
  };

  return (
    <button
      aria-label={`Turn sound ${soundOn ? "off" : "on"}`}
      aria-pressed={soundOn}
      className={`sound-toggle${className ? ` ${className}` : ""}${soundOn ? " is-on" : ""}`}
      onClick={toggleSound}
      type="button"
    >
      <span className="sound-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>Sound {soundOn ? "on" : "off"}</span>
    </button>
  );
}
