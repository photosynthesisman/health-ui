<template>
  <div class="wrap-result-lists">
    <div v-for="(item, index) in hospitalData" :key="index" class="item">
      <div class="item-header">
        <div class="wrap-hospital">
          <img :src="item.logoSrc" :alt="item.name" />
          <div class="wrap-hospital-info">
            <div class="name">{{ item.name }}</div>
            <Button
              btn-type="primary"
              element-type="button"
              aria-label="분석하기"
              class="xs ml-auto"
              :width="7.8"
              @click="clickAgree"
            />
          </div>
        </div>
      </div>
      <div class="detail-lists">
        <div class="detail-item has-link">
          <div class="tit">진료내역</div>
          <button type="button" class="icon-arrow-right" @click="openFullModal(item)"></button>
        </div>
        <div class="detail-item">
          <div class="tit">총 진료내역</div>
          <div class="price">{{ item.totalRecords }}건</div>
        </div>
        <div class="detail-item">
          <div class="tit">숨은 보상금 찾기 가능한 내역</div>
          <div class="price">{{ item.claimableRecords }}건</div>
        </div>

        <template v-if="item.analysisResult">
          <div class="detail-item has-link">
            <div class="tit">최근 신청결과</div>
            <button type="button" class="icon-arrow-right"></button>
          </div>
          <div class="detail-item">
            <div class="tit">신청일시</div>
            <div class="price">{{ item.applicationDate }}</div>
          </div>
          <div class="detail-item">
            <div class="tit">AI 분석결과</div>
            <CommonBadge :color="'blue'">{{ item.analysisResult }}</CommonBadge>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
const emit = defineEmits<{
  openAgree: []
  openModal: [hospital: { name: string; logoSrc: string }]
}>()
defineProps<{
  hospitalData: {
    logoSrc: string
    name: string
    totalRecords: number
    claimableRecords: number
    applicationDate: string | null
    analysisResult: string | null
  }[]
}>()

const clickAgree = () => {
  emit('openAgree')
}
const openFullModal = (hospital: { name: string; logoSrc: string }) => {
  emit('openModal', hospital)
}
</script>

<style scoped lang="scss">
.wrap-result-lists {
  background-color: #f4f4f4;
  .item {
    border-radius: 1.2rem;
    background-color: #fff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(justify-between items-center);
      .wrap-hospital {
        width: 100%;
        @include mixin.flex-container(items-center);
        gap: 1.6rem;
        img {
          width: 4.8rem;
          height: 4.8rem;
          flex-shrink: 0;
        }
        .wrap-hospital-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .name {
            font-weight: 700;
          }
          .wrap-info {
            @include mixin.flex-container(items-center);
            gap: 1.2rem;
            .item-info {
              font-size: 1.4rem;
              color: #555555;
              position: relative;
              &:not(:first-child)::before {
                content: '';
                display: inline-block;
                width: 0.1rem;
                height: 1.2rem;
                background-color: #e2e2e2;
                position: absolute;
                top: 50%;
                left: -0.6rem;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
    .detail-lists {
      margin-top: 1.6rem;
      .detail-item {
        &.has-link {
          .tit {
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 2rem;
            color: #2b2b2b;
          }
          & + .detail-item {
            margin-top: 1.6rem;
          }
        }
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        & + .has-link {
          margin-top: 2.4rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .price {
          font-size: 1.4rem;
          font-weight: 600;
          strong {
            font-size: 1.6rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
.icon-arrow-right {
  position: relative;
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
  background-size: 100%;
  @include mixin.rippleEffectPrimary;
}
</style>
