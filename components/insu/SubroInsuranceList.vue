<template>
  <div class="wrap-total-count">총 <strong>4</strong>건을 찾았어요.</div>
  <div class="wrap-insurance-list">
    <button v-for="(item, index) in insuranceList" :key="item.id" class="item" @click="clickAgency(item, index)">
      <div class="wrap-info">
        <div class="name-insurance">{{ item.label }}</div>
        <div class="address-insurance">{{ item.address }}</div>
      </div>
      <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표 아이콘" class="icon-arrow" />
    </button>
  </div>
</template>
<script setup lang="ts">
interface InsuranceList {
  id: number
  label: string
  address: string
  type: string
}
defineProps<{
  insuranceList: InsuranceList[]
}>()
const emit = defineEmits<{
  clickAgency: [item: InsuranceList, index: number, type: string]
}>()
const clickAgency = (item: InsuranceList, index: number) => {
  emit('clickAgency', item, index, item.type)
}
</script>

<style lang="scss" scoped>
.wrap-total-count {
  padding: 2.1rem 0;
  font-weight: 500;
  strong {
    font-weight: 700;
  }
}
.wrap-insurance-list {
  border-top: 0.1rem solid #eeeeee;
  margin: 0 -2rem;
  padding: 0 2rem;
  .item {
    padding: 2rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .wrap-info {
      margin-left: 0.4rem;
      .name-insurance {
        text-align: left;
        font-weight: 700;
      }
      .address-insurance {
        margin-top: 0.1rem;
        font-size: 1.4rem;
        color: #555555;
      }
    }
    .icon-arrow {
      margin-right: 0.4rem;
    }
  }
}
</style>
