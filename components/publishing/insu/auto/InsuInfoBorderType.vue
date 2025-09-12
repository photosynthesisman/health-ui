<template>
  <div class="wrap-myinsurance-info">
    <div v-for="info in infoItems" :key="info.id" :info="info" class="item">
      <div class="tit">{{ info.title }}</div>
      <div class="desc" v-html="info.desc"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Info {
  id?: string | number
  title: string
  desc: string
}

const infoItems: Info[] = [
  { id: 1, title: '청구 보험사', desc: 'DB손해보험' },
  { id: 2, title: '지급계좌', desc: '국민은행(이레몬) <br />1324567897897' }
]
</script>

<style lang="scss" scoped>
.wrap-myinsurance-info {
  margin: 1.6rem 0 3.2rem;
  padding: 2rem;
  border-radius: 1.2rem;
  border: 0.1rem solid #e2e2e2;
  .item {
    @include mixin.flex-container(justify-between);
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
    .tit {
      margin-left: 0.4rem;
      font-size: 1.4rem;
      color: #555555;
    }
    .desc {
      margin-right: 0.4rem;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
