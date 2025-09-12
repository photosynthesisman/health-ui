<template>
  <div class="wrap-search-hospital">
    <img src="/assets/images/insu/auto/img-search-hospital.svg" alt="병원 검색" class="img" />
    <div class="tit">자동청구 가능한<br />병원을 찾고 있어요.</div>
    <div class="sut-tit">최대 1분까지 걸릴 수 있어요.</div>
    <img class="img-loading" src="/assets/images/insu/auto/img-loading.svg" alt="로딩중" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-search-hospital {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tit {
    margin-top: 0.8rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 130%;
    text-align: center;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 2.4rem;
    color: #555;
    text-align: center;
  }
  .img-loading {
    animation: rotate 2s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
