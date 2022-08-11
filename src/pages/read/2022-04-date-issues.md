---
title: Date Issues
slug: date-issues
date: 6 April 2022
---

# Date Issues

## 6 April 2022

I found an interesting difference between Firefox and Chrome recently in this
very website.

```js
new Date("April 2022");
```

The snippet above will parse to an accurate date in Chrome and Node.js but it
will result in an invalid date in Firefox. This little difference broke the
table of contents for this site's blog.