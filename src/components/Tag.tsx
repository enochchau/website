/* @jsxImportSource solid-js */
import "solid-js";

import type { JSX } from "solid-js";

import styles from "./Tag.module.css";

export interface TagProps {
  children: JSX.Element;
  onClick?: JSX.EventHandler<HTMLSpanElement, MouseEvent>;
  selected?: boolean;
  title?: string;
  filterTag?: boolean;
  closable?: boolean;
  style?: JSX.CSSProperties;
}
export default function Tag(props: TagProps) {
  return (
    <button
      title={!props.selected ? props.title : undefined}
      classList={{ [styles.tag]: true, [styles.tagSelected]: props.selected }}
      onclick={props.onClick}
      disabled={!props.filterTag && props.selected}
      style={props.style}
    >
      {props.children} {props.closable && "×"}
    </button>
  );
}
