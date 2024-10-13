// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import Icons from "unplugin-icons/vite";
import remarkGemoji from "remark-gemoji";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
  output: "static",
  image: { domains: ["cdn.sharath.uk"] },
  adapter: cloudflare({ imageService: "compile" }),
  vite: { plugins: [Icons({ compiler: "astro" })] },
  integrations: [
    mdx({ remarkPlugins: [remarkGemoji], rehypePlugins: [rehypeAccessibleEmojis] }),
    sitemap(),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
