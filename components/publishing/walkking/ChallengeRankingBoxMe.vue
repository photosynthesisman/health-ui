<template>
  <div class="ranking-wrap">
    <div class="ranking-box">
      <span
        class="rangking"
        :class="{
          gold: rank === '1',
          silver: rank === '2',
          copper: rank === '3'
        }"
        >{{ rank }}</span
      >
      <span
        class="changed-rank"
        :class="{
          up: changed === 'up',
          down: changed === 'down'
        }"
        >{{ changedRank }}</span
      >
    </div>

    <div class="profile-img-box">
      <img :src="fullImagePath" alt="프로필 이미지" />
    </div>
    <div class="profile-detail-box">
      <p class="user-name">곰탱이</p>
      <span class="user-location">서울금천</span>
    </div>

    <div class="steps-box">
      <p class="total-steps">1,365,876</p>
      <p class="use-item-steps">26,300 걸음</p>
    </div>
  </div>
</template>
<script setup lang="ts">
// Props 정의

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})
const props = withDefaults(
  defineProps<{
    rank: string
    changed?: 'up' | 'down' | ''
    changedRank?: string
    src?: string
  }>(),
  {
    src: 'img-profile.svg',
    changed: '',
    changedRank: '-'
  }
)
</script>

<style lang="scss" scoped>
.ranking-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin: -0.1rem -0.8rem 0;
  padding: 1.6rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #e2e2e2;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  @media (max-width: 375px) {
    gap: 0.8rem;
  }
}
.ranking-detail-box {
  display: flex;
  align-items: center;
  width: 5.2rem;
}
.ranking-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .rangking {
    width: 3.2rem;
    height: 3.2rem;
    font-weight: 700;
    line-height: 3.2rem;
    text-align: center;
    &.gold,
    &.silver,
    &.copper {
      font-size: 0;
    }
    &.gold {
      background: url(~/assets/images/walkingking/img-1st.svg) center / 3.2rem no-repeat;
    }
    &.silver {
      background: url(~/assets/images/walkingking/img-2nd.svg) center / 3.2rem no-repeat;
    }
    &.copper {
      background: url(~/assets/images/walkingking/img-3rd.svg) center / 3.2rem no-repeat;
    }
  }
  .changed-rank {
    display: flex;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    &::before {
      content: '';
      width: 1.6rem;
      height: 1.6rem;
      background-position: center;
      background-size: 1.3rem 9.1rem;
      background-repeat: no-repeat;
    }
    &.up {
      color: #f14960;
      &::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.65507 4.7619C7.25294 3.74603 8.74762 3.74603 9.34549 4.7619L12.9327 10.8571C13.5306 11.873 12.7832 13.1429 11.5875 13.1429H4.41305C3.21731 13.1429 2.46997 11.873 3.06784 10.8571L6.65507 4.7619Z' fill='%23F14960'/%3E%3C/svg%3E");
      }
    }
    &.down {
      color: var(--blue-primary);
      &::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.65507 4.7619C7.25294 3.74603 8.74762 3.74603 9.34549 4.7619L12.9327 10.8571C13.5306 11.873 12.7832 13.1429 11.5875 13.1429H4.41305C3.21731 13.1429 2.46997 11.873 3.06784 10.8571L6.65507 4.7619Z' fill='%234c7ff7'/%3E%3C/svg%3E");
        transform: rotate(180deg);
      }
    }
  }
}
.profile-img-box {
  position: relative;
  width: 4.8rem;
  height: 4.8rem;
  border: 0.3rem solid var(--blue-primary);
  border-radius: 50%;
  flex: 0 0 4.8rem;
  @media (max-width: 375px) {
    width: 4rem;
    height: 4rem;
    flex: 0 0 4rem;
  }
  &::before {
    content: 'me';
    position: absolute;
    bottom: -0.55rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.2rem;
    height: 1.9rem;
    background-color: var(--blue-primary);
    border-radius: 2rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.9rem;
    color: #fff;
  }
}
.profile-detail-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  .user-name {
    margin-bottom: 0.4rem;
    font-weight: 700;
    line-height: 2.2rem;
    @include mixin.ellipsis;
  }
  .user-location {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.8rem;
    color: #959595;
  }
}
.steps-box {
  display: flex;
  flex-direction: column;
  width: 10.5rem;
  text-align: right;
  .total-steps {
    margin-bottom: 0.4rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
  .use-item-steps {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #555;
    font-size: 1.4rem;
    line-height: 2rem;
    white-space: nowrap;
    &::before {
      content: '';
      display: inline-block;
      width: 1.8rem;
      height: 1.8rem;
      background: url(~/assets/images/walkingking/ico-booster.svg);
    }
  }
}
</style>
