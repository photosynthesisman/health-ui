<template>
  <div class="wrap-claim-detail">
    <div class="wrap-header">
      <h2 class="tit">청구내역</h2>
      <button class="btn-claim">청구서 보기</button>
    </div>
    <ul class="detail-list">
      <li class="item">
        <div class="tit">청구일</div>
        <div class="desc">{{ summary.billingDate }}</div>
      </li>
      <li class="item">
        <div class="tit">피보험자(치료 받은 분)</div>
        <div class="desc">{{ summary.insurant }}</div>
      </li>
      <li class="item">
        <div class="tit">수익자(보험금 받는 분)</div>
        <div class="desc">{{ summary.beneficiary }}</div>
      </li>
      <li class="item">
        <div class="tit">사고유형</div>
        <div class="desc">{{ summary.accidentType }}</div>
      </li>
      <li class="item">
        <div class="tit">사고내용</div>
        <div class="desc">{{ summary.accidentDetail }}</div>
      </li>
      <li class="item">
        <div class="tit">보험금 수령계좌</div>
        <div class="desc">
          {{ summary.account.bank }}({{ summary.account.owner }})<br />{{ summary.account.number }}
        </div>
      </li>
      <li class="item">
        <div class="tit">보상안내 연락처</div>
        <div class="desc">{{ summary.contact.name }}({{ summary.contact.role }})<br />{{ summary.contact.phone }}</div>
      </li>
      <li class="item">
        <div class="tit">총 청구 진료비</div>
        <div class="desc">{{ summary.totalBill.toLocaleString() }}원</div>
      </li>
      <li class="item">
        <div class="tit">첨부서류</div>
        <button type="button" class="btn-detail">상세보기</button>
      </li>
    </ul>
    <div class="wrap-memo">
      <div class="text">
        {{ summary.memo }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  summary: any
}>()
</script>

<style lang="scss" scoped>
.wrap-claim-detail {
  margin: 0 -2rem;
  .wrap-header {
    @include mixin.flex-container(justify-between items-center);
    padding: 1.4rem 2rem;
    border-bottom: 0.1rem solid #eeeeee;
    h2.tit {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .btn-claim {
      border-radius: 0.6rem;
      background-color: #e8e8e8;
      padding: 0.8rem 1rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
  .detail-list {
    margin: 0 2rem;
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .tit {
        color: #555555;
      }
      .desc {
        font-weight: 500;
        text-align: right;
      }
      .btn-detail {
        border: 0.1rem solid #e2e2e2;
        padding: 0.6rem 1.2rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555555;
        border-radius: 1.4rem;
      }
    }
  }
}
.wrap-memo {
  margin: 0 2rem 5.6rem;
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
