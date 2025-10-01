<template>
  <BaseBody :show-back-button="true" page-title="회원 프로필" logo-type="text" :has-setting="true" class="pb-36">
    <div class="flex flex-col gap-12">
      <p>본인 조회</p>
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필 없음) "
        class="xs"
        @click="openModal('normal', false)"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필/데이터 없음) "
        class="xs"
        @click="openEmptyModal('normal', false)"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필 있음) "
        class="xs"
        @click="openModal('expert', true)"
      />
    </div>
    <div class="flex flex-col gap-12 mt-24">
      <p>타인 조회</p>
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필 없음) "
        class="xs"
        @click="openModal2"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필/데이터 없음) "
        class="xs"
        @click="openEmptyModal2"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="일반회원(전문가 프로필 있음) "
        class="xs"
        @click="openModal3"
      />
    </div>

    <ProfileBottomModal :is-visible="isShowBottomModal" v-bind="bottomModalProps" @close="closeModal">
      <template #content>
        <div v-if="currentProfileType === 'normal'">
          <ProfileBox
            :has-expert-profile="hasExpertProfile"
            profile-type="normal"
            :profile-data="profileData"
            @view-expert-profile="changeProfileType('expert')"
          />
          <Followers />
          <hr class="hr-section mt-24 mb-10 ml-n20 mr-n20" />
          <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
          <div v-if="activeLineTab === 'walk'">
            <DayStepsGraph v-if="!hasData" class="mt-24" :raw-data="dummyGraphData" />
            <DayStepsGraph v-else class="mt-24" />
            <WalkingStatistics v-if="!hasData" class="mt-24" :statistics="dummyStepsData" />
            <WalkingStatistics v-else class="mt-24" />
          </div>
          <div v-else-if="activeLineTab === 'walkking'">
            <ChallengeStatistics class="mt-24" />
            <CommonSwiper
              v-if="hasData"
              :slides="mainChallengeSlides"
              :slides-per-view="1"
              :navigation="false"
              :pagination="true"
              :scrollbar="false"
              :autoplay="false"
              :show-slide-length="false"
              :show-play-pause-button="false"
              slide-type="custom"
              :class="{
                'relative-pagination': isCurrentSlideRanked,
                'absolute-pagination': !isCurrentSlideRanked
              }"
              @slide-change="handleSlideChange"
            >
              <template #default="{ slide }">
                <WalkingChallenge
                  class="mt-24"
                  :is-open-soon="(slide as any).isOpenSoon"
                  :is-recruit-end="(slide as any).isRecruitEnd"
                  :is-recruiting="(slide as any).isRecruiting"
                  :is-inactivity="(slide as any).isInactivity"
                  :is-up-coming="(slide as any).isUpComing"
                  :is-ended="(slide as any).isEnded"
                  :flag-tit="(slide as any).flagTit"
                  :have-rank="(slide as any).haveRank"
                />
              </template>
            </CommonSwiper>
            <FlexColDiv v-else class="is-rlative pd-100y">
              <EmptyNoticeIndexItem :title="'걷기왕 챌린지 참가 내역이 없습니다.'" />
            </FlexColDiv>
          </div>
          <div v-else-if="activeLineTab === 'community'">
            <CommunityStatistics class="mt-24" />
            <CommunityContentSwiper v-if="hasData" />
            <CommNoItem v-else style="min-height: 20rem" :text="'활동 중인 커뮤니티 내역이 없습니다.'" />
          </div>
        </div>

        <div v-else-if="currentProfileType === 'expert'">
          <ProfileBox
            :has-expert-profile="hasExpertProfile"
            profile-type="expert"
            :profile-data="profileData"
            @view-normal-profile="changeProfileType('normal')"
          />
          <ExpertIntroduceText class="mt-16" />
          <ExpertChart class="mt-24" />
          <ExpertHistory />
        </div>
      </template>
    </ProfileBottomModal>

    <ProfileBottomModal :is-visible="isShowBottomModal2" v-bind="bottomModalProps" @close="closeModal2">
      <template #content>
        <ModalProfile />
        <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
        <div v-if="activeLineTab === 'walk'">
          <DayStepsGraph v-if="!hasData" class="mt-24" :raw-data="dummyGraphData" />
          <DayStepsGraph v-else class="mt-24" />
          <WalkingStatistics v-if="!hasData" class="mt-24" :statistics="dummyStepsData" />
          <WalkingStatistics v-else class="mt-24" />
        </div>
        <div v-else-if="activeLineTab === 'walkking'">
          <ChallengeStatistics class="mt-24" />
          <CommonSwiper
            v-if="hasData"
            :slides="mainChallengeSlides"
            :slides-per-view="1"
            :navigation="false"
            :pagination="true"
            :scrollbar="false"
            :autoplay="false"
            :show-slide-length="false"
            :show-play-pause-button="false"
            slide-type="custom"
            :class="{
              'relative-pagination': isCurrentSlideRanked,
              'absolute-pagination': !isCurrentSlideRanked
            }"
            @slide-change="handleSlideChange"
          >
            <template #default="{ slide }">
              <WalkingChallenge
                class="mt-24"
                :is-open-soon="(slide as any).isOpenSoon"
                :is-recruit-end="(slide as any).isRecruitEnd"
                :is-recruiting="(slide as any).isRecruiting"
                :is-inactivity="(slide as any).isInactivity"
                :is-up-coming="(slide as any).isUpComing"
                :is-ended="(slide as any).isEnded"
                :flag-tit="(slide as any).flagTit"
                :have-rank="(slide as any).haveRank"
              />
            </template>
          </CommonSwiper>
          <FlexColDiv v-else class="is-rlative pd-100y">
            <EmptyNoticeIndexItem :title="'걷기왕 챌린지 참가 내역이 없습니다.'" />
          </FlexColDiv>
        </div>
        <div v-else-if="activeLineTab === 'community'">
          <CommunityStatistics class="mt-24" />
          <CommunityContent v-if="hasData" />
          <CommNoItem v-else style="min-height: 20rem" :text="'활동 중인 커뮤니티 내역이 없습니다.'" />
        </div>
      </template>
    </ProfileBottomModal>

    <ExpertProfileBottomModal
      :is-visible="isShowExpertBottomModal"
      v-bind="ExpertbottomModalProps"
      @close="toggleExpertBottomModal"
    >
      <template #content>
        <ModalProfile :profile-type="'expert'" />
        <ExpertIntroduceText class="mt-16" />
        <ExpertChart class="mt-24" />
        <ExpertHistory />
      </template>
    </ExpertProfileBottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ModalProfile from '~/components/publishing/commonProfile/ModalProfile.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import ProfileBox from '~/components/publishing/commonProfile/ProfileBox.vue'
