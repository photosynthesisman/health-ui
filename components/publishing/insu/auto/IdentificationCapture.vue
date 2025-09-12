<template>
  <img class="img-identification" :src="imageSrc" :alt="imageAlt" />
  <button type="button" class="btn-take-picture" @click="$emit('shot')">
    <i class="icon-camera"></i>{{ shotTxt }}
  </button>
  <div class="wrap-info-lists">
    <div class="item">반드시 본인의 신분증 앞면을 글씨가 잘 보이도록 촬영해 주세요.</div>
    <div class="item">빛이 반사 되거나 기타 이유로 신분증 내용 확인이 어려운 경우 재촬영 요구가 있을 수 있어요.</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc: string
  imageAlt: string
  shotTxt: string
}>()

defineEmits<{
  (e: 'shot'): void
}>()
</script>

<style lang="scss" scoped>
.img-identification {
  margin-top: 3.2rem;
}
.btn-take-picture {
  @include mixin.flex-container(justify-center items-center);
  gap: 0.6rem;
  padding: 1.4rem 2rem;
  border-radius: 5rem;
  background-color: #4f5561;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  width: max-content;
  margin: 1.6rem auto 0;
  .icon-camera {
    display: inline-block;
    background: url('/assets/images/insu/auto/icon-camera.svg') no-repeat center center;
    background-size: contain;
    width: 2rem;
    height: 2rem;
  }
}
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
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
    }
  }
}
</style>
