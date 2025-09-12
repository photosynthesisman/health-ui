<template>
  <div v-if="totalHospitalCount > 0" class="wrap-result">
    <div class="wrap-hospital-list">
      <div v-for="hospital in hospitals" :key="hospital.name" class="item">
        <img :src="hospital.imgUrl" :alt="hospital.name + ' 로고'" class="logo" />
        <div class="wrap-info">
          <div class="tit">{{ hospital.name }}</div>
        </div>
        <button class="btn-close">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
        </button>
      </div>
    </div>
  </div>
  <!-- ToDo: 저장된 보험사 없을때 활성화 -->
  <div v-else class="wrap-empty">
    <img src="/assets/images/insu/icon-empty.svg" alt="병원 없음" class="img" />
    <div class="tit">MY보험으로 저장된 보험사가 없어요.</div>
    <div class="sut-tit">보험금 청구를 완료하시면<br />보험사가 표시되어요.</div>
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/images/insu/logo_KUMedicine.svg'

// 병원 데이터
const hospitals = ref([
  {
    imgUrl: logoImg,
    name: '삼성화재',
    count: 1
  },
  {
    imgUrl: logoImg,
    name: '삼성화재',
    count: 1
  },
  {
    imgUrl: logoImg,
    name: '삼성화재',
    count: 1
  },
  {
    imgUrl: logoImg,
    name: '삼성화재',
    count: 1
  }
])

const totalHospitalCount = computed(() =>
  hospitals.value.reduce((total: number, hospital: any) => total + hospital.count, 0)
)
</script>

<style lang="scss" scoped>
.wrap-result {
  .wrap-hospital-list {
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      min-width: 0;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-info {
        flex: 1 1 auto;
        min-width: 0;
        .tit {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 150%;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .btn-close {
        flex-shrink: 0;
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
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
</style>
