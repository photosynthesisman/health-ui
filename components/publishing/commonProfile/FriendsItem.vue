<template>
  <div class="friends-checkbox-wrap">
    <div class="c-label">
      <div class="profile-box">
        <img :src="fullImagePath" alt="프로필 이미지" />
        <div class="detail-profile">
          <div>
            <p>
              <strong class="nickname">{{ nickname }}</strong>
              <span>{{ userName }}</span>
            </p>
            <div class="address">
              <span>{{ address }}</span
              >&nbsp;<span>{{ subAddress }}</span>
            </div>
          </div>
        </div>
      </div>
      <FlexRowDiv v-if="followed && !following">
        <Button btn-type="primary" element-type="button" aria-label="맞팔로우" class="xs" />
      </FlexRowDiv>
      <Button
        v-else-if="followed && following"
        btn-type="secondary"
        element-type="button"
        aria-label="메세지"
        class="xs"
      />
      <FlexRowDiv v-else class="gap-6">
        <Button btn-type="secondary" element-type="button" aria-label="메세지" class="xs" />
        <Button btn-type="primary" element-type="button" aria-label="팔로우 취소" class="xs" />
      </FlexRowDiv>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
const props = withDefaults(
  defineProps<{
    id: string
    name?: string
    disabled?: boolean
    modelValue?: string | number
    nickname?: string
    userName?: string
    address?: string
    subAddress?: string
    profileImage?: string
    followed?: boolean
    following?: boolean
  }>(),
  {
    name: 'friendRadioGroup',
    disabled: false,
    modelValue: '',
    nickname: '',
    userName: '',
    address: '',
    subAddress: '',
    profileImage: '/img-profile.svg',
    followed: false,
    following: false
  }
)

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'
const fullImagePath = computed(() => {
  return `${IMAGE_BASE_PATH}${props.profileImage}`
})
</script>

<style lang="scss" scoped>
.friends-checkbox-wrap {
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin: 0;
  .c-label {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 100%;
    padding: 1.6rem 0.4rem;
    cursor: pointer;
    justify-content: space-between;
  }
  :deep(.c-btn) {
    width: fit-content;
    @media (max-width: 450px) {
      padding: 1rem;
    }
    .text {
      text-wrap: nowrap;
      @media (max-width: 450px) {
        padding: 0;
      }
    }
  }
}
.profile-box {
  display: flex;
  align-items: center;
  width: 100%;
  img {
    width: 4.8rem;
    height: 4.8rem;
    margin-right: 1.2rem;
    border-radius: 50%;
  }
  .detail-profile {
    font-size: 1.4rem;
    line-height: 2rem;
    flex: 1;
    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span {
        color: #959595;
        font-size: 1.3rem;
        font-weight: 500;
        line-height: 1.8rem;
      }
      .nickname {
        display: inline-block;
        margin-right: 0.2rem;
        font-weight: 600;
      }
    }
    .address {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #959595;
    }
  }
}

@media (max-width: 375px) {
  .profile-box {
    img {
      margin-right: 0.8rem;
    }
  }
}
</style>
