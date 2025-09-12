<template>
  <div class="total-my-hospotal">
    <div class="total">
      총 <strong>{{ count }}</strong
      >건의 병원을 찾았어요.
    </div>
    <div v-if="question" class="info">
      <img class="icon-question" src="/assets/images/insu/icon-question.svg" alt="질문" />
      <span class="text" @click="emit('open-modal')">{{ question }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  count: number
  question?: string
}>()

const emit = defineEmits<{
  (e: 'open-modal'): void
}>()
</script>

<style lang="scss" scoped>
.total-my-hospotal {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    icon-question {
      width: 1.6rem;
      height: 1.6rem;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;
      color: #2b2b2b;
    }
  }
}
</style>
