<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const linkQuery = useRouteQuery('link')

const source = ref('')

const { copy } = useClipboard({ source })

function clean() {
  source.value = ''
  linkQuery.value = ''
}
</script>

<template>
  <div class="flex flex-col flex-gap-2 flex-none px-4">
    <div class="flex flex-gap-2 items-center">
      <div class="w-full relative">
        <Input v-model="linkQuery" />
        <div class="absolute right-2 top-1.5 flex flex-gap-1">
          <ButtonBase
            title="Copy URL"
            app="xs blue"
            icon="carbon:copy"
            :border="false"
            @click="copy(linkQuery?.toString())"
          />
          <ButtonBase
            title="Clean URL"
            app="xs blue"
            icon="carbon:clean"
            :border="false"
            @click="clean()"
          />
        </div>
      </div>
      <ButtonBase class="h-full app-primary app-solid py-2">
        <IconBase icon="carbon:send" />
      </ButtonBase>
    </div>
  </div>
</template>
