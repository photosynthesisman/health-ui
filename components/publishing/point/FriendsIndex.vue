<template>
  <div class="friends-index-wrap">
    <FriendsRadioBox
      v-for="friend in friendsToDisplay"
      :id="friend.id"
      :key="friend.id"
      v-model="selectedFriendId"
      :already-beg="friend.alreadyBeg"
      :nickname="friend.nickname"
      :user-name="friend.userName"
      :phone="friend.phone"
      :profile-image="friend.profileImage"
      @change="handleFriendRadioChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FriendsRadioBox from '~/components/publishing/point/FriendsRadioBox.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  actionType: {
    type: String as PropType<'beg' | 'gift' | null>,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'selected-image-path', 'selected-friend-id'])

const selectedFriendId = ref(props.modelValue)
const selectedFriendImagePath = ref('')
watch(selectedFriendId, newId => {
  emit('update:modelValue', newId)
})

// FriendsRadioBox에서 'change' 이벤트가 발생했을 때 호출될 함수
const handleFriendRadioChange = (data: { id: string; fullImagePath: string; nickname: string }) => {
  selectedFriendId.value = data.id
  selectedFriendImagePath.value = data.fullImagePath

  emit('selected-image-path', data.fullImagePath)
  emit('selected-friend-id', data.nickname)
}

const begFriendsData = ref([
  {
    id: 'checkBox1',
    nickname: '곰탱이곰탱이곰탱이곰탱이곰탱이곰탱이곰탱이곰탱이곰탱이곰탱이',
    userName: '강동현강동현강동현강동현',
    phone: '010-****-5678',
    profileImage: 'community/img-rank-profile.png',
    alreadyBeg: true
  }
])
const friendsData = ref([
  {
    id: 'checkBox1',
    nickname: '곰탱이',
    userName: '강동현',
    phone: '010-****-5678',
    profileImage: 'community/img-rank-profile.png',
    alreadyBeg: false
  },
  {
    id: 'checkBox2',
    nickname: '닉네임2',
    userName: '김대용',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox3',
    nickname: '닉네임3',
    userName: '김은혜',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox4',
    nickname: '닉네임4',
    userName: '최경섭',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox5',
    nickname: '닉네임5',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox6',
    nickname: '닉네임6',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox7',
    nickname: '닉네임7',
    phone: '010-****-5678'
  },
  {
    id: 'checkBox8',
    userName: '윤시우',
    phone: '010-****-5678'
  }
])
const friendsToDisplay = computed(() => {
  if (props.actionType === 'beg') {
    return begFriendsData.value
  }
  return friendsData.value
})

// modelValue prop이 변경될 때 내부 값 동기화
watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== selectedFriendId.value) {
      selectedFriendId.value = newVal
    }
    // `friendsData.value` 대신 `friendsToDisplay.value`를 사용
    const initialFriend = friendsToDisplay.value.find(f => f.id === newVal)

    if (initialFriend && initialFriend.profileImage) {
      const initialImagePath = `/_nuxt/assets/images/${initialFriend.profileImage}`
      selectedFriendImagePath.value = initialImagePath
      emit('selected-image-path', initialImagePath)
    } else {
      const defaultImagePath = `/_nuxt/assets/images/img-profile.svg`
      selectedFriendImagePath.value = defaultImagePath
      emit('selected-image-path', defaultImagePath)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.friends-index-wrap {
  margin: -2rem -2rem 0;
  padding: 0 2rem;
}
</style>
