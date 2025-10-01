<template>
  <BaseBody page-title="레몬포인트 스토어" :show-back-button="true">
    <PointStoreSummaryCard />
    <hr class="hr-section ml-n20 mr-n20 mb-8" />
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" />
    <!-- 구독권 구매 -->
    <div v-if="lineActiveIndex === 0" class="mt-20">
      <InputText inp-type="search" :placeholder="'아이템명을 입력해주세요.'" />
      <SearchResult :count="ParticipateTickets.length + SubscribeTickets.length" />
      <FlexColDiv class="pt-12 gap-40">
        <PointStoreTicketWrap>
          <ParticipateTicketItem
            v-for="(item, index) in ParticipateTickets"
            :key="index"
            :image-name="item.imageName"
            :name="item.name"
            :point="item.point"
            @button-click="toggleBottomModal(item)"
          />
        </PointStoreTicketWrap>
        <PointStoreSubscribeWrap>
          <SubscribeTicketItem
            v-for="(item, index) in SubscribeTickets"
            :key="index"
            :image-name="item.imageName"
            :name="item.name"
            :point="item.point"
            @button-click="toggleBottomModal(item)"
          />
        </PointStoreSubscribeWrap>
      </FlexColDiv>
    </div>

    <!-- 챌린지 아이템 구매 -->
    <div v-if="lineActiveIndex === 1" class="mt-20">
      <InputText inp-type="search" :placeholder="'아이템명을 입력해주세요.'" />
      <SearchResult :count="ChallengeItems.length" />
      <PurchasePackageButton />
      <PointStoreItemWrap>
        <ChallengeItem
          v-for="(item, index) in ChallengeItems"
          :key="index"
          :image-name="item.imageName"
          :name="item.name"
          :point="item.point"
          @button-click="toggleBottomModal(item)"
        />
      </PointStoreItemWrap>
    </div>
    <!-- 모바일 교환권 구매 -->
    <div v-if="lineActiveIndex === 2" class="mt-20">
      <InputText inp-type="search" :placeholder="'상품명을 입력해주세요.'" />
      <SearchResult :item="'상품'" :count="couponItems.length" />
      <PointStoreCouponWrap>
        <MobileCoupon
          v-for="(coupon, index) in couponItems"
          :key="index"
          :image-name="coupon.imageName"
          :brand="coupon.brand"
          :name="coupon.name"
          :point="coupon.point"
          @button-click="toggleBottomModal(coupon)"
        />
      </PointStoreCouponWrap>
    </div>

    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        v-bind="bottomModalProps"
        @close="toggleBottomModal"
        @confirm="handleNavigation('/common/point/makePaymentBuy')"
      >
        <template #content>
          <OrderItem
            :image-name="selectedItem?.imageName || RewardImage1"
            :brand-name="selectedItem?.brand || '챌린지 부스터'"
            :gift-name="selectedItem?.name || '정보 없음'"
            :gift-type="selectedItem?.point ? `${selectedItem.point}P` : '정보 없음'"
            :info-text="'상품정보 상세보기'"
            :beg-friend-image="begFriendImagePath"
            :gift-friend-image="giftFriendImagePath"
            @see-more-info="handleSeeMoreInfo"
            @beg-for-gift="openFriendsIndex('beg')"
            @to-give-gift="openFriendsIndex('gift')"
            @update:cal-order-cost="handleCostUpdate"
            @navigate-to="handleNavigation"
            @update:input-amount="handleUpdateInputAmount"
          />
        </template>
      </BottomModal>

      <BottomModal
        :is-visible="isShowBottomModal2"
        v-bind="bottomModalProps2"
        @close="toggleBottomModal2"
        @confirm="handleNavigation('/common/payment/finishedGift')"
      >
        <template #content>
          <OrderItem
            :only-gift-view="true"
            :image-name="selectedItem?.imageName || RewardImage1"
            :brand-name="selectedItem?.brand || '챌린지 부스터'"
            :gift-name="selectedItem?.name || '정보 없음'"
            :gift-type="selectedItem?.point ? `${selectedItem.point}P` : '정보 없음'"
            :info-text="'상품정보 상세보기'"
            :label="selectedFriendNickname + '에게'"
            :beg-friend-image="begFriendImagePath"
            :gift-friend-image="giftFriendImagePath"
            @see-more-info="handleSeeMoreInfo"
            @beg-for-gift="openFriendsIndex('beg')"
            @to-give-gift="openFriendsIndex('gift')"
            @update:cal-order-cost="handleCostUpdate"
            @navigate-to="handleNavigation"
            @update:input-amount="handleUpdateInputAmount"
          />
        </template>
      </BottomModal>

      <FullModal :is-visible="isShowFullModal1" v-bind="fullModalProps1" @close="toggleFullModal1">
        <template #content><ViewDetailItem :image-name="RewardImage1" /></template>
      </FullModal>

      <FullModal
        :is-visible="isShowFullModal2"
        v-bind="fullModalProps2"
        @close="toggleFullModal2"
        @confirm="onConfirmFullModal"
      >
        <template #content>
          <FriendsIndex
            v-model="friendsIndexSelectedId"
            :action-type="currentActionType"
            @selected-image-path="handleSelectedImagePath"
            @selected-friend-id="handleSelectedNickname"
          />
        </template>
      </FullModal>

      <BottomToastSlot v-model="showToast" type="success" :duration="3000">
        <p>
          {{ selectedFriendNickname }}님에게{{ selectedItem?.name }}&nbsp;{{ toastInputAmount }}개를 조르기 완료했어요!
        </p></BottomToastSlot
      >
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import PointStoreSummaryCard from '~/components/publishing/point/PointStoreSummaryCard.vue'
import PointStoreItemWrap from '~/components/publishing/point/PointStoreItemWrap.vue'
import PointStoreCouponWrap from '~/components/publishing/point/PointStoreCouponWrap.vue'
import PointStoreTicketWrap from '~/components/publishing/point/PointStoreTicketWrap.vue'
import PointStoreSubscribeWrap from '~/components/publishing/point/PointStoreSubscribeWrap.vue'
import ChallengeItem from '~/components/publishing/point/ChallengeItem.vue'
import MobileCoupon from '~/components/publishing/point/MobileCoupon.vue'
import SearchResult from '~/components/publishing/point/SearchResult.vue'
import ViewDetailItem from '~/components/publishing/point/ViewDetailItem.vue'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import RewardImage2 from '~/assets/images/lottery/img-reward-2.svg'
import RewardImage3 from '~/assets/images/lottery/img-reward-3.svg'
import RewardImage5 from '~/assets/images/lottery/img-reward-5.svg'
import RewardImage8 from '~/assets/images/lottery/img-reward-8.svg'
import RewardImage9 from '~/assets/images/lottery/img-reward-9.png'
import RewardImage10 from '~/assets/images/lottery/img-reward-10.png'
import RewardImage11 from '~/assets/images/lottery/img-reward-11.png'
import OrderItem from '~/components/publishing/point/OrderItem.vue'
import FriendsIndex from '~/components/publishing/point/FriendsIndex.vue'
import ParticipateTicketItem from '~/components/publishing/point/ParticipateTicketItem.vue'
import SubscribeTicketItem from '~/components/publishing/point/SubscribeTicketItem.vue'
import TicketImage1 from '~/assets/images/lottery/img-ticket-1.svg'
import TicketImage2 from '~/assets/images/lottery/img-ticket-2.svg'
import TicketImage3 from '~/assets/images/lottery/img-ticket-3.svg'
import TicketImage4 from '~/assets/images/lottery/img-ticket-4.svg'
import SubImage1 from '~/assets/images/lottery/img-sub-1.svg'
import SubImage2 from '~/assets/images/lottery/img-sub-2.svg'
import SubImage3 from '~/assets/images/lottery/img-sub-3.svg'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import PurchasePackageButton from '~/components/publishing/point/PurchasePackageButton.vue'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
interface StoreItem {
  imageName: string
  name: string
  point: string
  brand?: string
}
const isShowBottomModal = ref(false)
const isShowBottomModal2 = ref(false)
// 선물받기 모달 props
const selectedItem = ref<StoreItem | null>(null)
const router = useRouter()
const currentCost = ref(0)
const handleCostUpdate = (cost: number) => {
  currentCost.value = cost
}

