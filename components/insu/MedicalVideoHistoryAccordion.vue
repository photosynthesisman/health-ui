<template>
  <div class="medical-history-accordion">
    <div v-if="isLabelTitle" class="accordion-header">
      <span>{{ labelTitle }}</span>
    </div>
    <div
      v-for="(hospital, index) in medicalHistory"
      :key="hospital.id"
      class="accordion-item"
      :class="{ selected: showCheckbox && hospitalSelections[index] }"
    >
      <div class="item-header">
        <div class="item-header-top">
          <div class="item-logo">
            <img :src="hospital.logo" :alt="hospital.hospitalName" />
          </div>
          <div class="item-info">
            <div class="item-tit">
              {{ hospital.hospitalName }}
            </div>
            <div class="item-video-count">
              영상보유 <span>{{ getVideoCount(hospital) }}</span
              >건,
              <!-- 발급 진행중 추가 -->
              <span>{{ getissueInProgress(hospital) }}</span
              >건 발급 진행중
            </div>
          </div>
          <div v-if="showStatus && !isDetailVisible[index]" class="item-status">
            <template v-if="hospital.status === '다시발급받기'">
              <Button btn-type="line" class="xxs" aria-label="다시발급받기" @click="handleReissue(hospital)" />
            </template>
            <template v-else>
              {{ hospital.status }}
            </template>
          </div>
        </div>
      </div>
      <div class="item-content" :class="{ 'is-expanded': isDetailVisible[index] }">
        <div class="video-history-item">
          <div class="department-list">
            <!-- medicalVideoItems 배열이 있으면 해당 데이터로 렌더링, 없으면 기존 departments 사용 -->
            <template v-if="hospital.medicalVideoItems && hospital.medicalVideoItems.length > 0">
              <div v-for="item in hospital.medicalVideoItems" :key="item.id" class="department-item">
                <div class="department-item-label">
                  <strong class="date-tit"
                    >발급일자 <span class="date">{{ item.issueDate }}</span></strong
                  >
                  <Button
                    btn-type="text"
                    class="sm"
                    icon="arrow-type"
                    icon-position="right"
                    aria-label="발급 정보"
                    @click="emit('status-click', hospital)"
                  />
                </div>

                <div class="department-item-label">
                  <strong>진료과</strong>
                  <strong class="department-name">{{ item.department }}</strong>
                </div>

                <div v-for="exam in item.examinations" :key="exam.id" class="department-item-label">
                  <strong>{{ exam.name }}</strong>
                  <strong>{{ exam.date }}</strong>
                </div>

                <ButtonGroup
                  v-if="getVisibleButtons(item.buttonCount, item.buttonKeys).length > 0"
                  :class="getButtonGroupClass(item.buttonCount, item.buttonKeys)"
                  gap="6"
                >
                  <Button
                    v-for="btn in getVisibleButtons(item.buttonCount, item.buttonKeys)"
                    :key="btn.key"
                    :btn-type="btn.type"
                    class="xs"
                    :aria-label="btn.label"
                    @click="handleButtonClick(btn.key, hospital)"
                  />
                </ButtonGroup>
                <div class="item-date">
                  <strong>공유 가능 기간</strong>
                  <strong v-if="!(item.shareFrom && item.shareTo)" class="expire">공유기간 만료</strong>
                  <strong v-else class="date">{{ item.shareFrom }} ~ {{ item.shareTo }}</strong>
                </div>
              </div>
            </template>
            <!-- medicalVideoItems가 없으면 기본 렌더링 (하드코딩된 예시 데이터) -->
            <template v-else>
              <div class="department-item">
                <div class="department-item-label">
                  <strong class="date-tit">발급일자 <span class="date">2025.06.25</span></strong>
                  <Button
                    btn-type="text"
                    class="sm"
                    icon="arrow-type"
                    icon-position="right"
                    aria-label="발급 정보"
                    @click="emit('status-click', hospital)"
                  />
                </div>

                <div class="department-item-label">
                  <strong>진료과</strong>
                  <strong class="department-name">영상의학과</strong>
                </div>

                <div class="department-item-label">
                  <strong>CT 검사</strong>
                  <strong>2025.06.25</strong>
                </div>

                <div class="department-item-label">
                  <strong>MRI 검사</strong>
                  <strong>2025.06.25</strong>
                </div>

                <ButtonGroup
                  v-if="getVisibleButtons(hospital.buttonCount, hospital.buttonKeys).length > 0"
                  :class="getButtonGroupClass(hospital.buttonCount, hospital.buttonKeys)"
                  gap="6"
                >
                  <Button
                    v-for="btn in getVisibleButtons(hospital.buttonCount, hospital.buttonKeys)"
                    :key="btn.key"
                    :btn-type="btn.type"
                    class="xs"
                    :aria-label="btn.label"
                    @click="handleButtonClick(btn.key, hospital)"
                  />
                </ButtonGroup>
                <div class="item-date">
                  <strong>공유 가능 기간</strong>
                  <strong v-if="!(hospital.shareFrom && hospital.shareTo)" class="expire">공유기간 만료</strong>
                  <strong v-else class="date">{{ hospital.shareFrom }} ~ {{ hospital.shareTo }}</strong>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="item-toggle" @click="toggleDetail(index)">
        <div class="toggle-text">{{ isDetailVisible[index] ? '내역접기' : '보기' }}</div>
        <i class="icon-arrow" :class="{ 'is-rotated': isDetailVisible[index] }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'

