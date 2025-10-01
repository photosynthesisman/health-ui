<template>
  <BaseBody
    :show-back-button="false"
    page-title="실손청구"
    :is-transparent="true"
    logo-type="text"
    :has-notification="true"
    :has-insu="true"
    :insu-status="insuStatus"
    class="pb-36"
  >
    <div class="wrap-claim-main">
      <div class="wrap-btn-alert">
        <button class="btn-alert">
          <img class="img-alert" src="/assets/images/insu/logo-alert-samsung.png" alt="삼성화재" />
          <div class="wrap-alert-text">
            <span class="text">청구서류 전송을 완료했어요</span>
            <div class="text-sub" @click="toDetail">삼성화재 청구 내역 확인<i class="icon-arrow-right"></i></div>
          </div>
        </button>
        <button class="btn-alert">
          <img class="img-alert" src="/assets/images/insu/logo-alert-db.png" alt="DB손해보험" />
          <div class="wrap-alert-text">
            <span class="text">추가서류가 필요한 청구가 있어요</span>
            <div class="text-sub" @click="toDetail">DB손해보험 청구 내역 확인<i class="icon-arrow-right"></i></div>
          </div>
        </button>
      </div>
      <div class="wrap-btn-claim">
        <button class="btn-claim no-doc">
          <div class="text">진료내역을 찾아서<br /><strong>서류 없이 청구</strong></div>
          <img class="img-claim" src="/assets/images/insu/img-claim-nodoc.png" alt="서류없이 청구하기" />
        </button>
        <button class="btn-claim picture">
          <div class="text">
            서류 준비해서<br /><strong>사진 찍어 청구</strong>
            <div class="sub-text">약제비 포함</div>
          </div>
          <img class="img-claim" src="/assets/images/insu/img-claim-picture.png" alt="사진 찍어 청구하기" />
        </button>
      </div>
      <FlexRowDiv v-if="beforeProxyClaim" class="btn-type-wrap smaller">
        <button class="btn-type family">
          <div class="wrap-type-text">
            <span class="text">가족/제3자<br />대리청구</span>
          </div>
        </button>
        <button class="btn-type">
          <div class="wrap-type-text">
            <span class="text"
              >설계사전용<br />
              대리청구</span
            >
          </div>
        </button>
      </FlexRowDiv>
      <FlexRowDiv v-else class="btn-type-wrap">
        <button class="btn-type">
          <div class="wrap-type-text">
            <span class="text">보험금 대리청구</span>
            <div class="label puple">설계사</div>
          </div>
        </button>
      </FlexRowDiv>
    </div>
    <FlexSection>
      <h2 class="tit2">놓치기 쉬운 보상금 돌려받으세요</h2>
      <FlexColDiv class="wrap-payback">
        <button class="item type-a blue">
          <div class="wrap-text">
            <span class="text">AI 분석 실손 보험금 예측</span>
            <span class="sub-text">미리 예상해 볼 진료내역<br />2건이 있어요</span>
          </div>
          <img class="img-payback" src="/assets/images/insu/img-payback1.png" alt="AI 분석 실손 보험금 예측" />
        </button>
        <button class="item type-a orange">
          <div class="wrap-text">
            <span class="text">AI 분석 휴면보험금 찾기</span>
            <span class="sub-text">분석 가능한 숨은 보상금<br />2건을 찾았어요</span>
          </div>
          <img class="img-payback" src="/assets/images/insu/img-payback2.png" alt="AI 분석 휴면보험금 찾기" />
        </button>
        <FlexRowDiv class="gap-8">
          <button class="item type-b b1">
            <div class="wrap-text">
              <span class="text">청구내역<br />조회</span>
            </div>
            <img class="img-payback" src="/assets/images/insu/img-payback3.png" alt="청구내역 조회" />
          </button>
          <button class="item type-b b2">
            <div class="wrap-text">
              <span class="text">병원 서류<br />발급</span>
            </div>
            <img class="img-payback" src="/assets/images/insu/img-payback4.png" alt="병원 서류 발급" />
          </button>
          <button class="item type-b b3">
            <div class="wrap-text">
              <span class="text">병원 서류<br />발급</span>
            </div>
            <img class="img-payback" src="/assets/images/insu/img-payback6.png" alt="병원 서류 발급" /></button
        ></FlexRowDiv>
        <div class="item type-c">
          <div class="wrap-auto">
            <div class="wrap-text">
              <span class="text">실손보험 자동청구</span>
              <span class="sub-text">놓치지 않게 자동으로<br />청구해드려요</span>
            </div>
            <img class="img-payback" src="/assets/images/insu/img-payback5.png" alt="실손보험 자동청구" />
          </div>
          <div class="wrap-btn">
            <button class="btn-claim">청구 보험사 2개</button>
            <button class="btn-claim">청구 병원 3개</button>
          </div>
        </div>
      </FlexColDiv>
      <h2 class="tit2">청구의신 더 알아보기</h2>
      <div class="wrap-more">
        <button class="item purple" @click="toManage">
          <img class="img-more" src="/assets/images/insu/img-more-myhospital.png" alt="MY병원/보험사관리" />
          <div class="text">MY병원/<br />보험사관리</div>
        </button>
        <button class="item pink" @click="toHospital">
          <img class="img-more" src="/assets/images/insu/img-more-hospital.png" alt="제휴병원 찾아보기" />
          <div class="text">제휴병원 찾아보기</div>
        </button>
        <button class="item yellow" @click="toGuide">
          <img class="img-more" src="/assets/images/insu/img-more-claim.png" alt="실손청구 알아보기" />
          <div class="text">실손청구 알아보기</div>
        </button>
      </div>
      <h2 class="tit2">실손청구에 대해 궁금하다면?</h2>
      <div class="wrap-qa">
        <button class="item">
          <div class="item-qa-text">
            <img class="img-qa" src="/assets/images/insu/icon-kakaotalk.svg" alt="카카오톡 아이콘" />
            <div class="text">카카오톡 상담</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button class="item">
          <div class="item-qa-text">
            <img class="img-qa" src="/assets/images/insu/icon-faq.svg" alt="자주 묻는 질문 아이콘" />
            <div class="text">자주 묻는 질문</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button class="item">
          <div class="item-qa-text">
            <img class="img-qa" src="/assets/images/insu/icon-qa.svg" alt="질문 아이콘" />
            <div class="text">1:1 문의</div>
          </div>
          <i class="icon-arrow-right"></i>
        </button>
        <button class="item">
          <div class="item-qa-text">
            <img class="img-qa" src="/assets/images/insu/icon-counsel.svg" alt="질문 아이콘" />
            <div class="text">전화상담<strong>1661-2966</strong></div>
          </div>
        </button>
      </div>
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
// const beforeProxyClaim = ref(true)
const beforeProxyClaim = ref(false)
// 청구의신 MY병원 상태 관리
type InsuStatus = 'unregistered' | 'needUpdate' | 'registered'
const insuStatus = ref<InsuStatus>('unregistered')
const toGuide = () => {
  return navigateTo('/insu/claim/guide/guideNoDocuments/')
}
const toManage = () => {
  return navigateTo('/insu/claim/auto/manageHospital')
}
const toDetail = () => {
  return navigateTo('/insu/claim/billingInfo/checkBillingDetail')
}
const toHospital = () => {
  return navigateTo('/insu/claim/guide/guidePartnerHospital')
}
</script>

