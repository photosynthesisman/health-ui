<template>
  <section class="annual-rank-wrap">
    <div class="top-box">
      <h2 class="title" v-html="topTitle"></h2>
      <p class="sub-title" v-html="topSubTitle"></p>
      <img class="top-img" :src="topImg" :alt="topTitle" />
    </div>
    <div class="season-box">
      <h3 class="season-title">Season 2026</h3>
      <div v-if="status === 'notJoined'" class="empty-rank">
        <div class="empty-icon">
          <img src="~/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" />
        </div>
        <p>걷기왕 챌린지 참가내역이 없어요.</p>
      </div>
      <div v-else class="has-rank">
        <div class="rank-info">
          <p>
            누적 건강 걸음수(아이템 효과 없이 순수한 걸음수), 참가 횟수, 챌린지 최종 등수를 활용하여 종합 점수를 통해
            연간 MVP를 선정합니다.
          </p>
          <span>마지막 점수 산정 기준일: 2026년 12월 마지막 챌린지 종료일</span>
        </div>
        <div class="rank-my" :class="{ active: isAccordionState }">
          <button type="button" class="rank-acc-btn" @click="toggleAccordion">
            <p>내순위 <span class="rank-num">4899위</span></p>
            <strong class="my-point">76.249</strong>
            <i class="icon arrow-down-type"></i>
          </button>
          <div class="rank-acc-body">
            <ul class="rank-detail">
              <li>
                <strong>걸음수 성과</strong>
                <div class="detail-flex">
                  <span class="desc">총 걸음수</span>
                  <p class="txt">4,532 걸음</p>
                </div>
                <div class="detail-flex">
                  <span class="desc">누적 걸음수 등수</span>
                  <p class="txt">320,202 등</p>
                </div>
              </li>
              <li>
                <strong>챌린지 참여 성과</strong>
                <div class="detail-flex">
                  <span class="desc">참가 횟수</span>
                  <p class="txt">32회 / 52 회</p>
                </div>
                <div class="detail-flex">
                  <span class="desc">평균 등수</span>
                  <p class="txt">100,249 등</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
type ChallengeStatus = 'joined' | 'notJoined'

const props = defineProps<{
  status: ChallengeStatus
  topTitle: string
  topSubTitle: string
  topImg: string
}>()

const isAccordionState = ref(false)
const toggleAccordion = () => {
  isAccordionState.value = !isAccordionState.value
}
</script>

