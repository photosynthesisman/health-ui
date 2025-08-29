<template>
  <li class="mission-item">
    <div class="thumb">
      <img :src="mission.imgUrl" :alt="mission.title" />
    </div>
    <div class="tit-box">
      <p class="top-txt">
        {{ mission.subTit }}<span class="blue">{{ mission.money }}원</span>
      </p>
      <strong>{{ mission.title }}</strong>
    </div>
    <Button
      btn-type="primary"
      element-type="button"
      :aria-label="mission.btnLabel"
      :disabled="mission.disabled === true"
    />
  </li>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

interface Mission {
  id?: string | number
  imgUrl?: string
  subTit?: string
  money?: string
  title?: string
  btnLabel?: string
  disabled?: boolean
}

const props = defineProps<{ mission: Mission }>()
</script>

<style lang="scss" scoped>
.mission-item {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  .thumb {
    width: 5.2rem;
    height: 5.2rem;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .tit-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    .top-txt {
      display: inline;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.3;
      color: #555;
      .blue {
        color: #4c7ff7;
        margin-left: 0.2rem;
      }
    }
    strong {
      display: block;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.4;
    }
  }
  .c-btn {
    width: 7.2rem;
    height: 3.6rem;
    font-size: 1.4rem;
    font-weight: 500;
  }
  & + .mission-item {
    margin-top: 2.4rem;
  }
}
</style>
