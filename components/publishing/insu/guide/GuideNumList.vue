<template>
  <div class="wrap-guide-list">
    <h2 class="c-tit-guide" v-html="guideTitle"></h2>
    <ul class="wrap-guide-num-list">
      <li v-for="(item, i) in items" :key="i" class="wrap-guide-num">
        <div class="wrap-guide-text">
          <div class="tit" v-html="item.numTitle"></div>
          <div class="tit-sub" v-html="item.numSubTitle"></div>
        </div>
        <img :src="item.imgUrl" :alt="item.numTitle" class="img-guides" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  guideTitle: string
  items: {
    numTitle: string
    numSubTitle: string
    imgUrl: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.wrap-guide-list {
  width: 100%;
  position: relative;
  padding-block: 3.2rem 4.8rem;
  .c-tit-guide {
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 700;
    margin-bottom: 2.4rem;
  }
  .wrap-guide-num-list {
    width: 100%;
    position: relative;
    counter-reset: number 0;
    .wrap-guide-num {
      position: relative;
      &::before {
        content: '';
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #4f5561;
        position: absolute;
        top: 0.2rem;
        left: 0;
      }
      &::after {
        content: counter(number);
        counter-increment: number 1;
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        position: absolute;
        top: 0.6rem;
        left: 0.65rem;
      }
      .wrap-guide-text {
        width: 100%;
        position: relative;
        padding-left: 3rem;
        margin-bottom: 1.6rem;
        @include mixin.flex-container(items-start);
        flex-direction: column;
        gap: 0.2rem;
        .tit {
          font-size: 1.8rem;
          line-height: 1.4;
          font-weight: 700;
        }
        .tit-sub {
          font-size: 1.6rem;
          line-height: 1.4;
          font-weight: 500;
          color: #555;
        }
      }
      .img-guides {
        width: calc(100% + 4rem);
        max-width: calc(100% + 4rem);
        height: auto;
        object-fit: cover;
        margin-left: -2rem;
      }
      & + .wrap-guide-num {
        margin-top: 4.8rem;
      }
    }
  }
}
</style>
