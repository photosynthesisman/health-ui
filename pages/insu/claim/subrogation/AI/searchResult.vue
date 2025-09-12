<template>
  <BaseBody
    :show-back-button="true"
    page-title="AI분석 숨은 보상금 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
    style="background-color: #f4f4f4"
  >
    <div class="pt-24 pb-32">
      <TitleSection
        title="AI분석을 통해<br/>숨은 보상금을 찾아보세요"
        description="최근 3년간 통원 및 입원 진료 내역 중<br/>질병 코드가 포함된 진료내역만 신청가능해요."
        :tooltip="'진료 내역을 업데이트해서 최근 진료 내역을 가져올 수 있어요.'"
      />
    </div>
    <FindResultBox :count="hospitalData.length" @reload="clickReload" />
    <FindResultItem :hospital-data="hospitalData" @open-agree="openAgreeModal" @open-modal="handleOpenModal" />

    <!-- 진료내역 확인 풀모달 -->
    <FullModal
      :is-visible="isShowFullModal"
      v-bind="fullModalProps"
      @confirm="clickFullConfirm"
      @close="toggleFullModal"
    >
      <template #content>
        <AiAnalysisConfirmHistory
          :medical-history-data="medicalHistoryData"
          :hospital="selectedHospital.name"
          :img-src="selectedHospital.logoSrc"
        />
      </template>
    </FullModal>

    <BottomModal
      :is-visible="isShowAgreeModal"
      title="약관동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하고 다음"
      :disabled-confirm-button="!allTermsChecked"
      @close="isShowAgreeModal = false"
      @confirm="clickNext"
    >
      <template #content>
        <AiAnalysisAgreeTerms
          :title="'AI분석 숨은 보상금을 찾아보고<br/> 전문가 무료상담을 위해 동의가 필요해요.'"
          :subtit="'숨은 보상금이 얼마인지 알아보고 내 보험의 부족한 보장<br/> 내용과 적정 보험료도 확인할 수 있어요.'"
          :terms-data="termsData"
          @term-click="handleTermClick"
        />
      </template>
    </BottomModal>

    <FullModal
      :is-visible="isShowDetailTerm1"
      title="[필수] 민감정보(진료정보) 제3자 제공 동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm1 = false"
      @confirm="clickAgreeTerm1"
    >
      <template #content>
        <AiAnalysisAgreeTerms1 />
      </template>
    </FullModal>

    <FullModal
      :is-visible="isShowDetailTerm2"
      title="개인정보 제3자 제공 동의"
      :is-show-cancel-button="false"
      confirm-button-text="동의하기"
      @close="isShowDetailTerm2 = false"
      @confirm="clickAgreeTerm2"
    >
      <template #content>
        <AiAnalysisAgreeTerms2 />
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import FullModal from '~/components/common/modal/FullModal.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import AiAnalysisAgreeTerms from '~/components/insu/AiAnalysisAgreeTerms.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FindResultBox from '~/components/insu/FindResultBox.vue'
import FindResultItem from '~/components/insu/FindResultItem.vue'
import AiAnalysisAgreeTerms1 from '~/components/insu/AiAnalysisAgreeTerms1.vue'
import AiAnalysisAgreeTerms2 from '~/components/insu/AiAnalysisAgreeTerms2.vue'
import AiAnalysisConfirmHistory from '~/components/insu/AiAnalysisConfirmHistory.vue'
const selectedHospital = ref({ name: '', logoSrc: '' })
const clickReload = () => {
  console.log('?')
}
const openAgreeModal = () => {
  isShowAgreeModal.value = true
}
const medicalHistoryData = ref([
  {
    type: '통원',
    analysisPossible: false,
    date: '2025. 01. 20 ~ 2025. 05. 30',
    department: '영상의학과',
    cost: '123,456원'
  },
  {
    type: '통원',
    analysisPossible: true,
    date: '2025. 01. 20 ~ 2025. 05. 30',
    department: '영상의학과',
    cost: '123,456원'
  },
  {
    type: '입원',
    analysisPossible: true,
    date: '2025. 01. 20 ~ 2025. 05. 30',
    department: '영상의학과',
    cost: '123,456원'
  },
  {
    type: '입원',
    analysisPossible: true,
    date: '2025. 01. 20 ~ 2025. 05. 30',
    department: '영상의학과',
    cost: '123,456원'
  }
])
const termsData = ref([
  {
    id: 'checkBox2',
    label: '[필수] 민감정보(진료정보) 제3자 제공 동의',
    checked: false
  },
  {
    id: 'checkBox3',
    label: '[필수] 개인정보 제3자 제공 동의',
    checked: false
  }
])

const allTermsChecked = computed(() => {
  return termsData.value.every(item => item.checked)
})
const handleTermClick = (index: number) => {
  if (index === 0) {
    showDetailTerm1()
  } else if (index === 1) {
    showDetailTerm2()
  }
}

const isShowFullModal = ref(false)
const fullModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const handleOpenModal = (hospital: { name: string; logoSrc: string }) => {
  selectedHospital.value = hospital
  isShowFullModal.value = true
}
const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}
const clickFullConfirm = () => {
  toggleFullModal()
}

const isShowAgreeModal = ref(false)
const isShowDetailTerm1 = ref(false)
const isShowDetailTerm2 = ref(false)

const showDetailTerm1 = () => {
  isShowDetailTerm1.value = !isShowDetailTerm1.value
}

const showDetailTerm2 = () => {
  isShowDetailTerm2.value = !isShowDetailTerm2.value
}

const clickAgreeTerm1 = () => {
  isShowDetailTerm1.value = !isShowDetailTerm1.value
  termsData.value[0].checked = true
}
const clickAgreeTerm2 = () => {
  isShowDetailTerm2.value = !isShowDetailTerm2.value
  termsData.value[1].checked = true
}
const clickNext = () => {
  // 무료 상담신청으로 이동
  return navigateTo('/insu/claim/subrogation/AI/freeConsultingRequest')
}

const hospitalData = ref([
  {
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '경북대학교병원1',
    totalRecords: 3,
    claimableRecords: 2,
    applicationDate: '2025.04.15 12:12',
    analysisResult: '숨은 보상금 수령가능'
  },
  {
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '경북대학교병원',
    totalRecords: 3,
    claimableRecords: 2,
    applicationDate: null,
    analysisResult: null
  },
  {
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '경북대학교병원',
    totalRecords: 3,
    claimableRecords: 2,
    applicationDate: null,
    analysisResult: null
  }
])
</script>

<style scoped lang="scss"></style>
