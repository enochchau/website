import "solid-js";

import type { JSX } from "solid-js";

export default function Anchor(
  props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      {...props}
      class="underline transition-all decoration-transparent hover:decoration-purple-500 font-bold"
    >
      {props.children}
    </a>
  );
}
