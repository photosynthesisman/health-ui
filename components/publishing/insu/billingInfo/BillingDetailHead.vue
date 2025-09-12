<template>
  <div class="medical-info">
    <div class="medical-info-head">
      <img :src="logo" :alt="name + ' 로고'" class="logo" />
      <div class="wrap-hospital">
        <div class="text">{{ name }}</div>
      </div>
    </div>
    <label for="status" :class="['label', status]">{{ statusLabel }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  logo: string
  name: string
  status: string
}>()

const statusLabel = computed(() => {
  switch (props.status) {
    case 'done':
      return '청구완료'
    default:
      return '청구완료'
  }
})
</script>

<style lang="scss" scoped>
.medical-info {
  margin-top: 2.4rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex: 1; // 추가: 남은 공간을 모두 차지하도록 설정
    min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1; // 변경: 1 0 auto에서 1로 변경
      min-width: 0; // 추가: flex 아이템이 부모를 넘지 않도록 설정
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4c7ff7;
      }
    }
  }
  .label {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 130%;
    flex: 0 0 auto; // 추가: 크기 고정
    margin-left: 1.2rem; // 추가: 왼쪽 여백 추가
    // 통원
    &.out {
      background-color: #fef4cc;
      color: #8d7000;
    }
    // 입원
    &.in {
      background-color: #ffe7e7;
      color: #ca2828;
    }
    // ToDo: medicalHistory.vue에서 '입원'일때 아래 color 사용. 확인 필요
    // &.in {
    //   background-color: #EAF2CC;
    //   color: #506A1D;
    // }
    // 청구완료
    &.done {
      background-color: #629105;
      color: #ffffff;
    }
  }
  .medical-info-desc {
    margin-top: 1.6rem;
    padding-top: 1.6rem;
    border-top: 0.1rem solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      color: #555555;
    }
    .price {
      font-weight: 500;
      color: #4c7ff7;
    }
  }
}
</style>
