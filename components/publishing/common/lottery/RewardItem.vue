<template>
  <div
    class="reward-item-wrap"
    :class="{ 'is-ticket': rewardType === 'ticket', 'is-package': rewardType === 'package' }"
  >
    <div v-if="isReward" class="reward-badge">리워드</div>
    <div v-if="rewardType === 'point'" class="point-coing-bg">
      <p class="coin-num">{{ title }}</p>
    </div>
    <img v-if="rewardType != 'point'" :src="imageName" alt="리워드 이미지" />
    <div class="mb-4">
      <p class="reward-tit">{{ title }}</p>
    </div>
    <Button
      v-if="!used"
      btn-type="primary"
      element-type="button"
      :aria-label="rewardType === 'ticket' ? '티켓확인' : label"
      class="sm"
      @click="handleClick"
    />
    <Button v-if="used" btn-type="secondary" element-type="button" aria-label="사용중" class="sm" disabled />
    <p class="reward-date">{{ date }} 남음</p>
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps({
  imageName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '사용하기'
  },
  used: {
    type: Boolean,
    default: false
  },
  rewardType: { type: String as () => 'point' | 'ticket' | 'package' | null, default: null },
  point: { type: String, default: '' },
  isReward: { type: Boolean, default: false }
})

const emits = defineEmits(['buttonClick'])
const handleClick = () => {
  emits('buttonClick')
}
</script>
<style scoped lang="scss">
.reward-item-wrap {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.6rem;
  padding-top: 2.4rem;
  gap: 1.2rem;
  border-radius: 1.2rem;
  background: #f4f4f4;
  &.is-package {
    background-color: #fbe7fb;
  }
  &.is-ticket {
    :deep(.c-btn) {
      background-color: #5a15f0;
    }
    .reward-date {
      color: #5a15f0;
    }
  }
  .reward-badge {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.2rem;
    width: 6.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='66' height='32' viewBox='0 0 66 32' fill='none'%3E%3Cpath d='M0 0H48H65.2872L56.8247 23.9917C55.1321 28.7905 50.5967 32 45.5081 32H0V0Z' fill='%23FDDD66'/%3E%3C/svg%3E");
  }
  img {
    width: 8rem;
    height: 8rem;
  }
}
.reward-tit {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
}
.reward-date {
  margin-top: 0.2rem;
  color: #555;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
}
.point-coing-bg {
  position: relative;
  width: 11.6rem;
  height: 11.6rem;
  background-image: url('~/assets/images/benefit/img-point-coin.png');
  background-position: left -0.6rem top -0.6rem;
  background-size: 13.6rem;
  background-repeat: no-repeat;
  .coin-num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Jalnan2', sans-serif;
    font-weight: 700;
    font-size: 2.2rem;
    letter-spacing: -0.1rem;
  }
}
</style>
