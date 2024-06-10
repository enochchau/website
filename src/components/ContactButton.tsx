import "solid-js";

import { createSignal, Show } from "solid-js";

import Anchor from "./Anchor";
import Button from "./Button";

export default function ContactButton() {
  const [show, setShow] = createSignal(false);

  return (
    <Show
      when={show()}
      fallback={
        <Button onclick={() => setShow((show) => !show)}>Show Contact</Button>
      }
    >
      <p>
        <Anchor href="mailto: enoch965@gmail.com">enoch965@gmail.com</Anchor>
      </p>
    </Show>
  );
}
