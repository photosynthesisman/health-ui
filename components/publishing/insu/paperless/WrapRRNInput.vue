<template>
  <FlexSection>
    <InputRRN
      :required="true"
      :disabled="true"
      model-value="891024"
      placeholder2="뒷자리 입력"
      :back-value="residentIdBack"
      @update:back-value="residentIdBack = $event"
    />
    <span class="bottom-noti">주민등록번호 뒷자리를 입력해주세요.</span>
  </FlexSection>
</template>

<script setup lang="ts">
import FlexSection from '~/components/page/FlexSection.vue'
import InputRRN from '../../input/InputRRN.vue'
const residentIdBack = ref('')
</script>

<style lang="scss" scoped>
.bottom-noti {
  display: block;
  margin-top: 0.6rem;
  padding-inline: 0.6rem;
  font-size: 1.3rem;
  line-height: 1.4;
  color: #959595;
}
</style>
