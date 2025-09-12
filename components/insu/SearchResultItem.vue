<template>
  <div class="wrap-count">
    <div class="text">
      신청 진료내역 <strong>{{ medicalHistories.length }}</strong
      >건
    </div>
  </div>
  <div class="wrap-medical-history-lists">
    <div v-for="(history, index) in medicalHistories" :key="index" class="item">
      <div class="item-body">
        <div class="item-tit">
          <div class="name">{{ history.department }}</div>
          <div class="date">{{ history.date }}</div>
        </div>
        <div class="wrap-label">
          <label
            for=""
            class="h-label"
            :class="{ admission: history.type === '입원', visit: history.type === '통원' }"
            >{{ history.type }}</label
          >
          <label for="" class="h-label" :class="{ able: history.status === '수령가능' }"
            >숨은 보상금 {{ history.status }}</label
          >
        </div>
      </div>
      <div class="wrap-detail-lists" :class="{ show: detailVisibleStates[index] }">
        <div v-for="(detail, detailIndex) in history.details" :key="detailIndex" class="detail-item">
          <div class="item-tit">
            <div class="name">{{ detail.name }}</div>
            <div class="desc">{{ detail.desc }}</div>
          </div>
          <label class="label" :class="{ able: detail.label === '보상금 수령가능' }">{{ detail.label }}</label>
        </div>
      </div>
      <div class="btn-detail" @click="toggleDetail(index)">
        <div class="text">{{ detailVisibleStates[index] ? '내역접기' : '내역보기' }}</div>
        <i class="icon-arrow-down" :class="{ rotated: detailVisibleStates[index] }"></i>
      </div>
    </div>
  </div>
  <div v-if="infoText.length" class="wrap-info-lists">
    <div class="item">{{ infoText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

// 데이터 타입 정의
interface Detail {
  name: string
  desc: string
  label: string
}

interface MedicalHistory {
  department: string
  date: string
  type: string
  status: string
  details: Detail[]
}

const props = defineProps({
  medicalHistories: {
    type: Array as () => MedicalHistory[],
    default: () => []
  },
  infoText: {
    type: String,
    default: '숨은 보상금 수령을 위하여 보상관련 전문 상담사에게 무료로 상담받을 수 있어요.'
  }
})

// 상세 내역 표시를 위한 상태 관리
const detailVisibleStates = ref<boolean[]>([])

// prop이 변경될 때마다 detailVisibleStates를 초기화
watch(
  () => props.medicalHistories,
  newHistories => {
    detailVisibleStates.value = newHistories.map(() => false)
  },
  { immediate: true }
)

// 내역 보기/접기 토글 함수
const toggleDetail = (index: number) => {
  detailVisibleStates.value[index] = !detailVisibleStates.value[index]
}
</script>

<style lang="scss" scoped>
.wrap-count {
  margin: 4rem -2rem 0;
  padding: 2.1rem 2rem;
  border-top: 0.1rem solid #eeeeee;
  @include mixin.flex-container(justify-between items-center);
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}

.wrap-medical-history-lists {
  background-color: #f4f4f4;
  margin: 0 -2rem;
  margin-bottom: -1.2rem;
  padding: 2rem;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-body {
      padding: 2rem 2rem 1.6rem;
      .item-tit {
        @include mixin.flex-container(justify-between items-center);
        .name {
          font-weight: 700;
        }
        .date {
          font-size: 1.4rem;
          color: #555555;
        }
      }
      .wrap-label {
        margin-top: 0.4rem;
        @include mixin.flex-container(items-center);
        gap: 0.4rem;
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          color: #555555;
          background-color: #eeeeee;
          &.able {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.visit {
            background-color: #fef4cc;
            color: #8d7000;
          }
          &.admission {
            background-color: #eaf2cc;
            color: #506a1d;
          }
        }
      }
    }
    .wrap-detail-lists {
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      max-height: 0;
      &.show {
        max-height: 50rem;
        transition: max-height 0.3s ease-in-out;
      }
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        border-radius: 1.2rem;
        background-color: #f4f4f4;
        padding: 2rem;
        margin: 0 2rem 1.6rem;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .item-tit {
          .name {
            font-size: 1.4rem;
            font-weight: 600;
            color: #555555;
          }
          .desc {
            margin-top: 0.1rem;
            font-size: 1.3rem;
            color: #959595;
          }
        }
        .label {
          padding: 0.3rem 0.6rem;
          color: #fff;
          border-radius: 0.4rem;
          background-color: #919191;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          &.able {
            background-color: #5782e7;
          }
        }
      }
    }
    .btn-detail {
      border-top: 0.1rem solid #eeeeee;
      padding: 1.7rem 0;
      @include mixin.flex-container(justify-center items-center);
      gap: 0.2rem;
      .icon-arrow-down {
        width: 2rem;
        height: 2rem;
        background-image: url('/assets/images/insu/icon-arrow-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
}
.wrap-info-lists {
  margin-top: 2.8rem;
  margin-bottom: 5rem;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
      border-radius: 50%;
    }
  }
}
</style>
