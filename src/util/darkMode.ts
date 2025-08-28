export function setDarkMode() {
  const body = document.body;
  body.classList.add("dark");
  body.classList.remove("light");
}

export function setLightMode() {
  const body = document.body;
  body.classList.add("light");
  body.classList.remove("dark");
}

export function useMediaTheme() {
  const body = document.body;
  body.classList.remove("light");
  body.classList.remove("dark");
}
