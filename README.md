#media-query-extractor

Groups css rules by media queries and extracts them to different files

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

```bash
media-query-extractor  style.css remaining.css
```
procudes : 

```css
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

---

```bash
$ media-query-extractor \
    --breakpoint "screen and (min-width: 480px)|tablet.css" \
    style.css remaining.css
```

produces :

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

---

```bash
$ media-query-extractor \
    --breakpoint "screen and (min-width: 480px)|tablet.css" \
    --breakpoint "screen and (min-width: 990px)|desktop.css" \
    style.css remaining.css
```

produces : 

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
