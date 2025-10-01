<template>
  <BaseBody page-title="전체 커뮤니티 둘러보기" :show-back-button="true">
    <TopicCommunityTab />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import TopicCommunityTab from '~/components/publishing/community/explore/TopicCommunityTab.vue'
</script>
