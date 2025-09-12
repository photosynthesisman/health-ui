<!-- NOTICE: 해시태그 삭제 기획이 없어서 임의로 추가 -->

<!-- TODO: 건강 데이터 기획 나오면 추가 해야함! -->
<template>
  <!-- 07-17 editor-wrap class 추가 -->
  <div class="editor-wrap">
    <!-- 07-17 description 추가 및 주석처리 -->
    <!-- 
    <h1>TipTap 에디터</h1>
    <p class="description">해시태그 : 최대 10자, #과 공백 제외 모든 문자 허용 <br />엔터또는 스페이스바로 생성</p>
    <p class="description">별점 : 최대 5점(0.5점 단위)</p>
    <p class="description">이미지 : 최대 5개 스와이프 기능 제공</p>
    <p class="description">건강 데이터 : 추후 추가 예정 (기획 안나옴)</p>
    <p class="description">
      해당 파일은 원본 Editor / EditorToolbar 에서 가져와 수정 <br />수정사항은 주석으로 표기(ex] 07-17
      description 추가 및 주석처리)
    </p>
    -->

    <div class="editor-container">
      <EditorToolbarCustom
        v-if="editor"
        :editor="editor"
        :hashtag="hashtags"
        :star="star"
        :health-data="healthData"
        :image-count="uploadedFiles.length"
        @image-upload="triggerImageUpload"
        @hashtag="triggerHashtag"
        @star="triggerStar"
        @health-data="triggerHealthData"
      />

      <!-- 건강데이터 섹션 -->
      <div v-if="isHealthDataActive && currentHealthItem" class="health-data-wrap">
        <div class="health-data-item">
          <div class="item-info">
            <strong class="health-cate">{{ currentHealthItem.optionLabel }}</strong>
            <span class="health-detail">{{ currentHealthItem.data }}</span>
          </div>
          <button class="health-info-del" @click="removeHealthData(currentHealthItem.value)"></button>
        </div>
      </div>

      <!-- TipTap 에디터 텍스트 영역 (TipTap 제공 컴포넌트 사용) -->
      <div class="editor-content-wrapper">
        <div class="editor-main">
          <EditorContent :editor="editor" />
          <!-- 숨겨진 파일 입력: 파일 업로드용 -->
          <input ref="fileInputRef" type="file" multiple class="hidden" @change="handleImageUpload" />
        </div>
      </div>
    </div>

    <!-- 해시태그 섹션 -->
    <div v-if="isHashtagActive" class="hashtag-section" @click="focusHashtagSection">
      <div class="hashtag-container">
        <span v-for="(tag, index) in hashtags" :key="index" class="hashtag-item">
          #{{ tag }}
          <!-- 07-17 hashtag-delete에 클래스 추가, x 텍스트 제거 -->
          <button class="hashtag-delete icon close" @click.stop="deleteHashtag(index)"></button>
        </span>

        <!-- 새 해시태그 입력 영역 -->
        <div v-if="showHashtagInput" class="hashtag-input-container">
          <span class="hashtag-hash">#</span>
          <input
            ref="hashtagInputRef"
            v-model="currentHashtagInput"
            type="text"
            class="hashtag-input"
            maxlength="9"
            @keydown.enter="addHashtagAndContinue"
            @keydown.space="addHashtagAndContinue"
            @input="handleHashtagInput"
            @keydown.backspace="handleBackspace"
            @keydown.esc="cancelHashtagInput"
            @blur="addHashtag"
          />
        </div>
      </div>
    </div>

    <!-- 별점 섹션 -->
    <StarRatingSection class="mt-24 ml-20 mr-20" v-if="isStarActive" @close="closeStarRating" />

    <!-- 파일 섹션 -->
    <div v-if="uploadedFiles.length > 0" class="image-sidebar">
      <!-- 이미지 파일 컨테이너 -->
      <div v-if="imageFiles.length > 0" class="image-container">
        <div class="image-container">
          <div v-for="(file, index) in imageFiles" :key="`img-${index}`" class="image-item">
            <div class="image-wrapper">
              <img :src="file.url" :alt="`업로드된 이미지 ${index + 1}`" class="uploaded-image" />
              <button class="image-delete-btn" @click="deleteFile(file)">
                <i class="ri-close-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 이미지가 아닌 파일 컨테이너 -->
      <div v-if="otherFiles.length > 0" class="otherFile-container">
        <div v-for="(file, index) in otherFiles" :key="`file-${index}`" class="other-item">
          <div class="file-name">
            <span class="name">{{ getFileNameAndExtension(file.name).name }}</span
            ><span>{{ getFileNameAndExtension(file.name).extension }}</span>
          </div>
          <button class="file-delete-btn" @click="deleteFile(file)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import EditorToolbarCustom from '~/components/publishing/community/board/EditorToolbarCustom.vue'
