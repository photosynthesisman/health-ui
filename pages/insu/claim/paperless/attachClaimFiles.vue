<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <!-- ToDo: 로딩중 -->
    <TitleSection title="진단서 사본 서류를 첨부해 주세요" class="mt-24" />
    <AttachingFileWrap />
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="다음"
        class="lg w-full medium btn-sticky"
        :disabled="hasSelectedHospitals"
        @click="clickBottomModal"
      />
    </ButtonGroup>
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        v-bind="bottomModalProps"
        @cancel="clickCancel"
        @confirm="clickConfirm"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="wrap-radio-btn flex-col gap-8">
            <RadioImg
              id="rdo1"
              name="rdo1"
              checked
              custom-style="button attached-file"
              text="카메라 촬영"
              :icon-src="iconCamera"
              icon-alt="아이콘:카메라 촬영"
            />
            <RadioImg
              id="rdo2"
              name="rdo1"
              custom-style="button attached-file"
              text="앨범에서 선택"
              :icon-src="iconAlbum"
              icon-alt="아이콘:앨범에서 선택"
            />
            <RadioImg
              id="rdo3"
              name="rdo1"
              custom-style="button attached-file"
              text="파일에서 선택"
              :icon-src="iconFile"
              icon-alt="아이콘:파일에서 선택"
            />
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import RadioImg from '~/components/publishing/input/radioImg.vue'
import iconCamera from '~/assets/images/insu/icon-camera.png'
import iconAlbum from '~/assets/images/insu/icon-album.png'
import iconFile from '~/assets/images/insu/icon-file.png'
import AttachingFileWrap from '~/components/publishing/insu/paperless/AttachingFileWrap.vue'

const isShowBottomModal = ref(false)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}
const clickCancel = () => {
  console.log('모달 취소')
}

const clickConfirm = () => {}

const bottomModalProps = ref({
  title: '서류 첨부 방식을 선택해 주세요.',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.wrap-radio-btn {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}
</style>