<style scoped lang="scss">
.wrap-claim-main {
  padding-top: 89.6px;
  padding-bottom: 51.2px;
  margin: -89.6px -32px 0;
  background: #d7e1f7;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 404.8px;
    background: linear-gradient(180deg, rgba(49, 81, 158, 0.2) 0%, rgba(49, 81, 158, 0) 100%);
  }
  .wrap-btn-alert {
    padding: 0 32px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12.8px;
    & + .wrap-btn-claim {
      margin-top: 19.2px;
    }
    .btn-alert {
      padding: 25.6px 32px;
      display: flex;
      align-items: center;
      gap: 19.2px;
      border-radius: 19.2px;
      background: rgba(255, 255, 255, 0.3);
      border: 1.6px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rem 0.25rem 0.625rem 0rem rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(1.25rem);
      width: 100%;
      .img-alert {
        width: 64px;
        height: 64px;
      }
      .wrap-alert-text {
        .text {
          font-size: 25.6px;
          font-weight: 500;
          color: #2b2b2b;
        }
        .text-sub {
          margin-top: 6.4px;
          font-size: 22.4px;
          color: #2b2b2b;
          display: flex;
          align-items: center;
          gap: 3.2px;
          .icon-arrow-right {
            width: 25.6px;
            height: 25.6px;
            background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
            background-size: 100%;
          }
        }
      }
    }
  }
  .wrap-btn-claim {
    padding: 0 32px;
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
    .btn-claim {
      padding: 38.4px 38.4px 25.6px;
      border-radius: 25.6px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6.4px;
      @include mixin.rippleEffectWhite;
      &.no-doc {
        background-color: #4c7ff7;
      }
      &.picture {
        background-color: #31519e;
      }
      .text {
        font-size: 25.6px;
        font-weight: 500;
        color: #fff;
        text-align: left;
        strong {
          margin-top: 12.8px;
          font-size: 32px;
          font-weight: 700;
          font-weight: 130%;
        }
        .sub-text {
          text-align: left;
          margin-top: 3.2px;
          font-size: 20.8px;
          font-weight: 500;
          color: #fbc700;
        }
      }
      .img-claim {
        align-self: flex-end;
        width: 96px;
      }
    }
  }
  .btn-type-wrap {
    margin-top: 19.2px;
    padding: 0 32px;
    gap: 19.2px;
    &.smaller {
      .btn-type {
        padding: 35.2px 38.4px;
        background: #f6f9ff url('/assets/images/insu/img-claim-people.png') right bottom / 139.2px 92.8px no-repeat;
        .wrap-type-text {
          .text {
            font-size: 25.6px;
            line-height: 35.2px;
          }
        }
      }
    }
    .btn-type {
      position: relative;
      padding: 49.6px 38.4px;
      border-radius: 19.2px;
      box-shadow: 0.25rem 0.25rem 0.75rem 0rem #0000000a;
      width: 100%;
      background: #f6f9ff url('/assets/images/insu/img-claim-people.png') right bottom / 177.6px 118.4px no-repeat;
      @include mixin.rippleEffectPrimary;
      &.family {
        background: #f6f9ff url('/assets/images/insu/img-claim-family.png') right bottom / 139.2px 92.8px no-repeat;
      }
      .wrap-type-text {
        display: flex;
        align-items: center;
        gap: 12.8px;
        .text {
          font-size: 32px;
          font-weight: 700;
          line-height: 130%;
          color: #2b2b2b;
          text-align: left;
        }
        .label {
          font-size: 19.2px;
          line-height: 130%;
          font-weight: 500;
          color: #fff;
          background-color: #6449fc;
          padding: 4.8px 9.6px;
          border-radius: 6.4px;
        }
      }
    }
  }
}
h2.tit2 {
  font-size: 28.8px;
  font-weight: 700;
  line-height: 140%;
  color: #2b2b2b;
  margin-top: 51.2px;
}
.wrap-payback {
  margin-top: 19.2px;
  gap: 19.2px;
  .item {
    padding: 38.4px 32px;
    border: 1.6px solid #eeeeee;
    border-radius: 32px;
    box-shadow: 0rem 0rem 36.8px 0 #0000000f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &.type-a {
      padding: 38.4px;
      @include mixin.rippleEffectPrimary;
      &.blue {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='226' height='124' viewBox='0 0 226 124' fill='none'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_6424_62949)'%3E%3Cellipse cx='174.988' cy='10.1998' rx='113.156' ry='50.0123' transform='rotate(-25.7411 174.988 10.1998)' fill='%236A88AF'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_6424_62949' x='0.750366' y='-126.469' width='348.475' height='273.337' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='35' result='effect1_foregroundBlur_6424_62949'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")
          right top / contain no-repeat;
      }
      &.orange {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='226' height='124' viewBox='0 0 226 124' fill='none'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_6424_62951)'%3E%3Cellipse cx='174.988' cy='10.1998' rx='113.156' ry='50.0123' transform='rotate(-25.7411 174.988 10.1998)' fill='%23B08E3A'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_6424_62951' x='0.750366' y='-126.469' width='348.475' height='273.337' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='35' result='effect1_foregroundBlur_6424_62951'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")
          right top / contain no-repeat;
      }
      .wrap-text {
        .text {
          color: #31519e;
        }
      }
    }
    &.type-b {
      flex: 1;
      flex-direction: column;
      padding: 25.6px;
      border-radius: 19.2px;
      @include mixin.rippleEffectPrimary;
      .wrap-text {
        align-self: flex-start;
        .text {
          font-size: 25.6px;
          line-height: 35.2px;
          color: #555555;
        }
      }
      .img-payback {
        width: 51.2px;
        align-self: flex-end;
      }
    }
    &.type-c {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .wrap-text .text {
        color: #4c7ff7;
      }
      .wrap-auto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .img-payback {
          width: 128px;
          height: auto;
        }
      }
      .wrap-btn {
        margin-top: 19.2px;
        display: flex;
        gap: 19.2px;
        width: 100%;
        .btn-claim {
          background-color: #f4f4f4;
          border-radius: 12.8px;
          padding: 19.2px;
          color: #555555;
          font-size: 22.4px;
          font-weight: 600;
          text-align: center;
          width: 100%;
          position: relative;
          @include mixin.rippleEffectPrimary;
        }
      }
    }
    .wrap-text {
      display: flex;
      flex-direction: column;
      gap: 12.8px;
      text-align: left;
      .text {
        font-size: 28.8px;
        font-weight: 700;
      }
      .sub-text {
        font-size: 25.6px;
        font-weight: 500;
        color: #555555;
      }
    }
    .img-payback {
      width: 128px;
      height: auto;
    }
  }
}
.wrap-more {
  margin: 25.6px -32px 0;
  padding: 0 32px;
  display: flex;
  gap: 19.2px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 236.8px;
    height: 256px;
    flex: 1 0 auto;
    padding: 38.4px;
    border-radius: 19.2px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    &.purple {
      background-color: #e8eefa;
    }
    &.pink {
      background-color: #ffe2e6;
    }
    &.yellow {
      background-color: #fef4cc;
    }
    .img-more {
      width: 76.8px;
      height: auto;
    }
    .text {
      text-align: left;
      font-size: 25.6px;
      font-weight: 700;
      color: #2b2b2b;
    }
  }
}
.wrap-qa {
  margin-top: 19.2px;
  padding: 25.6px 32px;
  border-radius: 19.2px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 19.2px;
    padding: 19.2px 0;
    &:not(:first-child) {
      border-top: 1.6px solid #e2e2e2;
    }
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    .item-qa-text {
      display: flex;
      align-items: center;
      gap: 9.6px;
      .text {
        font-size: 22.4px;
        font-weight: 500;
        color: #2b2b2b;
        strong {
          margin-left: 9.6px;
          font-weight: 600;
          color: #555555;
        }
      }
      .img-qa {
        width: 51.2px;
        height: 51.2px;
      }
    }
    i.icon-arrow-right {
      width: 38.4px;
      height: 38.4px;
      background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>
