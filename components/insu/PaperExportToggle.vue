<template>
  <FlexSection class="mb-n20">
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
          :class="{ rotated: expandedItems[hospitalIndex].hospital }"
          @click.stop.prevent="toggleHospitalDetail(hospitalIndex)"
        ></i>
      </div>
      <div :class="{ expanded: expandedItems[hospitalIndex].hospital }" class="wrap-check-icon">
        <div v-for="(document, documentIndex) in hospital.documents" :key="documentIndex" class="c-checktype-btn">
          <div class="c-checktype-label">
            <div class="text">{{ document.name }}</div>
            <button class="btn-text" @click="clickNext">
              <div class="text">내보내기 상세</div>
              <i class="icon-arrow-right-grey"></i>
            </button>
          </div>
          <div class="wrap-desc-lists">
            <div class="list-item">
              <div class="tit">최근 내보낸 일시</div>
              <div class="desc">{{ document.exportDate }}</div>
            </div>
            <div class="list-item">
              <div class="tit">진료일자</div>
              <div class="desc">{{ document.dateVisit }}</div>
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
              <div class="tit">발급일자</div>
              <div class="desc">{{ document.creationDate }}</div>
            </div>
            <div class="list-item">
              <div class="tit">발급매수</div>
              <div class="desc">{{ document.countDoc }}매</div>
            </div>
            <div class="list-item">
              <div class="item-sub">
                <div class="tit">
                  총 발급비용
                  <div class="tit-sub">
                    {{
                      (document.detail.docCost + document.detail.serviceFee + document.detail.vat).toLocaleString()
                    }}원
                  </div>
                </div>
                <i
                  class="icon-arrow-up"
                  :class="{ rotated: expandedItems[hospitalIndex].documents[documentIndex] }"
                  @click.stop.prevent="toggleDocumentDetail(hospitalIndex, documentIndex)"
                ></i>
              </div>
              <div
                v-show="expandedItems[hospitalIndex].documents[documentIndex]"
                class="wrap-desc-detail"
                :class="{ expanded: expandedItems[hospitalIndex].documents[documentIndex] }"
              >
                <div class="detail-item">
                  <div class="detail-tit">급여</div>
                  <div class="detail-desc">{{ document.detail.docCost.toLocaleString() }}원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">비급여</div>
                  <div class="detail-desc">{{ document.detail.serviceFee.toLocaleString() }}원</div>
                </div>
                <div class="detail-item">
                  <div class="detail-tit">환자부담금액</div>
                  <div class="detail-desc">{{ document.detail.vat.toLocaleString() }}원</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import FlexSection from '~/components/page/FlexSection.vue'

interface Detail {
  docCost: number
  serviceFee: number
  vat: number
}

interface Document {
  name: string
  exportDate: string
  dateVisit: string
  countDoc: number
  creationDate: string
  department: string
  doctor: string
  count: number
  detail: Detail
}

interface Props {
  hospitals: {
    name: string
    logo: string
    documents: Document[]
  }[]
}

const props = defineProps<Props>()
const emit = defineEmits(['export-document', 'reissue-document'])

// 토글 상태를 관리하는 새로운 구조
const expandedItems = ref(
  props.hospitals.map(hospital => ({
    hospital: false,
    documents: hospital.documents.map(() => false)
  }))
)

// 병원 정보의 확장/축소를 처리하는 함수
const toggleHospitalDetail = (index: number) => {
  expandedItems.value[index].hospital = !expandedItems.value[index].hospital
}

// 문서 상세 정보의 확장/축소를 처리하는 함수
const toggleDocumentDetail = (hospitalIndex: number, documentIndex: number) => {
  expandedItems.value[hospitalIndex].documents[documentIndex] =
    !expandedItems.value[hospitalIndex].documents[documentIndex]
}

const clickNext = () => {
  return navigateTo('/insu/claim/documentIssuance/exportDetail')
}
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
      .btn-text {
        @include mixin.flex-container(items-center);
        .text {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .icon-arrow-right-grey {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: url('/assets/images/insu/icon-arrow-right-gray.svg') center center no-repeat;
          background-size: contain;
          transition: transform 0.3s ease-in-out;
        }
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
          display: flex;
          align-items: center;
          gap: 0.8rem;
          span {
            font-size: 1.3rem;
            font-weight: 500;
            line-height: 1.8rem;
            &.txt-blue {
              color: var(--blue-primary);
            }
            &.txt-red {
              color: #f14960;
            }
          }
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
            margin-top: 1.2rem;
            padding: 1.6rem 2.4rem;
            max-height: 50rem;
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

.wrap-btn-group {
  margin-top: 1.2rem;
  @include mixin.flex-container(justify-between items-center);
  gap: 1.2rem;
}
</style>
