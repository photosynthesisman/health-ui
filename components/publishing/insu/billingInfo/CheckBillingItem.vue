<template>
  <div class="wrap-claim-list">
    <div v-for="item in items" :key="item.id" class="item">
      <div class="wrap-status">
        <div class="wrap-label">
          <label for="status" :class="['label', item.treatmentType]">
            {{ item.treatmentType === 'out' ? '통원' : '입원' }}
          </label>
          <label for="status" :class="['label', item.claimStatus]">
            {{ item.claimStatus === 'done' ? '청구완료' : item.claimStatus === 'able' ? '재청구 가능' : '청구실패' }}
          </label>
          <label v-if="item.autoBilling" for="status" class="label">자동청구</label>
        </div>
        <div class="date">{{ item.date }}</div>
      </div>
      <div class="wrap-insurance-company">
        <div class="wrap-insurance-info">
          <img :src="item.insuranceLogo" :alt="item.insuranceName + ' 로고'" />
          <span class="text">{{ item.insuranceName }}</span>
        </div>
        <i class="icon-arrow-right"></i>
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
      <div class="wrap-detail">
        <div v-for="(detail, idx) in item.details" :key="idx" class="detail-item">
          <div class="tit">{{ detail.department }}</div>
          <div class="desc">{{ detail.visitDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    id: string | number
    treatmentType: string
    claimStatus: string
    autoBilling: boolean
    date: string
    insuranceLogo: string
    insuranceName: string
    designer: string
    insurant: string
    beneficiary: string
    billingReason: string
    details: { department: string; visitDate: string }[]
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
      .wrap-label {
        @include mixin.flex-container(items-center);
        gap: 0.4rem;
        .label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
          color: #555555;
          background-color: #eeeeee;
          // 동의대기
          &.ready {
            background-color: #bd9600;
            color: #fff;
          }
          // 청구완료
          &.done {
            background-color: #629105;
            color: #fff;
          }
          // 통원
          &.out {
            background-color: #fef4cc;
            color: #8d7000;
          }
          // 입원
          &.in {
            background-color: #eaf2cc;
            color: #506a1d;
          }
          // 실패
          &.fail {
            background-color: #c82626;
            color: #fff;
          }
          // 가능
          &.able {
            background-color: #c36f00;
            color: #fff;
          }
        }
      }
      .date {
        font-size: 1.4rem;
        color: #555555;
      }
    }
    .wrap-insurance-company {
      margin-top: 1.6rem;
      @include mixin.flex-container(justify-between items-center);
      .wrap-insurance-info {
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
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
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
    .wrap-detail {
      margin-top: 1.2rem;
      padding: 1.6rem 2rem;
      border-radius: 1.2rem;
      background-color: #f4f4f4;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          color: #959595;
        }
        .tit,
        .desc {
          font-size: 1.3rem;
          font-weight: 500;
        }
      }
    }
  }
}
.wrap-memo {
  margin: 0 2rem;
  padding: 1.2rem;
  background-color: #f9f8f7;
  border-radius: 0.8rem;
  border: 0.1rem solid #e2e2e2;
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    @include mixin.multi-ellipsis(2); // 최대 두 줄로 표시
  }
}
</style>
