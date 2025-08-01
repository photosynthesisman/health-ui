<template>
  <div
    v-if="isVisible"
    id="cModalBottom"
    class="c-modal bottom"
    :class="{ 'is-entering': isEntering, 'is-leaving': isLeaving, 'is-show': isVisible }"
    aria-describedby="fullscreenTitle"
  >
    <div class="c-dim" @click="handleClose"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <template v-if="!$slots.header">
          <button
            v-if="isShowCloseButton"
            type="button"
            class="icon c-modal-close-btn ml-auto"
            aria-label="닫기"
            @click="handleClose"
          >
            <i class="icon close"></i>
          </button>
        </template>
      </div>
      <div class="c-modal-body overflow-initial">
        <slot name="content"></slot>
      </div>
      <div class="c-modal-footer sticky">
        <button type="button" class="c-modal-btn cancel">
          <span class="text">전화하기</span>
        </button>
        <button type="button" class="c-modal-btn confirm">
          <span class="text">메세지 보내기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick, computed } from 'vue'
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: '',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const emit = defineEmits<{ (e: ModalEmitEvent): void }>()

const isEntering = ref(false)
const isLeaving = ref(false)

// 모달 표시 상태 변경 감지
watch(
  () => props.isVisible,
  async (newValue, oldValue) => {
    console.log('FullModal isVisible changed:', oldValue, '->', newValue)

    if (newValue) {
      // 모달 열기
      document.body.style.overflow = 'hidden'
      isEntering.value = true
      isLeaving.value = false

      await nextTick()

      // 애니메이션 시작
      setTimeout(() => {
        isEntering.value = false
      }, 0)
    } else {
      // 모달 닫기
      document.body.style.overflow = 'auto'
      isLeaving.value = true
      isEntering.value = false

      // 애니메이션 완료 후 실제로 숨김 처리는 부모에서 관리
      setTimeout(() => {
        isLeaving.value = false
      }, 0)
    }
  },
  { immediate: true }
)

// 모달 닫기
const handleClose = () => {
  emit('close')
}

const onClickCancel = () => {
  emit('close')
}

const onClickConfirm = () => {
  emit('confirm')
}

// computed
const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})

// 컴포넌트 언마운트 시 스크롤 복원
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
