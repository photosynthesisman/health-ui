<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection
        title="의료영상을 공유할<br/>병원을 선택해 주세요."
        description="제휴병원을 연결하여 의료영상을 전송할 수 있어요."
      />
    </section>
    <Button btn-type="line" element-type="button" aria-label="제휴병원 연결" />
    <hr class="hr-section mt-32 mb-0 ml-n20 mr-n20" />
    <LatestSharedItems
      :hospital-list="hospitalList"
      @select-hospital="handleSelect"
      @remove-hospital="handleRemove"
      @remove-all="handleRemoveAll"
    />
    <hr class="hr-section mt-0 mb-0 ml-n20 mr-n20" />
    <p class="pd-21y medium">
      총&nbsp;<strong>{{ hospitals.length }}</strong
      >건을 찾았어요.
    </p>
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
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import LatestSharedItems from '~/components/insu/LatestSharedItems.vue'
import HospitalItem from '~/components/insu/HospitalItem.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
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
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
