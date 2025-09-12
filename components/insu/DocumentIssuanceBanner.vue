<template>
  <div class="wrap-main">
    <div class="main-item sub1" @click="toggleConfirmModal">
      <div class="tit">서류발급 신청</div>
      <div class="tit-sub">병원 방문없이<br />간편하게!</div>
    </div>
    <div class="main-item sub2" @click="clickNext1">
      <div class="tit">의무기록<br />사본 발급</div>
    </div>
    <div class="main-item sub3" @click="clickNext2">
      <div class="tit">처방전<br />조회/발급</div>
    </div>
  </div>
  <div class="wrap-document" @click="clickNext3">
    <div class="wrap-document-header">
      <img src="/assets/images/insu/docIssuance/icon-folder.svg" alt="보관함" />
      <div class="wrap-text">
        <div class="tit">서류 보관함</div>
        <div class="desc">발급 받은 서류를 모아두었어요.</div>
      </div>
    </div>
    <i class="icon-arrow-right"></i>
  </div>
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    title="MY병원 연결이 필요해요."
    content="병원서류 발급 이용이 처음인 경우 다니시는 병원 연결이 필요해요."
    confirm-button-text="MY병원 연결"
    @confirm="toggleConfirmModal"
    @close="toggleConfirmModal"
  />
</template>
<script setup lang="ts">
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
const isShowConfirmModal = ref(false)
// 모달 확인 버튼 클릭 핸들러
const toggleConfirmModal = () => {
  isShowConfirmModal.value = !isShowConfirmModal.value
}
const clickNext1 = () => {
  return navigateTo('/insu/claim/documentIssuance/applyDocumentMedicalRecord')
}
const clickNext2 = () => {
  return navigateTo('/insu/claim/documentIssuance/prescription')
}
const clickNext3 = () => {
  return navigateTo('/insu/claim/documentIssuance/storage')
}
</script>

<style lang="scss" scoped>
.wrap-main {
  margin-top: 3.2rem;
  @include mixin.flex-container(items-center);
  flex-wrap: wrap;
  gap: 1.4rem;
  .main-item {
    padding: 1.6rem 2rem;
    border-radius: 1.2rem;
    position: relative;
    cursor: pointer;
    &.sub1 {
      width: 100%;
      height: 13.6rem;
      background: url('/assets/images/insu/docIssuance/icon-applydoc.png') no-repeat #4c7ff7;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    &.sub2,
    &.sub3 {
      flex: 1;
      height: 15.6rem;
    }
    &.sub2 {
      background: url('/assets/images/insu/docIssuance/icon-applycopy.png') no-repeat #31519e;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    &.sub3 {
      background: url('/assets/images/insu/docIssuance/icon-search-insurance.png') no-repeat #51658d;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    .tit {
      font-size: 2rem;
      font-weight: 700;
      line-height: 130%;
      color: #fff;
    }
    .tit-sub {
      margin-top: 0.8rem;
      font-weight: 500;
      color: #fff;
    }
  }
}
.wrap-document {
  margin-top: 2rem;
  padding: 1.2rem 0;
  @include mixin.flex-container(justify-between items-center);
  cursor: pointer;
  .wrap-document-header {
    @include mixin.flex-container(items-center);
    gap: 1.2rem;
    .wrap-text {
      .tit {
        font-weight: 700;
      }
      .desc {
        margin-top: 0.2rem;
        font-size: 1.4rem;
        color: #555;
      }
    }
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
</style>
