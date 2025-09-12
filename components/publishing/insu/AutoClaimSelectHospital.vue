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
    <div class="wrap-select-doc">
      <div class="wrap-check">
        <Checkbox id="checkBox1" v-model="selectAll" aria-label="전체선택" @change="handleSelectAll" />
      </div>
      <div class="wrap-list">
        <AutoClaimSelectHospital
          v-for="hospital in hospitals"
          :id="hospital.id"
          :key="hospital.id"
          v-model="hospital.checked"
          :name="hospital.name"
          :logo="hospital.logo"
        />
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InfoText from '~/components/insu/InfoText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import logoImg from '~/assets/images/insu/logo_KUMedicine.svg'

// 전체선택 상태
const selectAll = ref(false)

const hospitals = ref([
  { id: 'checkBox1', name: '고려대학교 안암병원', logo: logoImg, checked: false },
  { id: 'checkBox2', name: '고려대학교 안암병원', logo: logoImg, checked: false },
  { id: 'checkBox3', name: '고려대학교 안암병원', logo: logoImg, checked: false },
  { id: 'checkBox4', name: '고려대학교 안암병원', logo: logoImg, checked: false }
])

// 전체선택
const handleSelectAll = () => {
  hospitals.value.forEach(h => (h.checked = selectAll.value))
}

// 다음 버튼 클릭 처리
const clickNext = () => {
  const selectedHospitals = hospitals.value.filter(h => h.checked).map(h => h.name)
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

<style scoped lang="scss">
.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
.wrap-select-doc {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 1.6rem;
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
    @include mixin.flex-container(items-center);
    justify-content: flex-end;
  }
  .wrap-list {
    height: 100%;
    margin: 0 -2rem;
    padding: 2rem;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    flex-grow: 1;
    flex-wrap: wrap;
  }
}
</style>
