<template>
  <div class="age-group-rank">
    <div class="tit">
      40대,남 연령대 중<br />
      <strong>1,242위</strong> 입니다
    </div>
    <div class="rank-info">
      동일 연령대 12,400명 <br />
      대상 지표입니다
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.age-group-rank {
  background-color: vars.$white;
  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.04);
  padding: 2rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .tit {
    font-size: 1.6rem;
    color: #2b2b2b;
    font-weight: 700;
    margin-bottom: 2rem;
    strong {
      color: vars.$blue-primary;
    }
  }
  .rank-info {
    font-size: 1.3rem;
    font-weight: 500;
    color: #555;
  }
}
</style>
