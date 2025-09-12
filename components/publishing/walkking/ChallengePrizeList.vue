<template>
  <section class="awards-info-wrap">
    <div class="noti-top">
      <p>출퇴근 러닝 챌린지에 참여해 주신 모든 분들께 진심으로 감사드립니다. 아래와 같이 상금 시상자를 발표드립니다.</p>
      <DotInfoList :items="infoItems" />
      <p>앞으로도 다양한 챌린지가 열릴 예정이니 많은 참여 부탁드립니다.</p>
    </div>
    <div class="awards-table">
      <h3>A사 마사지기</h3>
      <TableWrap :table-data="tableData1" />
    </div>
    <div class="awards-table">
      <h3>B 브랜드 가방</h3>
      <TableWrap :table-data="tableData2" />
    </div>
  </section>
</template>

<script setup lang="ts">
import DotInfoList from '../insu/billingInfo/DotInfoList.vue'
import TableWrap from '~/components/common/tableWrap.vue'

// 상단 유의사항 데이터
const infoItems = [
  '발송 일정: 8월 20일부터 순차 발송 예정 (단, 경품별 상이할 수 있습니다.)',
  '지급 방법: 등록된 주소지로 택배 발송',
  '기타 문의는 고객센터로 문의 부탁드립니다.'
]

// 테이블 데이터
const tableData1 = {
  cols: [{ width: '4.8rem' }, { width: '15.2rem' }, { width: 'auto' }],
  headers: [[{ text: '번호' }, { text: '당첨자ID' }, { text: '연락처' }]],
  body: [
    [{ text: '1' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '2' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '3' }, { text: 'lemo*****' }, { text: '010-****-1234' }]
  ]
}
const tableData2 = {
  cols: [{ width: '4.8rem' }, { width: '15.2rem' }, { width: 'auto' }],
  headers: [[{ text: '번호' }, { text: '당첨자ID' }, { text: '연락처' }]],
  body: [
    [{ text: '1' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '2' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '3' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '4' }, { text: 'lemo*****' }, { text: '010-****-1234' }],
    [{ text: '5' }, { text: 'lemo*****' }, { text: '010-****-1234' }]
  ]
}
</script>

<style lang="scss" scoped>
.noti-top {
  width: 100%;
  position: relative;
  padding-block: 2.4rem;
  p {
    font-size: 1.4rem;
    line-height: 1.4;
    word-break: break-all;
  }
  &:deep(.wrap-info-lists) {
    padding: 1rem 0;
    .item {
      line-height: 1.4;
      word-break: break-all;
    }
  }
}

.awards-table {
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  :deep(table) {
    th {
      border-bottom: 0.1rem solid #d5d5d5 !important;
    }
    th,
    td {
      border: none;
      border-bottom: 0.1rem solid #eee;
    }
  }
  & + .awards-table {
    margin-top: 2.4rem;
  }
}
</style>
