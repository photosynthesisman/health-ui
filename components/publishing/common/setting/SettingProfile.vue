<template>
  <section class="no_gap pt-0 pb-0 ml-n20 mr-n20">
    <div class="flex space-between profile-box">
      <div class="flex">
        <div class="profile-photo flex flex-center">
          <img src="~/assets/images/img-profile.svg" alt="프로필 사진" />
        </div>
        <div class="profile-info flex flex-col left">
          <strong class="nickname">닉네임88닉네임88</strong>
          <span class="name">김건강</span>
        </div>
      </div>
      <div class="myInfo_modify"><NuxtLink to="#">내 정보 수정하기</NuxtLink></div>
    </div>
    <div class="setting-box">
      <div class="flex space-between align-center">
        <strong>Direct Message 설정</strong>
        <Checkbox id="checkBox1" custom-style="switch" aria-label="" checked />
      </div>
    </div>
    <div class="setting-box radio-box">
      <div class="flex space-between align-center">
        <span>회원전체건강의신 회원전체에게 메시지를 받을 수 있습니다.</span>
        <Radio id="Radio1" custom-style="" aria-label="" />
      </div>
      <div class="flex space-between align-center">
        <span>친구회원 중 내 연락처 지인에게만 메시지를 받습니다.</span>
        <Radio id="Radio2" custom-style="" aria-label="" />
      </div>
    </div>
    <hr class="hr-section" />
  </section>
</template>

<script setup lang="ts">
import Radio from '~/components/publishing/input/radio.vue'
import Checkbox from '~/components/publishing/input/check.vue'
</script>
<style scoped lang="scss">
.profile-box {
  padding: 0.8rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;
  gap: 0 1.2rem;
  .profile-info {
    span {
      &:before {
        display: none;
      }
    }
  }
}
.setting-box {
  padding: 1.8rem 2rem;
  &.radio-box {
    display: flex;
    flex-direction: column;
    gap: 1rem 0;
    border-top: 1px solid #eee;
    .flex {
      gap: 0 1rem;
      & + .flex {
        padding: 1rem 0;
        border-top: 1px solid #eee;
      }
    }
  }
}
.profile-photo {
  width: 8.3rem;
  height: 8.3rem;
  margin-right: 1rem;
  flex: 0 0 auto;
  @media (max-width: 390px) {
    width: 6.5rem;
    height: 6.5rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
}
.profile-info {
  align-items: start;
  justify-content: center;
  strong,
  span {
    display: inline-block;
    word-break: break-all;
  }

  .nickname {
    font-size: var(--num-18);
    font-weight: vars.$bold;
  }
  .name {
    font-size: var(--num-14);
    font-weight: vars.$medium;
    color: #959595;
  }
}
.myInfo_modify {
  align-items: center;
  justify-content: end;
  flex: 0 0 auto;
  display: flex;
  a {
    margin-bottom: 1.8rem;
    display: inline-block;
    padding-right: 2.2rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7.49984 5.83398L11.6665 10.0007L7.49984 14.1673' stroke='%23959595' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat center right / 2rem;
  }
}
.alarm-box {
  .alarm-status {
    position: relative;
    padding-left: 3rem;
    line-height: 2.4rem;
    @media (max-width: 375px) {
      font-size: 1.4rem;
    }
    .icon {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 2.4rem;
      height: 2.4rem;
      &.ico-bell-on {
        transform-origin: 50% 0%;
        animation-name: shake;
        animation-duration: 1s;
      }
      @keyframes shake {
        0% {
          transform: rotate(0deg);
        }
        10% {
          transform: rotate(10deg);
        }
        20% {
          transform: rotate(-10deg);
        }
        30% {
          transform: rotate(5deg);
        }
        40% {
          transform: rotate(-5deg);
        }
        50% {
          transform: rotate(2deg);
        }
        60% {
          transform: rotate(-2deg);
        }
        70% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }
  }
}

.alarm-set {
  padding: 0 2rem 2rem;
}
</style>
