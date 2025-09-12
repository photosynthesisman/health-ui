<template>
  <div class="medical-payment-box">
    <div class="payment-info">
      <div v-for="paymentInfo in paymentInfosWithCosts" :key="paymentInfo.id" class="payment-info-item">
        <span v-if="paymentInfo.title" class="tit">{{ paymentInfo.title }}</span>
        <span v-if="paymentInfo.price" class="price">{{ paymentInfo.price.toLocaleString() }}원</span>
        <span v-if="paymentInfo.detail" class="price">{{ paymentInfo.detail }}</span>
        <div v-if="paymentInfo.hospitals" class="flex-1">
          <div v-for="hospital in paymentInfo.hospitals" :key="hospital.id" class="hospital-wrap">
            <div class="hospital-box">
              <p class="hospital-name">{{ hospital.name }}</p>
              <p class="paper-tit">{{ hospital.paperTit }}</p>
            </div>
            <p class="paper-cost">{{ hospital.paperCost.toLocaleString() }}원</p>
          </div>
          <div class="total-paper-cost">
            <div class="total-cost-box">
              <p>총 발급비용</p>
              <p class="price">{{ paymentInfo.totalHospitalCost?.toLocaleString() }}원</p>
            </div>
            <div class="point-box">
              <p>포인트 사용</p>
              <p class="point">(-)&nbsp;{{ point.toLocaleString() }}원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payment-total">
      <strong>{{ totalTit }}</strong>
      <strong>{{ totalPrice }}원</strong>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'

interface HospitalInfo {
  id: number
  name: string
  paperTit: string
  paperCost: number
}

interface PaymentInfo {
  id: number
  title?: string
  price?: number
  detail?: string
  hospitals?: HospitalInfo[]
  totalHospitalCost?: number
}

const props = defineProps({
  paymentInfos: {
    type: Array as PropType<PaymentInfo[]>,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  totalTit: {
    type: String,
    default: '총 결제금액'
  },
  point: {
    type: Number,
    default: 0
  }
})

const paymentInfosWithCosts = computed(() => {
  return props.paymentInfos.map(paymentInfo => {
    // hospitals 배열이 존재할 경우에만 총합을 계산
    if (paymentInfo.hospitals) {
      const totalHospitalCost = paymentInfo.hospitals.reduce((acc, hospital) => acc + hospital.paperCost, 0)
      return {
        ...paymentInfo,
        totalHospitalCost // 계산된 총 비용을 객체에 추가
      }
    }
    return paymentInfo
  })
})
</script>
<style lang="scss" scoped>
.medical-payment-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 1.2rem;
  background: #fff;
  padding: 2rem;
  .payment-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .payment-info-item {
    display: flex;
    justify-content: space-between;
    .tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
    .price {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
  .payment-total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e2e2;
    strong {
      line-height: 2.2rem;
    }
  }
}
.hospital-wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  &:first-child {
    border-top: 0.1rem solid #eee;
  }
  .hospital-box {
    display: flex;
    flex-direction: column;
    .hospital-name {
      color: #000;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
    }
    .paper-tit {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      text-overflow: ellipsis;
      color: #959595;
    }
  }
  .paper-cost {
    color: #000;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
}
.total-paper-cost {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 0.1rem solid #eee;
  .total-cost-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    color: #000;
    font-size: 1.4rem;
    font-weight: 600;
  }
  .point-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #959595;
    }
    .point {
      color: var(--blue-primary);
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
