<template>
  <div class="main-bottom-banner">
    <CommonSwiper
      :slides="bannerSlides"
      slide-type="custom"
      :loop="true"
      :autoplay="false"
      :autoplay-delay="5000"
      :pagination="true"
      :navigation="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
    >
      <template #default="{ slide }">
        <nuxt-link :to="slide.link">
          <img :src="slide.image" :alt="slide.alt" />
        </nuxt-link>
      </template>
    </CommonSwiper>
  </div>
</template>

<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import dummyImage from '~/assets/images/home/img-bottom-banner.png'

const bannerSlides = [
  {
    image: dummyImage,
    alt: '에어맥스 DN8 새로워진 다이내믹 에어로 경이로운 감각을 경험해 보세요',
    link: ''
  },
  {
    image: dummyImage,
    alt: '에어맥스 DN8 새로워진 다이내믹 에어로 경이로운 감각을 경험해 보세요',
    link: ''
  }
  // 추가 배너가 필요한 경우 여기에 추가
]
</script>

<style lang="scss" scoped>
.main-bottom-banner {
  margin: 0 -2rem;

  :deep(swiper-slide) {
    border-radius: 0;
    a {
      position: relative;
      display: block;
      @include mixin.rippleEffectWhite;
    }

    img {
      width: 100%;
    }
  }
}
</style>
