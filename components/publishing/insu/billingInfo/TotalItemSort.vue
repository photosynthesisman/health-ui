<template>
  <div class="total-claim">
    <div v-if="total" class="total">
      총 <strong>{{ total }}</strong
      >{{ unit }}
    </div>
    <div class="sort-insurance">
      <button v-for="(btn, idx) in buttons" :key="idx" class="item" @click="$emit('button-click', btn)">
        {{ btn.label }}
        <i v-if="btn.icon" class="icon-filter"></i>
        <i v-if="btn.iconArrow" class="icon-arrow-down"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SortButton {
  label: string
  value: string
  icon?: boolean
  iconArrow?: boolean
}
const props = withDefaults(
  defineProps<{
    unit?: string
    total?: number
    buttons: SortButton[]
  }>(),
  {
    total: 0,
    unit: '건'
  }
)

defineEmits<{
  (e: 'button-click', button: SortButton): void
}>()
</script>

<style lang="scss" scoped>
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
  .sort-insurance {
    margin-left: auto;
    .item {
      position: relative;
      padding: 0 1.2rem;
      font-weight: 500;
      color: #555555;
      .icon-filter {
        margin-left: 0.4rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M18.3332 5.41797L11.6665 5.41797' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.99984 5.41797H1.6665' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33317 8.33333C9.944 8.33333 11.2498 7.0275 11.2498 5.41667C11.2498 3.80584 9.944 2.5 8.33317 2.5C6.72234 2.5 5.4165 3.80584 5.4165 5.41667C5.4165 7.0275 6.72234 8.33333 8.33317 8.33333Z' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.3333 14.582H15' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33317 14.582H1.6665' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.6667 17.5013C13.2775 17.5013 14.5833 16.1955 14.5833 14.5846C14.5833 12.9738 13.2775 11.668 11.6667 11.668C10.0558 11.668 8.75 12.9738 8.75 14.5846C8.75 16.1955 10.0558 17.5013 11.6667 17.5013Z' stroke='%232F3034' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 100%;
      }
      i.icon-arrow-down {
        margin-left: 0.4rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
        background-size: 100%;
        transition: transform 0.3s ease;
        transform-origin: center center;

        &.rotated {
          transform: rotate(180deg);
        }
      }
      &:not(:first-child) {
        &::before {
          content: '';
          width: 0.1rem;
          height: 1.2rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: #e2e2e2;
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
</style>
