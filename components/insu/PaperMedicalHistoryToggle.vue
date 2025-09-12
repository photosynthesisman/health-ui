<template>
  <div class="wrap-info-lists">
    <div class="item">장바구니 내역은 24시간 후 자동 삭제됩니다.</div>
  </div>
  <FlexSection class="mb-n20">
    <div class="wrap-select-claim">
      <div class="btn-delete">
        <i class="icon-delete"></i>
        <div class="text">선택삭제</div>
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

    <div v-for="(hospital, hospitalIndex) in hospitals" :key="hospitalIndex">
      <div class="wrap-medical-info">
        <div class="medical-info-head">
          <img :src="hospital.logo" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">
              {{ hospital.name }} <strong>{{ hospital.documents.length }}</strong
              >건
            </div>
          </div>
        </div>
        <i
          class="icon-arrow-down"
          :class="{ rotated: expandedItems[hospitalIndex] }"
          @click.stop.prevent="toggleDetail(hospitalIndex)"
        ></i>
      </div>
      <div :class="{ expanded: expandedItems[hospitalIndex] }" class="wrap-check-icon">
        <label
          v-for="(document, documentIndex) in hospital.documents"
          :key="documentIndex"
          :for="`check-${hospitalIndex}-${documentIndex}`"
          class="c-checktype-btn"
        >
          <input
            :id="`check-${hospitalIndex}-${documentIndex}`"
            v-model="insuranceSelections[hospitalIndex][documentIndex]"
            :name="`check-${hospitalIndex}-${documentIndex}`"
            type="checkbox"
            class="c-checktype-check"
          />
          <div class="c-checktype-label">
            <div class="text">{{ document.name }}</div>
            <i class="icon"></i>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">작성일자</div>
              <div class="desc">{{ document.creationDate }}</div>
            </div>
            <div class="list-item">
              <div class="tit">진료일자</div>
              <div class="desc">{{ document.treatmentDate }}</div>
            </div>
            <div class="list-item">
              <div class="tit">진료과</div>
              <div class="desc">{{ document.department }}</div>
            </div>
            <div class="list-item">
              <div class="tit">진료의</div>
              <div class="desc">{{ document.doctor }}</div>
            </div>
            <div class="list-item">
              <div class="tit">서류 발급 매 수</div>
              <div class="desc">
                <div
                  class="ico icon-minus"
                  :class="{ active: document.count > 1 }"
                  @click.stop.prevent="document.count > 1 ? document.count-- : (document.count = 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="#D2D2D2" stroke-width="1.5" />
                    <path d="M13.2 10L6.8 10" stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div class="text">{{ document.count }}매</div>
                <div class="ico icon-plus active" @click.stop.prevent="document.count++">
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
                  <div class="tit-sub">
                    {{
                      (
                        (document.issuanceCost + document.agencyFee + document.agencyFeeVat) *
                        document.count
                      ).toLocaleString()
                    }}원
                  </div>
                </div>
                <i
                  class="icon-arrow-up"
                  :class="{ rotated: expandedCostItems[hospitalIndex][documentIndex] }"
                  @click.stop.prevent="toggleCostDetail(hospitalIndex, documentIndex)"
                ></i>
              </div>
              <div :class="{ expanded: expandedCostItems[hospitalIndex][documentIndex] }" class="wrap-desc-detail">
                <div class="detail-item">
                  <div class="detail-tit">발급비용</div>
                  <div class="detail-desc">{{ document.issuanceCost.toLocaleString() }}원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료</div>
                  <div class="detail-desc">{{ document.agencyFee.toLocaleString() }}원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">대행수수료부가세</div>
                  <div class="detail-desc">{{ document.agencyFeeVat.toLocaleString() }}원</div>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap-btn-group">
            <Button btn-type="line" element-type="button" aria-label="삭제" />
            <Button btn-type="line" element-type="button" aria-label="미리보기" />
          </div>
        </label>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Button from '~/components/publishing/button/Button.vue'
interface Document {
  name: string
  creationDate: string
  treatmentDate: string
  department: string
  doctor: string
  count: number
  issuanceCost: number
  agencyFee: number
  agencyFeeVat: number
}

interface Props {
  hospitals: {
    name: string
    logo: string
    documents: Document[]
  }[]
}

const emit = defineEmits(['update:totalCost', 'update:totalCount'])
const props = defineProps<Props>()

