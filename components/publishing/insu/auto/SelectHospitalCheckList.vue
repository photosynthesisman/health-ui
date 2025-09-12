<template>
  <div class="wrap-select-doc">
    <div class="wrap-check">
      <Checkbox id="checkAll" v-model="selectAll" aria-label="전체선택" @change="handleSelectAll" />
    </div>
    <div class="wrap-list">
      <HospitalSelector
        v-for="(hospital, index) in hospitals"
        :key="hospital.id"
        :hospital="hospital"
        v-model="hospitalChecks[index]"
        @update:model-value="handleIndividualCheck"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'
import HospitalSelector from '~/components/insu/HospitalSelector.vue'

// 병원 데이터
const hospitals = ref([
  {
    id: 1,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 2,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 3,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 4,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 5,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  },
  {
    id: 6,
    name: '고려대학교 안암병원',
    logo: 'insu/logo_KUMedicine.svg'
  }
])

// 개별 병원 체크박스 상태 배열 (6개 병원)
const hospitalChecks = ref<boolean[]>([false, false, false, false, false, false])

// 전체선택 상태
const selectAll = computed({
  get: () => hospitalChecks.value.every(check => check),
  set: (value: boolean) => {
    hospitalChecks.value = hospitalChecks.value.map(() => value)
  }
})

// 전체선택/해제 처리
const handleSelectAll = (): void => {
  console.log('전체 선택 변경:', selectAll.value)
}

// 개별 체크박스 변경 시 처리
const handleIndividualCheck = (): void => {
  console.log('개별 선택 변경:', hospitalChecks.value)
  // 전체선택 상태 업데이트
  const allChecked = hospitalChecks.value.every(check => check)
  const allUnchecked = hospitalChecks.value.every(check => !check)

  if (allChecked) {
    selectAll.value = true
  } else if (allUnchecked) {
    selectAll.value = false
  }
}

const modelValue = defineModel<boolean[]>({ required: true })
</script>

<style lang="scss" scoped>
.wrap-select-doc {
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
    @include mixin.flex-container(items-center);
    justify-content: flex-end;
  }

  .wrap-list {
    margin: 0 -2rem;
    padding: 2rem 2rem 4.8rem;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
  }
}
</style>
