<template>
  <div class="wrap-hospitals">
    <button v-for="(hospital, idx) in hospitals" :key="idx" class="item">
      <img :src="hospital.logo" :alt="hospital.name + ' 로고'" class="hospital-logo" />
      <div class="wrap-hospital-desc">
        <div class="wrap-desc">
          <span class="tit">{{ hospital.name }}</span>
          <span class="address">{{ hospital.address }}</span>
        </div>
        <div class="wrap-label">
          <div v-if="hospital.my ?? false" class="h-label my">MY병원</div>
          <div class="h-label no-doc">{{ hospital.hospitalType }}</div>
          <div class="h-label">{{ hospital.treatmentType }}</div>
        </div>
      </div>
      <!-- ToDo: 버블링 안되게 코딩 할것 -->
      <div class="icon-cancel">
        <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
        <!-- ToDo: line16에 입력값에 따라 검색된 내용이 나옴. 위는 비활성화, 아래는 활성화 된 모양 -->
        <!-- <img src="/assets/images/insu/icon-arrow-right.svg" alt="화살표" /> -->
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  hospitals: {
    logo: string
    name: string
    address: string
    my?: boolean
    hospitalType: string
    treatmentType: string
  }[]
}>()
</script>

<style lang="scss" scoped>
.wrap-hospitals {
  border-top: 0.1rem solid #eeeeee;
  margin: 0 -2rem;
  padding: 0 2rem;
  .item {
    padding: 2rem 0;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
    }
    .hospital-logo {
      width: 4.8rem;
      height: 4.8rem;
      flex-shrink: 0;
    }
    .wrap-hospital-desc {
      flex: 1 1 auto;
      min-width: 0;
      .wrap-desc {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        text-align: left;
        .tit {
          display: block;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.4;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
        .address {
          display: block;
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1.4;
          color: #555555;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .wrap-label {
        margin-top: 0.4rem;
        display: flex;
        gap: 0.4rem;
        .h-label {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          background-color: #eeeeee;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.3;
          color: #555555;
          &.no-doc {
            background-color: #e5edff;
            color: #4c7ff7;
          }
          &.my {
            background-color: #4c7ff7;
            color: #fff;
          }
        }
      }
    }
    .icon-cancel {
      padding: 0.4rem;
      flex-shrink: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}
</style>
