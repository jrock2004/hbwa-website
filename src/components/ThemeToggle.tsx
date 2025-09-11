import { useEffect, useState } from "react";
import { type Theme, applyTheme, loadTheme, saveTheme } from "../lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
    applyTheme(t);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => theme === "system" && applyTheme("system");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  return (
    <div className="inline-flex items-center gap-2">
      <label className="text-muted-foreground text-sm">Theme</label>
      <select
        className="border-border bg-background rounded-md border px-2 py-1"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
