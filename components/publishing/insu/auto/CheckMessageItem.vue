<template>
  <h3 class="tit-info">{{ section.title }}</h3>
  <div class="wrap-info-lists">
    <div v-for="(item, idx) in section.items" :key="idx" class="item" v-html="item"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  section: {
    title: string
    items: string[]
  }
}>()
</script>

<style lang="scss" scoped>
.tit-info {
  margin-top: 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
}
.wrap-info-lists {
  padding: 1rem 0;
  + .tit-info {
    margin-top: 1.2rem;
  }
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
