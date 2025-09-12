<template>
  <div class="comment-wrap">
    <div v-if="!isDeleted && !isReported">
      <div class="profile-box">
        <div class="profile-detail">
          <img :src="fullImagePath" alt="프로필 이미지" />
          <div class="flex column">
            <p class="nickname">
              {{ nickname }}<span class="level">Lv.{{ level }}</span>
              <span v-if="author" class="author-badge">작성자</span>
            </p>
            <span class="upload-time">{{ time }}시간 전</span>
          </div>
        </div>
        <button type="button" class="see-more-btn" @click="author ? emit('seeMoreSelf') : emit('seeMoreOther')">
          <span class="icon ico-menu">메뉴 아이콘</span>
        </button>
      </div>
      <div class="comment-detail">
        {{ comment }}
      </div>
    </div>
    <div v-else-if="isDeleted" class="comment-deleted-message">
      <p>이 댓글은 작성자가 삭제했어요.</p>
    </div>
    <div v-else-if="isReported" class="comment-reported-message">
      <p>이 댓글은 신고로 가려졌어요.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const fullImagePath = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})

const props = defineProps({
  src: { type: String, default: 'img-profile.svg' },
  nickname: { type: String, default: '' },
  level: { type: Number, default: 0 },
  time: { type: Number, default: 1 },
  author: { type: Boolean, default: false },
  comment: {
    type: String,
    default: '댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다.'
  },
  isDeleted: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false }
})
const emit = defineEmits(['seeMoreSelf', 'seeMoreOther'])
</script>

