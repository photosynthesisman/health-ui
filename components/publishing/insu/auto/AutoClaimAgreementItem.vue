<template>
  <ul class="agree-list">
    <li v-for="item in items" :key="item.id" class="item" @click="$emit('show-detail', item)">
      <Checkbox :id="item.id" v-model="item.checked" custom-style="small non-border" :aria-label="item.label" />
      <i class="icon-arrow-right"></i>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'

interface AgreeItem {
  id: string
  label?: string
  required?: boolean
  checked?: boolean
}

const props = defineProps<{
  items: AgreeItem[]
}>()

const emit = defineEmits<{
  (e: 'update:items', value: AgreeItem[]): void
  (e: 'show-detail', value: AgreeItem): void
}>()
</script>

<style lang="scss" scoped>
.agree-list {
  padding: 1.2rem 1.6rem;
  .item {
    padding: 0.8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-arrow-right {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
