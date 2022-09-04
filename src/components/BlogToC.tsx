/** @jsxImportSource solid-js */
import "solid-js";

import { createMemo, createSignal, For, JSX, Show } from "solid-js";

import type { ByYear } from "../types";
import styles from "./BlogToC.module.scss";

export interface BlogToCProps {
  byYear: ByYear;
}
export default function BlogToC(props: BlogToCProps) {
  const [filters, setFilters] = createSignal<string[]>([]);

  const addFilter = (filter: string) => {
    setFilters((filters) => {
      return Array.from(new Set([...filters, filter]));
    });
  };

  const removeFilter = (filter: string) => {
    setFilters((filters) => {
      const filtersSet = new Set(filters);
      filtersSet.delete(filter);
      return Array.from(filtersSet);
    });
  };

  const filteredByYear = createMemo(() => {
    const hasFilters = filters().length > 0;
    if (!hasFilters) return props.byYear;

    const filteredByYear = Object.entries(props.byYear).reduce<ByYear>(
      (filtered, [year, posts]) => {
        const filteredPosts = posts.filter((post) => {
          const tagSet = new Set(post.tags);
          return filters().every((filter) => tagSet.has(filter));
        });

        if (filteredPosts.length > 0) {
          filtered[year] = filteredPosts;
        }
        return filtered;
      },
      {}
    );
    return filteredByYear;
  });

  return (
    <div>
      <Show when={filters().length > 0}>
        <div class={styles["tags-container"]}>
          <Tag onClick={() => setFilters([])} selected>
            clear all
          </Tag>
          <For each={filters()}>
            {(filter) => (
              <Tag onClick={() => removeFilter(filter)} selected>
                {filter} ×
              </Tag>
            )}
          </For>
        </div>
      </Show>
      {Object.keys(filteredByYear())
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((year) => (
          <>
            <h1>{year}</h1>
            {filteredByYear()[year].map((post) => (
              <div class={styles.post}>
                <h4 class={styles.title}>
                  <a href={post.url}>{post.title}</a>
                </h4>
                <section>
                  <p>{post.date}</p>
                  <p class={styles.readtime}>{post.minutesRead}</p>
                  <div class={styles["tags-container"]}>
                    {post.tags?.map((tag) => (
                      <>
                        <Tag
                          title="click to filter posts"
                          onClick={() => addFilter(tag)}
                          selected={filters().includes(tag)}
                        >
                          {tag}
                        </Tag>
                      </>
                    ))}
                  </div>
                </section>
              </div>
            ))}
          </>
        ))}
    </div>
  );
}

interface TagProps {
  children: JSX.Element;
  onClick?: JSX.EventHandler<HTMLSpanElement, MouseEvent>;
  selected?: boolean;
  title?: string;
}
function Tag(props: TagProps) {
  return (
    <button
      title={props.title}
      classList={{ [styles.tag]: true, [styles["selected"]]: props.selected }}
      onclick={props.onClick}
    >
      <p>{props.children}</p>
    </button>
  );
}
