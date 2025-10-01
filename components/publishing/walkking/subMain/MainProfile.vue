<template>
  <section class="main-profile">
    <MainMyProfileBox />
    <MainMyRank class="mt-15" :ranks="rankList" />
    <MainMyChallenge class="mt-20" />
  </section>
</template>

<script setup lang="ts">
import MainMyProfileBox from '~/components/publishing/walkking/subMain/MainMyProfileBox.vue'
import MainMyRank from '~/components/publishing/walkking/subMain/MainMyRank.vue'
import MainMyChallenge from '~/components/publishing/walkking/subMain/MainMyChallenge.vue'
const rankList = ref([
  { id: 2, title: '올해 랭킹', value: '0', iconClass: 'total-trophy', hasArrow: true },
  { id: 1, title: '총상금', value: '480,000원', iconClass: 'total-prize' },
  { id: 3, title: '챌린지 참가', value: '', iconClass: 'total-challenge' },
  { id: 4, title: '최고순위', value: '', iconClass: 'total-rank' },
  { id: 5, title: '총걸음', value: '264,203걸음', iconClass: 'total-steps' },
  { id: 6, title: '평균걸음(일)', value: '12,120걸음', iconClass: 'average-steps' }
])
</script>

<style scoped lang="scss">
.main-profile {
  background: #4c7ff7;
  margin: -5.6rem -2rem 0;
  padding: 5.6rem 2rem 2.8rem;
  overflow: hidden;
  position: relative;
  :deep(.walking-challenge-item) {
    overflow: visible;
  }
  :deep(.challenge-detail .img-wrap) {
    background-position: right -2rem;
  }
}
</style>
