<template>
  <section class="wrap-completed-top">
    <div class="wrap-completed-main">
      <!-- ToDo: 상태에 따라 이미지 변경 -->
      <div class="completed-img">
        <img v-if="imgSrc" :src="imgSrc" :alt="altText" />
      </div>
      <h2 class="c-tit">
        <!-- ToDo: 상태에 따라 텍스트 변경 -->
        <span class="text">{{ titleText }}</span>
      </h2>
      <div class="wrap-status">
        <img class="img" src="/assets/images/insu/icon-loading.svg" alt="loading" />
        <span class="time">{{ time }}</span>
      </div>
      <div class="wrap-status-bar">
        <!-- ToDo: progress bar의 길이는 inline-style %로 넣어주세요. 0, 50%, 100%만 존재함. -->
        <div class="bar">
          <div class="progress" :style="barStyle"></div>
        </div>
        <div class="wrap-status-point">
          <div v-for="step in steps" :key="step.key" class="item" :class="getStepClass(step.key)">
            <div class="icon-status-point"></div>
            <span class="text">
              {{ step.key === 'final' ? finalLabel : step.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <ClaimInsuranceCountBox
      :logo="insuranceDetail.insuranceLogo"
      :name="insuranceDetail.insuranceName"
      :label="insuranceDetail.label"
      :count="insuranceDetail.count"
    />
    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">전송결과는 카카오 알림톡으도로 안내해 드립니다.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ClaimInsuranceCountBox from './ClaimInsuranceCountBox.vue'

const props = defineProps<{
  status: 'generating' | 'sending' | 'success' | 'fail'
  time?: string
  insuranceDetail: {
    insuranceLogo: string
    insuranceName: string
    label: string
    count: number
  }
}>()

const statusMap = {
  generating: {
    src: '/_nuxt/assets/images/insu/img-completed-01.png',
    alt: '서류 자동생성중',
    title: '청구서류를 자동생성 중이에요',
    barWidth: 0
  },
  sending: {
    src: '/_nuxt/assets/images/insu/img-completed-01.png',
    alt: '전송중',
    title: '청구서류를 전송 중이에요',
    barWidth: 50
  },
  success: {
    src: '/_nuxt/assets/images/insu/img-completed-02.png',
    alt: '전송완료',
    title: '청구서류 전송을 완료 했어요',
    barWidth: 100
  },
  fail: {
    src: '/_nuxt/assets/images/insu/img-completed-03.png',
    alt: '전송실패',
    title: '청구서류 전송을 실패 했어요',
    barWidth: 100
  }
} as const

const imgSrc = computed(() => statusMap[props.status]?.src || '')
const altText = computed(() => statusMap[props.status]?.alt || '')
const titleText = computed(() => statusMap[props.status]?.title || '')
const barStyle = computed(() => ({
  width: statusMap[props.status].barWidth + '%'
}))

const steps = [
  { key: 'generating', label: '서류자동생성' },
  { key: 'sending', label: '전송 시작' },
  { key: 'final', label: '' }
]

const finalLabel = computed(() => (props.status === 'fail' ? '전송 실패' : '전송 완료'))

const getStepClass = (stepKey: string) => {
  if (stepKey === 'final') {
    // 마지막 스텝은 성공이면 active, 실패면 nagative
    return props.status === 'fail' ? 'nagative' : props.status === 'success' ? 'active' : ''
  }

  // 순서 매핑 (generating=0, sending=1, success/fail=2)
  const order = steps.findIndex(s => s.key === stepKey)
  const current = props.status === 'generating' ? 0 : props.status === 'sending' ? 1 : 2

  return order <= current ? 'active' : ''
}
</script>

<style lang="scss" scoped>
.wrap-completed-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .completed-img {
    width: 9.6rem;
    height: 9.6rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .c-tit {
    margin-top: 0.8rem;
    .text {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 130%;
    }
  }
  .wrap-status {
    margin-top: 1.6rem;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    border-radius: 1.4rem;
    border: 0.1rem solid #e2e2e2;
    .img {
      width: 1.6rem;
      height: 1.6rem;
    }
    .time {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 130%;
      color: #555555;
    }
  }
  .wrap-status-bar {
    margin-top: 3.5rem;
    width: 100%;
    .bar {
      width: calc(100% - 16rem);
      margin: 0 8rem;
      background-color: #eeeeee;
      .progress {
        background-color: #4c7ff7;
        height: 1.2rem;
      }
    }
    .wrap-status-point {
      margin: -2.2rem 4rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        &.active {
          .icon-status-point {
            background: url('/assets/images/insu/icon-check-active.svg') center center no-repeat;
            background-size: 100%;
          }
          .text {
            color: #4c7ff7;
          }
        }
        &.nagative {
          .icon-status-point {
            background: url('/assets/images/insu/icon-check-fail.svg') center center no-repeat;
            background-size: 100%;
          }
          .text {
            color: #f14960;
          }
        }
        .icon-status-point {
          width: 3.2rem;
          height: 3.2rem;
          background: url('/assets/images/insu/icon-check.svg') center center no-repeat;
          background-size: 100%;
        }
        .text {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 130%;
          color: #d5d5d5;
        }
      }
    }
  }
}

.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
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
</style>
