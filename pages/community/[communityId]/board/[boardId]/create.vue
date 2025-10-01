<template>
  <BaseBody page-title="글 쓰기" :show-back-button="true" :is-transparent="true" :has-close-btn="true">
    <FlexSection>
      <!-- <Select
        :modal-title="'게시글 카테고리'"
        :label="'커뮤니티'"
        :select-placeholder="'커뮤니티를 선택해주세요'"
        :is-invalid="showErrors.community"
        valid-text="커뮤니티를 선택해주세요"
        :cancel-button-text="'선택'"
        :is-show-cancel-btn="false"
        :custom-opts="[
          { value: '자유주제', label: '자유주제' },
          { value: '후기/리뷰', label: '후기/리뷰' },
          { value: '활용법', label: '활용법' },
          { value: '질문', label: '질문' }
        ]"
        @change="handleCommunityChange"
      /> -->
      <SelectTypeBtn
        :legend="'게시판'"
        :display-label="selectedCategoryCombinedLabel"
        placeholder="게시판을 선택해주세요"
        :is-modal-open="isShowCategoryModal"
        :is-invalid="showErrors.board"
        valid-text="게시판을 선택해주세요"
        @click="openCategoryModal"
      />
      <InputText
        v-model="title"
        placeholder="제목을 입력해주세요"
        class="has-no-border"
        :is-invalid="showErrors.title"
        valid-text="제목을 입력해주세요"
      />
      <!-- <textarea
        placeholder="본문에는 사진과 건강데이터를 첨부할 수 있어요"
        maxlength="1000"
        rows="10"
        class="mt-8"
      ></textarea> -->

      <EditorCustom
        class="mt-16"
        :selected-health-data="selectedHealthDataItems"
        @open-health-modal="openHealthModal"
        @remove-health-data="removeHealthDataItem"
      />

      <!-- -->
    </FlexSection>

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowCategoryModal"
        :title="'게시글 카테고리'"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        :is-show-close-button="true"
        @close="cancelCategorySelection"
      >
        <template #content>
          <SelectBoard
            v-model="selectedCategoryValue"
            :categories-data="boardCategories"
            @change="handleCategoryChange"
            @close-modal="isShowCategoryModal = false"
          />
        </template>
      </BottomModal>

      <!-- close 버튼 클릭 시 노출되는 팝업 -->
      <BottomModal
        :is-visible="isShowClosePopup"
        :title="closePopupTitle"
        :content="closePopupContent"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        cancel-button-text="취소"
        confirm-button-text="네"
        @close="isShowClosePopup = false"
        @cancel="isShowClosePopup = false"
        @confirm="handleCloseConfirm"
      >
        <template #content>
          <div class="flex flex-col gap-12">
            <p class="text-left">{{ closePopupContent }}</p>
          </div>
        </template>
      </BottomModal>
      <!-- <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="등록하기" class="lg w-full medium btn-sticky" />
    </ButtonGroup> -->

      <!-- 건강 정보 바텀 모달 추가 -->
      <BottomModal
        :is-visible="isShowHealthModal"
        :title="'건강 데이터 불러오기'"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        :is-show-close-button="true"
        @close="closeHealthModal"
      >
        <template #content>
          <SelectHealthData
            v-model="selectedCategoryValue"
            :categories-data="healthData"
            @change="handleHealthDataChange"
            @close-modal="isShowHealthModal = false"
          />
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import SelectBoard from '~/components/publishing/community/board/SelectBoard.vue'
import SelectHealthData from '~/components/publishing/community/board/SelectHealthData.vue'
import SelectTypeBtn from '~/components/publishing/community/board/SelectTypeBtn.vue'
import EditorCustom from '~/components/publishing/community/board/EditorCustom.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'

// 최종 선택된 옵션의 value (v-model용)
const selectedCategoryValue = ref<string>('')
// '카테고리명 > 옵션명' 형식으로 표시될 텍스트
const selectedCategoryCombinedLabel = ref<string>('')
//  카테고리 선택 모달 상태
const isShowCategoryModal = ref(false)
// 제목 입력값
const title = ref('')
// 각 필드별 에러 표시 여부
const showErrors = ref({
  community: false,
  board: false,
  title: false,
  editor: false
})
// 선택된 커뮤니티 값
const selectedCommunity = ref('')
// close 버튼 클릭 시 팝업 노출 여부
const isShowClosePopup = ref(false)
// 건강 데이터 모달 상태
const isShowHealthModal = ref(false)
// 선택된 건강 데이터 아이템들
interface SelectedHealthDataItem {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
  data: string
}
const selectedHealthDataItems = ref<SelectedHealthDataItem[]>([])

// setCloseHandler inject
const setCloseHandler = inject<(handler: () => void) => void>('setCloseHandler')

// onMounted에서 close 핸들러 등록
onMounted(() => {
  if (setCloseHandler) {
    setCloseHandler(() => {
      isShowClosePopup.value = true
    })
  }
})

const closePopupTitle = computed(() => {
  if (title.value.trim()) {
    return '현재 게시글 수정을 그만두시나요??'
  }
  return '현재 게시글 작성을 그만두시나요?'
})
const closePopupContent = computed(() => {
  if (title.value.trim() || selectedCommunity.value || selectedCategoryValue.value) {
    return '정하신 게시글 내용이 사라집니다.'
  }
  return ' 작성중인 게시글 내용이 모두 사라집니다.'
})
// 게시판 카테고리 데이터
const boardCategories = ref([
  {
    id: 'communication',
    name: '소통하기',
    icon: 'ico-coffee',
    options: [
      { value: 'free_topic', label: '자유주제' },
      { value: 'review', label: '후기/리뷰' },
      { value: 'how_to_use', label: '활용법' },
      { value: 'question', label: '질문' }
    ]
  },
  {
    id: 'co_writing',
    name: '같이쓰기',
    icon: 'ico-team',
    options: [
      { value: 'contest', label: '공모전' },
      { value: 'study', label: '스터디' },
      { value: 'challenge', label: '챌린지' },
      { value: 'project', label: '프로젝트' }
    ]
  }
])

