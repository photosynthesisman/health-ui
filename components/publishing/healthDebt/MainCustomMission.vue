<template>
  <div class="main-mission">
    <div class="tit-box">
      <h5 class="tit">레몬건강지수 성장을 위한 <br />맞춤미션</h5>
      <Button v-if="hasMission" btn-type="line" element-type="button" aria-label="맞춤미션 선택" />
    </div>
    <div v-if="hasMission" class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">맞춤미션은 하루 최대 5개 미션까지만 수행 가능합니다.</div>
    </div>
    <MainMissionEmpty v-if="!hasMission" />
    <ul v-else class="main-mission-list">
      <MainMissionItem v-for="mission in missions" :key="mission.id" :mission="mission" />
    </ul>
    <MainMissionGoal />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import MainMissionEmpty from '~/components/publishing/healthDebt/MainMissionEmpty.vue'
import MainMissionItem from '~/components/publishing/healthDebt/MainMissionItem.vue'
import MainMissionGoal from '~/components/publishing/healthDebt/MainMissionGoal.vue'

import img1 from '~/assets/images/healthDebt/img-mission-list-1.svg'
import img2 from '~/assets/images/healthDebt/img-mission-list-2.svg'
import img3 from '~/assets/images/healthDebt/img-mission-list-3.svg'
import img4 from '~/assets/images/healthDebt/img-mission-list-4.svg'
import img5 from '~/assets/images/healthDebt/img-mission-list-5.svg'

interface Mission {
  id?: string | number
  imgUrl?: string
  subTit?: string
  money?: string
  title?: string
  btnLabel?: string
  disabled?: boolean
}

const missions: Mission[] = [
  {
    id: 1,
    imgUrl: img1,
    subTit: 'PM6~9 저녁식사는 간단하게',
    money: '-3,000',
    title: '가볍게 저녁식사하기',
    btnLabel: '미션완료',
    disabled: true
  },
  {
    id: 2,
    imgUrl: img2,
    subTit: 'PM8~12 건강한 잠자리',
    money: '-5,000',
    title: '가볍게 저녁식사하기',
    btnLabel: '미션완료',
    disabled: true
  },
  {
    id: 3,
    imgUrl: img3,
    subTit: 'PM8~12 건강한 잠자리',
    money: '-3,000',
    title: '레몬링과 건강의신 연동',
    btnLabel: '미션완료',
    disabled: true
  },
  {
    id: 4,
    imgUrl: img4,
    subTit: 'PM8~12 건강한 잠자리',
    money: '-3,000',
    title: '레몬링으로 심박수 측정',
    btnLabel: '500P'
  },
  {
    id: 5,
    imgUrl: img5,
    subTit: 'PM8~12 건강한 잠자리',
    money: '-3,000',
    title: '7~9시간 깊은 잠자기',
    btnLabel: '1,000P'
  }
]

const hasMission = computed(() => missions.length > 0)
</script>

<style lang="scss" scoped>
.main-mission {
  padding-block: 3.2rem;
  .tit-box {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.4;
    }
    .c-btn {
      width: auto;
      height: auto;
      padding: 0.5rem 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      border-radius: 1.4rem;
    }
  }
  .wrap-info-text {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.8rem;
    .info {
      width: 2rem;
      height: 2rem;
      background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
      background-size: 100%;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      color: #959595;
    }
  }
  &-list {
    margin-top: 2.4rem;
  }
}
</style>
