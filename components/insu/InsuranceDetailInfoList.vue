<template>
  <div class="wrap-grey">
    <div class="wrap-insurance-info-list">
      <div
        v-for="(section, sectionIndex) in insuranceData"
        :key="sectionIndex"
        class="item"
        :data-anchor2="section.header.text === '보장 내용' ? 'target-section2' : null"
        :data-anchor1="section.header.text === '기본 정보' ? 'target-section1' : null"
      >
        <div class="wrap-item-header">
          <div class="text" v-html="section.header.text"></div>
          <button
            v-if="section.header.buttonText"
            type="button"
            class="btn-round-outline"
            @click="toTerms(sectionIndex)"
          >
            {{ section.header.buttonText }}
          </button>
        </div>
        <div class="wrap-item-lists">
          <div v-for="(list, listIndex) in section.lists" :key="listIndex" class="list-item">
            <div class="tit">{{ list.tit }}</div>
            <div class="wrap-desc">
              <div class="desc">{{ list.desc }}</div>
              <i
                v-if="list.items"
                class="icon-arrow-down"
                :class="{ rotated: expandedItems[sectionIndex][listIndex] }"
                @click="toggleDetail(sectionIndex, listIndex)"
              ></i>
            </div>
            <div v-show="expandedItems[sectionIndex][listIndex]" class="wrap-detail">
              <div v-for="(detail, detailIndex) in list.items" :key="detailIndex" class="detail-item">
                <div class="detail-tit">{{ detail.title }}</div>
                <div class="detail-desc">{{ detail.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 보장 내용 및 특약의 상세 정보에 대한 타입 정의
interface DetailItem {
  title: string
  description: string
}
// 보장 내용 및 특약 항목에 대한 타입 정의
interface Item {
  title: string
  description: string
  details: DetailItem[]
}
// 보험료, 기본 정보와 같이 큰 섹션을 담는 타입 정의
interface Section {
  header: {
    text: string
    buttonText?: string
  }
  lists: {
    tit: string
    desc: string
    items?: Item[]
  }[]
}

const props = defineProps<{
  insuranceData: Section[]
}>()

// props를 사용해 expandedItems 초기화
const expandedItems = ref(props.insuranceData.map(section => section.lists.map(() => false)))

const toggleDetail = (sectionIndex: number, listIndex: number) => {
  expandedItems.value[sectionIndex][listIndex] = !expandedItems.value[sectionIndex][listIndex]
}
const emit = defineEmits(['to-terms'])
const toTerms = (index: number) => {
  emit('to-terms', index)
}
</script>

<style lang="scss" scoped>
.wrap-grey {
  position: relative;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
.wrap-insurance-info-list {
  .item {
    padding: 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .wrap-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-weight: 700;
        :deep(strong) {
          color: var(--blue-primary);
        }
      }
      .btn-round-outline {
        padding: 1rem 1.6rem;
        border: 0.1rem solid #e2e2e2;
        border-radius: 1.8rem;
        color: #555555;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        cursor: pointer;
      }
    }
    .wrap-item-lists {
      margin-top: 1.6rem;
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          margin-left: 0.4rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .wrap-desc {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          .desc {
            font-size: 1.4rem;
            font-weight: 600;
          }
          .icon-arrow-down {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            background: url('/assets/images/insu/icon-arrow-down.svg') no-repeat center center;
            background-size: 100%;
            transition: transform 0.3s ease;
            cursor: pointer;
            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
        .wrap-detail {
          margin-top: 1.2rem;
          width: 100%;
          padding: 1.6rem 2rem;
          border-radius: 1.2rem;
          background-color: #f4f4f4;
          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            }
          }
        }
      }
    }
  }
}
</style>
