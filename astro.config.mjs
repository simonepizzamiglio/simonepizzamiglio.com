// @ts-check

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { URL, fileURLToPath } from "node:url"

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://simonepizzamiglio.com",
  integrations: [mdx(), sitemap()],

  vite: {
      plugins: [tailwindcss()],
      resolve: {
          alias: {
              "#": fileURLToPath(new URL("./src", import.meta.url)),
          },
      },
	},

  adapter: cloudflare(),
})