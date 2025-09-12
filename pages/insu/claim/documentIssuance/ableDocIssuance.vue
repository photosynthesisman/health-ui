<template>
  <BaseBody
    :show-back-button="false"
    page-title="서류 발급 가능 병원"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    :has-add-text-left="true"
    class="pb-36"
  >
    <InputText inp-type="search" placeholder="병원 이름을 입력해주세요." />
    <AutoClaimAvailableItem v-if="insuranceList.length" v-model:items="insuranceList" />
    <InsuEmpty
      v-else
      title="검색 결과가 없어요."
      sub-title="병원 이름을 잘못 입력했거나<br/>아직 제휴 전인 병원이에요."
      :img-src="emptyImage"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import AutoClaimAvailableItem from '~/components/publishing/insu/auto/AutoClaimAvailableItem.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import emptyImage from '~/assets/images/insu/icon-alert.svg'
// 보험사 목록 데이터
const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
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
<style scoped lang="scss"></style>
