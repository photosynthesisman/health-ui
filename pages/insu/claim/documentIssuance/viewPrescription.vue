<template>
  <BaseBody
    page-title="처방전 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :has-close-btn="true"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
    :white-logo="true"
    :page-type="'dark-bg'"
  >
    <ZoomInOut />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="발급하기"
      class="lg w-full medium btn-sticky"
      @click="clickPayment"
    />
  </ButtonGroup>
  <BottomModal
    :is-visible="isShowPaymentModal"
    title="결제 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    confirm-button-text="확인"
    @close="isShowPaymentModal = false"
    @confirm="clickNext"
  >
    <template #content>
      <PaymentModalContent :total-price="totalPrice" />
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import PaymentModalContent from '~/components/insu/PaymentModalContent.vue'
import ZoomInOut from '~/components/insu/ZoomInOut.vue'
const isShowPaymentModal = ref(false)
const totalPrice = ref(10000)
const clickPayment = () => {
  isShowPaymentModal.value = !isShowPaymentModal.value
}
const clickNext = () => {
  // return navigateTo('/insu/')
}
</script>

<style scoped lang="scss"></style>
