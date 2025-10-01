<template>
  <BaseBody page-title="리워드 확인" :show-back-button="false" ::has-close-btn="true" class="pb-56">
    <RewardResultDetail
      :have-reward="true"
      :reward-item="'챌린지참가권'"
      :reward-type="'ticket'"
      :reward-comment="'리워드가 지급되었습니다'"
      :gift-comment="'챌린지 참가권을 이용해서 걷기 대회에 참가할 수 있어요.'"
      :reward-image="RewardImage3"
      :reward-list="rewardReasons"
      class="mt-20"
    />
    <RewardGuide :reward-type="'ticket'" />
    <ButtonGroup class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="나중에 확인하기" class="lg btn-sticky medium" />
      <Button btn-type="primary" element-type="button" aria-label="보관함 확인하기" class="lg btn-sticky medium" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import RewardImage3 from '~/assets/images/walkingking/img-banner-2.png'
import RewardResultDetail from '~/components/publishing/common/lottery/RewardResultDetail.vue'
import RewardGuide from '~/components/publishing/common/lottery/RewardGuide.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'

const rewardReasons = ref([
  '최초 회원가입으로 1개 지급',
  '마케팅 정보 제공 동의로 1개 지급',
  '제3자 정보 제공 동의로 1개 지급'
])
</script>