const bottomModalProps = computed(() => {
  const isAnyFriendSelected =
    begFriendImagePath.value !== '' || giftFriendImagePath.value !== '' || friendsIndexSelectedId.value !== ''
  // 친구가 선택되었다면 disabled
  const shouldBeDisabled = isAnyFriendSelected

  return {
    title: '주문하기',
    isShowCloseButton: true,
    isShowCancelButton: false,
    isShowConfirmButton: true,
    confirmButtonText: `${currentCost.value}P 주문하기`,
    disabledCancelButton: false,
    disabledConfirmButton: shouldBeDisabled
  }
})

const bottomModalProps2 = computed(() => {
  return {
    title: '주문하기',
    isShowCloseButton: true,
    isShowCancelButton: false,
    isShowConfirmButton: true,
    confirmButtonText: `${currentCost.value}P 주문하기`,
    disabledCancelButton: false
  }
})
// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '구독권', code: 'item' },
  { name: '챌린지 아이템', code: 'item' },
  { name: '모바일 교환권', code: 'Coupon' }
]
const lineActiveIndex = ref(1)

// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
}
const toggleBottomModal = (item: StoreItem | null = null) => {
  if (item) {
    selectedItem.value = item // 아이템 정보 저장
  } else {
    selectedItem.value = null
    // 하단 모달이 닫힐 때 친구 이미지 경로 및 버튼 상태 초기화
    begFriendImagePath.value = ''
    giftFriendImagePath.value = ''
    friendsIndexSelectedId.value = ''
  }
  isShowBottomModal.value = !isShowBottomModal.value
}

