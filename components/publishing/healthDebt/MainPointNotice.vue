<template>
  <div class="main-point-notice">
    <div class="notice-tit">
      <i class="emoji-wrap"> <img src="~/assets/images/emoji/hurt.svg" alt="아파" /> </i>미세먼지 나쁨
    </div>
    <div class="notice-contents">
      <!-- prettier-ignore -->
      <p class="contents-txt">
        마스크 꼭 챙기시고 
포인트 받으세요.
      </p>
      <button type="button" class="btn-point">
        <i class="icon ico-point"></i>
        1,000P 받기
      </button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.main-point-notice {
  border-radius: 1.2rem;
  margin-bottom: 4.2rem;
  padding: 2rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(1rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  position: relative;
  .notice-tit {
    display: flex;
    gap: 0 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #2b2b2b;
    align-items: center;
    .emoji-wrap {
      width: 2.8rem;
      height: 2.8rem;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .notice-contents {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0 1.2rem;
    .contents-txt {
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
      white-space: pre-line;
      flex: 1;
    }
  }
  .btn-point {
    background-color: vars.$white;
    border-radius: 1.8rem;
    padding: 0 1.2rem;
    font-size: 1.3rem;
    line-height: 3.6rem;
    height: 3.4rem;
    font-weight: 700;
    color: #555;
    display: inline-flex;
    align-items: center;
    gap: 0 0.4rem;
    position: relative;
    @include mixin.rippleEffectPrimary;
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
