<template>
  <!-- 09-30 페이지 타이틀 변경 / 미확인 복권 확인 > 전체 사용 내역 보기로 변경 / 페이지 배경색 제거 -->
  <BaseBody
    page-title="보관함"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span style='color:#555;font-size:1.4rem;font-weight:600'>전체 사용 내역 보기</span>"
  >
    <StickyTabsContainer>
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    </StickyTabsContainer>

    <div v-if="activeLineTab === 'reward'">
      <TotalCountSelectType
        :count="6"
        :filter-icon="true"
        :place-holder="'타입별'"
        class="pt-20 pb-20"
        :select-options="periodOptions"
      />
      <RewardItemWrap>
        <EmptyResult :is-absolute="true" :title="'사용가능한 아이템이 없습니다.'" />
      </RewardItemWrap>
    </div>

    <div v-if="activeLineTab === 'purchase'">
      <TotalCountSelectType
        :count="6"
        :filter-icon="true"
        :place-holder="'타입별'"
        class="pt-20 pb-20"
        :select-options="periodOptions"
      />
      <RewardItemWrap>
        <EmptyResult :is-absolute="true" :title="'사용가능한 아이템이 없습니다.'" />
      </RewardItemWrap>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import EmptyResult from '~/components/publishing/wholeMenu/EmptyResult.vue'

import RewardItemWrap from '~/components/publishing/common/lottery/RewardItemWrap.vue'

import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
const activeLineTab = ref('reward')

const lineTabs = ref<Tab[]>([
  { title: '리워드 보관함', key: 'reward' },
  { title: '구매 보관함', key: 'purchase' }
])
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

const periodOptions = [
  { value: '1', label: '티켓' },
  { value: '2', label: '참가권' },
  { value: '3', label: '아이템' },
  { value: '4', label: '상품교환권' }
]
</script>
