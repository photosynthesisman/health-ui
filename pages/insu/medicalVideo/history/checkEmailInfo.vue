<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <TitleSection
      title="발송할 병원명, 이메일 주소,<br/>비밀번호를 설정해주세요."
      description="의료영상에 대해 웹 주소 형태로 이메일을 보낼 수 있어요."
      class="mt-24"
    />
    <FlexSection class="gap-12 mt-32">
      <InputText v-model:model-value="hospitalName" label="공유 병원명" placeholder="공유할 병원명을 입력해주세요." />
      <InputMail
        v-model:model-value="hospitalEmail"
        label="병원 이메일 주소 입력"
        :is-valid="false"
        valid-text="올바른 이메일 주소를 입력해주세요."
        placeholder="이메일을 입력해주세요"
        :custom-domains="[
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'naver.com', label: 'naver.com' },
          { value: 'daum.net', label: 'daum.net' },
          { value: 'kakao.com', label: 'kakao.com' }
        ]"
      />
      <InputText
        v-model:model-value="password"
        :inp-type="'masking'"
        label="의료영상 비밀번호 설정"
        type="password"
        :is-valid="false"
        valid-text="비밀번호 벨리데이터 메시지"
        placeholder="비밀번호를 입력해주세요 (숫자 4~10자리)"
      />
    </FlexSection>
    <!-- 2025-09-04 HistoryDetail 삭제 -->
    <!-- <HistoryDetail :details-list="detailInfos" /> -->
    <MedicalHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :label-title="'의료영상 발급내역'"
      class="mt-32"
    />
    <ButtonGroup class="is-fixed half">
      <Button btn-type="primary" element-type="button" class="lg btn-sticky w-full" :disabled="!isFormValid"
        >이메일 발송하기</Button
      >
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'
import HistoryDetail from '~/components/insu/HistoryDetail.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import MedicalHistoryAccordion from '~/components/insu/MedicalHistoryAccordion.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

const hospitalName = ref('')
const hospitalEmail = ref('')
const password = ref('')

const isFormValid = computed(() => {
  return hospitalName.value.trim() !== '' && hospitalEmail.value.trim() !== '' && password.value.trim() !== ''
})
const detailInfos = [
  {
    id: 1,
    title: '공유 병원명',
    detail: '고려대학병원'
  },
  {
    id: 2,
    title: '병원 이메일 주소',
    detail: 'kimlemon@naver.com'
  },
  {
    id: 3,
    title: '비밀번호',
    password: 5156151
  }
]
const medicalInfos = [
  {
    id: 1,
    title: '공유 병원명',
    hospitalName: '고려대학병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    accessDate: '2025.06.25',
    shareFrom: '2025.06.25',
    shareTo: '2025.08.31',
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
<style scoped></style>