import Followers from '~/components/publishing/commonProfile/Followers.vue'
import ProfileBottomModal from '~/components/publishing/commonProfile/ProfileBottomModal.vue'

// 전문가 관련 컴포넌트들
import ExpertIntroduceText from '~/components/publishing/commonProfile/ExpertIntroduceText.vue'
import ExpertChart from '~/components/publishing/commonProfile/ExpertChart.vue'
import ExpertHistory from '~/components/publishing/commonProfile/ExpertHistory.vue'
import ExpertProfileBottomModal from '~/components/publishing/commonProfile/ExpertProfileBottomModal.vue'
import ExpertModalProfile from '~/components/publishing/commonProfile/ExpertModalProfile.vue'
// 탭별 컴포넌트들
import DayStepsGraph from '~/components/publishing/commonProfile/DayStepsGraph.vue'
import WalkingStatistics from '~/components/publishing/commonProfile/WalkingStatistics.vue'
import ChallengeStatistics from '~/components/publishing/commonProfile/ChallengeStatistics.vue'
import WalkingChallenge from '~/components/publishing/commonProfile/WalkingChallenge.vue'
import CommunityStatistics from '~/components/publishing/commonProfile/CommunityStatistics.vue'
import CommunityContentSwiper from '~/components/publishing/commonProfile/CommunityContentSwiper.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommunityContent from '~/components/publishing/commonProfile/CommunityContent.vue'
import EmptyNoticeIndexItem from '~/components/publishing/common/customerCenter/EmptyNoticeIndexItem.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import CommNoItem from '~/components/publishing/community/common/commNoItem.vue'

