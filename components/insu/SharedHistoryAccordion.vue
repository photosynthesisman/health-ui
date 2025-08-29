<template>
  <div class="medical-history-accordion">
    <div
      v-for="(hospital, index) in medicalHistory"
      :key="hospital.id"
      class="accordion-item"
      :class="{ selected: showCheckbox && hospitalSelections[index] }"
    >
      <div class="item-header">
        <div class="history-detail-box">
          <div class="detail-info">
            <div v-for="item in hospital.detailInfos" :key="item.id" class="detail-info-item">
              <span class="tit">{{ item.title }}</span>
              <span v-if="item.price" class="detail">{{ item.price.toLocaleString() }}원</span>
              <span v-else-if="item.detail" class="detail">{{ item.detail }}</span>
              <span v-else-if="item.password" class="detail">
                <template v-if="item.id !== undefined && passwordVisibility[item.id]">
                  {{ item.password }}
                </template>
                <template v-else>
                  {{ maskPassword(item.password) }}
                </template>
                <button class="icon-show-password" @click="togglePasswordVisibility(item.id)"></button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-content" :class="{ 'is-expanded': isDetailVisible[index] }">
        <div class="department-list">
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
      <div class="item-toggle" @click="toggleDetail(index)">
        <div class="toggle-text">{{ isDetailVisible[index] ? '내역접기' : '내역보기' }}</div>
        <i class="icon-arrow" :class="{ 'is-rotated': isDetailVisible[index] }"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

interface InfoDetail {
  id?: number
  title: string
  detail?: string
  price?: number
  password?: number
}

interface MedicalHistory {
  id: number
  departments: Department[]
  detailInfos: InfoDetail[]
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

// 아코디언 상태 (초기: 닫힘)
const isDetailVisible = ref<boolean[]>(props.medicalHistory.map(() => false))

// 각 병원의 체크박스 상태를 관리하는 배열
const hospitalSelections = ref<boolean[]>(props.medicalHistory.map(() => props.modelValue || false))

// 아코디언 토글 함수
const toggleDetail = (index: number) => {
  isDetailVisible.value[index] = !isDetailVisible.value[index]
}

const maskPassword = (password: number): string => {
  return '*'.repeat(String(password).length)
}
// 각 항목의 비밀번호 표시 상태를 관리하는 반응형 객체
const passwordVisibility = reactive<Record<number, boolean>>({})

// 비밀번호 표시 상태를 토글하는 함수
const togglePasswordVisibility = (id: number | undefined) => {
  if (id !== undefined) {
    passwordVisibility[id] = !passwordVisibility[id]
  }
}
</script>

<style lang="scss" scoped>
.medical-history-accordion {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  }

  .item-content {
    padding: 0 2rem;
    overflow: hidden;
    transition:
      max-height 0.3s ease-in-out,
      padding 0.3s ease-in-out;
    max-height: 0;
    &.is-expanded {
      position: relative;
      max-height: 50rem;
      transition:
        max-height 0.3s ease-in-out,
        padding 0.3s ease-in-out;
      padding: 2rem 2rem 0 2rem;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 2rem;
        right: 2rem;
        height: 0.1rem;
        background-color: #eee;
      }
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

.history-detail-box {
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  background: #fff;
  .detail-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .detail-info-item {
    display: flex;
    justify-content: space-between;
    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
    .detail {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
      &:has(.icon-show-password) {
        display: flex;
        align-items: center;
      }
    }
    .icon-show-password {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-left: 0.2rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
        center / 100% no-repeat;
    }
  }
  .payment-total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e2e2;
    strong {
      line-height: 2.2rem;
    }
  }
}
</style>
