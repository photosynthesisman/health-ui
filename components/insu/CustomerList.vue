<template>
  <div class="wrap-customer-list">
    <div v-for="person in personList" :key="person.phone" class="item">
      <div class="item-header">
        <div class="customer-info">
          <div class="name">
            <img
              v-if="!person.isSelectable"
              class="icon-nagative"
              src="/assets/images/insu/subrogation/icon-nagative.png"
              alt="선택금지"
            />
            {{ person.name }}
          </div>
          <div class="phone">{{ person.phone }}</div>
        </div>
        <Button
          :btn-type="person.buttonType"
          element-type="button"
          :aria-label="person.buttonLabel"
          class="xs"
          icon="save-line"
          :width="6.8"
          :disabled="person.buttonDisabled"
          @click="handleButtonClick(person)"
        />
      </div>
      <div class="wrap-label">
        <CommonBadge v-for="insurance in person.insurances" :key="insurance">
          {{ insurance }}
        </CommonBadge>
      </div>
      <div class="memo">
        <span class="text">{{ person.memo }}</span>
      </div>
    </div>
    <button v-if="addText" class="add-item" @click="emit('add-click')">
      <i class="icon ico-plus"></i>
      {{ addText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'

const props = defineProps<{
  personList: {
    name: string
    phone: string
    isSelectable: boolean
    insurances: string[]
    memo: string
    buttonType: string
    buttonLabel: string
    buttonDisabled: boolean
  }[]
  addText?: string
}>()

const emit = defineEmits(['button-click', 'add-click'])

const handleButtonClick = (person: any) => {
  emit('button-click', person)
}
</script>

<style lang="scss" scoped>
.wrap-customer-list {
  flex: 1;
  position: relative;
  margin: 0 -2rem -2rem;
  padding: 2rem 2rem 4.8rem;
  background-color: #f4f4f4;
  .item {
    padding: 2.4rem 2rem;
    background-color: #fff;
    border-radius: 1.2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .customer-info {
        .name {
          font-weight: 700;
          .icon-nagative {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            margin-right: 0.4rem;
          }
        }
        .phone {
          margin-top: 0.2rem;
          font-size: 1.4rem;
          color: #555555;
        }
      }
    }
    .wrap-label {
      display: flex;
      margin-top: 0.4rem;
      gap: 0.4rem;
      .label-name {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #eeeeee;
        font-size: 1.2rem;
        font-weight: 500;
        color: #555555;
      }
    }
    .memo {
      margin-top: 1.2rem;
      padding: 1.2rem;
      border: 0.1rem solid #e2e2e2;
      background-color: #f9f8f7;
      border-radius: 0.8rem;
      .text {
        font-size: 1.4rem;
        font-weight: 500;
        color: #555555;
        @include mixin.multi-ellipsis(2);
      }
    }
  }
  .add-item {
    padding: 1.3rem 2rem;
    border-radius: 10rem;
    font-weight: 500;
    text-align: center;
    background-color: #fff;
    border: 0.1rem solid #e2e2e2;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    position: absolute;
    bottom: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    .icon {
      width: 2rem;
      height: 2rem;
      display: inline-block;
    }
  }
}
</style>
