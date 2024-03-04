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
  rules: [
    ['animate-spotlight', { animation: 'spotlight 2s ease .75s 1 forwards' }],
    ['animate-meteor-effect', { animation: 'meteor 5s linear infinite' }],
    ['animate-gradient-first', { animation: 'moveVertical 30s ease infinite' }],
    ['animate-gradient-second', { animation: 'moveInCircle 20s reverse infinite' }],
    ['animate-gradient-third', { animation: 'moveInCircle 40s linear infinite' }],
    ['animate-gradient-fourth', { animation: 'moveHorizontal 40s ease infinite' }],
    ['animate-gradient-fifth', { animation: 'moveInCircle 20s ease infinite' }],
  ],
});
