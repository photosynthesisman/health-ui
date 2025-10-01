<template>
  <!-- 09-30 페이지 타이틀 변경 / 미확인 복권 확인 > 전체 사용 내역 보기로 변경 / 페이지 배경색 제거 -->
  <BaseBody
    page-title="보관함"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span style='color:#555;font-size:1.4rem;font-weight:600'>전체 사용 내역 보기</span>"
  >
    <StickyTabsContainer>
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    </StickyTabsContainer>

    <div v-if="activeLineTab === 'reward'">
      <TotalCountSelectType
        :count="6"
        :filter-icon="true"
        :place-holder="'타입별'"
        class="pt-20 pb-20"
        :select-options="periodOptions"
      />
      <RewardItemWrap>
        <RewardItem
          :reward-type="'ticket'"
          title="행운티켓"
          date="14:36:25"
          :image-name="RewardImage7"
          is-reward
          @button-click="toggleBottomModal()"
        />
        <RewardItem
          :reward-type="'ticket'"
          title="달성티켓"
          date="14:36:25"
          :image-name="RewardImage8"
          is-reward
          @button-click="clickFullModal1"
        />
        <RewardItem title="챌린지 참가권" date="2일 13:24:21" :image-name="RewardImage9" is-reward />
        <RewardItem title="2시간 걸음수 2배" date=" 13:24:21" :image-name="RewardImage3" is-reward />
        <RewardItem title="2시간 걸음수 2배" date=" 13:24:21" :image-name="RewardImage10" is-reward />
        <RewardItem title="2시간 걸음수 2배" date=" 13:24:21" :image-name="RewardImage5" is-reward />
      </RewardItemWrap>
    </div>

    <div v-if="activeLineTab === 'purchase'">
      <TotalCountSelectType
        :count="6"
        :filter-icon="true"
        :place-holder="'타입별'"
        class="pt-20 pb-20"
        :select-options="periodOptions"
      />
      <RewardItemWrap>
        <RewardItem
          :reward-type="'ticket'"
          title="행운티켓"
          date="14:36:25"
          :image-name="RewardImage7"
          @button-click="toggleBottomModal()"
        />
        <RewardItem
          :reward-type="'ticket'"
          title="달성티켓"
          date="14:36:25"
          :image-name="RewardImage8"
          @button-click="clickFullModal1"
        />
        <RewardItem
          :reward-type="'package'"
          title="첫걸음 환영 패키지"
          date="2일 13:24:21"
          :image-name="RewardImage11"
        />
        <RewardItem title="2시간 걸음수 2배" date=" 13:24:21" :image-name="RewardImage3" />
        <RewardItem title="2시간 걸음수 2배" date=" 13:24:21" :image-name="RewardImage10" />
      </RewardItemWrap>
    </div>
  </BaseBody>

  <!-- 행운복권 모달 -->
  <FullModal
    :is-visible="isShowFullModal1"
    v-bind="fullModalProps1"
    @confirm="clickFullConfirm1"
    @close="toggleFullModal1"
  >
    <template #content><LotteryCheck /></template>
  </FullModal>

  <!-- 행운복권 확인 모달 -->
  <FullModal
    :is-visible="isShowFullModal2"
    v-bind="fullModalProps2"
    @confirm="clickFullConfirm2"
    @close="toggleFullModal2"
  >
    <template #content>
      <LotteryScratch :is-scratched="isLotteryScratched" />
    </template>
  </FullModal>

  <!-- 상품교환권 선물받기 모달 -->
  <FullModal
    :is-visible="isShowFullModal3"
    v-bind="fullModalProps3"
    @close="toggleFullModal3"
    @confirm="clickBottomModal"
  >
    <template #content>
      <RewardResultDetail
        :have-reward="true"
        :reward-item="'상품교환권'"
        :reward-type="'gift'"
        :reward-image="RewardImage1"
      />
      <RewardGuide :reward-type="'gift'" />
    </template>
  </FullModal>

  <!-- 아이템 선물받기 모달 -->
  <FullModal :is-visible="isShowFullModal4" v-bind="fullModalProps4" @close="toggleFullModal4">
    <template #content>
      <RewardResultDetail
        :have-reward="true"
        :reward-item="'챌린지부스터'"
        :reward-type="'item'"
        :reward-image="RewardImage3"
      />
      <RewardGuide :reward-type="'item'" />
    </template>
  </FullModal>

  <!-- 포인트 선물받기 모달 -->
  <FullModal :is-visible="isShowFullModal5" v-bind="fullModalProps4" @close="toggleFullModal5">
    <template #content>
      <RewardResultDetail
        :have-reward="true"
        :reward-item="'건강의신 10P'"
        :reward-type="'point'"
        :reward-image="RewardImage4"
      />
      <RewardGuide :reward-type="'point'" />
    </template>
  </FullModal>

  <!-- 꽝 모달 -->
  <FullModal :is-visible="isShowFullModal6" v-bind="fullModalProps5" @close="toggleFullModal6">
    <template #content>
      <RewardResultDetail :have-reward="false" />
    </template>
  </FullModal>

  <!-- 선물받기 모달 -->
  <BottomModal :is-visible="isShowBottomModal" v-bind="bottomModalProps" @close="toggleBottomModal">
    <template #content>
      <ClaimGift
        :image-name="RewardImage1"
        :brand-name="'스타벅스'"
        :gift-name="'아이스 카페 아메리카노 T'"
        :gift-type="'16,200P'"
      />
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import EmptyResult from '~/components/publishing/wholeMenu/EmptyResult.vue'
import TotalCountCheckType from '~/components/publishing/common/temp/TotalCountCheckType.vue'
import RewardItem from '~/components/publishing/common/lottery/RewardItem.vue'
import RewardItemWrap from '~/components/publishing/common/lottery/RewardItemWrap.vue'
import RewardResultDetail from '~/components/publishing/common/lottery/RewardResultDetail.vue'
import RewardGuide from '~/components/publishing/common/lottery/RewardGuide.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import RewardImage2 from '~/assets/images/lottery/img-reward-2.svg'
import RewardImage3 from '~/assets/images/lottery/img-reward-3.svg'
import RewardImage4 from '~/assets/images/benefit/img-point-coin.png'
import RewardImage5 from '~/assets/images/lottery/img-reward-5.svg'
import RewardImage6 from '~/assets/images/lottery/img-reward-6.svg'
import RewardImage7 from '~/assets/images/lottery/img-lucky-ticket-1.png'
import RewardImage8 from '~/assets/images/lottery/img-lucky-ticket-2.png'
import RewardImage9 from '~/assets/images/lottery/img-ticket-1.png'
import RewardImage10 from '~/assets/images/lottery/img-reward-8.png'
import RewardImage11 from '~/assets/images/lottery/img-package.png'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import FullModal from '~/components/common/modal/FullModal.vue'
import LotteryCheck from '~/components/publishing/common/lottery/check.vue'
import LotteryScratch from '~/components/publishing/common/lottery/scratch.vue'
import ClaimGift from '~/components/publishing/common/lottery/ClaimGift.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import TotalCountSelectType from '~/components/publishing/common/temp/TotalCountSelectType.vue'
const activeLineTab = ref('reward')

