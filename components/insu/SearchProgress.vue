<template>
  <div class="wrap-completed-main">
    <img
      v-if="progressStatus <= 1"
      class="img-status"
      src="/assets/images/insu/img-completed-01.png"
      alt="서류자동생성중"
    />
    <img v-else class="img-status" src="/assets/images/insu/img-completed-02.png" alt="서류자동생성중" />
    <h1 class="c-tit">
      <span v-if="progressStatus <= 1" class="text">{{ texts.progress }}</span>
      <span v-else class="text">{{ texts.complete }}</span>
    </h1>
    <div class="wrap-status">
      <img class="img" src="/assets/images/insu/icon-loading.svg" alt="loading" />
      <span class="time">{{ date }}</span>
    </div>
    <div class="wrap-status-bar">
      <div class="bar">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
      <div class="wrap-status-point">
        <div v-for="(step, index) in steps" :key="index" class="item" :class="{ active: progressStatus >= index }">
          <div class="icon-status-point"></div>
          <span class="text">
            {{ step.text }}
            <span v-if="step.subText" class="text-sub">{{ step.subText }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <FlexSection>
    <div class="medical-info">
      <div class="medical-info-head">
        <img :src="imgSrc" alt="로고" class="logo" />
        <div class="wrap-hospital">
          <div class="text">{{ hospital }}</div>
        </div>
      </div>
    </div>
    <div v-if="infoTxt.length" class="wrap-medical-info-text">
      <i class="icon ico-info"></i>
      <span class="text">{{ infoTxt }}</span>
    </div>
    <div v-if="infoList.length > 0" class="wrap-info-lists">
      <div v-for="(info, index) in infoList" :key="index" class="item" v-html="info"></div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'

const props = defineProps({
  progressStatus: {
    type: Number,
    required: true,
    validator: (value: number) => [0, 1, 2].includes(value)
  },
  texts: {
    type: Object,
    default: () => ({
      progress: '',
      complete: ''
    })
  },
  steps: {
    type: Array as () => { text: string; subText?: string }[],
    required: true,
    validator: (value: any[]) => value.length === 3
  },
  hospital: {
    type: String,
    required: true
  },
  guideTxt: {
    type: Boolean,
    default: false
  },
  imgSrc: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  infoTxt: {
    type: String,
    required: false,
    default: ''
  },
  infoList: {
    type: Array as () => string[], // 문자열 배열로 타입 정의
    required: false,
    default: () => []
  }
})
const progressWidth = ref('0%')

onMounted(() => {
  const widthMap = ['0%', '50%', '100%']
  const targetWidth = widthMap[props.progressStatus]

  setTimeout(() => {
    progressWidth.value = targetWidth
  }, 100)
})
</script>

<style lang="scss" scoped>
.wrap-completed-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-status {
    width: 9.6rem;
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
      width: 1.1rem;
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
          text-align: center;
          color: #d5d5d5;
          height: 3.64rem;
          .text-sub {
            font-size: 1.2rem;
            font-weight: 500;
          }
        }
      }
    }
  }
}

.medical-info {
  width: 100%;
  margin-top: 2.5rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #fef4cc;
          color: #8d7000;
        }
        // 입원
        &.in {
          background-color: #ffe7e7;
          color: #ca2828;
        }
        &.price {
          background-color: #eeeeee;
          color: #555555;
        }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4c7ff7;
      }
    }
  }
}

.wrap-medical-info-text {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #959595;
  .icon {
    width: 2rem;
    height: 2rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'%3E%3Cpath d='M8.5 9V5.25M8.5 11.7795V11.8125M16 9C16 13.1421 12.6421 16.5 8.5 16.5C4.35786 16.5 1 13.1421 1 9C1 4.85786 4.35786 1.5 8.5 1.5C12.6421 1.5 16 4.85786 16 9Z' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center / 1.5rem no-repeat;
  }
  .text {
    min-width: 0;
    @include mixin.ellipsis;
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
    :deep(span) {
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
</style>
