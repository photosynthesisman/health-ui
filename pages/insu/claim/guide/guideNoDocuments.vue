<template>
  <BaseBody
    :show-back-button="true"
    page-title="청구의신 이용안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-56"
  >
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <TitleSection title="병원에 다녀오셨나요?<br />청구의신에서 간편하게 청구하세요!" class="mt-24" />
    <GuideTopSubTitle
      img-url="/_nuxt/assets/images/insu/guide/icon-easy.svg"
      title="서류 필요 없이 손쉽게!"
      sub-title="병원에 안 가도 모든 진료내역을 찾아, 청구해 드려요."
    />
    <Button btn-type="primary" element-type="button" aria-label="청구 가능 병원 확인하기" class="mt-32" />
    <hr class="hr-section ml-n20 mr-n20 mt-32" />
    <GuideNumList guide-title="서류없이 하는 실손청구 <br />따라해 볼까요?" :items="guideItems" />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="서류없이 청구하러 가기"
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
import GuideTopSubTitle from '~/components/publishing/insu/guide/GuideTopSubTitle.vue'
import GuideNumList from '~/components/publishing/insu/guide/GuideNumList.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '서류없이 청구', code: 'no-docs' },
  { name: '사진찍어 청구', code: 'photo-claim' },
  { name: '대리청구', code: 'application-claim' }
]

const lineActiveIndex = ref(0)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

// 가이드 데이터
const guideItems = [
  {
    numTitle: '서류없이 청구 선택',
    numSubTitle: '청구의신 홈에서 서류없이 청구를 선택하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-01.png'
  },
  {
    numTitle: '다녀온 병원 선택',
    numSubTitle: '통원/입원 내역 중 청구할 병원을 선택하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-02.png'
  },
  {
    numTitle: '청구할 보험사 선택',
    numSubTitle: '주민등록번호를 입력하고 청구할 보험사를 <br />선택하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-03.png'
  },
  {
    numTitle: '사고내용 입력 및 진료내역 선택',
    numSubTitle: '거의 다 왔어요! 사고내용 입력하고 <br />진료내역을 선택하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-04.png'
  },
  {
    numTitle: '수익자 정보 입력',
    numSubTitle: '보험금 받을 분의 정보를 입력하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-05.png'
  },
  {
    numTitle: '청구완료!',
    numSubTitle: '청구 신청이 간편하게 끝났어요!',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-nodoc-06.png'
  }
]

const clickNext = () => {
  console.log('Next Button Click')
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
