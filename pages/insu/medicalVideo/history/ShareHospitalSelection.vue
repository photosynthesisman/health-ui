<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <TitleSection
      title="의료영상을 공유할<br/>병원을 선택해 주세요."
      description="제휴병원을 연결하여 의료영상을 전송할 수 있어요.<br/>제휴병원이 아닌 병원으로는 이메일로 발송해주세요."
      class="mt-24"
    />
    <FlexSection class="gap-8 mt-32">
      <P class="fz-14">이메일로 발송할게요</P>
      <Button btn-type="line" element-type="button" aria-label="이메일로 발송하기" />
    </FlexSection>
    <hr class="hr-section mt-32 mb-0 ml-n20 mr-n20" />
    <LatestSharedItems
      :hospital-list="hospitalList"
      @select-hospital="handleSelect"
      @remove-hospital="handleRemove"
      @remove-all="handleRemoveAll"
    />
    <hr class="hr-section mt-0 mb-0 ml-n20 mr-n20" />
    <HospitalItemHeader :count="hospitals.length" />
    <HospitalItem v-for="hospital in hospitals" :key="hospital.id" :hospital="hospital" :model-value="false" />

    <ConfirmModal
      :is-visible="showConfirmModal"
      :html="ConfirmModalContent"
      confirm-button-text="네"
      cancel-button-text="아니오"
      @confirm="handleConfirmBtn"
      @cancel="closeModal"
      @close="closeModal"
    />
    <!-- <FloatingEmailBtn @click-email="clickEmail" /> -->
  </BaseBody>
</template>
<script setup lang="ts">
import InputMail from '~/components/publishing/input/InputMail.vue'
import Button from '~/components/publishing/button/Button.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FloatingEmailBtn from '~/components/insu/FloatingEmailBtn.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import LatestSharedItems from '~/components/insu/LatestSharedItems.vue'
import HospitalItemHeader from '~/components/insu/HospitalItemHeader.vue'
import HospitalItem from '~/components/insu/HospitalItem.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import FlexSection from '~/components/page/FlexSection.vue'
const showEmail = ref(false)
const clickEmail = () => {
  showEmail.value = !showEmail.value
}
// 병원 데이터
const hospitals = ref([
  {
    id: 1,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  },
  {
    id: 2,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  },
  {
    id: 3,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  },
  {
    id: 4,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  },
  {
    id: 5,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  },
  {
    id: 6,
    href: '/insu/medicalVideo/history/confirmSharedData',
    logo: 'insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원'
  }
])
const hospitalList = ref([
  {
    id: 1,
    name: '고려대학교 안암병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    video: true
  },
  {
    id: 2,
    name: '세브란스병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    video: true
  },
  {
    id: 3,
    name: '강남세브란스병원',
    logoSrc: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    email: true
  }
])

const handleSelect = (type: string, selectedHospital: any) => {
  if (type === 'video') {
    navigateTo('/insu/medicalVideo/history/confirmSharedData')
  } else if (type === 'email') {
    openConfirmModal()
  }
}
const handleRemove = (removedHospital: any) => {
  hospitalList.value = hospitalList.value.filter(hospital => hospital.id !== removedHospital.id)
}
const handleRemoveAll = () => {
  hospitalList.value = []
}

const ConfirmModalContent = ref('')
const openConfirmModal = () => {
  ConfirmModalContent.value = `
    <div class="fz-18 bold text-center">선택한 병원은 이메일 전달하기만 가능해요</div>
    <div class="fz-14 mt-6 text-center">제휴병원에 의료영상을 이메일로 전달하시겠어요?</div>`
  showConfirmModal.value = true
}
const showConfirmModal = ref(false)
const handleConfirmBtn = () => {
  closeModal()
}

const closeModal = () => {
  showConfirmModal.value = false
}
</script>
<style scoped></style>
