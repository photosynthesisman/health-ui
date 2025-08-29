<template>
  <div class="no-mission">
    <div class="img-box">
      <img src="~/assets/images/healthDebt/img-mission-empty.svg" alt="" />
    </div>
    <strong>선택된 맞춤미션이 없습니다.</strong>
    <Button btn-type="line" element-type="button" aria-label="맞춤미션 선택하기" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>

<style lang="scss" scoped>
.no-mission {
  width: 100%;
  position: relative;
  padding-block: 3.2rem;
  margin-block: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  .img-box {
    width: 15.6rem;
    height: 4.8rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  strong {
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #555;
  }
  .c-btn {
    width: auto;
    height: auto;
    padding: 0.8rem 1rem;
    font-size: 1.4rem;
    font-weight: 400;
  }
  &:deep(.c-btn.btn-line .text) {
    color: #555;
  }
}
</style>
