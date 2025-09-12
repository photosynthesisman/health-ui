<template>
  <div class="wrap-search-word">
    <ul class="wrap-keyword">
      <li class="item-keyword">부산광역시 기장군 <strong>판</strong>곡길</li>
      <li class="item-keyword">광주광역시 남구 <strong>판</strong>촌길</li>
      <li class="item-keyword">대전광역시 동구 <strong>판</strong>암동</li>
    </ul>
    <div class="wrap-result">
      <div class="wrap-info">
        <div class="info-tit">검색어에 아래와 같은 조합을 이용하시면 더욱 정확한 결과가 검색되어요.</div>
        <div class="info-tit-sub">도로명+건물번호’, ‘지역명+지번’, ‘지역명+건물명(아파트명)’, ‘사서함명+번호’</div>
      </div>
      <ul class="wrap-address">
        <li class="address-item">
          <div class="item-head">
            <div class="post-num">46031</div>
            <div class="more">
              <div class="more-item">영문보기</div>
              <div class="more-item">지도</div>
            </div>
          </div>
          <div class="address">
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="wrap-address-more">
              <span class="text">ㄴ 외 지번주소 1건</span>
              <div class="btn-more">더보기</div>
            </div>
          </div>
        </li>
        <li class="address-item">
          <div class="item-head">
            <div class="post-num">46031</div>
            <div class="more">
              <div class="more-item">영문보기</div>
              <div class="more-item">지도</div>
            </div>
          </div>
          <div class="address">
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="wrap-address-more">
              <span class="text">ㄴ 외 지번주소 1건</span>
              <div class="btn-more">더보기</div>
            </div>
          </div>
        </li>
        <li class="address-item">
          <div class="item-head">
            <div class="post-num">46031</div>
            <div class="more">
              <div class="more-item">영문보기</div>
              <div class="more-item">지도</div>
            </div>
          </div>
          <div class="address">
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="address-detail">
              <div class="label">도로명</div>
              <div class="value">부산 기장군 장안읍 판고길 2</div>
            </div>
            <div class="wrap-address-more">
              <span class="text">ㄴ 외 지번주소 1건</span>
              <div class="btn-more">더보기</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-result {
  .wrap-address {
    border-top: 0.1rem solid #eeeeee;
    margin: 0 -2rem;
    padding: 0 2rem;
    .address-item {
      padding: 2rem 0.4rem;
      &:not(:first-child) {
        border-top: 0.1rem solid #eeeeee;
      }
      .item-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .post-num {
          font-size: 1.6rem;
          font-weight: normal;
          color: #f14960;
        }
        .more {
          display: flex;
          align-items: center;
          .more-item {
            padding: 0 0.8rem;
            height: 1.4rem;
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 400;
            color: #555555;
            &:not(:first-child) {
              border-left: 0.1rem solid #d2d2d2;
            }
          }
        }
      }
      .address {
        margin-top: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        .address-detail {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .label {
            display: inline-block;
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            border: 0.1rem solid #f4f4f4;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4c7ff7;
          }
          .value {
            font-size: 1.6rem;
            font-weight: 500;
          }
        }
        .wrap-address-more {
          margin-left: 5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .text {
            font-size: 1.2rem;
            line-height: 130%;
            color: #959595;
          }
          .btn-more {
            display: inline-block;
            padding: 0.2rem 0.4rem;
            font-size: 0.9rem;
            font-weight: 500;
            background-color: #959595;
            border-radius: 0.3rem;
            color: #fff;
          }
        }
      }
    }
  }
  .wrap-info {
    padding: 1.6rem 0;
    .info-tit {
      font-size: 1.2rem;
      line-height: 130%;
    }
    .info-tit-sub {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      line-height: 130%;
      color: #4c7ff7;
    }
  }
}
.wrap-keyword {
  margin-top: 1rem;
  .item-keyword {
    padding: 1.5rem 0;
    font-size: 1.6rem;
    font-weight: 500;
    strong {
      color: #4c7ff7;
    }
  }
}
</style>
