<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <TitleSection :title="pageTitle" class="mt-24" />
    <!-- computed 속성을 사용하여 동적으로 이미지 경로를 바인딩합니다. -->
    <IdentificationCapture
      :image-src="computedImageSrc"
      :image-alt="computedImageAlt"
      :shot-txt="shotTxt"
      @shot="shotID"
    />
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import IdentificationCapture from '~/components/publishing/insu/auto/IdentificationCapture.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 촬영 상태 관리 ref
const isShot = ref(false)
const shotTxt = computed(() => (isShot.value ? '다시 촬영하기' : '촬영하기'))

const shotID = () => {
  isShot.value = !isShot.value
}

const route = useRoute()
const identificationType = route.query.type as string

const pageTitle = computed(() => {
  switch (identificationType) {
    case 'id':
      return `신분증을<br />촬영해 주세요.`
    case 'driver':
      return `운전면허증을<br />촬영해 주세요.`
    case 'passport':
      return `대한민국 여권을<br />촬영해 주세요.`
    default:
      return `신분증을<br />촬영해 주세요.`
  }
})

const computedImageSrc = computed(() => {
  if (isShot.value) {
    // 촬영 후 이미지
    return `/_nuxt/assets/images/insu/auto/img-id-test.png`
  }

  // 초기 이미지 (신분증 타입에 따라 분기)
  switch (identificationType) {
    case 'id':
      return `/_nuxt/assets/images/insu/auto/img-id.png`
    case 'driver':
      return `/_nuxt/assets/images/insu/auto/img-drive-licensing.png`
    case 'passport':
      return `/_nuxt/assets/images/insu/auto/img-passport.png`
    default:
      return `/_nuxt/assets/images/insu/auto/img-id.png`
  }
})

const computedImageAlt = computed(() => {
  if (isShot.value) {
    return `촬영된 이미지`
  }
  switch (identificationType) {
    case 'id':
      return `신분증 촬영`
    case 'driver':
      return `운전면허증 촬영`
    case 'passport':
      return `여권 촬영`
    default:
      return `신분증 촬영`
  }
})

const clickNext = () => {
  return navigateTo('/insu/claim/auto/selectClaimPrice')
}
</script>

<style scoped lang="scss"></style>
