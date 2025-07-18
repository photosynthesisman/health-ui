<template>
  <BaseBody page-title="스마트링 권한" :show-back-button="true">
    <FullModal :is-visible="isShowFullModal" v-bind="fullModalProps" @close="toggleFullModal">
      <template #content>
        <GuidePopDetail
          :title="'참고'"
          :table-data="customTableData"
          :list-items="guideList1"
          :additional-items="guideList2"
        />
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import GuidePopDetail from '~/components/smartRing/GuidePopDetail.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import { ref } from 'vue'

const isShowFullModal = ref(true)

const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}
const fullModalProps = ref({
  title: '활력 점수란?',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const guideList1 = ref([
  '스마트링 사용 전 배터리를 완전히 충전해주세요.',
  '스마트폰과 블루투스 연결을 확인해주세요.',
  '정확한 데이터 측정을 위해 올바른 착용법을 지켜주세요.정확한 데이터 측정을 위해 올바른 착용법을 지켜주세요.정확한 데이터 측정을 위해 올바른 착용법을 지켜주세요.정확한 데이터 측정을 위해 올바른 착용법을 지켜주세요.'
])
const guideList2 = ref([
  '스마트링 사용 전 배터리를 완전히 충전해주세요.',
  '스마트폰과 블루투스 연결을 확인해주세요.',
  '정확한 데이터 측정을 위해 올바른 착용법을 지켜주세요.'
])
const customTableData = ref({
  cols: [{ width: '8rem' }, { width: '9.2rem' }, { width: 'auto' }],
  headers: [[{ text: '점수 범위' }, { text: '스트레스 수준' }, { text: '설명' }]],
  body: [
    [
      { text: '91~100점' },
      { content: h('div', { class: 'level-badge highest' }, '최상')},
      { text: '에너지가 넘치고 신체 회복이 최적 상태입니다. 일상 활동과 집중력 유지에 매우 유리한 상태입니다.' }
    ],
    [
      { text: '81~90점' },
      { text: '좋음' },
      { text: '대체로 안정적이며 건강한 컨디션을 유지하고 있습니다. 가벼운 활동부터 무리 없이 수행할 수 있습니다.' }
    ],
    [
      { text: '71~80점' },
      { text: '보통' },
      {
        text: '기본적인 활력은 유지되지만 약간의 피로감이나 스트레스 신호가 나타날 수 있습니다. 규칙적인 휴식과 건강 관리가 필요합니다.'
      }
    ],
    [
      { text: '61~70점' },
      { text: '나쁨' },
      {
        text: '신체 회복이 저하되고 피로감이 누적된 상태입니다. 충분한 수면과 스트레스 관리를 보충하는 것이 중요합니다.'
      }
    ],
    [
      { text: '0~60점' },
      { text: '매우나쁨' },
      {
        text: '활력이 크게 저하된 상태로, 피로와 스트레스가 극심할 수 있습니다. 무리한 활동을 피하고 회복에 집중해야 합니다.'
      }
    ]
  ]
})
</script>

<style scoped lang="scss"></style>
