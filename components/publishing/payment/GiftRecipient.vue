<template>
  <div class="profile-box">
    <img :src="fullImagePath" alt="프로필 이미지" />
    <div class="detail-profile">
      <p>
        <strong class="nickname">{{ nickname }}</strong
        ><span>{{ userName }}</span
        >님에게
      </p>
      <p>선물을 보냈습니다.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'

const props = defineProps({
  fullImagePath: { type: String, default: RewardImage1 },
  nickname: { type: String, default: '장동건' },
  userName: { type: String, default: '김*강' }
})
</script>
<style scoped lang="scss">
.profile-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.2rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
  }
  .detail-profile {
    p {
      font-weight: 400;
      &:last-child {
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 2.5rem;
      }
    }
    .nickname {
      margin-right: 0.2rem;
    }
    span {
      margin-right: 0.2rem;
    }
  }
}
</style>
