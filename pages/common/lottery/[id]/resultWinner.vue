<template>
  <BaseBody page-title="당첨자 정보 입력" :show-back-button="true">
    <WinnerAccordion v-bind="winnerInfo" />
    <hr class="hr-section mt-0 mb-32 ml-n20 mr-n20" style="flex-shrink: 0" />
    <p class="fz-16 bold mb-12">계좌정보</p>
    <InputLabelText label="계좌정보(수령인 명의)" required class="mb-6" />
    <InputSearch
      class="bank-account"
      select-placeholder="은행선택"
      placeholder="계좌번호 입력"
      modal-title="은행선택"
      :custom-search-options="bankOptions"
      :hide-search-icon="true"
      :has-magnifying="false"
    />
    <Button btn-type="primary" element-type="button" aria-label="계좌확인" class="medium mt-8 mb-12" />
    <div v-if="!minor">
      <InputRRN
        :required="true"
        placeholder2="뒷자리 입력"
        :back-value="residentIdBack"
        @update:back-value="residentIdBack = $event"
      />
      <p class="guide-tit">세금 정산을 위해 주민등록번호는 뒷자리 포함 전체 입력 필요합니다.</p>
    </div>
    <div v-else>
      <InputRRN
        :label="'주민등록번호(당첨인)'"
        :required="true"
        placeholder2="뒷자리 입력"
        :back-value="residentIdBack"
        @update:back-value="residentIdBack = $event"
      />
      <p class="guide-tit mb-12">세금 정산을 위해 주민등록번호는 뒷자리 포함 전체 입력 필요합니다.</p>
      <InputRRN
        :label="'주민등록번호(법정대리인)'"
        :required="true"
        placeholder2="뒷자리 입력"
        :back-value="residentIdBack"
        @update:back-value="residentIdBack = $event"
      />
      <p class="guide-tit">세금 정산을 위해 주민등록번호는 뒷자리 포함 전체 입력 필요합니다.</p>
    </div>
    <hr class="hr-section mt-32 mb-32 ml-n20 mr-n20" style="flex-shrink: 0" />
    <AttachedFile required @change="handleImageUpload" />
    <!-- 파일 섹션 -->
    <div v-if="uploadedFiles.length > 0" class="image-sidebar">
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
    <p v-if="!minor" class="guide-tit">경품 수령인의 신분증 사본을 첨부해주세요.</p>
    <div v-else class="guide-tit-wrap">
      <p class="guide-tit">가족관계 증명서 또는 법정대리인 증명서</p>
      <p class="guide-tit">대리인 수령 동의서 (별도 서식 다운로드 필요, 서명 포함)</p>
      <p class="guide-tit">대리인 신분증 사본</p>
    </div>
    <Precautions class="mt-32">
      상금 지급 시 제세공과금(22%) 공제 후 실수령액이 지급됩니다. 정보 오류로 세금 신고 처리 불가 또는 입금 오류 발생 시
      상금 또는 경품 수령이 취소될 수 있습니다. 이와 같은 경우 당사에서 책임지지 않으니 정확한 정보 입력 및 파일 첨부를
      해주세요. 개인정보는 별도로 저장하지 않으며 세금 처리 및 경품 지급 완료 후 즉시 파기합니다.<br />최종 당첨 공지일
      기준으로부터 30일 이내 정보 입력 및 제출이 완료되어야 하며 이후에는 제출 불가하고 상금 또는 경품 수령도
      불가합니다.<br /><br />
      해당 내용에 동의하시면 아래 체크 박스에 체크 후 제출해주세요. 동일연령대 대비 건강상태를 AI 분석을 통해 백분위로
      제공합니다.
    </Precautions>
    <Checkbox
      id="checkBox1"
      v-model="checkbox1"
      custom-style="button agree-all"
      aria-label="위의 내용에 동의합니다."
      class="mt-12"
    />
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="a" href="" aria-label="취소" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="button" aria-label="제출하기" class="lg w-full btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import WinnerAccordion from '~/components/publishing/common/lottery/WinnerAccordion.vue'
import Precautions from '~/components/publishing/common/lottery/Precautions.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import InputRRN from '~/components/publishing/input/InputRRN.vue'
import AttachedFile from '~/components/publishing/common/customerCenter/AttachedFile.vue'
import Checkbox from '~/components/publishing/input/check.vue'
// 미성년자/일반 ref
const minor = ref(false)
const checkbox1 = ref(false)
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
// 파일 객체로 삭제
const deleteFile = (file: UploadedFile) => {
  const index = uploadedFiles.value.findIndex(f => f === file)
  if (index !== -1) {
    uploadedFiles.value.splice(index, 1)
  }
}
const residentIdBack = ref('')

// 은행 옵션 정의
const bankOptions = ref([
  { value: 'shinhan', label: '신한은행' },
  { value: 'woori', label: '우리은행' },
  { value: 'hana', label: '하나은행' }
])
const winnerInfo = reactive({
  challenge: '제1회 걷기왕 챌린지 챌린지명이 길어지면 줄바꿈',
  prize: '상금 500,000원(세전금액)',
  name: '홍길동',
  phone: '010-1234-1234'
})
</script>
<style lang="scss" scoped>
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
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 이미지가 아닌 파일 컨테이너 스타일 */
.otherFile-container {
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  gap: 0.8rem;
}
.health-data-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
.guide-tit-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.8rem;
  .guide-tit {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0;
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      border-radius: 50%;
    }
  }
}
.guide-tit {
  margin-top: 0.6rem;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.8rem;
  color: #555;
}
</style>
