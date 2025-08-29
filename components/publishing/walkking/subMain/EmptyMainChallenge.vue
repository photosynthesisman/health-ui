<template>
  <div class="empty-list-wrap">
    <img src="~/assets/images/walkingking/img-walking-lemon.png" />
    <p class="noti-txt" v-html="text"></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<style scoped lang="scss">
.empty-list-wrap {
  margin: 1.2rem 0;
  padding: 8rem 4rem;
  text-align: center;
  img {
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
    object-fit: cover;
  }
  .noti-txt {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
  }
}
</style>
