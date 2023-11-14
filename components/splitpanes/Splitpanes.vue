<script setup lang="ts">
defineOptions({
  name: 'Splitpanes',
})

const props = withDefaults(defineProps<{
  horizontal?: boolean
  pushOtherPanes?: boolean
  dblClickSplitter?: boolean
  rtl?: boolean
  firstSplitter?: boolean
}>(), {
  pushOtherPanes: true,
  dblClickSplitter: true,
  rtl: false,
})

const emits = defineEmits(['ready', 'resize', 'resized', 'paneClick', 'paneMaximize', 'paneAdd', 'paneRemove', 'splitterClick'])

const container = ref<any | null>(null)

const ready = ref<boolean>(false)

const panes = ref<any[]>([])
const touch = ref({
  mouseDown: false,
  dragging: false,
  activeSplitter: null,
})
const splitterTaps = ref<any>({
  splitter: null,
  timeoutId: null,
})

const panesCount = computed(() => panes.value.length)

const indexedPanes = computed(() => panes.value.reduce((obj, pane) => (obj[pane.id] = pane) && obj, {}))

function updatePaneComponents() {
  panes.value.forEach((pane) => {
    pane.update && pane.update({
      // Panes are indexed by Pane component uid, as they might be inserted at different index.
      [props.horizontal ? 'height' : 'width']: `${indexedPanes.value[pane.id].size}%`,
    })
  })
}

function bindEvents() {
  document.addEventListener('mousemove', onMouseMove, { passive: false })
  document.addEventListener('mouseup', onMouseUp)
  // Passive: false to prevent scrolling while touch dragging.
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', onMouseMove, { passive: false })
    document.addEventListener('touchend', onMouseUp)
  }
}

function unbindEvents() {
  document.removeEventListener('mousemove', onMouseMove, { passive: false })
  document.removeEventListener('mouseup', onMouseUp)
  if ('ontouchstart' in window) {
    document.removeEventListener('touchmove', onMouseMove, { passive: false })
    document.removeEventListener('touchend', onMouseUp)
  }
}

