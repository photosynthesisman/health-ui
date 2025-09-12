<template>
  <BaseBody
    :show-back-button="true"
    page-title="대리청구 첨부서류 다운로드"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <TitleSection title="다운로드 하실<br />첨부서류를 선택해 주세요" class="mt-24" />
    <SelectDocList v-model:selected-docs="selectedDocs" :docs="docList" />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        :aria-label="`${selectedCount}개 다운로드`"
        class="lg w-full medium btn-sticky"
        @click="clickNext"
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import SelectDocList from '~/components/publishing/insu/billingInfo/SelectDocList.vue'

const docList = [
  { id: 'checkbox1', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류1' },
  { id: 'checkbox2', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류2' },
  { id: 'checkbox3', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류3' },
  { id: 'checkbox4', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류4' },
  { id: 'checkbox5', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류5' },
  { id: 'checkbox6', img: '/_nuxt/assets/images/insu/img-attached-file.png', alt: '서류6' }
]

const selectedDocs = ref<string[]>([])

// 선택된 체크박스 개수 계산
const selectedCount = computed(() => selectedDocs.value.length)

// 다음 버튼 클릭 처리
const clickNext = () => {
  // 다음 단계로 진행하는 로직
  console.log('다음 단계로 진행')
}
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
</script>

<style scoped lang="scss"></style>
