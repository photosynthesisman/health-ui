<template>
  <BaseBody :no-header="true" page-title="Direct Message">
    <DmChatPage />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import DmChatPage from '~/components/publishing/DM/DmChatPage.vue'
</script>

<style scoped lang="scss"></style>
