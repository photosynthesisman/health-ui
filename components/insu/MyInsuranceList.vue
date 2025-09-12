<template>
  <TotalItemSort :buttons="sortButtons" @button-click="clickSort" />

  <div class="wrap-grey">
    <div class="wrap-insurance-list">
      <div v-for="(insurance, index) in insuranceList" :key="index" class="wrap-insurance-item">
        <div class="item">
          <div class="item-desc">
            <img :src="insurance.companyLogo" :alt="insurance.companyName" />
            <div class="wrap-desc">
              <div class="tit">{{ insurance.companyName }}</div>
              <div class="tit-sub">{{ insurance.productName }}</div>
              <div class="wrap-label">
                <CommonBadge
                  :class="insurance.status === '정상' ? 'badge-blue badge-solid' : 'badge-gray badge-solid'"
                  >{{ insurance.status }}</CommonBadge
                >
                <CommonBadge>{{ insurance.type }}</CommonBadge>
              </div>
            </div>
          </div>
          <i class="icon icon-arrow-right" @click="toDetail(insurance)"></i>
        </div>
        <div class="wrap-price">
          <div class="text">매월</div>
          <div class="price">{{ insurance.price }}원</div>
        </div>
      </div>
    </div>
    <div v-if="needUpdate" class="wrap-alert-info">내 보험 정보 업데이트가 필요해요.</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
const sortButtons = ref([{ label: '전체', value: 'all', icon: true }])
interface Insurance {
  companyLogo: string
  companyName: string
  productName: string
  status: string
  type: string
  price: string
}

defineProps<{
  insuranceList: Insurance[]
  needUpdate?: boolean
}>()
const emits = defineEmits(['click-sort', 'to-detail'])
const clickSort = () => {
  emits('click-sort')
}
const toDetail = (insurance: Insurance) => {
  emits('to-detail', insurance)
}
</script>

<style lang="scss" scoped>
h2.tit {
  margin-top: 2.4rem;
  font-size: 1.8rem;
  font-weight: 700;
}
.wrap-main-insurance-status {
  position: relative;
  margin-top: 1.6rem;
  padding: 2.4rem 2rem 2rem;
  border-radius: 1.2rem;
  background-color: #4c7ff7;
  .wrap-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .text {
      font-weight: 600;
      color: #ffffff;
    }
    .ico-info {
      background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
      background-size: contain;
      width: 2rem;
      height: 2rem;
      display: block;
    }
    .wrap-more {
      width: 100%;
      border-radius: 0.8rem;
      background-color: #4f5561;
      padding: 2rem;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      display: none;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      z-index: 1;
      &.active {
        display: flex;
      }
      .text {
        font-size: 1.4rem;
        color: #ffffff;
        word-break: keep-all;
        flex: 1 1;
      }
      .ico-cancel-white {
        background: url('/assets/images/insu/icon-cancel-white.svg') no-repeat center center;
        background-size: contain;
        width: 2rem;
        height: 2rem;
        display: block;
      }
    }
  }
  .wrap-status {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 2.6rem;
      font-weight: 600;
      margin-left: 0.2rem;
      color: #ffffff;
      line-height: 130%;
      strong {
        font-weight: 700;
      }
    }
    .btn-reload {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background-color: #7099f9;
      border-radius: 1.4rem;
      padding: 0.6rem 1.2rem;
      .ico-reload {
        background: url('/assets/images/insu/icon-reloading-white.svg') no-repeat center center;
        background-size: contain;
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      .date {
        font-size: 1.2rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .btn-c-insurance-count {
    width: 100%;
    padding: 1.2rem 1.6rem;
    margin-top: 2rem;
    border-radius: 0.8rem;
    background-color: #4776e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .wrap-insurance-text {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        color: #c9d9fd;
        strong {
          font-weight: 600;
          color: #ffffff;
        }
        .ico-info {
          margin-left: 0.6rem;
          background: url('/assets/images/insu/icon-info-white.svg') no-repeat center center;
          background-size: contain;
          width: 2rem;
          height: 2rem;
          display: inline-block;
        }
      }

      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}

.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-insurance-list {
  .wrap-insurance-item {
    border-radius: 1.2rem;
    background-color: #ffffff;
    padding: 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.6rem;
      .item-desc {
        display: flex;
        align-items: center;
        gap: 1.6rem;
        .wrap-desc {
          .tit {
            font-size: 1.6rem;
            font-weight: 700;
            color: #555555;
          }
          .tit-sub {
            margin-top: 0.1rem;
            font-size: 1.4rem;
            font-weight: 400;
            color: #777777;
          }
          .wrap-label {
            margin-top: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
        }
      }
      .icon-arrow-right {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
    .wrap-price {
      margin-top: 1.6rem;
      background-color: #f4f4f4;
      border-radius: 1.2rem;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.4rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
      }
      .price {
        font-weight: 700;
      }
    }
  }
}

.wrap-alert-info {
  width: calc(100% - 4rem);
  position: absolute;
  bottom: 1.6rem;
  left: 2rem;
  padding: 1.5rem 2rem;
  background: var(--Semantic-Background-BG-Dimmed, #000000b2);
  border-radius: 1.2rem;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
}
</style>
