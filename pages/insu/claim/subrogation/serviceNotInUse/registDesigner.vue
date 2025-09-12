<template>
  <BaseBody
    :show-back-button="true"
    page-title="설계사 대리인 가입"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <TitleSection :title="dynamicTitle" class="mt-24 mb-32" />

    <FlexSection class="gap-12">
      <Transition name="fade-slide" mode="out-in">
        <InputTimer
          v-if="verify"
          v-model="verifyCode"
          label="인증번호 입력"
          class="require"
          error-message="인증번호를 다시 확인해 주세요."
        />
      </Transition>
      <Transition name="fade-slide" mode="out-in">
        <InputPhone
          v-if="birth"
          label="담당 설계사 휴대폰번호"
          :custom-opts="[
            { value: 'KT', label: 'KT' },
            { value: 'SKT', label: 'SKT' },
            { value: 'LG U+', label: 'LG U+' }
          ]"
          class="require"
          @verify="clickVerify"
        />
      </Transition>
      <Transition name="fade-slide" mode="out-in">
        <InputText v-if="genderSelect" v-model="birth" label="생년월일" placeholder="생년월일을 입력해 주세요." />
      </Transition>
      <Transition name="fade-slide" mode="out-in">
        <FlexColDiv v-if="agentCode" class="gap-6">
          <InputLabelText label="성별" />
          <FlexRowDiv class="gap-8">
            <Radio
              id="rdo1"
              v-model="genderSelect"
              name="rdo1"
              custom-style="button small"
              aria-label="남성"
              class="w-full"
            />
            <Radio
              id="rdo2"
              v-model="genderSelect"
              name="rdo1"
              custom-style="button small"
              aria-label="여성"
              class="w-full"
            />
          </FlexRowDiv>
        </FlexColDiv>
      </Transition>
      <Transition name="fade-slide" mode="out-in">
        <InputText
          v-if="agentName"
          v-model="agentCode"
          label="담당 설계사 코드*"
          placeholder="보험협회에 등록된 보험설계사 고유번호"
        />
      </Transition>
      <InputText v-model="agentName" label="담당 설계사 이름*" placeholder="이름을 입력해 주세요." />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="확인"
        class="lg w-full medium btn-sticky"
        :disabled="!verifyCode"
        @click="clickConfirmModal"
      >
        확인
      </Button>
    </ButtonGroup>
    <Teleport to="body">
      <ConfirmModal
        :is-visible="isShowConfirmModal"
        title="안내"
        :html="confirmModalContent"
        :is-show-cancel-button="false"
        :confirm-button-text="'가입하기'"
        @close="isShowConfirmModal = false"
      />
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputTimer from '~/components/publishing/input/InputTimer.vue'
import InputPhone from '~/components/publishing/input/InputPhone.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import Radio from '~/components/publishing/input/radio.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import { ref } from 'vue'
// 동적 타이틀
// 동적 타이틀 로직 수정
const dynamicTitle = computed(() => {
  if (verify.value) {
    return '담당 설계사 휴대폰으로 발송한<br />인증번호를 입력해 주세요.'
  } else if (birth.value) {
    return '담당 보험설계사 휴대폰번호를<br />입력해 주세요.'
  } else if (genderSelect.value) {
    return '담당 보험설계사 생년월일을<br />입력해 주세요.'
  } else if (agentCode.value) {
    return '담당 보험설계사 성별을<br />선택해 주세요.'
  } else if (agentName.value) {
    return '담당 보험설계사 코드를<br />입력해 주세요.'
  } else {
    return '담당 보험설계사 이름을<br />입력해 주세요.'
  }
})

const agentName = ref('')
const agentCode = ref('')
const genderSelect = ref('')
const birth = ref('')
const verify = ref(false)
const verifyCode = ref('')
const clickVerify = () => {
  verify.value = true
}
const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')
// ToDo: 메시지 내용 - 상황에 따라 변경 필요
const clickConfirmModal = async () => {
  confirmModalContent.value = `
    <div style="display: flex; flex-direction: column; text-align: center">
      <div>
        <i class="ri-information-line"></i>
      </div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">보험설계사용 서비스에 가입하시겠어요?</div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">가입한 보험설계사 정보를 확인할 수 없어요. 
가입하지 않은 보험설계사를 지정하려면 해당 설계사의 휴대폰 알림톡 인증 후 가입할 수 있어요.</div>
      
    </div>`

  isShowConfirmModal.value = true
}
</script>

<style scoped lang="scss">
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