function onMouseDown(event: any, splitterIndex: any) {
  bindEvents()
  touch.value.mouseDown = true
  touch.value.activeSplitter = splitterIndex
}
function onMouseMove(event: any) {
  if (touch.value.mouseDown) {
    // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
    event.preventDefault()
    touch.value.dragging = true
    calculatePanesSize(getCurrentMouseDrag(event))
    emits('resize', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
  }
}

function onMouseUp() {
  if (touch.value.dragging)
    emits('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))

  touch.value.mouseDown = false
  // Keep dragging flag until click event is finished (click happens immediately after mouseup)
  // in order to prevent emitting `splitterClick` event if splitter was dragged.
  setTimeout(() => {
    touch.value.dragging = false
    unbindEvents()
  }, 100)
}

// If touch device, detect double tap manually (2 taps separated by less than 500ms).
function onSplitterClick(event: any, splitterIndex: any) {
  if ('ontouchstart' in window) {
    event.preventDefault()
    // Detect splitter double taps if the option is on.
    if (props.dblClickSplitter) {
      if (splitterTaps.value.splitter === splitterIndex) {
        clearTimeout(splitterTaps.value.timeoutId)
        splitterTaps.value.timeoutId = null
        onSplitterDblClick(event, splitterIndex)
        splitterTaps.value.splitter = null // Reset for the next tap check.
      }
      else {
        splitterTaps.value.splitter = splitterIndex
        splitterTaps.value.timeoutId = setTimeout(() => {
          splitterTaps.value.splitter = null
        }, 500)
      }
    }
  }
  if (!touch.value.dragging)
    emits('splitterClick', panes.value[splitterIndex])
}
// On splitter dbl click or dbl tap maximize this pane.
function onSplitterDblClick(event: any, splitterIndex: any) {
  let totalMinSizes = 0
  panes.value = panes.value.map((pane, i) => {
    pane.size = i === splitterIndex ? pane.max : pane.min
    if (i !== splitterIndex)
      totalMinSizes += pane.min
    return pane
  })
  panes.value[splitterIndex].size -= totalMinSizes
  emits('paneMaximize', panes.value[splitterIndex])
  emits('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
}
function onPaneClick(event: any, paneId: any) {
  emits('paneClick', indexedPanes.value[paneId])
}
// Get the cursor position relative to the splitpane container.
function getCurrentMouseDrag(event: any) {
  const rect = container.value!.getBoundingClientRect()
  const { clientX, clientY } = ('ontouchstart' in window && event.touches) ? event.touches[0] : event
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

// Returns the drag percentage of the splitter relative to the 2 panes it's inbetween.
// if the sum of size of the 2 cells is 60%, the dragPercentage range will be 0 to 100% of this 60%.
function getCurrentDragPercentage(drag: any) {
  drag = drag[props.horizontal ? 'y' : 'x']
  // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
  const containerSize = container.value![props.horizontal ? 'clientHeight' : 'clientWidth']
  if (props.rtl && !props.horizontal)
    drag = containerSize - drag
  return drag * 100 / containerSize
}

function calculatePanesSize(drag: any) {
  const splitterIndex = touch.value.activeSplitter!
  let sums = {
    prevPanesSize: sumPrevPanesSize(splitterIndex),
    nextPanesSize: sumNextPanesSize(splitterIndex),
    prevReachedMinPanes: 0,
    nextReachedMinPanes: 0,
  }

  const minDrag = 0 + (props.pushOtherPanes ? 0 : sums.prevPanesSize)
  const maxDrag = 100 - (props.pushOtherPanes ? 0 : sums.nextPanesSize)
  const dragPercentage = Math.max(Math.min(getCurrentDragPercentage(drag), maxDrag), minDrag)

  // If not pushing other panes, panes to resize are right before and right after splitter.
  let panesToResize = [splitterIndex, splitterIndex + 1]
  let paneBefore = panes.value[panesToResize[0]] || null
  let paneAfter = panes.value[panesToResize[1]] || null

  const paneBeforeMaxReached = paneBefore.max < 100 && (dragPercentage >= (paneBefore.max + sums.prevPanesSize))
  const paneAfterMaxReached = paneAfter.max < 100 && (dragPercentage <= 100 - (paneAfter.max + sumNextPanesSize(splitterIndex + 1)))
  // Prevent dragging beyond pane max.
  if (paneBeforeMaxReached || paneAfterMaxReached) {
    if (paneBeforeMaxReached) {
      paneBefore.size = paneBefore.max
      paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
    }
    else {
      paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - sumNextPanesSize(splitterIndex + 1), 0)
      paneAfter.size = paneAfter.max
    }
    return
  }

  // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
  if (props.pushOtherPanes) {
    const vars = doPushOtherPanes(sums, dragPercentage)
    if (!vars)
      return // Prevent other calculation.

    ({ sums, panesToResize } = vars)
    paneBefore = panes.value[panesToResize[0]] || null
    paneAfter = panes.value[panesToResize[1]] || null
  }

  if (paneBefore !== null)
    paneBefore.size = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max)

  if (paneAfter !== null)
    paneAfter.size = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max)
}

function doPushOtherPanes(sums: any, dragPercentage: any) {
  const splitterIndex = touch.value.activeSplitter!
  const panesToResize = [splitterIndex, splitterIndex + 1]
  // Pushing Down.
  // Going smaller than the current pane min size: take the previous expanded pane.
  if (dragPercentage < sums.prevPanesSize + panes.value[panesToResize[0]].min) {
    panesToResize[0] = findPrevExpandedPane(splitterIndex).index

    sums.prevReachedMinPanes = 0
    // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
    if (panesToResize[0] < splitterIndex) {
      panes.value.forEach((pane, i) => {
        if (i > panesToResize[0] && i <= splitterIndex) {
          pane.size = pane.min
          sums.prevReachedMinPanes += pane.min
        }
      })
    }
    sums.prevPanesSize = sumPrevPanesSize(panesToResize[0])
    // If nothing else to push down, cancel dragging.
    if (panesToResize[0] === undefined) {
      sums.prevReachedMinPanes = 0
      panes.value[0].size = panes.value[0].min
      panes.value.forEach((pane, i) => {
        if (i > 0 && i <= splitterIndex) {
          pane.size = pane.min
          sums.prevReachedMinPanes += pane.min
        }
      })
      panes.value[panesToResize[1]].size = 100 - sums.prevReachedMinPanes - panes.value[0].min - sums.prevPanesSize - sums.nextPanesSize
      return null
    }
  }
  // Pushing Up.
  // Pushing up beyond min size is reached: take the next expanded pane.
  if (dragPercentage > 100 - sums.nextPanesSize - panes.value[panesToResize[1]].min) {
    panesToResize[1] = findNextExpandedPane(splitterIndex).index
    sums.nextReachedMinPanes = 0
    // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
    if (panesToResize[1] > splitterIndex + 1) {
      panes.value.forEach((pane, i) => {
        if (i > splitterIndex && i < panesToResize[1]) {
          pane.size = pane.min
          sums.nextReachedMinPanes += pane.min
        }
      })
    }
    sums.nextPanesSize = sumNextPanesSize(panesToResize[1] - 1)
    // If nothing else to push up, cancel dragging.
    if (panesToResize[1] === undefined) {
      sums.nextReachedMinPanes = 0
      panes.value[panesCount.value - 1].size = panes.value[panesCount.value - 1].min
      panes.value.forEach((pane, i) => {
        if (i < panesCount.value - 1 && i >= splitterIndex + 1) {
          pane.size = pane.min
          sums.nextReachedMinPanes += pane.min
        }
      })
      panes.value[panesToResize[0]].size = 100 - sums.prevPanesSize - sums.nextReachedMinPanes - panes.value[panesCount.value - 1].min - sums.nextPanesSize
      return null
    }
  }
  return { sums, panesToResize }
}

function sumPrevPanesSize(splitterIndex: any) {
  return panes.value.reduce((total, pane, i) => total + (i < splitterIndex ? pane.size : 0), 0)
}

function sumNextPanesSize(splitterIndex: any) {
  return panes.value.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.size : 0), 0)
}

// Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
function findPrevExpandedPane(splitterIndex: any) {
  const pane = [...panes.value].reverse().find(p => (p.index < splitterIndex && p.size > p.min))
  return pane || {}
}

// Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
function findNextExpandedPane(splitterIndex: any) {
  const pane = panes.value.find(p => (p.index > splitterIndex + 1 && p.size > p.min))
  return pane || {}
}

function checkSplitpanesNodes() {
  const children = Array.from(container.value!.children)
  children.forEach((child: any) => {
    const isPane = child.classList.contains('splitpanes__pane')
    const isSplitter = child.classList.contains('splitpanes__splitter')

    // Node is not a Pane or a splitter: remove it.
    if (!isPane && !isSplitter) {
      child.parentNode.removeChild(child) // el.remove() doesn't work on IE11.

      console.warn('Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.')
    }
  })
}

function addSplitter(paneIndex: any, nextPaneNode: any, isVeryFirst = false) {
  const splitterIndex = paneIndex - 1
  const elm = document.createElement('div')
  elm.classList.add('splitpanes__splitter')

  if (!isVeryFirst) {
    elm.onmousedown = event => onMouseDown(event, splitterIndex)

    if (typeof window !== 'undefined' && 'ontouchstart' in window)
      elm.ontouchstart = event => onMouseDown(event, splitterIndex)

    elm.onclick = event => onSplitterClick(event, splitterIndex + 1)
  }

  if (props.dblClickSplitter)
    elm.ondblclick = event => onSplitterDblClick(event, splitterIndex + 1)

  nextPaneNode.parentNode.insertBefore(elm, nextPaneNode)
}

