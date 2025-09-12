<template>
  <FlexSection class="flex-1">
    <TotalItemSort :total="totalCount" :buttons="sortButtons" :unit="'명'" @button-click="clickSort" />

    <div v-if="totalCount > 0" class="wrap-check-icon">
      <label
        v-for="(history, index) in medicalHistories"
        :key="history.id"
        :for="`check-${history.id}`"
        class="c-checktype-btn"
      >
        <input
          :id="`check-${history.id}`"
          v-model="hospitalSelections[index]"
          :name="`check-${history.id}`"
          type="checkbox"
          class="c-checktype-check"
        />
        <div class="c-checktype-label">
          <img :src="history.logoSrc" :alt="history.hospitalName" class="hospital-logo" />
          <div class="wrap-hospital-desc">
            <div class="wrap-desc">
              <span class="tit">{{ history.hospitalName }}</span>
            </div>
            <div class="wrap-label">
              <CommonBadge :color="history.type === '통원' ? 'yellow' : 'green'">{{ history.type }}</CommonBadge>
            </div>
          </div>
          <i class="icon"></i>
        </div>
        <div class="wrap-desc-lists">
          <div class="list-item">
            <div class="tit">진료일</div>
            <div class="desc">{{ history.dateRange }}</div>
          </div>
          <div class="list-item">
            <div class="tit">진료과</div>
            <div class="desc">{{ history.department }}</div>
          </div>
          <div class="list-item">
            <div class="tit">청구보험사</div>
            <div class="desc">{{ history.insurance.name }}<br />({{ history.insurance.date }})</div>
          </div>
          <div class="list-item">
            <div class="tit">진료비</div>
            <div class="desc">
              {{ history.price.total }}
              <i
                class="icon-arrow-down"
                :class="{ rotated: expandedItems[index] }"
                @click.stop.prevent="toggleDetail(index)"
              ></i>
            </div>
            <div v-show="expandedItems[index]" class="wrap-desc-detail">
              <div v-for="(detail, detailIndex) in history.price.details" :key="detailIndex" class="detail-item">
                <div class="detail-tit">{{ detail.title }}</div>
                <div class="detail-desc">{{ detail.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>

    <div v-else class="wrap-empty">
      <img src="/assets/images/insu/icon-empty.svg" alt="아이콘:검색없음" />
      <div class="text">MY병원의 진료내역을<br />찾지 못했어요.</div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
import TotalItemSort from '~/components/publishing/insu/billingInfo/TotalItemSort.vue'
interface MedicalHistory {
  id: number
  hospitalName: string
  logoSrc: string
  type: string
  dateRange: string
  department: string
  insurance: {
    name: string
    date: string
  }
  price: {
    total: string
    details: { title: string; desc: string }[]
  }
}

const props = defineProps({
  medicalHistories: {
    type: Array as () => MedicalHistory[],
    default: () => []
  }
})

const sortButtons = ref([
  { label: '전체', value: 'all' },
  { label: '1개월', value: '1months' },
  { label: '최신순', value: 'latest', icon: true }
])
const emit = defineEmits(['sort-click'])

const clickSort = () => {
  emit('sort-click')
}

const hospitalSelections = ref<boolean[]>([])
const expandedItems = ref<boolean[]>([])

// prop이 변경될 때마다 상태 배열을 초기화
watch(
  () => props.medicalHistories,
  newHistories => {
    hospitalSelections.value = newHistories.map(() => false)
    expandedItems.value = newHistories.map(() => false)
  },
  { immediate: true }
)

// 내역 확장/축소 토글 함수
const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

// 총 항목 수를 계산된 속성으로
const totalCount = computed(() => props.medicalHistories.length)
</script>

<style lang="scss" scoped>
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 2rem;
  padding-bottom: 4rem;
  margin: 0 -2rem -2rem;
  .c-checktype-btn {
    width: 100%;
    // height: 10.8rem;
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
        @include mixin.flex-container(items-center);
        gap: 0.4rem;

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
    .wrap-desc-lists {
      margin-top: 2rem;
      .list-item {
        @include mixin.flex-container(justify-between items-start);
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          text-align: right;
          font-size: 1.4rem;
          font-weight: 600;
          .icon-arrow-down {
            position: relative;
            display: inline-block;
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
        .wrap-desc-detail {
          flex: 1 0 100%;
          margin-top: 1.2rem;
          border-radius: 1.2rem;
          padding: 1.6rem 2.4rem;
          background-color: #f4f4f4;
          .detail-item {
            @include mixin.flex-container(justify-between items-center);
            &:not(:first-child) {
              margin-top: 1.2rem;
            }
            .detail-tit {
              font-size: 1.3rem;
              font-weight: 500;
              color: #959595;
            }
            .detail-desc {
              font-size: 1.3rem;
              font-weight: 500;
              color: #2b2b2b;
            }
          }
        }
      }
    }
  }
}
.wrap-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  img {
    width: 8rem;
    height: 8rem;
  }
  .text {
    margin-top: 1.6rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #555555;
    text-align: center;
  }
}
</style>
