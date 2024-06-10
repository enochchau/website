import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: [
    "variant",
    [
      "@media (prefers-color-scheme: dark) { &:not(.light *) }",
      "&:is(.dark *)",
    ],
  ],
  theme: {
    extend: {
      typography: ({ theme }: PluginUtils) => ({
        enoch: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.black"),
            "--tw-prose-lead": theme("colors.black"),
            "--tw-prose-links": theme("colors.purple[600]"),
            "--tw-prose-bold": theme("colors.black"),
            "--tw-prose-counters": theme("colors.black"),
            "--tw-prose-bullets": theme("colors.black"),
            "--tw-prose-hr": theme("colors.gray[400]"),
            "--tw-prose-quotes": theme("colors.gray[400]"),
            "--tw-prose-quote-borders": theme("colors.gray[200]"),
            "--tw-prose-captions": theme("colors.black"),
            "--tw-prose-code": theme("colors.black"),
            "--tw-prose-pre-code": theme("colors.black"),
            "--tw-prose-pre-bg": theme("colors.black"),
            "--tw-prose-th-borders": theme("colors.gray[400]"),
            "--tw-prose-td-borders": theme("colors.gray[400]"),

            "--tw-prose-invert-body": theme("colors.black"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.white"),
            "--tw-prose-invert-links": theme("colors.purple[500]"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.white"),
            "--tw-prose-invert-bullets": theme("colors.white"),
            "--tw-prose-invert-hr": theme("colors.gray[400]"),
            "--tw-prose-invert-quotes": theme("colors.gray[400]"),
            "--tw-prose-invert-quote-borders": theme("colors.gray[600]"),
            "--tw-prose-invert-captions": theme("colors.white"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.white"),
            "--tw-prose-invert-pre-bg": theme("colors.white"),
            "--tw-prose-invert-th-borders": theme("colors.gray[400]"),
            "--tw-prose-invert-td-borders": theme("colors.gray[400]"),
          },
        },
      }),
    },
    colors: {
      white: "#f0f0f0",
      black: "#1a1b1d",
      purple: {
        500: "#a86be7",
        600: "#6f1cc5",
      },
      gray: {
        100: "#ebebeb",
        200: "#dddddd",
        250: "#c9c9c9",
        300: "#a2a3a8",
        400: "#8f96a1",
        500: "#666666",
        600: "#444444",
        700: "#262626",
        800: "#141414",
      },
      transparent: "transparent",
    },
  },
  plugins: [typography()],
} satisfies Config;
