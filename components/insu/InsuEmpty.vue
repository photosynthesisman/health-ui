<template>
  <div class="wrap-empty">
    <img :src="imgSrc" alt="병원 없음" class="img" />
    <div>
      <div class="tit" v-html="title"></div>
      <div v-if="subTitle" class="sub-tit" v-html="subTitle"></div>
    </div>
    <Button
      v-if="button"
      btn-type="line"
      element-type="a"
      :href="href"
      :aria-label="btnTitle"
      class="xs w-auto"
      :class="{ 'has-icon': hasIcon }"
    />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps({
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  btnTitle: { type: String, default: '제휴병원 다시 찾기' },
  href: { type: String, default: '#' },
  button: { type: Boolean, default: false },
  hasIcon: { type: Boolean, default: false },
  imgSrc: { type: String, default: '/_nuxt/assets/images/insu/icon-empty.svg' }
})
</script>

<style lang="scss" scoped>
.wrap-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 0 2rem;
  min-height: 30rem;
  .img {
    width: 6rem;
    height: 6rem;
  }
  .tit {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
    text-align: center;
  }
  .sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: #555;
    text-align: center;
  }
  .c-btn {
    &.btn-line {
      padding: 0.7rem 1.4rem;
      :deep(.text) {
        display: inline-block;
        padding: 0;
        color: #555;
        font-size: 1.4rem;
        line-height: 2rem;
      }
      &.has-icon {
        padding-left: 3.6rem;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M9.4999 5.90039L9.4999 13.1004M13.0999 9.50039L5.8999 9.50039' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
          left 1.4rem center / 1.8rem no-repeat;
      }
    }
  }
}
</style>
