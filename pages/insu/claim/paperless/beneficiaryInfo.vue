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
    <TitleSection title="수익자(보험금 받는 분)<br />정보를 입력해 주세요" class="mt-24 mb-32" />
    <InputText label="수익자 이름 *" :disabled="true" placeholder="김레몬" />
    <!-- 주민번호 -->
    <InputRRN
      label="수익자 주민등록번호"
      :required="true"
      :back-value="residentIdBack"
      @update:back-value="residentIdBack = $event"
    />
    <InputText label="수익자 휴대폰 번호 *" placeholder="휴대폰 번호를 입력해주세요." />
    <InputText label="피보험자와의 관계 *" placeholder="예) 자녀, 남편, 배우자, 부, 모 등" />
    <hr class="hr-section ml-n20 mr-n20 mt-32 mb-32" />
    <BeneficiaryAccountWrap />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="확인"
        class="lg w-full medium btn-sticky"
        :disabled="!hasSelectedHospitals"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputRRN from '~/components/publishing/input/InputRRN.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BeneficiaryAccountWrap from '~/components/publishing/insu/paperless/BeneficiaryAccountWrap.vue'
import { ref, computed } from 'vue'

// 주민등록번호 입력값
const residentIdFront = ref('')
const residentIdBack = ref('')

// 병원 선택 상태 관리
const hospitalSelections = ref([false, false, false])

// 전체 선택 상태 계산
const isAllSelected = computed(() => {
  return hospitalSelections.value.every((selected: boolean) => selected)
})

// 선택된 병원이 있는지 확인
const hasSelectedHospitals = computed(() => {
  return hospitalSelections.value.some((selected: boolean) => selected)
})

// 전체 선택 토글 함수
const toggleAllSelection = () => {
  const newValue = !isAllSelected.value
  hospitalSelections.value = hospitalSelections.value.map(() => newValue)
}

// 개별 체크박스 변경 시 전체 선택 상태 업데이트
const updateAllSelection = () => {
  // 개별 체크박스 변경 시에는 전체 선택 상태가 자동으로 계산됨
  // computed 속성 isAllSelected가 자동으로 업데이트됨
}
</script>

<style scoped lang="scss">
:deep(.c-input) {
  & + .c-input {
    margin-top: 1.2rem;
  }
}
</style>
