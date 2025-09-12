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
    <TitleSection title="직접 청구하기 어렵다면?<br />가족, 지인이 대신 청구할 수 있어요!" class="mt-24" />
    <GuideTopSubTitle
      img-url="/_nuxt/assets/images/insu/guide/icon-oneclick.svg"
      title="매 번 정보를 입력할 필요 없이 한 번에!"
      sub-title="여러 보험사에 간편하게 청구할 수 있어요."
    />
    <hr class="hr-section ml-n20 mr-n20 mt-32" />
    <GuideNumList guide-title="대신 해주는 보험청구 <br />따라해 볼까요?" :items="guideItems" />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="대리청구 하러 가기"
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
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import GuideNumList from '~/components/publishing/insu/guide/GuideNumList.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '서류없이 청구', code: 'no-docs' },
  { name: '사진찍어 청구', code: 'photo-claim' },
  { name: '대리청구', code: 'application-claim' }
]
const lineActiveIndex = ref(2)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

// 가이드 데이터
const guideItems = [
  {
    numTitle: '대리청구 서비스 가입',
    numSubTitle: '청구의신 홈에서 대리청구 메뉴 선택 후 <br />서비스에 가입해요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-01.png'
  },
  {
    numTitle: '피보험자 선택 또는 등록',
    numSubTitle: '청구할 피보험자를 선택하거나 새로 등록하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-02.png'
  },
  {
    numTitle: '보험사 선택',
    numSubTitle: '청구할 보험사를 선택하거나 추가로 등록하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-03.png'
  },
  {
    numTitle: '사고내용 입력 및 안내 대상 선택',
    numSubTitle: '사고 내용을 입력하고 보상 안내 받을 분을<br />선택하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-04.png'
  },
  {
    numTitle: '청구 서류 사진 첨부 및 팩스 입력',
    numSubTitle: '청구에 필요한 사진과 필요시 보험사<br />팩스번호를 입력하세요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-05.png'
  },
  {
    numTitle: '청구완료 및 추가 보험사 선택',
    numSubTitle: '청구 신청이 완료 되었고 추가할 보험사가<br />있는 경우 간편하게 추가 청구할 수 있어요.',
    imgUrl: '/_nuxt/assets/images/insu/guide/img-application-claim-06.png'
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

<style scoped lang="scss">
.c-tit-guide {
  margin: 3.2rem 0 2.4rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 130%;
}
.wrap-guide-info {
  margin-top: 1.6rem;
  @include mixin.flex-container(items-center);
  gap: 1rem;
  .icon-info {
    width: 4rem;
  }
  .wrap-info {
    .tit {
      font-weight: 700;
      color: #555555;
    }
    .tit-sub {
      margin-top: 0.2rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
.wrap-guide-num {
  @include mixin.flex-container(items-start);
  gap: 0.8rem;
  .wrap-guide-text {
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .tit-sub {
      margin-top: 0.2rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
.img-guides {
  margin: 1.6rem -2rem 0 -2rem;
  max-width: initial;
  + .wrap-guide-num {
    margin-top: 4.8rem;
  }
}
</style>