// 상품정보 상세보기
const isShowFullModal1 = ref(false)
const toggleFullModal1 = () => {
  isShowFullModal1.value = !isShowFullModal1.value
}
// 상품정보 상세보기 클릭
const handleSeeMoreInfo = () => {
  toggleFullModal1()
}
const fullModalProps1 = ref({
  title: '상품정보 상세보기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 친구 목록
const isShowFullModal2 = ref(false)
const toggleFullModal2 = () => {
  isShowFullModal2.value = !isShowFullModal2.value
}
const toggleBottomModal2 = () => {
  isShowBottomModal2.value = !isShowBottomModal2.value
  // 하단 모달이 닫힐 때 친구 이미지 경로 및 버튼 상태 초기화
  begFriendImagePath.value = ''
  giftFriendImagePath.value = ''
  friendsIndexSelectedId.value = ''
}

const fullModalProps2 = ref({
  title: '선물하기',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  disabledCancelButton: false,
  disabledConfirmButton: false,
  confirmButtonText: '선택하기'
})
const currentActionType = ref<'beg' | 'gift' | null>(null)
// '조르기' 버튼에 표시될 친구 이미지 경로
const begFriendImagePath = ref('')
// '선물하기' 버튼에 표시될 친구 이미지 경로
const giftFriendImagePath = ref('')

// FullModal
const openFriendsIndex = (actionType: 'beg' | 'gift') => {
  currentActionType.value = actionType // 현재 액션 타입 저장
  fullModalProps2.value.title = actionType === 'beg' ? '조르기' : '선물하기'
  fullModalProps2.value.confirmButtonText = actionType === 'beg' ? '조르기' : '선택하기'
  toggleFullModal2()
}

const handleSelectedImagePath = (imagePath: string) => {
  if (currentActionType.value === 'beg') {
    begFriendImagePath.value = imagePath
  } else if (currentActionType.value === 'gift') {
    giftFriendImagePath.value = imagePath
  }
}
const selectedFriendNickname = ref('')
const handleSelectedNickname = (nickname: string) => {
  console.log('선택된 친구 닉네임:', nickname)
  selectedFriendNickname.value = nickname
}
const handleNavigation = (path: string) => {
  router.push(path)
}
const showToast = ref(false)
// FullModal의 confirm 이벤트가 발생했을 때 호출될 함수
const onConfirmFullModal = () => {
  // 전체 모달을 닫기
  toggleFullModal2()
  if (currentActionType.value === 'beg') {
    // 조르기일 때
    showToast.value = true
  } else if (currentActionType.value === 'gift') {
    // 선물하기일 때
    isShowBottomModal.value = false
    isShowBottomModal2.value = true
  }

  // 액션 타입 초기화
  currentActionType.value = null
}

// FriendsIndex에서 v-model로 관리될 값
const friendsIndexSelectedId = ref('')
const toastInputAmount = ref('1') //
const handleUpdateInputAmount = (amount: string | number) => {
  toastInputAmount.value = amount.toString()
}
// 챌린지 참가권 데이터
const ParticipateTickets: StoreItem[] = [
  {
    imageName: TicketImage1,
    brand: '챌린지 참가권',
    name: '1회권',
    point: '15,000'
  },
  {
    imageName: TicketImage2,
    brand: '챌린지 참가권',
    name: '5회권',
    point: '75,000'
  },
  {
    imageName: TicketImage3,
    brand: '챌린지 참가권',
    name: '10회권',
    point: '150,000'
  },
  {
    imageName: TicketImage4,
    brand: '챌린지 참가권',
    name: '30회권',
    point: '450,000'
  }
]

// 구독권 데이터 데이터
const SubscribeTickets: StoreItem[] = [
  {
    imageName: SubImage1,
    brand: '구독권',
    name: '1개월 구독권',
    point: '15,000'
  },
  {
    imageName: SubImage2,
    brand: '구독권',
    name: '6개월 구독권',
    point: '75,000'
  },
  {
    imageName: SubImage3,
    brand: '구독권',
    name: '12개월 구독권',
    point: '150,000'
  }
]

// 챌린지 아이템 데이터
const ChallengeItems: StoreItem[] = [
  {
    imageName: RewardImage2,
    name: '1시간 걸음수 2배',
    point: '3,000'
  },
  {
    imageName: RewardImage3,
    name: '2시간 걸음수 2배',
    point: '5,000'
  },
  {
    imageName: RewardImage8,
    name: '4시간 걸음수 2배',
    point: '8,000'
  },
  {
    imageName: RewardImage5,
    name: '8시간 걸음수 2배',
    point: '15,000'
  }
]

// 모바일 교환권 데이터
const couponItems: StoreItem[] = [
  {
    imageName: RewardImage9,
    brand: '메가MGC커피',
    name: '(HOT)아메리카노',
    point: '1,500'
  },
  {
    imageName: RewardImage1,
    brand: '스타벅스',
    name: '(HOT)아메리카노',
    point: '4,700'
  },
  {
    imageName: RewardImage10,
    brand: '투썸플레이스',
    name: '딸기 생크림 1호',
    point: '34,000'
  },
  {
    imageName: RewardImage11,
    brand: '맥도날드',
    name: '빅맥버거 세트',
    point: '7,200'
  }
]
</script>
