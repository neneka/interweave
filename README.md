# Interweave
[![Build Status](https://travis-ci.org/milesj/interweave.svg?branch=master)](https://travis-ci.org/milesj/interweave)

Interweave is a robust React library that can...

* Safely render HTML without using `dangerouslySetInnerHTML`.
* Safely strip HTML tags.
* Automatic XSS and injection protection.
* Clean HTML attributes using filters.
* Interpolate components using matchers.
* Autolink URLs, IPs, emails, and hashtags.
* Render Emoji and emoticon characters.
* And much more!

## Requirements

* React 15/16+
* IE 10+
* Emoji support: `fetch`, `sessionStorage`

## Installation

Interweave requires React as a peer dependency.

```
npm install interweave react --save
// Or
yarn add interweave react
```

## Usage

Interweave can primarily be used with the `Interweave` and `Markup`
components, both of which provide an easy, straight-forward implementation
for safely [parsing and rendering HTML](#html-parsing) without using
`dangerouslySetInnerHTML` ([Facebook][dangerhtml]).

The `Interweave` component has the additional benefit of utilizing
[filters](#filters), [matchers](#matchers), and callbacks.

```javascript
import Interweave from 'interweave';

<Interweave
  tagName="div"
  content="This string <b>contains</b> HTML."
/>
```

#### Props

* `content` (string) - The string to render and apply matchers and
  filters to. Supports HTML.
* `emptyContent` (node) - React node to render if no content was
  rendered.
* `tagName` (div | span | p) - The HTML element tag name to wrap the
  output with. Defaults to "span".
* `filters` (Filter[]) - Filters to apply to this instance.
* `matchers` (Matcher[]) - Matchers to apply to this instance.
* `disableFilters` (boolean) - Disables all filters.
* `disableMatchers` (boolean) - Disables all matchers.
* `disableLineBreaks` (boolean) - Disables automatic line break conversion.
* `disableWhitelist` (boolean) - Disables automatic tag and attribute filtering.
* `noHtml` (boolean) - Strips HTML tags from the content string while
  parsing. Also strips HTML generated by matchers.
* `noHtmlExceptMatchers` (boolean) - Like the former, but allows HTML generated by matchers.
* `onBeforeParse` (func) - Callback that fires before parsing. Is
  passed the source string and must return a string.
* `onAfterParse` (func) - Callback that fires after parsing. Is
  passed an array of strings/elements and must return an array.

### Markup

Unlike the `Interweave` component, the `Markup` component does not
support matchers, filters, or callbacks. This component is preferred
when rendering strings that contain HTML is the primary use case.

```javascript
import { Markup } from 'interweave';

<Markup content="This string <b>contains</b> HTML." />
```

#### Props

The `Markup` component only supports the `content`, `emptyContent`,
`tagName`, `disableLineBreaks`, `disableWhitelist`, `noHtml`,
and `noHtmlExceptMatchers` props mentioned previously.

## Documentation

* [Matchers](#matchers)
  * [Creating A Matcher](#creating-a-matcher)
  * [Rendered Elements](#rendered-elements)
* [Filters](#filters)
  * [Creating A Filter](#creating-a-filter)
* [Autolinking](#autolinking)
  * [URLs](#urls)
    * [TLD Support](#tld-support)
    * [Matches](#matches)
  * [IPs](#ips)
    * [Matches](#matches-1)
  * [Emails](#emails)
    * [Matches](#matches-2)
  * [Hashtags](#hashtags)
    * [Props](#props)
    * [Matches](#matches-3)
* [Emojis](#emojis)
  * [Matching Emojis](#matching-emojis)
    * [Props](#props-1)
    * [Matches](#matches-4)
  * [Loading Emoji Data](#loading-emoji-data)
  * [Converting Emoticons](#converting-emoticons)
  * [Converting Shortcodes](#converting-shortcodes)
  * [Using SVGs or PNGs](#using-svgs-or-pngs)
  * [Displaying Unicode Characters](#displaying-unicode-characters)
  * [Automatic Enlargement](#automatic-enlargement)
* [HTML Parsing](#html-parsing)
  * [Tag Whitelist](#tag-whitelist)
  * [Attribute Whitelist](#attribute-whitelist)
  * [By-passing the Whitelist](#by-passing-the-whitelist)
  * [Disabling HTML](#disabling-html)
* [Global Configuration](#global-configuration)
* [Server-side Rendering](#server-side-rendering)

### Matchers

Matchers are the backbone of Interweave as they allow arbitrary
insertion of React elements into strings, through the use of regex
matching. This feature is quite powerful and opens up many possibilities.

It works by matching patterns within a string, deconstructing it into
tokens, and reconstructing it back into an array of strings and React
elements, therefore, permitting it to be rendered by React's virtual
DOM layer. For example, take the following string "Check out my
website, github.com/milesj!", and a `UrlMatcher`, you'd get the
following array.

```javascript
[
  'Check out my website, ',
  <Url>github.com/milesj</Url>,
  '!',
]
```

Matchers can be passed to each instance of `Interweave`.
When adding a matcher, a unique name must be passed to the constructor.

```javascript
import Interweave, { UrlMatcher } from 'interweave';

<Interweave matchers={[new UrlMatcher('foo')]} />
```

To disable all matchers per instance, pass the `disableMatchers` prop.

```javascript
<Interweave disableMatchers />
```

To disable a single matcher, you can pass a prop that starts with "no",
and ends with the unique name of the matcher (the one passed to the constructor).
Using the example above, you can pass a `noFoo` prop.

```javascript
<Interweave noFoo />
```

#### Creating A Matcher

To create a custom matcher, implement a class that extends the base `Matcher` class,
or use a plain object. Both approaches will require the following methods to be defined
(excluding callbacks).

* `match(string)` - Match the passed string using a regex pattern.
  This method must return `null` if no match is found, else it must
  return an object with a `match` key and the matched value.
  Furthermore, any additional keys defined in this object will be
  passed as props to the created element.
* `replaceWith(match, props)` - Returns a React element that replaces
  the matched content in the string. The match is passed as the 1st
  argument, and any matched props or parent props are passed as the
  2nd argument.
* `createElement(match, props)` - The same as `replaceWith` but used in object matchers.
* `asTag()` - The HTML tag name of the replacement element.
* `onBeforeParse(content, props)` (func) - Callback that fires before parsing. Is
  passed the source string and must return a string.
* `onAfterParse(nodes, props)` (func) - Callback that fires after parsing. Is
  passed an array of strings/elements and must return an array.

> Using the plain object approach requires more implementation and a higher overhead.

```javascript
import { Matcher } from 'interweave';

function match(string) {
  const matches = string.match(/foo/);

  if (!matches) {
    return null;
  }

  return {
    match: matches[0],
    extraProp: 'foo', // or matches[1], etc
  };
}

// Class
class FooMatcher extends Matcher {
  match(string) {
    return match(string);
  }

  replaceWith(match, props) {
    return (
      <span {...props}>{match}</span>
    );
  }

  asTag() {
    return 'span';
  }
}

const matcher = new FooMatcher('foo');

// Object
const matcher = {
  inverseName: 'noFoo',
  propName: 'foo',
  asTag: () => 'span',
  createElement: (match, props) => <span {...props}>{match}</span>,
  match,
};
```

To ease the matching process, there is a `doMatch` method on `Matcher` that
handles the `null` and object building logic. Simply pass it a regex
pattern and a callback to build the object.

```javascript
class FooMatcher extends Matcher {
  // ...

  match(string) {
    return this.doMatch(string, /foo/, matches => ({
      extraProp: 'foo',
    }));
  }
}
```

#### Rendered Elements

When a match is found, a React element is rendered (from a React
component) from either the matcher's `replaceWith` method, or from a
factory. What's a factory you ask? Simply put, it's a function passed
to the constructor of a matcher, allowing the rendered element to be
customized for built-in or third-party matchers.

To define a factory, simply pass a function to the 3rd argument of a
matcher constructor. The factory function receives the same arguments
as `replaceWith`.

```javascript
new FooMatcher('foo', {}, (match, props) => (
  <span {...props}>{match}</span>
));
```

> Elements returned from `replaceWith` or the factory must return an
> HTML element with the same tag name as defined by `asTag`.

### Filters

Filters provide an easy way of cleaning HTML attribute values during
the [parsing cycle](#html-parsing). This is especially useful for `src`
and `href` attributes.

Filters can be added to each instance of `Interweave`.
When adding a filter, the name of the attribute to clean must be
passed as the 1st argument to the constructor.

```javascript
<Interweave filters={[new HrefFilter('href')]} />
```

To disable all filters, pass the `disableFilters` prop.

```javascript
<Interweave disableFilters />
```

#### Creating A Filter

Creating a custom filter is easy. Simply extend the base `Filter` class,
or use a plain object, and define a `filter` method. This method will receive
the attribute value as the 1st argument, and it must return a string.

```javascript
import { Filter } from 'interweave';

// Class
class SourceFilter extends Filter {
  filter(value) {
    return encodeURIComponent(value); // Clean attribute value
  }
}

const filter = new Filter('src');

// Object
const filter = {
  attribute: 'src',
  filter: value => encodeURIComponent(value),
};
```

### Autolinking

Autolinking is the concept of matching patterns within a string and
wrapping the matched result in a link (an `<a>` tag).
This can be achieved with the [matchers](#matchers) described below.

> Note: The regex patterns in use for autolinking do not conform to the
> official RFC specifications, as we need to take into account word
> boundaries, punctuation, and more. Instead, the patterns will do their
> best to match against the majority of common use cases.

Autolinking supports the following props, all of which should be passed
to an `Interweave` instance.

* `newWindow` (bool) - Open links in a new window. Defaults to `false`.
* `onClick` (func) - Callback triggered when a link is clicked.

#### URLs

The `UrlMatcher` will match most variations of a URL and its segments.
This includes the protocol, user and password auth, host, port, path,
query, and fragment.

```javascript
import Interweave, { UrlMatcher } from 'interweave';

<Interweave matchers={[new UrlMatcher('url')]} />
```

##### TLD Support

By default, the `UrlMatcher` will validate top-level domains against a
whitelist of the most common TLDs (like .com, .net, and countries).
You can disable this validation with the `validateTLD` option.

```javascript
new UrlMatcher('url', { validateTLD: false });
```

Or you can provide a whitelist of additional TLDs to validate with.

```javascript
new UrlMatcher('url', { customTLDs: ['life', 'tech', 'ninja'] });
```

##### Matches

If a match is found, a [Url](#rendered-elements) element or matcher
element will be rendered and passed the following props.

* `children` (string) - The entire URL/IP that was matched.
* `urlParts` (object)
  * `scheme` (string) - The protocol. Defaults to "http".
  * `auth` (string) - The username and password authorization,
    excluding `@`.
  * `host` (string) - The host, domain, or IP address.
  * `port` (number) - The port number.
  * `path` (string) - The path.
  * `query` (string) - The query string.
  * `fragment` (string) - The hash fragment, including `#`.

#### IPs

The `UrlMatcher` does not support IP based hosts as I wanted a clear
distinction between supporting these two patterns separately. To support
IPs, use the `IpMatcher`, which will match hosts that conform to a
valid IPv4 address (IPv6 not supported). Like the `UrlMatcher`, all
segments are included.

```javascript
import Interweave, { IpMatcher } from 'interweave';

<Interweave matchers={[new IpMatcher('ip')]} />
```

##### Matches

If a match is found, the same props as `UrlMatcher` is passed.

#### Emails

The `EmailMatcher` will match an email address and link it using a
"mailto:" target.

```javascript
import Interweave, { EmailMatcher } from 'interweave';

<Interweave matchers={[new EmailMatcher('email')]} />
```

##### Matches

If a match is found, an [Email](#rendered-elements) element or
matcher element will be rendered and passed the following props.

* `children` (string) - The entire email address that was matched.
* `emailParts` (object)
  * `username` (string) - The username. Found before the `@`.
  * `host` (string) - The host or domain. Found after the `@`.

#### Hashtags

The `HashtagMatcher` will match a common hashtag (like Twitter and
Instagram) and link to it using a custom URL (passed as a prop).
Hashtag matching supports alpha-numeric (`a-z0-9`), underscore (`_`),
and dash (`-`) characters, and must start with a `#`.

```javascript
import Interweave, { HashtagMatcher } from 'interweave';

<Interweave matchers={[new HashtagMatcher('hashtag')]} />
```

##### Props

The following props are available for `Hashtag` components,
all of which should be passed to an `Interweave` instance.

* `encodeHashtag` (bool) - Encodes the hashtag using `encodeURIComponent`. Defaults to `false`.
* `hashtagUrl` (string | func) - The URL to interpolate the matched hashtag with.
  More information on this below.
* `preserveHash` (bool) - Preserve the leading hash (`#`) when interpolating into a URL.
  Defaults to `false`.

Hashtags require a URL to link to, which is defined by the `hashtagUrl` prop.
The URL must declare the following token, `{{hashtag}}`, which will be replaced
by the matched hashtag. Or a function can be passed, which receives the hashtag
as the 1st argument.

```javascript
<Interweave
  hashtagUrl="https://twitter.com/hashtag/{{hashtag}}"
  matchers={[new HashtagMatcher('hashtag')]}
/>

// OR

<Interweave
  hashtagUrl={hashtag => `https://twitter.com/hashtag/${hashtag}`}
  matchers={[new HashtagMatcher('hashtag')]}
/>
```

##### Matches

If a match is found, a [Hashtag](#rendered-elements) element or
matcher element will be rendered and passed the following props.

* `children` (string) - The entire hashtag that was matched.
* `hashtagName` (string) - The hashtag name without `#`.

### Emojis

Who loves emojis? Everyone loves emojis. Interweave has built-in support for rendering emoji,
either their unicode character, or with SVG/PNGs, all through the `interweave-emoji` package.
The package utilizes [Emojibase](https://github.com/milesj/emojibase) for accurate and
up-to-date data.

```
npm install interweave-emoji emojibase --save
// Or
yarn add interweave-emoji emojibase
```

#### Matching Emojis

The `EmojiMatcher` makes use of complex regex patterns to replace unicode characters with SVG/PNGs.

```javascript
import Interweave from 'interweave';
import { EmojiMatcher } from 'interweave-emoji';

<Interweave matchers={[new EmojiMatcher('emoji')]} />
```

##### Props

The following props are available for `Emoji` components,
all of which should be passed to an `Interweave` instance.

* `emojiSize` (string | number) - The width and height of emojis.
* `emojiLargeSize` (string | number) - The width and height of enlarged emojis.
  Defaults to 3x the size of `emojiSize`, using `em`s.
* `emojiPath` (string | func) - A path to the PNG or SVG file representing the emoji character.
  [Learn more about this prop](#using-svsgs-or-pngs).
* `enlargeEmoji` (bool) - Whether to enlarge the emoji or not. Automatically triggers.
  Defaults to `false`.

##### Matches

Both unicode literal characters and escape sequences are supported when matching.
If a match is found, an [Emoji](#rendered-elements) element or matcher element will be
rendered and passed the following props.

* `emoticon` (string) - If applicable, an emoticon for the specific emoji character.
* `shortcode` (string) - The shortcode for the specific emoji character.
* `unicode` (string) - The unicode literal character.

#### Loading Emoji Data

Before emoji can be rendered, emoji data must be loaded from a CDN. To do this,
a `withEmojiData` higher-order-component (HOC) is provided, which will fetch emoji data
from Emojibase's CDN. This HOC should wrap your component that composes `Interweave`.

```javascript
import Interweave from 'interweave';
import { withEmojiData } from 'interweave-emoji';

export default withEmojiData(Interweave);
```

This HOC accepts the following optional props.

* `locale` (string) - The localized data to fetch. Defaults to `en`.
  [View supported locales](https://github.com/milesj/emojibase#usage).
* `version` (string) - The `emojibase-data` release version to fetch. Defaults to `latest`.
  [Read more](https://github.com/milesj/emojibase#fetchfromcdn).
* `compact` (bool) - Whether to load compact or full data. Defaults to `false`.

> An `emojis` and `emojiSource` prop will be passed to the underlying component.

#### Converting Emoticons

Emoticons have been around longer than emoji, but emoji are much nicer to look at.
Some emoji, not all, have an associated emoticon that can be converted to an
emoji character. For example, `:)` would convert to 🙂.

To enable conversion of an emoticon to a unicode literal character,
pass the `convertEmoticon` option to the matcher.

```javascript
new EmojiMatcher('emoji', { convertEmoticon: true });
```

> A list of supported emoticons can be found in
> [emojibase](https://github.com/milesj/emojibase/blob/master/src/resources/emoticons.js).

#### Converting Shortcodes

Shortcodes provide an easy non-unicode alternative for supporting emoji,
and are represented by a word (or two) surrounded by two colons: `:boy:`.

To enable conversion of a shortcode to a unicode literal character,
pass the `convertShortcode` option to the matcher constructor.

```javascript
new EmojiMatcher('emoji', { convertShortcode: true });
```

> A list of supported shortcodes can be found in
> [emojibase](https://github.com/milesj/emojibase/blob/master/src/resources/shortcodes.js).

#### Using SVGs or PNGs

To begin, we must enable conversion of unicode characters to media (images, vector, etc),
by enabling the `convertUnicode` option. Secondly, if you want to support shortcodes
or emoticons, enable `convertShortcode` or `convertEmoticon` respectively.

```javascript
new EmojiMatcher('emoji', {
  convertEmoticon: true,
  convertShortcode: true,
  convertUnicode: true,
});
```

Now we need to provide an absolute path to the SVG/PNG file using
the `emojiPath` prop. This path must contain a `{{hexcode}}` token,
which will be replaced by the hexadecimal codepoint (hexcode) of the emoji.

Or a function can be passed, which receives the hexcode as the 1st argument,
`enlargeEmoji` value as the 2nd argument, `emojiSize` as the 3rd argument,
and `emojiLargeSize` as the 4th argument.

```javascript
<Interweave
  emojiPath="https://example.com/images/emoji/{{hexcode}}.png"
  matchers={[new EmojiMatcher('emoji')]}
/>

// OR

<Interweave
  emojiPath={hexcode => `https://example.com/images/emoji/${hexcode}.png`}
  matchers={[new EmojiMatcher('emoji')]}
/>
```

Both media formats make use of the `img` tag and will require an
individual file, as sprites and icon fonts are not supported. The
following resources can be used for downloading SVG/PNG icons.

* [EmojiOne](http://emojione.com/developers/) ([CDN](https://cdnjs.com/libraries/emojione))
* [Twemoji](https://github.com/twitter/twemoji)

> Note: SVGs require CORS to work correctly, so files will need to be stored
> locally, or within a CDN under the same domain. Linking to remote SVGs
> will not work -- use PNGs instead.

Lastly, to control the width and height of the `img`, use the `emojiSize` prop, which accepts a
number or string. If a number is provided, it'll be passed down to React, which defaults to `px`.

```javascript
<Interweave emojiSize={32} emojiLargeSize={96} /> // 32px, 96px
<Interweave emojiSize="1em" emojiLargeSize="3em" /> // 1em, 3em
```

> I suggest using `em` scaling as the emoji will scale relative to the text around it.

#### Displaying Unicode Characters

To display native unicode characters as is, pass the `renderUnicode`
option to the matcher constructor. This option will override the
rendering of SVGs or PNGs, and works quite well alongside shortcode
or emoticon conversion.

```javascript
new EmojiMatcher('emoji', { renderUnicode: true });
```

#### Automatic Enlargement

When an emoji is the only character within the content, it will
automatically be enlarged. To disable this functionality,
set `enlargeThreshold` to 0. Inversely, if you want to increase the
threshold in which emojis are enlarged, increase the count.

```javascript
new EmojiMatcher('emoji', { enlargeThreshold: 3 });
```

For example, if `enlargeThreshold` is set to 3, and 3 emojis are found
within the content, all will be enlarged.

### HTML Parsing

Interweave doesn't rely on an HTML parser for rendering HTML safely,
instead, it uses the DOM itself. It accomplishes this by using
`DOMImplementation.createHTMLDocument` ([MDN][domhtml]), which creates
an HTML document in memory, allowing us to easily set markup,
aggregate nodes, and generate React elements. This implementation is
supported by all modern browsers and IE9+.

`DOMImplementation` has the added benefit of not requesting resources
(images, scripts, etc) until the document has been rendered to the page.
This provides an extra layer of security by avoiding possible CSRF
and arbitrary code execution.

Furthermore, Interweave manages a whitelist of both HTML tags and
attributes, further increasing security, and reducing the risk of XSS
and vulnerabilities.

#### Tag Whitelist

Interweave keeps a mapping of valid [HTML tags to parsing
configurations][tagwhitelist]. These configurations handle the following
rules and processes.

* Defines the type of rule: allow or deny.
* Defines the type of tag: inline, block, inline-block.
* Flags whether inline children can be rendered.
* Flags whether block children can be rendered.
* Flags whether children of the same tag name can be rendered.
* Maps the parent tags the current element can render in.
* Maps the child tags the current element can render.

Lastly, any tag not found in the mapping will be flagged using the
rule "deny", and promptly not rendered.

The following tags are not supported, but their children will still be rendered.

`acronym`, `area`, `base`, `basefont`, `bdi`, `bdo`, `bgsound`, `big`, `blink`,
`body`, `caption`, `center`, `col`, `colgroup`, `command`, `content`,
`data`, `datalist`, `dialog`, `dir`, `font`, `form`, `head`, `hgroup`, `html`,
`image`, `input`, `isindex`, `keygen`, `link`, `listing`, `marquee`, `menu`,
`menuitem`, `meta`, `meter`, `multicol`, `nobr`, `noembed`, `noframes`,
`noscript`, `optgroup`, `option`, `param`, `plaintext`, `progress`, `rp`, `rt`,
`rtc`, `ruby`, `select`, `shadow`, `slot`, `small`, `spacer`, `strike`,
`template`, `textarea`, `title`, `tt`, `wbr`, `xmp`

The following tags and their children will never be rendered,
even when the whitelist is disabled.

`applet`, `canvas`, `embed`, `frame`, `frameset`, `iframe`, `object`, `script`, `style`

#### Attribute Whitelist

Interweave takes parsing a step further, by also [filtering](#filters)
attribute values on all parsed HTML elements. Like tags, a mapping of
valid [HTML attributes to parser rules][attrwhitelist] exist. A rule
can be one of: allow and cast to string (default), allow and cast to
number, allow and cast to boolean, and finally, deny.

Also like the tag whitelist, any attribute not found in the mapping is
ignored.

#### By-passing the Whitelist

If need be, the whitelist can be disabled with the `disableWhitelist` prop.
This is highly discouraged as it opens up possible XSS and injection attacks,
and should only be used if the markup passed to `Interweave` has been
sanitized beforehand.

That being said, specific tags like `script`, `iframe`, `applet`, and a few
others are consistently removed.

#### Disabling HTML

The HTML parser cannot be disabled, however, a `noHtml` boolean prop can
be passed to both the `Interweave` and `Markup` components. This prop
will mark all HTML elements as pass-through, simply rendering text nodes
recursively, including matchers.

If you want to strip user provided HTML, but allow HTML from matchers,
use the `noHtmlExceptMatchers` prop instead.

### Global Configuration

In an older version of `Interweave`, there was this concept of global configuration,
in which filters, matchers, and even nested props can be defined. This configuration
would then be passed to all instances of `Interweave` or `Markup`. Since it was using
globals, this approach had its fair share of problems.

In newer versions, we suggest composing around `Interweave` using a custom component
in your application. This provides more options for customization, like the choice
between Twitter and Instagram hashtags, or PNG or SVG emojis.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { stripHexcode } from 'emojibase';
import BaseInterweave, {
  Filter,
  Matcher,
  IpMatcher,
  UrlMatcher,
  HashtagMatcher,
} from 'interweave';
import {
  EmojiMatcher,
  withEmojiData,
} from 'interweave-emoji';

const globalFilters = [
  new CustomFilter('href'),
];

const globalMatchers = [
  new IpMatcher('ip'),
  new UrlMatcher('url'),
  new HashtagMatcher('hashtag'),
  new EmojiMatcher('emoji', {
    convertEmoticon: true,
    convertShortcode: true,
    convertUnicode: true,
  }),
];

function getEmojiPath(hexcode, enlarged) {
  return `//cdn.jsdelivr.net/emojione/assets/3.1/png/${enlarged ? 64 : 32}/${stripHexcode(hexcode).toLowerCase()}.png`;
}

function Interweave({
  filters = [],
  matchers = [],
  twitter = false,
  instagram = false,
  ...props
}) {
  let hashtagUrl = '';

  if (twitter) {
    hashtagUrl = 'https://twitter.com/hashtag/{{hashtag}}';
  } else if (instagram) {
    hashtagUrl = 'https://instagram.com/explore/tags/{{hashtag}}';
  }

  return (
    <BaseInterweave
      filters={[
        ...globalFilters,
        ...filters,
      ]}
      matchers={[
        ...globalMatchers,
        ...matchers,
      ]}
      hashtagUrl={hashtagUrl}
      emojiPath={getEmojiPath}
      emojiSize="1em"
      emojiLargeSize="3em"
      newWindow
      {...props}
    />
  )
}

Interweave.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.instanceOf(Filter)),
  matchers: PropTypes.arrayOf(PropTypes.instanceOf(Matcher)),
  twitter: PropTypes.bool,
  instagram: PropTypes.bool,
};

export default withEmojiData(Interweave);
```

### Server-side Rendering

Interweave utilizes the DOM to parse and validate HTML, and as such, is not server-side
renderable out of the box. However, this is easily mitigated with [JSDOM][jsdom].
To begin, install JSDOM.

```
npm install jsdom --save-dev
// Or
yarn add jsdom --dev
```

Add instantiate an instance, configured to your liking. Once this instance is configured,
you can then render your React components without much issue (hopefully).

```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import JSDOM from 'jsdom';

global.window = new JSDOM('', { url: 'http://localhost' });
global.document = global.window.document;
```

[dangerhtml]: https://facebook.github.io/react/tips/dangerously-set-inner-html.html
[domhtml]: https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument
[tagwhitelist]: https://github.com/milesj/interweave/blob/master/src/constants.js#L88
[attrwhitelist]: https://github.com/milesj/interweave/blob/master/src/constants.js#L381
[jsdom]: https://github.com/tmpvar/jsdom
