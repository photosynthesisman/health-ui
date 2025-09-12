<template>
  <div class="wrap-adv">
    <div class="tit">김레몬님, 숨은 보상금<br />상담 신청에 감사드려요.</div>
    <div class="tit-sub">전문전문 상담사가 평일 기준 2일 이내에<br />연락드릴게요. (평일 연락 시09:00~18:00)</div>
  </div>
  <div class="wrap-info-lists mb-50">
    <div class="item">숨은 보상금 수령 상담은 (주)에이플러스에셋의 보상전문 상담사를 통해 이루어져요.</div>
    <div class="item">숨은 보상금 상담 뿐만 아니라 내 보험 보장 내용에 대해서도 상담해 드려요.</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-info-lists {
  margin-top: 0.8rem;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
      border-radius: 50%;
    }
  }
}
.wrap-adv {
  margin: 3.2rem 0 0;
  padding: 2.4rem;
  background-color: #ddf6f6;
  border-radius: 1.2rem;
  background: url('/assets/images/insu/img-bg-completed2.png') calc(100% - 2.4rem) 2.2rem no-repeat #e7f4ff;
  background-size: auto;
  .tit {
    font-size: 1.8rem;
    font-weight: 700;
  }
  .tit-sub {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
  }
}
</style>
