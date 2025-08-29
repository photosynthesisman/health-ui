<template>
  <div class="tip-card">
    <div class="card-link" @click="handleCardClick" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <span class="img-wrap">
        <img src="~/assets/images/home/img-bottom-banner.png" alt="" />
      </span>
      <div class="tip-contents">
        <strong class="tit">{{ title }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props 정의
interface Props {
  id?: string | number
  title?: string
  category?: string
  description?: string
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  category: '일상/유머',
  description: '오늘 하루에 대해 이야기해보자',
  image: '~/assets/images/home/img-bottom-banner.png'
})

// 이벤트 정의
const emit = defineEmits<{
  click: [item: Props]
  cardClick: [item: Props]
}>()

// 터치 관련 상태
const touchStartTime = ref(0)
const touchStartX = ref(0)
const touchStartY = ref(0)

// 터치 시작
const handleTouchStart = (e: TouchEvent) => {
  touchStartTime.value = Date.now()
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
}

// 터치 종료 (클릭 판정)
const handleTouchEnd = (e: TouchEvent) => {
  const touchEndTime = Date.now()
  const touchDuration = touchEndTime - touchStartTime.value

  // 터치 시간이 짧고 (500ms 이하), 움직임이 적으면 클릭으로 판정
  if (touchDuration < 500) {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const moveDistance = Math.sqrt(
      Math.pow(touchEndX - touchStartX.value, 2) + Math.pow(touchEndY - touchStartY.value, 2)
    )

    // 움직임이 10px 이하면 클릭으로 판정
    if (moveDistance < 10) {
      handleCardClick(e)
    }
  }
}

// 카드 클릭 핸들러
const handleCardClick = (e: Event) => {
  e.stopPropagation() // 부모 이벤트 전파 차단

  console.log('카드 클릭됨:', props)

  // 부모 컴포넌트에 이벤트 전달
  emit('click', props)
  emit('cardClick', props)

  // 링크가 있으면 이동
  if (props.link && props.link !== 'javascript:void(0)') {
    // Nuxt의 navigateTo 사용하거나 window.location 사용
    if (typeof navigateTo !== 'undefined') {
      navigateTo(props.link)
    } else {
      window.location.href = props.link
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-card {
  .card-link {
    border-radius: 2rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 0.1rem solid #edeff2;
    background: var(--grayscale-white-fff, #fff);
    box-shadow: 0.4rem 0.4rem 2.3rem 0 rgba(0, 0, 0, 0.06);
    position: relative;
    cursor: pointer;
    @include mixin.rippleEffectPrimary;

    .img-wrap {
      width: 100%;
      height: 12.8rem;
      display: block;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .tip-contents {
      display: flex;
      flex-direction: column;
      padding: 2.4rem;
      background: #f4f4f4;

      .cate-txt {
        font-size: 1.2rem;
        color: #777;
      }

      .tit {
        color: #222;
        font-weight: 700;
        font-size: 1.8rem;
        min-height: 7.5rem;
        line-height: 1.4;

        // 2줄 말줄임 처리
        @include mixin.multi-ellipsis(3);
      }
    }
  }
}

@media (max-width: 375px) {
  .tip-card {
    .card-link {
      width: 18rem;
    }
  }
}
</style>
