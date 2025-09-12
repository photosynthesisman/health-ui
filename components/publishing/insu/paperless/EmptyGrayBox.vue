<template>
  <div class="wrap-empty-gray">
    <span class="text" v-html="text"></span>
    <Button
      btn-type="line"
      element-type="button"
      :aria-label="btnLabel"
      class="xs w-auto pl-16 pr-16 medium"
      @click="emit('btn-click')"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  text: string
  btnLabel: string
}>()

const emit = defineEmits<{
  (e: 'btn-click'): void
}>()
</script>

<style lang="scss" scoped>
.wrap-empty-gray {
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  // border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  .text {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
  }
  :deep(.btn-line) {
    background-color: #fff;
    .text {
      color: #555;
    }
  }
}
</style>
