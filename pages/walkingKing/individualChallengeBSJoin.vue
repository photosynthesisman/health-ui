<template>
  <BaseBody
    :has-share="true"
    page-title="걷기왕 챌린지"
    :show-back-button="true"
    style="background-color: #fefefe"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <RecruitmentindividualChallengeCard />
    <FlexColDiv class="gap-20 mt-24 mb-32">
      <RecruitmentGuidelines :type="'date'" :title="'모집기간'" :detail="'2025.05.15 ~ 챌린지 종료까지'" />
      <RecruitmentGuidelines :type="'method'" :title="'진행방식'" :detail="'팀전(4인)/무조건 많이 걷기'" />
      <RecruitmentGuidelines :title="'참가방식'" :detail="'12,000P 유료참가 / FREE 무료참가'" />
    </FlexColDiv>
    <hr class="hr-section mt-0 mb-8 ml-n20 mr-n20" />
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    <div v-if="activeLineTab === 'info'">
      <FlexColDiv class="gap-24 mg-48y">
        <div>
          <P class="mb-6 fz-18">걸어서 회사까지! 뛰어서 집까지! </P>
          <h3 class="fz-30 bold">16th 하이워킹 챌린지</h3>
        </div>
        <p>
          이제 완연한 봄을 느낄 수 있는 계절이 왔어요. 날씨가 풀리고 기온도 따스해짐에 따라 밖에서 산책하고 싶은 마음도
          강해지는 시기죠! 산책도 물론 기분 좋긴 하지만, 바쁜 직장인들을 위해 출근, 퇴근시간 잠깐씩 짬내서 걸어보는
          출퇴근 러닝 챌린지를 준비했어요.
          <br />
          <br />
          기분 좋은 봄날 출퇴근 러닝 챌린지와 함께라면 월요일도 두렵지 않아~! 건강도 챙기고 봄날씨도 만끽하고 매일 미션
          완료해서 행운 복권 담첨 기회도 잡아보세요!
        </p>
        <img src="~/assets/images/walkingking/img-banner-1.png" alt="" />
        <p>
          이번 출퇴근 러닝 챌린지 1등 상품은 뉴욕 패션위크에서 주목받은 에르메스 신상백이예요. 참가자가 많아질수록
          행운복권 리워드 상품은 계속 늘어납니다. 구간 미션을 클리어 할때마다 행운 복권 당첨 기회를 놓치지 마세요!!
        </p>
        <img src="~/assets/images/walkingking/img-banner-2.png" alt="" />
        <p>드링킹 모아서 걸음수 2배 부스터 효과로 걸음수 UP!! 매일 미션과 포인트 구매 혜택으로 드링킹을 모아보세요!</p>
        <img src="~/assets/images/walkingking/img-banner-3.png" alt="" />
      </FlexColDiv>
    </div>
    <div v-else-if="activeLineTab === 'goods'">
      <RewardTitWrap
        :badge="'혜택 1'"
        :title="'챌린지 WINNER 리워드 상품'"
        :detail="'유료 참가자의 최종순위로 리워드 지급'"
      />
      <FlexSection class="mt-32 mb-48 gap-12">
        <RewardGoodsWrap
          :type="'1st'"
          :src="'img-reward-1.png'"
          :title="'에르메스'"
          :detail="'Bolide 1923 미니백 오랑쥬 필드'"
        />
        <RewardGoodsWrap
          :type="'2nd'"
          :src="'img-reward-2.png'"
          :title="'삼성전자'"
          :detail="'갤럭시워치7 실버 44mm GPS+블루투스'"
        />
        <RewardGoodsWrap
          :type="'3rd'"
          :src="'img-reward-3.png'"
          :title="'삼성전자'"
          :detail="'갤럭시핏3 그레이 256MB, 블루투스'"
        />
        <FlexRowDiv class="gap-12">
          <RewardGoodsSmallWrap
            :src="'img-reward-4.png'"
            :rank="'4~10등'"
            :title="'신세계'"
            :detail="'10만원 상품권'"
          />
          <RewardGoodsSmallWrap
            :src="'img-reward-5.png'"
            :rank="'11~30등'"
            :title="'스타벅스'"
            :detail="'아메리카노 기프트콘'"
          />
        </FlexRowDiv>
      </FlexSection>
      <LotteryRewardWrap>
        <RewardTitWrap :badge="'혜택 2'" :title="'행운복권 리워드 상품'" :detail="'챌린지 진행 중 랜덤으로 지급'" />
        <FlexColDiv class="mt-32 gap-12">
          <FlexRowDiv class="gap-12">
            <LotteryRewardBox :src="'img-lottery-reward1.png'" :title="'루이비통'" :detail="'가죽 여성 크로스백'" />
            <LotteryRewardBox :src="'img-lottery-reward2.png'" :title="'도미노피자'" :detail="'블록버스터L+콜라'" />
          </FlexRowDiv>
          <FlexRowDiv class="gap-12">
            <LotteryRewardBox :src="'img-lottery-reward3.png'" :title="'크리스피도넛'" :detail="'글레이즈드더즌'" />
            <LotteryRewardBox :src="'img-lottery-reward4.png'" :title="'BBQ'" :detail="'황금올리브치킨+콜라'" />
          </FlexRowDiv>
          <FlexRowDiv class="gap-12">
            <LotteryRewardBox :src="'img-lottery-reward5.png'" :title="'교촌치킨'" :detail="'허니콤보웨지감자세트'" />
            <LotteryRewardBox :src="'img-lottery-reward6.png'" :title="'스타벅스'" :detail="'커플세트 기프트콘'" />
          </FlexRowDiv>
        </FlexColDiv>
      </LotteryRewardWrap>
      <RewardTitWrap :badge="'혜택 3'" :title="'미션 리워드 상품'" :detail="'챌린지 진행 중 구간미션 달성 시 지급'" />
      <TableWrap :table-data="tableData" class="mt-32" />
      <hr class="hr-section mt-48 ml-n20 mr-n20" />
      <RewardTitWrap
        mission
        :badge="'챌린지 미션'"
        :title="'챌린지 부스터 미션'"
        :detail="'매일 미션수행을 통한 부스터로 걸음 수를 올려보세요!'"
      />
      <FlexColDiv class="mt-32 gap-12 pb-48">
        <ChallengeBoosterMission
          :src="'img-mission1.png'"
          :title="'Daily 미션 달성 시'"
          :detail="'부스터 미션 수행해주세요'"
          :steps="'+1,000걸음'"
        />
        <ChallengeBoosterMission
          :src="'img-mission2.png'"
          :title="'커뮤니티 글 등록 시'"
          :detail="'챌린지 후기를 작성해주세요'"
          :steps="'+500걸음'"
        />
        <ChallengeBoosterMission
          :src="'img-mission3.png'"
          :title="'섭취음식 하루 3회 등록 시'"
          :detail="'식단관리를 위해 등록해주세요'"
          :steps="'+300걸음'"
        />
      </FlexColDiv>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      :aria-label="buttonAriaLabel"
      :disabled="isButtonDisabled"
      class="md w-full medium btn-sticky"
      @click="toggleBottomModal()"
    />
  </ButtonGroup>
  <!-- 챌린지 참가하기 모달 -->
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @close="toggleBottomModal"
    @confirm="handleConfirm"
    @cancel="handleCancle"
  >
    <template #content> <JoinChallengeModal /></template>
  </BottomModal>

  <BottomToastSlot v-model="showToast" type="success" :duration="3000">
    <p>참가신청이 완료되었습니다.</p></BottomToastSlot
  >
  <!-- 챌린지 메뉴 모달 -->
  <BottomModal
    :is-visible="isShowChallengeMenuModal"
    v-bind="ChallengeMenuModalProps"
    @close="toggleChallengeMenuModal"
  >
    <template #content>
      <ul>
        <li>
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">응원하기</p></NuxtLink>
        </li>
        <li>
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">참가 취소하기</p> </NuxtLink>
        </li>
        <li v-if="challengeProgressing">
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">챌린지 상세보기</p> </NuxtLink>
        </li>
      </ul>
    </template>
  </BottomModal>

  <!-- 무료참가 선택 시 -->
  <BaseModal
    :is-visible="isShowAttendFreeModal"
    v-bind="AttendFreeModalProps"
    @close="toggleAttendFreeModal"
    @cancel="toggleAttendFreeModal"
    @confirm="onAttendFreeConfirm"
  >
    <template #content>
      <ChallengeAttendConfirm
        :title="'무료참가의 경우 챌린지 최종순위의 혜택은 받을 수 없습니다.'"
        :subtit="'무료로 참가 신청하시겠습니까?'"
      />
    </template>
  </BaseModal>
  <!-- 유료참가 선택 시 -->
  <BaseModal
    :is-visible="isShowAttendPaidModal"
    v-bind="AttendPaidModalProps"
    @close="toggleAttendPaidModal"
    @cancel="toggleAttendPaidModal"
    @confirm="onAttendPaidConfirm"
  >
    <template #content>
      <ChallengeAttendConfirm
        :title="'챌린지 참가를 위해서 5,000P가 필요합니다.'"
        :subtit="'유료로 참가 신청하시겠습니까?'"
      />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecruitmentindividualChallengeCard from '~/components/publishing/walkking/RecruitmentindividualChallengeCard.vue'
