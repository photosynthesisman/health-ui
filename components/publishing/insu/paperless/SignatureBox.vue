<template>
  <div class="c-input wrap-signature">
    <div class="input-tit">본인 자필 서명</div>
    <div class="wrap-signature-square">손가락으로 직접<br />여기에 서명해 주세요.</div>
    <div class="input-desc">자필 서명을 위조해서 입력하는 경우 관련 법률에 의거 법적 처벌을 받을 수 있습니다.</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-signature {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  .input-tit {
    margin-bottom: 0.6rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    color: #555555;
    position: relative;
    &::after {
      content: '*';
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
  .wrap-signature-square {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7.7rem 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    background-color: #f4f4f4;
    font-size: 1.6rem;
    font-weight: 500;
    color: #959595;
    text-align: center;
  }
  .input-desc {
    font-size: 1.3rem;
    font-weight: 400;
    color: #959595;
    padding-inline: 0.6rem;
  }
}
</style>
