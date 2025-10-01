<template>
  <div class="empty-reuslt">
    <div class="empty-image"></div>
    <div>
      <p>아직 진행중인 대화가 없어요.</p>
      <p class="sub">
        연락처에 등록된 MY친구와 메시지를 주고 받을 수 있습니다.<br />
        첫 메시지를 보내고 대화를 시작해보세요!
      </p>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="MY 친구목록" class="medium" :width="13" />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
</script>
<style scoped lang="scss">
.empty-reuslt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 1.6rem;
  text-align: center;
  .empty-image {
    width: 8rem;
    height: 8rem;
    background: url('~/assets/images/img-chat.png') center / contain no-repeat;
  }
  p {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  .sub {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
    color: #959595;
  }
}
</style>
