import type { RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-uno'
import { parseColor } from '@unocss/preset-mini/utils'
import { theme as unoTheme } from '@unocss/preset-mini'
import {
  defineConfig,
  mergeDeep,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: mergeDeep<Theme>(unoTheme, {
    colors: {
      context: 'rgba(var(--nui-c-context),%alpha)',
    },
  }),
  rules: [
    [/^n-(.*)$/, ([, body]: string[], { theme }: RuleContext<Theme>) => {
      const color = parseColor(body, theme)
      if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
        return {
          '--nui-c-context': `${color.cssColor.components.join(',')}`,
        }
      }
    }],
  ],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['GET', 'inline-block text-green-400'],
    ['POST', 'inline-block text-yellow-400'],
    ['PUT', 'inline-block text-cyan-400'],
    ['DELETE', 'inline-block text-rose-500'],
    ['icon-hover', 'hover:bg-black hover:bg-op-4 dark:hover:bg-white dark:hover:bg-op-10 rounded'],
    ['app-bg-base', 'bg-white dark:bg-[#151515]'],
    ['app-border-base', 'border-gray/20'],
    ['app-focus-base', 'ring-2 ring-context/50'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
