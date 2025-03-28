/* @jsxImportSource solid-js */
import "solid-js";

import type { JSX } from "solid-js";

export default function Button(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      class="rounded dark:bg-gray-500 p-2 font-bold dark:hover:bg-gray-600 transition-all bg-gray-200 hover:bg-gray-300 h-fit"
      {...props}
    >
      {props.children}
    </button>
  );
}