// --- 상태 관리 ---
const mainChallengeSlides = ref([
  {
    isOpenSoon: true,
    flagTit: '모집<br/>예정',
    haveRank: true
  },
  {
    isRecruitEnd: true,
    flagTit: '모집<br/>종료'
  },
  {
    isRecruiting: true,
    flagTit: '<strong>D-8</strong><br/>모집중'
  },
  {
    isInactivity: true,
    flagTit: '챌린지<br/>진행중'
  },
  {
    isUpComing: true,
    flagTit: '<strong>D-8</strong><br/>모집중'
  },
  {
    isEnded: true,
    flagTit: '챌린지<br/><strong>종료</strong>'
  }
])
// 현재 슬라이드의 haveRank 상태를 저장할 변수
const isCurrentSlideRanked = ref(false)

// 슬라이드 변경 시 호출될 핸들러
const handleSlideChange = (swiperInstance: any) => {
  const activeIndex = swiperInstance.realIndex || swiperInstance.activeIndex

  // 해당 인덱스의 슬라이드 데이터에 haveRank 속성이 있는지 확인
  const currentSlideData = mainChallengeSlides.value[activeIndex]
  if (currentSlideData) {
    isCurrentSlideRanked.value = !!currentSlideData.haveRank
  }
}
const isShowBottomModal = ref(false)
const isShowBottomModal2 = ref(false)
const isShowExpertBottomModal = ref(false)
const toggleExpertBottomModal = () => {
  isShowExpertBottomModal.value = !isShowExpertBottomModal.value
}
const currentProfileType = ref<'normal' | 'expert'>('normal')
const hasExpertProfile = ref(false)
const activeLineTab = ref('walk')

const profileData = {
  name: '장동건',
  location: '서울 금천',
  reward: 12,
  serviceYears: 3,
  company: '삼성생명'
}

const lineTabs = ref<Tab[]>([
  { title: '걷기', key: 'walk' },
  { title: '걷기왕', key: 'walkking' },
  { title: '커뮤니티', key: 'community' }
])

const bottomModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const ExpertbottomModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '메시지 보내기',
  cancelButtonText: '전화하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const hasData = ref(false)
const openModal = (type: 'normal' | 'expert', hasExpert: boolean) => {
  currentProfileType.value = type
  hasExpertProfile.value = hasExpert
  isShowBottomModal.value = true
  hasData.value = true
}
const openEmptyModal = (type: 'normal' | 'expert', hasExpert: boolean) => {
  currentProfileType.value = type
  hasExpertProfile.value = hasExpert
  isShowBottomModal.value = true
  hasData.value = false
}
const openModal2 = () => {
  isShowBottomModal2.value = true
  hasData.value = true
}
const openEmptyModal2 = () => {
  isShowBottomModal2.value = true
  hasData.value = false
}
const openModal3 = () => {
  isShowExpertBottomModal.value = true
}

const closeModal = () => {
  isShowBottomModal.value = false
}
const closeModal2 = () => {
  isShowBottomModal2.value = false
}

const changeProfileType = (type: 'normal' | 'expert') => {
  currentProfileType.value = type
}

const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
const dummyGraphData = [
  { height: '0%', date: '1', dateClass: '' },
  { height: '0%', date: '2', dateClass: '' },
  { height: '0%', date: '3', dateClass: '' },
  { height: '0%', date: '4', dateClass: '' },
  { height: '0%', date: '5', dateClass: '' },
  { height: '0%', date: '6', dateClass: '' },
  { height: '0%', date: '7', dateClass: 'today' }
]
const dummyStepsData = [
  {
    title: '오늘 걸음',
    steps: 0,
    distance: '-'
  },
  {
    title: '총 걸음',
    steps: 0,
    distance: '-'
  },
  {
    title: '최고 걸음수',
    steps: 0,
    distance: '-'
  },
  {
    title: '일 평균',
    steps: 0,
    distance: '-'
  }
]
</script>

<style scoped lang="scss"></style>
