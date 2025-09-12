<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <TitleSection title="배송 받으실 주소와<br/>연락처를 입력해주세요." class="mt-24 mb-32" />
    <FlexSection class="gap-12">
      <InputAddress
        label="주소"
        :is-valid="false"
        class="require"
        placeholder="주소를 검색해주세요"
        @update:is-valid="isValidAddress = $event"
      />
      <InputText v-model="phoneNumber" label="휴대폰 번호" placeholder="휴대폰 번호를 입력해 주세요." />
      <FlexColDiv class="gap-6">
        <InputLabelText label="피보험자 성별" />
        <FlexRowDiv class="gap-8">
          <Radio id="rdo1" name="rdo1" checked custom-style="button small w-full" aria-label="등기소포(익일)" />
          <Radio id="rdo2" name="rdo1" custom-style="button small w-full" aria-label="일반소포(3~5일)" />
        </FlexRowDiv>
        <p class="fz-13">등기소포 배송비 4,000원, 일반소포 배송피 2,700원 부과됩니다.</p>
      </FlexColDiv>
      <InputText v-model="deliveryNote" label="배송 전달사항(선택)" placeholder="배송 시 전달사항을 입력해주세요." />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button aria-label="CD배송 신청하기" btn-type="primary" class="lg w-full" :disabled="isButtonAbled" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import Radio from '~/components/publishing/input/radio.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

const isValidAddress = ref(false)
const phoneNumber = ref('')
const deliveryNote = ref('')

const isButtonAbled = computed(() => {
  return !isValidAddress.value || !deliveryNote.value || !phoneNumber.value
})
</script>
<style scoped></style>
