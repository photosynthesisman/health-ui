<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-36"
  >
    <TitleSection title="서비스 가입을 위해<br />약관에 동의해 주세요." class="mt-24" />
    <AgreementCheckItem v-model:allChecked="isAllChecked" :items="agreeItems" @show-detail="showDetailTerm" />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="동의하고 다음"
        class="lg w-full medium btn-sticky"
        @click="clickBottomModal"
      />
    </ButtonGroup>
    <Teleport to="body">
      <BottomModal
        title="사용할 본인 서명 입력"
        :is-visible="isShowBottomModal"
        :is-show-cancel-button="false"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <AutoClaimTouchSign />
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import AgreementCheckItem from '~/components/publishing/insu/auto/AgreementCheckItem.vue'
import AutoClaimTouchSign from '~/components/publishing/insu/auto/AutoClaimTouchSign.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowBottomModal = ref(false)

const isAllChecked = computed({
  get: () => agreeItems.value.every(item => item.checked),
  set: (val: boolean) => {
    agreeItems.value.forEach(item => (item.checked = val))
  }
})

const agreeItems = ref([
  { id: 'checkBox2', label: '[필수] 실손보험 자동청구 서비스 이용 약관', required: true, checked: false },
  { id: 'checkBox3', label: '[필수] 개인(신용)정보 수집 및 이용 동의', required: true, checked: false },
  { id: 'checkBox4', label: '[필수] 민감정보(진료정보) 수집 및 이용 동의', required: true, checked: false },
  { id: 'checkBox5', label: '[필수] 민감정보(진료정보] 제3자 제공 동의', required: true, checked: false },
  { id: 'checkBox6', label: '[필수] 진료기록 열람 및 사본발급 동의ㆍ위임', required: true, checked: false },
  { id: 'checkBox7', label: '[선택] 마케팅 정보 활용 동의', required: false, checked: false }
])

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
const clickBottomModal = () => {
  toggleBottomModal()
}
</script>
<style lang="scss" scoped></style>
