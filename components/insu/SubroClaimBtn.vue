<template>
  <button class="btn-claim" :class="{ 'no-doc': noDoc }">
    <div class="text" v-html="text"></div>
    <img
      v-if="noDoc"
      class="img-claim"
      src="/assets/images/insu/subrogation/icon-submain-manage.png"
      alt="서류없이 청구하기"
    />
    <img
      v-else
      class="img-claim"
      src="/assets/images/insu/subrogation/icon-submain-query.png"
      alt="사진 찍어 청구하기"
    />
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  noDoc: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.btn-claim {
  position: relative;
  padding: 2rem 1.6rem 1.6rem 2rem;
  border-radius: 1.6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.4rem;
  background-color: #31519e;
  @include mixin.rippleEffectWhite;
  &.no-doc {
    background-color: #4c7ff7;
  }
  .text {
    font-size: 1.6rem;
    font-weight: 500;
    color: #fff;
    text-align: left;
    :deep(span) {
      display: inline-block;
      opacity: 0.8;
      line-height: 2.2rem;
    }
    :deep(strong) {
      display: inline-block;
      margin-top: 0.8rem;
      font-size: 2rem;
      font-weight: 700;
      line-height: 2.6rem;
    }
  }
  .img-claim {
    align-self: flex-end;
    width: 5.6rem;
  }
}
</style>
