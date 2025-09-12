<template>
  <div class="challenge-result-box">
    <div class="empty-icon">
      <img src="~/assets/images/walkingking/ico-warning-white.svg" alt="알림 이미지" />
    </div>
    <p>결과가 곧 발표됩니다!</p>
    <span>공정한 결과를 위해 집계 데이터를 <br />확인하는 중이에요. <br />결과 발표까지 조금만 기다려주세요.</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.challenge-result-box {
  width: 100%;
  position: relative;
  border-radius: 2rem;
  background-color: #eef2fb;
  padding-block: 4rem;
  text-align: center;
  .empty-icon {
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  p {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
    margin-block: 1.6rem 0.8rem;
  }
  span {
    font-size: 1.6rem;
    line-height: 1.4;
    color: #555;
  }
}
</style>
