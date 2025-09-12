<template>
  <div class="wrap-adv">
    <div class="tit">AI 보상금 미리계산하기</div>
    <div class="tit-sub">내가 받을 수 있는<br />보상금은 얼마일까?</div>
    <Button btn-type="primary" element-type="button" aria-label="확인하기" class="medium" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>

<style lang="scss" scoped>
.wrap-adv {
  margin: 3.2rem 0 0;
  padding: 2.4rem;
  background-color: #ddf6f6;
  border-radius: 1.2rem;
  background: url('/assets/images/insu/img-bg-completed.png') calc(100% - 1rem) calc(100% - 1.5rem) no-repeat #ddf6f6;
  background-size: auto;
  .tit {
    font-weight: 700;
    color: #279b9b;
  }
  .tit-sub {
    margin-top: 0.4rem;
    font-size: 2.2rem;
    font-weight: 700;
  }
  .c-btn {
    margin-top: 2.4rem;
    width: 10.5rem;
    background-color: #279b9b;
  }
}
</style>