import RecruitmentGuidelines from '~/components/publishing/walkking/RecruitmentGuidelines.vue'
import RewardTitWrap from '~/components/publishing/walkking/RewardTitWrap.vue'
import RewardGoodsWrap from '~/components/publishing/walkking/RewardGoodsWrap.vue'
import RewardGoodsSmallWrap from '~/components/publishing/walkking/RewardGoodsSmallWrap.vue'
import LotteryRewardWrap from '~/components/publishing/walkking/LotteryRewardWrap.vue'
import LotteryRewardBox from '~/components/publishing/walkking/LotteryRewardBox.vue'
import ChallengeBoosterMission from '~/components/publishing/walkking/ChallengeBoosterMission.vue'
import ChallengeAttendConfirm from '~/components/publishing/walkking/ChallengeAttendConfirm.vue'
import JoinChallengeModal from '~/components/publishing/walkking/JoinChallengeModal.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import TableWrap from '~/components/common/tableWrap.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal, BaseModal } from '@lemonhc/fo-ui/components/modal'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'

// 레이아웃에서 addTextClick 핸들러 등록 기능 가져오기
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')
// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(clickChallengeMenuModal)
  }
})

const showToast = ref(false) // 토스트 표시 상태
const isShowBottomModal = ref(true) // 챌린지 참가 모달 표시 상태
const buttonAriaLabel = ref('챌린지 참가하기')
const isButtonDisabled = ref(false)

