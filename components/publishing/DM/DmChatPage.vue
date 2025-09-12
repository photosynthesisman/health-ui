<template>
  <section class="chat-inner">
    <div class="chat-header">
      <DmProfileInfo />
      <div class="dm-search">
        <button type="button" class="chat-report-btn" @click="toggleBottomModal">신고하기</button>
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
        <FlexRowDiv class="gap-12">
          <InputImage />
          <BtnEmoji />
        </FlexRowDiv>
        <InputMessage @keyboard-open="handleKeyboardOpen" @keyboard-close="handleKeyboardClose" />
        <ButtonSend />
      </div>
    </div>
  </section>
  <Teleport to="body">
    <BottomModal
      :is-visible="isShowReportModal"
      v-bind="ReportModalProps"
      @confirm="clickConfirmReportModal"
      @close="toggleReportModal"
    >
      <template #content>
        <ReportBox />
      </template>
    </BottomModal>

    <ConfirmModal
      :is-visible="showConfirmModal"
      :is-show-cancel-button="false"
      :html="ConfirmModalContent"
      :title="'현재 이 대화는 일시적으로 중단되었습니다.'"
      confirm-button-text="확인"
      cancel-button-text="취소하기"
      @confirm="closeConfirmModal"
      @close="closeConfirmModal"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, Teleport } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import InputImage from '~/components/publishing/input/InputImage.vue'
import BtnEmoji from '~/components/publishing/input/BtnEmoji.vue'
import DmProfileInfo from '~/components/publishing/DM/DmProfileInfo.vue'
import DmBody from '~/components/publishing/DM/DmBody.vue'
import InputMessage from '~/components/publishing/input/InputMessage.vue'
import ButtonSend from '~/components/publishing/button/ButtonSend.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import ReportBox from '~/components/publishing/community/board/ReportBox.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
const isEntering = ref(false)
const isLeaving = ref(false)
// 검색 창 표시 상태 추가
const isSearchVisible = ref(false)
// 검색 입력창 포커스 상태
const isSearchInputFocused = ref(false)
// 가상 키보드 상태
const isKeyboardOpen = ref(false)
const keyboardHeight = ref(0)

// 신고하기 바텀모달 상태
const isShowReportModal = ref(false)
const toggleBottomModal = () => {
  isShowReportModal.value = !isShowReportModal.value
}

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

const handleClose = () => {
  console.log('DM창 닫기')
}

// 신고하기 모달 props
const ReportModalProps = ref({
  title: '신고하기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '신고하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// 타인 댓글 더보기 모달 토글
const toggleReportModal = () => {
  isShowReportModal.value = false
}
// 타인 댓글 더보기 모달 신고하기 버튼 클릭시
const clickConfirmReportModal = () => {
  ConfirmModalContent.value = `<p style="color:#555; font-size:1.6rem; line-height: 2.2rem;">
      신고 처리되어 해당 유저와의 대화는 더 이상 표시되지 않습니다. 신고 철회를 원하시면 고객센터로 문의 부탁드립니다.</p>
    `
  showConfirmModal.value = true
  isShowReportModal.value = false
}

// confirmModal 상태관리
const showConfirmModal = ref(false)
const ConfirmModalContent = ref('')

const closeConfirmModal = () => {
  showConfirmModal.value = false
}
</script>

<style scoped lang="scss">
.chat-inner {
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.chat-header {
  width: 100%;
  height: 7.2rem;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 0;
  background: #fff;
}
.chat-body {
  flex: 1;
  max-height: calc(100dvh - 12.8rem);
  overflow-y: auto;
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
    align-items: center;
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
  .chat-report-btn {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.4;
    color: #555;
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
