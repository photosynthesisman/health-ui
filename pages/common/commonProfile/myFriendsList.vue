<template>
  <BaseBody :show-back-button="true" :page-title="'MY친구'">
    <p class="fz-12">연락처에 저장된 친구들이 이 앱을 사용 중이면 'MY친구'로 보여드립니다.</p>
    <FriendsItem
      v-for="friend in friendsData"
      :id="friend.id"
      :key="friend.id"
      :nickname="friend.nickname"
      :user-name="friend.userName"
      :address="friend.address"
      :sub-address="friend.subAddress"
      :profile-image="friend.profileImage"
      :followed="friend.followed"
      :following="friend.following"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FriendsItem from '~/components/publishing/commonProfile/FriendsItem.vue'

// 팔로워 목록 더미 데이터
const friendsData = ref([
  {
    id: 'checkBox1',
    nickname: '곰탱이',
    userName: '강동현',
    profileImage: 'community/img-rank-profile.png',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox2',
    nickname: '닉네임2',
    userName: '김대용',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox3',
    nickname: '닉네임3',
    userName: '김은혜',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox4',
    nickname: '닉네임4',
    userName: '최경섭',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox5',
    nickname: '닉네임5',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox6',
    nickname: '닉네임6',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox7',
    nickname: '닉네임7',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  },
  {
    id: 'checkBox8',
    userName: '윤시우',
    address: '서울',
    subAddress: '금천',
    followed: true,
    following: true
  }
])
</script>

<style scoped lang="scss"></style>
