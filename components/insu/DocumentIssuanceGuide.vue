<template>
  <div class="wrap-grey mt-20">
    <h3 class="tit-sub">병원 서류는 어떻게 발급 받나요?</h3>
    <div class="issuance-information-lists">
      <div class="item">
        <img src="/assets/images/insu/docIssuance/icon-num-01.svg" alt="1" />
        <div class="wrap-text">
          <div class="tit">병원/서류 검색</div>
          <div class="desc">필요한 서류 발급이 가능한 병원인지 확인해 보세요.</div>
        </div>
      </div>
      <div class="item">
        <img src="/assets/images/insu/docIssuance/icon-num-02.svg" alt="1" />
        <div class="wrap-text">
          <div class="tit">진단서 사본 발급 선택</div>
          <div class="desc">진료 내역을 찾아 병원 방문없이 신청하세요.</div>
        </div>
      </div>
      <div class="item">
        <img src="/assets/images/insu/docIssuance/icon-num-03.svg" alt="1" />
        <div class="wrap-text">
          <div class="tit">발급 수수료 결제</div>
          <div class="desc">보관함에서 원하는 방식으로 내보내기 하세요.</div>
        </div>
      </div>
    </div>
    <div class="wrap-document-info">
      <div class="item" @click="clickNext1">
        <div class="item-header">
          <img src="/assets/images/insu/docIssuance/icon-document.svg" alt="서류발급방법 확인" srcset="" />
          <div class="text">서류 발급 방법 확인하기</div>
        </div>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="item" @click="clickNext2">
        <div class="item-header">
          <img src="/assets/images/insu/docIssuance/icon-hospital.svg" alt="발급가능병원" srcset="" />
          <div class="text">발급 가능 병원 알아보기</div>
        </div>
        <i class="icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const clickNext1 = () => {
  return navigateTo('/insu/claim/documentIssuance/issuanceGuide')
}
const clickNext2 = () => {
  return navigateTo('/insu/claim/documentIssuance/ableDocIssuance')
}
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
.issuance-information-lists {
  margin-top: 2.4rem;
  .item {
    @include mixin.flex-container(items-center);
    gap: 1.4rem;
    position: relative;
    &:not(:first-child) {
      margin-top: 2.4rem;
      &::before {
        content: '';
        background: url('/assets/images/insu/docIssuance/icon-dot.svg') center center no-repeat;
        background-size: contain;
        position: absolute;
        top: calc(-50% + 0.5rem);
        left: 1.2rem;
        width: 0.3rem;
        height: 1.4rem;
      }
    }
    .wrap-text {
      .tit {
        font-weight: 500;
      }
      .desc {
        margin-top: 0.2rem;
        font-size: 1.4rem;
        font-weight: 500;
        color: #959595;
      }
    }
  }
}
.wrap-document-info {
  margin-top: 2.4rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #fff;
  .item {
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
      padding-top: 1.2rem;
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(items-center);
      gap: 1.2rem;
    }
    .icon-arrow-right {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url('/assets/images/insu/icon-arrow-right.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
