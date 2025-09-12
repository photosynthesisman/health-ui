<template>
  <section class="awards-info-wrap">
    <div class="noti-top">
      <p>출퇴근 러닝 챌린지에 참여해 주신 모든 분들께 진심으로 감사드립니다. 아래와 같이 상금 시상자를 발표드립니다.</p>
      <DotInfoList :items="infoItems" />
      <p>앞으로도 다양한 챌린지가 열릴 예정이니 많은 참여 부탁드립니다.</p>
    </div>
    <div class="awards-table">
      <TableWrap :table-data="tableData" />
    </div>
  </section>
</template>

<script setup lang="ts">
import DotInfoList from '../insu/billingInfo/DotInfoList.vue'
import TableWrap from '~/components/common/tableWrap.vue'

// 상단 유의사항 데이터
const infoItems = [
  '지급 일정: 8월 20일부터 순차 지급 예정',
  '지급 방식: 등록된 본인 명의 계좌로 기타소득세 공제 후 입금',
  '기타 문의는 고객센터로 문의 부탁드립니다.'
]

// 테이블 데이터
const tableData = {
  cols: [{ width: '4.8rem' }, { width: '8.6rem' }, { width: '11.4rem' }, { width: 'auto' }],
  headers: [[{ text: '순위' }, { text: '당첨자ID' }, { text: '연락처' }, { text: '상금' }]],
  body: [
    [{ text: '1' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '31200,000원' }],
    [{ text: '2' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '700,000원' }],
    [{ text: '3' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '500,000원' }],
    [{ text: '4' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '5' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '6' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '7' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '8' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '9' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }],
    [{ text: '10' }, { text: 'lemo*****' }, { text: '010-****-1234' }, { text: '200,000원' }]
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

.awards-table:deep(table) {
  th {
    border-bottom: 0.1rem solid #d5d5d5 !important;
  }
  th,
  td {
    border: none;
    border-bottom: 0.1rem solid #eee;
  }
}
</style>