// 유료 참가 버튼 클릭 시
const handleConfirm = async () => {
  await handleAttendPaid()
  isShowBottomModal.value = false
}
// 무료 참가 버튼 클릭 시
const handleCancle = async () => {
  await handleAttendFree()
  isShowBottomModal.value = false
}
// 챌린지 참가하기 버튼 클릭(바텀 모달 호출)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
// 챌린지 참가하기 모달 props
const bottomModalProps = ref({
  title: '챌린지 참가하기',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '유료참가',
  cancelButtonText: '무료참가',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// LineTabs 상태 관리
const activeLineTab = ref('info')

const lineTabs = ref<Tab[]>([
  { title: '챌린지 상세정보', key: 'info' },
  { title: '리워드 상품', key: 'goods' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

const tableData = {
  cols: [{ width: '9.2rem' }],
  headers: [],
  body: [
    [{ type: 'th', text: '포인트', rowspan: 4 }, { text: '1P 적립' }, { text: '5P 적립' }],
    [{ text: '10P 적립' }, { text: '50P 적립' }],
    [{ text: '100P 적립' }, { text: '500P 적립' }],
    [{ text: '1,000P 적립' }, { text: '2,000P 적립' }],
    [
      { type: 'th', text: '포인트', rowspan: 4 },
      { text: '1hrx2 (4시간 2배 걸음)', colspan: 2 }
    ],
    [{ text: '2hrx2 (4시간 2배 걸음)', colspan: 2 }],
    [{ text: '3hrx2 (4시간 2배 걸음)', colspan: 2 }],
    [{ text: '4hrx2 (4시간 2배 걸음)', colspan: 2 }],
    [
      { type: 'th', text: '포인트', rowspan: 3 },
      { text: '메가커피 아메리카노', colspan: 2 }
    ],
    [{ text: '스타벅스 카페라떼', colspan: 2 }],
    [{ text: '투썸플레이스 조각케익', colspan: 2 }]
  ]
}
// 챌린지 진행 중 상태
const challengeProgressing = false
// 챌린지 메뉴 ref
const isShowChallengeMenuModal = ref(false)
// 챌린지 메뉴 props
const ChallengeMenuModalProps = ref({
  title: '챌린지 메뉴',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 챌린지 메뉴 모달 토글
const toggleChallengeMenuModal = () => {
  isShowChallengeMenuModal.value = !isShowChallengeMenuModal.value
}
// 챌린지 메뉴 클릭
const clickChallengeMenuModal = () => {
  isShowChallengeMenuModal.value = true
}

// 무료참가 확인 모달 ref
const isShowAttendFreeModal = ref(false)
// 무료참가 확인 모달 Props
const AttendFreeModalProps = ref({
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신청',
  cancelButtonText: '아니오',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const handleAttendFree = () => {
  isShowAttendFreeModal.value = true
}
const toggleAttendFreeModal = () => {
  isShowAttendFreeModal.value = !isShowAttendFreeModal.value
}
const onAttendFreeConfirm = () => {
  showToast.value = true
  isShowAttendFreeModal.value = false
  buttonAriaLabel.value = '123번째 참가신청 완료'
  isButtonDisabled.value = true
}

// 유료참가 확인 모달 ref
const isShowAttendPaidModal = ref(false)
// 유료참가 확인 모달 Props
const AttendPaidModalProps = ref({
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신청',
  cancelButtonText: '아니오',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const handleAttendPaid = () => {
  isShowAttendPaidModal.value = true
}
const toggleAttendPaidModal = () => {
  isShowAttendPaidModal.value = !isShowAttendPaidModal.value
}
const onAttendPaidConfirm = () => {
  showToast.value = true
  isShowAttendPaidModal.value = false
  buttonAriaLabel.value = '123번째 참가신청 완료'
  isButtonDisabled.value = true
}
</script>

<style scoped lang="scss"></style>
