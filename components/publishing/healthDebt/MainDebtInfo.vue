<template>
  <section class="main-debt-info">
    <MainDebtCompare />
    <MainDebtPrice />
    <div class="age-group-status">
      <AgeGroupRank />
      <AgeGroupGraph />
    </div>
  </section>
</template>
<script setup lang="ts">
import MainDebtCompare from '~/components/publishing/healthDebt/MainDebtCompare.vue'
import MainDebtPrice from '~/components/publishing/healthDebt/MainDebtPrice.vue'

import AgeGroupRank from '~/components/publishing/healthDebt/AgeGroupRank.vue'
import AgeGroupGraph from '~/components/publishing/healthDebt/AgeGroupGraph.vue'
</script>
<style lang="scss" scoped>
.main-debt-info {
  background: #f9f9f9;
  margin: 0 -2rem;
  padding: 3.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem 0;
}
.age-group-status {
  display: flex;
  gap: 1.6rem;
  > div {
    flex: 0 0 calc(50% - 0.8rem);
    justify-content: space-between;
  }
}
</style>
