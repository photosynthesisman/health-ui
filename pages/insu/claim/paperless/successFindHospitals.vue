<template>
  <BaseBody
    :show-back-button="true"
    page-title="MY병원 찾기"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection
      title="MY병원 찾기로<br />총 <strong>3</strong>개의 병원을 찾았어요."
      description="아래 병원을 연결하면 서류없이<br />간편하게 보험을 청구할 수 있어요."
      class="mt-24 mb-40"
    />
    <FlexSection class="flex-1">
      <FlexRowDiv class="wrap-check">
        <Checkbox
          id="checkBox1"
          aria-label="전체 선택"
          :model-value="isAllSelected"
          @update:model-value="toggleAllSelection"
        />
      </FlexRowDiv>
      <FindMyHospitalList v-model="hospitalSelections" :hospitals="hospitals" />
    </FlexSection>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="MY병원 연결"
        class="lg w-full medium btn-sticky"
        :disabled="!hasSelectedHospitals"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FindMyHospitalList from '~/components/publishing/insu/paperless/FindMyHospitalList.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import { ref, computed } from 'vue'

// 나의 병원 리스트
const hospitals = ref([
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    hospitalType: '종합병원',
    treatmentType: '외래, 병원'
  },
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    hospitalType: '종합병원',
    treatmentType: '외래, 병원'
  },
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    hospitalType: '종합병원',
    treatmentType: '외래, 병원'
  }
])

// 병원 선택 상태 (병원 개수에 맞게 자동 초기화)
const hospitalSelections = ref<boolean[]>([])

// hospitals 길이에 맞춰 selections 길이 동기화
watch(
  hospitals,
  newVal => {
    hospitalSelections.value = new Array(newVal.length).fill(false)
  },
  { immediate: true, deep: true }
)

// 전체 선택 여부
const isAllSelected = computed(() => hospitalSelections.value.length > 0 && hospitalSelections.value.every(Boolean))

// 하나라도 선택됐는지 여부
const hasSelectedHospitals = computed(() => hospitalSelections.value.some(Boolean))

// 전체 선택 토글
function toggleAllSelection(val: boolean) {
  hospitalSelections.value = hospitalSelections.value.map(() => val)
}

const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}
</script>

<style scoped lang="scss">
.header-section:deep(.title) {
  strong {
    color: #4c7ff7;
  }
}
.wrap-check {
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0;
}
</style>
