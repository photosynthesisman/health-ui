<template>
  <div class="hospital-list-wrap">
    <p class="tit">공유 가능한 제휴 병원</p>
    <p class="sub">내 환자 번호가 있는 병원이라면 클라우드 서버를 통해 공유가 가능해요!</p>
    <div class="total">
      <p>
        총&nbsp;<strong>{{ count }}</strong
        >건
      </p>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="제휴병원 추가 연결"
        class="xxs"
        disabled
        icon="ico-plus-thin"
        :width="13.6"
        :border-radius="14"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
interface Props {
  count: number
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.hospital-list-wrap {
  padding: 2rem 0;
  .tit {
    font-weight: 700;
    line-height: 2.2rem;
  }
  .sub {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    line-height: 2rem;
    color: #555;
  }
  .total {
    margin-top: 1.8rem;
    @include mixin.flex-container(justify-between items-center);
    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
    }
  }
}
</style>
