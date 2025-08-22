<template>
  <div class="c-input">
    <label :for="id" class="c-label">{{ label }}</label>
    <div class="c-input-content">
      <img :src="logoSrc" :alt="logoAlt" />
      <strong>{{ name }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label?: string
  id?: string
  name: string
  logoSrc?: string
  logoAlt?: string
}>()

const label = computed(() => props.label ?? '발급병원')
const id = computed(() => props.id ?? 'calendar')

const logoAlt = computed(() => props.logoAlt ?? '')
const name = computed(() => props.name)
</script>

<style scoped lang="scss">
.c-label {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  color: #555;
}
.c-input-content {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  overflow: hidden;
  padding: 1.2rem 2rem;
  border: 1px solid #e2e2e2;
  border-radius: 1.2rem;
  background: #fff;

  img {
    width: 4.8rem;
    height: 4.8rem;
  }
  strong {
    line-height: 2.2rem;
  }
}
</style>
