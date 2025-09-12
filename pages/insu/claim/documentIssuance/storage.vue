<template>
  <BaseBody :show-back-button="true" page-title="서류 보관함" logo-type="text" :has-cart="true" :cart-count="2">
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <PaperStorageToggle
      v-model:total-cost="totalCost"
      v-model:total-count="totalCount"
      :hospitals="hospitals"
      @export-document="clickExportMethod"
      @reissue-document="clickNext"
    />
  </BaseBody>
  <BottomModal
    :is-visible="isShowExportMethodModal"
    title="내보낼 방법을 선택해 주세요."
    :is-show-cancel-button="false"
    confirm-button-text="내보내기"
    @close="isShowExportMethodModal = false"
    @confirm="clickConfirmModal"
  >
    <template #content>
      <FlexSection class="gap-16">
        <FlexRowDiv class="gap-8">
          <Radio
            id="rdo1"
            v-model="selectedMethod"
            name="rdo1"
            custom-style="button small"
            value="이메일"
            aria-label="이메일"
            class="w-full"
          />
          <Radio
            id="rdo2"
            v-model="selectedMethod"
            name="rdo1"
            custom-style="button small"
            value="SNS 공유"
            aria-label="SNS 공유"
            class="w-full"
          />
          <Radio
            id="rdo3"
            v-model="selectedMethod"
            name="rdo1"
            custom-style="button small"
            value="다운로드"
            aria-label="다운로드"
            class="w-full"
          />
        </FlexRowDiv>

        <InputMail
          v-if="selectedMethod === '이메일'"
          label="이메일 주소 입력"
          :is-valid="false"
          valid-text="올바른 이메일 주소를 입력해주세요."
          placeholder="이메일을 입력해주세요"
          :custom-domains="[
            { value: 'gmail.com', label: 'gmail.com' },
            { value: 'naver.com', label: 'naver.com' },
            { value: 'daum.net', label: 'daum.net' },
            { value: 'kakao.com', label: 'kakao.com' }
          ]"
        />

        <InputText
          label="비밀번호"
          type="password"
          :is-valid="false"
          valid-text="비밀번호 벨리데이터 메시지"
          placeholder="비밀번호를 입력해 주세요."
        />
      </FlexSection>
    </template>
  </BottomModal>

  <ConfirmModal
    :is-visible="isShowConfirmModal"
    :html="confirmModalContent"
    :is-show-cancel-button="false"
    :is-show-confirm-button="true"
    @confirm="isShowConfirmModal = false"
    @close="isShowConfirmModal = false"
  />
</template>

<script setup lang="ts">
import PaperStorageToggle from '~/components/insu/PaperStorageToggle.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
const totalCost = ref(0)
const totalCount = ref(0)
const hospitals = ref([
  {
    name: '충북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    documents: [
      {
        name: '진료비영수증',
        creationDate: '2024.02.20',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        period: 30,
        hasDocument: 1
      },
      {
        name: '외래진료확인서',
        creationDate: '2024.02.20',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        period: 0,
        hasDocument: 0
      }
    ]
  },
  {
    name: '충북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    documents: [
      {
        name: '진료비영수증',
        creationDate: '2024.02.20',
        treatmentDate: '2023.10.23',
        department: '신경내과',
        doctor: '이현정',
        count: 1,
        period: 30,
        hasDocument: 1
      }
    ]
  }
])

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '보관함', code: 'document' },
  { name: '내보내기 영역', code: 'export' }
]
const lineActiveIndex = ref(0)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

const selectedMethod = ref('이메일')
const isShowExportMethodModal = ref(false)
const clickExportMethod = () => {
  isShowExportMethodModal.value = !isShowExportMethodModal.value
}

const clickNext = () => {
  return navigateTo('/insu/claim/documentIssuance/applyDocumentIssuance')
}

const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')

const clickConfirmModal = async () => {
  confirmModalContent.value = `      
      <div style="font-weight: bold;font-size: var(--num-16);text-align: left;">진료비납입확인서 내보내기 요청을 완료했어요.</div>
      <div style="font-weight: 400;font-size: var(--num-16);text-align: left;color: #555555;margin-top:0.8rem;">제증명 서류묶음 생성에 다소 시간이 소요될 수 있어요</div>     
  `
  isShowConfirmModal.value = true
}
</script>

<style scoped lang="scss"></style>
