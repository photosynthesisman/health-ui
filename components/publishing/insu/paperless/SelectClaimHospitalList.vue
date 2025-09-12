<template>
  <div class="wrap-hospital-list">
    <div v-for="(hospital, index) in hospitals" :key="index" class="item">
      <div class="item-subject">
        <img :src="hospital.logo" :alt="hospital.name + ' 로고'" class="logo" />
        <div class="wrap-info">
          <div class="tit">{{ hospital.name }}</div>
          <div class="total">
            <strong>{{ hospital.count }}</strong
            >건
          </div>
        </div>
        <Button
          btn-type="primary"
          element-type="button"
          aria-label="청구하기"
          class="xs fz-14 w-auto pl-16 pr-16 medium"
          @click="emit('click-claim')"
        />
      </div>
      <div class="wrap-bill" :class="{ show: billVisibleStates[index] }">
        <div v-for="(bill, billIndex) in hospital.bills" :key="billIndex" class="wrap-bill-item">
          <div class="item-list">
            <span class="tit">진료일</span>
            <span class="value">{{ bill.date }}</span>
          </div>
          <div class="item-list">
            <span class="tit">진료과</span>
            <span class="value">{{ bill.department }}</span>
          </div>
          <div class="item-list">
            <span class="tit">입원비</span>
            <span class="value">{{ bill.cost }}</span>
          </div>
        </div>
      </div>
      <button class="item-btn" @click="toggleBill(index)">
        <span class="text">{{ billVisibleStates[index] ? '내역접기' : '내역보기' }}</span>
        <img
          src="/assets/images/insu/icon-arrow-down.svg"
          alt="내역보기"
          :class="{ rotated: billVisibleStates[index] }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  hospitals: {
    logo: string
    name: string
    count: number
    bills: { date: string; department: string; cost: string }[]
  }[]
}>()

const emit = defineEmits<{
  (e: 'click-claim'): void
}>()

const billVisibleStates = ref(props.hospitals.map(() => false))

const toggleBill = (index: number) => {
  billVisibleStates.value[index] = !billVisibleStates.value[index]
}
</script>

<style lang="scss" scoped>
.wrap-hospital-list {
  background-color: #f4f4f4;
  padding: 2rem;
  margin-left: -2rem;
  margin-right: -2rem;
  .item {
    background-color: #fff;
    border-radius: 1.2rem;
    & + .item {
      margin-top: 1.2rem;
    }
    .item-subject {
      padding: 2rem 2rem 1.6rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      min-width: 0;
      .logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-info {
        flex: 1 1 auto;
        min-width: 0;
        .tit {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 150%;
          color: #2b2b2b;
          width: 100%;
          @include mixin.ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .total {
          margin-top: 0.1rem;
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 140%;
          color: #2b2b2b;
          strong {
            color: #4c7ff7;
          }
        }
      }
      .c-btn {
        flex-shrink: 0;
      }
    }
    .wrap-bill {
      margin: 0 2rem 1.6rem;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;

      &.show {
        max-height: 50rem; // 충분한 높이로 설정
      }

      .wrap-bill-item {
        background-color: #f4f4f4;
        padding: 2rem;
        border-radius: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        & + .wrap-bill-item {
          margin-top: 1.2rem;
        }
        .item-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tit {
            font-size: 1.3rem;
            font-weight: 500;
            line-height: 140%;
            color: #959595;
          }
          .value {
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 140%;
            color: #2b2b2b;
          }
        }
      }
    }
    .item-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.7rem 0;
      border-top: 0.1rem solid #eeeeee;
      .text {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 140%;
        color: #2b2b2b;
      }
      img {
        margin-left: 0.8rem;
        transition: transform 0.3s ease-in-out;

        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
