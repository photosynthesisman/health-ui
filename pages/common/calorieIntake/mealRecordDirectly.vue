<template>
  <BaseBody :show-back-button="true" page-title="식사기록">
    <FlexColDiv class="pt-8 pb-16 gap-8">
      <InputText v-model="newFoodName" placeholder="음식명을 입력해 주세요." />
      <InputText
        v-model="newFoodKcal"
        type="number"
        placeholder="섭취칼로리를 입력 해주세요."
        unit-r="Kcal"
        class="t-left"
      />
      <Button btn-type="line" element-type="button" aria-label="추가하기" @click="addFood" />
    </FlexColDiv>
    <FoodDirectFoodList :foods="foodItems" @delete="handleDeleteFood" />
    <!-- 바텀 버튼 그룹 -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="a" href="" aria-label="취소" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="a" href="" aria-label="등록하기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import FoodDirectFoodList from '~/components/publishing/calorieIntake/FoodDirectFoodList.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

// 테스트 데이터
const foodItems = ref([
  { id: 1, name: '칼국수', kcal: 1300 },
  { id: 2, name: '순대국', kcal: 700 }
])

const newFoodName = ref('')
const newFoodKcal = ref('')

// 값 입력 시 리스트 추가
const addFood = () => {
  if (!newFoodName.value) {
    alert('음식명을 입력해 주세요.')
    return
  }

  if (!newFoodKcal.value) {
    alert('섭취 칼로리를 입력해 주세요.')
    return
  }

  foodItems.value.push({
    id: Date.now(),
    name: newFoodName.value,
    kcal: Number(newFoodKcal.value) || 0
  })

  newFoodName.value = ''
  newFoodKcal.value = ''
}

const handleDeleteFood = (id: number | string) => {
  foodItems.value = foodItems.value.filter(food => food.id !== id)
}
</script>
