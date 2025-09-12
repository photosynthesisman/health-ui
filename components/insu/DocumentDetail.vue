<template>
  <div>
    <div class="receipt-tit">진료비영수증</div>
    <div class="wrap-receipt-list">
      <div v-for="item in receiptItems" :key="item.id" class="item" :class="{ total: item.isTotal }">
        <div class="tit">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="wrap-incidental-lists">
      <div v-for="item in incidentalItems" :key="item.id" class="item">
        <div class="desc">{{ item.desc }}</div>
        <div class="price">{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface ReceiptItem {
  id: number
  title: string
  desc: string
  isTotal?: boolean
}

interface IncidentalItem {
  id: number
  desc: string
  price: string
}

const props = defineProps({
  receiptItems: {
    type: Array as PropType<ReceiptItem[]>,
    required: true
  },
  incidentalItems: {
    type: Array as PropType<IncidentalItem[]>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.receipt-tit {
  position: relative;
  padding: 2.1rem 0;
  font-weight: 700;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -2rem;
    right: -2rem;
    height: 0.1rem;
    background-color: #eee;
  }
}
.wrap-receipt-list {
  .item {
    padding: 1.6rem 0;
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    &.total {
      .tit,
      .desc {
        font-weight: 700;
        color: #2b2b2b;
      }
    }
    .tit {
      margin-left: 0.4rem;
      color: #555555;
    }
    .desc {
      margin-right: 0.4rem;
      font-weight: 500;
    }
  }
}
.wrap-incidental-lists {
  border-radius: 1.2rem;
  background-color: #f4f4f4;
  padding: 1.6rem 2rem;
  .item {
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .desc {
      margin-left: 0.4rem;
      font-size: 1.4rem;
      color: #555555;
    }
    .price {
      margin-right: 0.4rem;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
</style>