const expandedItems = ref(props.hospitals.map(() => false))
const expandedCostItems = ref(props.hospitals.map(hospital => hospital.documents.map(() => false)))
const insuranceSelections = ref(props.hospitals.map(hospital => hospital.documents.map(() => false)))
const isAllSelected = ref(false)

const toggleDetail = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}

const toggleCostDetail = (hospitalIndex: number, documentIndex: number) => {
  expandedCostItems.value[hospitalIndex][documentIndex] = !expandedCostItems.value[hospitalIndex][documentIndex]
}

const toggleAllSelection = () => {
  isAllSelected.value = !isAllSelected.value
  insuranceSelections.value.forEach((hospital, hospitalIndex) => {
    hospital.forEach((_, documentIndex) => {
      insuranceSelections.value[hospitalIndex][documentIndex] = isAllSelected.value
    })
  })
}

watch(
  insuranceSelections,
  newVal => {
    const totalCount = newVal.flat().length
    const selectedCount = newVal.flat().filter(Boolean).length
    isAllSelected.value = totalCount > 0 && totalCount === selectedCount
  },
  { deep: true }
)
const calculatedTotalCost = computed(() => {
  let cost = 0
  props.hospitals.forEach((hospital, hospitalIndex) => {
    hospital.documents.forEach((document, documentIndex) => {
      if (insuranceSelections.value[hospitalIndex] && insuranceSelections.value[hospitalIndex][documentIndex]) {
        cost += (document.issuanceCost + document.agencyFee + document.agencyFeeVat) * document.count
      }
    })
  })
  return cost
})
const calculatedTotalCount = computed(() => {
  let count = 0
  insuranceSelections.value.forEach(hospital => {
    hospital.forEach(isDocumentSelected => {
      if (isDocumentSelected) {
        count++
      }
    })
  })
  return count
})
watch(
  calculatedTotalCost,
  newVal => {
    emit('update:totalCost', newVal)
  },
  { immediate: true }
)
watch(
  calculatedTotalCount,
  newVal => {
    emit('update:totalCount', newVal)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
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
  padding: 0 2rem;
  margin-right: -2rem;
  margin-left: -2rem;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease-out,
    padding 0.3s ease;
  visibility: hidden;
  &.expanded {
    padding: 2rem;
    max-height: 100rem;
    visibility: visible;
  }
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
      .text {
        font-size: 1.4rem;
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
      margin-top: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      .list-item {
        @include mixin.flex-container(justify-between items-start);
        flex-wrap: wrap;
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
          .text {
            min-width: 2rem;
            font-size: 1.4rem;
            font-weight: 600;
            &.disabled {
              color: #959595;
            }
          }
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
            .text {
              font-size: 1.4rem;
              font-weight: 600;
            }
          }
        }
        .wrap-desc-detail {
          max-height: 0;
          flex: 1 0 100%;

          border-radius: 1.2rem;
          padding: 0 2.4rem;
          background-color: #f4f4f4;
          overflow: hidden;
          transition:
            max-height 0.3s ease,
            padding 0.3s ease;
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
          &.expanded {
            padding: 1.6rem 2.4rem;
            max-height: 50rem;
          }
        }
        .item-sub {
          margin-bottom: 1.2rem;
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
.wrap-select-claim {
  margin: 0 -2rem;
  // width: 100%;
  padding: 2.1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid #e2e2e2;
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
.wrap-medical-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      width: 4.8rem;
      height: 4.8rem;
    }
    .wrap-hospital {
      .text {
        font-weight: 700;
        strong {
          color: #4c7ff7;
        }
      }
    }
  }
  i.icon-arrow-down {
    width: 2.4rem;
    height: 2.4rem;
    background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
    background-size: contain;
    transition: transform 0.3s ease-in-out;
    &.rotated {
      transform: rotate(180deg);
    }
  }
}
.wrap-bottom-sort {
  .tit-sort {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.2rem;
    line-height: 130%;
    color: #555555;
    text-align: left;
  }
}
.wrap-pay-info {
  padding: 0.8rem 0;
  .pay-text {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .pay-amount {
    margin-top: 0.4rem;
    font-size: 2.6rem;
    font-weight: 700;
    color: #4c7ff7;
  }
}
.wrap-btn-pay {
  margin: 1.6rem 0 2.4rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 0.8rem;
}
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    text-align: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    margin-top: 0.8rem;
    & > span {
      color: #4c7ff7;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background-color: #959595;
      border-radius: 50%;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
}
.wrap-btn-group {
  margin-top: 1.2rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 1.2rem;
}
</style>
