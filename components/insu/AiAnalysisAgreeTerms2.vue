<template>
  <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
    <dl>
      <dt>제공받는 자</dt>
      <dd>청구의신과 제휴된 법인 보험 대리점</dd>
    </dl>
    <dl>
      <dt>제공 목적</dt>
      <dd>AI 분석 숨은 보상금 수령 전화/대면 상담을 위한 정보 제공</dd>
    </dl>
    <dl>
      <dt>제공 항목</dt>
      <dd>
        이름, 연락처, 생년월일, 주거지역, 개인정보이용기간, 정보제공동의일, 보험계약정보, 보장정보, 실손보험청구
        통계정보
      </dd>
    </dl>
    <dl>
      <dt>보관기간</dt>
      <dd>정보제공 동의일로부터 2년까지</dd>
    </dl>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrap-agree-detail {
  text-align: left;
  dl {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    dt {
      position: relative;
      font-weight: 600;
      padding-left: 0.8rem;
      &::before {
        content: '';
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #959595;
        position: absolute;
        top: 50%;
        left: 0rem;
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }
    dd {
      position: relative;
      margin-left: 0.8rem;
      padding-left: 0.8rem;
      &::before {
        content: '-';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0rem;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
