<template>
  <div class="usage-wrap">
    <div v-for="item in data" :key="item.id" class="usage-item">
      <FlexRowDiv class="align-center gap-12">
        <div class="img-box">
          <img class="logo" :src="getImageUrl(item.image)" :alt="item.name" />
        </div>
        <div class="item-name">
          <strong>{{ item.name }}</strong>
          <p v-if="item.leftDate">{{ item.leftDate }}</p>
        </div>
      </FlexRowDiv>
      <div class="usage-status">
        <p>{{ item.status }}</p>
        <span>{{ item.date }}</span>
      </div>
    </div>
    <!-- <div v-if="data.length === 0" class="no-data">해당 기간에 데이터가 없습니다.</div> -->
  </div>
</template>

<script setup lang="ts">
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'

interface UsageItem {
  id: number
  name: string
  date: string
  leftDate?: string
  image: string
  status: string
}

interface Props {
  data?: UsageItem[]
}

const getImageUrl = (image: string) => {
  return `/_nuxt/assets/images/${image}`
}
const props = withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>

<style scoped lang="scss">
.usage-wrap {
  border-top: 0.1rem solid #eee;
  margin: 0 -2rem;
  padding: 0 2rem;
  .usage-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 2rem 0;
    gap: 0 1.6rem;
    border-bottom: 0.1rem solid #eee;
    .usage-time {
      font-size: 1.3rem;
      font-weight: 400;
      color: #959595;
      flex: 0 0 auto;
    }
    .item-name {
      display: flex;
      flex-direction: column;
      font-size: 1.4rem;
      font-weight: 400;
      color: #959595;
      strong {
        font-size: 1.6rem;
        font-weight: 500;
        color: #2b2b2b;
      }
      p {
        margin-top: 0.8rem;
      }
    }
  }
  .usage-status {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 0.8rem;
    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: #555;
    }
    span {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
      color: #959595;
    }
  }
  .no-data {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 400;
    color: #2b2b2b;
    margin: 2rem;
  }
}
@media (max-width: 375px) {
  .usage-wrap {
    .usage-item {
      font-size: 1.4rem;
      .item-name {
        font-size: 1.2rem;
        strong {
          font-size: 1.4rem;
        }
      }
    }
  }
}
.img-box {
  width: 5.2rem;
  height: 5.2rem;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 0.8rem;
}
</style>
