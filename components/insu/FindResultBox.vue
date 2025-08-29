<template>
  <div class="wrap-recent-searches">
    <div class="text">
      총 <strong>{{ count }}</strong
      >건을 찾았어요.
    </div>
    <button class="btn-reload" @click.stop="clickReload">
      <i class="icon ico-reload"></i>
      <span class="date">2025.04.11 12:12</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  count: number
}>()
const emit = defineEmits<{
  reload: []
}>()
const clickReload = () => {
  emit('reload')
}
</script>

<style scoped lang="scss">
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -2rem 2rem;
  padding: 1.4rem 2rem;
  background-color: #fff;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.btn-reload {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.6rem;
  background: #fff;
  border-radius: 1.8rem;
  border: 0.1rem solid #e2e2e2;
  .ico-reload {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M14.5666 6.01042C13.5241 4.21079 11.5757 3 9.34409 3C6.81385 3 4.64765 4.55651 3.75325 6.76302M12.7355 6.76302H15.75V3.7526M4.1834 12.0313C5.22586 13.8309 7.1743 15.0417 9.40591 15.0417C11.9362 15.0417 14.1024 13.4852 14.9968 11.2786M6.01455 11.2786H3V14.2891' stroke='%23555555' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat center center;
    background-size: contain;
    width: 1.8rem;
    height: 1.8rem;
    display: block;
  }
  .date {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: #555;
  }
}
</style>
