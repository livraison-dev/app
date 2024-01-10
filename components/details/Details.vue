<script setup lang="ts">
const activeTab = ref()

const tabs = computed(() => {
  const items = []
  items.push({
    name: 'Params',
    slug: 'params',
    length: 0,
  })
  items.push({
    name: 'Query',
    slug: 'query',
    length: 0,
  })
  items.push({
    name: 'Body',
    slug: 'body',
    length: 0,
  })
  items.push({
    name: 'Headers',
    slug: 'headers',
    length: 0,
  })
  items.push({
    name: 'Cookies',
    slug: 'cookies',
    length: 0,
  })
  return items
})
</script>

<template>
  <div flex="~ gap2 wrap" w-full items-center px4 pb2 text-center text-sm border="b" class="app-border-base">
    <ButtonBase
      v-for="tab of tabs"
      :key="tab.slug"
      :class="activeTab === tab.slug ? 'text-primary app-primary' : 'border-transparent shadow-none'"
      @click="activeTab = tab.slug"
    >
      <Icon class="app-icon" :name="ServerRouteTabIcons[tab.slug]" />
      <div class="hidden md:block">
        {{ tab.name }}
        {{ tab?.length ? `(${tab.length})` : '' }}
      </div>
    </ButtonBase>
  </div>
</template>
