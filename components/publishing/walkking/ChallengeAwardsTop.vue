<template>
  <div class="awards-top-wrap">
    <h2 v-html="title"></h2>
    <p v-html="date"></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  date: string
}>()
</script>

<style lang="scss" scoped>
.awards-top-wrap {
  width: 100%;
  position: relative;
  padding-block: 2rem 3.2rem;
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.4;
  }
  p {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
  }
}
</style>
