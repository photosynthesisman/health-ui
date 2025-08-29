<template>
  <FlexRowDiv class="list-header">
    <p>최근 공유내역</p>
    <Button
      btn-type="text"
      element-type="button"
      aria-label="전체삭제"
      class="hasLine xs"
      @click="$emit('remove-all')"
    />
  </FlexRowDiv>
  <div class="wrap-hospitals">
    <button v-for="hospital in hospitalList" :key="hospital.id" class="item" @click="handleSelectHospital(hospital)">
      <img :src="hospital.logoSrc" :alt="hospital.name" class="hospital-logo" />
      <div class="wrap-hospital-desc">
        <div class="wrap-desc">
          <span class="tit">{{ hospital.name }}</span>
        </div>
        <div class="wrap-label">
          <CommonBadge v-if="hospital.video" color="blue">영상 공유 가능</CommonBadge>
          <CommonBadge v-if="hospital.email">이메일 발송 가능</CommonBadge>
        </div>
      </div>
      <div class="icon-cancel" @click.stop="$emit('remove-hospital', hospital)">
        <img src="/assets/images/insu/icon-cancel.svg" alt="취소" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import FlexRowDiv from '../page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
defineProps({
  hospitalList: {
    type: Array,
    required: true
  }
})
const handleSelectHospital = hospital => {
  let type = null

  if (hospital.video) {
    type = 'video'
  } else if (hospital.email) {
    type = 'email'
  }
  emit('select-hospital', type, hospital)
}
const emit = defineEmits(['select-hospital', 'remove-hospital', 'remove-all'])
</script>

<style lang="scss" scoped>
.list-header {
  justify-content: space-between;
  padding: 2.1rem 0;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
  }
}
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
