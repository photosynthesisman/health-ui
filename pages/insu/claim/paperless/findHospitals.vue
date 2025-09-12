<template>
  <BaseBody
    :show-back-button="true"
    page-title="MY병원 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection title="다녀온 병원을<br />자동으로 찾아드려요" class="mt-24 mb-32" />
    <WrapRRNInput />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <FlexRowDiv class="wrap-radio-btn">
      <RadioImg
        id="rdo1"
        name="rdo1"
        custom-style="button has-icon responsive"
        text="서류없이 청구<br />가능한 병원 확인"
        :icon-src="iconHospitalNondoc"
        icon-alt="서류없이 청구 가능한 병원 아이콘"
      />
      <RadioImg
        id="rdo2"
        name="rdo1"
        custom-style="button has-icon responsive"
        text="병원서류 발급<br />가능한 병원 확인"
        :icon-src="iconHospitalDoc"
        icon-alt="병원서류 발급 가능한 병원 아이콘"
      />
    </FlexRowDiv>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="MY병원 찾기"
        class="lg w-full medium btn-sticky"
        disabled
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import WrapRRNInput from '~/components/publishing/insu/paperless/WrapRRNInput.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconHospitalNondoc from '~/assets/images/insu/icon-hospital-nondoc.svg'
import iconHospitalDoc from '~/assets/images/insu/icon-hospital-doc.svg'
import { ref, computed, watch } from 'vue'

const isShowBottomModal = ref(false)
const residentIdFront = ref('000101')
const residentIdBack = ref('')

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
  console.log('toggleBottomModal called, isShowBottomModal:', isShowBottomModal.value)
  flatKeypad.value = shuffleKeypad()
  showWarn.value = false
}

const bottomModalProps = ref({
  title: '보안키패드',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '입력완료',
  // cancelButtonText: '취소',
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
    residentIdBack.value = '*'.repeat(7)
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
      if (inputNums.value.length === 7) {
        showWarn.value = false
      } else {
        showWarn.value = true
      }
    }
  } else if (key === 'del') {
    inputNums.value.pop()
    showWarn.value = true
  }
}

const clickFindHospitals = () => {
  navigateTo('/insu/claim/successFindHospitals')
}

// 주민등록번호 앞자리 입력이 6글자 완료되면 모달 열기
watch(residentIdFront, (newValue: string) => {
  if (newValue.length === 6) {
    console.log('Front ID input complete:', newValue)
    flatKeypad.value = shuffleKeypad() // 키패드 위치 랜덤 변경
    toggleBottomModal()
  }
})
</script>

<style scoped lang="scss">
.resident-id-form-group {
  width: 100%;
  margin-bottom: 2rem;

  .resident-id-label {
    display: block;
    margin-bottom: 0.6rem;
    font-weight: 400;
    color: #555;
    font-size: 12px;
    position: relative;

    &.required {
      &::after {
        content: '*';
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
  }

  .resident-id-inputs {
    display: flex;
    align-items: center;
    gap: 10px;

    .resident-id-input {
      flex: 1;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
      min-width: 0;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #007bff;
      }

      &::placeholder {
        color: #bbb;
      }
    }

    .resident-id-hyphen {
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }
  }
}

.wrap-radio-btn {
  margin-top: 3.2rem;
  display: flex;
  gap: 1.2rem;

  .c-radiotype {
    flex: 1;
    min-width: 0;

    &.responsive {
      .c-label {
        width: 100% !important;
        min-width: 0;
        word-break: keep-all;
        line-height: 1.4;
      }
    }
  }
}
.hr {
  height: 0.8rem;
  background-color: #f4f4f4;
  margin: 3.2rem -2rem 0;
}

// BottomModal (주민번호 뒷자리 입력 모달)
:deep(.c-modal) {
  .c-modal-body {
    padding: 0;
  }
  .wrap-keypad {
    .wrap-key-tit {
      margin-top: 4rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.4;
      color: #2b2b2b;
    }
    .wrap-hide-num {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 2.4rem;
      padding-bottom: 7.1rem;
      .circle-inputs {
        display: flex;
        justify-content: center;
        gap: 1.2rem;
        .circle {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          background: #f4f4f4;
          color: #2b2b2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          font-weight: 700;
          transition:
            background 0.2s,
            color 0.2s;
          &.filled {
            background: #2b2b2b;
            color: transparent;
          }
          &.showNum {
            background: transparent;
            color: #2b2b2b;
          }
          // &.active {
          // border: 0.1rem solid #2B2B2B;
          // }
        }
      }
    }
    .txt-warn {
      margin-top: 1.2rem;
      font-weight: 400;
      font-size: 1.3rem;
      line-height: 1.4;
      color: #f14960;
    }
  }
}

.keypad {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .keypad-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0;
    background: #ededed;
    border-radius: 0 0 2.4rem 2.4rem;
    border-top: 0.1rem solid #ededed;
    overflow: hidden;
    box-shadow: 0 0.1rem 0 #e0e0e0;
    .keypad-btn {
      height: 5.6rem;
      font-size: 2.2rem;
      font-weight: 700;
      color: #222;
      background: #fff;
      border: none;
      border-right: 0.1rem solid #ededed;
      border-bottom: 0.1rem solid #ededed;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:nth-child(3n) {
        border-right: none;
      }
      &:nth-last-child(-n + 3) {
        border-bottom: none;
      }
      &:active:not(:disabled) {
        background: #f4f4f4;
      }
      &.is-lock {
        background: #fafafa;
        color: #c0c0c0;
      }
      &.is-del {
        background: #fafafa;
      }
      &:disabled {
        color: #c0c0c0;
      }
      svg {
        display: block;
      }
    }
  }
}
</style>
