import "solid-js";

import type { JSX } from "solid-js";

export default function BlogHeader(props: { children?: JSX.Element }) {
  return (
    <h2
      classList={{
        ["w-fit relative text-xl font-bold blog-title"]: true,
        "before:w-full before:bg-purple-500/30 before:absolute before:h-1 before:bottom-1 before:hover:h-2/3 before:rounded before:transition-all before:px-1 before:box-content before:-left-1":
          true,
      }}
    >
      {props.children}
    </h2>
  );
}
