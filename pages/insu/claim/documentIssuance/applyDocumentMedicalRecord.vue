<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 발급신청"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection title="발급할 병원과 대상자를<br />선택해 주세요." class="mt-24" />
    <FlexSection class="gap-12 mt-32">
      <Select
        :label="'병원'"
        modal-title="발급할 병원을 선택해주세요"
        select-placeholder="병원을 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="hospital"
      />
      <Select
        :label="'발급 대상자'"
        modal-title="발급 대상자를 선택해주세요"
        select-placeholder="발급 대상자를 선택해주세요"
        cancel-button-text="선택"
        :is-show-cancel-btn="false"
        :custom-opts="target"
      />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="발급신청"
        class="lg w-full medium btn-sticky"
        @click="clickNext"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
const hospital = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '삼성서울병원', label: '삼성서울병원' }
]
const target = [
  { value: '본인', label: '본인' },
  { value: '대리인', label: '대리인' }
]
const clickNext = () => {
  console.log('외부 브라우저로 이동')
}
</script>

<style scoped lang="scss"></style>
