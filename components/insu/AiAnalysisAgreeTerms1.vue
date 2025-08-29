<template>
  <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
    <p class="agree-txt-box fz-14 flex flex-col gap-2">
      주식회사 레몬헬스케어는 개인정보보호법, 정보통신망법 및 신용 정보법에 따라 귀하의 민감정보(진료정보)를 제3자에게
      제공하고자 합니다. 귀하는 “민감정보(진료정보) 제3자 제공 동의(AI분석 신청)” 약관에 동의하지 않을 경우 권리가
      있습니다. 그러나 동의하지 않으실 경우 “서비스”를 이용할 수 없습니다.
    </p>
    <dl>
      <dt>민감정보(진료정보)를 제공받는 자</dt>
      <dd>(주)에이엘아이</dd>
    </dl>
    <dl>
      <dt>민감정보(진료정보) 제공 목적</dt>
      <dd>청구의신 AI 추천 숨은 보상금 찾기 서비스 이용</dd>
      <dd>가명, 익명화를 통한 통계정보 등의 기록보존을 위한 공익 목적</dd>
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
