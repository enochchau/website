/* @jsxImportSource solid-js */
import "solid-js";

import { createMemo, createSignal, Show } from "solid-js";

import emailGif from "../assets/email.gif";
import Anchor from "./Anchor";
import Button from "./Button";
import styles from "./ContactButton.module.css";

export default function ContactButton() {
  const [show, setShow] = createSignal(false);
  const email = createMemo(() => {
    const asCharCode = [
      101, 110, 111, 99, 104, 57, 54, 53, 64, 103, 109, 97, 105, 108, 46, 99,
      111, 109,
    ];

    if (show()) {
      return asCharCode
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
    } else {
      return "";
    }
  });

  return (
    <div class={styles.container}>
      <img
        src={emailGif.src}
        alt="email-gif"
        width={emailGif.width}
        height={emailGif.height}
      />

      <Show
        when={show()}
        fallback={
          <Button onclick={() => setShow((show) => !show)}>Show Contact</Button>
        }
      >
        <p>
          <Anchor href={"mailto: " + email()}>{email()}</Anchor>
        </p>
      </Show>
    </div>
  );
}
