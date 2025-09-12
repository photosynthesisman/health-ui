<template>
  <div class="wrap-insurance-list">
    <button
      v-for="(insurance, index) in items"
      :key="index"
      class="item"
      :class="{ checked: insurance.checked }"
      @click="clickInsurance(index)"
    >
      <img src="/assets/images/insu/icon_bank_whitebg.svg" :alt="insurance.name + ' 로고'" class="logo-insurance" />
      <div class="name-insurance">{{ insurance.name }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Insurance {
  name: string
  checked: boolean
}

const props = defineProps<{
  items: Insurance[]
}>()

const emit = defineEmits<{
  (e: 'update:items', value: Insurance[]): void
  (e: 'select-option', value: Insurance): void
}>()

const clickInsurance = (index: number) => {
  const newItems = [...props.items]
  newItems[index].checked = !newItems[index].checked
  emit('update:items', newItems)
  emit('select-option', newItems[index])
}
</script>

<style lang="scss" scoped>
.wrap-insurance-list {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #f9f9f9;
    border: 0.1rem solid #f9f9f9;
    &:active,
    &.checked {
      border: 0.1rem solid #555555;
    }
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
    }
  }
}
</style>
