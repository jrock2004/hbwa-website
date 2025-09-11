export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "hbwa-theme";

export function getSystemPreference(): "light" | "dark" {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemPreference() : theme;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function loadTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return saved ?? "system";
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}
