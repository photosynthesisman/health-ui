<template>
  <FlexSection class="flex-1 mb-n20">
    <div class="wrap-search-status">
      <div class="text">
        총 <strong>{{ exportList.length }}</strong
        >건
      </div>
    </div>
    <div class="wrap-grey">
      <div class="wrap-detail-list">
        <div v-for="item in exportList" :key="item.id" class="item">
          <div class="item-header">
            <label class="h-label">{{ item.label }}</label>
            <div class="wrap-password">
              <div class="text" :class="{ active: item.isPasswordVisible }">
                {{ item.isPasswordVisible ? `비밀번호 ${item.password}` : '비밀번호 확인' }}
              </div>
              <Checkbox
                :id="`checkBox-${item.id}`"
                custom-style="switch tiny"
                :model-value="item.checked"
                @update:model-value="togglePasswordVisibility(item)"
              />
            </div>
          </div>
          <div class="wrap-detail-list">
            <div class="detail-item">
              <div class="tit">내보낸 일시</div>
              <div class="desc">{{ item.exportDate }}</div>
            </div>
            <div v-if="item.emailAddress" class="detail-item">
              <div class="tit">이메일 주소</div>
              <div class="desc">{{ item.emailAddress }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import Checkbox from '~/components/publishing/input/check.vue'
import { defineProps, withDefaults, defineEmits } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'
interface ExportItem {
  id: number
  label: string
  isPasswordVisible: boolean
  password: string | null
  checked: boolean
  exportDate: string
  emailAddress: string | null
}

const props = withDefaults(
  defineProps<{
    exportList?: ExportItem[]
  }>(),
  {
    exportList: () => []
  }
)

const emit = defineEmits(['update:exportList'])

const togglePasswordVisibility = (item: ExportItem) => {
  const updatedItem = {
    ...item,
    checked: !item.checked,
    isPasswordVisible: !item.checked
  }

  // 전체 리스트를 복사하고 해당 항목만 업데이트
  const updatedList = props.exportList.map(i => (i.id === updatedItem.id ? updatedItem : i))

  // 변경된 리스트를 부모 컴포넌트로 전달
  emit('update:exportList', updatedList)
}
</script>

<style scoped lang="scss">
.wrap-search-status {
  padding: 2.1rem 0;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.wrap-grey {
  flex: 1;
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-detail-list {
  .item {
    background-color: #fff;
    border-radius: 1.2rem;
    padding: 1.6rem 2rem;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(justify-between items-center);
      .h-label {
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        background-color: #5782e7;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        color: #fff;
      }
      .wrap-password {
        @include mixin.flex-container(items-center);
        gap: 0.6rem;
        .text {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
          line-height: 1.8rem;
          &.active {
            color: #2b2b2b;
          }
        }
      }
    }
    .wrap-detail-list {
      margin-top: 1.6rem;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          border-top: 0.1rem solid #eeeeee;
          padding-top: 1.2rem;
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-size: 1.4rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
