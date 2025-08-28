/* @jsxImportSource solid-js */
import "solid-js";

import type { JSX } from "solid-js";

import styles from "./Anchor.module.css";

export default function Anchor(
  props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a {...props} class={styles.anchor}>
      {props.children}
    </a>
  );
}
