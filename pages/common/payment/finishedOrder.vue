<template>
  <BaseBody page-title="주문완료" :show-back-button="false" :has-close-btn="true">
    <FlexSection class="gap-24 mt-48 align-center">
      <h2 class="bold">구매완료</h2>
      <img :src="imageName" alt="선물 이미지" style="width: 14.4rem" />
      <FlexColDiv class="align-center">
        <CommonBadge>{{ giftType }}</CommonBadge>
        <p class="mt-6 medium">{{ giftName }}</p>
        <p class="mt-12 bold">{{ point }}P</p>
      </FlexColDiv>
      <PaymentSummary />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="아이템 사용" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="button" aria-label="스토어로 돌아가기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import PaymentSummary from '~/components/publishing/payment/PaymentSummary.vue'
const props = defineProps({
  imageName: { type: String, default: RewardImage1 },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  giftType: { type: String, default: '상품 타입' },
  point: { type: Number, default: 0 }
})
</script>
