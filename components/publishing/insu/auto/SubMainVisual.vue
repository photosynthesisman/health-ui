<template>
  <div class="visual_wrap">
    <div class="img-main"><img src="/assets/images/insu/auto/img-submain.svg" alt="이미지:자동청구" /></div>

    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">입원 진료비 자동청구는 아직 준비중이에요.</div>
    </div>
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="실손보험 자동청구 신청하기"
      class="sm"
      @click="clickSignup('consultant')"
    />
    <div class="wrap-claim-info">
      <div class="info-item">자동청구 가능 병원 안내</div>
      <div class="info-item" @click="clickNagative">가입 불가 보험사 안내</div>
    </div>
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowSortModal"
        title="자동청구 가입 불가 보험사 안내"
        :is-show-cancel-button="false"
        confirm-button-text="동의하고 다음"
        @close="isShowSortModal = false"
        @confirm="clickNext"
      >
        <template #content>
          <div class="wrap-insurance-list">
            <button
              v-for="(insurance, index) in insuranceList"
              :key="index"
              class="item"
              :class="{ checked: insurance.checked }"
              @click="clickInsurance(index)"
            >
              <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:보험사" class="logo-insurance" />
              <div class="name-insurance">{{ insurance.name }}</div>
            </button>
          </div>
          <div class="wrap-info-lists">
            <div class="item">빠른 시일내 서비스 이용 가능하도록 준비하겠습니다.</div>
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/publishing/button/Button.vue'

import { BottomModal } from '@lemonhc/fo-ui/components/modal'
// 보험사 목록 데이터
const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])
const isShowSortModal = ref(false)
const clickNagative = () => {
  isShowSortModal.value = !isShowSortModal.value
}

const clickInsurance = (index: number) => {
  insuranceList.value[index].checked = !insuranceList.value[index].checked
}

const clickNext = () => {
  // 다음 단계로 이동하는 로직
  console.log('다음 단계로 이동')
}

const clickSignup = (type: string) => {
  // 설계사, 설계사 대리인에 따라 동의화면 이후 분기처리
  navigateTo('/insu/claim/subrogation/serviceNotInUse/term')
}
</script>
<style scoped lang="scss">
.visual_wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.img-main {
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  img {
    width: 23rem;
  }
  @media (max-width: 390px) {
    img {
      width: 18rem;
    }
  }
}
.wrap-info-text {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
.c-btn {
  margin-top: 1.6rem;
  &.grey {
    background-color: #555555;
  }
  &:not(:first-of-type) {
    margin-top: 0.8rem;
  }
}
.wrap-claim-info {
  margin-top: 1.6rem;
  @include mixin.flex-container(justify-center items-center);

  .info-item {
    padding: 0 1.6rem;
    font-size: 1.4rem;
    color: #555555;
    position: relative;
    &:not(:first-child) {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 0.1rem;
        height: 1.4rem;
        background-color: #e2e2e2;
        transform: translateY(-50%);
      }
    }
  }
}

.wrap-insurance-list {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #f9f9f9;
    border: 0.1rem solid #f9f9f9;
    &:active,
    &.checked {
      border: 0.1rem solid #555555;
    }
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2b2b2b;
    }
  }
}
.wrap-info-lists {
  margin-top: 0.8rem;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