const lineTabs = ref<Tab[]>([
  { title: '리워드 보관함', key: 'reward' },
  { title: '구매 보관함', key: 'purchase' }
])
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

const selectedPeriod = ref('1')

const periodOptions = [
  { value: '1', label: '티켓' },
  { value: '2', label: '참가권' },
  { value: '3', label: '아이템' },
  { value: '4', label: '상품교환권' }
]
const isShowFullModal1 = ref(false)
const isShowFullModal2 = ref(false)
const isShowFullModal3 = ref(false)
const isShowFullModal4 = ref(false)
const isShowFullModal5 = ref(false)
const isShowFullModal6 = ref(false)
const isShowBottomModal = ref(false)

// 복권확인 모달 props
const fullModalProps1 = ref({
  title: '행운복권 확인',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '복권긁기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 복권긁기 모달 props
const fullModalProps2 = ref({
  title: '행운복권 확인',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '한번에 긁기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 상품교환권 모달 props
const fullModalProps3 = ref({
  title: '행운복권 확인',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '선물받기',
  cancelButtonText: '자랑하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 아이템 & 포인트 모달 props
const fullModalProps4 = ref({
  title: '행운복권 확인',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '친구에게 자랑하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 꽝 모달 props
const fullModalProps5 = ref({
  title: '행운복권 확인',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '친구에게 공유하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 선물받기 모달 props
const bottomModalProps = ref({
  title: '선물받기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '주문하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const toggleFullModal1 = () => {
  isShowFullModal1.value = !isShowFullModal1.value
}
const toggleFullModal2 = () => {
  isShowFullModal2.value = !isShowFullModal2.value
  isLotteryScratched.value = false
}
const toggleFullModal3 = () => {
  isShowFullModal3.value = !isShowFullModal3.value
}
const toggleFullModal4 = () => {
  isShowFullModal4.value = !isShowFullModal4.value
}
const toggleFullModal5 = () => {
  isShowFullModal5.value = !isShowFullModal5.value
}
const toggleFullModal6 = () => {
  isShowFullModal6.value = !isShowFullModal6.value
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
const clickFullModal1 = () => {
  toggleFullModal1()
}
const clickFullModal3 = () => {
  toggleFullModal3()
}
const clickFullModal4 = () => {
  toggleFullModal4()
}
const clickFullModal5 = () => {
  toggleFullModal5()
}
const clickFullModal6 = () => {
  toggleFullModal6()
}
const clickBottomModal = () => {
  toggleFullModal3()
  toggleBottomModal()
}

const clickFullConfirm1 = () => {
  toggleFullModal1()
  toggleFullModal2()
}
const isLotteryScratched = ref(false)

const clickFullConfirm2 = async () => {
  isLotteryScratched.value = true
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 상품 교환권 모달
  clickFullModal3()
  // 아이템 모달
  // clickFullModal4()
  // 포인트 모달
  // clickFullModal5()
  // 꽝 모달
  // clickFullModal6()

  toggleFullModal2()
}
</script>
