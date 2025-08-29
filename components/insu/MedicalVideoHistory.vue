<template>
  <div class="medical-history-accordion">
    <div v-for="(hospital, index) in medicalHistory" :key="hospital.id" class="accordion-item">
      <div class="item-content">
        <div class="department-list">
          <div class="has-video-count">
            영상보유<strong>&nbsp;{{ getVideoCount(hospital) }}건</strong>
          </div>
          <div v-for="department in hospital.departments" :key="department.id" class="department-item">
            <div class="department-item-label">
              <strong>진료과</strong>
              <strong>{{ department.department }}</strong>
            </div>
            <div v-for="examination in department.examinations" :key="examination.id" class="department-item-tit">
              <div class="department-item-tit-text">{{ examination.name }}</div>
              <div class="department-item-tit-text">{{ examination.date }}</div>
            </div>
          </div>
        </div>
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

interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  // 항목별 확장 필드
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
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
  showStatus: false,
  showCheckbox: false,
  isIssueDate: false,
  isShareDate: false,
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
  'status-click': [hospital: MedicalHistory]
}>()

const allButtons = [
  { key: 'share', label: '영상 공유', type: 'primary-line' },
  { key: 'cd', label: 'CD 배송', type: 'line' },
  { key: 'history', label: '영상 공유 내역', type: 'line' }
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
  return hospital.departments.reduce((total, department) => {
    return total + department.examinations.length
  }, 0)
}
</script>

<style lang="scss" scoped>
.medical-history-accordion {
  .has-video-count {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.2rem;
    strong {
      color: var(--blue-primary);
    }
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .accordion-item {
    padding: 2rem;
    border: 1px solid #eee;
    border-radius: 1.2rem;
    background-color: #fff;
  }
  .item-content {
    .department-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .department-item {
      display: flex;
      gap: 0.8rem;
      flex-direction: column;
      justify-content: center;

      & + .department-item {
        border-top: 0.1rem solid #eee;
        padding-top: 2rem;
      }
    }

    .department-item-label,
    .department-item-tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.4rem;
      .department-item-tit-text {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 2rem;
        color: #959595;
      }
    }
  }
}
</style>
