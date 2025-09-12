<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
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
    <SelectClaimHospitalCount :count="totalHospitalCount" question="입원비 청구 안내" @click="clickConfirmModal" />
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
import SelectClaimHospitalCount from '~/components/publishing/insu/paperless/SelectClaimHospitalCount.vue'
import EmptyIconBox from '~/components/publishing/insu/paperless/EmptyIconBox.vue'
import EmptyGrayBox from '~/components/publishing/insu/paperless/EmptyGrayBox.vue'
import SelectClaimHospitalList from '~/components/publishing/insu/paperless/SelectClaimHospitalList.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import { ConfirmModal, BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconId from '~/assets/images/insu/icon-id.svg'
import iconFamily from '~/assets/images/insu/icon-family.svg'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: '통원', to: '/insu/claim/paperless/selectTreatmentHospital' },
  { title: '입원', to: '/insu/claim/paperless/selectHospitalization' }
])
const isTooltipOpen = ref(false)
const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const clickCancel = () => {}

const clickConfirm = () => {}

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

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}

const toggleBill = (index: number) => {
  billVisibleStates.value[index] = !billVisibleStates.value[index]
}

const clickFindHospitals = () => {
  navigateTo('/insu/claim/paperless/selectTreatmentHospital')
}

const clickFindSelfHospitals = () => {
  navigateTo('/insu/claim/findSelfHospitals')
}

const totalHospitalCount = computed(() =>
  hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0)
)

const clickConfirmModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: bold;font-size: var(--num-16);text-align: left;">고려대학병원은 입원비 서류없이 청구<br />서비스가 오픈 준비 중 이에요</div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">서류를 준비 하셨으면 사진찍어 청구 서비스를<br />이용할 수 있어요.</div>
      </div>`
  // <button type="button" class="c-btn btn-primary" style="height: 4.8rem; background-color: rgb(76, 127, 247); border-radius: 0.6rem; font-size: 1.6rem; font-weight: bold; display: inline-flex; justify-content: center; align-items: center; width: 100%; line-height: 1.5; color: white; border: none; cursor: pointer; margin-top: 2rem;">
  //   <span class="text">사진찍어 청구</span>
  // </button>

  await ConfirmModal.open({
    title: '안내',
    isVisible: true,
    html: modalContent,
    isShowCancelButton: false,
    isShowConfirmButton: true,
    confirmButtonText: '사진찍어 청구'
  })
}
const bottomModalProps = ref({
  title: '누가 병원에 다녀왔나요?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  isShowFooter: false
})
</script>

<style scoped lang="scss">
.wrap-result {
  .wrap-hospital-list {
    background-color: #f4f4f4;
    padding: 2rem;
    margin-left: -2rem;
    margin-right: -2rem;
    .item {
      background-color: #fff;
      border-radius: 1.2rem;
      & + .item {
        margin-top: 1.2rem;
      }
      .item-subject {
        padding: 2rem 2rem 1.6rem;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        min-width: 0;
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
          .total {
            margin-top: 0.1rem;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 140%;
            color: #2b2b2b;
            strong {
              color: #4c7ff7;
            }
          }
        }
        .c-btn {
          flex-shrink: 0;
        }
      }
      .wrap-bill {
        margin: 0 2rem 1.6rem;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;

        &.show {
          max-height: 50rem; // 충분한 높이로 설정
        }

        .wrap-bill-item {
          background-color: #f4f4f4;
          padding: 2rem;
          border-radius: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          & + .wrap-bill-item {
            margin-top: 1.2rem;
          }
          .item-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tit {
              font-size: 1.3rem;
              font-weight: 500;
              line-height: 140%;
              color: #959595;
            }
            .value {
              font-size: 1.4rem;
              font-weight: 600;
              line-height: 140%;
              color: #2b2b2b;
            }
          }
        }
      }
      .item-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.7rem 0;
        border-top: 0.1rem solid #eeeeee;
        .text {
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 140%;
          color: #2b2b2b;
        }
        img {
          margin-left: 0.8rem;
          transition: transform 0.3s ease-in-out;

          &.rotated {
            transform: rotate(180deg);
          }
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
    background-color: #f4f4f4;
    // border: 0.1rem solid #e2e2e2;
    border-radius: 1.2rem;
    .text {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 140%;
      color: #555;
    }
    :deep(.btn-line) {
      background-color: #fff;
      .text {
        color: #555;
      }
    }
  }
}
.wrap-empty {
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
  }
}
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
