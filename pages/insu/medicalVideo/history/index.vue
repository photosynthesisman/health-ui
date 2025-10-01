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
    </StickyTabsContainer>
    <!-- 영상 발급내역 탭 -->
    <div v-if="activeLineTab === 'issue'">
      <!-- 알림 노출 -->
      <StatusNotification v-if="hospitalVideoHistory.length > 0" :count="hospitalVideoHistory.length" />
      <!-- v-if="list.length > 0" -->
      <IssueHistory
        v-if="hospitalVideoHistory.length > 0"
        :medical-infos="hospitalVideoHistory"
        @history-click="handleMedicalVideoHistoryClick"
        @status-click="handleIssueHistoryClick"
        @share-click="handleMedicalShareClick"
        @cd-click="handleShipCdClick"
        @reissue-click="handleReissueClick"
        @click-sort="clickSort"
      />
      <InsuEmpty v-else title="발급 내역이 없어요." sub-title="발급 내역을 확인할 수 있어요." />

      <!-- <ButtonGroup class="is-fixed">
          <Button aria-label="제휴병원 연결" btn-type="primary" class="lg w-full" />
        </ButtonGroup> -->
    </div>

    <!-- 배송내역 탭 -->
    <div v-else-if="activeLineTab === 'delivery'">
      <!-- v-if="list.length > 0" -->
      <DeliveryHistory v-if="deliveries.length > 0" :delivery-history="deliveries" @click-sort="clickShipSort" />
      <InsuEmpty v-else title="배송 내역이 없어요." sub-title="배송 신청 후 내역을 확인할 수 있어요." />
    </div>

    <Teleport to="body">
      <FullModal
        :is-visible="isShowFullModal"
        v-bind="fullModalProps"
        :confirm-button-text="'확인'"
        @close="toggleFullModal"
        @confirm="toggleFullModal"
      >
        <template #content>
          <component :is="modalContentComponent" :data="selectedHospitalData" />
        </template>
      </FullModal>
      <BottomModal
        :is-visible="isShowSortModal"
        title="조회 조건 설정"
        :is-show-cancel-button="false"
        confirm-button-text="조회하기"
        @close="isShowSortModal = false"
      >
        <template #content>
          <FlexSection class="gap-12 mt-16">
            <FlexColDiv class="gap-6">
              <InputLabelText label="발급 종류" />
              <div class="grid_card">
                <Checkbox
                  id="checkBox1"
                  v-model="checkbox1"
                  custom-style="small buttonType2 flex-11"
                  aria-label="전체"
                />
                <Checkbox id="checkBox2" custom-style="small buttonType2 flex-11" aria-label="발급완료" />
                <Checkbox id="checkBox3" custom-style="small buttonType2 flex-11" aria-label="발급 진행중" />
                <Checkbox id="checkBox4" custom-style="small buttonType2 flex-11" aria-label="다시 발급받기" />
                <Checkbox id="checkBox5" custom-style="small buttonType2 flex-11" aria-label="공유기간 만료" />
              </div>
            </FlexColDiv>
            <FlexColDiv class="gap-6">
              <InputLabelText label="조회기간" />
              <SegmentedTabs
                :tabs="segmentedTabs1"
                :active-key="activeSegmentedTab1"
                @tab-change="onSegmentedTabChange1"
              />
            </FlexColDiv>
          </FlexSection>
        </template>
      </BottomModal>
      <BottomModal
        :is-visible="isShowSortModal2"
        title="조회 조건 설정"
        :is-show-cancel-button="false"
        confirm-button-text="조회하기"
        @close="isShowSortModal2 = false"
      >
        <template #content>
          <FlexSection class="gap-12 mt-16">
            <!-- 배송여부 삭제 -->
            <!-- <FlexColDiv class="gap-6">
              <InputLabelText label="배송여부" />
              <SegmentedTabs
                :tabs="segmentedTabs2"
                :active-key="activeSegmentedTab2"
                @tab-change="onSegmentedTabChange2"
              />
            </FlexColDiv> -->
            <FlexColDiv class="gap-6">
              <InputLabelText label="조회기간" />
              <SegmentedTabs
                :tabs="segmentedTabs3"
                :active-key="activeSegmentedTab3"
                @tab-change="onSegmentedTabChange3"
              />
            </FlexColDiv>
            <FlexColDiv class="gap-6">
              <InputLabelText label="정렬 순서" />
              <FlexRowDiv class="gap-8">
                <Radio id="rdo1" name="rdo1" checked custom-style="button small flex-11" aria-label="최신순" />
                <Radio id="rdo2" name="rdo1" checked custom-style="button small flex-11" aria-label="검사일자 기준" />
              </FlexRowDiv>
            </FlexColDiv>
          </FlexSection>
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import IssueHistory from '~/components/insu/IssueHistory.vue'
import DeliveryHistory from '~/components/insu/DeliveryHistory.vue'
import StatusNotification from '~/components/insu/StatusNotification.vue'
import IssuanceInformationModal from '~/components/insu/IssuanceInformationModal.vue'
import RefundInformationModal from '~/components/insu/RefundInformationModal.vue'
import SharedHistoryModal from '~/components/insu/SharedHistoryModal.vue'
import InsuEmpty from '~/components/insu/InsuEmpty.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import SegmentedTabs from '~/components/tabbar/SegmentedTabs.vue'
import SegmentedTabsStyle from '~/components/common/tab/SegmentedTabs.vue'
import Radio from '~/components/publishing/input/radio.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import type { Component } from 'vue'
import type { BaseModalProps } from '~/types/common/modal.type'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
const activeLineTab = ref('issue')

