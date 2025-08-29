<template>
  <div class="wrap-grey">
    <h2 class="tit">AI가 찾아주는 나의 휴면보험금</h2>
    <div class="wrap-ai-list">
      <button
        v-for="(item, index) in aiMissions"
        :key="index"
        type="button"
        class="ai-item"
        @click="handleItemClick(item, index)"
      >
        <div class="wrap-mission-info">
          <img :src="item.image" :alt="item.alt" />
          <div class="wrap-mission-tit">
            <div class="mission-tit">{{ item.title }}</div>
            <div class="mission-tit-sub">{{ item.subtitle }}</div>
          </div>
          <div v-if="item.count" class="mission-count">{{ item.count }}</div>
        </div>
        <i class="icon-arrow-right"></i>
      </button>
    </div>
    <h2 class="tit">AI 실손 예상 보험금</h2>
    <div class="wrap-ai-list">
      <button
        v-for="(item, index) in aiSilson"
        :key="index"
        type="button"
        class="ai-item"
        @click="handleItemClick(item, index)"
      >
        <div class="wrap-mission-info">
          <img :src="item.image" :alt="item.alt" />
          <div class="wrap-mission-tit">
            <div class="mission-tit">{{ item.title }}</div>
            <div class="mission-tit-sub">{{ item.subtitle }}</div>
          </div>
        </div>
        <i class="icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits<{
  itemClick: [item: any, index: number]
}>()
const aiMissions = ref([
  {
    image: '/_nuxt/assets/images/insu/icon-mission1.png',
    alt: '미션1',
    title: '보상금 찾고 보장분석해요',
    subtitle: '숨은 보상금 찾기 신청',
    count: '100건'
  },
  {
    image: '/_nuxt/assets/images/insu/icon-mission2.png',
    alt: '미션2',
    title: '숨은 보상금 결과를 확인해요',
    subtitle: '숨은 보상금 찾기 결과',
    count: null
  }
])

const aiSilson = ref([
  {
    image: '/_nuxt/assets/images/insu/icon-mission3.png',
    alt: '미션3',
    title: '예상 보상금을 AI가 분석해드려요',
    subtitle: '실손 예상 보험금 확인'
  },
  {
    image: '/_nuxt/assets/images/insu/icon-mission4.png',
    alt: '미션4',
    title: '조회한 예상수령금 결과를 확인해요',
    subtitle: '실손 예상 보험금 분석 결과'
  }
])

const handleItemClick = (item: any, index: number) => {
  emit('itemClick', item, index)
}
</script>

<style scoped lang="scss">
.wrap-grey {
  margin: 3.2rem -2rem -2rem;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
  h2.tit {
    margin-top: 0;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  .wrap-ai-list {
    margin-top: 1.6rem;
    padding: 2.4rem 2rem 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
    + h2.tit {
      margin-top: 2.4rem;
    }
    .ai-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.2rem;
      &:not(:first-child) {
        margin-top: 2.4rem;
      }
      .wrap-mission-info {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        img {
          width: 6.4rem;
          height: auto;
        }
        .wrap-mission-tit {
          .mission-tit {
            font-size: 1.4rem;
            font-weight: 500;
            text-align: left;
          }
          .mission-tit-sub {
            margin-top: 0.2rem;
            font-weight: 700;
            text-align: left;
          }
        }
        .mission-count {
          padding: 0.3rem 0.8rem;
          border-radius: 1.1rem;
          background-color: #e0e9ff;
          font-size: 1.2rem;
          font-weight: 500;
          color: #002988;
        }
      }
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
</style>
