<template>
  <BaseBody :show-back-button="true" page-title="병원서류 발급" logo-type="text" :has-cart="true" :cart-count="2">
    <TitleSection title="병원에 가지 않아도 쉽고 편하게<br />서류를 받을 수 있어요!" class="mt-24" />
    <DocumentIssuanceBanner />
    <DocumentIssuanceGuide />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import DocumentIssuanceBanner from '~/components/insu/DocumentIssuanceBanner.vue'
import DocumentIssuanceGuide from '~/components/insu/DocumentIssuanceGuide.vue'
</script>

<style scoped lang="scss"></style>
