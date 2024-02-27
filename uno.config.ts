import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss';
import presetAnimations from 'unocss-preset-animations';

import presetShadcn from './shadcn.config';

export default defineConfig({
  presets: [
    presetUno({ variablePrefix: '' }),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Red Hat Text',
        },
        mono: {
          name: 'Red Hat Mono',
        },
        display: {
          name: 'Red Hat Display',
        },
      },
    }),
    presetShadcn(),
    presetAnimations(),
  ],
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]s|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/],
    },
  },
});
