<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <TitleSection title="자동청구 소급기간을<br />선택해 주세요." class="mt-24" />
    <InfoText text="설정한 금액 미만은 자동청구 진행하지 않아요" class="mt-16 mb-32" />
    <FlexColDiv class="gap-12">
      <Radio
        v-for="option in radioOptions"
        :id="option.id"
        :key="option.id"
        name="rdo1"
        custom-style="button"
        :aria-label="option.label"
        icon="check"
        icon-type="check"
        class="w-full text-left"
        :value="option.id"
      >
        {{ option.label }}
      </Radio>
    </FlexColDiv>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="다음"
        class="lg w-full medium btn-sticky"
        @click="clickNext"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import TitleSection from '~/components/insu/TitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Radio from '~/components/publishing/input/radio.vue'
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)

// 라디오 옵션 배열
const radioOptions = [
  { id: 'rdo1', label: '3년전 진료까지 자동청구' },
  { id: 'rdo2', label: '타이틀 텍스트' },
  { id: 'rdo3', label: '타이틀 텍스트' },
  { id: 'rdo4', label: '타이틀 텍스트' }
]

// 전체선택 상태
const selectAll = ref<boolean>(false)

// 개별 병원 체크박스 상태 배열 (6개 병원)
const hospitalChecks = ref<boolean[]>([false, false, false, false, false, false])

// 전체선택/해제 처리
const handleSelectAll = (): void => {
  if (selectAll.value) {
    // 전체선택이 체크된 경우: 모든 병원을 체크
    hospitalChecks.value = hospitalChecks.value.map(() => true)
  } else {
    // 전체선택이 해제된 경우: 모든 병원을 해제
    hospitalChecks.value = hospitalChecks.value.map(() => false)
  }
}

// 개별 체크박스 변경 시 전체선택 상태 업데이트
const handleIndividualCheck = (): void => {
  // 모든 병원이 체크되었는지 확인
  const allChecked = hospitalChecks.value.every((check: boolean) => check === true)
  // 모든 병원이 체크되지 않았는지 확인
  const allUnchecked = hospitalChecks.value.every((check: boolean) => check === false)

  if (allChecked) {
    // 모든 병원이 체크된 경우: 전체선택도 체크
    selectAll.value = true
  } else if (allUnchecked) {
    // 모든 병원이 해제된 경우: 전체선택도 해제
    selectAll.value = false
  } else {
    // 일부만 체크된 경우: 전체선택 해제 (indeterminate 상태)
    selectAll.value = false
  }
}

// 다음 버튼 클릭 처리
const clickNext = (): void => {
  // 선택된 병원들 처리 로직
  const selectedHospitals = hospitalChecks.value
    .map((checked: boolean, index: number) => (checked ? index + 1 : null))
    .filter((index: number | null) => index !== null)

  console.log('선택된 병원:', selectedHospitals)
}
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss">
.wrap-info-text {
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
</style>
