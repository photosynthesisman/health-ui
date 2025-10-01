<template>
  <div class="dimmed">
    <LottieAnimation
      :src="'/animations/loadingIcon.json'"
      width="100%"
      height="100%"
      :speed="1.2"
      :loop="true"
      aria-label="로딩 이미지"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dimmed {
  position: fixed;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8rem;
  height: 8rem;
  background-color: #fff;
  box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 100%;
}
:deep(.lottie-animation) {
  z-index: 202;
  width: 8rem;
  height: 8rem;
}
</style>