function removeSplitter(node: any) {
  node.onmousedown = undefined
  node.onclick = undefined
  node.ondblclick = undefined
  // el.remove() doesn't work on IE11.
  node.parentNode.removeChild(node)
}

function redoSplitters() {
  const children = Array.from(container.value!.children)
  children.forEach((el: any) => {
    if (el.className.includes('splitpanes__splitter'))
      removeSplitter(el)
  })
  let paneIndex = 0
  children.forEach((el: any) => {
    if (el.className.includes('splitpanes__pane')) {
      if (!paneIndex && props.firstSplitter)
        addSplitter(paneIndex, el, true)
      else if (paneIndex)
        addSplitter(paneIndex, el)
      paneIndex++
    }
  })
}
// Called by Pane component on programmatic resize.
function requestUpdate({ target, ...args }: any) {
  const pane = indexedPanes.value[target._.uid]
  Object.entries(args).forEach(([key, value]) => (pane[key] = value))
}

function onPaneAdd(pane: any) {
  // 1. Add pane to array at the same index it was inserted in the <splitpanes> tag.
  let index = -1
  Array.from(pane.$el.parentNode.children).some((el: any) => {
    if (el.className.includes('splitpanes__pane'))
      index++
    return el === pane.$el
  })

  const min = Number.parseFloat(pane.minSize)
  const max = Number.parseFloat(pane.maxSize)
  panes.value.splice(index, 0, {
    id: pane._.uid,
    index,
    min: Number.isNaN(min) ? 0 : min,
    max: Number.isNaN(max) ? 100 : max,
    size: pane.size === null ? null : Number.parseFloat(pane.size),
    givenSize: pane.size,
    update: pane.update,
  })

  // Redo indexes after insertion for other shifted panes.
  panes.value.forEach((p, i) => (p.index = i))

  if (ready) {
    nextTick(() => {
      // 2. Add the splitter.
      redoSplitters()

      // 3. Resize the panes.
      resetPaneSizes({ addedPane: panes.value[index] })

      // 4. Fire `paneAdd` event.
      emits('paneAdd', { index, panes: panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })) })
    })
  }
}

function onPaneRemove(pane: any) {
  // 1. Remove the pane from array and redo indexes.
  const index = panes.value.findIndex(p => p.id === pane._.uid)
  const removed = panes.value.splice(index, 1)[0]
  panes.value.forEach((p, i) => (p.index = i))

  nextTick(() => {
    // 2. Remove the splitter.
    redoSplitters()

    // 3. Resize the panes.
    resetPaneSizes({ removedPane: { ...removed, index } })

    // 4. Fire `paneRemove` event.
    emits('paneRemove', { removed, panes: panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })) })
  })
}

