<template>
  <BaseBody :show-back-button="true" page-title="설정" logo-type="text" class="pb-36">
    <SettingProfile />
    <SettingToggleWrap />
    <SettingRulesWrap />
    <SettingOutWrap />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import SettingProfile from '~/components/publishing/common/setting/SettingProfile.vue'
import SettingToggleWrap from '~/components/publishing/common/setting/SettingToggleWrap.vue'
import SettingRulesWrap from '~/components/publishing/common/setting/SettingRulesWrap.vue'
import SettingOutWrap from '~/components/publishing/common/setting/SettingOutWrap.vue'
</script>

<style scoped lang="scss"></style>
