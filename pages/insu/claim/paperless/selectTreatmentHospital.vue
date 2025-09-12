<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-28"
  >
    <TitleSection
      title="다녀온 병원을 선택해주세요."
      description="최근 3년간 MY병원 진료내역이에요."
      tooltip="MY병원을 연결해 최근 진료 내역을 업데이트할 수 있어요."
      class="mt-24 mb-16"
    />
    <Button btn-type="line" element-type="button" aria-label="MY병원 연결하기" />
    <hr class="hr-section mt-32 mb-8 ml-n20 mr-n20" />
    <LineTabs :tabs="tabs" />
    <SelectClaimHospitalCount :count="totalHospitalCount" />
    <EmptyIconBox
      v-if="totalHospitalCount === 0"
      title="MY병원의 진료내역을 찾지 못했어요."
      desc="서류없이 청구 가능한 병원을<br />직접 찾아서 청구 할 수 있어요."
      btn-label="직접 병원 찾기"
      @click="clickFindSelfHospitals"
    />
    <FlexSection v-else>
      <SelectClaimHospitalList :hospitals="hospitals" @click-claim="clickBottomModal" />
      <EmptyGrayBox text="찾고 있는 병원이 없나요?" btn-label="직접 병원 찾기" @click="clickFindSelfHospitals" />
    </FlexSection>
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="wrap-radio-btn">
            <RadioImg
              id="rdo1"
              name="rdo1"
              checked
              custom-style="button has-icon"
              text="본인"
              :icon-src="iconId"
              icon-alt="아이콘:본인"
            />
            <RadioImg
              id="rdo2"
              name="rdo1"
              custom-style="button has-icon"
              text="가족"
              :icon-src="iconFamily"
              icon-alt="아이콘:가족"
            />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import { ConfirmModal, BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconId from '~/assets/images/insu/icon-id.svg'
import iconFamily from '~/assets/images/insu/icon-family.svg'
import SelectClaimHospitalList from '~/components/publishing/insu/paperless/SelectClaimHospitalList.vue'
import EmptyGrayBox from '~/components/publishing/insu/paperless/EmptyGrayBox.vue'
import EmptyIconBox from '~/components/publishing/insu/paperless/EmptyIconBox.vue'
import SelectClaimHospitalCount from '~/components/publishing/insu/paperless/SelectClaimHospitalCount.vue'

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const clickCancel = () => {}

const clickConfirm = () => {}

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: '통원', to: '/insu/claim/paperless/selectTreatmentHospital' },
  { title: '입원', to: '/insu/claim/paperless/selectHospitalization' }
])

// 병원 데이터
const hospitals = ref([
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    count: 1,
    bills: [
      { date: '2025.01.20 ~ 2025.05.30', department: '영상의학과', cost: '123,456원' },
      { date: '2025.01.20 ~ 2025.05.30', department: '영상의학과', cost: '123,456원' }
    ]
  },
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '서울대학교병원',
    count: 1,
    bills: [
      { date: '2025.02.15 ~ 2025.06.10', department: '내과', cost: '234,567원' },
      { date: '2025.03.01 ~ 2025.07.20', department: '외과', cost: '345,678원' }
    ]
  }
])

// 각 병원의 내역 표시 상태를 개별적으로 관리
const billVisibleStates = ref(hospitals.value.map(() => false))

const toggleBill = (index: number) => {
  billVisibleStates.value[index] = !billVisibleStates.value[index]
}

const clickFindHospitals = () => {
  navigateTo('/insu/claim/paperless/selectTreatmentHospital')
}

const clickFindSelfHospitals = () => {
  navigateTo('/insu/claim/paperless/findSelfHospitals')
}

const totalHospitalCount = computed(() =>
  hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0)
)

const bottomModalProps = ref({
  title: '누가 병원에 다녀왔나요?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  // 본인 방문 & 가족방문 레이아웃 수정
  :deep(.c-radiotype.button) {
    flex: 1 1 100%;
    .c-label {
      width: 100%;
      height: auto;
    }
  }
}
</style>
