import "solid-js";

import type { JSX } from "solid-js";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
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
  const url = new URL(window.location.href);
  if (!value) url.searchParams.delete(FILTER_PARAM);
  else url.searchParams.set(FILTER_PARAM, value);
  history.replaceState(null, "", url);
}

export interface BlogToCProps {
  byYear: ByYear;
  year?: string;
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
    if (!props.defaultFilters) {
      queueMicrotask(() => {
        setFilters(getFilterParam());
      });
    }
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
    if (!hasFilters && !props.year) return props.byYear;

    const filteredByYear = Object.entries(props.byYear).reduce<ByYear>(
      (filtered, [year, posts]) => {
        if (props.year && props.year !== year) {
          return filtered;
        }

        // filter by tags
        const filteredPosts = posts.filter((post) => {
          if (filters().length === 0) return true;

          const tagSet = new Set(post.tags);
          return filters().every((filter) => tagSet.has(filter));
        });

        if (filteredPosts.length > 0) {
          filtered[year] = filteredPosts;
        }
        return filtered;
      },
      {},
    );
    return filteredByYear;
  });

  // navigate back to root `/blog` if we're on a filter subpath like `/blog/dev`
  createEffect(() => {
    if (filters().length === 0) {
      let [_, blog, ...rest] = window.location.pathname.split("/");
      if (rest.length > 0) {
        window.location.href = "/" + blog;
      }
    }
  });

  return (
    <div>
      <Show when={filters().length > 0}>
        <div class={styles["chosen-container"]}>
          <Tag
            onClick={() => {
              setFilters([]);
            }}
            selected
            chosen
          >
            clear all
          </Tag>
          <For each={filters()}>
            {(filter) => (
              <Tag
                onClick={() => removeFilter(filter)}
                selected
                chosen
                closable
              >
                {filter}
              </Tag>
            )}
          </For>
        </div>
      </Show>
      {Object.keys(filteredByYear())
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((year) => (
          <>
            <YearHeader
              year={year}
              matches={props.year === year}
              filters={filters()}
            />
            {filteredByYear()[year].map((post) => (
              <div class={styles.post}>
                <h4 class={styles.title}>
                  <a href={post.url}>{post.title}</a>
                </h4>
                <section>
                  <p>{post.date}</p>
                  <p class={styles.readtime}>{post.readingTime}</p>
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
  closable?: boolean;
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
      {props.children} {props.closable && "×"}
    </button>
  );
}

interface YearHeaderProps {
  year: string;
  matches?: boolean;
  filters: string[];
}
function YearHeader(props: YearHeaderProps) {
  const href = createMemo(() => {
    let href = !props.matches ? `/blog/${props.year}` : "/blog";
    if (props.filters.length > 0) {
      href += `?${FILTER_PARAM}=${encodeURIComponent(props.filters.join(","))}`;
    }
    return href;
  });

  return (
    <h1
      classList={{
        [styles.year]: true,
        [styles["year-match"]]: props.matches,
        [styles["year-nomatch"]]: !props.matches,
      }}
    >
      <a href={href()}>
        {props.year} {props.matches && "×"}
      </a>
    </h1>
  );
}
