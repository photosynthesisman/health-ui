<template>
  <div class="main-mission-goal">
    <div class="goal">
      <div class="sub-tit">
        <img src="~/assets/images/healthDebt/ico-mission-goal-1.svg" alt="오늘의 미션" />
        <span>오늘의 미션</span>
      </div>
      <strong class="tit">최대 560P</strong>
    </div>
    <div class="goal">
      <div class="sub-tit">
        <img src="~/assets/images/healthDebt/ico-mission-goal-2.svg" alt="미션성공" />
        <span>미션성공</span>
      </div>
      <strong class="tit">+230P</strong>
    </div>
    <div class="goal">
      <div class="sub-tit">
        <img src="~/assets/images/healthDebt/ico-mission-goal-3.svg" alt="오늘의 건강부채상환" />
        <span>오늘의 건강부채상환</span>
      </div>
      <strong class="tit">-25,000원</strong>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-mission-goal {
  width: 100%;
  position: relative;
  margin-top: 2.4rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #f9f9f9;
  .goal {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;
    .sub-tit {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      img {
        width: 2.8rem;
        height: 2.8rem;
        object-fit: contain;
        flex-shrink: 0;
      }
      span {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.4;
      }
    }
    .tit {
      flex: 1;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1.4;
      text-align: right;
    }
    & + .goal {
      margin-top: 2.5rem;
      &::before {
        content: '';
        width: 100%;
        height: 0.1rem;
        background-color: #e2e2e2;
        position: absolute;
        top: -1.25rem;
        left: 0;
      }
    }
  }
}
</style>
