import type { RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-uno'
import { parseColor } from '@unocss/preset-mini/utils'
import { theme as unoTheme } from '@unocss/preset-mini'
import { fonts } from '@unocss/preset-mini/rules'
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
      context: 'rgba(var(--app-ui-c-context),%alpha)',
    },
  }),
  rules: [
    [/^app-(.*)$/, ([, body]: string[], { theme }: RuleContext<Theme>) => {
      const color = parseColor(body, theme)
      if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
        return {
          '--app-ui-c-context': `${color.cssColor.components.join(',')}`,
        }
      }
    }],
    [/^app-(.*)$/, fonts[1][1] as any],
    ['app-dashed', { 'border-style': 'dashed' }],
    ['app-disabled', {
      'opacity': 0.6,
      'pointer-events': 'none',
      'filter': 'saturate(0)',
    }],
  ],
  variants: [
    (input: string) => {
      const prefix = 'app-disabled:'
      if (input.startsWith(prefix)) {
        return {
          matcher: input.slice(prefix.length),
          selector: input => `[disabled] ${input}, ${input}[disabled]`,
        }
      }
    },
    (input: string) => {
      const prefix = 'app-checked:'
      if (input.startsWith(prefix)) {
        return {
          matcher: input.slice(prefix.length),
          selector: input => `[checked] ${input}, ${input}[checked]`,
        }
      }
    },
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
    // button
    ['app-button-base', 'border n-border-base rounded shadow-sm px-1em py-0.25em inline-flex items-center gap-1 op80 !outline-none touch-manipulation'],
    ['app-button-hover', 'op100 !border-context text-context'],
    ['app-button-active', 'n-active-base bg-context/5'],
    ['app-button-icon', '-ml-0.2em mr-0.2em text-1.1em'],
    ['app-icon-button', 'aspect-1/1 w-1.6em h-1.6em flex items-center justify-center rounded op50 hover:op100 hover:n-bg-active'],
    ['app-transition', 'transition-all duration-200'],
    ['app-icon', 'flex-none'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: ['i-', ''],
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
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