interface Examination {
  id: number
  name: string
  date: string
}

interface Department {
  id: number
  department: string
  examinations: Examination[]
}

interface MedicalItem {
  id: number
  status?: string // 발급 상태
  issueDate: string // 발급일자
  department: string // 진료과
  examinations: Examination[] // 검사 목록
  shareFrom?: string // 공유 가능 시작일
  shareTo?: string // 공유 가능 종료일
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
}

interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  // 항목별 확장 필드
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  isRefund?: string
  refundDate?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
  medicalVideoItems?: MedicalItem[] // 의료 항목 목록 추가
}

interface Props {
  medicalHistory: MedicalHistory[]
  isLabelTitle?: boolean
  labelTitle?: string
  isIssueDate?: boolean
  isShareDate?: boolean
  showStatus?: boolean
  showCheckbox?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelTitle: '의료영상 공유내역',
  showStatus: true,
  showCheckbox: false,
  isIssueDate: false,
  isShareDate: false,
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
  'status-click': [hospital: MedicalHistory]
  'history-click': [hospital: MedicalHistory]
  'share-click': [hospital: MedicalHistory]
  'cd-click': [hospital: MedicalHistory]
  'reissue-click': [hospital: MedicalHistory]
}>()

const allButtons = [
  { key: 'share', label: '영상공유하기', type: 'primary' },
  { key: 'cd', label: 'CD배송신청', type: 'line' },
  { key: 'history', label: '영상공유내역', type: 'line' }
]

const getVisibleButtons = (count?: number, keys?: ('share' | 'cd' | 'history')[]) => {
  if (keys && keys.length) {
    return allButtons.filter(b => keys.includes(b.key))
  }
  const c = Math.max(0, Math.min(3, count ?? 0))
  return allButtons.slice(0, c)
}

const getButtonGroupClass = (count?: number, keys?: ('share' | 'cd' | 'history')[]) => {
  const length = keys?.length ?? Math.max(0, Math.min(3, count ?? 0))
  return {
    single: length === 1,
    half: length === 2,
    triple: length === 3
  }
}

// 아코디언 상태 (초기: 닫힘)
const isDetailVisible = ref<boolean[]>(props.medicalHistory.map(() => false))

// 각 병원의 체크박스 상태를 관리하는 배열
const hospitalSelections = ref<boolean[]>(props.medicalHistory.map(() => props.modelValue || false))

// 아코디언 토글 함수
const toggleDetail = (index: number) => {
  isDetailVisible.value[index] = !isDetailVisible.value[index]
}

