<template>
  <div class="star-section">
    <div v-if="!anotherType" class="star-header">
      <h3 class="star-title">별점</h3>
      <!-- 07-17 star-close에 클래스 추가, x 텍스트 제거 -->
      <button v-if="showCloseButton" class="star-close icon close" @click="closeStarRating"></button>
    </div>
    <div class="star-container" :class="{ 'type-2': anotherType }">
      <div ref="starRatingContainer" class="star-rating">
        <div
          v-for="starIndex in 5"
          :key="starIndex"
          class="star-wrapper"
          @mousemove="handleStarMove($event, starIndex)"
          @mouseleave="handleStarLeave"
          @touchmove="handleStarTouch($event)"
          @touchend="handleTouchEnd"
          @click="setStarRating(starIndex)"
        >
          <!-- 07-17 별 이모지 제거 -->
          <div class="star-bg"></div>
          <div class="star-fill" :style="{ width: getStarFillWidth(starIndex) }"></div>
        </div>
      </div>
      <div class="star-score">{{ star.toFixed(1) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// props 정의
interface Props {
  showCloseButton?: boolean
  anotherType?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  anotherType: false
})

// emit 정의
const emit = defineEmits<{
  close: []
}>()

// 별점 관련 변수들
const star = ref<number>(0) // 최종 별점 (0-5, 0.5 단위)
const hoverStar = ref<number>(0) // 마우스 호버 시 임시 별점

//* 별점 관련 함수들

/**
 * 별점 입력 모드 종료 (X 버튼용)
 */
const closeStarRating = () => {
  star.value = 0
  hoverStar.value = 0
  emit('close')
}

/**
 * 마우스 이동 시 별점 미리보기
 * 별의 왼쪽/오른쪽 절반에 따라 0.5점 단위 계산
 */
const handleStarMove = (event: MouseEvent, starIndex: number) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const x = event.clientX - rect.left
  const width = rect.width
  const isHalfStar = x < width / 2
  hoverStar.value = isHalfStar ? starIndex - 0.5 : starIndex
}

/**
 * 마우스가 별점 영역을 벗어날 때
 */
const handleStarLeave = () => {
  hoverStar.value = 0
}
const starRatingContainer = ref<HTMLElement | null>(null)
/**
 * 터치 이동 시 별점 미리보기 (모바일)
 */
const handleStarTouch = (event: TouchEvent) => {
  event.preventDefault()

  // 널 체크: 컨테이너가 없으면 함수 종료
  if (!starRatingContainer.value) {
    return
  }

  const touch = event.touches[0]
  const containerRect = starRatingContainer.value.getBoundingClientRect()

  // 터치 위치가 컨테이너 범위 내에 있을 때만 처리
  if (touch.clientX >= containerRect.left && touch.clientX <= containerRect.right) {
    // 컨테이너 내에서의 터치 위치 계산
    const touchX = touch.clientX - containerRect.left
    const containerWidth = containerRect.width

    // 비율에 따른 별점 계산 (5점 만점)
    const newRating = Math.min(Math.round((touchX / containerWidth) * 5 * 2) / 2, 5) // 0.5점 단위 반올림 및 최대값 5점 제한

    hoverStar.value = newRating
  }
}

/**
 * 터치 종료 시 별점 확정 (모바일)
 */
const handleTouchEnd = () => {
  if (hoverStar.value > 0) {
    star.value = hoverStar.value
  }
}

/**
 * 별점 클릭 시 별점 설정
 */
const setStarRating = (starIndex: number) => {
  star.value = hoverStar.value > 0 ? hoverStar.value : starIndex
}

/**
 * 별의 채움 너비 계산 (0.5점 단위 표현)
 * @param starIndex 별의 인덱스 (1-5)
 * @returns CSS width 값 (0%, 50%, 100%)
 */
const getStarFillWidth = (starIndex: number): string => {
  const currentRating = hoverStar.value > 0 ? hoverStar.value : star.value
  if (starIndex <= currentRating) {
    return '100%' // 완전히 채움
  } else if (starIndex - 0.5 <= currentRating) {
    return '50%' // 절반 채움
  }
  return '0%' // 비어있음
}
</script>

<style scoped lang="scss">
/* 별점 섹션 */
.star-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  // margin: 2.4rem 2rem 0;
  padding: 1.5rem;
  border-radius: 0.8rem;
  border: 0.1rem solid #eee;
  &:has(.type-2) {
    padding: 0.7rem 0;
    border: 0;
  }
}
.star-header {
  position: relative;
  .star-title {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
    text-align: center;
  }
  .star-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.6rem;
    height: 1.6rem;
    background-size: 1.6rem;
    background-repeat: no-repeat;
  }
}
.star-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  &.type-2 {
    flex-direction: row;
    .star-rating {
      order: 2;
      gap: 0.4rem;
    }
    .star-score {
      width: 2.5rem;
      order: 1;
      font-size: 1.6rem;
      line-height: 2rem;
    }
    .star-bg,
    .star-fill {
      width: 2rem;
      height: 2rem;
      background-size: 2rem;
    }
  }
}
.star-rating {
  display: flex;
  gap: 0.8rem;
}
.star-wrapper {
  position: relative;
  cursor: pointer;
  user-select: none;
}
.star-bg {
  width: 3.2rem;
  height: 3.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23F4F4F4' stroke='%23E2E2E2' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.star-fill {
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M15.8268 3.6185C16.1022 3.06044 16.898 3.06044 17.1734 3.6185L20.7387 10.8427C20.8481 11.0643 21.0595 11.2179 21.3041 11.2534L29.2764 12.4119C29.8923 12.5013 30.1382 13.2582 29.6926 13.6926L23.9237 19.3158C23.7467 19.4883 23.666 19.7368 23.7078 19.9804L25.0696 27.9205C25.1748 28.5339 24.531 29.0016 23.9802 28.712L16.8495 24.9632C16.6308 24.8482 16.3694 24.8482 16.1507 24.9632L9.02002 28.712C8.46918 29.0016 7.82538 28.5339 7.93059 27.9205L9.29242 19.9804C9.3342 19.7368 9.25345 19.4883 9.07648 19.3158L3.30764 13.6926C2.86201 13.2582 3.10792 12.5013 3.72377 12.4119L11.6961 11.2534C11.9407 11.2179 12.1521 11.0643 12.2615 10.8427L15.8268 3.6185Z' fill='%23FCD233' stroke='%23FBC700' stroke-linejoin='round'/%3E%3C/svg%3E");
  overflow: hidden;
  transition: width 0.1s ease;
}
.star-score {
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.6rem;
}
</style>