import { EditorContent } from '@tiptap/vue-3'
import { useEditor } from '~/composables/common/editor/useEditor'
import StarRatingSection from '~/components/publishing/community/board/StarRatingSection.vue'

const { editor, jsonContent } = useEditor()

// emit 정의
const emit = defineEmits<{
  'open-health-modal': []
  'remove-health-data': [value: string]
}>()

// props 정의
interface SelectedHealthData {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
  data: string
}

const props = defineProps<{
  selectedHealthData?: SelectedHealthData[]
}>()

// 파일 업로드
interface UploadedFile {
  url: string
  name: string
  type: string
  isImage: boolean
}
const fileInputRef = ref<HTMLInputElement | null>(null) // 숨겨진 파일 입력 참조
const uploadedFiles = ref<UploadedFile[]>([]) // 업로드된 파일 배열 (최대 5개)

// 이미지 파일과 기타 파일 분리
const imageFiles = computed(() => uploadedFiles.value.filter(file => file.isImage))
const otherFiles = computed(() => uploadedFiles.value.filter(file => !file.isImage))

// 파일명과 확장자 분리 헬퍼 함수
const getFileNameAndExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    // 확장자가 없거나 파일명이 .으로 시작하는 경우
    return { name: fileName, extension: '' }
  }
  return {
    name: fileName.substring(0, lastDotIndex),
    extension: fileName.substring(lastDotIndex)
  }
}

// 해시태그
const hashtagInputRef = ref<HTMLInputElement | null>(null) // 해시태그 입력 필드 참조
const hashtags = ref<string[]>([]) // 생성된 해시태그 배열
const showHashtagInput = ref<boolean>(false) // 해시태그 입력 모드 상태
const currentHashtagInput = ref<string>('') // 현재 입력 중인 해시태그
const isHashtagActive = ref<boolean>(false) // 해시태그 섹션 활성화 상태 (토글용)

// 별점
const star = ref<number>(0) // 최종 별점 (0-5, 0.5 단위)
const isStarActive = ref<boolean>(false) // 별점 섹션 활성화 상태 (토글용)

// 건강 데이터
const healthData = ref<any>({})
const isHealthDataActive = computed(() => props.selectedHealthData && props.selectedHealthData.length > 0) // 선택된 건강데이터가 있을 때 활성화
const currentHealthItem = computed(() =>
  props.selectedHealthData && props.selectedHealthData.length > 0 ? props.selectedHealthData[0] : null
) // 현재 선택된 건강데이터 (1개만)

//* 이미지 관련 함수들

/**
 * 이미지 업로드 트리거
 * 최대 5개 제한, 초과 시 경고 표시
 */
const triggerImageUpload = () => {
  if (uploadedFiles.value.length >= 5) {
    alert('최대 5개의 파일까지 업로드할 수 있습니다.')
    return
  }
  fileInputRef.value?.click() // 숨겨진 파일 입력 클릭
}

// TODO: 추후 파일 삭제, 파일 ID값으로 삭제할 예정
const deleteImage = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

// 파일 객체로 삭제
const deleteFile = (file: UploadedFile) => {
  const index = uploadedFiles.value.findIndex(f => f === file)
  if (index !== -1) {
    uploadedFiles.value.splice(index, 1)
  }
}

