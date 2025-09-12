<template>
  <div class="wrap-bottom-sort">
    <div class="text">복수 선택이 가능해요.</div>
    <div class="wrap-sort-check">
      <label class="checkbox-label" for="all">
        <input id="all" class="checkbox" type="checkbox" v-model="isAllSelected" />
        <span class="text">전체</span>
      </label>

      <label v-for="filter in filters" :key="filter.id" class="checkbox-label" :for="filter.id">
        <input :id="filter.id" class="checkbox" type="checkbox" v-model="filter.value" />
        <span class="text">{{ filter.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const filters = ref([
  { id: 'normal', label: '정상', value: false },
  { id: 'expired', label: '실효', value: false },
  { id: 'maturity', label: '만기', value: false },
  { id: 'extinct', label: '소멸', value: false }
])

// '전체' 체크박스 상태를 관리하는 computed 속성
const isAllSelected = computed({
  get() {
    return filters.value.every(filter => filter.value)
  },
  // setter: '전체'의 상태가 변경되면 모든 필터의 value도 변경
  set(newValue: boolean) {
    filters.value.forEach(filter => {
      filter.value = newValue
    })
  }
})
</script>

<style lang="scss" scoped>
.wrap-bottom-sort {
  .text {
    font-size: 1.6rem;
    text-align: left;
  }
  .wrap-sort-check {
    margin-top: 1.6rem;
    background-color: #f4f4f4;
    border: 0.1rem solid #e2e2e2;
    border-radius: 0.8rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    .checkbox-label {
      padding: 1.2rem;
      position: relative;
      border: 0.1rem solid transparent;
      margin: -0.05rem;
      text-align: center;
      line-height: 2rem;
      &:has(.checkbox:checked) {
        border: 0.1rem solid #555555;
        background-color: #ffffff;
        z-index: 1;
      }
      // 모서리 border-radius 적용
      &:nth-child(1) {
        border-top-left-radius: 0.8rem;
      }
      &:nth-child(3) {
        border-top-right-radius: 0.8rem;
      }
      &:nth-child(4) {
        border-bottom-left-radius: 0.8rem;
      }
      &:nth-child(6) {
        border-bottom-right-radius: 0.8rem;
      }
      .text {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }
}
</style>
