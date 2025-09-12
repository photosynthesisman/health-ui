<template>
  <div class="no-friends-list">
    <strong class="tit">아직 친구가 없네요.</strong>
    <span>연락처에서 친구를 초대하고 랭킹을 채워보세요.</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.no-friends-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem 0;
  height: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  .tit {
    color: #555;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 140%;
  }
  &::before {
    content: '';
    display: block;
    width: 8rem;
    height: 8rem;
    margin: 0 auto 0.8rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='58' height='63' viewBox='0 0 58 63' fill='none'%3E%3Cpath d='M0.5 15C0.5 10.5817 4.08172 7 8.5 7H49.6428C54.0611 7 57.6429 10.5817 57.6429 15V54.1429C57.6429 58.5611 54.0611 62.1429 49.6429 62.1429H8.50001C4.08173 62.1429 0.5 58.5611 0.5 54.1429V15Z' fill='%23BAC5DF'/%3E%3Crect x='9.64307' width='38.8571' height='40' rx='4' fill='%23F2F2F2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.5208 11.0208C24.0615 10.4801 24.9382 10.4801 25.4789 11.0208L29.4999 15.0417L33.5208 11.0208C34.0615 10.4801 34.9382 10.4801 35.4789 11.0208C36.0196 11.5615 36.0196 12.4382 35.4789 12.9789L31.458 16.9998L35.4789 21.0208C36.0196 21.5615 36.0196 22.4382 35.4789 22.9789C34.9382 23.5196 34.0615 23.5196 33.5208 22.9789L29.4999 18.958L25.4789 22.9789C24.9382 23.5196 24.0615 23.5196 23.5208 22.9789C22.9801 22.4382 22.9801 21.5615 23.5208 21.0208L27.5417 16.9998L23.5208 12.9789C22.9801 12.4382 22.9801 11.5615 23.5208 11.0208Z' fill='%23D5D5D5'/%3E%3Cpath d='M0.5 33.9997C0.5 31.7906 2.29086 29.9997 4.5 29.9997H34.1884C35.9101 29.9997 37.4387 28.898 37.9831 27.2646L38.4454 25.8777C38.9899 24.2443 40.5185 23.1426 42.2402 23.1426L53.6429 23.1426C55.852 23.1426 57.6429 24.9334 57.6429 27.1426V53.9997C57.6429 58.418 54.0611 61.9997 49.6429 61.9997H8.50001C4.08173 61.9997 0.5 58.418 0.5 53.9997L0.5 33.9997Z' fill='%23C6D4F3'/%3E%3C/svg%3E");
  }
}
</style>
