<template>
  <BaseBody
    :show-back-button="false"
    page-title="통원 진료 자동청구 가능 병원"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h2 class="section-tit mt-32">MY 병원</h2>
    <AutoClaimAvailableItem v-model:items="insuranceList" />
    <h2 class="section-tit mt-32">전체 병원</h2>
    <AutoClaimAvailableItem v-model:items="insuranceAllList" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import AutoClaimAvailableItem from '~/components/publishing/insu/auto/AutoClaimAvailableItem.vue'

// 내 병원 목록 데이터
const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])

// 전체 병원 목록 데이터
const insuranceAllList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])
</script>

<style scoped lang="scss">
.section-tit {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b2b2b;
}
</style>
