<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection :title="titleTxt" description="기본정보는 실손청구가 처음인 경우만 입력해요." class="mt-24 mb-40" />
    <FlexSection>
      <SignatureBox v-if="inputStatus === 'signature'" />
      <Select
        label="직업"
        class="require"
        modal-title="직업"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '직장인', label: '직장인' },
          { value: '공무원', label: '공무원' },
          { value: '전문직', label: '전문직' },
          { value: '자영업자', label: '자영업자' },
          { value: '주부', label: '주부' },
          { value: '초・중고생', label: '초・중고생' },
          { value: '기타', label: '기타' }
        ]"
      />
      <Select
        label="의료급여 수급권자"
        class="require"
        modal-title="의료급여 수급권자"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '해당없음', label: '해당없음' },
          { value: '1종 또는 2종', label: '1종 또는 2종' }
        ]"
      />
      <InputAddress label="주소" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <InputText
        label="이름"
        :is-valid="false"
        class="require"
        valid-text="성과 이름을 입력해주세요."
        placeholder="이름을 입력해주세요."
      />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky">
        확인
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import SignatureBox from '~/components/publishing/insu/paperless/SignatureBox.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'

// 상태 정의
type InputStatus = 'default' | 'signature'
const inputStatus = ref<InputStatus>('default')

const titleTxt = inputStatus.value === 'signature' ? '본인 자필 서명을 입력해 주세요' : '주소를 입력해 주세요'

const isShowModal = ref(false)

const movePage = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickDiff = () => {
  movePage()
}

const clickSame = () => {
  movePage()
}

const clickNext = () => {
  // 사진찍어 청구: 피보험자, 수익자 동일인 여부 모달 띄우기
  isShowModal.value = true
  // 그외
  // return navigateTo('/insu/claim/inputAccidentData')
}
</script>

<style scoped lang="scss">
:deep(.flex-col .c-input) {
  & + .c-input {
    margin-top: 1.2rem;
  }
}
</style>
