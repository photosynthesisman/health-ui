<template>
  <BaseBody :show-back-button="true" page-title="Direct Message" logo-type="text">
    <DmListWrap v-if="DmItemList.length > 0">
      <DmItem v-for="(item, index) in DmItemList" :key="index" @click="moveToDMChat" />
    </DmListWrap>
    <!-- 09-17 DM 없음 페이지 추가 -->
    <FlexColDiv v-else class="flex-1">
      <DmNoItem @click="moveToDMChat" />
    </FlexColDiv>

    <!-- 모달이 아닌 페이지 형태로 변경 -->
    <!-- <Teleport to="body">
      <DmModal
        :is-visible="showDmModal"
        :is-show-cancel-button="true"
        :is-show-confirm-button="true"
        cancel-button-text="취소"
        confirm-button-text="전송"
        @close="closeDmModal"
        @confirm="handleConfirm"
      />
    </Teleport> -->
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseBody from '~/components/layout/BaseBody.vue'

import DmListWrap from '~/components/publishing/DM/DmListWrap.vue'
import DmItem from '~/components/publishing/DM/DmItem.vue'
import DmNoItem from '~/components/publishing/DM/DmNoItem.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import DmModal from '~/components/publishing/DM/DmModal.vue'
const DmItemList = ref([])
// const DmItemList = ref([{}, {}, {}, {}])
const router = useRouter()

// DM 모달 상태 관리
const showDmModal = ref(false)

// DM 채팅 페이지로 이동
const moveToDMChat = () => {
  router.push('/common/DM/DmChatPage')
}

const openDmModal = () => {
  showDmModal.value = true
}

// DM 모달 닫기
const closeDmModal = () => {
  showDmModal.value = false
}

// DM 메시지 전송
const handleConfirm = () => {
  // 여기에 메시지 전송 로직 추가
  console.log('DM 메시지 전송')
  showDmModal.value = false
}
</script>

<style scoped lang="scss"></style>