/**
 * 파일 입력 변경 이벤트 핸들러
 * 선택된 파일들을 Base64로 변환하여 배열에 추가
 */
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const currentCount = uploadedFiles.value.length
  const remainingSlots = 5 - currentCount

  if (remainingSlots <= 0) {
    alert('최대 5개의 파일까지 업로드할 수 있습니다.')
    return
  }

  // 선택된 파일 수가 남은 슬롯보다 많으면 제한
  const filesToProcess = Array.from(files).slice(0, remainingSlots)

  if (files.length > filesToProcess.length) {
    alert(`${filesToProcess.length}개의 파일만 업로드됩니다. (최대 5개 제한)`)
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

//* 해시태그 관련 함수들

/**
 * 해시태그 토글 (활성화/비활성화)
 * 비활성화 시 데이터 초기화
 */
const triggerHashtag = () => {
  isHashtagActive.value = !isHashtagActive.value

  if (isHashtagActive.value) {
    // 활성화 시 입력 모드로 진입
    showHashtagInput.value = true
    nextTick(() => {
      hashtagInputRef.value?.focus()
      currentHashtagInput.value = ''
      adjustInputWidth() // 초기 너비 설정
    })
  } else {
    // 비활성화 시 데이터 초기화
    hashtags.value = []
    showHashtagInput.value = false
    currentHashtagInput.value = ''
  }
}

/**
 * 해시태그 섹션 클릭 시 입력 모드 활성화
 */
const focusHashtagSection = () => {
  if (!showHashtagInput.value) {
    showHashtagInput.value = true
    nextTick(() => {
      hashtagInputRef.value?.focus()
      adjustInputWidth()
    })
  }
}

/**
 * 해시태그 추가 (blur 이벤트용)
 * 입력창에서 포커스가 벗어날 때 호출
 */
const addHashtag = () => {
  if (currentHashtagInput.value.trim()) {
    const tag = currentHashtagInput.value.trim().replace(/^#/, '') // # 제거
    if (tag && tag.length <= 10 && !hashtags.value.includes(tag)) {
      hashtags.value.push(tag)
    }
  }
  currentHashtagInput.value = ''
  showHashtagInput.value = false
}

/**
 * 해시태그 추가 후 계속 입력 모드 유지
 * 엔터/스페이스바 입력 시 호출
 */
const addHashtagAndContinue = () => {
  if (currentHashtagInput.value.trim()) {
    const tag = currentHashtagInput.value.trim().replace(/^#/, '') // # 제거
    if (tag && tag.length <= 10 && !hashtags.value.includes(tag)) {
      hashtags.value.push(tag)
    }
  }
  currentHashtagInput.value = ''
  // 다음 해시태그 입력을 위해 입력 상태 유지
  nextTick(() => {
    hashtagInputRef.value?.focus()
    adjustInputWidth() // 입력 완료 후 너비 초기화
  })
}

/**
 * 해시태그 입력 취소 (ESC 키)
 */
const cancelHashtagInput = () => {
  currentHashtagInput.value = ''
  showHashtagInput.value = false
}

/**
 * 해시태그 입력 중 처리
 * 모바일에서 스페이스바 입력 감지 + 동적 너비 조절
 */
const handleHashtagInput = () => {
  // 모바일에서 스페이스바 입력 감지
  if (currentHashtagInput.value.endsWith(' ')) {
    // 스페이스바가 입력되면 해시태그 생성
    currentHashtagInput.value = currentHashtagInput.value.trim()
    addHashtagAndContinue()
    return
  }

  // 입력값에 따라 동적으로 너비 조절
  adjustInputWidth()
}

/**
 * input 필드의 너비를 입력값 길이에 맞게 동적으로 조절
 */
const adjustInputWidth = () => {
  if (hashtagInputRef.value) {
    const input = hashtagInputRef.value
    const value = currentHashtagInput.value || ''

    if (value.length === 0) {
      // 빈 값일 때는 기본 크기
      input.style.width = '10px'
    } else {
      // 임시 span 요소를 생성해서 정확한 텍스트 너비 측정
      const tempSpan = document.createElement('span')

      // input과 동일한 스타일 적용
      const computedStyle = getComputedStyle(input)
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.fontSize = computedStyle.fontSize
      tempSpan.style.fontWeight = computedStyle.fontWeight
      tempSpan.style.fontFamily = computedStyle.fontFamily
      tempSpan.style.whiteSpace = 'pre'

      // 측정할 텍스트 설정
      tempSpan.textContent = value

      // DOM에 추가하여 크기 측정
      document.body.appendChild(tempSpan)
      const textWidth = tempSpan.offsetWidth
      document.body.removeChild(tempSpan)

      // 여유분 8px 추가
      input.style.width = `${textWidth + 8}px`
    }
  }
}

/**
 * 백스페이스 키 처리
 * 입력창이 비어있을 때 마지막 해시태그 삭제
 */
const handleBackspace = () => {
  // 입력 필드가 비어있을 때 백스페이스를 누르면 마지막 해시태그 삭제
  if (currentHashtagInput.value === '' && hashtags.value.length > 0) {
    hashtags.value.pop()
  }
  // 입력 필드에 내용이 있으면 일반적인 백스페이스 동작 (기본 동작)
}

/**
 * 특정 인덱스의 해시태그 삭제
 */
const deleteHashtag = (index: number) => {
  hashtags.value.splice(index, 1)
}

//* 별점 관련 함수들

/**
 * 별점 토글 (활성화/비활성화)
 * 비활성화 시 데이터 초기화
 */
const triggerStar = () => {
  isStarActive.value = !isStarActive.value

  if (!isStarActive.value) {
    // 비활성화 시 데이터 초기화
    star.value = 0
  }
}

/**
 * 별점 입력 모드 종료 (X 버튼용)
 */
const closeStarRating = () => {
  isStarActive.value = false
  star.value = 0
}

//* 건강 데이터 관련 (미구현)

/**
 * 건강데이터 모달 팝업
 */
const triggerHealthData = () => {
  emit('open-health-modal')
}

/**
 * 건강데이터 아이템 제거 (X 버튼용)
 */
const removeHealthData = (value: string) => {
  emit('remove-health-data', value)
}

// 파일 입력 변화 감지
// watch(fileInputRef, () => {
//   console.log('fileInputRef', fileInputRef.value)
// })

// 에디터 JSON 콘텐츠 변화 감지
// watch(
//   jsonContent,
//   newValue => {
//     console.log('📝 에디터 JSON 변화 감지:')
//     console.log(newValue)
//     console.log('---')
//   },
//   { deep: true }
// )
</script>

<style scoped lang="scss">
.editor-wrap {
  margin: 0 -2rem;
  padding-bottom: 5.6rem;
}
/* TipTap 에디터 텍스트 스타일 */
:deep(.ProseMirror) {
  width: 100%;
  outline: none;
  font-size: 1.8rem;
  line-height: 2.9rem;
  color: #555;
}
:deep(.ProseMirror img) {
  width: 100%;
  object-fit: cover;
}
:deep(.hashtag:hover) {
  transform: translateY(-1px);
}
.description {
  color: #6b7280;
  font-size: 14px;
}
.editor-content-wrapper {
  padding: 0 2rem;
  display: flex;
}

.editor-main {
  width: 100%;
  height: 100%;
}

/* 해시태그 섹션 */
.hashtag-section {
  margin-top: 2.4rem;
  .hashtag-container {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.4rem;
    column-gap: 0.8rem;
    align-items: flex-start;
    margin: 0 2rem;
    font-size: 14px;
    color: #374151;
  }
  .hashtag-item {
    display: inline-flex;
    align-items: center;
    color: var(--blue-primary);
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
  }
  .hashtag-delete {
    width: 1.6rem;
    height: 1.6rem;
    background-size: 1.6rem;
    background-position: center top -0.1rem;
    background-repeat: no-repeat;
  }

  /* 중요! */
  /* 해시태그 입력 컨테이너 (width값에 따라서 해시태그 사용자 경험 달라짐 )*/
  /* 이 width값이 크면, 사용자 입장에서는 몇글자 입력 안했는데, 해시태그가 아래 라인에 생김 */
  .hashtag-input-container {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  .hashtag-hash,
  .hashtag-input {
    color: var(--blue-primary);
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
    flex-shrink: 0; /* # 기호는 고정 크기 */
  }
  .hashtag-input {
    width: 1rem;
    min-width: 1rem;
  }
  .hashtag-input::placeholder {
    color: #9ca3af;
  }
  .hashtag-placeholder {
    color: #9ca3af;
    font-size: 14px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .hashtag-placeholder:hover {
    color: #6b7280;
  }
}

// /* 건강 데이터 섹션 */
// .health-section {
//   margin: 2rem;
//   margin-bottom: 0;
//   padding: 16px;
//   background: #f0f9ff;
//   border-radius: 8px;
//   border: 1px solid #e0f2fe;
// }

// .health-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 16px;
// }

// .health-title {
//   font-size: 16px;
//   font-weight: 600;
//   color: #374151;
//   margin: 0 auto;
// }

// .health-close {
//   background: none;
//   border: none;
//   color: #6b7280;
//   cursor: pointer;
//   font-size: 18px;
//   padding: 0;
//   width: 24px;
//   height: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .health-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 12px;
// }

// .health-placeholder {
//   color: #6b7280;
//   font-size: 14px;
//   text-align: center;
//   margin: 0;
//   padding: 20px;
// }

.hidden {
  display: none;
}

/* 이미지 섹션 */
.image-sidebar {
  margin-top: 1.8rem;
  overflow: visible;
  width: 100%;
  height: fit-content;
}

.image-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.image-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.image-wrapper {
  position: relative;
  overflow: visible;
  background: #fff;
  width: 100%;
  border: 0.1rem solid #eee;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.uploaded-file {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 0.4rem;
  padding: 0.8rem;
  gap: 0.4rem;
}

.file-icon {
  font-size: 2.4rem;
  color: #6b7280;
}

.file-name {
  font-size: 1rem;
  color: #374151;
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
  max-height: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

.image-container {
  display: flex;
  gap: 1.2rem;
  width: 100%;
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

.image-limit-notice {
  margin-top: 8px;
  padding: 6px 8px;
  background: #fef3cd;
  border: 1px solid #fde68a;
  border-radius: 4px;
  text-align: center;
}

.limit-text {
  color: #92400e;
  font-size: 12px;
  margin: 0;
  font-weight: 500;
}
/* 이미지가 아닌 파일 컨테이너 스타일 */
.otherFile-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2.4rem 2rem;
}
.health-data-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 2rem 2.4rem;
  .item-info {
    display: flex;
    // flex-wrap: wrap;
    gap: 0.8rem;
    font-size: 1.4rem;
    .health-cate,
    .health-detail {
      font-size: 1.4rem;
      color: #555;
      font-weight: 400;
      &.health-cate {
        font-weight: 600;
        flex: 0 0 auto;
      }
    }
  }
}

.health-data-item,
.other-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 1.8rem;
  height: 4.8rem;
  background: #f4f4f4;
  border-radius: 1.2rem;
  transition: background 0.2s ease;
  &.health-data-item {
    height: auto;
  }
  .file-name {
    font-size: 1.4rem;
    line-height: 1;
    color: #555;
    text-align: left;
    flex: 1;
    margin-right: 1rem;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    .name {
      word-break: break-all;
      @include mixin.ellipsis;
    }
  }
}

.health-info-del,
.file-delete-btn {
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-size: 2.4rem;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 8L8 16M16 16L8 8' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
}

/* Swiper 가로 스크롤 커스텀 스타일 */
:deep(.swiper-pagination) {
  bottom: 5px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: auto !important;
  text-align: center;
}

:deep(.swiper-pagination-bullet) {
  background: #6b7280;
  opacity: 0.5;
  margin: 0 4px !important;
  width: 8px;
  height: 8px;
}

:deep(.swiper-pagination-bullet-active) {
  background: #3b82f6;
  opacity: 1;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #3b82f6 !important;
  width: 24px !important;
  height: 24px !important;
  margin-top: 0 !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 14px !important;
  font-weight: bold !important;
}

:deep(.swiper-button-next) {
  right: 8px !important;
}

:deep(.swiper-button-prev) {
  left: 8px !important;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 1) !important;
  transform: translateY(-50%) scale(1.1) !important;
}

/* 스크롤바 스타일 */
:deep(.swiper-scrollbar) {
  background: rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px !important;
  bottom: 25px !important;
  height: 4px !important;
}

:deep(.swiper-scrollbar-drag) {
  background: #3b82f6 !important;
  border-radius: 10px !important;
}
</style>
