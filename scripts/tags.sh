#!/bin/bash

count_tags() {
    grep -rh --include="*.md" --include="*.mdx" "^tags:" src | \
        grep -o '"[a-zA-Z0-9_\-]*"' | \
        tr -d '"' | \
        sort | \
        uniq -c | \
        awk '{print $2, $1}'
}

if [[ "$1" == "--alpha" ]]; then
  count_tags | sort
else
  count_tags | sort -k2,2nr
fi

