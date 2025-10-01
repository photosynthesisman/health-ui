<template>
  <div>
    <button @click="onInfo1">Info</button>
    <button @click="onInfo2">Info(check)</button>
    <button @click="onInfo3">Info(1줄)</button>
    <button @click="onInfo4">Info(1줄 + check)</button>
    <button @click="onSuccess">인증완료</button>
    <button @click="onError">승인거절</button>
    <button @click="onRequest">보완요청</button>
  </div>
</template>
<script setup lang="ts">
import useNotification from '~/composables/useNotification'

const { infoNotification, successNotification, errorNotification, requsetNotification } = useNotification()

const onInfo1 = () =>
  infoNotification({
    message: '홍길동님의 휴대폰(010-1234-1234)으로<br/>인증번호가 발송되었습니다.<br/>문자메시지를 확인해주세요.'
  })
const onInfo2 = () =>
  infoNotification({
    message: '홍길동님의 휴대폰(010-1234-1234)으로<br/>인증번호가 발송되었습니다.<br/>문자메시지를 확인해주세요.',
    icon: 'icon check-icon-w'
  })
const onInfo3 = () =>
  infoNotification({
    message: '홍길동님 문자메시지를 확인해주세요'
  })
const onInfo4 = () =>
  infoNotification({
    message: '홍길동님 문자메시지를 확인해주세요',
    icon: 'icon check-icon-w'
  })
const onSuccess = () =>
  successNotification({
    message: '인증완료',
    class: 'confirm-status',
    icon: 'icon ico-access'
  })
const onError = () =>
  errorNotification({
    message: '승인거절',
    class: 'confirm-status',
    icon: 'icon ico-decline'
  })
const onRequest = () =>
  requsetNotification({
    message: '보완요청',
    class: 'confirm-status',
    icon: 'icon ico-complement'
  })
</script>
<style scoped>
button {
  margin-right: 8px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
