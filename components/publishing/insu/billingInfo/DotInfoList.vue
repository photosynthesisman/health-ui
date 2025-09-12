<template>
  <div class="wrap-info-lists">
    <div v-for="(item, idx) in items" :key="idx" class="item" v-html="item"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>

<style lang="scss" scoped>
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 00;
    color: #555555;
    & > span {
      color: #4c7ff7;
    }
    & + .item {
      margin-top: 0.8rem;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      border-radius: 50%;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
