<template>
  <BaseBody :show-back-button="true" page-title="회원 프로필" logo-type="text" :has-setting="true" class="pb-36">
    <ProfileBox
      profile-type="normal"
      :profile-data="{
        name: '장동건',
        location: '서울 금천',
        reward: 12,
        serviceYears: 3,
        company: '삼성생명'
      }"
    />
    <Followers />
    <hr class="hr-section mt-24 mb-10 ml-n20 mr-n20" />
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <!-- 걷기 탭 컨텐츠 -->
    <div v-if="activeLineTab === 'walk'">
      <DayStepsGraph class="mt-24" />
      <WalkingStatistics class="mt-24" />
    </div>

    <!-- 걷기왕 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'walkking'">
      <ChallengeStatistics class="mt-24" />
      <CommonSwiper
        :slides="mainChallengeSlides"
        :slides-per-view="1"
        :navigation="false"
        :pagination="true"
        :scrollbar="false"
        :autoplay="false"
        :show-slide-length="false"
        :show-play-pause-button="false"
        slide-type="custom"
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
          />
        </template>
      </CommonSwiper>
    </div>

    <!-- 커뮤니티 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'community'">
      <CommunityStatistics class="mt-24" />
      <CommunityContent />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import ProfileBox from '~/components/publishing/commonProfile/ProfileBox.vue'
import Followers from '~/components/publishing/commonProfile/Followers.vue'

import DayStepsGraph from '~/components/publishing/commonProfile/DayStepsGraph.vue'
import WalkingStatistics from '~/components/publishing/commonProfile/WalkingStatistics.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import ChallengeStatistics from '~/components/publishing/commonProfile/ChallengeStatistics.vue'
import WalkingChallenge from '~/components/publishing/commonProfile/WalkingChallenge.vue'

// 탭별 컴포넌트들
import CommunityStatistics from '~/components/publishing/commonProfile/CommunityStatistics.vue'
import CommunityContent from '~/components/publishing/commonProfile/CommunityContent.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
const mainChallengeSlides = ref([
  {
    isOpenSoon: true,
    flagTit: '모집<br/>예정'
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
// LineTabs 상태 관리
const activeLineTab = ref('walkking')

const lineTabs = ref<Tab[]>([
  { title: '걷기', key: 'walk' },
  { title: '걷기왕', key: 'walkking' },
  { title: '커뮤니티', key: 'community' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>
<style scoped lang="scss">
:deep(swiper-container::part(pagination)) {
  position: relative;
  margin-top: 1.2rem;
}
</style>
