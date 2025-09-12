<template>
  <div class="wrap-claim-point">
    <div class="wrap-tit">
      <div class="tit-sub">
        청구서류 자동생성(통원 <strong>{{ count.toLocaleString() }}</strong
        >건)
      </div>
    </div>
    <ClaimDetailsList :list-title="listTitle" :items="items" />
  </div>
</template>

<script setup lang="ts">
import ClaimDetailsList from './ClaimDetailsList.vue'

const props = defineProps<{
  listTitle: string
  count: number
  items: {
    label: string
    value: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.wrap-claim-point {
  position: relative;
  .wrap-tit {
    width: 60%;
    height: 6.4rem;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    .tit-sub {
      flex: 1;
      text-align: right;
      font-size: 1.6rem;
      line-height: 1.4;
      font-weight: 500;
      strong {
        color: #4c7ff7;
      }
    }
  }
}
.wrap-claim-detail:deep {
  margin-bottom: 0 !important;
}
</style>
