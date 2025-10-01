<template>
  <BaseBody :show-back-button="true" :has-add-text-left="true" :add-text-left="userProfile">
    <StickyTabsContainer>
      <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    </StickyTabsContainer>
    <!-- 팔로워 탭 -->
    <div v-if="activeLineTab === 'Follower'">
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
    </div>
    <!-- 팔로잉 탭 -->
    <div v-else-if="activeLineTab === 'Following'">
      <FriendsItem
        v-for="friend in friendsData2"
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
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import FriendsItem from '~/components/publishing/commonProfile/FriendsItem.vue'
const dummyimg = '/_nuxt/assets/images/community/img-rank-profile.png'
const userNickname = '동해번쩍'
const userProfile = ref(`
  <span class="flex gap-6">
    <img src="${dummyimg}" alt="더미이미지" style="width:3.2rem; height: 3.2rem; border-radius:50%"/>
    <strong class="fz-18">${userNickname}</strong>
  </span>
`)
// LineTabs 이벤트 핸들러
// LineTabs 상태 관리
const activeLineTab = ref('Follower')

const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

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
    following: false
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
// 팔로잉 목록 더미 데이터
const friendsData2 = ref([
  {
    id: 'checkBox1',
    nickname: '곰탱이',
    userName: '강동현',
    profileImage: 'community/img-rank-profile.png',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox2',
    nickname: '닉네임2',
    userName: '김대용',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox3',
    nickname: '닉네임3',
    userName: '김은혜',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox4',
    nickname: '닉네임4',
    userName: '최경섭',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox5',
    nickname: '닉네임5',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox6',
    nickname: '닉네임6',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox7',
    nickname: '닉네임7',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  },
  {
    id: 'checkBox8',
    userName: '윤시우',
    address: '서울',
    subAddress: '금천',
    followed: false,
    following: false
  }
])

const lineTabs = ref<Tab[]>([
  { title: `팔로워 ${friendsData.value.length}`, key: 'Follower' },
  { title: `팔로잉 ${friendsData2.value.length}`, key: 'Following' }
])
</script>

<style scoped lang="scss"></style>
