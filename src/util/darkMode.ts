export function setDarkMode() {
  const root = document.documentElement;
  root.classList.add("dark");
  root.classList.remove("light");
}

export function setLightMode() {
  const root = document.documentElement;
  root.classList.add("light");
  root.classList.remove("dark");
}

export function useMediaTheme() {
  const root = document.documentElement;
  root.classList.remove("light");
  root.classList.remove("dark");
}
