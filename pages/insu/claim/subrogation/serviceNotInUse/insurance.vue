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
      <div class="mt-24 pb-32">
        <h1 class="c-tit">
          <span class="text"> 소속 보험사 또는 GA를<br />선택해 주세요 </span>
        </h1>
      </div>
      <LineTabs :tabs="tabs" />
      <div class="grid_card mt-20">
        <SelectInsuranceItem
          v-for="(insu, idx) in myInsurances"
          :key="idx"
          :logo="insu.logo"
          :name="insu.name"
          @click="clickInsurance(insu)"
        />
      </div>
    </client-only>
  </BaseBody>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import SelectInsuranceItem from '~/components/publishing/insu/paperless/SelectInsuranceItem.vue'
// import { useAsyncData } from '#app'

const activeLineTab = ref('accountInfo')
const tabs = ref<Tab[]>([
  { title: 'GA', to: '/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany' },
  { title: '보험사', to: '/insu/claim/subrogation/serviceNotInUse/insurance' }
])

definePageMeta({
  title: '설계사 가입'
})
const myInsurances = [
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' },
  { logo: '/_nuxt/assets/images/insu/icon_bank_whitebg.svg', name: 'DB손해' }
]
const insuList = ref<any>([])

const clickInsurance = async (insu: any) => {
  const modalContent = `
    <div>
    <strong>${insu.name}</strong>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`

  const signupModalRes = await ConfirmModal.open({
    isVisible: true,
    title: '안내',
    html: modalContent,
    confirmButtonText: '가입하기',
    isShowCancelButton: false
  })
  if (signupModalRes) {
    return navigateTo('/insu/claim/subrogation/serviceNotInUse/successSubrogation')
  }
}
onMounted(() => {
  insuList.value = []
  console.log('✅ 보험사 데이터:', insuList.value)
})
</script>

<style scoped lang="scss"></style>
