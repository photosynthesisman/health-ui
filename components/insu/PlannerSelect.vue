<template>
  <div class="custom-select-container">
    <div class="custom-select-display" @click="openCustomSelect">
      <span class="fixed-label">{{ label }}</span>
      <div class="separator"></div>
      <span class="selected-value">{{ selectedOptionLabel }}</span>
      <i class="custom-arrow" :class="{ open: isShowCustomSelect }"></i>
    </div>

    <BottomModal
      :title="modalTitle"
      :is-visible="isShowCustomSelect"
      :is-show-cancel-button="false"
      :is-show-confirm-button="false"
      @close="closeCustomSelect"
    >
      <template #content>
        <div class="custom-select-options">
          <div
            v-for="option in options"
            :key="option.value"
            :class="['custom-option-item', { selected: selectedValue === option.value }]"
            @click="selectCustomOption(option)"
          >
            <span class="option-label">{{ option.label }}</span>
            <i v-if="selectedValue === option.value" class="check-icon">✓</i>
          </div>
        </div>
      </template>
    </BottomModal>
  </div>
</template>

<script setup lang="ts">
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import { ref, computed } from 'vue'

// props 정의: 부모로부터 데이터와 설정을 받습니다.
const props = defineProps({
  label: {
    type: String,
    default: '선택'
  },
  modalTitle: {
    type: String,
    default: '항목을 선택해 주세요'
  },
  options: {
    type: Array as () => { value: string | number; label: string }[],
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  }
})

// emit 정의: 부모에게 선택된 값의 변경을 알립니다.
const emit = defineEmits(['update:modelValue'])

// 모달 표시 상태
const isShowCustomSelect = ref(false)

// 부모로부터 받은 값을 내부에서 사용하기 위한 computed 속성
const selectedValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

// 선택된 옵션의 라벨을 표시하기 위한 computed 속성
const selectedOptionLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === selectedValue.value)
  return selectedOption ? selectedOption.label : ''
})

// 모달 열기
const openCustomSelect = () => {
  isShowCustomSelect.value = true
}

// 모달 닫기
const closeCustomSelect = () => {
  isShowCustomSelect.value = false
}

// 옵션 선택
const selectCustomOption = (option: { value: string | number; label: string }) => {
  selectedValue.value = option.value
  closeCustomSelect()
}
</script>
<style lang="scss" scoped>
// 커스텀 Select 스타일
.custom-select-container {
  margin-top: 2rem;
  .custom-select-display {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: #4c7ff7;
    }
    .fixed-label {
      color: #959595;
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
    }

    .separator {
      width: 1px;
      height: 1.6rem;
      background-color: #e2e2e2;
      margin: 0 0.8rem;
    }

    .selected-value {
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      flex: 1;
    }

    .custom-arrow {
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }
}
.custom-select-options {
  margin: 0 -2rem;
  .custom-option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f6f9ff;
    }

    &.selected {
      background-color: #f6f9ff;

      .option-label {
        color: #4c7ff7;
        font-weight: 700;
      }
    }

    .option-label {
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
    }

    .check-icon {
      color: #4c7ff7;
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
}
</style>
