<template>
  <div class="wrap-count">
    <div class="text">
      총 <strong>{{ totalCount }}</strong
      >건
    </div>
    <div class="wrap-label">
      <label for="success" class="h-label success"
        >성공 <strong>{{ successCount }}</strong
        >건</label
      >
      <label for="fail" class="h-label fail"
        >실패 <strong>{{ failCount }}</strong
        >건</label
      >
    </div>
  </div>
  <div class="wrap-result-lists">
    <div v-for="(result, index) in analysisResults" :key="index" class="item">
      <div class="item-header">
        <div class="wrap-hospital">
          <img :src="result.logoSrc" :alt="result.hospitalName" />
          <div class="wrap-hospital-info">
            <div class="name">{{ result.hospitalName }}</div>
            <div class="wrap-info">
              <div class="item-info">{{ result.date }}</div>
              <div class="item-info">{{ result.department }}</div>
            </div>
          </div>
        </div>

        <CommonBadge :color="result.type === '통원' ? 'yellow' : 'green'">{{ result.type }}</CommonBadge>
      </div>
      <div class="detail-lists">
        <div v-for="(detail, detailIndex) in result.details" :key="detailIndex" class="detail-item">
          <div class="tit">{{ detail.tit }}</div>
          <div v-if="detail.tit === '총 금액'" class="price">
            <strong>{{ detail.price }}</strong>
          </div>
          <div v-else class="price">{{ detail.price }}</div>
        </div>
      </div>
      <div class="analyze" :class="{ fail: result.analysisStatus === false }">
        <template v-if="result.analysisStatus === true">
          <div class="text">예상 실손의료비 보상금</div>
          <div class="price">{{ result.expectedReward }}</div>
        </template>
        <template v-else>
          <div class="text">{{ result.failMessage }}</div>
        </template>
      </div>
    </div>
  </div>
  <div class="wrap-info-lists">
    <div class="item">실손의료비 예상 보상금은 진료내용과 보험 약관에 따라 달라질 수 있습니다.</div>
  </div>
  <div class="wrap-computed-again">
    <div class="text">다시 확인이 필요하신가요?</div>
    <button class="btn-again" @click="clickNext">실손의료비 보상금 다시 계산하기</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

interface PriceDetail {
  tit: string
  price: string
}

interface AnalysisResult {
  hospitalName: string
  logoSrc: string
  date: string
  department: string
  type: string
  details: PriceDetail[]
  analysisStatus: boolean
  expectedReward?: string // 성공 시에만 존재
  failMessage?: string // 실패 시에만 존재
}

const props = defineProps({
  analysisResults: {
    type: Array as () => AnalysisResult[],
    default: () => []
  },
  infoText: {
    type: String,
    default: '숨은 보상금 수령을 위하여 보상관련 전문 상담사에게 무료로 상담받을 수 있어요.'
  }
})

// 총 건수, 성공/실패 건수 계산
const totalCount = computed(() => props.analysisResults.length)
const successCount = computed(() => props.analysisResults.filter(item => item.analysisStatus === true).length)
const failCount = computed(() => props.analysisResults.filter(item => item.analysisStatus === false).length)

const clickNext = () => {
  return navigateTo('/insu/claim/subrogation/ai/selectMedicalHistory')
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
  .wrap-label {
    @include mixin.flex-container(items-center);
    gap: 0.8rem;
    .h-label {
      padding: 0.45rem 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 130%;
      color: #555555;
      border: 0.1rem solid transparent;
      border-radius: 0.4rem;
      strong {
        font-weight: 700;
      }
      &.success {
        background-color: #f6f9ff;
        border-color: #4c7ff7;
      }
      &.fail {
        background-color: #fff7f7;
        border-color: #f14960;
      }
    }
  }
}
.wrap-result-lists {
  background-color: #f4f4f4;
  margin: 0 -2rem;
  padding: 2rem;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(justify-between items-center);
      .wrap-hospital {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        img {
          width: 4.8rem;
          height: 4.8rem;
        }
        .wrap-hospital-info {
          .name {
            font-weight: 700;
          }
          .wrap-info {
            @include mixin.flex-container(items-center);
            gap: 1.2rem;
            .item-info {
              font-size: 1.4rem;
              color: #555555;
              position: relative;
              &:not(:first-child)::before {
                content: '';
                display: inline-block;
                width: 0.1rem;
                height: 1.2rem;
                background-color: #e2e2e2;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
      .label-status {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
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
    .detail-lists {
      margin-top: 1.6rem;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .price {
          font-size: 1.4rem;
          font-weight: 600;
          strong {
            font-size: 1.6rem;
            font-weight: 700;
          }
        }
      }
    }
    .analyze {
      margin-top: 1.6rem;
      padding: 1.6rem 2rem;
      background-color: #f6f9ff;
      border-radius: 0.8rem;
      border: 0.1rem solid #4c7ff7;
      @include mixin.flex-container(justify-between items-center);
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
      }
      .price {
        font-weight: 700;
      }
      &.fail {
        background-color: #fff7f7;
        border-color: #f14960;
        text-align: center;
        justify-content: center;
        position: relative;
        .text {
          display: inline-block;
          margin-left: 0.4rem;
        }
        &::before {
          content: '';

          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M10 10V6.25M10 12.7795V12.8125M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
            center center no-repeat;
          background-size: 100%;
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }
      }
    }
  }
}
.wrap-info-lists {
  margin-top: 1.6rem;
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
      border-radius: 50%;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
.wrap-computed-again {
  margin: 2rem 0 6rem;
  padding: 2rem 0;
  border: 0.1rem solid #e2e2e2;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    color: #555555;
  }
  .btn-again {
    margin-top: 1.2rem;
    padding: 0.7rem 1.6rem;
    border-radius: 0.6rem;
    background-color: #e8e8e8;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
  }
}
</style>