function resetPaneSizes(changedPanes: any = {}) {
  if (!changedPanes.addedPane && !changedPanes.removedPane)
    initialPanesSizing()
  else if (panes.value.some(pane => pane.givenSize !== null || pane.min || pane.max < 100))
    equalizeAfterAddOrRemove(changedPanes)
  else equalize()

  if (ready)
    emits('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
}

function equalize() {
  const equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable: any[] = []
  const unshrinkable: any[] = []

  panes.value.forEach((pane) => {
    pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

    leftToAllocate -= pane.size
    if (pane.size >= pane.max)
      ungrowable.push(pane.id)
    if (pane.size <= pane.min)
      unshrinkable.push(pane.id)
  })

  if (leftToAllocate > 0.1)
    readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

function initialPanesSizing() {
  let leftToAllocate = 100
  const ungrowable: any[] = []
  const unshrinkable: any[] = []
  let definedSizes = 0

  // Check if pre-allocated space is 100%.
  panes.value.forEach((pane) => {
    leftToAllocate -= pane.size
    if (pane.size !== null)
      definedSizes++
    if (pane.size >= pane.max)
      ungrowable.push(pane.id)
    if (pane.size <= pane.min)
      unshrinkable.push(pane.id)
  })

  // set pane sizes if not set.
  let leftToAllocate2 = 100
  if (leftToAllocate > 0.1) {
    panes.value.forEach((pane) => {
      if (pane.size === null)
        pane.size = Math.max(Math.min(leftToAllocate / (panesCount.value - definedSizes), pane.max), pane.min)

      leftToAllocate2 -= pane.size
    })

    if (leftToAllocate2 > 0.1)
      readjustSizes(leftToAllocate, ungrowable, unshrinkable)
  }
}
function equalizeAfterAddOrRemove({ addedPane, removedPane }: any = {}) {
  let equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable: any[] = []
  const unshrinkable: any[] = []

  if (addedPane && addedPane.givenSize !== null)
    equalSpace = (100 - addedPane.givenSize) / (panesCount.value - 1)

  // Check if pre-allocated space is 100%.
  panes.value.forEach((pane) => {
    leftToAllocate -= pane.size
    if (pane.size >= pane.max)
      ungrowable.push(pane.id)
    if (pane.size <= pane.min)
      unshrinkable.push(pane.id)
  })

  if (Math.abs(leftToAllocate) < 0.1)
    return // Ok.

  panes.value.forEach((pane) => {
    if (addedPane && addedPane.givenSize !== null && addedPane.id === pane.id) {}
    else { pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min) }

    leftToAllocate -= pane.size
    if (pane.size >= pane.max)
      ungrowable.push(pane.id)
    if (pane.size <= pane.min)
      unshrinkable.push(pane.id)
  })

  if (leftToAllocate > 0.1)
    readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

// Second loop to adjust sizes now that we know more about the panes constraints.
function readjustSizes(leftToAllocate: any, ungrowable: any, unshrinkable: any) {
  let equalSpaceToAllocate: any
  if (leftToAllocate > 0)
    equalSpaceToAllocate = leftToAllocate / (panesCount.value - ungrowable.length)
  else equalSpaceToAllocate = leftToAllocate / (panesCount.value - unshrinkable.length)

  panes.value.forEach((pane, i) => {
    if (leftToAllocate > 0 && !ungrowable.includes(pane.id)) {
      // Need to diff the size before and after to get the exact allocated space.
      const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
      const allocated = newPaneSize - pane.size
      leftToAllocate -= allocated
      pane.size = newPaneSize
    }
    else if (!unshrinkable.includes(pane.id)) {
      // Need to diff the size before and after to get the exact allocated space.
      const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
      const allocated = newPaneSize - pane.size
      leftToAllocate -= allocated
      pane.size = newPaneSize
    }

    // Update each pane through the registered `update` method.
    pane.update({
      [props.horizontal ? 'height' : 'width']: `${indexedPanes.value[pane.id].size}%`,
    })
  })

  if (Math.abs(leftToAllocate) > 0.1) { // > 0.1: Prevent maths rounding issues due to bytes.
    // Don't emit on hot reload when Vue destroys panes.
    nextTick(() => {
      if (ready)

        console.warn('Splitpanes: Could not resize panes correctly due to their constraints.')
    })
  }
}

watch(panes, () => {
  updatePaneComponents()
}, { deep: true, immediate: false })

watch(() => props.horizontal, () => {
  updatePaneComponents()
})

watch(() => props.firstSplitter, () => {
  redoSplitters()
})

watch(() => props.dblClickSplitter, (enable) => {
  const splitters = [...container.value!.querySelectorAll('.splitpanes__splitter')]
  splitters.forEach((splitter, i) => {
    splitter.ondblclick = enable ? (event: any) => onSplitterDblClick(event, i) : undefined
  })
})

onBeforeMount(() => {
  ready.value = false
})

onMounted(() => {
  checkSplitpanesNodes()
  redoSplitters()
  resetPaneSizes()
  emits('ready')
  ready.value = true
})

provide('requestUpdate', requestUpdate)
provide('onPaneAdd', onPaneAdd)
provide('onPaneRemove', onPaneRemove)
provide('onPaneClick', onPaneClick)
</script>

<template>
  <div ref="container" class="splitpanes" :class="[`splitpanes--${props.horizontal ? 'horizontal' : 'vertical'}`, { 'splitpanes--dragging': touch.dragging }]">
    <slot />
  </div>
</template>

<style>
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;
}
.splitpanes--vertical {
  flex-direction: row;
}
.splitpanes--horizontal {
  flex-direction: column;
}
.splitpanes--dragging * {
  user-select: none;
}
.splitpanes__pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.splitpanes--vertical .splitpanes__pane {
  transition: width 0.2s ease-out;
}
.splitpanes--horizontal .splitpanes__pane {
  transition: height 0.2s ease-out;
}
.splitpanes--dragging .splitpanes__pane {
  transition: none;
}
.splitpanes__splitter {
  touch-action: none;
}
.splitpanes--vertical > .splitpanes__splitter {
  min-width: 1px;
  cursor: col-resize;
}
.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 1px;
  cursor: row-resize;
}
.splitpanes.default-theme .splitpanes__pane {
  background-color: #f2f2f2;
}
.splitpanes.default-theme .splitpanes__splitter {
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
}
.splitpanes.default-theme .splitpanes__splitter:before, .splitpanes.default-theme .splitpanes__splitter:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, .15);
  transition: background-color 0.3s;
}
.splitpanes.default-theme .splitpanes__splitter:hover:before, .splitpanes.default-theme .splitpanes__splitter:hover:after {
  background-color: rgba(0, 0, 0, .25);
}
.splitpanes.default-theme .splitpanes__splitter:first-child {
  cursor: auto;
}
.default-theme.splitpanes .splitpanes .splitpanes__splitter {
  z-index: 1;
}
.default-theme.splitpanes--vertical > .splitpanes__splitter, .default-theme .splitpanes--vertical > .splitpanes__splitter {
  width: 7px;
  border-left: 1px solid #eee;
  margin-left: -1px;
}
.default-theme.splitpanes--vertical > .splitpanes__splitter:before, .default-theme .splitpanes--vertical > .splitpanes__splitter:before, .default-theme.splitpanes--vertical > .splitpanes__splitter:after, .default-theme .splitpanes--vertical > .splitpanes__splitter:after {
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
}
.default-theme.splitpanes--vertical > .splitpanes__splitter:before, .default-theme .splitpanes--vertical > .splitpanes__splitter:before {
  margin-left: -2px;
}
.default-theme.splitpanes--vertical > .splitpanes__splitter:after, .default-theme .splitpanes--vertical > .splitpanes__splitter:after {
  margin-left: 1px;
}
.default-theme.splitpanes--horizontal > .splitpanes__splitter, .default-theme .splitpanes--horizontal > .splitpanes__splitter {
  height: 7px;
  border-top: 1px solid #eee;
  margin-top: -1px;
}
.default-theme.splitpanes--horizontal > .splitpanes__splitter:before, .default-theme .splitpanes--horizontal > .splitpanes__splitter:before, .default-theme.splitpanes--horizontal > .splitpanes__splitter:after, .default-theme .splitpanes--horizontal > .splitpanes__splitter:after {
  transform: translateX(-50%);
  width: 30px;
  height: 1px;
}
.default-theme.splitpanes--horizontal > .splitpanes__splitter:before, .default-theme .splitpanes--horizontal > .splitpanes__splitter:before {
  margin-top: -2px;
}
.default-theme.splitpanes--horizontal > .splitpanes__splitter:after, .default-theme .splitpanes--horizontal > .splitpanes__splitter:after {
  margin-top: 1px;
}
</style>
