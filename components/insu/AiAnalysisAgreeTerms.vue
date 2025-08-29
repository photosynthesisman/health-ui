<template>
  <div class="wrap-agree">
    <div class="agree-tit" v-html="title"></div>
    <p v-if="subtit" class="agree-sub-tit" v-html="subtit"></p>
    <div class="wrap-agree-check">
      <Checkbox id="checkBox1" v-model="allChecked" custom-style="button agree-all" aria-label="전체동의" />
      <ul class="agree-list">
        <li v-for="(item, index) in termsData" :key="item.id" class="item" @click="showDetailTerm(index)">
          <Checkbox :id="item.id" v-model="item.checked" custom-style="small non-border" :aria-label="item.label" />
          <i class="icon-arrow-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

const props = defineProps<{
  title: string
  subtit?: string
  termsData: {
    id: string
    label: string
    checked: boolean
  }[]
}>()

const emit = defineEmits(['term-click'])
const allChecked = computed({
  get: () => props.termsData.every(item => item.checked),
  set: newValue => {
    props.termsData.forEach(item => {
      item.checked = newValue
    })
  }
})

const showDetailTerm = (index: number) => {
  emit('term-click', index)
}
</script>

<style scoped lang="scss">
.wrap-agree {
  text-align: left;
  padding-top: 1.1rem;
  .agree-tit {
    font-size: 1.8rem;
    font-weight: 700;
  }
  .agree-sub-tit {
    margin-top: 0.8rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.2rem;
    color: #555;
  }
}
.wrap-agree-check {
  margin-top: 2.4rem;
  .agree-all {
    width: 100%;
  }
  .agree-list {
    padding: 1.2rem 1.6rem;
    .item {
      padding: 0.8rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-arrow-right {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
</style>
