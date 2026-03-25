import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { codeToImage } from "shiki-image";

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
  const codeBlockRe = /^```([a-z-]*)\n([\s\S]*?)\n```/gm;

  let i = 0;
  for (const match of content.matchAll(codeBlockRe)) {
    let lang = match[1];
    let code = match[2];
    let format = "webp";
    let buf = await codeToImage(code, {
      lang,
      format,
      theme: "one-dark-pro",
    });

    const fileName = `${filePath.replace(/\.mdx$/, "")}-${String(i).padStart(3, "0")}.${format}`;
    fs.writeFile(fileName, buf);

    i++;
  }
}
