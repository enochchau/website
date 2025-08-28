/* @jsxImportSource solid-js */
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

import { contentIdToViewTransitionName } from "~/util/contentIdToViewTransitionName";

import type { ByYear } from "../types";
import BlogHeader from "./BlogHeader";
import styles from "./BlogToC.module.css";

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

function buildFilterQueryParams(filters: string[]) {
  if (filters.length === 0) return "";
  return `?${FILTER_PARAM}=${encodeURIComponent(filters.join(","))}`;
}

export interface BlogToCProps {
  byYear: ByYear;
  initialYear?: string;
  initialFilters?: string[];
}
export default function BlogToC(props: BlogToCProps) {
  const [activeYear, setActiveYear] = createSignal(props.initialYear);
  const [filters, setFilters] = createSignal(props.initialFilters ?? []);

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
    if (!props.initialFilters) {
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
    if (!hasFilters && !activeYear()) return props.byYear;

    const filteredByYear = Object.entries(props.byYear).reduce<ByYear>(
      (filtered, [year, posts]) => {
        if (activeYear() && activeYear() !== year) {
          return filtered;
        }

        // filter by tags
        const filteredPosts =
          filters().length > 0
            ? posts.filter((post) => {
                const tagSet = new Set(post.tags);
                return filters().every((filter) => tagSet.has(filter));
              })
            : posts;

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
    <div class={styles.relative}>
      <Show when={filters().length > 0}>
        <div class={styles.tagRow}>
          {filters().length > 1 && (
            <Tag
              onClick={() => {
                setFilters([]);
              }}
              selected
              filterTag
            >
              clear all
            </Tag>
          )}
          <For each={filters()}>
            {(filter) => (
              <Tag
                onClick={() => removeFilter(filter)}
                selected
                closable
                filterTag
              >
                {filter}
              </Tag>
            )}
          </For>
        </div>
      </Show>
      <For
        each={Object.entries(filteredByYear()).sort(
          ([a], [b]) => parseInt(b) - parseInt(a)
        )}
      >
        {([year, posts]) => {
          const matches = activeYear() === year;
          return (
            <>
              <YearHeader
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(
                    { matches, year },
                    "",
                    e.currentTarget.href
                  );

                  if (matches) {
                    setActiveYear();
                  } else {
                    setActiveYear(year);
                  }
                }}
                year={year}
                matches={matches}
                filters={filters()}
              />
              <ul class={styles.blogList}>
                <For each={posts}>
                  {(post) => (
                    <li class={styles.blogItem}>
                      <a href={post.url} class={styles.blogAnchor}>
                        <div class={styles.blogContainer}>
                          <BlogHeader
                            style={{
                              "view-transition-name":
                                contentIdToViewTransitionName(post.id),
                            }}
                          >
                            {post.title}
                          </BlogHeader>
                          <p>{post.date}</p>
                          <p class={styles.blogReadingTime}>
                            {post.readingTime}
                          </p>
                        </div>
                      </a>
                      <div class={styles.tagContainer}>
                        <For each={post.tags}>
                          {(tag) => (
                            <Tag
                              title="click to filter posts"
                              onClick={() => addFilter(tag)}
                              selected={filters().includes(tag)}
                            >
                              {tag}
                            </Tag>
                          )}
                        </For>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </>
          );
        }}
      </For>
    </div>
  );
}

interface TagProps {
  children: JSX.Element;
  onClick?: JSX.EventHandler<HTMLSpanElement, MouseEvent>;
  selected?: boolean;
  title?: string;
  filterTag?: boolean;
  closable?: boolean;
}
function Tag(props: TagProps) {
  return (
    <button
      title={!props.selected ? props.title : undefined}
      classList={{ [styles.tag]: true, [styles.tagSelected]: props.selected }}
      onclick={props.onClick}
      disabled={!props.filterTag && props.selected}
    >
      {props.children} {props.closable && "×"}
    </button>
  );
}

interface YearHeaderProps {
  year: string;
  matches?: boolean;
  filters: string[];
  onClick: JSX.EventHandler<HTMLAnchorElement, MouseEvent>;
}
function YearHeader(props: YearHeaderProps) {
  const href = createMemo(() => {
    let href = !props.matches ? `/blog/${props.year}` : "/blog";
    href += buildFilterQueryParams(props.filters);
    return href;
  });

  return (
    <h1
      classList={{
        [styles.yearHeader]: true,
        [styles.yearHeaderMatches]: props.matches,
      }}
    >
      <a href={href()} onClick={props.onClick}>
        {props.year} {props.matches && "×"}
      </a>
    </h1>
  );
}
