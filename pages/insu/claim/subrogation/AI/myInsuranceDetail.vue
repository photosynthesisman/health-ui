<template>
  <BaseBody
    :show-back-button="true"
    page-title="내 보험 정보 및 보장내용"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
  >
    <InsuranceInfo :insurance="insuranceData[0]" />
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
    <StickyTabsContainer class="mt-16">
      <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    </StickyTabsContainer>
    <ScrollableContents ref="scrollableContentsRef">
      <InsuranceDetailInfoList
        ref="insuranceDetailListRef"
        :insurance-data="insuranceDetailData"
        @to-terms="handleToTerms"
      />
    </ScrollableContents>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import InsuranceInfo from '~/components/insu/InsuranceInfo.vue'
import InsuranceDetailInfoList from '~/components/insu/InsuranceDetailInfoList.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import ScrollableContents from '~/components/common/ScrollableContents.vue'
// InsuranceDetailInfoList 컴포넌트 인스턴스에 대한 타입 정의
interface InsuranceDetailInfoListInstance {
  scrollTarget: HTMLElement | null
}
const insuranceDetailListRef = ref<any>(null)
// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '보험 정보', code: 'insurance' },
  { name: '보장 내용', code: 'detail' }
]
// 이벤트 핸들러들
const handleLineTabClick = async (index: number) => {
  lineActiveIndex.value = index

  if (index === 0) {
    await nextTick()
    const targetElement1 = document.querySelector('[data-anchor1="target-section1"]')
    if (targetElement1) {
      targetElement1.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  } else {
    await nextTick()
    const targetElement2 = document.querySelector('[data-anchor2="target-section2"]')
    if (targetElement2) {
      targetElement2.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
const lineActiveIndex = ref(0)

const insuranceData = ref([
  {
    title: '무배당 카테이션 하나로보험',
    description: 'KB손해보험',
    status: '정상'
  }
])

const insuranceDetailData = ref([
  // 기본 정보
  {
    header: {
      text: '기본 정보',
      buttonText: '보험 약관보기'
    },
    lists: [
      { tit: '진료일', desc: '2025. 01. 20 ~ 2025. 05. 30' },
      { tit: '보험종류', desc: '개인용 자동차보험' },
      { tit: '보험시작일', desc: '2048.05.05' },
      { tit: '만기일', desc: '2048.05.05' }
    ]
  },

  // 보험료
  {
    header: {
      text: '보험료',
      buttonText: '보험 약관보기'
    },
    lists: [
      { tit: '진료일', desc: '2025. 01. 20 ~ 2025. 05. 30' },
      { tit: '납입회차', desc: '190/240회 중' },
      { tit: '납입예정 보험료', desc: '1,234,567원' }
    ]
  },

  // 보장 내용 (items 포함)
  {
    header: {
      text: '보장 내용'
    },
    lists: [
      {
        tit: '질병사망',
        desc: '456,789원',
        items: [
          { title: '담보상태', description: '정상' },
          { title: '담보기간', description: '2024.02.27~2056.03.22' }
        ]
      },
      {
        tit: '상해사망',
        desc: '10,000,000원',
        items: [
          { title: '담보상태', description: '정상' },
          { title: '담보기간', description: '2024.02.27~2056.03.22' }
        ]
      },
      {
        tit: '질병사망',
        desc: '456,789원',
        items: [
          { title: '담보상태', description: '정상' },
          { title: '담보기간', description: '2024.02.27~2056.03.22' }
        ]
      }
    ]
  },

  // 특약 (items 포함)
  {
    header: {
      text: '특약 <strong>3건</strong>'
    },
    lists: [
      {
        tit: '사망의료비',
        desc: '567,890원',
        items: [{ title: '만기일', description: '2056.03.22' }]
      },
      {
        tit: '재해치료비 특약',
        desc: '10,000,000원',
        items: [{ title: '만기일', description: '2056.03.22' }]
      },
      {
        tit: '골절 통원치료 특약',
        desc: '456,789원',
        items: [{ title: '만기일', description: '2056.03.22' }]
      }
    ]
  }
])
const handleToTerms = (index: number) => {
  // index를 사용하여 어떤 버튼이 눌렸는지 구분
  console.log(`${index}번째 버튼이 클릭되었습니다.`)
}
</script>
<style scoped lang="scss"></style>
