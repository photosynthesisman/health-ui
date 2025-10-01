<template>
  <section :class="['my-community-tab', { 'no-community': allCommunities.length === 0 }]">
    <template v-if="allCommunities.length > 0">
      <FlexRowDiv class="space-between align-center">
        <TitleBox title="내가 가입한 커뮤니티" class="mb-0" />
        <!-- 09-23 커뮤니티 탈퇴하기 버튼 삭제 -->
      </FlexRowDiv>
      <div class="community-list">
        <!-- 커뮤니티 삭제 버튼 노출 -->
        <CommunityLink
          v-for="(community, index) in displayedCommunities"
          :key="community.id"
          :url="community.url"
          :member="true"
          :has-new-posts="community.hasNewPosts"
          :community-img="community.communityImg"
          :community-title="community.communityTitle"
          :community-text="community.communityText"
          :community-member="community.communityMember"
          :is-editing="community.isEditing"
          @remove-community="removeCommunity(community, index)"
        />

        <!-- 로딩 스피너 -->
        <div v-if="isLoading" class="loading-spinner">
          <div class="spinner"></div>
        </div>

        <!-- 무한 스크롤 트리거 -->
        <div ref="scrollTrigger" class="scroll-trigger"></div>
      </div>
    </template>

    <div v-else class="empty-state">
      <div class="empty-info">
        <h3 class="empty-title">가입한 커뮤니티가 없어요</h3>
        <p class="empty-description">
          관심분야의 커뮤니티에 가입하고,<br />
          건강한 일상과 정보를 함께 나눠보세요.
        </p>
      </div>
      <div class="empty-icon">
        <img src="~/assets/images/community/img-no-community.svg" alt="" />
      </div>
    </div>
    <Teleport to="body">
      <AlertModal
        :is-visible="isShowAlertModal"
        :content="alertModalContent"
        confirm-button-text="확인"
        @close="toggleAlertModal"
        @confirm="toggleAlertModal"
      />
      <ConfirmModal
        :is-visible="showConfirmModal"
        :is-show-close-button="false"
        :html="ConfirmModalContent"
        confirm-button-text="탈퇴하기"
        cancel-button-text="취소하기"
        @confirm="handleRemoveConfirm"
        @cancel="closeConfirmModal"
        @close="closeConfirmModal"
      />
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommunityLink from '~/components/publishing/community/home/CommunityLink.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
import AlertModal from '~/components/common/modal/AlertModal.vue'
const props = defineProps({
  isEditing: {
    type: Boolean,
    default: true
  }
})
interface CommunityType {
  id: number
  url: string
  communityImg: string
  communityTitle: string
  communityText: string
  communityMember: number
  hasNewPosts: boolean
  isEditing: boolean // 삭제(탈퇴)버튼 노출
}
// 더미 데이터 (실제로는 API에서 가져옴)
const dummyData = [
  {
    id: 1,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,
    hasNewPosts: true
  },
  {
    id: 2,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 3,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 4,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,
    hasNewPosts: true
  },
  {
    id: 5,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 6,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 7,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,
    hasNewPosts: true
  },
  {
    id: 8,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 9,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 10,
    url: '#',
    communityImg: 'community/home/img-community-01.svg',
    communityTitle: '걷기왕 챌린지',
    communityText: '챌린지 함께하면 리워드가 팡팡!',
    communityMember: 23,
    hasNewPosts: true
  },
  {
    id: 11,
    url: '#',
    communityImg: 'community/home/img-community-02.svg',
    communityTitle: '스마트링',
    communityText: '스마트한 건강관리의 시작!',
    communityMember: 23,
    hasNewPosts: false
  },
  {
    id: 12,
    url: '#',
    communityImg: 'community/home/img-community-03.svg',
    communityTitle: '실손청구 노하우',
    communityText: '실손청구의 모든것.',
    communityMember: 23,
    hasNewPosts: false
  }
]
// 상태 관리
const allCommunities = ref(dummyData) // 전체 커뮤니티 데이터
const displayedCommunities = ref([]) // 화면에 표시되는 커뮤니티
const isLoading = ref(false)
const hasMoreData = ref(true)
const currentPage = ref(0)
const itemsPerPage = 10
const scrollTrigger = ref(null)
const isEditing = ref(false) // 삭제(탈퇴)버튼 노출 여부

