<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <TitleSection title="자동청구 할 진료비를<br />설정해 주세요." class="mt-24" />
    <InfoText text="설정한 금액 미만은 자동청구 진행하지 않아요" class="mt-16 mb-32" />
    <Select
      label="자동청구 진료비"
      modal-title="자동청구 진료비"
      select-placeholder="선택"
      :is-show-cancel-btn="false"
      :custom-opts="[
        { value: '1천원 이상', label: '1천원 이상' },
        { value: '5천원 이상', label: '5천원 이상' },
        { value: '1만원 이상', label: '1만원 이상' },
        { value: '1만5천원 이상', label: '1만5천원 이상' },
        { value: '2만원 이상', label: '2만원 이상' },
        { value: '2만5천원 이상', label: '2만5천원 이상' }
      ]"
      @change="clickNext"
    />
    <CheckMessageItem v-for="(section, idx) in infoSections" :key="idx" :section="section" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'
import Select from '~/components/publishing/input/Select.vue'
import CheckMessageItem from '~/components/publishing/insu/auto/CheckMessageItem.vue'

const infoSections = ref([
  {
    title: '실손보험 가입 시기별 자기 부담금',
    items: [
      '2009년 9월 이전 : 자기부담금 5천원 (동원의료 비와 약제비를 합한 금액)',
      '2009년 9월 이후 ~ 2017년 4월 이전 : 자기부담 금 8천원',
      '2017년 4월 이후 : 2가지 공제방식 중 공제액이 큰 금액을 뺀 나머지 실손 보상'
    ]
  },
  {
    title: '예시) 약제비 30,000원일 경우',
    items: [
      '2009년 9월 이전 가입자 : 30,000원 - 자기부담금 5,000원 = 25,000원 실촌 보상',
      '2009년 9월 이후 2017년 4월 이전 가입자 : 30,000원• 자기부담금 8,000원= 22,000원 실손 보상'
    ]
  }
])

const clickNext = () => {
  return navigateTo('/insu/claim/auto/selectRetroactivePeriod')
}
</script>

<style scoped lang="scss"></style>
