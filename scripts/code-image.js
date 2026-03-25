import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import sanitize from "sanitize-filename";
import { codeToImage } from "shiki-image";

const SHIKI_THEME = "one-dark-pro";

/**
 * TODO: Use a nerd-font
 */

const repoRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const blogDir = path.join(repoRoot, "src/content/blog");

let files = await fs.readdir(blogDir, { recursive: true });
const mdxFiles = files.filter((file) => path.extname(file) === ".mdx");
let promises = [];
for (const mdx of mdxFiles) {
  promises.push(createCodeImageForMdx(path.join(blogDir, mdx)));
}

await Promise.all(promises);

/**
 * @param {string} filePath
 */
async function createCodeImageForMdx(filePath) {
  let file = await fs.readFile(filePath);
  let content = file.toString();
  const hasCover = /^---\s*\n[\s\S]*?\ncover:\s*\S+[\s\S]*?\n---/m.test(
    content,
  );

  // skip generation if there's already a cover image
  if (hasCover) return;

  const codeBlockRe = /^```([a-z-]*)\n([\s\S]*?)\n```/gm;

  let i = 0;
  for (const match of content.matchAll(codeBlockRe)) {
    let lang = match[1];
    let code = match[2];
    let format = "webp";
    let buf = await codeToImage(code, {
      lang,
      format,
      theme: SHIKI_THEME,
    });
    let preview = sanitize(code.slice(0, 30).replace(/\s/g, "")).slice(0, 12);
    const fileName = path.join(
      path.dirname(filePath),
      `code-image-${String(i).padStart(3, "0")}-${lang}-${preview}.${format}`,
    );
    fs.writeFile(fileName, buf);
    i++;
  }
}
