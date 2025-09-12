<template>
  <!-- ToDo: 터치 시작하면 .wrap-sign에 .active 추가  -->
  <div class="wrap-sign active">
    <button class="btn-cancel">
      <i class="icon ico-cancel"></i>
    </button>
    <div class="text">손가락으로 직접<br />여기에 서명해 주세요.</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-sign {
  margin-top: 1.6rem;
  background-color: #f4f4f4;
  border: 0.1rem solid #e2e2e2;
  border-radius: 0.8rem;
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &.active {
    background-color: #fff;
    .btn-cancel {
      display: flex;
    }
    .text {
      display: none;
    }
  }
  .text {
    text-align: center;
    font-weight: 500;
    color: #959595;
  }
  .btn-cancel {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .ico-cancel {
      width: 2.4rem;
      height: 2.4rem;
      background: url('/assets/images/insu/subrogation/icon-round-cancel.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
