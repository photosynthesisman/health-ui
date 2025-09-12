<template>
  <div class="package-btn-wrap">
    <div class="package-img">
      <img
        src="~/assets/images/lottery/img-package.svg"
        alt="[첫 걸음 환영 패키지] 최초 가입 후 30일까지만 구매 가능한 웰컴 패키지예요! 걸음수x2 (부스터 1시간) + 걸음수x3 (부스터 1시간) + 레몬포인트 1,000P"
      />
      <p class="desc">구매 가능 시간이 <span>20일 5시간 30분 20초</span> 남았어요!</p>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="패키지 990원에 구매하기" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>

<style lang="scss" scoped>
.package-btn-wrap {
  width: 100%;
  position: relative;
  border-radius: 1.2rem;
  overflow: hidden;
  margin-bottom: 1.6rem;
  .package-img {
    width: 100%;
    height: auto;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .desc {
      width: 100%;
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.024rem;
      text-align: center;
      position: absolute;
      bottom: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      span {
        color: #f14960;
      }
    }
  }
  .c-btn {
    border-radius: 0;
  }
}
</style>
