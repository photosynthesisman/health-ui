<template>
  <BaseBody
    :show-back-button="true"
    page-title="다운로드 서류함"
    logo-type="text"
    :has-close-btn="true"
    :has-add-text-left="true"
  >
    <DownloadStorageItem
      :docs-list="documents"
      @download-document="handleDownloadDocument"
      @reload-list="handleReloadList"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DownloadStorageItem from '~/components/insu/DownloadStorageItem.vue'
import BaseBody from '~/components/layout/BaseBody.vue'

interface Document {
  id: number
  logo: string
  title: string
  documentType: string
  issueDate: string
  periodText: string
  isDownloading: boolean
}

const documents = ref<Document[]>([
  {
    id: 1,
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    title: '서울대학교병원 진료비영수증',
    documentType: '진료비영수증',
    issueDate: '2024.02.20',
    periodText: '유효기간 D-45',
    isDownloading: false
  },
  {
    id: 2,
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    title: '서울대학교병원 진료비영수증',
    documentType: '진료비영수증',
    issueDate: '2024.02.20',
    periodText: '유효기간 D-45',
    isDownloading: true
  },
  {
    id: 3,
    logo: '/_nuxt/assets/images/insu/logo_KUMedicine.svg',
    title: '서울대학교병원 진료비영수증',
    documentType: '진료비영수증',
    issueDate: '2024.02.20',
    periodText: '유효기간 D-45',
    isDownloading: false
  }
])

const handleDownloadDocument = (docId: number) => {
  console.log('다운로드')
}

const handleReloadList = () => {
  console.log('새로고침')
}
</script>

<style scoped lang="scss"></style>
