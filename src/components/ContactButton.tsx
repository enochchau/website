/** @jsxImportSource solid-js */
import "solid-js";

import { createSignal, Show } from "solid-js";

export default function ContactButton() {
  const [show, setShow] = createSignal(false);

  return (
    <Show
      when={show()}
      fallback={
        <button onclick={() => setShow((show) => !show)}>Show Contact</button>
      }
    >
      <p>
        <a href="mailto: enoch965@gmail.com">enoch965@gmail.com</a>
      </p>
    </Show>
  );
}
