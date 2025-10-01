<template>
  <div v-if="haveReward" class="result-title-wrap">
    <!-- <LottieAnimation src="/animations/confetti.json" width="100%" height="100%" :speed="1" :loop="true" /> -->
    <img src="~public/animations/confetti.gif" alt="" style="width: 100%; position: absolute" class="img-confetti" />
    <h2 :class="rewardType === 'ticket' ? 'type-ticket' : ''">
      <span class="reward-item">{{ rewardItem }}</span
      ><br />
      <span>{{ rewardComment }}</span>
    </h2>
    <NuxtLink v-if="rewardType === 'point'" to="#">
      <p class="check-item">지급된 포인트 확인하기</p>
    </NuxtLink>
    <NuxtLink v-if="rewardType === 'item'" to="#">
      <p class="check-item">지급된 아이템 확인하기</p>
    </NuxtLink>
    <p
      :class="rewardType === 'ticket' ? 'type-ticket' : ''"
      v-html="giftComment"
      v-if="rewardType === 'gift' || rewardType === 'ticket'"
      class="comment"
    ></p>
    <div v-if="rewardType === 'ticket'" class="ticket-reward">
      <ul>
        <li v-for="(reward, index) in rewardList" :key="index">
          {{ reward }}
        </li>
      </ul>
      <!-- <ul>
        <li>최초 회원가입으로 1개 지급</li>
        <li>마케팅 정보 제공 동의로 1개 지급</li>
        <li>제3자 정보 제공 동의로 1개 지급</li>
      </ul> -->
    </div>
    <div class="reward-image-area">
      <!-- <div v-if="showCongratsGif" class="gif-container">
        <img :src="congratsGif" alt="포인트 당첨 애니메이션" class="point-gif" />
      </div> -->

      <div v-if="rewardType === 'point'" class="point-coing-bg">
        <p class="coin-num">{{ point }}P</p>
      </div>
      <img
        v-if="rewardType === 'item' || rewardType === 'gift' || rewardType === 'ticket'"
        :src="rewardImage"
        :class="rewardType === 'ticket' ? 'type-ticket' : ''"
        class="reward-img"
        alt="당첨 리워드"
      />
    </div>
  </div>
  <div v-else class="result-title-wrap">
    <h2>
      <span class="reward-item">꽝!</span><br />
      <span>아쉽지만 다음기회에...</span>
    </h2>
    <p class="comment">
      친구에게 공유하면
      <br />
      친구추천 포인트를 받을 수 있어요!
    </p>
    <div class="reward-image-area">
      <img src="~/assets/images/lottery/img-reward-7.svg" alt="꽝" class="reward-img no-reward" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import congratsGif from '~/assets/images/lottery/img-congrats.gif'

const props = defineProps({
  haveReward: { type: Boolean, default: false },
  rewardItem: { type: String, default: '' },
  rewardComment: { type: String, default: '당첨을 축하합니다' },
  rewardType: { type: String as () => 'point' | 'item' | 'gift' | 'ticket' | null, default: null },
  rewardImage: { type: String, default: '' },
  point: { type: String, default: '' },
  giftComment: { type: String, default: '선물받기를 이용해서<br />지급된 상품교환권을 받을 수 있어요' },
  rewardList: { type: Array, default: () => [] }
})
const showCongratsGif = ref(false)

onMounted(() => {
  if (props.haveReward) {
    // 보상이 있는 경우에만 GIF 재생
    showCongratsGif.value = true // GIF 표시 시작
  }
})
</script>
<style scoped lang="scss">
.result-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4.8rem;
  text-align: center;
  flex-grow: 1;
  overflow: hidden;
  h2 {
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3.35rem;
    position: relative;
    &.type-ticket {
      margin-bottom: 0.8rem;
    }
    .reward-item {
      color: var(--blue-primary);
    }
  }
  .comment {
    position: relative;
    &.type-ticket {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
  .check-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    &:after {
      content: '';
      display: block;
      width: 2rem;
      height: 2rem;
      margin-left: 0.2rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.50008 5.83398L11.6667 10.0007L7.50008 14.1673' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
  .lottie-animation {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0rem;
    right: 0;
  }
  .reward-image-area {
    position: relative;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    .gif-container {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .reward-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 14.4rem;
      height: 14.4rem;
      &.no-reward {
        width: 16.6rem;
        height: 16.6rem;
      }
      &.type-ticket {
        width: 24rem;
        height: auto;
      }
    }
  }
}
.point-coing-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
  background-image: url('~/assets/images/benefit/img-point-coin.png');
  background-position: left 3.4rem top 3.2rem;
  background-size: 14.4rem;
  background-repeat: no-repeat;
  .coin-num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Jalnan2', sans-serif;
    font-weight: 700;
    font-size: 2.4rem;
  }
}
.img-confetti {
  position: absolute;
  top: 3.5rem;
  opacity: 0.6;
}
.ticket-reward {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: var(--blue-primary);
  li {
    position: relative;
    padding-left: 0.8rem;
    text-align: left;
    &::before {
      content: '';
      width: 0.2rem;
      height: 0.2rem;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--blue-primary);
      border-radius: 50%;
    }
  }
}
</style>
