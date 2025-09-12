<template>
  <FlexSection class="flex-1 mb-n20">
    <div class="wrap-info-lists">
      <div class="item">다운로드 유효기간이 만료된 서류는 자동 삭제됩니다.</div>
    </div>
    <div class="total-count">
      <div class="total">
        총 <strong>{{ docsList.length }}</strong
        >건
      </div>
      <div class="btn-reload" @click="handleReload">
        <div class="text">서류함 새로고침</div>
        <i class="icon-reload"></i>
      </div>
    </div>
    <div class="wrap-grey">
      <div class="wrap-doc-list">
        <div v-for="doc in docsList" :key="doc.id" class="item">
          <div class="medical-info-head">
            <img :src="doc.logo" alt="로고" class="logo" />
            <div class="wrap-insurance-info">
              <div class="wrap-text">
                <div class="tit">{{ doc.title }}</div>
              </div>
            </div>
          </div>
          <div class="tit-item">{{ doc.documentType }}</div>
          <div class="item-detail-list">
            <div class="detail-item">
              <div class="tit">발급일자</div>
              <div class="desc">{{ doc.issueDate }}</div>
            </div>
            <div class="detail-item">
              <div class="tit">다운로드 유효기간</div>
              <CommonBadge class="badge-blue">{{ doc.periodText }}</CommonBadge>
            </div>
          </div>
          <Button
            :btn-type="doc.isDownloading ? 'secondary' : 'primary'"
            element-type="button"
            :aria-label="doc.isDownloading ? '서류 생성중' : '다운로드'"
            :disabled="doc.isDownloading"
            @click="handleDownload(doc)"
          />
        </div>
      </div>
    </div>
  </FlexSection>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
import FlexSection from '~/components/page/FlexSection.vue'
interface Document {
  id: number
  logo: string
  title: string
  documentType: string
  issueDate: string
  periodText: string
  isDownloading: boolean
}

const props = defineProps({
  docsList: {
    type: Array as () => Document[],
    required: true
  }
})

const emit = defineEmits(['download-document', 'reload-list'])

const handleDownload = (doc: Document) => {
  if (!doc.isDownloading) {
    emit('download-document', doc.id)
  }
}

const handleReload = () => {
  emit('reload-list')
}
</script>

<style lang="scss" scoped>
.wrap-info-lists {
  padding: 2rem 0;
  .item {
    position: relative;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #555555;
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
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
.total-count {
  width: 100%;
  padding: 2.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: #2b2b2b;
    strong {
      font-weight: 700;
    }
  }
  .btn-reload {
    @include mixin.flex-container(items-center);
    gap: 0.2rem;
    .text {
      font-size: 1.4rem;
      line-height: 2.2rem;
    }
    .icon-reload {
      display: inline-block;
      background: url('/assets/images/insu/icon-reload.svg') center center no-repeat;
      background-size: 1.6rem;
      width: 2.2rem;
      height: 2.2rem;
    }
  }
}
.wrap-grey {
  flex: 1;
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
  .tit-sub {
    font-size: 1.8rem;
    font-weight: 700;
  }
}
.wrap-doc-list {
  .item {
    padding: 2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.04);
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .medical-info-head {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      .logo {
        flex: 0 0;
        width: 4.8rem;
        height: auto;
      }
      .wrap-insurance-info {
        flex: 1 0 auto;
        max-width: calc(100% - 10rem);
        display: flex;
        align-items: center;
        gap: 0.4rem;
        .wrap-text {
          .tit {
            flex: 1;
            min-width: 0;
            font-weight: 700;
            @include mixin.ellipsis;
          }
        }
      }
    }
    .tit-item {
      margin-top: 2rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
    .item-detail-list {
      margin: 1.6rem 0;
      .detail-item {
        @include mixin.flex-container(justify-between items-center);
        &:not(:first-child) {
          margin-top: 1.2rem;
        }
        .tit {
          font-size: 1.3rem;
          font-weight: 500;
          color: #959595;
        }
        .desc {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
