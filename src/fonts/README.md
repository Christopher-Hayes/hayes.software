# Fonts

Fonts are compressed with cowtools... sorry I mean `fonttools`.

Converting from less compressed format, like `otf`, to `woff2`:

```bash
woff2_compress font.otf
```

Fonts are further compressed by dropping all characters this site is unlikely to use. Only Latin characters are kept for English.

```bash
pyftsubset fonts/rakkas/Rakkas-Regular.woff2 --unicodes="U+0020-007E" --flavor=woff2 --output-file=fonts/minified/rakkas/rakkas-regular.min.woff
```

The result of this compression brings each font from ~90 KB to ~10 KB, a 90% reduction in font size. This is important since apart from images, fonts are the heaviest thing on the site and must load to show page content.
