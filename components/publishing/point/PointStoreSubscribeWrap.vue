<template>
  <div class="store-ticket-wrap">
    <div class="top-box">
      <strong class="tit">구독권</strong>
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
    }
  }
  .ticket-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
    justify-items: center;
    padding-bottom: 4.8rem;
  }
}
</style>
