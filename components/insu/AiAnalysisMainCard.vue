<template>
  <h2 class="tit">내 보험</h2>
  <div class="wrap-main-insurance-status">
    <div class="wrap-info" @click="toggleMoreInfo">
      <div v-if="!props.connected" class="text">월 납입 보험료</div>
      <div v-else class="text">돌려 받을 내 숨은 보상금</div>
      <i class="icon ico-info"></i>
      <div class="wrap-more" :class="{ active: isMoreInfoActive }">
        <div class="text">
          정상 유지 중인 계약 보험 중 내가<br />
          보험 계약자로 매월 납입하는 보험료예요.<br />(연납/3개월납/6회납 등의 상품, 외화상품, 실효/<br />만기/소멸/만료
          등의 상품은 제외)
        </div>
        <i class="icon ico-cancel-white" @click.stop="closeMoreInfo"></i>
      </div>
    </div>
    <div class="wrap-status">
      <div v-if="!props.connected" class="price"><strong>300,398</strong>원</div>
      <div v-else class="price"><strong>??????</strong>원</div>
      <button v-if="!props.connected" class="btn-reload" @click.stop="clickReload">
        <i class="icon ico-reload"></i>
        <span class="date">2025.04.11 12:12</span>
      </button>
    </div>
    <button v-if="!props.connected" class="btn-c-insurance-count" @click.stop="toMyInsurance">
      <div class="wrap-insurance-text">
        <img src="/assets/images/insu/icon-insurance.svg" alt="아이콘 보험계약" />
        <span class="text"
          >총 보험계약 <strong>5건</strong> 중 정상계약 <strong>4건</strong
          ><i v-if="subTooltip" class="icon ico-info" @click.stop="toggleMoreInfo2"></i
        ></span>
        <div class="wrap-more-info" :class="{ active: isMoreInfo2Active }">
          <div class="text">
            조회가 안되는 보험이 있나요?<br />➀ 보험 가입자가 계약자 본인이 아닌 경우<br />➁ 계약 상태가 만기이며 5년이
            경과한 경우 보험 조회가 어려워요.
          </div>
          <i class="icon ico-cancel-white" @click.stop="closeMoreInfo2"></i>
        </div>
      </div>
      <img src="/assets/images/insu/icon-arrow-right-white.svg" alt="화살표" />
    </button>
    <div v-if="props.connected">
      <button class="btn-c-insurance-count white">내 보험 연결하고 알아보기</button>
      <div class="wrap-btn-more">놓친 보험금이 1인 평균 {{ props.cost }}만원이래요.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  toggleMoreInfo: []
  closeMoreInfo: []
  reload: []
  connected: []
  toMyInsurance: []
  cost: []
}>()

const isMoreInfoActive = ref(false)
const isMoreInfo2Active = ref(false)
const toggleMoreInfo = () => {
  isMoreInfoActive.value = !isMoreInfoActive.value
  emit('toggleMoreInfo')
}
const toggleMoreInfo2 = () => {
  isMoreInfo2Active.value = !isMoreInfo2Active.value
}
const closeMoreInfo = () => {
  isMoreInfoActive.value = false
  emit('closeMoreInfo')
}
const closeMoreInfo2 = () => {
  isMoreInfo2Active.value = false
}
const clickReload = () => {
  emit('reload')
}
const toMyInsurance = () => {
  emit('toMyInsurance')
}
const props = defineProps<{
  connected?: boolean
  cost?: number
  subTooltip?: boolean
}>()
</script>

<style scoped lang="scss">
h2.tit {
  margin-top: 2.4rem;
  font-size: 1.8rem;
  font-weight: 700;
}
.wrap-main-insurance-status {
  position: relative;
  margin-top: 1.6rem;
  padding: 2.4rem 2rem 2rem;
  border-radius: 1.2rem;
  background-color: #4c7ff7;
  .wrap-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .text {
      font-weight: 600;
      color: #ffffff;
    }
    .ico-info {
      background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
      background-size: contain;
      width: 2rem;
      height: 2rem;
      display: block;
    }
    .wrap-more {
      z-index: 1;
      width: 100%;
      border-radius: 0.8rem;
      background-color: #4f5561;
      padding: 2rem;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      display: none;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      &.active {
        display: flex;
      }
      .text {
        font-size: 1.4rem;
        color: #ffffff;
        word-break: keep-all;
        flex: 1 1;
      }
      .ico-cancel-white {
        background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        display: block;
      }
    }
  }
  .wrap-status {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 2.6rem;
      font-weight: 600;
      margin-left: 0.2rem;
      color: #ffffff;
      line-height: 130%;
      strong {
        font-weight: 700;
      }
    }
    .btn-reload {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background-color: #7099f9;
      border-radius: 1.4rem;
      padding: 0.6rem 1.2rem;
      @include mixin.rippleEffectWhite;
      .ico-reload {
        background: url('/assets/images/insu/icon-reloading-white.svg') no-repeat center center;
        background-size: contain;
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      .date {
        font-size: 1.2rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .btn-c-insurance-count {
    width: 100%;
    padding: 1.2rem 1.6rem;
    margin-top: 2rem;
    border-radius: 0.8rem;
    background-color: #4776e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wrap-insurance-text {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        color: #c9d9fd;
        strong {
          font-weight: 600;
          color: #ffffff;
        }
        .ico-info {
          margin-left: 0.6rem;
          background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
          background-size: contain;
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }
      }
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    &.white {
      background-color: #fff;
      font-weight: 500;
      color: #4c7ff7;
      text-align: center;
      display: block;
    }
    .wrap-more-info {
      position: absolute;
      z-index: 1;
      top: 80%;
      left: 50%;
      transform: translate(-50%, 0);
      width: 100%;
      background-color: #4f5561;
      padding: 2rem;
      border-radius: 0.8rem;
      display: none;
      &.active {
        display: flex;
      }
      .text {
        font-size: 1.4rem;
        color: #ffffff;
        word-break: keep-all;
        text-align: left;
        flex: 1 1;
      }
      .ico-cancel-white {
        background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        display: block;
        cursor: pointer;
      }
    }
  }
  .wrap-btn-more {
    width: max-content;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: #ffffff;
    border-radius: 1.2rem;
    background-color: #4f5561;
    padding: 0.4rem 0.8rem;
    display: inline-block;
    position: absolute;
    bottom: -1.2rem;
    left: 50%;
    transform: translate(-50%, 0);
    &::after {
      content: '';
      position: absolute;
      bottom: calc(100% - 0.8rem);
      left: 50%;
      transform: translateX(-50%);
      width: 1.3rem;
      height: 1.2rem;
      background-image: url("data:image/svg+xml,%0A%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.76793 0.999999C5.53773 -0.333335 7.46223 -0.333332 8.23203 1L12.5622 8.5C13.332 9.83334 12.3697 11.5 10.8301 11.5H2.16985C0.63025 11.5 -0.331997 9.83333 0.437804 8.5L4.76793 0.999999Z' fill='%234F5561'/%3E%3C/svg%3E%0A");
    }
  }
}
</style>
