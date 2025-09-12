<template>
  <ul class="food-list">
    <li v-for="food in foods" :key="food.id" class="food-item">
      <strong class="name">{{ food.name }}</strong>
      <span class="kcal">{{ food.kcal.toLocaleString() }}kcal</span>
      <button type="button" class="delete-btn" aria-label="삭제하기" @click="emit('delete', food.id)"></button>
    </li>
  </ul>
</template>

<script setup lang="ts">
// 음식 아이템 타입 정의
interface FoodItem {
  id: string | number
  name: string
  kcal: number
}

// Props 정의
const props = defineProps<{
  foods: FoodItem[]
}>()

// Events 정의
const emit = defineEmits<{
  delete: [id: string | number]
}>()
</script>

<style lang="scss" scoped>
.food-list {
  position: relative;
  margin-inline: -2rem;
  padding-inline: 2rem;
  border-top: 0.1rem solid #eee;
  .food-item {
    width: 100%;
    position: relative;
    border-bottom: 0.1rem solid #eee;
    padding: 2rem 3.2rem 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.4;
      color: #555;
      letter-spacing: -0.03rem;
    }
    .kcal {
      flex: 1;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.4;
      color: #959595;
      letter-spacing: -0.028rem;
      text-align: right;
    }
    .delete-btn {
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='24' height='24' rx='4' fill='%23EEEEEE'/%3E%3Cpath d='M16 8L8 16M16 16L8 8' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A");
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      cursor: pointer;
    }
  }
}
</style>
