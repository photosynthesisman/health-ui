<template>
  <div v-if="totalHospitalCount > 0" class="wrap-result">
    <div class="wrap-hospital-list">
      <div v-for="(hospital, index) in hospitals" :key="hospital.name" class="item">
        <img :src="hospital.imgUrl" :alt="hospital.name + ' 로고'" class="logo" />
        <div class="wrap-info">
          <div class="tit">{{ hospital.name }}</div>
          <label class="h-label">{{ hospital.label }}</label>
        </div>
        <Checkbox
          :id="`checkBox${index}`"
          :model-value="hospital.isChecked"
          custom-style="switch tiny"
          @click.prevent="openConnectModal(hospital)"
        />
      </div>
    </div>
    <div class="wrap-find-hospital">
      <span class="text">찾으시는 병원이 없으신가요?</span>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="MY병원 찾기"
        class="xs w-auto pl-16 pr-16 medium"
        @click="clickFindSelfHospitals"
      />
    </div>
  </div>

  <!-- 연결끊기/연결하기 모달 -->
  <ConfirmModal
    :is-visible="showConfirmModal"
    :html="ConfirmModalContent"
    :title="'안내'"
    :confirm-button-text="confirmButtonText"
    cancel-button-text="취소"
    @cancel="closeConfirmModal"
    @close="closeConfirmModal"
    @confirm="handleConnectModal"
  />
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

import logoImg from '~/assets/images/insu/logo_KUMedicine.svg'

const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const confirmButtonText = ref('연결끊기')

const handleConnectModal = () => {
  closeConfirmModal()
}
const openConnectModal = async (hospital: any) => {
  if (hospital.isChecked) {
    ConfirmModalContent.value = `
    <div class="fz-16 text-left mb-n24" style="width: 28rem; color: #555;">
      ${hospital.name} 연결을 끊을까요?
      MY병원관리에서 언제든지 다시 연결할 수 있어요.
    </div>
    `
    confirmButtonText.value = '연결끊기'
  } else {
    ConfirmModalContent.value = `
    <div class="fz-16 text-left mb-n24" style="width: 28rem; color: #555;">
      ${hospital.name}을 연결할까요?
    </div>
    `
    confirmButtonText.value = '연결하기'
  }

  showConfirmModal.value = true
}
const closeConfirmModal = () => {
  showConfirmModal.value = false
}

// 병원 데이터
const hospitals = ref([
  {
    imgUrl: logoImg,
    name: '고려대학교 안암병원',
    label: '외래, 입원',
    count: 1,
    isChecked: true
  },
  {
    imgUrl: logoImg,
    name: '서울대학교병원',
    label: '외래, 입원',
    count: 1,
    isChecked: false
  },
  {
    imgUrl: logoImg,
    name: '고려대학교 안암병원',
    label: '외래, 입원',
    count: 1,
    isChecked: true
  },
  {
    imgUrl: logoImg,
    name: '서울대학교병원',
    label: '외래, 입원',
    count: 1,
    isChecked: false
  }
])

const clickFindSelfHospitals = () => {
  // navigateTo('/insu/claim/findSelfHospitals')
}

const totalHospitalCount = computed(() =>
  hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0)
)
</script>

<style lang="scss" scoped>
.wrap-result {
  .wrap-hospital-list {
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      min-width: 0;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-info {
        flex: 1 1 auto;
        min-width: 0;
        .tit {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 150%;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .h-label {
          display: inline-block;
          margin-top: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          color: #555555;
          line-height: 130%;
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #eeeeee;
        }
      }
    }
  }
  .wrap-find-hospital {
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    border-radius: 1.2rem;
    background-color: #f4f4f4;
    .text {
      color: #555;
    }
    .c-btn {
      background-color: #fff;
    }
  }
}
</style>
