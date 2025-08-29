<template>
  <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
    <div class="fz-14 semibold">1. 수집 · 이용에 관한 사항</div>
    <div class="agree-txt-box fz-14 flex flex-col gap-2">
      <div class="semibold">제1조(목적)</div>
      보험약관내용을 입력해주세요.
    </div>
    <div class="agree-txt-box fz-14 flex flex-col gap-2">
      <div class="semibold">제2조(용어의 정의)</div>
      본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
      <ol class="num-type">
        <li>보험약관내용을 입력해주세요.</li>
        <li>보험약관내용을 입력해주세요.</li>
        <li>보험약관내용을 입력해주세요.</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    ol.num-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;
      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 2.4rem;
        margin-bottom: 0.8rem;
        line-height: 1.6;
        &::before {
          content: '(' counter(list-counter) ')';
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 500;
          color: #333;
        }
      }
    }
  }
}
</style>
