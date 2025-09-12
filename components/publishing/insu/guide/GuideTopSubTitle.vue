<template>
  <div class="wrap-guide-info">
    <img :src="imgUrl" :alt="title" class="icon-info" />
    <div class="wrap-info">
      <div class="tit">{{ title }}</div>
      <div class="tit-sub">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  imgUrl: string
  title: string
  subTitle: string
}>()
</script>

<style lang="scss" scoped>
.wrap-guide-info {
  margin-top: 1.6rem;
  @include mixin.flex-container(items-center);
  gap: 1rem;
  .icon-info {
    width: 4rem;
  }
  .wrap-info {
    .tit {
      font-weight: 700;
      color: #555555;
    }
    .tit-sub {
      margin-top: 0.2rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
</style>