//  '탈퇴하기' 버튼 클릭 시 호출
const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  // 모든 커뮤니티 아이템의 isEditing 상태 업데이트
  displayedCommunities.value = displayedCommunities.value.map(community => ({
    ...community,
    isEditing: isEditing.value
  }))
}
// 초기 데이터 로드
onMounted(() => {
  loadInitialCommunities()
  setupInfiniteScroll()
})

// 초기 10개 커뮤니티 로드
const loadInitialCommunities = () => {
  if (allCommunities.value.length > 0) {
    const initialItems = allCommunities.value.slice(0, itemsPerPage).map(item => ({
      ...item,
      isEditing: props.isEditing // 초기값 설정
    }))
    displayedCommunities.value = initialItems
    currentPage.value = 1

    // 더 로드할 데이터가 있는지 확인
    hasMoreData.value = allCommunities.value.length > itemsPerPage
  }
}

// 더 많은 커뮤니티 로드 (무한 스크롤)
const loadMoreCommunities = async () => {
  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true

  try {
    // 로딩 시뮬레이션 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const startIndex = currentPage.value * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const newItems = allCommunities.value.slice(startIndex, endIndex).map(item => ({
      ...item,
      isEditing: props.isEditing // 현재 편집 모드 상태 적용
    }))

    if (newItems.length > 0) {
      displayedCommunities.value.push(...newItems)
      currentPage.value++

      // 더 이상 로드할 데이터가 없는지 확인
      if (displayedCommunities.value.length >= allCommunities.value.length) {
        hasMoreData.value = false
      }
    } else {
      hasMoreData.value = false
    }
  } catch (error) {
    console.error('추가 데이터 로드 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 무한 스크롤 설정
const setupInfiniteScroll = () => {
  if (!scrollTrigger.value) return

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && hasMoreData.value && !isLoading.value) {
        loadMoreCommunities()
      }
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  )

  observer.observe(scrollTrigger.value)

  // 컴포넌트 언마운트 시 observer 정리
  onUnmounted(() => {
    observer.disconnect()
  })
}
const indexToRemove = ref(-1)
const communityToRemove = ref<CommunityType | null>(null)

// AlertModal 상태 관리
const isShowAlertModal = ref(false)
const alertModalContent = ref('')
const toggleAlertModal = () => {
  isShowAlertModal.value = !isShowAlertModal.value
}

// confirmModal 상태관리
const showConfirmModal = ref(false)
const handleRemoveConfirm = () => {
  if (indexToRemove.value !== -1 && communityToRemove.value) {
    alertModalContent.value = `${communityToRemove.value.communityTitle}에서 탈퇴 처리가 완료되었습니다.`
    displayedCommunities.value.splice(indexToRemove.value, 1)
    const allIndex = allCommunities.value.findIndex(c => c.id === communityToRemove.value?.id)
    if (allIndex !== -1) {
      allCommunities.value.splice(allIndex, 1)
    }
  }
  closeConfirmModal()
  indexToRemove.value = -1
  communityToRemove.value = null

  toggleAlertModal()
}
const ConfirmModalContent = ref('')
const openExpertMemberModal = () => {
  if (communityToRemove.value) {
    ConfirmModalContent.value = `
      탈퇴 후에는 해당 커뮤니티 활동이 불가합니다.<br/>정말 ${communityToRemove.value.communityTitle}에서 탈퇴하시겠습니까?
    `
    showConfirmModal.value = true
  }
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}

// emit 정의
const emit = defineEmits<{
  'update:count': [count: number]
}>()

// 커뮤니티 개수가 변경될 때마다 부모로 전달
watch(
  () => allCommunities.value.length,
  newCount => {
    emit('update:count', newCount)
  },
  { immediate: true }
)

// 커뮤니티 항목 제거 함수
const removeCommunity = (community: CommunityType, index: number) => {
  indexToRemove.value = index
  communityToRemove.value = community
  openExpertMemberModal()
}
</script>
<style lang="scss" scoped>
.my-community-tab {
  padding: 3.2rem 0;
  &.no-community {
    padding-top: 10rem;
  }
}
.community-list {
  display: flex;
  flex-direction: column;
  & > div:has(.community-link) {
    border-bottom: 1px solid #eee;
  }
}
:deep(.community-link) {
  gap: 2rem;
  padding: 1.6rem 0;
  .community-info {
    .txt {
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: #555;
    }
  }
}
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
  .empty-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    .empty-title {
      font-size: 2rem;
      line-height: 2.6rem;
    }
    .empty-description {
      text-align: center;
      line-height: 2.2rem;
      color: #959595;
    }
  }
  .empty-icon {
    width: 20rem;
    height: 16rem;
  }
}
</style>
