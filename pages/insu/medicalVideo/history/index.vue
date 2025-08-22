<template>
  <BaseBody :show-back-button="true" page-title="의료영상공유" :has-notification="true">
    <section class="issue-history">
      <TitleSection title="의료영상 내역을<br/>확인할 수 있어요." />
      <ButtonGroup class="mt-16" gap="8">
        <Button aria-label="의료영상 발급" btn-type="line" class="xm" />
        <Button aria-label="발급대기함" btn-type="line" class="xm" />
      </ButtonGroup>
    </section>
    <hr class="hr-section ml-n20 mr-n20 mt-0" />
    <StickyTabsContainer class="pt-8">
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

      <!-- 영상 발급내역 탭 -->
      <div v-if="activeLineTab === 'issue'">
        <!-- 알림 노출 -->
        <StatusNotification v-if="medicalInfos.length > 0" :count="medicalInfos.length" />
        <!-- v-if="list.length > 0" -->
        <IssueHistory v-if="medicalInfos.length > 0" :medical-infos="medicalInfos" class="mb-n32" />
        <InsuEmpty v-else title="발급 내역이 없어요." sub-title="발급 내역을 확인할 수 있어요." />

        <ButtonGroup class="is-fixed">
          <Button aria-label="제휴병원 연결" btn-type="primary" class="lg w-full" />
        </ButtonGroup>
      </div>

      <!-- 배송내역 탭 -->
      <div v-else-if="activeLineTab === 'delivery'">
        <!-- v-if="list.length > 0" -->
        <DeliveryHistory v-if="deliveries.length > 0" :delivery-history="deliveries" />
        <InsuEmpty v-else title="배송 내역이 없어요." sub-title="배송 신청 후 내역을 확인할 수 있어요." />
      </div>
    </StickyTabsContainer>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import IssueHistory from '~/components/insu/IssueHistory.vue'
import DeliveryHistory from '~/components/insu/DeliveryHistory.vue'
import StatusNotification from '~/components/insu/StatusNotification.vue'

import InsuEmpty from '~/components/insu/InsuEmpty.vue'

const activeLineTab = ref('issue')

const lineTabs = ref<Tab[]>([
  { title: '영상 발급내역', key: 'issue' },
  { title: '배송내역', key: 'delivery' }
])

const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// 목록 데이터 (실사용 시 API 연동)
interface Examination {
  id: number
  name: string
  date: string
}
interface Department {
  id: number
  department: string
  examinations: Examination[]
}
interface MedicalHistory {
  id: number
  hospitalName: string
  logo: string
  status?: string
  arrowType?: boolean
  accessDate?: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  departments: Department[]
}

// 영상발급내역
const medicalInfos = ref<MedicalHistory[]>([
  {
    id: 1,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급 완료',
    arrowType: true,
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    buttonCount: 3,
    departments: [
      {
        id: 1,
        department: '영상의학과',
        examinations: [
          { id: 10, name: 'CT 검사', date: '2025.08.20' },
          { id: 11, name: 'MRI 검사', date: '2025.08.21' }
        ]
      },
      { id: 2, department: '가정의학과', examinations: [{ id: 12, name: 'X-Ray 검사', date: '2025.08.20' }] },
      { id: 3, department: '내과', examinations: [{ id: 13, name: '초음파 검사', date: '2025.08.20' }] }
    ]
  },
  {
    id: 2,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급 진행중',
    accessDate: '2025.08.20',
    shareFrom: '2025.08.20',
    shareTo: '2025.08.22',
    departments: [{ id: 1, department: '영상의학과', examinations: [{ id: 10, name: 'CT', date: '2025.08.20' }] }]
  },
  {
    id: 3,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '다시 발급하기',
    arrowType: true,
    accessDate: '2025.08.20',
    buttonCount: 0,
    departments: [{ id: 1, department: '영상의학과', examinations: [{ id: 10, name: 'CT', date: '2025.08.20' }] }],
    buttonKeys: ['history']
  }
])

interface DeliveryRecord {
  id: number
  open: boolean
  deliveryStatus: 'requested' | 'in_progress' | 'completed'
  hospitalName: string
  requestedDate: string
  completedDate?: string
  address: string
  phone: string
  memo?: string
  productName: string
  productAmount: number
  deliveryFee: number
  label: string
  date: string
  price?: number | 0 // 총 결제 금액
}

const deliveries = ref<DeliveryRecord[]>([
  {
    id: 1,
    open: false,
    deliveryStatus: 'requested',
    hospitalName: '경북대학교병원',
    requestedDate: '2025.08.21',
    completedDate: '',
    address: '서울시 금천구 가산디지털1로 145, 1005호(에이스하이엔드타워 3차)',
    phone: '010-1234-5678',
    memo: '문 앞에 놓아주세요',
    productName: '의료영상 CD',
    productAmount: 10000,
    deliveryFee: 5000,
    label: '신청일',
    date: '2025.08.21'
  },
  {
    id: 2,
    open: false,
    deliveryStatus: 'in_progress',
    hospitalName: '경북대학교병원',
    requestedDate: '2025.08.21',
    completedDate: '',
    address: '대구 북구 대학로 80 경북대학교병원',
    phone: '010-1234-5678',
    productName: '의료영상 CD',
    productAmount: 10000,
    deliveryFee: 20000,
    label: '신청일',
    date: '2025.08.21'
  },
  {
    id: 3,
    open: false,
    deliveryStatus: 'completed',
    hospitalName: '경북대학교병원',
    requestedDate: '2025.08.21',
    completedDate: '',
    address: '대구 북구 대학로 80 경북대학교병원',
    phone: '010-1234-5678',
    memo: '문 앞에 놓아주세요',
    productName: '의료영상 CD',
    productAmount: 10000,
    deliveryFee: 5000,
    label: '신청일',
    date: '2025.08.21'
  }
])
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
