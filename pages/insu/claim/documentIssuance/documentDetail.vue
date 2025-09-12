<template>
  <BaseBody
    page-title="병원서류 발급"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <HospitalInfoField :name="hospitalName" :logo-src="logoSrc" :label="''" />

    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <DocumentDetail :receipt-items="receiptData" :incidental-items="incidentalData" />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import HospitalInfoField from '~/components/insu/HospitalInfoField.vue'
import DocumentDetail from '~/components/insu/DocumentDetail.vue'
const hospitalName = ref('경북대학교병원')
const logoSrc = ref('/_nuxt/assets/images/insu/logo_KUMedicine.svg')
const receiptData = ref([
  { id: 1, title: '진료일자', desc: '2024.02.20' },
  { id: 2, title: '진료기간', desc: '2023.10.23~2023.12.30' },
  { id: 3, title: '진료과', desc: '신경내과' },
  { id: 4, title: '진료의', desc: '홍길동' },
  { id: 5, title: '발급일자', desc: '2024.02.20' },
  { id: 6, title: '발급매수', desc: '2매' },
  { id: 7, title: '총 발급비용', desc: '11,100원', isTotal: true }
])

const incidentalData = ref([
  { id: 1, desc: '발급비용', price: '10,000원' },
  { id: 2, desc: '대행수수료', price: '1,000원' },
  { id: 3, desc: '대행수수료부가세', price: '100원' }
])
</script>

<style scoped lang="scss">
.medical-info {
  margin-top: 2.4rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-insurance-info {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .wrap-text {
        .tit {
          flex: 1;
          min-width: 0;
          font-weight: 700;
          @include mixin.ellipsis;
        }
      }
    }
  }
}
</style>
