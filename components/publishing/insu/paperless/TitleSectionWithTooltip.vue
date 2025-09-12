<template>
  <h1 class="c-tit">
    <span class="text" v-html="title"></span>
  </h1>
  <div class="c-tit-sub tooltip-tit">
    <span class="text" v-html="description"></span>
    <TooltipIcon :tooltip-text="tooltipText" />
  </div>
</template>

<script setup lang="ts">
import TooltipIcon from '~/components/common/TooltipIcon.vue'

const props = defineProps<{
  title: string
  description: string
  tooltipText: string
}>()
</script>

<style lang="scss" scoped></style>
