<template>
  <BaseBody
    :show-back-button="true"
    page-title="사진찍어 청구"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection
      title="가족 이름을 입력해 주세요"
      description="가족정보는 실손청구가 처음인 경우만 입력해요."
      class="mt-24 mb-40"
    />
    <FlexSection>
      <Select
        label="직업"
        class="require"
        modal-title="직업을 선택해 주세요."
        select-placeholder="직업을 선택해 주세요."
        :custom-opts="[
          { value: 'job1', label: '직업1' },
          { value: 'job2', label: '직업2' },
          { value: 'job3', label: '직업3' },
          { value: 'job4', label: '직업4' },
          { value: 'job5', label: '직업5' },
          { value: 'job6', label: '직업6' }
        ]"
      />
      <InputText
        label="가족 관계"
        class="require"
        :is-valid="true"
        valid-text="관계을 입력해주세요."
        placeholder="가족 관계을 입력해 주세요."
      />
      <InputRRN
        label="가족 주민등록번호"
        :required="true"
        :back-value="residentIdBack"
        @update:back-value="residentIdBack = $event"
      />
      <InputText
        label="가족 이름"
        class="require"
        :is-valid="true"
        valid-text="이름을 입력해주세요."
        placeholder="가족 이름을 입력해 주세요."
      />
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="다음" class="lg w-full medium btn-sticky" disabled />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputRRN from '~/components/publishing/input/InputRRN.vue'
import InputID from '~/components/publishing/input/InputID.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Select from '~/components/publishing/input/Select.vue'
import { ref, computed } from 'vue'

const isShowBottomModal = ref(false)
const idInputValue = ref('')
const maskedIdValue = ref('')
const residentIdBack = ref('')

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
  console.log('toggleBottomModal called, isShowBottomModal:', isShowBottomModal.value)
}

const bottomModalProps = ref({
  title: '보안키패드',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '입력완료',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const clickCancel = () => {
  console.log('모달 취소')
}
const clickConfirm = () => {
  console.log('모달 확인 클릭')
  // 입력된 7자리 숫자를 *로 마스킹하여 두 번째 입력 필드에 설정
  if (inputNums.value.length === 7) {
    maskedIdValue.value = '*'.repeat(7)
    toggleBottomModal()
    inputNums.value = [] // 키패드 입력 초기화
  }
}

const inputNums = ref<number[]>([])
const currentInputIdx = computed(() => inputNums.value.length)
const showWarn = ref(false)

// 키패드 숫자 배열 (0-9)
const keypadNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 키패드 배열을 랜덤으로 섞는 함수
function shuffleKeypad() {
  const shuffledNumbers = [...keypadNumbers].sort(() => Math.random() - 0.5)

  // lock과 숫자들을 랜덤으로 섞기 (del 제외)
  const buttonsToShuffle = [...shuffledNumbers, 'lock']
  const shuffledButtons = buttonsToShuffle.sort(() => Math.random() - 0.5)

  // 섞인 버튼들을 3x4 그리드로 배치 (del은 우하단 고정)
  const keypadRows = [
    [shuffledButtons[0], shuffledButtons[1], shuffledButtons[2]],
    [shuffledButtons[3], shuffledButtons[4], shuffledButtons[5]],
    [shuffledButtons[6], shuffledButtons[7], shuffledButtons[8]],
    [shuffledButtons[9], shuffledButtons[10], 'del']
  ]

  return keypadRows.flat()
}

// 랜덤 키패드 배열
const flatKeypad = ref(shuffleKeypad())

function onKeypadClick(key: number | string) {
  if (typeof key === 'number') {
    if (inputNums.value.length < 7) {
      inputNums.value.push(key)
      showWarn.value = false
    }
  } else if (key === 'del') {
    inputNums.value.pop()
    showWarn.value = false
  }
}

const clickFindHospitals = () => {
  navigateTo('/insu/SuccessFIndHospitals')
}

// ID 입력이 6글자 완료되면 모달 열기
const onIdInputComplete = (value: string) => {
  console.log('ID input complete:', value)
  flatKeypad.value = shuffleKeypad() // 키패드 위치 랜덤 변경
  toggleBottomModal()
}
</script>

<style scoped lang="scss">
.c-input {
  &:not(:first-child) {
    margin-top: 1.2rem;
  }
}
</style>
