import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

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
      typography: () => ({
        enoch: {
          css: {
            "--tw-prose-body": "var(--color-white)",
            "--tw-prose-headings": "var(--color-black)",
            "--tw-prose-lead": "var(--color-black)",
            "--tw-prose-links": "var(--color-purple-600)",
            "--tw-prose-bold": "var(--color-black)",
            "--tw-prose-counters": "var(--color-black)",
            "--tw-prose-bullets": "var(--color-black)",
            "--tw-prose-hr": "var(--color-gray-400)",
            "--tw-prose-quotes": "var(--color-gray-400)",
            "--tw-prose-quote-borders": "var(--color-gray-200)",
            "--tw-prose-captions": "var(--color-black)",
            "--tw-prose-code": "var(--color-black)",
            "--tw-prose-pre-code": "var(--color-black)",
            "--tw-prose-pre-bg": "var(--color-black)",
            "--tw-prose-th-borders": "var(--color-gray-400)",
            "--tw-prose-td-borders": "var(--color-gray-400)",

            "--tw-prose-invert-body": "var(--color-black)",
            "--tw-prose-invert-headings": "var(--color-white)",
            "--tw-prose-invert-lead": "var(--color-white)",
            "--tw-prose-invert-links": "var(--color-purple-500)",
            "--tw-prose-invert-bold": "var(--color-white)",
            "--tw-prose-invert-counters": "var(--color-white)",
            "--tw-prose-invert-bullets": "var(--color-white)",
            "--tw-prose-invert-hr": "var(--color-gray-400)",
            "--tw-prose-invert-quotes": "var(--color-gray-400)",
            "--tw-prose-invert-quote-borders": "var(--color-gray-600)",
            "--tw-prose-invert-captions": "var(--color-white)",
            "--tw-prose-invert-code": "var(--color-white)",
            "--tw-prose-invert-pre-code": "var(--color-white)",
            "--tw-prose-invert-pre-bg": "var(--color-white)",
            "--tw-prose-invert-th-borders": "var(--color-gray-400)",
            "--tw-prose-invert-td-borders": "var(--color-gray-400)",
          },
        },
      }),
    },
  },
  plugins: [typography()],
} satisfies Config;
