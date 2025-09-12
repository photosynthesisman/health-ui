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
    <client-only>
      <TitleSection title="소속 보험사 또는 GA를<br />선택해 주세요" class="mt-24 mb-32" />
      <LineTabs :tabs="tabs" class="mb-20" />
      <InputText inp-type="search" :placeholder="'GA명이나 주소를 검색해 주세요.'" />
      <SubroInsuranceList :insurance-list="insuranceList" @click-agency="clickAgency" />

      <ButtonGroup class="is-fixed">
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="소속된 GA를 찾을 수 없으신가요?"
          class="lg w-full medium btn-sticky"
          @click="clickRegisterInsuComp()"
        />
      </ButtonGroup>
    </client-only>
  </BaseBody>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import SubroInsuranceList from '~/components/insu/SubroInsuranceList.vue'
import InputText from '~/components/publishing/input/InputText.vue'
// import { useAsyncData } from '#app'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: 'GA', to: '/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany' },
  { title: '보험사', to: '/insu/claim/subrogation/serviceNotInUse/insurance' }
])

definePageMeta({
  title: '설계사 가입'
})

const selectedTab = ref('ga')
const insuranceList = ref([
  {
    id: 1,
    label: '등록요청한 GA',
    type: 'ga',
    address: '서울 영등포구 국제금융로 6길 33 여의도동'
  },
  {
    id: 2,
    label: '가가효효 크로스플랜',
    type: '보험사',
    address: '서울 영등포구 국제금융로 6길 33 여의도동'
  },
  {
    id: 3,
    label: '소속보험사명 또는 GA',
    type: 'ga',
    address: '서울특별시 성북구 고려대로 73'
  },
  {
    id: 4,
    label: '소속보험사명 또는 GA',
    type: 'ga',
    address: '서울특별시 성북구 고려대로 73'
  }
])
const insuList = ref<any>([])

const clickTab = (type: 'ga' | 'insuranceCompany') => {
  selectedTab.value = type
}

const clickAgency = async (item: any) => {
  const modalContent = `
    <div>
    <strong>${item.label}</strong>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`
  const signupModalRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    title: '안내',
    confirmButtonText: '가입하기',
    isShowCancelButton: false
  })
  if (signupModalRes) {
    return navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
  }
}

const clickRegisterInsuComp = async (item?: any) => {
  const res = await ConfirmModal.open({
    isVisible: true,
    confirmButtonText: '가입하기',
    html: `<div>보험사 ${item?.insuDispNm || '신규 등록'} <div>보험설계사용 서비스에 가입하시겠어요?</div></div>`
  })

  if (!res) return
  navigateTo('/insu/claim/subrogation/serviceNotInUse/registGA')
}

onMounted(() => {
  insuList.value = []
  console.log('✅ 보험사 데이터:', insuList.value)
})
</script>

<style scoped lang="scss"></style>
