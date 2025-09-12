<template>
  <FlexSection>
    <div class="wrap-check-head">
      <div class="tit">보험금 지급계좌</div>
      <Button
        btn-type="line"
        element-type="button"
        aria-label="지급계좌 추가"
        class="xs"
        icon="ico-plus"
        :width="12.5"
      />
    </div>

    <div class="wrap-check-icon">
      <CheckBeneficiaryInfoItem
        v-for="(account, idx) in myAccount"
        :id="account.id"
        :key="account.id"
        v-model="myAccount[idx].selected"
        checkbox-name="myAccount"
        :logo="account.logo"
        :name="account.name"
        :account-owner="account.accountOwner"
        :account-number="account.accountNumber"
      />
      <div class="tit2">최근 보험금 지급계좌</div>
      <CheckBeneficiaryInfoItem
        v-for="(account, idx) in lastAccount"
        :id="account.id"
        :key="account.id"
        v-model="lastAccount[idx].selected"
        checkbox-name="lastAccount"
        :logo="account.logo"
        :name="account.name"
        :account-owner="account.accountOwner"
        :account-number="account.accountNumber"
      />
      <div class="tit2">새로운 보험금 지급계좌</div>
      <CheckBeneficiaryInfoItem
        v-for="(account, idx) in newAccount"
        :id="account.id"
        :key="account.id"
        v-model="newAccount[idx].selected"
        checkbox-name="newAccount"
        :logo="account.logo"
        :name="account.name"
        :account-owner="account.accountOwner"
        :account-number="account.accountNumber"
      />
    </div>
    <div class="wrap-regi-accout">
      <div class="regi-account-head">
        <div class="tit">새로운 지급계좌</div>
        <i class="ico-cancel" @click="clickRegisterHospitals">
          <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
        </i>
      </div>
      <InputSearch
        class="bank-account"
        select-placeholder="은행선택"
        placeholder="계좌번호 입력"
        modal-title="은행선택"
        :custom-search-options="bankOptions"
        :hide-search-icon="true"
      />
      <div class="wrap-depositor">
        <Button btn-type="primary" element-type="button" aria-label="예금주 확인" class="medium" />
        <div class="text">23시~01시 사이에는 은행 서버 점검시간으로 예금주 확인 시 오류가 발생할 수 있습니다.</div>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import InputSearch from '~/components/publishing/input/InputSearch.vue'
import CheckBeneficiaryInfoItem from '~/components/publishing/insu/paperless/CheckBeneficiaryInfoItem.vue'

const myAccount = [
  {
    id: 1,
    logo: '/_nuxt/assets/images/insu/logo-alert-db.png',
    name: 'DB손해보험 자동이체 계좌',
    accountOwner: '김레몬',
    accountNumber: '123456789456',
    selected: false
  },
  {
    id: 2,
    logo: '/_nuxt/assets/images/insu/logo-alert-db.png',
    name: 'DB손해보험 자동이체 계좌',
    accountOwner: '김레몬',
    accountNumber: '123456789456',
    selected: false
  }
]

const lastAccount = [
  {
    id: 1,
    logo: '/_nuxt/assets/images/insu/logo-alert-db.png',
    name: 'DB손해보험 자동이체 계좌',
    accountOwner: '김레몬',
    accountNumber: '123456789456',
    selected: false
  }
]

const newAccount = [
  {
    id: 1,
    logo: '/_nuxt/assets/images/insu/logo-alert-db.png',
    name: 'DB손해보험 자동이체 계좌',
    accountOwner: '김레몬',
    accountNumber: '123456789456',
    selected: false
  }
]

// 은행 옵션 정의
const bankOptions = ref([
  { value: 'shinhan', label: '신한은행' },
  { value: 'woori', label: '우리은행' },
  { value: 'hana', label: '하나은행' }
])

const clickRegisterHospitals = () => {
  console.log('선택한 병원 등록 후 청구의신 서브메인으로 이동')
  navigateTo('/insu/claim/paperless/successFindHospitals')
}
</script>

<style lang="scss" scoped>
.wrap-check-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tit {
    font-weight: 700;
  }
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  .tit2 {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    width: 100%;
  }
}
.resident-id-form-group {
  margin-top: 1.2rem;
  width: 100%; /* Ensures it takes full width of its parent */
  .resident-id-label {
    display: block; /* Makes the label take its own line */
    margin-bottom: 0.6rem;
    font-weight: 400;
    color: #555;
    font-size: 12px;
    position: relative;
    &.required {
      &::after {
        content: '*';
        font-size: 1.2rem;
        display: inline-block;
        margin-left: 0.3rem;
        color: #f14960;
      }
    }
  }
}
.wrap-regi-accout {
  margin-bottom: 4rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background-color: #f4f4f4;
  .regi-account-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tit {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
  .c-input.search-bar.bank-account {
    margin-top: 2rem;
    :deep(.c-inpType) {
      border-radius: 0.8rem;
      .c-inp-el {
        background-color: #fff;
        border: none;
      }
    }
  }
  .wrap-depositor {
    .c-btn {
      margin-top: 2rem;
      background-color: #4f5561;
    }
    .text {
      margin-top: 0.6rem;
      font-size: 1.3rem;
      color: #959595;
    }
  }
}
</style>
