<template>
  <BaseBody
    :show-back-button="false"
    page-title="서류 발급 가능 병원"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    :has-add-text-left="true"
    class="pb-36"
  >
    <InputText inp-type="search" placeholder="병원 이름을 입력해주세요." />

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
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'

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
  { name: 'DB손해', checked: false },
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

const clickInsurance = (index: number) => {
  insuranceList.value[index].checked = !insuranceList.value[index].checked
}
</script>
<style scoped lang="scss">
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
.wrap-empty {
  margin-top: 2rem;
  padding: 24rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 8rem;
    height: 8rem;
  }
  .tit {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
    color: #555555;
  }
  .sut-tit {
    margin-top: 0.8rem;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 140%;
    color: #555;
    text-align: center;
  }
}
</style>
