/* @jsxImportSource solid-js */
import "solid-js";

import type { JSX } from "solid-js";

import styles from "./BlogHeader.module.css";

export default function BlogHeader(props: {
  style?: JSX.CSSProperties;
  children?: JSX.Element;
}) {
  return (
    <h2 style={props.style} class={styles.header}>
      {props.children}
    </h2>
  );
}
