<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggleAccordion">
      <div>
        <h3>기본정보</h3>
      </div>
      <span class="toggle-icon" :class="{ open: isOpen }"></span>
    </div>
    <div class="accordion-content" :class="{ 'is-open': isOpen }">
      <dl>
        <dt>참가한 챌린지명</dt>
        <dd>{{ challenge }}</dd>
      </dl>
      <dl>
        <dt>경품내역</dt>
        <dd>{{ prize }}</dd>
      </dl>
      <dl>
        <dt>당첨인</dt>
        <dd>{{ name }}</dd>
      </dl>
      <dl>
        <dt>연락처</dt>
        <dd>{{ phone }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  challenge: { type: String, default: '' },
  prize: { type: String, default: '' },
  name: { type: String, default: '' },
  phone: { type: String, default: '' }
})

const isOpen = ref(false)
const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.accordion-item {
  overflow: hidden;
  margin: 0 -2rem;
  padding: 0 2rem;
  &:has(.is-open) {
    h3 {
      -webkit-line-clamp: none;
      line-clamp: none;
    }
  }
  &:last-child {
    .accordion-header {
      border-bottom: 0;
    }
  }
}
.accordion-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 -2rem;
  padding: 2.5rem 2.4rem;
  font-size: 1.4rem;

  cursor: pointer;
  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
}
.accordion-content {
  display: flex;
  flex-direction: column;
  margin: 0 -2rem;
  padding: 0 2rem;
  max-height: 0;
  overflow: hidden;
  font-size: 1.4rem;
  transition: max-height 0.5s ease-out;
  &.is-open {
    border-top: 0.1rem solid #eee;
    max-height: 50rem;
    transition: max-height 0.5s ease-in;
  }
  dl {
    display: flex;
    width: 100%;
    padding: 1.6rem 0;
    justify-content: space-between;
    font-size: 1.6rem;
    line-height: 2.2rem;
    border-bottom: 0.1rem solid #eee;
    &:last-child {
      padding-bottom: 3.2rem;
      border-bottom: none;
    }
    dt {
      flex-shrink: 0;
      color: #555;
    }
    dd {
      flex: 1;
      margin-left: 2rem;
      text-align: right;
      word-break: break-all;
      font-weight: 500;
    }
  }
}

.toggle-icon {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: auto;
  flex: 0 0 auto;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / contain no-repeat;
  transition: transform 0.25s ease;
  &.open {
    transform: rotate(180deg);
  }
}
</style>
