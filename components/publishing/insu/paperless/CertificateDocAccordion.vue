<template>
  <div class="item" :class="{ rotated: expanded }">
    <div class="item-head" @click="$emit('toggle')">
      <img class="ico-payment-method" :src="icon" :alt="alt" />
      <div class="wrap-desc">
        <div class="text">{{ title }}</div>
        <div class="label">가능</div>
      </div>
      <i class="icon-arrow-down" :class="{ rotated: expanded }"></i>
    </div>
    <div class="item-body" :class="{ expanded }">
      <div v-if="bodyTitle" class="spread-tit" v-html="bodyTitle"></div>
      <ul class="spread-list circle-num">
        <li v-for="(step, idx) in bodySteps" :key="idx">{{ step }}</li>
      </ul>
      <div v-if="desc" class="spread-desc" v-html="desc"></div>
      <Button
        v-if="buttonText"
        btn-type="primary"
        element-type="button"
        :aria-label="buttonText"
        class="sm"
        @click="$emit('button-click')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  icon: string
  alt: string
  title: string
  expanded: boolean
  bodyTitle?: string
  bodySteps?: string[]
  desc?: string
  buttonText?: string
}>()

const emit = defineEmits<{
  (e: 'toggle' | 'button-click'): void
}>()
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  position: relative;
  border-bottom: 0.1rem solid #eeeeee;
  &.rotated {
    border-bottom: none;
  }
  .item-head {
    padding: 1.2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    .ico-payment-method {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-desc {
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      .text {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2b2b2b;
      }
      .label {
        flex: 0 0;
        padding: 0.3rem 0.6rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #4c7ff7;
        background-color: #e5edff;
        border-radius: 0.4rem;
      }
    }
    i.icon-arrow-down {
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
  }
  .item-body {
    max-height: 0;
    overflow: hidden;
    position: relative;
    transition:
      max-height 0.3s ease,
      padding 0.3s ease,
      border-top 0.3s ease;
    padding: 0 2rem;
    border-top: 0.1rem solid transparent;
    background-color: #f9f9f9;
    margin-inline: -2rem;
    &.expanded {
      max-height: 50rem; // 충분한 높이로 설정
      padding: 2.4rem 2rem;
      border-block: 0.1rem solid #eeeeee;
    }

    .spread-tit {
      font-size: 1.6rem;
      font-weight: 500;
      color: #2b2b2b;
    }
    .spread-list {
      margin-top: 1.6rem;
      counter-reset: num;
      li {
        position: relative;
        counter-increment: num;
        padding-left: 2.6rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: #555555;
        &::before {
          content: counter(num);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #4f5561;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 130%;
        }
        &:not(:first-child) {
          margin-top: 0.8rem;
        }
      }
      & + .spread-desc {
        margin-top: 0.2rem;
        margin-left: 3rem;
      }
    }
    .spread-desc {
      margin-top: 1.6rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #959595;
    }
    .c-btn {
      margin-top: 1.6rem;
    }
  }
  &:last-child {
    .item-body {
      .spread-desc {
        margin-left: 0;
      }
    }
  }
}
</style>