// 건강 데이터 불러오기
const healthData = ref([
  {
    id: 'common',
    name: '공통',
    options: [
      { value: 'tall', label: '키', data: '170cm' },
      { value: 'weight', label: '몸무게', data: '120kg' },
      { value: 'alchol', label: '음주', data: '10병' },
      { value: 'smoke', label: '흡연', data: '하루 10갑' },
      { value: 'workout', label: '운동', data: '하나도 안함' }
    ]
  },
  {
    id: 'walkking',
    name: '걷기왕',
    options: [
      { value: 'steps', label: '일일 걸음수', data: '10' },
      { value: 'calory', label: '소모 칼로리', data: '1000' },
      { value: 'challengeSteps', label: '걷기 대회 걸음 수', data: '100000' },
      { value: 'prizeRank', label: '올해 상금 랭킹', data: '1333' },
      { value: 'joinChallenge', label: '걷기 대회 참가', data: '5회' },
      { value: 'rankChallenge', label: '걷기 대회 순위', data: '1' }
    ]
  },
  {
    id: 'smartRing',
    name: '스마트링',
    options: [
      { value: 'val_1', label: '수면시간', data: '2시간' },
      { value: 'val_2', label: '스트레스 지수', data: '100' },
      { value: 'val_3', label: '심박수', data: '150' },
      { value: 'val_4', label: '심박변이도', data: '100' },
      { value: 'val_5', label: '체온', data: '37.5' },
      { value: 'val_6', label: '산소포화도', data: '30' },
      { value: 'val_7', label: '레몬건강지수', data: '15' },
      { value: 'val_8', label: '건강부채', data: '1000000' },
      { value: 'val_9', label: '기대수명', data: '40세' },
      { value: 'val_10', label: '연간 예상 의료비', data: '100억' }
    ]
  }
])
const openCategoryModal = () => {
  isShowCategoryModal.value = true
}
// CategorySelector에서 change 이벤트 발생 시 호출
const handleCategoryChange = (data: {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
}) => {
  selectedCategoryValue.value = data.value
  selectedCategoryCombinedLabel.value = data.combinedLabel
  // 게시판 에러 제거
  showErrors.value.board = false
}

// 모달이 닫힐 때 이벤트
const cancelCategorySelection = () => {
  isShowCategoryModal.value = false
}

// 건강 데이터 모달 열기
const openHealthModal = () => {
  isShowHealthModal.value = true
}

// 건강 데이터 모달 닫기
const closeHealthModal = () => {
  isShowHealthModal.value = false
}

// 건강 데이터 아이템 제거
const removeHealthDataItem = (value: string) => {
  const index = selectedHealthDataItems.value.findIndex(item => item.value === value)
  if (index !== -1) {
    selectedHealthDataItems.value.splice(index, 1)
  }
}

// 건강 데이터 선택 핸들러 (1개만 허용)
const handleHealthDataChange = (data: {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
  data: string
}) => {
  // 기존 데이터를 새로운 데이터로 교체 (1개만 허용)
  selectedHealthDataItems.value = [data]
  // 모달 닫기
  isShowHealthModal.value = false
}

// 커뮤니티 선택 시 게시판 관련 상태를 리셋하는 함수
const handleCommunityChange = (data: {
  categoryName: string
  optionLabel: string
  combinedLabel: string
  value: string
}) => {
  // 같은 커뮤니티가 선택되었을 때는 게시판 상태 유지
  if (selectedCommunity.value === data.value) {
    // 커뮤니티 에러만 제거
    showErrors.value.community = false
    return
  }

  // 다른 커뮤니티가 선택되었을 때만 게시판 관련 상태를 리셋
  selectedCommunity.value = data.value
  selectedCategoryValue.value = ''
  selectedCategoryCombinedLabel.value = ''
  // 커뮤니티 에러 제거
  showErrors.value.community = false
}

// close 팝업에서 작성 취소 확인 시 호출되는 함수
const handleCloseConfirm = () => {
  // TODO: 작성 취소 로직 구현 (예: 이전 페이지로 이동)
  console.log('작성 취소됨')
  // 팝업 닫기
  isShowClosePopup.value = false
  // 이전 페이지로 이동
  navigateTo(-1)
}

// 등록하기 클릭 시 호출되는 함수
// const handleSubmit = () => {
//   let hasError = false

//   // 커뮤니티 검증
//   if (!selectedCommunity.value) {
//     showErrors.value.community = true
//     hasError = true
//   } else {
//     showErrors.value.community = false
//   }

//   // 게시판 검증
//   if (!selectedCategoryValue.value) {
//     showErrors.value.board = true
//     hasError = true
//   } else {
//     showErrors.value.board = false
//   }

//   // 제목 검증
//   if (!title.value.trim()) {
//     showErrors.value.title = true
//     hasError = true
//   } else {
//     showErrors.value.title = false
//   }

//   // 에러가 있으면 등록 중단
//   if (hasError) {
//     return
//   }

//   // TODO: 게시글 등록 로직 구현
//   console.log('게시글 등록:', {
//     community: selectedCommunity.value,
//     title: title.value,
//     category: selectedCategoryValue.value
//   })
// }
</script>
