<template>
  <BaseBody page-title="내 커뮤니티" :show-back-button="true">
    <MyCommunityTab :is-editing="false" />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import MyCommunityTab from '~/components/publishing/community/explore/MyCommunityTab.vue'
</script>
