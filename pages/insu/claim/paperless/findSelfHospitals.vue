<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <TitleSection
      title="다녀온 병원을 검색해 주세요"
      description="서류 없이도 청구 가능한 병원인지 알 수 있어요."
      class="mt-8 mb-40"
    />
    <InputText v-model="searchValue" inp-type="search" placeholder="병원 이름을 입력해 주세요." />
    <FlexSection>
      <RecentSearchWrap v-if="!searchValue" />
      <!-- ToDo: line16에 입력값이 있으면 위에는 비활성화, 아래 활성화 -->
      <FlexRowDiv v-else class="wrap-claim-type">
        <Checkbox id="checkBox1" v-model="isPaperlessClaim" aria-label="서류없이청구" />
        <Checkbox id="checkBox2" v-model="isMyHospital" aria-label="MY병원" />
      </FlexRowDiv>
    </FlexSection>
    <RecentSearchHospitalList :hospitals="hospitals" />
    <!-- ToDo: 결과값 없을때 아래 활성화 -->
    <!-- <InsuEmpty title="검색 결과가 없어요." sub-title="병원 이름을 잘못 입력했거나<br />아직 제휴 전인 병원이에요." /> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import RecentSearchWrap from '~/components/publishing/insu/paperless/RecentSearchWrap.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import RecentSearchHospitalList from '~/components/publishing/insu/paperless/RecentSearchHospitalList.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'

// 입력값 상태
const searchValue = ref('')

// 체크박스 상태 관리
const isPaperlessClaim = ref(true)
const isMyHospital = ref(false)

const hospitals = [
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    my: true,
    hospitalType: '종합병원',
    treatmentType: '외래, 입원'
  },
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    my: true,
    hospitalType: '종합병원',
    treatmentType: '외래, 입원'
  },
  {
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    name: '고려대학교 안암병원',
    address: '서울특별시 성북구 고려대로 73',
    my: true,
    hospitalType: '종합병원',
    treatmentType: '외래, 입원'
  }
]
</script>

<style scoped lang="scss">
.wrap-claim-type {
  width: 100%;
  height: 6.4rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  align-items: center;
  .text {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 140%;
    color: #2b2b2b;
  }
}
</style>
