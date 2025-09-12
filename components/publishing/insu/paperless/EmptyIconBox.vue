<template>
  <div class="wrap-empty">
    <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
    <div class="tit" v-html="title"></div>
    <div class="sut-tit" v-html="desc"></div>
    <Button btn-type="line" element-type="button" :aria-label="btnLabel" class="xs w-auto" @click="emit('btn-click')" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  title: string
  desc: string
  btnLabel: string
}>()

const emit = defineEmits<{
  (e: 'btn-click'): void
}>()
</script>

<style>
.wrap-empty {
  flex: 1;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
  }
}
</style>
