import "solid-js";

import { createSignal, Show } from "solid-js";

import emailGif from "../assets/email.gif";
import Anchor from "./Anchor";
import Button from "./Button";

export default function ContactButton() {
  const [show, setShow] = createSignal(false);

  return (
    <div class="flex items-center gap-3">
      <img src={emailGif.src} alt='email-gif' width={emailGif.width} height={emailGif.height}/>

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
    </div>
  );
}