// 체크박스 변경 핸들러
const handleCheckboxChange = (index: number, value: boolean) => {
  hospitalSelections.value[index] = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 각 병원의 영상 개수를 계산하는 함수
const getVideoCount = (hospital: MedicalHistory) => {
  return 3 // 임시로 3개 반환하는걸로 넣어둠
}

// 발급 진행중인 건수를 반환하는 함수
const getissueInProgress = (hospital: MedicalHistory) => {
  return 1 // 임시로 1개 반환하는걸로 넣어둠
}
const handleButtonClick = (key: string, hospital: MedicalHistory) => {
  // 'history' 버튼이 클릭되었을 때만 history-click 이벤트 발생
  if (key === 'history') {
    emit('history-click', hospital)
  } else if (key === 'share') {
    emit('share-click', hospital)
  } else if (key === 'cd') {
    emit('cd-click', hospital)
  }
}

// 다시발급받기 핸들러
const handleReissue = (hospital: MedicalHistory) => {
  emit('reissue-click', hospital)
}
</script>

<style lang="scss" scoped>
.medical-history-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .accordion-header {
    line-height: 1.6rem;
    span {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.6rem;
      color: #555;
    }
  }

  .accordion-item {
    border: 1px solid #eee;
    border-radius: 1.2rem;
    background-color: #fff;

    &.selected {
      border-width: 0.2rem;
      border-color: #4c7ff7;
    }
  }

  .item-header {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.6rem;

    .item-header-top {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1.6rem;
    }

    .item-logo {
      width: 4.8rem;
      height: 4.8rem;
      border: 0.1rem solid #eee;
      overflow: hidden;
      border-radius: 2rem;
      flex: 0 0 auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.1rem;
    }

    .item-tit {
      font-weight: 700;
      line-height: 2.2rem;
      @include mixin.ellipsis;
    }

    .item-video-count {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
      color: #4c7ff7;
      word-break: keep-all;
    }
    .item-status {
      font-size: 1.3rem;
      font-weight: 500;
      color: #959595;
      display: flex;
      align-self: flex-start;
      line-height: 2.6rem;
      :deep(.btn-line) {
        border-radius: 1.4rem;
        @include mixin.rippleEffectPrimary;
      }
      :deep(.text) {
        padding: 0 1.2rem;
        font-size: 1.2rem;
        color: #959595;
      }
    }

    .item-checkbox {
      flex-shrink: 0;
      margin-left: auto;
    }

    .item-header-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    :deep(.btn-group) {
      flex: 1;
      margin-top: 1.2rem;
    }
    :deep(.btn-group.triple) .c-btn {
      width: auto;
      flex: auto;
    }
    .expire {
      color: #f1496b;
    }
  }

  .item-date {
    display: flex;
    color: #2b2b2b;
    align-items: center;
    width: 100%;
    overflow: hidden;
    font-size: 1.4rem;
    font-weight: 600;
    gap: 0 1.2rem;
    padding: 0 0.4rem;
    strong {
      display: inline-block;
      font-weight: 600;
    }
  }

  .item-content {
    padding: 0 2rem;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: 0;

    &.is-expanded {
      max-height: 50rem;
      transition: max-height 0.3s ease-in-out;
    }

    .department-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-bottom: 2rem;
    }

    .department-item {
      display: flex;
      gap: 0.8rem;
      flex-direction: column;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 500;
      color: #959595;
      & + .department-item {
        border-top: 0.1rem solid #eee;
        padding-top: 2rem;
      }
      .btn-text {
        font-size: 1.3rem;
        color: #959595;
        display: flex;
        align-items: stretch;
        .text {
          padding: 0;
          font-weight: 500;
        }
      }
    }

    .department-item-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      font-size: 1.3rem;
      color: #959595;
      strong {
        font-weight: 500;
      }
      .date-tit {
        font-weight: 600;
        color: #2b2b2b;
        font-size: 1.4rem;
        display: flex;
        gap: 0 1.2rem;
      }
      .department-name {
        font-size: 1.4rem;
        color: #2b2b2b;
        font-weight: 500;
      }
    }
    .btn-group {
      margin-top: 0.8rem;
    }
  }

  .item-toggle {
    border-top: 0.1rem solid #eeeeee;
    padding: 1.7rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;

    .toggle-text {
      font-size: 1.4rem;
      color: #555;
    }

    .icon-arrow {
      width: 2rem;
      height: 2rem;
      background-image: url('/assets/images/insu/icon-arrow-down.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: transform 0.3s ease;

      &.is-rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
