<template>
  <section class="main-debt-price">
    <i class="icon ico-star" aria-hidden="true"></i>
    <h5 class="tit">
      건강부채를 <br />
      <strong>300,000원</strong> 상환하시면
    </h5>
    <div class="debt-info-list">
      <div class="item-list">
        <i class="icon ico-heart-3d" aria-hidden="true"></i>
        <div class="text">
          레몬시큼님의 건강지수가<br />
          <strong class="point-value up">0.1점</strong> 상승합니다.
        </div>
      </div>
      <div class="item-list">
        <i class="icon ico-greenCross-3d" aria-hidden="true"></i>
        <div class="text">
          연간예상 의료비가<br />
          <strong class="point-value down">10,234,000원</strong> 줄어듭니다.
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.main-debt-price {
  background: #fff;
  padding: 2.4rem;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  .icon {
    width: 6.6rem;
    height: 6.6rem;
    display: block;
    margin: 0 auto 0.8rem;
  }
  .tit {
    font-size: 2rem;
    font-weight: 700;
    color: #2b2b2b;
    line-height: 130%;
    text-align: center;
    strong {
      letter-spacing: -0.4px;
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-skip-ink: auto;
      text-decoration-thickness: auto;
      text-underline-offset: auto;
      text-underline-position: from-font;
    }
  }
  .debt-info-list {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;
    .item-list {
      border-radius: 1.2rem;
      background: #f4f4f4;
      padding: 1.3rem 1.6rem;
      display: flex;
      gap: 0 1.6rem;
      align-items: center;
      .text {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2b2b2b;
        line-height: 140%;
        .point-value {
          display: inline-flex;
          align-items: center;
          gap: 0 0.4rem;
          &::before {
            content: '';
            display: inline-block;
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
          &.up {
            color: #f14960;
            &::before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.70096 4.25C7.27831 3.25 8.72169 3.25 9.29904 4.25L12.7631 10.25C13.3405 11.25 12.6188 12.5 11.4641 12.5H4.5359C3.3812 12.5 2.65951 11.25 3.23686 10.25L6.70096 4.25Z' fill='%23F14960'/%3E%3C/svg%3E");
            }
          }
          &.down {
            color: #4c7ff7;
            &::before {
              top: -0.3rem;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6.70096 13.75C7.27831 14.75 8.72169 14.75 9.29904 13.75L12.7631 7.75C13.3405 6.75 12.6188 5.5 11.4641 5.5H4.5359C3.3812 5.5 2.65951 6.75 3.23686 7.75L6.70096 13.75Z' fill='%234C7FF7'/%3E%3C/svg%3E");
            }
          }
        }
      }
      .icon {
        width: 4.8rem;
        height: 4.8rem;
        margin: 0;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
