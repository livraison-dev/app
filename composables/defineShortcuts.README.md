# Shortcuts

Learn how to display and define keyboard shortcuts in your app.

## defineshortcuts

```vue
<script setup lang="ts">
const isOpen = ref(false)

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})
</script>

<template>
  <ModalCard :show="isOpen" />
</template>
```

Shortcuts keys are written as the literal keyboard key value. Combinations are made with `_` separator. Chained shortcuts are made with `-` separator.

Modifiers are also available:

- `meta`: acts as `Command` for MacOS and `Control` for others
- `ctrl`: acts as `Control`
- `shift`: acts as `Shift` and is only necessary for alphabetic keys

Examples of keys:

- `escape`: will trigger by hitting `Esc`
- `meta_k`: will trigger by hitting `⌘` and `K` at the same time on MacOS, and `Ctrl` and `K` on Windows and Linux
- `ctrl_k`: will trigger by hitting `Ctrl` and `K` at the same time on MacOS, Windows and Linux
- `shift_e`: will trigger by hitting `Shift` and `E` at the same time on MacOS, Windows and Linux
- `?`: will trigger by hitting `?` on some keyboard layouts, or for example Shift and `/`, which results in `?` on US Mac keyboards
- `g-d`: will trigger by hitting `g` then `d` with a maximum delay of 800ms by default
- `arrowleft`: will trigger by hitting `←` (also: `arrowright`, `arrowup`, `arrowdown`)

> [!NOTE]
> For a complete list of available shortcut keys, refer to the [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) API docs. Note the `KeyboardEvent.key` has to be written in lowercase.

### prop

#### usingInput

> usingInput?: string | boolean

By default, `usingInput` is `false`, meaning it will only trigger when no input is focused. When set to `true`, the shortcut will also trigger when any input is focused.

For a more advanced behavior, `usingInput` can be set to the name of an input, so it only triggers when focusing this specific input.

```vue
<script setup lang="ts">
const query = ref('')

defineShortcuts({
  enter: {
    usingInput: 'queryInput',
    handler: () => {
      // TODO
    }
  }
})
</script>

<template>
  <input v-model="query" name="queryInput">
</template>
```

`enter` shortcut will only trigger when `queryInput` is focused.

#### whenever

> whenever?: WatchSource<boolean>[]

`whenever` allows to add constraints on the shortcut triggering behavior. This array can contain `Ref<boolean>`, `ComputedRef<boolean>` or `() => boolean`.

```ts
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => { isOpen.value = !isOpen.value }
  },
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
})
```

`escape` shortcut will only trigger when `isOpen` is `true`.

#### Simple shortcut

In case the shortcut does not need any config, it can be written as a function.

```ts
defineShortcuts({
  '?': () => openHelpModal()
})
```

## useShortcuts

To display shortcuts in your app according to the user's OS, you can use the `useShortcuts` composable.

```vue
<script setup lang="ts">
const { metaSymbol } = useShortcuts()
</script>

<template>
  <UKbd>{{ metaSymbol }}</UKbd>
</template>
```

`metaSymbol` will display either `⌘` on ***MacOS*** or `Ctrl` on ***any other OS***
