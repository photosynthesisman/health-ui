<template>
  <div class="medical-info">
    <div class="medical-info-head">
      <img src="/assets/images/insu/logo_kbbank.svg" alt="로고" class="logo" />
      <div class="wrap-insurance-info">
        <div class="wrap-text">
          <div class="tit">{{ insurance.title }}</div>
          <div class="insurance-desc">{{ insurance.description }}</div>
        </div>
      </div>
      <!-- <div class="status">{{ insurance.status }}</div>
        -->
      <CommonBadge
        class="badge-round"
        :class="{
          'badge-blue': insurance.status === '정상',
          'badge-green': insurance.status === '실효',
          'badge-purple': insurance.status === '만기',
          'badge-red': insurance.status === '소멸'
        }"
        >{{ insurance.status }}</CommonBadge
      >
    </div>
    <div v-if="insurance.carInfo" class="car-info">
      <img src="/assets/images/insu/ai/icon-car.svg" alt="아이콘:자동차" />
      <div class="car-desc">{{ insurance.carInfo }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface insuranceData {
  title: string
  description: string
  status: string
  carInfo?: string
}
const props = defineProps<{
  insurance: insuranceData
}>()
</script>

<style lang="scss" scoped>
.medical-info {
  margin-top: 1.6rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 2rem;
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
    .wrap-insurance-info {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .wrap-text {
        .tit {
          flex: 1;
          min-width: 0;
          font-weight: 700;
          @include mixin.ellipsis;
        }
        .insurance-desc {
          margin-top: 0.1rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
    }
    .status {
      background-color: #e0e9ff;
      border-radius: 1.1rem;
      padding: 0.3rem 0.8rem;
      flex: 0 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: #002988;
    }
  }
  .car-info {
    border-top: 0.1rem solid #eeeeee;
    margin-top: 1.6rem;
    padding-top: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    .car-desc {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
</style>
