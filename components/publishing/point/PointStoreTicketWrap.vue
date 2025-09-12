<template>
  <div class="store-ticket-wrap">
    <div class="top-box">
      <strong class="tit">챌린지 참가권</strong>
      <p class="desc">챌린지 참가권은 포인트(P)로만 구매 가능합니다.</p>
    </div>
    <div class="ticket-list">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.store-ticket-wrap {
  width: 100%;
  position: relative;
  .top-box {
    padding-bottom: 2rem;
    .tit {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.04rem;
      color: #222;
      margin-bottom: 0.6rem;
    }
    .desc {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: -0.028rem;
      color: #555;
    }
  }
  .ticket-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
    justify-items: center;
  }
}
</style>
