<template>
  <div class="challenge-result-wrap">
    <div v-if="showHistoryLink" class="history-move">
      <nuxt-link to="javascript:void(01)">총 시상/경품내역<i class="icon ico-arrow-right"></i></nuxt-link>
    </div>
    <div class="challenge-result-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  showHistoryLink?: boolean
}

withDefaults(defineProps<Props>(), {
  showHistoryLink: false
})
</script>
<style lang="scss" scoped>
.challenge-result-wrap {
  margin-top: 3.2rem;
  .history-move {
    margin-bottom: 1.6rem;
    display: flex;
    justify-content: end;
    a {
      display: flex;
      align-items: center;
    }
    .icon {
      display: inline-block;
      margin-left: 0.2rem;
      align-self: center;
      width: 1.6rem;
      height: 1.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.00065 4.6665L9.33398 7.99984L6.00065 11.3332' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
  .challenge-result-box {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    padding: 2.4rem 1.65rem 1.6rem;
    background: #dbe5fd;
    border-radius: 2rem;
  }
}
</style>
