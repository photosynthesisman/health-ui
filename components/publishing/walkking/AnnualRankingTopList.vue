<template>
  <section class="top-list-wrap">
    <div class="tit-flex">
      <h3>TOP 30</h3>
      <span>2026.08.07 기준</span>
    </div>
    <ChallengeResultWrap>
      <ChallengeResultBoxWithPoint rank="2" name="정교한 산수유" :point="90.021" />
      <ChallengeResultBoxWithPoint rank="1" name="나이키 에어퐁퐁" :point="92.487" />
      <ChallengeResultBoxWithPoint rank="3" name="우승좀할라니깐비켜" :point="83.668" />
    </ChallengeResultWrap>
    <ul class="list-other">
      <li v-for="(user, idx) in rankUser" :key="user.name">
        <div class="num">{{ idx + 4 }}</div>
        <div class="user">
          <div class="user-img">
            <img :src="user.imgUrl" :alt="user.name + ' 프로필 사진'" />
          </div>
          <span>{{ user.name }}</span>
        </div>
        <div class="point">{{ user.point }}</div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import ChallengeResultWrap from '~/components/publishing/walkking/ChallengeResultWrap.vue'
import ChallengeResultBoxWithPoint from './ChallengeResultBoxWithPoint.vue'

const props = defineProps<{
  rankUser: {
    name: string
    imgUrl: string
    point: number
  }[]
}>()
</script>

<style lang="scss" scoped>
.top-list-wrap {
  padding-top: 3.2rem;
  .tit-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    h3 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
    }
    span {
      font-size: 1.4rem;
      color: #959595;
    }
  }
  &:deep(.challenge-result-wrap) {
    margin-top: 0;
  }
  .list-other {
    li {
      width: 100%;
      height: 8.4rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      border-bottom: 0.1rem solid #eeeeee;
      div {
        font-size: 1.6rem;
        font-weight: 700;
        &.num {
          width: 5.2rem;
          flex-shrink: 0;
          text-align: center;
        }
        &.user {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          .user-img {
            width: 4.8rem;
            height: 4.8rem;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          span {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
        &.point {
          width: 10rem;
          flex-shrink: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
