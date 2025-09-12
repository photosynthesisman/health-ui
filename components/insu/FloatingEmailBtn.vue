<template>
  <button class="ship-email-button" aria-label="이메일로 발송" @click="clickEmail">이메일로 발송</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click-email'])
const clickEmail = () => {
  emit('click-email')
}
</script>

<style scoped lang="scss">
.ship-email-button {
  position: fixed;
  left: 50%;
  bottom: 1.6rem;
  transform: translateX(-50%);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  width: 18rem;
  padding: 1.4rem 3.2rem;
  background: #fff;
  border-radius: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  box-shadow: 0 1.2rem 1.2rem 0 rgba(0, 0, 0, 0.06);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
  &::before {
    content: '';
    width: 2.4rem;
    height: 2.4rem;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.625 6.125L12.5 11.1875L20.9375 6.125M5.75 18.3044C4.50736 18.3044 3.5 17.297 3.5 16.0544V7.25C3.5 6.00736 4.50736 5 5.75 5H19.25C20.4926 5 21.5 6.00736 21.5 7.25V16.0543C21.5 17.297 20.4926 18.3044 19.25 18.3044H5.75Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }
}
</style>
