<template>
  <div class="main-challenge-banner">
    <div class="tit-wrap">
      <strong class="tit">걷기왕 챌린지</strong>
      <nuxt-link to="javascript:void(0)" class="arrow-link">전체일정</nuxt-link>
    </div>
    <div class="banner-wrap">
      <strong class="banner-tit">실시간 랭킹 경쟁 <br />걸음 UP! 혜택 UP!</strong>
      <span class="banner-txt">미션 & 아이템 사용으로 걸음수 UP! <br />걷는 동안 행운 복권 팡팡!</span>
      <!-- 
      <i class="banner-img">
        <img src="~/assets/images/walkingking/main/img-banner.png" alt="" />
      </i>
       -->
      <nuxt-link to="javascript:void(0)" class="required-notices" @click="clickConfirmModal"
        >필수 안내사항 보기</nuxt-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

const clickConfirmModal = async () => {
  const modalContent = `
    <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
    <div class="fz-18 bold mt-6" style="text-align: center;">
      걷기왕 대회 참여하기 전에<br/>반드시 알아두세요!
    </div>
    <div class="mt-20 fz-14 text-left" style="color: #555; max-width: 28rem">
      <ul class="flex flex-col gap-8">
        <li class="flex">
          <span class="dot mt-7 mr-6" style="flex-shrink: 0; background-color: #959595; width: .3rem; height: .3rem;"></span>
          <p>걷기왕 대회 참여를 원활하게 하려면 건강의신 앱의 권한 허용이 필요합니다. (자세한 방법은 Q&A를 참고해 주세요.)</p>        
        </li>
        <li class="flex">
          <span class="dot mt-7 mr-6" style="flex-shrink: 0; background-color: #959595; width: .3rem; height: .3rem;"></span>
          <p>걷기왕 대회는 부정 참가를 방지하고자 디바이스의 GPS를 통해 위치를 참고하고 있습니다. 건강의신 앱의 GPS 접근 권한을 꼭 확인해 주세요.</p>
        </li>      
        <li class="flex">
          <span class="dot mt-7 mr-6" style="flex-shrink: 0; background-color: #959595; width: .3rem; height: .3rem;"></span>
          <p>걷기왕 대회의 걸음수 집계 및 랭킹 갱신은 5분 단위로 진행됩니다. 따라서 실시간 걸음수가 즉각 반영되지 않을 수 있습니다.</p>
        </li>
        <li class="flex">
          <span class="dot mt-7 mr-6" style="flex-shrink: 0; background-color: #959595; width: .3rem; height: .3rem;"></span>
          <p>참가한 챌린지가 진행되는 도중에 회원 탈퇴 시 랭킹에서 제외되며 상금 시상 및 경품 지급이 불가합니다.</p>
        </li>
      </ul>
    </div>
    `

  const confirmRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    isShowCloseButton: false,
    isShowCancelButton: false,
    confirmButtonText: '확인'
  })
}
</script>

<style scoped lang="scss">
.main-challenge-banner {
  position: relative;
  margin: 0 -2rem;
  padding: 0 2rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20.1rem;
    height: 22rem;
    background: url(~/assets/images/walkingking/main/img-banner.png) right bottom -3rem / 27.1rem 30.2rem no-repeat;
  }
  .tit-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.2rem;
    position: relative;
    z-index: 2;
    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }
    .arrow-link {
      color: #2b2b2b;
      font-size: 1.4rem;
      font-weight: 400;
      display: inline-flex;
      align-items: center;
      &::after {
        content: '';
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M5.99967 4.6665L9.33301 7.99984L5.99967 11.3332' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
  .banner-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;
    height: 18rem;
    position: relative;
    .banner-img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 30rem;
      height: 30rem;
      overflow: hidden;
      img {
        position: relative;
        top: 1rem;
        right: -1rem;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .banner-tit {
      font-size: 2.2rem;
      color: vars.$blue-primary;
      font-weight: 700;
    }
    .banner-txt {
      font-size: 1.6rem;
      color: #555;
      font-weight: 500;
    }
  }
}
.required-notices {
  margin-top: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  text-decoration: underline;
  color: #959595;
}
</style>
