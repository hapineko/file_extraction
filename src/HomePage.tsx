import { useState } from "react";

interface Window {
  darkMode: {
    toggle: () => boolean;
    system: () => void;
  }
}
declare var window: Window;

export default function HomePage() {
  const [mode, setMode] = useState("");

  async function toggleDarkMode() {
    const isDarkMode = await window.darkMode.toggle();
    const isMode = isDarkMode ? "Dark" : "Light";
    setMode(isMode);
  }

  async function resetToSystem() {
    await window.darkMode.system();
    setMode("System");
  }

  return (
    <div>
      <h1 className="bg-slate-700">Hello World!</h1>
      <p>
        Current theme source: <strong id="theme-source">{mode}</strong>
      </p>

      <button id="toggle-dark-mode" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      <button id="reset-to-system" onClick={resetToSystem}>
        Reset to System Theme
      </button>
    </div>
  );
}
