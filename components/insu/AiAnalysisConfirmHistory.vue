<template>
  <div class="medical-info">
    <div class="medical-info-head">
      <img :src="imgSrc" alt="로고" class="logo" />
      <div class="wrap-hospital">
        <div class="text">{{ hospital }}</div>
      </div>
    </div>
  </div>
  <hr class="hr-section mt-32 mb-0 ml-n20 mr-n20" style="flex-shrink: 0" />
  <div class="wrap-recent-searches">
    <div class="text">
      총 진료내역<strong>&nbsp;{{ medicalHistoryData.length }}</strong
      >건
    </div>
  </div>
  <div class="medical-history-wrap">
    <div v-for="(history, index) in medicalHistoryData" :key="index" class="history-item">
      <div class="badge-box">
        <CommonBadge v-if="history.analysisPossible" :color="'cobalt'" :variant="'solid'">
          AI분석 신청가능
        </CommonBadge>
        <CommonBadge :color="history.type === '통원' ? 'yellow' : 'green'">{{ history.type }}</CommonBadge>
      </div>
      <dl>
        <dt>진료일</dt>
        <dd>{{ history.date }}</dd>
      </dl>
      <dl>
        <dt>진료과</dt>
        <dd>{{ history.department }}</dd>
      </dl>
      <dl>
        <dt>입원비</dt>
        <dd>{{ history.cost }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'

defineProps<{
  imgSrc: string
  hospital: string
  medicalHistoryData: {
    type: string
    analysisPossible: boolean
    date: string
    department: string
    cost: string
  }[]
}>()
</script>

<style scoped lang="scss">
.wrap-recent-searches {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -2rem;
  padding: 2rem;
  background-color: #fff;
  font-size: 1.6rem;
  line-height: 2.2rem;
  .text {
    font-weight: 500;
    strong {
      font-weight: 700;
    }
  }
}
.medical-info {
  width: 100%;
  margin-top: -2rem;
  padding: 1.2rem 2rem;
  border: 0.1rem solid #e2e2e2;
  border-radius: 1.2rem;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: 4.8rem;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        text-align: left;
        flex: 1;
        min-width: 0;
        font-weight: 700;
        line-height: 2.2rem;
        @include mixin.ellipsis;
      }
    }
  }
}
.medical-history-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.2rem;
  margin: 0 -2rem -2rem -2rem;
  padding: 2rem;
  background: #f4f4f4;
  .history-item {
    padding: 1.6rem 2rem;
    background: #fff;
    border-radius: 1.2rem;
    .badge-box {
      display: flex;
      margin-bottom: 1.6rem;
      gap: 0.4rem;
    }
    dl {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.8rem;
      &:first-child {
        margin-top: 0;
      }
    }
    dt {
      font-size: 13px;
      font-weight: 500;
      line-height: 1.8rem;
      color: var(--Semantic-Text-Body-03, #959595);
    }
    dd {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
    }
  }
}
</style>
