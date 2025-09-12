<template>
  <div class="wrap-info">
    <button v-for="(item, index) in menuItems" :key="index" class="item" @click="clickNext(index)">
      <div class="item-info-text">
        <img class="img-qa" :src="item.img" :alt="item.alt" />
        <div class="text">{{ item.text }}</div>
      </div>
      <i class="icon-arrow-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// 부모 컴포넌트에서 menuItems 배열을 props로 받습니다.
const props = defineProps({
  menuItems: {
    type: Array as () => { text: string; img: string; alt: string }[],
    default: () => []
  }
})
const emit = defineEmits(['clickNext'])
const clickNext = (index: number) => {
  emit('clickNext', index)
}
</script>

<style lang="scss" scoped>
.wrap-info {
  margin-top: 1.2rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-radius: 1.2rem;
    padding: 1.2rem 0;
    &:not(:first-child) {
      border-top: 0.1rem solid #e2e2e2;
    }
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    .item-info-text {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      .text {
        font-size: 1.6rem;
        font-weight: 500;
        color: #2b2b2b;
        strong {
          margin-left: 0.6rem;
          font-weight: 600;
          color: #555555;
        }
      }
      .img-qa {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
    i.icon-arrow-right {
      width: 2.4rem;
      height: 2.4rem;
      background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
