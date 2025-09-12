<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection title="사고(상해)가 일어난<br />주소를 입력해 주세요" class="mt-24 mb-32" />
    <FlexSection>
      <InputAddress label="주소" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <InputLabelText label="사고(내원) 내용" :required="true" />
      <InputText placeholder="(예) 감기몸살, 장염, 골절" value="골절" />
      <InputLabelText label="사고(진료) 일자" :required="true" />
      <InputCalendar />
      <InputLabelText label="사고 유형" :required="true" />
      <Select
        class="require"
        modal-title="사고 유형"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '질병', label: '질병' },
          { value: '일반상해', label: '일반상해' },
          { value: '교통사고', label: '교통사고' }
        ]"
      />
    </FlexSection>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky">
        다음
      </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
</script>

<style scoped lang="scss">
.input-tit {
  margin: 1.2rem 0 0.6rem;
}
</style>
