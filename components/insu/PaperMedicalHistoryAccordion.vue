<template>
  <div class="total-claim">
    <div v-if="deletable" class="btn-delete">
      <i class="icon-delete"></i>
      <div class="text">선택삭제</div>
    </div>
    <div v-else class="total">
      총 <strong>{{ insurances.length }}</strong
      >건
    </div>
    <div class="wrap-check">
      <Checkbox
        id="checkBox1"
        aria-label="전체선택"
        :model-value="isAllSelected"
        @update:model-value="toggleAllSelection"
      />
    </div>
  </div>
  <div class="wrap-check-icon">
    <label
      v-for="(insurance, index) in insurances"
      :key="`insurance-${index}`"
      :for="`check${index}`"
      class="c-checktype-btn"
    >
      <input
        :id="`check${index}`"
        v-model="insuranceSelections[index]"
        :name="`check${index}`"
        type="checkbox"
        class="c-checktype-check"
      />
      <div class="c-checktype-label">
        <div class="date">{{ insurance.date }}</div>
        <i class="icon"></i>
      </div>
      <div class="wrap-desc-lists">
        <div v-if="insurance.dateCreation" class="list-item">
          <div class="tit">작성일자</div>
          <div class="desc">{{ insurance.dateCreation }}</div>
        </div>
        <div v-if="insurance.dateVisit" class="list-item">
          <div class="tit">진료일자</div>
          <div class="desc">{{ insurance.dateVisit }}</div>
        </div>
        <div class="list-item">
          <div class="tit">진료과</div>
          <div class="desc">{{ insurance.department }}</div>
        </div>
        <div class="list-item">
          <div class="tit">진료의</div>
          <div class="desc">{{ insurance.doctor }}</div>
        </div>
        <div v-if="insurance.type" class="list-item">
          <div class="tit">진료구분</div>
          <div class="desc">{{ insurance.type }}</div>
        </div>
        <div v-if="insurance.count" class="list-item">
          <div class="tit">서류 발급 매 수</div>
          <div class="desc">
            <div
              class="ico icon-minus"
              :class="{ active: insurance.count > 1 }"
              @click.stop.prevent="updateCount(index, insurance.count - 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <div class="text">{{ insurance.count }}매</div>
            <div class="ico icon-plus active" @click.stop.prevent="updateCount(index, insurance.count + 1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                <path
                  d="M10 6.80078L10 13.2008M13.2 10.0008L6.8 10.0008"
                  stroke="#D2D2D2"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-sub">
            <div class="tit">
              총 발급비용
              <div class="tit-sub">{{ insurance.totalCost.toLocaleString() }}</div>
            </div>
            <i
              class="icon-arrow-up"
              :class="{ rotated: expandedItems[index] }"
              @click.stop.prevent="toggleDetail(index)"
            ></i>
          </div>
          <div v-show="expandedItems[index]" class="wrap-desc-detail">
            <div class="detail-item">
              <div class="detail-tit">급여</div>
              <div class="detail-desc">{{ insurance.detail.benefitCost.toLocaleString() }}원</div>
            </div>
            <div class="detail-item">
              <div class="detail-tit">비급여</div>
              <div class="detail-desc">{{ insurance.detail.nonBenefitCost.toLocaleString() }}원</div>
            </div>
            <div class="detail-item">
              <div class="detail-tit">환자부담금액</div>
              <div class="detail-desc">{{ insurance.detail.patientCost.toLocaleString() }}원</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="deletable" class="flex gap-12 mt-12">
        <Button btn-type="line" element-type="button" aria-label="삭제" />
        <Button btn-type="line" element-type="button" aria-label="미리보기" />
      </div>
      <Button
        v-else
        class="mt-12"
        btn-type="line"
        element-type="button"
        aria-label="바로 결제하기"
        @click="handleClickPayment(index, insurance.totalCost)"
      />
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'

// 보험 세부 정보와 기본 정보에 대한 타입 정의
interface InsuranceDetail {
  benefitCost: number
  nonBenefitCost: number
  patientCost: number
}

interface Insurance {
  date?: string
  dateCreation?: string
  dateVisit?: string
  department: string
  doctor: string
  type?: string
  count?: number
  totalCost: number
  detail: InsuranceDetail
}

const props = defineProps({
  deletable: {
    type: Boolean,
    default: false
  },
  insurances: {
    type: Array as () => Insurance[],
    required: true
  }
})
const emit = defineEmits(['payment', 'update:insurances'])

const insuranceSelections = ref<boolean[]>([])
const expandedItems = ref<boolean[]>([])

watch(
  () => props.insurances,
  (newVal: Insurance[]) => {
    insuranceSelections.value = new Array(newVal.length).fill(false)
    expandedItems.value = new Array(newVal.length).fill(false)
  },
  { immediate: true }
)

const isAllSelected = computed(() => insuranceSelections.value.every(selection => selection))

function toggleAllSelection(value: boolean): void {
  insuranceSelections.value.fill(value)
}

function toggleDetail(index: number): void {
  expandedItems.value[index] = !expandedItems.value[index]
}

// totalCost 매개변수 타입을 number로 변경
const handleClickPayment = (index: number, totalCost: number): void => {
  emit('payment', { index, totalCost })
}

const updateCount = (index: number, newCount: number): void => {
  const newInsurances: Insurance[] = [...props.insurances]
  newInsurances[index].count = newCount > 0 ? newCount : 1
  emit('update:insurances', newInsurances)
}
</script>

<style lang="scss" scoped>
.total-claim {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
  .btn-delete {
    display: flex;
    align-items: center;
    .icon-delete {
      width: 2.4rem;
      height: 2.4rem;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 8L8 16M16 16L8 8' stroke='%23555555' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }
    .text {
      margin-left: 0.2rem;
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
      line-height: 2.4rem;
    }
  }
}
.wrap-check {
  display: flex;
  justify-content: flex-end;
}
.wrap-check-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background-color: #f4f4f4;
  padding: 2rem 2rem 4.8rem 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  .c-checktype-btn {
    width: 100%;
    padding: 2rem;
    border: 0.2rem solid #fff;
    background-color: #fff;
    border-radius: 1.2rem;
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
      @include mixin.flex-container(justify-between items-center);
      width: 100%;
      .date {
        font-weight: 700;
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
          @include mixin.flex-container(items-center);
          gap: 0.8rem;

          .ico {
            &.active {
              rect {
                stroke: #4f5561;
              }
              path {
                stroke: #2b2b2b;
              }
            }
          }
          .icon-arrow-up {
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
        .item-sub {
          @include mixin.flex-container(justify-between items-center);
          width: 100%;
          .tit {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2b2b2b;
            .tit-sub {
              display: inline-block;
              margin-left: 0.6rem;
            }
          }
          .icon-arrow-up {
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
      }
    }
  }
}
</style>
