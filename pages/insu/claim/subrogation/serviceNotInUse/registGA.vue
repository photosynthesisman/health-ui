<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection title="등록 요청할 GA이름과<br />주소를 입력해 주세요" class="mt-24 mb-32" />

    <FlexColDiv class="gap-12">
      <InputText label="GA 이름*" placeholder="GA 이름을 입력해주세요" />
      <InputAddress label="주소" :is-valid="false" class="require address" placeholder="주소를 검색해주세요" />
    </FlexColDiv>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="GA등록 요청하기"
      class="lg w-full medium btn-sticky"
      @click="clickConfirmModal"
    >
      GA등록 요청하기
    </Button>
  </ButtonGroup>
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    title="안내"
    :html="'보험설계사용 서비스에 가입하시겠어요?'"
    :is-show-cancel-button="false"
    :confirm-button-text="'가입하기'"
    @close="isShowConfirmModal = false"
    @confirm="isShowConfirmModal = false"
  />
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
const isShowConfirmModal = ref(false)
const clickConfirmModal = async () => {
  isShowConfirmModal.value = true
}
</script>

<style scoped lang="scss"></style>
