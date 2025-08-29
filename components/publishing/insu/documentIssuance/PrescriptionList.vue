<template>
  <div v-if="prescriptionList.length > 0" class="wrap-grey">
    <div class="wrap-prescription-list">
      <div v-for="(item, index) in prescriptionList" :key="index" class="item">
        <div class="medical-info-head">
          <div class="wrap-insurance-info">
            <img :src="item.logo" alt="로고" class="logo" />
            <div class="tit">{{ item.hospitalName }}</div>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="item-detail-list">
          <div class="detail-item">
            <div class="tit">진료일</div>
            <div class="desc">{{ item.treatmentDate }}</div>
          </div>
          <div class="detail-item">
            <div class="tit">청구일</div>
            <div class="desc">{{ item.claimDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 조회가능한 처방전 없을때 활성화 -->
  <div v-else class="wrap-empty">
    <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
    <div class="tit">조회 가능한<br />처방전이 없어요.</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logoKUMedicine from '~/assets/images/insu/logo_KUMedicine.svg'

interface PrescriptionItem {
  logo: string
  hospitalName: string
  treatmentDate: string
  claimDate: string
}

const prescriptionList = ref<PrescriptionItem[]>([
  {
    logo: logoKUMedicine,
    hospitalName: '강남성심병원 내분비대사내과',
    treatmentDate: '2025.03.25',
    claimDate: '2025.05.14'
  },
  {
    logo: logoKUMedicine,
    hospitalName: '강남성심병원 내분비대사내과',
    treatmentDate: '2025.03.25',
    claimDate: '2025.05.14'
  },
  {
    logo: logoKUMedicine,
    hospitalName: '강남성심병원 내분비대사내과',
    treatmentDate: '2025.03.25',
    claimDate: '2025.05.14'
  }
])
</script>

<style scoped lang="scss">
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
.wrap-empty {
  margin-top: 2rem;
  padding: 24rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
</style>