const lineTabs = ref<Tab[]>([
  { title: '영상 발급내역', key: 'issue' },
  { title: '배송내역', key: 'delivery' }
])

const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// 모달 상태 관련 데이터
const isShowFullModal = ref(false)
const fullModalProps = ref({
  title: '', // 모달 타이틀을 동적으로 변경할 수 있도록 수정
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const modalContentComponent = ref<Component | null>(null)
const selectedHospitalData = ref<MedicalVideoHistory | null>(null)

const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
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
interface MedicalItem {
  id: number
  issueDate: string // 발급일자
  department: string // 진료과
  examinations: Examination[] // 검사 목록
  shareFrom?: string // 공유 가능 시작일
  shareTo?: string // 공유 가능 종료일
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
}

interface MedicalVideoHistory {
  id: number
  hospitalName: string
  status?: string
  logo: string
  shareFrom?: string
  shareTo?: string
  buttonCount?: 0 | 1 | 2 | 3
  buttonKeys?: ('share' | 'cd' | 'history')[]
  medicalVideoItems?: MedicalItem[] // 의료 항목 목록 추가
  isRefund?: string
  refundDate?: string
}

// 병원별 영상발급내역
const hospitalVideoHistory = ref<MedicalVideoHistory[]>([
  {
    id: 1,
    hospitalName: '경북대학교병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급진행중',
    medicalVideoItems: [
      {
        id: 1,
        issueDate: '2025.06.25',
        department: '영상의학과',
        examinations: [
          { id: 1, name: 'CT 검사', date: '2025.06.25' },
          { id: 2, name: 'MRI 검사', date: '2025.06.25' }
        ],
        shareFrom: '2025.08.20',
        shareTo: '2025.08.22',
        buttonCount: 3,
        buttonKeys: ['share', 'cd', 'history']
      },
      {
        id: 2,
        issueDate: '2025.06.20',
        department: '정형외과',
        examinations: [
          { id: 3, name: 'X-Ray 검사', date: '2025.06.20' },
          { id: 4, name: 'CT 검사', date: '2025.06.20' }
        ],
        shareFrom: '2025.08.15',
        shareTo: '2025.08.25',
        buttonCount: 2,
        buttonKeys: ['share', 'cd']
      }
    ]
  },
  {
    id: 2,
    hospitalName: '강남성모병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '발급완료',
    medicalVideoItems: [
      {
        id: 1,
        issueDate: '2025.06.25',
        department: '영상의학과',
        examinations: [
          { id: 1, name: 'CT 검사', date: '2025.06.25' },
          { id: 2, name: 'MRI 검사', date: '2025.06.25' }
        ],
        shareFrom: '2025.08.20',
        shareTo: '2025.08.22',
        buttonCount: 3,
        buttonKeys: ['share', 'cd', 'history']
      },
      {
        id: 2,
        issueDate: '2025.06.20',
        department: '정형외과',
        examinations: [
          { id: 3, name: 'X-Ray 검사', date: '2025.06.20' },
          { id: 4, name: 'CT 검사', date: '2025.06.20' }
        ],
        shareFrom: '2025.08.15',
        shareTo: '2025.08.25',
        buttonCount: 2,
        buttonKeys: ['share', 'cd']
      }
    ]
  },
  {
    id: 2,
    hospitalName: '강남성모병원',
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    status: '다시발급받기',
    medicalVideoItems: [
      {
        id: 1,
        issueDate: '2025.06.25',
        department: '영상의학과',
        examinations: [
          { id: 1, name: 'CT 검사', date: '2025.06.25' },
          { id: 2, name: 'MRI 검사', date: '2025.06.25' }
        ],
        shareFrom: '2025.08.20',
        shareTo: '2025.08.22',
        buttonCount: 3,
        buttonKeys: ['share', 'cd', 'history']
      },
      {
        id: 2,
        issueDate: '2025.06.20',
        department: '정형외과',
        examinations: [
          { id: 3, name: 'X-Ray 검사', date: '2025.06.20' },
          { id: 4, name: 'CT 검사', date: '2025.06.20' }
        ],
        shareFrom: '2025.08.15',
        shareTo: '2025.08.25',
        buttonCount: 2,
        buttonKeys: ['share', 'cd']
      }
    ]
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
    productName: '의료영상 CDCD(2장)',
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
    productName: '의료영상 CD(2장)',
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
const handleIssueHistoryClick = (hospital: MedicalVideoHistory) => {
  // 클릭된 병원 데이터를 저장
  selectedHospitalData.value = hospital
  modalContentComponent.value = IssuanceInformationModal // '발급 정보'일 때 보여줄 컴포넌트
  fullModalProps.value.title = '발급 정보'
  toggleFullModal()

  // status 값에 따라 동적으로 모달 내용 컴포넌트 결정(환불 정보 삭제)
  // if (hospital.status === '발급 정보') {
  //   modalContentComponent.value = IssuanceInformationModal // '발급 정보'일 때 보여줄 컴포넌트
  //   fullModalProps.value.title = '발급 정보'
  //   toggleFullModal()
  // } else if (hospital.status === '환불 정보') {
  //   modalContentComponent.value = RefundInformationModal // '환불 정보'일 때 보여줄 컴포넌트
  //   fullModalProps.value.title = '환불 정보'
  //   toggleFullModal()
  // }
}
const handleMedicalVideoHistoryClick = (hospital: MedicalVideoHistory) => {
  modalContentComponent.value = SharedHistoryModal // '영상 공유 내역'클릭 시 보여줄 컴포넌트
  fullModalProps.value.title = '영상 공유내역'
  toggleFullModal()
}
const handleMedicalShareClick = (hospital: MedicalVideoHistory) => {
  navigateTo('/insu/medicalVideo/history/ShareHospitalSelection')
}
const handleShipCdClick = (hospital: MedicalVideoHistory) => {
  navigateTo('/insu/medicalVideo/history/DeliveryAddressForm')
}

const handleReissueClick = (hospital: MedicalVideoHistory) => {
  // 다시발급받기 클릭 시 처리
  // 예: 발급 신청 페이지로 이동 또는 API 호출
  console.log('다시발급받기:', hospital.hospitalName)
  // navigateTo('/insu/medicalVideo/reissue') // 예시 경로
}

// SegmentedTabs 설정
const checkbox1 = ref(true)
const segmentedTabs1 = ref([
  { title: '1주일', key: 'segment1' },
  { title: '1개월', key: 'segment2' },
  { title: '3개월', key: 'segment3' },
  //{ title: '6개월', key: 'segment4' },
  { title: '1년', key: 'segment4' }
])
const segmentedTabsSort = [
  { name: '최신순', code: 'latest' },
  { name: '과거순', code: 'past' }
]
const segmentedActiveIndex = ref(0)
const handleSegmentedTabClick = (index: number) => {
  segmentedActiveIndex.value = index
  console.log('Segmented 탭 클릭:', segmentedTabsSort[index])
}
interface DateRangeModalProps extends BaseModalProps {
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  initialPeriodType1?: string
  initialPeriodType2?: string
  initialPeriodType3?: string
}

const props = withDefaults(defineProps<DateRangeModalProps>(), {
  title: '기간 선택',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true,
  initialStartDate: null,
  initialEndDate: null,
  initialPeriodType1: 'segment1',
  initialPeriodType2: 'segment6',
  initialPeriodType3: 'segment10'
})
//SegmentedTabs 이벤트 핸들러
const onSegmentedTabChange1 = (key: string) => {
  activeSegmentedTab1.value = key
}

// 반응형 상태
const activeSegmentedTab1 = ref(props.initialPeriodType1 || 'segment1')

const isShowSortModal = ref(false)
const clickSort = () => {
  isShowSortModal.value = !isShowSortModal.value
}
// 배송내역 조회조건 관련
const isShowSortModal2 = ref(false)
const clickShipSort = () => {
  isShowSortModal2.value = !isShowSortModal2.value
}
const segmentedTabs2 = ref([
  { title: '전체', key: 'segment6' },
  { title: '배송신청', key: 'segment7' },
  { title: '배송중', key: 'segment8' },
  { title: '배송완료', key: 'segment9' }
])
const segmentedTabs3 = ref([
  { title: '6개월', key: 'segment10' },
  { title: '1년', key: 'segment11' },
  { title: '2년', key: 'segment12' },
  { title: '3년', key: 'segment13' }
])
const onSegmentedTabChange2 = (key: string) => {
  activeSegmentedTab2.value = key
}
const activeSegmentedTab2 = ref(props.initialPeriodType2 || 'segment6')
const onSegmentedTabChange3 = (key: string) => {
  activeSegmentedTab3.value = key
}
const activeSegmentedTab3 = ref(props.initialPeriodType3 || 'segment10')
</script>
<style scoped>
.issue-history {
  padding: 2.4rem 0 3.2rem;
}
</style>
