<template>
  <BaseBody page-title="대댓글쓰기" :has-close-btn="true">
    <div v-for="(comment, index) in comments" :key="index">
      <PostDetailComment
        v-if="!comment.isReply"
        :nickname="comment.nickname"
        :author="comment.author"
        :is-deleted="comment.isDeleted"
        :is-reported="comment.isReported"
        @see-more-self="handleSeeMoreClick(index)"
        @see-more-other="handleSeeMoreOtherClick(index)"
      />
      <PostDetailReply
        v-else
        :nickname="comment.nickname"
        :author="comment.author"
        :is-deleted="comment.isDeleted"
        :is-reported="comment.isReported"
        @see-more-self="handleSeeMoreClick(index)"
        @see-more-other="handleSeeMoreOtherClick(index)"
      />
    </div>

    <CommentBox placeholder="댓글을 입력해주세요" />

    <BottomModal
      :is-visible="isShowSeeMoreSelfModal"
      v-bind="SeeMoreSelfModalProps"
      @cancel="clickCancelSeeMoreSelfModal"
      @confirm="deleteComment"
      @close="toggleSeeMoreSelfModal"
    >
      <template #content>
        <div>한 번 삭제한 [게시글/댓글]은 다시 복구할 수 없어요.</div>
      </template>
    </BottomModal>

    <BottomModal
      :is-visible="isShowSeeMoreOtherModal"
      v-bind="SeeMoreOtherModalProps"
      @cancel="clickCancelSeeMoreOtherModal"
      @confirm="reportComment"
      @close="toggleSeeMoreOtherModal"
    >
      <template #content>
        <div>운영자가 검토 후 해당 [게시글/댓글]은 신고 처리됩니다.</div>
      </template>
    </BottomModal>

    <BottomModal
      :is-visible="isShowReportModal"
      v-bind="ReportModalProps"
      @confirm="clickConfirmReportModal"
      @close="toggleReportModal"
    >
      <template #content>
        <ReportBox />
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PostDetailComment from '~/components/publishing/community/board/PostDetailComment.vue'
import PostDetailReply from '~/components/publishing/community/board/PostDetailReply.vue'
import CommentBox from '~/components/publishing/community/board/CommentBox.vue'
import ReportBox from '~/components/publishing/community/board/ReportBox.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

// 현재 선택된 댓글의 인덱스를 저장할 변수
const selectedCommentIndex = ref<number | null>(null)

// 댓글 목록 데이터
const comments = ref([
  { nickname: '당근먹는다람쥐', author: true, isDeleted: false, isReported: false, isReply: false },
  { nickname: '당근먹는다람쥐', author: false, isDeleted: false, isReported: false, isReply: true },
  { nickname: '당근먹는다람쥐', author: true, isDeleted: false, isReported: false, isReply: true },
  { nickname: '당근먹는다람쥐', author: false, isDeleted: false, isReported: false, isReply: true },
  { nickname: '당근먹는다람쥐', author: true, isDeleted: false, isReported: false, isReply: true }
])

// 작성자 본인 댓글 더보기 메뉴 클릭 시
const handleSeeMoreClick = (index: number) => {
  selectedCommentIndex.value = index
  isShowSeeMoreSelfModal.value = true
}
// 타인 댓글 더보기 메뉴 클릭 시
const handleSeeMoreOtherClick = (index: number) => {
  selectedCommentIndex.value = index
  isShowSeeMoreOtherModal.value = true
}

// 작성자 본인 댓글 더보기 모달 초기 상태값
const isShowSeeMoreSelfModal = ref(false)
const SeeMoreSelfModalProps = ref({
  title: '해당 [게시글/댓글]을 삭제하시나요?',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '삭제하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleSeeMoreSelfModal = () => {
  isShowSeeMoreSelfModal.value = false
}
const clickCancelSeeMoreSelfModal = () => {
  isShowSeeMoreSelfModal.value = false
}

// 삭제 이벤트
const deleteComment = () => {
  if (selectedCommentIndex.value !== null) {
    comments.value[selectedCommentIndex.value].isDeleted = true
  }
  isShowSeeMoreSelfModal.value = false
}

// 타인 댓글 더보기 모달 초기 상태값
const isShowSeeMoreOtherModal = ref(false)
const SeeMoreOtherModalProps = ref({
  title: '해당 [게시글/댓글]을 신고하시나요?',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신고하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleSeeMoreOtherModal = () => {
  isShowSeeMoreOtherModal.value = false
}
const clickCancelSeeMoreOtherModal = () => {
  isShowSeeMoreOtherModal.value = false
}

// 신고 이벤트
const reportComment = () => {
  isShowSeeMoreOtherModal.value = false
  isShowReportModal.value = true
}

// 신고하기 모달 초기 상태값
const isShowReportModal = ref(false)
const ReportModalProps = ref({
  title: '신고하기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '신고하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleReportModal = () => {
  isShowReportModal.value = false
}

// 최종 신고 확인 이벤트
const clickConfirmReportModal = () => {
  if (selectedCommentIndex.value !== null) {
    comments.value[selectedCommentIndex.value].isReported = true
  }
  isShowReportModal.value = false
}
</script>
