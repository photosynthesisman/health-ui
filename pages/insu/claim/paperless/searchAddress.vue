<template>
  <BaseBody
    :show-back-button="true"
    page-title="주소 검색"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <FlexSection>
      <InputText inp-type="search" placeholder="예) 판교역로 166, 분당 주공, 백현동532" />
      <!-- ToDo: 검색창에 입력하면 .wrap-tip을 숨김 -->
      <SearchAddressTip />
      <SearchAddressResult />
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import SearchAddressTip from '~/components/publishing/insu/paperless/SearchAddressTip.vue'
import SearchAddressResult from '~/components/publishing/insu/paperless/SearchAddressResult.vue'
</script>

<style scoped lang="scss"></style>
