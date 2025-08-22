<template>
  <div class="ml-n20 mr-n20">
    <div class="list">
      <InssueAccordion v-for="item in props.deliveryHistory" :key="item.id" v-model="item.open">
        <template #header>
          <div class="item-header">
            <div class="item-header-top">
              <strong :class="['item-title', item.deliveryStatus]">{{ statusLabel(item.deliveryStatus) }}</strong>
              <Button
                v-if="item.deliveryStatus === 'in_progress'"
                btn-type="text"
                class="sm"
                aria-label="배송정보"
                icon="arrow-type"
                icon-position="right"
              />
            </div>
            <div class="item-header-bottom">
              <div class="item-date">
                <span class="item-date-label">{{ item.label }}</span>
                <span class="item-date-text">{{ item.date }}</span>
              </div>
              <strong class="item-price">{{ priceFormat(totalPrice(item)) }}</strong>
            </div>
          </div>
        </template>
        <template #content>
          <div class="item-content">
            <div class="detail-list">
              <div class="detail-row">
                <span class="label">병원명</span>
                <span class="value">{{ item.hospitalName }}</span>
              </div>
              <div class="detail-row">
                <span class="label">배송신청일자</span>
                <span class="value">{{ item.requestedDate }}</span>
              </div>
              <div class="detail-row">
                <span class="label">배송완료일자</span>
                <span class="value">{{ item.completedDate || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">배송지주소</span>
                <span class="value">{{ item.address }}</span>
              </div>
              <div class="detail-row">
                <span class="label">휴대폰번호</span>
                <span class="value">{{ item.phone }}</span>
              </div>
              <div class="detail-row" v-if="item.memo">
                <span class="label">배송전달사항</span>
                <span class="value">{{ item.memo }}</span>
              </div>
            </div>
            <div class="detail-list">
              <div class="detail-row">
                <span class="label">상품명</span>
                <span class="value">{{ item.productName }}</span>
              </div>
              <div class="detail-row">
                <span class="label">상품명</span>
                <span class="value">{{ item.productName }}</span>
              </div>
              <div class="detail-row">
                <span class="label">상품결제금액</span>
                <span class="value">{{ priceFormat(item.productAmount) }}</span>
              </div>
              <div class="detail-row">
                <span class="label">배송수수료</span>
                <span class="value">{{ priceFormat(item.deliveryFee) }}</span>
              </div>
              <div class="detail-row total">
                <span class="label">총 결제금액</span>
                <span class="value">{{ priceFormat(totalPrice(item)) }}</span>
              </div>
            </div>
          </div>
        </template>
      </InssueAccordion>
    </div>
  </div>
</template>
<script setup lang="ts">
import InssueAccordion from '~/components/insu/InssueAccordion.vue'
import Button from '~/components/publishing/button/Button.vue'

interface DeliveryRecord {
  id: number
  open: boolean
  deliveryStatus: 'requested' | 'in_progress' | 'completed'
  hospitalName: string
  requestedDate: string
  completedDate?: string
  address: string
  phone: string
  memo?: string
  productName: string
  productAmount: number
  deliveryFee: number
  label: string
  date: string
  price: number
}

const props = defineProps<{ deliveryHistory: DeliveryRecord[] }>()

const statusLabel = (status: DeliveryRecord['deliveryStatus']) => {
  switch (status) {
    case 'requested':
      return '배송신청'
    case 'in_progress':
      return '배송중'
    case 'completed':
      return '배송완료'
    default:
      return ''
  }
}

const priceFormat = (price: number) => {
  return price.toLocaleString('ko-KR') + '원'
}

const totalPrice = (item: DeliveryRecord) => {
  return item.productAmount + item.deliveryFee
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 2rem 4.8rem;
  background: #f4f4f4;
}
.item-header {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.item-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-title {
    display: flex;
    align-items: center;
    line-height: 2.2rem;
    gap: 0.6rem;
    &:before {
      display: inline-block;
      content: '';
      width: 2rem;
      height: 2rem;
      background-repeat: no-repeat;
    }
    &.completed {
      &:before {
        background-image: url('/_nuxt/assets/images/insu/icon/ico-completed.svg');
      }
    }
    &.requested {
      &:before {
        background-image: url('/_nuxt/assets/images/insu/icon/ico-requested.svg');
      }
    }
    &.in_progress {
      &:before {
        background-image: url('/_nuxt/assets/images/insu/icon/ico-in_progress.svg');
      }
      color: #000;
    }
  }
  :deep(.text) {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.8rem;
    color: #959595;
  }
}
.item-header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  .item-date {
    display: flex;
    flex-direction: column;

    span {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
  }
  .item-price {
    flex: 1;
    text-align: right;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 0;
  border-top: 1px solid #eee;

  .detail-row {
    display: flex;
    justify-content: space-between;
    gap: 1.2rem;
    .label {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
    .value {
      flex: 1;
      text-align: right;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
