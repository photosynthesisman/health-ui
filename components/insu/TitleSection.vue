<template>
  <div class="header-section">
    <h2 class="title" v-html="title"></h2>
    <p v-if="description" class="description tooltip-tit">
      <span v-html="description"></span>
      <TooltipIcon v-if="tooltip" :tooltip-text="tooltip" />
    </p>
    <slot name="content"></slot>
  </div>
</template>
<script setup lang="ts">
import TooltipIcon from '~/components/common/TooltipIcon.vue'
defineProps<{
  title: string
  description?: string
  tooltip?: string
}>()
</script>

<style lang="scss" scoped>
:deep(.tooltip-tit .tooltip) {
  top: 100%;
}
:deep(.tooltip-icon-wrapper) {
  display: inline-block;
  margin-left: 0.4rem;
}
.header-section {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  .title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
  }
  .description {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
  }
  .service-help {
    display: flex;
    gap: 0.4rem;
    .icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
