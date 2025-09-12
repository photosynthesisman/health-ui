<template>
  <BaseBody
    :show-back-button="false"
    page-title="진단서 서류 사본 발급 안내"
    logo-type="text"
    :has-add-text-left="true"
    :has-close-btn="true"
    class="pb-36"
  >
    <TitleSection title="강동성심병원의 진단서 사본<br />발급 방법을 확인하세요" class="mt-24" />
    <FlexSection class="wrap-spread">
      <CertificateDocAccordion
        v-for="(item, idx) in guideItems"
        :key="idx"
        :icon="item.icon"
        :alt="item.alt"
        :title="item.title"
        :expanded="item.expanded"
        :body-title="item.bodyTitle"
        :body-steps="item.bodySteps"
        :desc="item.desc"
        :button-text="item.buttonText"
        @button-click="clickConfirmModal"
        @toggle="guideItems[idx].expanded = !guideItems[idx].expanded"
      />
    </FlexSection>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import CertificateDocAccordion from '~/components/publishing/insu/paperless/CertificateDocAccordion.vue'
import Button from '~/components/publishing/button/Button.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

const clickConfirmModal = async () => {
  const modalContent = `
    <div class="modal-content-info">
      <div style="text-align:left;">작성중이던 정보는 저장되지않으며<br />실손청구는 처음부터 진행해야해요.<br /><br />서류 발급화면으로 이동할까요?</div>
    </div>`
  await ConfirmModal.open({
    title: '안내',
    isVisible: true,
    html: modalContent,
    confirmButtonText: '이동',
    isShowCancelButton: false
  })
}

// 각 item의 확장 상태를 관리하는 배열
const expandedItems = ref([false, false, false])

// item 토글 함수
const toggleItem = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

// 안내 텍스트
const guideItems = ref([
  {
    icon: '/_nuxt/assets/images/insu/icon-payment-method1.svg',
    alt: '진단서 발급 방법 1',
    title: '청구의신에서 발급하기',
    expanded: false,
    bodyTitle: '청구의신 병원 서류발급 서비스를 이용하여 진단서 사본을 발급해요.',
    bodySteps: ['병원 서류 발급 > 병원 선택', '진단서 사본 발급 선택', '발급 수수료 결제'],
    desc: '발급 수수료는 병원에 따라 달라질 수 있어요.',
    buttonText: '발급하기'
  },
  {
    icon: '/_nuxt/assets/images/insu/icon-payment-method2.svg',
    alt: '진단서 발급 방법 2',
    title: '병원 홈페이지에서 발급하기',
    expanded: false,
    bodyTitle: '병원 홈페이지에서 진단서 사본을 발급해요.',
    bodySteps: ['병원 홈페이지 접속', '진단서 조회 및 사본 신청', '발급 수수료 결제'],
    desc: '발급 수수료는 병원에 따라 달라질 수 있어요.'
  },
  {
    icon: '/_nuxt/assets/images/insu/icon-payment-method3.svg',
    alt: '진단서 발급 방법 3',
    title: '병원 방문 후 직접 발급하기',
    expanded: false,
    bodyTitle: '신분증을 지참하신 후 실손청구 하실 병원에<br />직접 방문하여 진단서 사본 발급을 신청해요.',
    desc: '각 병원의 운영 시간을 꼭 확인하신 후 방문해주세요.'
  }
])
</script>

<style scoped lang="scss">
.wrap-spread {
  margin: 3.2rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
