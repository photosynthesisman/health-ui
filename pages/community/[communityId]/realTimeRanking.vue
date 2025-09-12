<template>
  <BaseBody page-title="실시간 랭킹" :show-back-button="true">
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabsA"
        :active-key="activeBoxTabA"
        variant="fill-type"
        class="mb-20 pt-20"
        @tab-change="onBoxTabChangeA"
      />
    </StickyTabsContainer>
    <div>
      <ChallengeRankingBox
        v-for="(user, index) in rankingList"
        :key="index"
        :rank="user.rank"
        :is-show-change="user.isShowChange"
        :is-show-steps="user.isShowSteps"
        :user-name="user.userName"
        :total-num-steps="user.totalNumb"
        :is-joint="user.isJoint"
        :is-me="user.isMe"
      />
    </div>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'

const boxTabsA = ref<BoxTab[]>([
  { title: '스트레스점수', key: 'option0' },
  { title: '수면점수', key: 'option1' },
  { title: '칼로리소모량', key: 'option2' }
])
const activeBoxTabA = ref('option0')

const onBoxTabChangeA = (key: string) => {
  activeBoxTabA.value = key
  console.log('A 탭 선택됨:', key)
}

interface RankingUser {
  rank: string
  isShowChange: boolean
  isShowSteps: boolean
  userName: string
  totalNumb: number
  isJoint?: boolean
  isMe?: boolean
}

const rankingList: RankingUser[] = [
  {
    rank: '4',
    isShowChange: false,
    isShowSteps: false,
    userName: '유교맨',
    totalNumb: 950,
    isMe: true
  },
  {
    rank: '1',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 1000
  },
  {
    rank: '2',
    isShowChange: false,
    isShowSteps: false,
    userName: '유교맨',
    totalNumb: 1000
  },
  {
    rank: '3',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '3',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '4',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '5',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '6',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '7',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  },
  {
    rank: '8',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    totalNumb: 960
  }
]

// rank별 카운트 세기
const counts = rankingList.reduce((acc: Record<string, number>, cur) => {
  acc[cur.rank] = (acc[cur.rank] || 0) + 1
  return acc
}, {})

// 공동 여부 추가
rankingList.forEach(user => {
  user.isJoint = counts[user.rank] > 1
})
</script>
<style scoped lang="scss">
.ranking-wrap {
  &:last-child {
    border-bottom: 0;
  }
  &:deep {
    padding-inline: 0.8rem;
  }
  &:deep(.rangking) {
    width: 100%;
  }
}
</style>
