#!/usr/bin/env node
const { execSync } = require("child_process");

let tags = {};
let res = execSync("grep -r --no-filename '^tags:' src").toString().split("\n");

res.forEach((line) => {
  let matches = line.matchAll(/"([a-zA-Z0-9-_]*)"/g);
  for (const match of matches) {
    let tag = match[1];
    if (tags[tag]) tags[tag] += 1;
    else tags[tag] = 1;
  }
});

Object.entries(tags).forEach(([tag, count]) => {
  console.log(`${tag} ${count}`);
});
