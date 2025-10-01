<template>
  <div class="dimmed">
    <LottieAnimation
      :src="'/animations/loadingDot.json'"
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
  inset: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.75);
  pointer-events: all;
}
:deep(.lottie-animation) {
  z-index: 202;
  width: 8rem;
  height: 8rem;
}
</style>
