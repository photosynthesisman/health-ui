<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection
        title="공유할 의료영상 내역을<br/>확인해주세요"
        description="공유 진행 시 아래 공유내역을 전송할 수 있어요."
      />
    </section>
    <HospitalInfoField :name="hospitalName" :logo-src="logoSrc" label="공유 병원명" />
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :is-share-date="true"
      :is-issue-date="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
    <ButtonGroup class="is-fixed half">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky">취소</Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky">의료영상 공유</Button>
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import HospitalInfoField from '~/components/insu/HospitalInfoField.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

const hospitalName = ref('경북대학교병원')
const logoSrc = ref('/_nuxt/assets/images/insu/logo_KUMedicine.svg')

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
