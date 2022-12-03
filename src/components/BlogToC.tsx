/** @jsxImportSource solid-js */
import "solid-js";

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  onMount,
  Show,
} from "solid-js";

import type { ByYear } from "../types";
import styles from "./BlogToC.module.scss";

const FILTER_PARAM = "f";

/**
 * Get the filter query param in the URL
 * @returns filter query param
 */
function getFilterParam() {
  const searchParams = new URLSearchParams(window.location.search);
  const filterParam = searchParams.get(FILTER_PARAM);
  return filterParam?.split(",") ?? [];
}

/**
 * Set the filter query param in the URL
 * @param value - filter param value
 */
function setFilterParam(value: string) {
  const url = new URL(window.location as unknown as string);
  if (!value) url.searchParams.delete(FILTER_PARAM);
  else url.searchParams.set(FILTER_PARAM, value);
  history.replaceState(null, "", url);
}

export interface BlogToCProps {
  byYear: ByYear;
  defaultFilters?: string[];
}
export default function BlogToC(props: BlogToCProps) {
  const [filters, setFilters] = createSignal(props.defaultFilters ?? []);

  // skip the first effect running so we don't collide with onMount
  createEffect((startEffect) => {
    const currFilteres = filters();

    if (startEffect) {
      // update the url search params when filters change
      setFilterParam(currFilteres.join(","));
    }

    return true;
  }, false);

  onMount(() => {
    // check the url search params and update filters on mount
    // this is the equivalent of `useLayoutEffect`
    queueMicrotask(() => {
      setFilters(getFilterParam());
    });
  });

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
        <div class={styles["chosen-container"]}>
          <Tag onClick={() => setFilters([])} selected chosen>
            clear all
          </Tag>
          <For each={filters()}>
            {(filter) => (
              <Tag onClick={() => removeFilter(filter)} selected chosen>
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
  chosen?: boolean; // chosen at the top of the toc
  title?: string;
}
function Tag(props: TagProps) {
  return (
    <button
      title={!props.selected ? props.title : undefined}
      classList={{
        [styles.tag]: true,
        [styles["selected"]]: props.selected,
        [styles["chosen-filter"]]: props.chosen,
      }}
      onclick={props.onClick}
    >
      <p>{props.children}</p>
    </button>
  );
}
