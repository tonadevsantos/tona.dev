export const links = {
  github: {
    name: "GitHub",
    url: "https://github.com/tona-dev",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tonadev",
  },
  devto: {
    name: "dev.to",
    url: "https://dev.to/tonadev",
  },
  X: {
    name: "X",
    url: "https://x.com/tonadev",
  },
} as const;

export const linksArr = Object.values(links);

export const prettyParamsLinks = {
  firefox: {
    name: "Firefox",
    href: "https://addons.mozilla.org/en-US/firefox/addon/pretty-params/",
  },
  edge: {
    name: "Edge",
    href: "https://microsoftedge.microsoft.com/addons/detail/pretty-params/fiddpabcckahhdlepgbbmmenophlkaje",
  },
  github: {
    name: "GitHub",
    href: "https://github.com/tonadevsantos/pretty-params",
  },
} as const;
