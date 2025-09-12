<template>
  <div class="wrap-pay-info">
    <div class="pay-text">총 결제 금액</div>
    <div class="pay-amount">{{ totalPrice.toLocaleString() }}원</div>
  </div>
  <div class="wrap-btn-pay">
    <Button
      btn-type="line"
      element-type="button"
      aria-label="신용/체크카드"
      class="btn-card"
      icon="ico-card"
      :icon-size="24"
    />
    <Button
      btn-type="line"
      element-type="button"
      aria-label="네이버페이"
      class="btn-naver"
      icon="ico-naver"
      :icon-size="24"
    />
  </div>
</template>

<script setup>
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.wrap-pay-info {
  text-align: center;
  padding: 0.8rem 0;
  .pay-text {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .pay-amount {
    margin-top: 0.4rem;
    font-size: 2.6rem;
    font-weight: 700;
    color: #4c7ff7;
  }
}
.wrap-btn-pay {
  margin: 1.6rem 0 2.4rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 0.8rem;
}
</style>
