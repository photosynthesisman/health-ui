<template>
  <FlexSection>
    <div class="wrap-recent-searches">
      <div class="text">
        총 <strong>{{ hospitalData.length }}</strong
        >건을 찾았어요.
      </div>
    </div>
  </FlexSection>
  <div class="wrap-hospitals">
    <div v-for="(item, index) in hospitalData" :key="index" class="item">
      <div class="wrap-hospital-desc">
        <div class="wrap-label">
          <CommonBadge v-for="(badge, badgeIndex) in item.badges" :key="badgeIndex" :class="badge.class">
            {{ badge.text }}
          </CommonBadge>
        </div>
        <div class="wrap-desc">
          <span v-if="item.hospitalName" class="tit"
            >{{ item.hospitalName }} <strong>{{ item.count }}</strong
            >건</span
          >
          <span v-if="item.price" class="tit"
            >진료비 {{ priceFormat(item.price) }}<strong class="has-border">{{ item.count }}</strong
            >건</span
          >
          <span class="date">{{ item.date }}</span>
        </div>
      </div>
      <button class="icon-cancel" @click="handleIconClick($event, item)">
        <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'

// 뱃지 정보에 대한 인터페이스
interface Badge {
  text: string
  class: string
}

// 병원 데이터 객체에 대한 인터페이스
interface HospitalItem {
  hospitalName?: string
  price?: number
  count: number
  date: string
  badges: Badge[]
}
const priceFormat = (price: number) => {
  return price.toLocaleString('ko-KR') + '원'
}
const props = defineProps<{
  hospitalData: HospitalItem[]
}>()

const emits = defineEmits(['item-click-progress', 'item-click-complete', 'item-click'])
// 클릭 이벤트 핸들러 함수
const handleIconClick = (e: Event, item: HospitalItem) => {
  e.stopPropagation()
  // 뱃지 배열에 '분석중' 텍스트가 있는지 확인
  const isProgress = item.badges.some(badge => badge.text === '분석중')
  // 뱃지 배열에 '분석완료' 텍스트가 있는지 확인
  const isComplete = item.badges.some(badge => badge.text === '분석완료')
  if (isProgress) {
    // '분석중' 뱃지가 있는 케이스
    emits('item-click-progress', item)
  } else if (isComplete) {
    // '분석완료' 뱃지가 있는 케이스
    emits('item-click-complete', item)
  } else {
    emits('item-click', item)
  }
}
</script>

<style scoped lang="scss">
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.1rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}

.wrap-hospitals {
  border-top: 0.1rem solid #eeeeee;
  margin: 0 -2rem;
  padding: 0 2rem;
  .item {
    padding: 2rem 0;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .hospital-logo {
      width: 4.8rem;
      height: 4.8rem;
      flex-shrink: 0;
    }
    .wrap-hospital-desc {
      flex: 1 1 auto;
      min-width: 0;
      .wrap-desc {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        text-align: left;
        .tit {
          margin-top: 0.4rem;
          display: block;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.4;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
          strong {
            color: #4c7ff7;
          }
        }
        .date {
          margin-top: 0.1rem;
          display: block;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.4;
          color: #555555;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .wrap-label {
        display: flex;
        gap: 0.4rem;
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #eeeeee;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.3;
          color: #555555;
          &.no-doc {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.my {
            background-color: #4c7ff7;
            color: #fff;
          }
          &.analyze-ing {
            background-color: #c36f00;
            color: #fff;
          }
          &.analyze-done {
            background-color: #629105;
            color: #fff;
          }
          &.able {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.failed {
            background-color: #c82626;
            color: #fff;
          }
          &.counsel {
            background-color: #eaf2cc;
            color: #506a1d;
          }
        }
      }
    }
    .icon-cancel {
      padding: 0.4rem;
      flex-shrink: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}
.has-border {
  position: relative;
  margin-left: 0.6rem;
  padding-left: 0.6rem;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 0.1rem;
    height: 1.4rem;
    background: #d2d2d2;
  }
}
</style>
