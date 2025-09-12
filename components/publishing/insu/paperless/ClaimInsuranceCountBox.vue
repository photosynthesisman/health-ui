<template>
  <div class="medical-info">
    <div class="medical-info-head">
      <img :src="logo" :alt="name + ' 로고'" class="logo" />
      <div class="wrap-hospital">
        <div class="text">{{ name }}</div>
        <div class="label price" :class="['label', label]">{{ labelText }}</div>
      </div>
      <div class="count">
        <strong>{{ count }}</strong
        >건
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  logo: string
  name: string
  label: string
  count: number
}>()

const labelText = computed(() => {
  switch (props.label) {
    case 'price':
      return '입원진료비'
    case 'in':
      return '입원'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
.medical-info {
  margin-top: 2.5rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        width: fit-content;
        min-width: 0;
        max-width: 100%;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #fef4cc;
          color: #8d7000;
        }
        // 입원
        &.in {
          background-color: #ffe7e7;
          color: #ca2828;
        }
        &.price {
          background-color: #eeeeee;
          color: #555555;
        }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4c7ff7;
      }
    }
  }
}
</style>
