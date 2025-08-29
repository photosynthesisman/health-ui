<template>
  <div class="tooltip-icon-wrapper">
    <div class="icon" @click="toggleTooltip">
      <i class="icon-btn" :class="iconType"></i>
    </div>
    <transition name="tooltip-fade">
      <div class="tooltip" v-if="isTooltipOpen">
        <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
        <div class="text">{{ tooltipText }}</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tooltipText: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: 'info',
    validator: value => ['info', 'question'].includes(value)
  }
})

const isTooltipOpen = ref(false)

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}
</script>

<style lang="scss" scoped>
.tooltip-icon-wrapper {
  display: block;
  height: 2rem;

  .icon {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    .icon-btn {
      width: 2rem;
      height: 2rem;
      background-size: 2rem;
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      &.info {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 12V7.5M12 15.3354V15.375M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
      &.question {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M11.999 16.5V16.5396M9.75 9.22999C9.75 7.96388 10.7574 6.9375 12 6.9375C13.2426 6.9375 14.25 7.96388 14.25 9.22999C14.25 10.4961 13.2426 11.5225 12 11.5225C12 11.5225 11.999 12.2067 11.999 13.0508M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
  .text {
    word-break: keep-all;
  }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: all 0.3s ease;
}

.tooltip-fade-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.tooltip-fade-enter-to,
.tooltip-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
