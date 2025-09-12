<template>
  <div class="medical-info">
    <div class="medical-info-head">
      <img :src="hospitalLogo" :alt="hospitalName + ' 로고'" class="logo" />
      <div class="wrap-hospital">
        <div class="text">{{ hospitalName }}</div>
        <div :class="['label', status]">{{ statusLabel }}</div>
      </div>
      <div class="count">
        <strong>{{ totalCount }}</strong
        >건
      </div>
    </div>
    <div class="medical-info-desc">
      <div class="text">총 청구 진료비</div>
      <div class="price">{{ totalPrice.toLocaleString() }}원</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  hospitalLogo: string
  hospitalName: string
  status: string
  totalCount: number
  totalPrice: number
}>()

const statusLabel = computed(() => {
  switch (props.status) {
    case 'in':
      return '입원'
    default:
      return '통원'
  }
})
</script>

<style lang="scss" scoped>
.medical-info {
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        width: fit-content;
        min-width: 0;
        max-width: 100%;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
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
