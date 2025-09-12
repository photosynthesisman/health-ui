<template>
  <BaseBody
    :has-share="true"
    page-title="처방전 보기"
    :show-back-button="true"
    style="background-color: #1f1f1f"
    :has-close-btn="true"
    :is-transparent="true"
    :has-add-text="false"
    :add-text-click-enabled="true"
  >
    <ViewPrescriptionDoc />
    <!-- <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="발급하기" class="lg w-full medium btn-sticky" @click="clickNext" />
    </ButtonGroup> -->
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ViewPrescriptionDoc from '~/components/publishing/insu/billingInfo/ViewPrescriptionDoc.vue'
import Button from '~/components/publishing/button/Button.vue'
// import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
</script>

<style scoped lang="scss"></style>
