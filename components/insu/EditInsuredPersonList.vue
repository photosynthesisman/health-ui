<template>
  <div class="wrap-edit">
    <div class="wrap-check">
      <Checkbox
        id="checkBox1"
        aria-label="전체 선택"
        :model-value="isAllSelected"
        @update:model-value="toggleAllSelection"
      />
    </div>
    <div class="wrap-insured-list">
      <div v-for="person in personList" :key="person.id" class="item">
        <div class="item-header">
          <label :for="`check-${person.id}`" class="c-checktype-btn">
            <input
              :id="`check-${person.id}`"
              :name="`check-${person.id}`"
              type="checkbox"
              class="c-checktype-check"
              :checked="selections.has(person.id)"
              @change="handleCheckboxChange(person.id, $event)"
            />
            <i class="icon"></i>
            <div class="wrap-user">
              <div class="name">{{ person.name }}</div>
              <div class="phone">{{ person.phone }}</div>
            </div>
          </label>
          <button class="btn-edit" @click="emit('edit-click', person)">편집하기</button>
        </div>
        <div class="wrap-label">
          <CommonBadge v-for="insurance in person.insurances" :key="insurance">
            {{ insurance }}
          </CommonBadge>
        </div>
        <div class="wrap-memo">
          <div class="text">
            {{ person.memo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

// props 정의: 부모로부터 목록 데이터와 선택 상태를 받음
const props = defineProps<{
  personList: {
    id: string | number
    name: string
    phone: string
    insurances: string[]
    memo: string
  }[]
  // 선택된 항목의 ID를 담고 있는 Set을 받음
  modelValue: Set<string | number>
}>()

// emit 정의: 부모에게 선택 상태 변경을 알림
const emit = defineEmits(['update:modelValue', 'edit-click'])

// 내부에서 관리할 선택 상태
const selections = ref(new Set<string | number>(props.modelValue))

// 모든 항목이 선택되었는지 확인하는 computed 속성
const isAllSelected = computed(() => {
  return selections.value.size === props.personList.length
})

// 전체 선택/해제 토글
const toggleAllSelection = (isAllChecked: boolean) => {
  if (isAllChecked) {
    selections.value = new Set(props.personList.map(p => p.id))
  } else {
    selections.value.clear()
  }
}

// 개별 항목 선택/해제 핸들러
const handleCheckboxChange = (id: string | number, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    selections.value.add(id)
  } else {
    selections.value.delete(id)
  }
}

// 내부 상태(selections)가 변경될 때마다 부모에게 전달
watch(
  selections,
  newSelections => {
    emit('update:modelValue', newSelections)
  },
  { deep: true }
)
</script>
<style lang="scss" scoped>
.wrap-check {
  margin: 0 -2rem;
  padding: 0 2rem 2rem;
  display: flex;
  border-bottom: 0.1rem solid #eeeeee;
}
.wrap-insured-list {
  .item {
    padding: 2.2rem 0;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      .c-checktype-btn {
        display: flex;
        align-items: flex-start;
        gap: 1.2rem;
        flex: 1;
        &:has(.c-checktype-check:checked) {
          .icon {
            border-color: #4c7ff7;
            background-color: #4c7ff7;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          }
        }
        .c-checktype-check {
          display: none;
        }
        .icon {
          display: block;
          width: 2.4rem;
          height: 2.4rem;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1.5px solid #eee;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-size: 1.9rem;
          background-repeat: no-repeat;
          background-position: center;
          transition:
            background-color 0.2s ease-in,
            border-color 0.2s ease-in;
        }
        .wrap-user {
          text-align: left;
          .name {
            display: line-block;
            font-weight: 700;
          }
          .phone {
            margin-top: 0.2rem;
            font-size: 1.4rem;
            color: #555555;
          }
        }
      }
      .btn-edit {
        font-size: 1.4rem;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .wrap-label {
      display: flex;
      margin-top: 0.4rem;
      margin-left: 3.6rem;
      gap: 0.4rem;
    }
    .wrap-memo {
      margin-top: 1.2rem;
      margin-left: 3.6rem;
      padding: 1.2rem;
      border: 0.1rem solid #e2e2e2;
      background-color: #f9f8f7;
      border-radius: 0.8rem;
      .text {
        text-align: left;
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
        @include mixin.multi-ellipsis(2);
      }
    }
  }
}
</style>
