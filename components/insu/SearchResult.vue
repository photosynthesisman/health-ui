<template>
  <div class="wrap-completed-main">
    <img v-if="success" class="img-status" src="/assets/images/insu/img-completed-02.png" alt="성공" />
    <img v-else class="img-status" src="/assets/images/insu/img-completed-03.png" alt="실패" />
    <h1 class="c-tit" v-html="tit"></h1>
    <p v-if="hasSub || subTit.length" class="sub-tit" v-html="displayedSubTit"></p>
  </div>

  <FlexSection v-if="hospital.length && imgSrc.length">
    <div class="medical-info">
      <div class="medical-info-head">
        <img :src="imgSrc" alt="로고" class="logo" />
        <div class="wrap-hospital">
          <div class="text">{{ hospital }}</div>
        </div>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'

const props = defineProps({
  success: {
    type: Boolean,
    default: true
  },
  hospital: {
    type: String,
    default: ''
  },
  imgSrc: {
    type: String,
    default: ''
  },
  tit: {
    type: String,
    required: true
  },
  subTit: {
    type: String,
    default: ''
  },
  hasSub: {
    type: Boolean,
    default: false
  }
})
const displayedSubTit = computed(() => {
  if (props.subTit) {
    return props.subTit
  }
  if (!props.success) {
    return `신청한 ${props.hospital} 진료내역에서<br/>숨은 보상금을 받을 <span>가능성이 없어요.</span>`
  }
  return ''
})
</script>

<style lang="scss" scoped>
.wrap-completed-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  .img-status {
    width: 9.6rem;
  }
  .c-tit {
    display: block;
    text-align: center;
    margin-top: 0.8rem;
    .text {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 130%;
    }
    :deep(span) {
      color: var(--blue-primary);
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
      height: 4.8rem;
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
.sub-tit {
  margin-top: 0.8rem;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #555;
  :deep(span) {
    color: var(--blue-primary);
  }
}
</style>