<style scoped lang="scss">
.comment-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-left: 5.2rem;
}
.profile-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2.4rem;
  .profile-detail {
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: 1.2rem;
    }
    p {
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 600;
      color: #555;
      .level {
        margin-left: 0.4rem;
        color: #959595;
        font-weight: 500;
      }
    }
    .upload-time {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #959595;
    }
  }
}
.author-badge {
  display: inline-block;
  height: 1.8rem;
  margin-left: 0.6rem;
  padding: 0.1rem 0.4rem;
  background: #eee;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.8rem;
  color: #555;
}
.see-more-btn {
  position: relative;
  @include mixin.rippleEffectPrimary;
  span {
    display: block;
    width: 2rem;
    height: 2rem;
    font-size: 0;
    background-size: 2rem 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cellipse cx='10.416' cy='4.58325' rx='1.25' ry='1.25' fill='%23959595'/%3E%3Ccircle cx='10.416' cy='10.4167' r='1.25' fill='%23959595'/%3E%3Ccircle cx='10.416' cy='16.25' r='1.25' fill='%23959595'/%3E%3C/svg%3E");
  }
}
.comment-detail {
  margin-left: 5.2rem;
}
.reply-box {
  margin-left: 5.2rem;
  .reply-btn {
    position: relative;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;
    @include mixin.rippleEffectPrimary;
  }
}
.comment-deleted-message,
.comment-reported-message {
  display: flex;
  padding-top: 1.6rem;
  gap: 0.4rem;
  font-weight: 500;
  line-height: 2.2rem;
  color: #555;
  &::after {
    content: '';
    width: 2rem;
    height: 2rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.7563 4.74683C9.58588 4.74683 6.41554 4.74683 3.24509 4.74683C2.99855 4.74683 2.79883 4.9466 2.79883 5.19328C2.79883 5.43993 2.99858 5.63971 3.24509 5.63971H3.67603L4.18128 13.6397C4.22034 14.258 4.69833 14.7243 5.29283 14.7243H10.7086C11.3032 14.7243 11.7811 14.258 11.8202 13.6397L12.3256 5.63971H12.7563C13.0029 5.63971 13.2027 5.43993 13.2027 5.19328C13.2027 4.9466 13.003 4.74683 12.7563 4.74683Z' fill='%23777F92'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.1664 2.39305L8.45122 2.16847C8.46458 2.16847 8.47834 2.17932 8.48057 2.19246L8.53208 2.4868L7.19433 2.72092L7.14296 2.42681C7.1402 2.41205 7.15186 2.39581 7.1664 2.39305ZM4.09268 4.1637C4.1181 4.1637 4.14405 4.16144 4.17 4.157L9.12343 3.28953L9.1284 3.2887L11.8644 2.80965C12.1072 2.76721 12.2696 2.53563 12.2271 2.29285C12.1844 2.05014 11.9531 1.88747 11.7103 1.93019L9.41149 2.33281L9.35998 2.03842C9.27228 1.53789 8.79377 1.20198 8.29299 1.2895L7.01235 1.51364C6.51168 1.60145 6.17577 2.07999 6.26344 2.58085L6.3147 2.87491L4.01598 3.27753C3.77323 3.31997 3.61085 3.55153 3.6532 3.79428C3.69151 4.01107 3.87985 4.1637 4.09268 4.1637Z' fill='%234F5561'/%3E%3C/svg%3E")
      center / 1.6rem no-repeat;
  }
}
.comment-reported-message {
  &::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M13.1066 8.99993V12.5714C13.1066 12.8671 12.8666 13.1071 12.5709 13.1071H5.42801C5.1323 13.1071 4.8923 12.8671 4.8923 12.5714V8.99993C4.8923 6.73564 6.73516 4.89279 8.99944 4.89279C11.2637 4.89279 13.1066 6.73564 13.1066 8.99993ZM8.99944 3.82136C9.29516 3.82136 9.53516 3.58136 9.53516 3.28564V2.57136C9.53516 2.27564 9.29516 2.03564 8.99944 2.03564C8.70373 2.03564 8.46373 2.27564 8.46373 2.57136V3.28564C8.46373 3.58136 8.70373 3.82136 8.99944 3.82136ZM13.1659 4.07564L12.6609 4.58064C12.4516 4.78993 12.4516 5.12922 12.6609 5.3385C12.7652 5.44279 12.9023 5.49564 13.0394 5.49564C13.1766 5.49564 13.3137 5.4435 13.418 5.3385L13.923 4.8335C14.1323 4.62422 14.1323 4.28493 13.923 4.07564C13.7137 3.86636 13.3752 3.86636 13.1659 4.07564ZM15.428 8.46422H14.7137C14.418 8.46422 14.178 8.70422 14.178 8.99993C14.178 9.29564 14.418 9.53564 14.7137 9.53564H15.428C15.7237 9.53564 15.9637 9.29564 15.9637 8.99993C15.9637 8.70422 15.7237 8.46422 15.428 8.46422ZM3.28516 8.46422H2.57087C2.27516 8.46422 2.03516 8.70422 2.03516 8.99993C2.03516 9.29564 2.27516 9.53564 2.57087 9.53564H3.28516C3.58087 9.53564 3.82087 9.29564 3.82087 8.99993C3.82087 8.70422 3.58087 8.46422 3.28516 8.46422ZM5.33801 5.3385C5.5473 5.12922 5.5473 4.78993 5.33801 4.58064L4.83301 4.07564C4.62373 3.86636 4.28444 3.86636 4.07516 4.07564C3.86587 4.28493 3.86587 4.62422 4.07516 4.8335L4.58016 5.3385C4.68444 5.44279 4.82158 5.49564 4.95873 5.49564C5.09587 5.49564 5.23373 5.4435 5.33801 5.3385Z' fill='%23B7CCFC'/%3E%3Cpath d='M13.2843 12.0356H4.71289C4.02253 12.0356 3.46289 12.5953 3.46289 13.2856V14.7142C3.46289 15.4046 4.02253 15.9642 4.71289 15.9642H13.2843C13.9747 15.9642 14.5343 15.4046 14.5343 14.7142V13.2856C14.5343 12.5953 13.9747 12.0356 13.2843 12.0356Z' fill='%234C7FF7'/%3E%3C/svg%3E");
  }
}
</style>
