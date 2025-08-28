/* @jsxImportSource solid-js */
import "solid-js";

import type { JSX } from "solid-js";

export default function Button(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <button {...props}>{props.children}</button>;
}
