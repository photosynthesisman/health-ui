<template>
  <div class="wrap-select-doc">
    <div class="wrap-check">
      <Checkbox id="checkAll" aria-label="전체선택" :model-value="isAllSelected" @update:model-value="toggleAll" />
    </div>
    <div class="wrap-list">
      <div v-for="doc in docs" :key="doc.id" class="item">
        <label :for="doc.id">
          <Checkbox
            :id="doc.id"
            :aria-label="doc.alt"
            :model-value="props.selectedDocs.includes(doc.id)"
            @update:model-value="val => toggleDoc(doc.id, val)"
          />
          <img :src="doc.img" :alt="doc.alt" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'

const props = defineProps<{
  docs: { id: string; img: string; alt: string }[]
  selectedDocs: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedDocs', value: string[]): void
}>()

const isAllSelected = computed(
  () => props.docs.length > 0 && props.docs.every(doc => props.selectedDocs.includes(doc.id))
)

const toggleAll = (val: boolean) => {
  if (val) {
    emit(
      'update:selectedDocs',
      props.docs.map(doc => doc.id)
    )
  } else {
    emit('update:selectedDocs', [])
  }
}

const toggleDoc = (id: string, checked: boolean) => {
  const newValue = checked ? [...props.selectedDocs, id] : props.selectedDocs.filter(v => v !== id)
  emit('update:selectedDocs', newValue)
}
</script>

<style lang="scss" scoped>
.wrap-select-doc {
  margin-top: 1.6rem;
  .wrap-check {
    margin: 0 -2rem;
    padding: 2rem;
  }
  .wrap-list {
    margin: 0 -2rem;
    padding: 2rem;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    gap: 1.1rem;
    flex-wrap: wrap;
    .item {
      position: relative;
      width: 11rem;
      height: 11rem;
      border-radius: 0.8rem;
      border: 0.1rem solid #e2e2e2;
      overflow: hidden;
      &:has(.c-checktype .c-check:checked) {
        border: 0.2rem solid #4c7ff7;
        position: relative;
        &::before {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--Semantic-Background-BG-Dimmed, #000000b2);
          box-shadow: 0px 4px 10px 0px #0000000a;
          pointer-events: none;
          z-index: 1;
        }
      }
      .c-checktype {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        z-index: 2;
        :deep(.c-label) {
          &::after {
            display: none;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
