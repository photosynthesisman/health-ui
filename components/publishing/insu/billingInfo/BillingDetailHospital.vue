<template>
  <div class="wrap-grey">
    <div class="wrap-claim">
      <div class="detail-header">
        <div class="wrap-hospital-info">
          <img :src="logo" :alt="name + ' 로고'" class="img-logo" />
          <div class="text">{{ name }}</div>
        </div>
        <div class="wrap-label">
          <label :class="['h-label', visitLabel]">{{ statusLabel }}</label>
          <label v-if="autoBilling" class="h-label">자동청구</label>
        </div>
      </div>
      <div class="wrap-detail-list">
        <div v-for="(detail, i) in details" :key="i" class="item">
          <div class="item-header">
            <div class="wrap-item-info">
              <div class="item-info">{{ detail.department }}</div>
              <div class="item-info">{{ detail.date }}</div>
            </div>
            <div class="price">{{ detail.amount.toLocaleString() }}원</div>
          </div>
          <div class="wrap-btn">
            <button class="btn-detail">진료비 영수증</button>
            <button class="btn-detail">진료비 세부 내역서</button>
            <button class="btn-detail">처방전</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  logo: string
  name: string
  visitLabel: string
  autoBilling: boolean
  details: {
    department: string
    date: string
    amount: number
  }[]
}>()

const statusLabel = computed(() => {
  switch (props.visitLabel) {
    case 'visit':
      return '통원'
    default:
      return '통원'
  }
})
</script>

<style lang="scss" scoped>
.wrap-grey {
  position: relative;
  margin: 0 -2rem;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-claim {
  padding: 2rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  background-color: #fff;

  .detail-header {
    @include mixin.flex-container(justify-between items-center);

    .wrap-hospital-info {
      @include mixin.flex-container(items-center);
      gap: 1.6rem;
      .img-logo {
        width: 4.8rem;
      }
      .text {
        font-weight: 700;
      }
    }
    .wrap-label {
      @include mixin.flex-container(items-center);
      gap: 0.4rem;
      .h-label {
        padding: 0.3rem 0.6rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #555555;
        background-color: #eeeeee;
        border-radius: 0.4rem;
        &.visit {
          background-color: #ffecdb;
          color: #e75126;
        }
      }
    }
  }
  .wrap-detail-list {
    .item {
      padding-top: 1.6rem;
      &:not(:first-child) {
        margin-top: 1.6rem;
        border-top: 0.1rem solid #eeeeee;
      }
      .item-header {
        @include mixin.flex-container(justify-between items-center);

        .wrap-item-info {
          @include mixin.flex-container(items-center);
          gap: 1.3rem;
          .item-info {
            font-size: 1.3rem;
            font-weight: 500;
            color: #959595;
            position: relative;
            &:not(:first-child) {
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: -0.7rem;
                transform: translateY(-50%);
                border-left: 0.1rem solid #e2e2e2;
                width: 0.1rem;
                height: 1rem;
                background-color: #e2e2e2;
              }
            }
          }
        }
        .price {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
      .wrap-btn {
        margin-top: 1.2rem;
        @include mixin.flex-container(items-center);
        gap: 0.6rem;
        .btn-detail {
          flex: 1 1 auto;
          border-radius: 0.6rem;
          background-color: #e8e8e8;
          padding: 0.8rem 1rem;
          font-size: 1.4rem;
          font-weight: 500;
          color: #555555;
        }
      }
    }
  }
}
</style>
