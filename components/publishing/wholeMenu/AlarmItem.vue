<template>
  <div v-if="isAlarmVisible" class="alarm-box">
    <div class="gap-6 flex flex-row align-center">
      <CommonBadge color="blue">걷기왕</CommonBadge>
      <span class="fz-14">프리썸머 챌린지</span>
      <div class="flex ml-auto align-center gap-8">
        <span class="fz-14 ml-auto fc-body-03">10초전</span>
        <button type="button" class="icon c-modal-close-btn" aria-label="닫기" @click="closeAlarm">
          <i class="icon close"></i>
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <strong class="fc-body-02 fz-16 bold"
        >걷기왕 대회 중 프라이빗대회에 초대받았습니다.걷기왕 대회대회대회 중 프라이빗대회에 초대받았습니다.</strong
      >
      <span class="fc-body-02 fz-16 regular"
        >프라이빗리그로 이동해서 초대를 수락해주세요프라이빗리그로 이동해서 초대를 수락해주세요프라이빗리그로 이동해서
        초대를 수락해주세요.</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
const isAlarmVisible = ref(true)

const closeAlarm = () => {
  isAlarmVisible.value = false
}
</script>

<style lang="scss" scoped>
.alarm-box {
  display: flex;
  flex-direction: column;
  padding: 2rem 0.4rem;
  word-break: break-all;
  gap: 0.6rem;

  & + .alarm-box {
    border-top: 0.1rem solid #eee;
  }
}
</style>
