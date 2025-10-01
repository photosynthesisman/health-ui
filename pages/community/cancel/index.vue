<template>
  <BaseBody page-title="내 커뮤니티 탈퇴" :show-back-button="true">
    <MyCommunityTab :is-editing="true" @update:count="updateMyCommunityCount" />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TopicCommunityTab from '~/components/publishing/community/explore/TopicCommunityTab.vue'
import MyCommunityTab from '~/components/publishing/community/explore/MyCommunityTab.vue'

const activeLineTab = ref('subject')
const myCommunityCount = ref(0)
const lineTabs = ref<Tab[]>([
  { title: '주제별 커뮤니티', key: 'subject' },
  { title: '내 커뮤니티', key: 'my', count: myCommunityCount.value }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// 내 커뮤니티 개수 업데이트
const updateMyCommunityCount = (count: number) => {
  myCommunityCount.value = count
  // lineTabs 배열에서 'my' 탭의 count 업데이트
  const myTabIndex = lineTabs.value.findIndex(tab => tab.key === 'my')
  if (myTabIndex !== -1) {
    lineTabs.value[myTabIndex].count = count
  }
}
</script>
