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
      <DmBody>
        <template #uploaded-images>
          <div v-if="imageFiles.length > 0" class="image-container">
            <div v-for="(file, index) in imageFiles" :key="`img-${index}`" class="image-item">
              <div class="image-wrapper">
                <img :src="file.url" :alt="`업로드된 이미지 ${index + 1}`" class="uploaded-image" />
                <button class="image-delete-btn" @click="deleteFile(file)">
                  <i class="ri-close-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </DmBody>
    </div>
    <div class="chat-footer" :class="{ 'is-keyboard-open': isKeyboardOpen || isSearchInputFocused }">
      <div class="dm-footer-input">
        <FlexRowDiv class="gap-12">
          <label for="image-upload" class="upload-btn">
            <i class="icon icon-photo"></i>
          </label>
          <input id="image-upload" ref="fileInputRef" type="file" multiple class="hidden" @change="handleImageUpload" />

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

interface UploadedFile {
  url: string
  name: string
  type: string
  isImage: boolean
}
const imageFiles = computed(() => uploadedFiles.value.filter(file => file.isImage))
const fileInputRef = ref<HTMLInputElement | null>(null) // 숨겨진 파일 입력 참조
const uploadedFiles = ref<UploadedFile[]>([]) // 업로드된 파일 배열 (최대 5개)
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const currentCount = uploadedFiles.value.length
  const remainingSlots = 10 - currentCount

  if (remainingSlots <= 0) {
    alert('최대 10개의 파일까지 업로드할 수 있습니다.')
    return
  }

  // 선택된 파일 수가 남은 슬롯보다 많으면 제한
  const filesToProcess = Array.from(files).slice(0, remainingSlots)

  if (files.length > filesToProcess.length) {
    alert(`${filesToProcess.length}개의 파일만 업로드됩니다. (최대 10개 제한)`)
  }

  // 각 파일을 Base64로 변환하여 배열에 추가
  filesToProcess.forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const isImage = file.type.startsWith('image/')
      uploadedFiles.value.push({
        url: result,
        name: file.name,
        type: file.type,
        isImage
      })
    }
    reader.readAsDataURL(file)
  })

  // input 값 초기화 (같은 파일 재선택 가능하도록)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
// 파일 객체로 삭제
const deleteFile = (file: UploadedFile) => {
  const index = uploadedFiles.value.findIndex(f => f === file)
  if (index !== -1) {
    uploadedFiles.value.splice(index, 1)
  }
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
  padding: 0 0 1rem;
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

.image-container {
  display: flex;
  gap: 1.2rem;
  margin: 0 -2rem;
  padding-top: 0.6rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: none;
  }
}
.image-item {
  flex: 1;
  flex-shrink: 0;
  max-width: 8rem;
  height: 8rem;
  aspect-ratio: 1;
  &:first-child {
    margin-left: 2rem;
  }
  &:last-child {
    margin-right: 2rem;
  }
}
.image-wrapper {
  position: relative;
  overflow: visible;
  background: #fff;
  width: 100%;
  border: 0.1rem solid #eee;
}
.image-item .image-wrapper {
  height: 100%;
  border-radius: 0.8rem;
}
.image-item .uploaded-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
}

.image-delete-btn {
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #4f5561
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M12 6L6 12M12 12L6 6' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
    center / 1.8rem no-repeat;
  border-radius: 50%;
}

.hidden {
  display: none;
}
.upload-btn {
  i {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
}
</style>
