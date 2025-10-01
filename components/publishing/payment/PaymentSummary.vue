<template>
  <div class="w-full">
    <InputLabelText v-if="giftType" :label="label" class="mb-6" />
    <div class="payment-summary-wrap">
      <div v-if="giftType" class="img-box">
        <img :src="imageName" alt="선물 이미지" />
        <div class="txt-box">
          <div>
            <CommonBadge>{{ type }}</CommonBadge>
            <p class="item-name">{{ name }}</p>
          </div>
          <p class="item-point">{{ point }}원</p>
        </div>
      </div>
      <div class="info-box">
        <dl>
          <dt>수량</dt>
          <dd>{{ count }}개</dd>
        </dl>
        <dl>
          <dt>결제금액</dt>
          <dd>{{ cost.toLocaleString() }}원</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
const props = defineProps({
  label: { type: String, default: '보낸선물' },
  giftType: { type: Boolean, default: false },
  imageName: { type: String, default: RewardImage1 },
  name: { type: String, default: '상품 이름' },
  type: { type: String, default: '상품 타입' },
  point: { type: Number, default: 0 },
  count: { type: Number, default: 1 },
  cost: { type: Number, default: 11000 }
})
</script>
<style scoped lang="scss">
.payment-summary-wrap {
  padding: 2rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  .img-box {
    display: flex;
    gap: 2rem;
    width: 100%;
    margin-bottom: 2rem;
    line-height: 2.2rem;
    img {
      width: 8.8rem;
      height: 8.8rem;
    }
    .txt-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .item-name {
      margin-top: 0.6rem;
      font-weight: 500;
    }
    .item-point {
      font-weight: 700;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    dl {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      &:first-child {
        margin-top: 0;
        padding-bottom: 1.2rem;
        border-bottom: 0.1rem solid #eee;
        dt {
          font-size: 1.3rem;
          font-weight: 500;
          line-height: 1.8rem;
          color: #959595;
        }
        dd {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 2rem;
        }
      }
      dt,
      dd {
        font-weight: 700;
        line-height: 2.2rem;
      }
    }
  }
}
</style>
