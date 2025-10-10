# RegExes for converting Kramdown to ReSpec

The original OpenID AuthZEN Authorization API standard adopts the Kramdown format for Markdown. The series of regular expressions below converts the formatting to ReSpec-compatible markdown.

## Examples reformatting:

```
~~~\s*(\w+)\n((?:(?!^~~~).*?\n)+)~~~\n\{: #([\w-]+) title="([^"]+)"\}
```
to
```
<pre class="\1 example" id="\3" title="\4">\n\2</pre>
```

## Examples without title:

```
~~~\s*(\w+)\n((?:(?!^~~~).*?\n)+)~~~
```
to
```
<pre class="\1 example">\n\2</pre>
```

## Convert notes:
```
Note:\s?(.+?)((?:\n.+?)*)\n
```
to
```
<p class="note">\1\2</p>\n
```

## Newlines after section headers:
```
(#+\s+[^\n]+)\n([^\n])
```
to
```
\1\n\n\2
```

## Section references
```
\{\{Section ([\d\.]+) of ([^\}]+)\}\}
```
to
```
Section \1 of [[[#\2]]]
```

## Other references
```
\{\{([^\}]+)\}\}
```
to
```
[[[#\1]]]
```

## Simplify standard references:
```
\[\[\[(RFC6749|RFC8259|RFC8615|RFC3553|RFC9110|XACML|RFC7519|RFC7515|RFC8126|IANA.well-known-uris|RFC9525|RFC7234|RFC2617|NIST.SP.800-162|RFC7493)\]\]\]
```
to
```
[[\1]]
```