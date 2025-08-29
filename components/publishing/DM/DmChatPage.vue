<template>
  <section class="chat-inner">
    <div class="chat-header">
      <DmProfileInfo />
      <div class="dm-search">
        <button type="button" class="c-btn c-icon" aria-label="검색" @click="handleSearchToggle">
          <i class="icon ico-search" aria-hidden="true"></i>
        </button>
        <button type="button" class="icon chat-close-btn" aria-label="채팅창 닫기" @click="handleClose">
          <i class="icon close"></i>
        </button>
      </div>
      <!-- 검색 창  -->
      <div v-if="isSearchVisible" class="dm-search-wrap">
        <!-- 뒤로가기 버튼 -->
        <button type="button" class="c-btn c-icon back" aria-label="검색창 닫기" @click="handleSearchClose">
          <i class="icon back" aria-hidden="true"></i>
        </button>
        <InputText inp-type="search" @focus="handleSearchFocus" @blur="handleSearchBlur" />
      </div>
    </div>
    <div class="chat-body">
      <DmBody />
    </div>
    <div class="chat-footer" :class="{ 'is-keyboard-open': isKeyboardOpen || isSearchInputFocused }">
      <div class="dm-footer-input">
        <InputMessage @keyboard-open="handleKeyboardOpen" @keyboard-close="handleKeyboardClose" />
        <ButtonSend />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import DmProfileInfo from '~/components/publishing/DM/DmProfileInfo.vue'
import DmBody from '~/components/publishing/DM/DmBody.vue'
import InputMessage from '~/components/publishing/input/InputMessage.vue'
import ButtonSend from '~/components/publishing/button/ButtonSend.vue'
import InputText from '~/components/publishing/input/InputText.vue'

const isEntering = ref(false)
const isLeaving = ref(false)
// 검색 창 표시 상태 추가
const isSearchVisible = ref(false)
// 검색 입력창 포커스 상태
const isSearchInputFocused = ref(false)
// 가상 키보드 상태
const isKeyboardOpen = ref(false)
const keyboardHeight = ref(0)

// 검색 버튼 클릭 핸들러 추가
const handleSearchToggle = () => {
  isSearchVisible.value = !isSearchVisible.value
}

// 검색 창 닫기 핸들러 추가
const handleSearchClose = () => {
  isSearchVisible.value = false
  isSearchInputFocused.value = false
}

// 검색 입력창 포커스 핸들러
const handleSearchFocus = () => {
  isSearchInputFocused.value = true
}

// 검색 입력창 블러 핸들러
const handleSearchBlur = () => {
  isSearchInputFocused.value = false
}

// 가상 키보드 열림 핸들러
const handleKeyboardOpen = (height: number) => {
  isKeyboardOpen.value = true
  keyboardHeight.value = height

  // 키보드가 열리면 body를 스크롤하여 입력창이 보이도록 조정
  const modalFooter = document.querySelector('.c-modal-footer') as HTMLElement
  if (modalFooter) {
    modalFooter.scrollIntoView({ block: 'end' })
  }
}

// 가상 키보드 닫힘 핸들러
const handleKeyboardClose = () => {
  isKeyboardOpen.value = false
  keyboardHeight.value = 0
}
</script>

<style scoped lang="scss">
.chat-header {
  height: 7.2rem;
  top: 0;
  margin: 0 -2rem;
  position: sticky;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem;
  background: #fff;
}
.chat-body {
  padding: 0 2rem 1rem;
  margin: 0 -2rem;
  background-color: #e7f4ff;
}
.chat-footer {
  background-color: vars.$white;
  padding: 0.8rem 1.6rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .dm-footer-input {
    display: flex;
    flex: 1;
    gap: 0 1.6rem;
  }
}
.dm-search {
  align-self: center;
  display: flex;
  flex-direction: row;
  gap: 0 1.6rem;
  .c-btn,
  .chat-close-btn {
    .icon {
      width: 2.4rem;

      height: 2.4rem;
      display: inline-block;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.dm-search-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  right: 0;
  padding: 1.2rem 2rem;
  display: flex;
  flex-direction: row;
  background: vars.$white;
  align-items: center;
  gap: 0 1.6rem;

  // 검색창 애니메이션 추가
  animation: slideDown 0.3s ease-out;

  .c-btn {
    position: relative;
    flex: 0 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.6rem;
    background-color: transparent;
    border: none;
    margin-left: -0.4rem;
    cursor: pointer;
    i.icon.back {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
}

// 검색창 슬라이드 애니메이션
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// 모바일 키보드 대응 스타일
.chat-footer {
  position: sticky;
  bottom: 0;
  margin: 0 -2rem;
  background: vars.$white;
  z-index: 100;

  &.is-keyboard-open {
    .dm-footer-input {
      align-items: center;
      align-content: center;
    }
  }
}
</style>
