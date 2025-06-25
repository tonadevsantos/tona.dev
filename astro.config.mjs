import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  output: "server",
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/pretty-params": "/projects/pretty-params",
  },
});
