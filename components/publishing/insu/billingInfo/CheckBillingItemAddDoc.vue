<template>
  <div class="wrap-claim-list">
    <div v-for="item in items" :key="item.id" class="item">
      <div class="wrap-status">
        <label for="status" class="label ready">피보험자 동의 대기</label>
        <div class="date">{{ item.date }}</div>
      </div>
      <div class="wrap-insurance-company">
        <img :src="item.insuranceLogo" :alt="item.insuranceName + ' 로고'" />
        <span class="text">{{ item.insuranceName }}</span>
      </div>
      <div class="claim-desc-list">
        <div class="claim-item">
          <div class="tit">설계사(비서)</div>
          <div class="desc">{{ item.designer }}</div>
        </div>
        <div class="claim-item">
          <div class="tit">피보험자(치료 받은 분)</div>
          <div class="desc">{{ item.insurant }}</div>
        </div>
        <div class="claim-item">
          <div class="tit">수익자(보험 수령인)</div>
          <div class="desc">{{ item.beneficiary }}</div>
        </div>
        <div class="claim-item">
          <div class="tit">청구사유</div>
          <div class="desc">{{ item.billingReason }}</div>
        </div>
      </div>
      <Button btn-type="primary" element-type="button" aria-label="추가 서류 접수하기" class="sm mt-24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  items: {
    id: string | number
    date: string
    insuranceLogo: string
    insuranceName: string
    designer: string
    insurant: string
    beneficiary: string
    billingReason: string
  }[]
}>()
</script>

<style lang="scss" scoped>
// 청구내역
.wrap-claim-list {
  margin: 0 -2rem;
  padding: 2rem 2rem 3.6rem;
  background-color: #f4f4f4;
  .item {
    padding: 2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .wrap-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #fff;
        &.ready {
          background-color: #bd9600;
        }
      }
      .date {
        font-size: 1.4rem;
        color: #555555;
      }
    }
    .wrap-insurance-company {
      margin-top: 1.6rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      img {
        width: 4.8rem;
        height: auto;
      }
      .text {
        font-weight: 700;
      }
    }
    .claim-desc-list {
      margin-top: 1.6rem;
      .claim-item {
        padding: 0 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