<style lang="scss" scoped>
.annual-rank-wrap {
  position: relative;
  margin: -5.6rem -2rem 0;
  padding: 5.6rem 2rem 3.2rem;
  background-color: #dbe5fd;
  overflow: hidden;
  .top-box {
    width: 100%;
    position: relative;
    padding-block: 2rem;
    margin-bottom: 1.2rem;

    .title {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 0.8rem;
    }
    .sub-title {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 1.4;
      color: #555;
    }
    .top-img {
      width: 16rem;
      height: 15rem;
      object-fit: contain;
      position: absolute;
      top: 0;
      right: -2rem;
      opacity: 0;
      animation: slideInFromRight 0.5s ease-out forwards;
    }
  }
  .season-box {
    width: 100%;
    position: relative;
    border-radius: 1.2rem;
    background-color: #fff;
    padding: 2.4rem 2rem 0;
    .season-title {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.4;
    }
    .empty-rank {
      padding-block: 2rem 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;
      .empty-icon {
        width: 8rem;
        height: 8rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      p {
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
        color: #555;
      }
    }
    .has-rank {
      .rank-info {
        width: 100%;
        padding-block: 0.8rem 2rem;
        margin-bottom: 2rem;
        border-bottom: 0.1rem solid #e2e2e2;
        p {
          font-size: 1.4rem;
          line-height: 1.4;
          margin-bottom: 0.4rem;
        }
        span {
          font-size: 1.3rem;
          line-height: 1.4;
          color: #959595;
        }
      }
      .rank-my {
        .rank-acc-btn {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem 2.4rem 0;
          p {
            font-size: 1.4rem;
            line-height: 1.4;
            display: flex;
            align-items: center;
            gap: 0 0.4rem;
            color: #555;
            font-weight: 400;
            .rank-num {
              font-weight: 700;
              font-size: 1.6rem;
              color: #2b2b2b;
            }
          }
          .my-point {
            position: relative;
            padding-left: 2.8rem;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.3;
            color: #4c7ff7;
            &::before {
              content: '';
              width: 2.4rem;
              height: 2.4rem;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.2863 12.0001C22.2863 17.6807 17.6812 22.2858 12.0006 22.2858C6.31992 22.2858 1.71484 17.6807 1.71484 12.0001C1.71484 6.31943 6.31992 1.71436 12.0006 1.71436C17.6812 1.71436 22.2863 6.31943 22.2863 12.0001Z' fill='%23C4D6FF'/%3E%3Cpath d='M20.4161 12.0001C20.4161 7.35227 16.6484 3.58449 12.0006 3.58449C7.35276 3.58449 3.58497 7.35227 3.58497 12.0001C3.58497 16.6479 7.35276 20.4157 12.0006 20.4157V22.2858C6.31992 22.2858 1.71484 17.6807 1.71484 12.0001C1.71484 6.31943 6.31992 1.71436 12.0006 1.71436C17.6812 1.71436 22.2863 6.31943 22.2863 12.0001C22.2863 17.6807 17.6812 22.2858 12.0006 22.2858V20.4157C16.6484 20.4157 20.4161 16.6479 20.4161 12.0001Z' fill='white'/%3E%3Cpath d='M17.1352 10.9756C17.1866 10.7061 16.981 10.3827 16.7241 10.3827L13.7949 9.95148L12.4588 7.14852C12.4074 7.04072 12.356 6.98681 12.2533 6.93291C11.9963 6.7712 11.688 6.87901 11.5338 7.14852L10.2491 9.95148L7.31992 10.3827C7.16576 10.3827 7.06298 10.4366 7.01159 10.5444C6.80603 10.76 6.80603 11.0834 7.01159 11.2991L9.11853 13.4552L8.60465 16.5276C8.60465 16.6354 8.60465 16.7433 8.65603 16.8511C8.8102 17.1206 9.11853 17.2284 9.37548 17.0667L11.9963 15.6113L14.6171 17.0667C14.6685 17.1206 14.7713 17.1206 14.8741 17.1206C14.9255 17.1206 14.9255 17.1206 14.9769 17.1206C15.2338 17.0667 15.4394 16.7972 15.388 16.4737L14.8741 13.4013L16.981 11.2451C17.0838 11.1912 17.1352 11.0834 17.1352 10.9756Z' fill='%234C7FF7'/%3E%3C/svg%3E%0A");
            }
          }
          .icon {
            width: 2.4rem;
            height: 2.4rem;
            position: absolute;
            top: 0;
            right: 0;
            transition: transform 0.3s ease-in-out;
          }
        }
        .rank-acc-body {
          position: relative;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
          .rank-detail {
            li {
              width: 100%;
              position: relative;
              border-radius: 0.8rem;
              background-color: #f9f9f9;
              padding: 1.2rem 1.6rem;
              strong {
                display: block;
                font-size: 1.4rem;
                font-weight: 600;
                line-height: 1.4;
                margin-bottom: 0.6rem;
              }
              .detail-flex {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                .desc {
                  font-size: 1.2rem;
                  font-weight: 500;
                  color: #555;
                }
                .txt {
                  flex: 1;
                  font-size: 1.4rem;
                  font-weight: 600;
                  text-align: right;
                }
                & + .detail-flex {
                  margin-top: 0.4rem;
                }
              }
              & + li {
                margin-top: 0.8rem;
              }
              &:last-child {
                margin-bottom: 2.4rem;
              }
            }
          }
        }
        &.active {
          .rank-acc-btn {
            .icon {
              transform: rotate(180deg);
            }
          }
          .rank-acc-body {
            max-height: 50rem;
          }
        }
      }
    }
  }
}
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
