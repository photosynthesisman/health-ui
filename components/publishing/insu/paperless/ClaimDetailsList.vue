<template>
  <div class="wrap-claim-detail">
    <h3 class="tit">{{ listTitle }}</h3>
    <ul class="detail-list">
      <li v-for="(item, idx) in items" :key="idx" class="item">
        <div class="tit" v-html="item.label"></div>
        <div class="desc" v-html="item.value"></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  listTitle: string
  items: {
    label: string
    value: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.wrap-claim-detail {
  margin: 0 -2rem 4.8rem;
  h3.tit {
    border-bottom: 0.1rem solid #eeeeee;
    padding: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.4;
  }
  .detail-list {
    margin: 0 2rem;
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .tit {
        color: #555555;
      }
      .desc {
        font-weight: 500;
        text-align: right;
        &:deep(.blue) {
          color: #4c7ff7;
        }
      }
    }
  }
}
</style>
