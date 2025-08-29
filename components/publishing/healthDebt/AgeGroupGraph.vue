<template>
  <div class="age-group-graph">
    <div class="tit">동일 연령대 지표</div>
    <CommonSwiper
      :slides="communitySlides"
      slide-type="custom"
      :slides-per-view="1"
      :space-between="10"
      :navigation="false"
      :pagination="true"
      :scrollbar="false"
      :autoplay="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
    >
      <template #default="{ slide }">
        <div class="slide-content">
          <div class="graph-item">
            <div class="graph-tit-wrap">
              <strong class="score">{{ slide.score }}</strong>
              <span class="amount-num">{{ slide.amount }}(명)</span>
            </div>
            <div class="bar-wrap">
              <i class="bar-status" :style="`width: ${slide.percentage}%`" :title="slide.description"></i>
            </div>
          </div>
        </div>
      </template>
    </CommonSwiper>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'

// 슬라이드 데이터 정의 - 점수대별로 개별 슬라이드 구성
const communitySlides = ref([
  {
    id: 1,
    score: '70이상',
    amount: '1,000',
    percentage: 10,
    totalAmount: '10,000',
    description: '동일 연령대 상위 10%'
  },
  {
    id: 2,
    score: '60~70',
    amount: '4,000',
    percentage: 40,
    totalAmount: '10,000',
    description: '동일 연령대 상위 50%'
  },
  {
    id: 3,
    score: '50~60',
    amount: '4,000',
    percentage: 40,
    totalAmount: '10,000',
    description: '동일 연령대 상위 60%'
  },
  {
    id: 4,
    score: '50이하',
    amount: '1,000',
    percentage: 10,
    totalAmount: '10,000',
    description: '동일 연령대 상위 90%'
  }
])
</script>
<style lang="scss" scoped>
.age-group-graph {
  background-color: vars.$white;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  overflow: hidden;

  .tit {
    font-size: 1.6rem;
    font-weight: 700;
    color: #2b2b2b;
  }
}

.slide-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  justify-content: flex-end;
  box-sizing: border-box;
}

.graph-item {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}

.total-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;

  .percentage-text {
    font-size: 1.6rem;
    font-weight: 700;
    color: vars.$blue-primary;
  }

  .total-text {
    font-size: 1.2rem;
    color: #999;
  }
}

.graph-tit-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .score {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2b2b2b;
  }

  .amount-num {
    font-size: 1.2rem;
    color: #2b2b2b;
    font-weight: 500;
  }
}

.bar-wrap {
  height: 0.8rem;
  width: 100%;
  background-color: #eee;
  position: relative;
  border-radius: 0.6rem;
  overflow: hidden;

  .bar-status {
    display: block;
    height: 100%;
    background: vars.$blue-primary;
    border-radius: 0.6rem;
    transition: width 0.3s ease;
  }
}

:deep(.custom-swiper) {
  swiper-slide {
    padding-top: 2rem;
    border-radius: 0;
  }
}

// swiper-container 웹 컴포넌트용 스타일
:deep(swiper-container::part(pagination)) {
  position: relative !important;
  bottom: 0 !important;
  margin-top: 0.8rem;
}

:deep(swiper-container::part(bullet)) {
  width: 0.8rem !important;
  height: 0.8rem !important;
  background-color: #ddd !important;
  opacity: 1 !important;
}

:deep(swiper-container::part(bullet-active)) {
  background-color: #4f5561 !important;
}
</style>
