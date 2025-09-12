<template>
  <div class="wrap-grey">
    <div class="wrap-prescription-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="medical-info-head">
          <div class="wrap-insurance-info">
            <img :src="item.insuranceLogo" :alt="item.insuranceName + ' 로고'" class="logo" />
            <div class="tit">{{ item.insuranceName }}</div>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="item-detail-list">
          <div class="detail-item">
            <div class="tit">진료일</div>
            <div class="desc">{{ item.medicalDate }}</div>
          </div>
          <div class="detail-item">
            <div class="tit">청구일</div>
            <div class="desc">{{ item.claimDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    id: string | number
    insuranceLogo: string
    insuranceName: string
    medicalDate: string
    claimDate: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
  .tit-sub {
    font-size: 1.8rem;
    font-weight: 700;
  }
}
.wrap-prescription-list {
  .item {
    border-radius: 1.2rem;
    padding: 2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .medical-info-head {
      @include mixin.flex-container(justify-between items-center);
      .wrap-insurance-info {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        .logo {
          width: 4.8rem;
        }
        .tit {
          font-weight: 700;
        }
      }
      .icon-arrow-right {
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    .item-detail-list {
      margin-top: 2rem;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          margin-left: 0.4rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          margin-right: 0.4rem;
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
