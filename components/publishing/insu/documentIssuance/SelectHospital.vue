<template>
  <div>
    <div class="wrap-info-lists">
      <div class="item">
        청구의신 ‘서류없이청구'로 실손 보험 청구를 완료한 진료 내역에 한해 처방전을 확인할 수 있어요.
      </div>
    </div>
    <div class="tit-form">병원 선택</div>
    <Select
      modal-title="병원"
      select-placeholder="병원을 선택해주세요"
      cancel-button-text="선택"
      :is-show-cancel-btn="false"
      :custom-opts="hospitalOptions"
    />
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
  </div>
</template>
<script setup lang="ts">
import Select from '~/components/publishing/input/Select.vue'
const hospitalOptions = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '삼성서울병원', label: '삼성서울병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '세브란스병원', label: '세브란스병원' },
  { value: '한양대병원', label: '한양대병원' }
]
</script>

<style scoped lang="scss">
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
</style>
