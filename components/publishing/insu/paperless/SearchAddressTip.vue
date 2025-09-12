<template>
  <div class="wrap-tip">
    <div class="wrap-tit">
      <h2 class="tit">Tip</h2>
      <span class="tit-sub">아래와 같은 조합을 검색을 하시면 더욱 정확한 결과가 검색됩니다.</span>
    </div>
    <ul class="wrap-example">
      <li class="item">
        <div class="item-tit">도로명 + 건물번호</div>
        <div class="item-tit-sub">예) 판교역로 166, 제주청단로 242</div>
      </li>
      <li class="item">
        <div class="item-tit">지역명(동/리) + 번지</div>
        <div class="item-tit-sub">예) 백현동 532, 제주 영평동 2181</div>
      </li>
      <li class="item">
        <div class="item-tit">지역명(동/리) + 건물명(아파트명)</div>
        <div class="item-tit-sub">예) 분당 주공, 연수동 주공3차</div>
      </li>
      <li class="item">
        <div class="item-tit">사서함명 + 번호</div>
        <div class="item-tit-sub">예) 분당우체국사서함 1~100</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-tip {
  margin-top: 2.4rem;
  .wrap-tit {
    .tit {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .tit-sub {
      display: inline-block;
      margin-top: 0.8rem;
      font-size: 1.2rem;
      line-height: 130%;
    }
  }
  .wrap-example {
    margin-top: 2.4rem;
    .item {
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
      .item-tit {
        font-size: 1.3rem;
        font-weight: 500;
        color: #555555;
      }
      .item-tit-sub {
        margin-top: 0.4rem;
        font-size: 1.2rem;
        line-height: 130%;
        color: #4c7ff7;
      }
    }
  }
}
</style>
