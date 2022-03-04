(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{81:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return b})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var a=n(3),i=n(7),r=(n(0),n(89)),l=n(92),o=n(93),c={title:"Autolink extension",sidebar_label:"Autolinking"},b={unversionedId:"exts/autolink",id:"exts/autolink",isDocsHomePage:!1,title:"Autolink extension",description:"Autolinking is the concept of matching patterns within a string and wrapping the matched result in",source:"@site/docs/exts/autolink.mdx",slug:"/exts/autolink",permalink:"/docs/exts/autolink",editUrl:"https://github.com/milesj/interweave/edit/master/website/docs/exts/autolink.mdx",version:"current",sidebar_label:"Autolinking",sidebar:"docs",previous:{title:"Filters",permalink:"/docs/filters"},next:{title:"Emoji extension",permalink:"/docs/exts/emoji"}},s=[{value:"Installation",id:"installation",children:[]},{value:"URLs",id:"urls",children:[{value:"TLD support",id:"tld-support",children:[]},{value:"Props",id:"props",children:[]},{value:"Result",id:"result",children:[]}]},{value:"IPs",id:"ips",children:[{value:"Props",id:"props-1",children:[]},{value:"Result",id:"result-1",children:[]}]},{value:"Emails",id:"emails",children:[{value:"Props",id:"props-2",children:[]},{value:"Result",id:"result-2",children:[]}]},{value:"Hashtags",id:"hashtags",children:[{value:"Props",id:"props-3",children:[]},{value:"Result",id:"result-3",children:[]}]}],p={toc:s};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Autolinking is the concept of matching patterns within a string and wrapping the matched result in\nan anchor link. This process is achieved through Interweave matchers."),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"Note: The regex patterns used in autolinking do not conform to their official RFC specifications,\nas we need to take into account word boundaries, punctuation, and more. Instead, the patterns will\ndo their best to match against the majority of common use cases.")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"<Interweave\n    content=\"This contains a URL, https://github.com/milesj/interweave, and a #hashtag, that will be converted to an anchor link!\"\n    matchers={[new UrlMatcher('url'), new HashtagMatcher('hashtag')]}\n/>\n")),Object(r.b)("h2",{id:"installation"},"Installation"),Object(r.b)(l.a,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(r.b)(o.a,{value:"yarn",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn add interweave interweave-autolink\n"))),Object(r.b)(o.a,{value:"npm",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npm install interweave interweave-autolink\n")))),Object(r.b)("h2",{id:"urls"},"URLs"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"UrlMatcher")," will match most variations of a URL and its segments. This includes the protocol,\nuser and password auth, host, port, path, query, and fragment."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"import Interweave from 'interweave';\nimport { UrlMatcher } from 'interweave-autolink';\n\n<Interweave\n    content=\"URL: https://github.com/milesj/interweave\"\n    matchers={[new UrlMatcher('url')]}\n/>;\n")),Object(r.b)("h3",{id:"tld-support"},"TLD support"),Object(r.b)("p",null,"By default, the ",Object(r.b)("inlineCode",{parentName:"p"},"UrlMatcher")," will validate top-level domains against a list of the most common TLDs\n(like .com, .net, and countries). You can disable this validation with the ",Object(r.b)("inlineCode",{parentName:"p"},"validateTLD")," option."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"new UrlMatcher('url', { validateTLD: false });\n")),Object(r.b)("p",null,"Or you can provide a list of additional TLDs to validate with."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"new UrlMatcher('url', { customTLDs: ['life', 'tech', 'ninja'] });\n")),Object(r.b)("h3",{id:"props"},"Props"),Object(r.b)("p",null,"The following props are available for ",Object(r.b)("inlineCode",{parentName:"p"},"<Url />")," components, all of which should be passed to an\n",Object(r.b)("inlineCode",{parentName:"p"},"<Interweave />")," instance."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"newWindow")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Open links in a new window. Defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"onClick")," (",Object(r.b)("inlineCode",{parentName:"li"},"func"),") - Callback triggered when a link is clicked.")),Object(r.b)("h3",{id:"result"},"Result"),Object(r.b)("p",null,"If a match is found, a ",Object(r.b)("inlineCode",{parentName:"p"},"<Url />")," component will be rendered and passed the following props."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"url")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The entire URL/IP that was matched."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"urlParts")," (",Object(r.b)("inlineCode",{parentName:"li"},"object"),") - Parts for the previous.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"scheme")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),') - The protocol. Defaults to "http".'),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"auth")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The username and password authorization, excluding ",Object(r.b)("inlineCode",{parentName:"li"},"@"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"host")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The host, domain, or IP address."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"port")," (",Object(r.b)("inlineCode",{parentName:"li"},"number"),") - The port number."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"path")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The path."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"query")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The query string."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"fragment")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The hash fragment, including ",Object(r.b)("inlineCode",{parentName:"li"},"#"),".")))),Object(r.b)("h2",{id:"ips"},"IPs"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"UrlMatcher")," does not support IP based hosts as I wanted a clear distinction between supporting\nthese two patterns separately. To support IPs, use the ",Object(r.b)("inlineCode",{parentName:"p"},"IpMatcher"),", which will match hosts that\nconform to a valid IPv4 address (IPv6 not supported). Like the ",Object(r.b)("inlineCode",{parentName:"p"},"UrlMatcher"),", all segments are\nincluded."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"import Interweave from 'interweave';\nimport { IpMatcher } from 'interweave-autolink';\n\n<Interweave content=\"IP: 127.0.0.1\" matchers={[new IpMatcher('ip')]} />;\n")),Object(r.b)("h3",{id:"props-1"},"Props"),Object(r.b)("p",null,"The following props are available for ",Object(r.b)("inlineCode",{parentName:"p"},"<Ip />")," components, all of which should be passed to an\n",Object(r.b)("inlineCode",{parentName:"p"},"<Interweave />")," instance."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"newWindow")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Open links in a new window. Defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"onClick")," (",Object(r.b)("inlineCode",{parentName:"li"},"func"),") - Callback triggered when a link is clicked.")),Object(r.b)("h3",{id:"result-1"},"Result"),Object(r.b)("p",null,"If a match is found, an ",Object(r.b)("inlineCode",{parentName:"p"},"<Ip />")," component is rendered with the same props as ",Object(r.b)("inlineCode",{parentName:"p"},"<Url />"),"."),Object(r.b)("h2",{id:"emails"},"Emails"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"EmailMatcher"),' will match an email address and link it using a "mailto:" target.'),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"import Interweave from 'interweave';\nimport { EmailMatcher } from 'interweave-autolink';\n\n<Interweave content=\"Email: miles@interweave.com\" matchers={[new EmailMatcher('email')]} />;\n")),Object(r.b)("h3",{id:"props-2"},"Props"),Object(r.b)("p",null,"The following props are available for ",Object(r.b)("inlineCode",{parentName:"p"},"<Email />")," components, all of which should be passed to an\n",Object(r.b)("inlineCode",{parentName:"p"},"<Interweave />")," instance."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"onClick")," (",Object(r.b)("inlineCode",{parentName:"li"},"func"),") - Callback triggered when a link is clicked.")),Object(r.b)("h3",{id:"result-2"},"Result"),Object(r.b)("p",null,"If a match is found, an ",Object(r.b)("inlineCode",{parentName:"p"},"<Email />")," component will be rendered and passed the following props."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"email")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The entire email address that was matched."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"emailParts")," (",Object(r.b)("inlineCode",{parentName:"li"},"object"),")",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"username")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The username. Found before the ",Object(r.b)("inlineCode",{parentName:"li"},"@"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"host")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The host or domain. Found after the ",Object(r.b)("inlineCode",{parentName:"li"},"@"),".")))),Object(r.b)("h2",{id:"hashtags"},"Hashtags"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"HashtagMatcher")," will match a common hashtag (like Twitter and Instagram) and link it using a\ncustom URL (passed as a prop). Hashtag matching supports alpha-numeric (",Object(r.b)("inlineCode",{parentName:"p"},"a-z0-9"),"), underscore (",Object(r.b)("inlineCode",{parentName:"p"},"_"),"),\nand dash (",Object(r.b)("inlineCode",{parentName:"p"},"-"),") characters, and must start with a ",Object(r.b)("inlineCode",{parentName:"p"},"#"),"."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"import Interweave from 'interweave';\nimport { HashtagMatcher } from 'interweave-autolink';\n\n<Interweave content=\"Hashtag: #interweave\" matchers={[new HashtagMatcher('hashtag')]} />;\n")),Object(r.b)("h3",{id:"props-3"},"Props"),Object(r.b)("p",null,"The following props are available for ",Object(r.b)("inlineCode",{parentName:"p"},"<Hashtag />")," components, all of which should be passed to an\n",Object(r.b)("inlineCode",{parentName:"p"},"<Interweave />")," instance."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"encodeHashtag")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Encodes the hashtag using ",Object(r.b)("inlineCode",{parentName:"li"},"encodeURIComponent()"),". Defaults to\n",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"hashtagUrl")," (",Object(r.b)("inlineCode",{parentName:"li"},"string | func"),") - The URL to interpolate the matched hashtag with."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"newWindow")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Open links in a new window. Defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"preserveHash")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Preserve the leading hash (",Object(r.b)("inlineCode",{parentName:"li"},"#"),") when interpolating into a URL.\nDefaults to ",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"onClick")," (",Object(r.b)("inlineCode",{parentName:"li"},"func"),") - Callback triggered when a link is clicked.")),Object(r.b)("p",null,"Hashtags require a URL to link to, which is defined by the ",Object(r.b)("inlineCode",{parentName:"p"},"hashtagUrl")," prop. The URL must declare\nthe following token, ",Object(r.b)("inlineCode",{parentName:"p"},"{{hashtag}}"),", which will be replaced by the matched hashtag. Or a function can\nbe passed, which receives the hashtag as the 1st argument."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"<Interweave\n  hashtagUrl=\"https://twitter.com/hashtag/{{hashtag}}\"\n  matchers={[new HashtagMatcher('hashtag')]}\n/>\n\n// OR\n\n<Interweave\n  hashtagUrl={hashtag => `https://twitter.com/hashtag/${hashtag}`}\n  matchers={[new HashtagMatcher('hashtag')]}\n/>\n")),Object(r.b)("h3",{id:"result-3"},"Result"),Object(r.b)("p",null,"If a match is found, a ",Object(r.b)("inlineCode",{parentName:"p"},"<Hashtag />")," component will be rendered and passed the following props."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"hashtag")," (",Object(r.b)("inlineCode",{parentName:"li"},"string"),") - The entire hashtag that was matched (with ",Object(r.b)("inlineCode",{parentName:"li"},"#"),").")))}u.isMDXComponent=!0},87:function(e,t,n){"use strict";function a(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}t.a=function(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(i&&(i+=" "),i+=t);return i}},89:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),s=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),p=s(n),d=a,m=p["".concat(l,".").concat(d)]||p[d]||u[d]||r;return n?i.a.createElement(m,o(o({ref:t},b),{},{components:n})):i.a.createElement(m,o({ref:t},b))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var b=2;b<r;b++)l[b]=n[b];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},90:function(e,t,n){"use strict";var a=n(0),i=n(91);t.a=function(){var e=Object(a.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},91:function(e,t,n){"use strict";var a=n(0),i=Object(a.createContext)(void 0);t.a=i},92:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(90),l=n(87),o=n(55),c=n.n(o),b=37,s=39;t.a=function(e){var t=e.lazy,n=e.block,o=e.defaultValue,p=e.values,u=e.groupId,d=e.className,m=Object(r.a)(),h=m.tabGroupChoices,O=m.setTabGroupChoices,j=Object(a.useState)(o),f=j[0],g=j[1],N=a.Children.toArray(e.children);if(null!=u){var w=h[u];null!=w&&w!==f&&p.some((function(e){return e.value===w}))&&g(w)}var v=function(e){g(e),null!=u&&O(u,e)},C=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(l.a)("tabs",{"tabs--block":n},d)},p.map((function(e){var t=e.value,n=e.label;return i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":f===t,className:Object(l.a)("tabs__item",c.a.tabItem,{"tabs__item--active":f===t}),key:t,ref:function(e){return C.push(e)},onKeyDown:function(e){!function(e,t,n){switch(n.keyCode){case s:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case b:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(C,e.target,e)},onFocus:function(){return v(t)},onClick:function(){v(t)}},n)}))),t?Object(a.cloneElement)(N.filter((function(e){return e.props.value===f}))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},N.map((function(e,t){return Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==f})}))))}},93:function(e,t,n){"use strict";var a=n(3),i=n(0),r=n.n(i);t.a=function(e){var t=e.children,n=e.hidden,i=e.className;return r.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:n,className:i}),t)}}}]);