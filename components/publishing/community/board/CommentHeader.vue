<template>
  <div class="c-count-box">
    <div>
      댓글 <strong>{{ count }}</strong>
    </div>
    <div class="select-option select-type">
      <Select v-model="selectedPeriod" modal-title="조회하기" :transparent="true" :custom-opts="selectOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from '~/components/publishing/input/Select.vue'
const props = withDefaults(
  defineProps<{
    count?: number
    select?: boolean
    selectOptions?: Array<{ value: string; label: string }>
    selectedPeriod?: string
  }>(),
  {
    count: 0,
    select: true,
    selectOptions: () => [
      { value: 'First', label: '등록순' },
      { value: 'Recent', label: '최신순' }
    ],
    selectedPeriod: '등록순'
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
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  strong {
    color: var(--blue-primary);
  }
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
  }
  :deep(.c-inpType .custom-select .select-display) {
    min-width: auto;
  }
}
</style>
