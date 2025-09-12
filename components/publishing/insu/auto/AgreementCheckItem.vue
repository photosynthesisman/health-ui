<template>
  <div class="wrap-agree-check">
    <Checkbox
      id="checkBox1"
      :model-value="allChecked"
      @update:model-value="$emit('update:allChecked', $event)"
      custom-style="button agree-all"
      aria-label="약관전체 동의"
    />
    <AutoClaimAgreementItem :items="items" @show-detail="$emit('show-detail')" />
  </div>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'
import AutoClaimAgreementItem from '~/components/publishing/insu/auto/AutoClaimAgreementItem.vue'

defineProps<{
  items: { id: string; label: string; required: boolean; checked: boolean }[]
  allChecked: boolean
}>()

defineEmits<{
  (e: 'update:allChecked', value: boolean): void
  (e: 'show-detail'): void
}>()
</script>

<style lang="scss" scoped>
.wrap-agree-check {
  margin-top: 3.2rem;
  .agree-all {
    width: 100%;
  }
}
</style>
