#!/usr/bin/env bash
for pic in *.jpg; do
  magick "$pic" "$(basename "$pic" .jpg).avif"
done
