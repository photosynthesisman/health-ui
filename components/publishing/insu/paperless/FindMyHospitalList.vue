<template>
  <div class="wrap-check-icon">
    <label v-for="(hospital, idx) in hospitals" :key="idx" :for="`check${idx}`" class="c-checktype-btn">
      <input
        :id="`check${idx}`"
        type="checkbox"
        name="myHospital"
        class="c-checktype-check"
        :checked="modelValue[idx]"
        @change="onChange($event, idx)"
      />
      <div class="c-checktype-label">
        <img :src="hospital.logo" :alt="hospital.name + ' 로고'" class="hospital-logo" />
        <div class="wrap-hospital-desc">
          <div class="wrap-desc">
            <span class="tit">{{ hospital.name }}</span>
            <span class="address">{{ hospital.address }}</span>
          </div>
          <div class="wrap-label">
            <div class="h-label no-doc">{{ hospital.hospitalType }}</div>
            <div class="h-label">{{ hospital.treatmentType }}</div>
          </div>
        </div>
        <i class="icon"></i>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  hospitals: {
    logo: string
    name: string
    address: string
    hospitalType: string
    treatmentType: string
  }[]
  modelValue: boolean[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean[]): void
}>()

function onChange(e: Event, idx: number) {
  const checked = (e.target as HTMLInputElement).checked
  const newValue = [...props.modelValue]
  newValue[idx] = checked
  emit('update:modelValue', newValue)
}
</script>

<style lang="scss" scoped>
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  .c-checktype-btn {
    width: 100%;
    height: 10.8rem;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
    // display: flex;
    // align-items: center;
    // gap: 1.6rem;
    &:has(.c-checktype-check:checked) {
      border: 0.2rem solid #4c7ff7;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
      .icon {
        border-color: #4c7ff7;
        background-color: #4c7ff7;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
    .c-checktype-check {
      display: none;
    }
    .c-checktype-label {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      width: 100%;
      .hospital-logo {
        width: 4.8rem;
        height: 4.8rem;
        flex-shrink: 0;
      }
      .wrap-hospital-desc {
        flex: 1 1 auto;
        min-width: 0;
        .wrap-desc {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          .tit {
            display: block;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.4;
            color: #2b2b2b;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
          .address {
            display: block;
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.4;
            color: #555555;
            width: 100%;
            @include mixin.ellipsis;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .wrap-label {
          margin-top: 0.4rem;
          display: flex;
          gap: 0.4rem;
          .h-label {
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            background-color: #eeeeee;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.3;
            color: #555555;
            &.no-doc {
              background-color: #e5edff;
              color: #4c7ff7;
            }
            &.myhospital {
              background-color: #4c7ff7;
              color: #fff;
            }
          }
        }
      }
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        flex-shrink: 0;
        border-radius: 50%;
        border: 1.5px solid #eee;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 1.9rem;
        background-repeat: no-repeat;
        background-position: center;
        transition:
          background-color 0.2s ease-in,
          border-color 0.2s ease-in;
      }
    }
  }
}
</style>
