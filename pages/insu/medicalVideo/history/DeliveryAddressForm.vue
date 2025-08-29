<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection title="배송 받으실 주소와<br/>연락처를 입력해주세요." />
    </section>
    <FlexColDiv class="gap-12">
      <InputAddress label="주소" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <InputText label="휴대폰 번호" placeholder="휴대폰 번호를 입력해 주세요." />
      <InputText label="배송 전달사항(선택)" placeholder="배송 시 전달사항을 입력해주세요." />
    </FlexColDiv>
    <ButtonGroup class="is-fixed">
      <Button aria-label="다음" btn-type="primary" class="lg w-full" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
