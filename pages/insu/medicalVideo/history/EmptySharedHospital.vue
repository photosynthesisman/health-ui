<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection
        title="제휴병원 연결 후<br/>의료영상을 공유할 수 있어요."
        :description="'병원을 연결하여 의료영상을 공유해보세요.'"
      />
    </section>
    <div class="flex-1">
      <img class="img-shared-hospital" src="/assets/images/insu/img-shared-hospital.png" alt="" />
    </div>
    <ButtonGroup class="is-fixed">
      <Button aria-label="제휴병원 연결" btn-type="primary" class="lg w-full" />
    </ButtonGroup>
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
.img-shared-hospital {
  width: 23rem;
  height: 23rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
