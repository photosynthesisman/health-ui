<template>
  <BaseBody :show-back-button="true" :is-transparent="true" page-title="레몬포인트 존">
    <FlexColDiv class="gap-16">
      <PointZoneBanner />
      <DailyMissionSection />
      <!-- 디자인 시안에서 위치가 변경 -->
      <LinkCard
        title="출석체크 미션"
        text="매일 출석하면 3일차에<br /> 포인트 2배 적립"
        class="attendance-card"
        :buttons="[
          {
            label: '출석체크하기',
            btnType: 'primary',
            elementType: 'a',
            isLink: true,
            linkHref: '/common/benefit/attendance',
            width: 14,
            height: 4.8
          }
        ]"
      />
      <PointMissionSection />

      <LinkSection />
    </FlexColDiv>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import PointZoneBanner from '~/components/publishing/benefit/PointZoneBanner.vue'
import DailyMissionSection from '~/components/publishing/benefit/DailyMissionSection.vue'
import PointMissionSection from '~/components/publishing/benefit/PointMissionSection.vue'
import LinkSection from '~/components/publishing/benefit/LinkSection.vue'
import LinkCard from '~/components/publishing/benefit/LinkCard.vue'
</script>
