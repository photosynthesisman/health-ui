<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <!-- 버튼 타입 -->
    <!-- 25-09-30 filter icon 타입 추가 -->
    <div v-if="select" class="select-option select-type">
      <Select
        v-model="selectedPeriod"
        modal-title="조회하기"
        :transparent="true"
        :custom-opts="selectOptions"
        :class="selectClass"
        :select-placeholder="placeHolder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
import Select from '~/components/publishing/input/Select.vue'

const props = withDefaults(
  defineProps<{
    count?: number
    select?: boolean
    selectOptions?: Array<{ value: string; label: string }>
    selectedPeriod?: string
    filterIcon?: boolean
    placeHolder?: string
  }>(),
  {
    count: 0,
    select: true,
    selectOptions: () => [
      { value: '3month', label: '3개월' },
      { value: '6month', label: '6개월' }
    ],
    selectedPeriod: '',
    placeHolder: '선택하세요',
    filterIcon: false
  }
)

const emit = defineEmits<{
  'update:selectedPeriod': [value: string]
}>()

// v-model 양방향 바인딩
const selectedPeriod = computed({
  get: () => props.selectedPeriod,
  set: value => emit('update:selectedPeriod', value)
})

const selectClass = computed(() => {
  return ['', { 'icon-filter': props.filterIcon }]
})
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  .select-option {
    display: flex;
    flex-direction: row;
    gap: 0 1.2rem;
    margin-left: auto;
    &.btn-type {
      .select-item {
        font-size: 1.6rem;
        font-weight: 500;
        &.active {
          color: vars.$blue-primary;
          font-weight: 700;
        }
      }
    }
    :deep(.custom-select .select-display) {
      min-width: auto;
      line-height: 2rem;
    }
    :deep(.icon-filter .custom-select .select-display) {
      padding-right: 2.8rem;
      color: #555;
    }
    :deep(.icon-filter .custom-select .custom-arrow) {
      width: 2rem;
      height: 2rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M18.3332 5.41797L11.6665 5.41797' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.99984 5.41797H1.6665' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33317 8.33333C9.944 8.33333 11.2498 7.0275 11.2498 5.41667C11.2498 3.80584 9.944 2.5 8.33317 2.5C6.72234 2.5 5.4165 3.80584 5.4165 5.41667C5.4165 7.0275 6.72234 8.33333 8.33317 8.33333Z' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.3333 14.582H15' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33317 14.582H1.6665' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.6667 17.5013C13.2775 17.5013 14.5833 16.1955 14.5833 14.5846C14.5833 12.9738 13.2775 11.668 11.6667 11.668C10.0558 11.668 8.75 12.9738 8.75 14.5846C8.75 16.1955 10.0558 17.5013 11.6667 17.5013Z' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
        center / 2rem no-repeat;
    }
  }
}
</style>
