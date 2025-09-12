<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <FlexSection class="gap-32 mt-24">
      <TitleSection
        title="의료영상 환불 진행을 위해<br/>환불 내역을 확인해주세요."
        description="환불 후에는 의료영상을 재발급 받아야 전송할 수 있어요."
      />

      <IssuanceHistoryDetail :details-list="updatedDetailInfos" />
      <FlexColDiv class="gap-12">
        <Select
          v-model="selectedReason"
          :label="'환불 사유'"
          :modal-title="'환불 사유'"
          :select-placeholder="'환불 사유를 선택해주세요.'"
          :is-show-cancel-btn="false"
          :custom-opts="refundOptions"
        />
        <InputText
          v-if="selectedReason === '직접입력'"
          :label="'사유 직접 입력'"
          placeholder="환불 사유를 입력해주세요."
        />
      </FlexColDiv>
      <MedicalHistoryAccordion
        :medical-history="medicalInfos"
        :is-label-title="true"
        :is-share-date="true"
        :is-issue-date="true"
        :label-title="'의료영상 발급내역'"
      />
    </FlexSection>
    <ButtonGroup class="is-fixed half">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky">취소</Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky" @click="clickNext">환불 진행하기</Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import IssuanceHistoryDetail from '~/components/insu/IssuanceHistoryDetail.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
const selectedReason = ref('')
const clickNext = () => {
  return navigateTo('/insu/medicalVideo/history/refundedDataComplete')
}
const refundOptions = [
  { value: '이용안함', label: '이용안함' },
  { value: '영상오류', label: '영상오류' },
  { value: '직접입력', label: '직접입력' }
]
const detailInfos = ref([
  {
    id: 1,
    title: '영상 발급료',
    price: 10000
  },
  {
    id: 2,
    title: '클라우드 사용료',
    price: 10000
  },
  {
    id: 3,
    title: '부가세',
    price: 1000
  },
  {
    id: 4,
    title: '총 결제금액',
    price: 0
  },
  {
    id: 5,
    title: '환불 금액',
    price: 0,
    isRefunded: true
  }
])
const updatedDetailInfos = computed(() => {
  const infos = detailInfos.value
  const price1 = infos.find(item => item.id === 1)?.price || 0
  const price2 = infos.find(item => item.id === 2)?.price || 0
  const price3 = infos.find(item => item.id === 3)?.price || 0

  const totalPrice = price1 + price2 + price3

  return infos.map(item => {
    if (item.id === 4 || item.id === 5) {
      return { ...item, price: totalPrice }
    }
    return item
  })
})

const medicalInfos = [
  {
    id: 1,
    title: '공유 병원명',
    hospitalName: '고려대학병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    accessDate: '2025.06.25',
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    departments: [
      {
        id: 101,
        department: '내과',
        examinations: [
          {
            id: 1001,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 1002,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 102,
        department: '정형외과',
        examinations: [
          {
            id: 1003,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  }
]
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
