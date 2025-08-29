<template>
  <div class="floating-btn-wrap">
    <transition name="fade">
      <button v-if="showButton" class="scroll-top-button" aria-label="맨 위로 스크롤" @click="scrollToTarget">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 10.6667L12 4M12 4L19 10.6667M12 4V20"
            stroke="#2B2B2B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </transition>
    <button v-if="hasWriteBtn" class="move-write-button" aria-label="커뮤니티 글쓰기로 이동" @click="clickNext">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.4487 6.95143L17.0487 10.5514M13.7999 19.5516H19.7999M4.44873 19.5514L8.81472 18.6717C9.04649 18.625 9.25931 18.5109 9.42645 18.3437L19.2001 8.56461C19.6687 8.09576 19.6684 7.33577 19.1994 6.86731L17.129 4.79923C16.6602 4.33097 15.9006 4.33129 15.4322 4.79995L5.65749 14.58C5.49068 14.7469 5.37678 14.9593 5.33003 15.1906L4.44873 19.5514Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  hasWriteBtn?: boolean
  anchorSelector?: string // 새롭게 추가된 props
}>()

const showButton = ref(false)

const handleScroll = () => {
  if (window.scrollY > 200) {
    showButton.value = true
  } else {
    showButton.value = false
  }
}
const scrollToTarget = () => {
  if (props.anchorSelector) {
    // anchorSelector에 전달된 값을 사용하여 요소를 찾습니다.
    const targetElement = document.querySelector(`[data-anchor="${props.anchorSelector}"]`)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      })
    }
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const clickNext = () => {
  return navigateTo('/community/[community]/board/[boardID]/create/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.floating-btn-wrap {
  position: fixed;
  z-index: 1000;
  bottom: 1.6rem;
  right: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
}
.scroll-top-button,
.move-write-button {
  width: 4.8rem;
  height: 4.8rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 1.2rem 1.2rem 0 rgba(0, 0, 0, 0.06);
  transition: opacity 0.3s ease;
}
.move-write-button {
  width: 5.6rem;
  height: 5.6rem;
  background: var(--blue-primary);
  border: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
