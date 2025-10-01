<template>
  <BaseBody page-title="주문완료" :show-back-button="false" :has-close-btn="true">
    <FlexSection class="gap-48 mt-48 align-center">
      <GiftRecipient />
      <PaymentSummary gift-type />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="스토어로 돌아가기" class="lg btn-sticky w-full" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import FlexSection from '~/components/page/FlexSection.vue'
import PaymentSummary from '~/components/publishing/payment/PaymentSummary.vue'
import GiftRecipient from '~/components/publishing/payment/GiftRecipient.vue'
const props = defineProps({
  imageName: { type: String, default: RewardImage1 },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  giftType: { type: String, default: '상품 타입' },
  point: { type: Number, default: 0 }
})
</script>
