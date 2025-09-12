<template>
  <div class="c-tit-sub">
    자동청구일 : 매월 9일, 19일, 20일
    <div class="icon" @click="toggleTooltip">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 10.5V6.75M10 13.2795V13.3125M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
          stroke="#555555"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="tooltip" v-show="isTooltipOpen">
        <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
        <div class="text">청구일이 주말/공휴일인 경우 그다음날 청구돼요.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isTooltipOpen = ref(false)
const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}
</script>

<style lang="scss" scoped>
.c-tit-sub {
  align-items: flex-end;
  .icon {
    margin-bottom: 0.3rem;
  }
}
</style>
