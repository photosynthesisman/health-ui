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
    <TitleSection title="자동청구를 희망하는<br />병원을 선택해 주세요." class="mt-24" />
    <InfoText text="신청 완료 후 설정/관리는 청구의신 앱에서 가능해요" class="mt-16" />
    <SelectHospitalCheckList v-model="hospitalChecks" />
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
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import SelectHospitalCheckList from '~/components/publishing/insu/auto/SelectHospitalCheckList.vue'

const hospitalChecks = ref<boolean[]>([])

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

<style scoped lang="scss"></style>
