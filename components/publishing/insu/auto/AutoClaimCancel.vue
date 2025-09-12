<template>
  <div class="wrap-insurance-info-list">
    <div v-for="item in cancelListItems" :key="item.id" :item="item" class="item">
      <div class="wrap-item-header">
        <div class="wrap-item-info">
          <img :src="item.imgUrl" :alt="item.hospitalName + ' 로고'" />
          <div class="name">{{ item.hospitalName }}</div>
        </div>
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="해지하기"
          class="xs"
          :width="8"
          @click="clickConfirmModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'

import logoImg from '~/assets/images/insu/logo_KUMedicine.svg'

const clickConfirmModal = async () => {
  const modalContent = `
    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: center; margin-bottom: -2rem;">
      <div style="color: #555555;text-align: left;">고려대학교 안암병원에<br />실손보험 자동청구를 그만하시겠어요?</div>
    </div>`
  await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    title: '안내',
    confirmButtonText: '해지하기'
  })
}

interface CancelList {
  id: string | number
  imgUrl: string
  hospitalName: string
}

const cancelListItems: CancelList[] = [
  {
    id: 1,
    imgUrl: logoImg,
    hospitalName: '경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원경북대학교 병원'
  },
  { id: 2, imgUrl: logoImg, hospitalName: '경북대학교 병원' },
  { id: 3, imgUrl: logoImg, hospitalName: '경북대학교 병원' }
]
</script>

<style scoped lang="scss">
.wrap-insurance-info-list {
  .item {
    padding: 1.6rem 0.4rem;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .wrap-item-header {
      @include mixin.flex-container(justify-between items-center);
      gap: 1.6rem;
      .wrap-item-info {
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        flex: 1;
        min-width: 0;
        img {
          width: 5.6rem;
          height: 5.6rem;
          flex-shrink: 0;
          object-fit: contain;
        }
        .name {
          font-weight: 700;
          flex: 1;
          min-width: 0;
          max-width: 100%;
          @include mixin.ellipsis;
        }
      }
    }
  }
}
</style>
