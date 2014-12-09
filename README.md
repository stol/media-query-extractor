#media-query-extractor

Groups css rules by media queries and extracts them to different files

## Warning

Using this tool will change the position of the css rules in your files. So if you rely on properties overwriting, it will mess your styles. 

This tool can only be used when you master your css files, using the right methodology (BEM), with low specificity.

## Example

```css
/* style.css */
a { text-decoration: underline; }
p { padding: 10px 0; }

@media screen and (min-width: 480px) {
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
}
@media screen and (min-width: 480px) {
    p { padding: 15px 0; }
}
@media screen and (min-width: 990px) {
    p { padding: 20px 0; }
}
```

---

**Grouping only. All @media rules are grouped and output in ``output.css``**

```bash
$ media-query-extractor style.css output.css
```

```css
/* output.css */
a { text-decoration: underline; }
p { padding: 10px 0; }

@media screen and (min-width: 480px) {
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
    p { padding: 15px 0; }
}

@media screen and (min-width: 990px) {
    p { padding: 20px 0; }
}
```

**Grouping and extraction of rules ``min-width: 480px`` in file ``tablet.css``. Remaining rules are put in ``remaining.css``**

```bash
$ media-query-extractor \
    --breakpoint "screen and (min-width: 480px)|tablet.css" \
    style.css remaining.css
```

```css
/* remaining.css */
a { text-decoration: underline; }
p { padding: 10px 0; }

@media screen and (min-width: 990px) {
    p { padding: 20px 0; }
}
```

```css
/* tablet.css */
@media screen and (min-width: 480px) {
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
    p { padding: 15px 0; }
}
```

**Grouping and extraction of rules ``min-width: 480px`` and ``min-width: 990px`` in files ``tablet.css`` and ``desktop.css``. Remaining rules are put in ``remaining.css``**

```bash
$ media-query-extractor \
    --breakpoint "screen and (min-width: 480px)|tablet.css" \
    --breakpoint "screen and (min-width: 990px)|desktop.css" \
    style.css remaining.css
```

```css
/* remaining.css */
a { text-decoration: underline; }
p { padding: 10px 0;}
```

```css
/* tablet.css */
@media screen and (min-width: 480px) {
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
    p { padding: 15px 0; }
}
```

```css
/* desktop.css */
@media screen and (min-width: 990px) {
  p { padding: 20px 0; }
}
```

## Usage

```bash
Usage: media-query-extractor [options] <input file> <output file>

  Options:

    -h, --help        Output usage information
    -V, --version     Output the version number
    -b, --breakpoint  Add a breakpoint to be extracted. Model: --breakpoint "media query string[|output file name]"

  Example:

    $ media-query-extractor --help
    $ media-query-extractor \
        --breakpoint "screen and (min-width: 480px)|tablet.css" \
        --breakpoint "screen and (min-width: 660px)|big-tablet.css" \
        --breakpoint "screen and (min-width: 990px)|desktop.css" \
        styles.css remaining.css
```

