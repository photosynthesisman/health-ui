<template>
  <BaseBody :show-back-button="true" page-title="대리청구" logo-type="text" :has-add-text-left="true">
    <FlexSection class="pb-32 ml-n20 mr-n20">
      <FlexRowDiv class="space-between pd-20x mt-24 mb-32">
        <TitleSection title="<span class='thin'>김레몬님은</span><br/>구독 서비스 이용중" />
        <StatCircle :total="200" :current="100" />
      </FlexRowDiv>
      <FlexRowDiv class="gap-16 pd-20x">
        <SubroClaimBtn
          no-doc
          :text="'<span>몇번의<br/>터치로 간단히</span><br/><strong>대리청구/<br/>피보험자 관리'"
          @click="clickNext1"
        />
        <SubroClaimBtn
          :text="'<span>청구한<br/>내역이 있다면</span><br/><strong>대리청구<br/>내역 조회'"
          @click="clickNext2"
        />
      </FlexRowDiv>
    </FlexSection>
    <div class="wrap-bg-grey">
      <h2 class="tit2">대리청구 관리 및 안내</h2>
      <SubroClaimManagement :menu-items="subrogationOptions" @click-next="clickNext3" />

      <Button
        class="btn-cancel"
        btn-type="text"
        element-type="button"
        aria-label="보험금 대리청구 서비스 해지"
        icon="ico-greater-than"
        icon-position="right"
        :icon-size="16"
        icon-color="#959595"
        @click="serviceCancellation"
      />
    </div>

    <ConfirmModal
      :title="'대리청구 서비스 해지'"
      :is-visible="showConfirmModal"
      :html="ConfirmModalContent"
      :confirm-button-text="'해지하기'"
      :cancel-button-text="'취소'"
      @cancel="closeConfirmModal"
      @close="closeConfirmModal"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import StatCircle from '~/components/insu/StatCircle.vue'
import SubroClaimBtn from '~/components/insu/SubroClaimBtn.vue'
import SubroClaimManagement from '~/components/insu/SubroClaimManagement.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import FlexSection from '~/components/page/FlexSection.vue'
const clickNext1 = () => {
  return navigateTo('/insu/claim/subrogation/serviceInUse/insuredManagement/')
}
const clickNext2 = () => {
  return navigateTo('/insu/claim/subrogation/generalPublic/agentHistory')
}
const clickNext3 = () => {
  return navigateTo('/insu/claim/subrogation/generalPublic/manageAgent')
}
const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const subrogationOptions = ref([
  {
    text: '설계사 관리',
    img: '/_nuxt/assets/images/insu/subrogation/icon-submain-setting.png',
    alt: '아이콘:설계사 관리'
  },
  {
    text: '대리청구 순위',
    img: '/_nuxt/assets/images/insu/subrogation/icon-submain-rank.png',
    alt: '아이콘:대리청구 순위'
  }
  // 설계사로 가입한 경우
  // {
  //   text: '대리청구 순위',
  //   img: '/_nuxt/assets/images/insu/subrogation/icon-submain-setting2.png',
  //   alt: '아이콘:설계사 대리인 관리'
  // }
])
const serviceCancellation = async () => {
  ConfirmModalContent.value = `
    <div class="fz-16  text-left" style="color: #555">
      서비스를 해지 하시면 대리청구 내역과 고객목록 등의 정보를 조회할 수 없어요.
      <br/>
      단, 대리청구 서비스를 재가입 하시면 이전 정보를 조회할 수 있어요.
    </div>`
  showConfirmModal.value = true
}
const closeConfirmModal = () => {
  showConfirmModal.value = false
}
</script>

<style scoped lang="scss">
.wrap-bg-grey {
  margin: 0 -2rem -2rem;
  padding: 0 2rem 5.4rem;
  background-color: #f4f4f4;
}
h2.tit2 {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 140%;
  color: #2b2b2b;
  margin-top: 3.2rem;
}

.c-btn.btn-cancel {
  display: flex;
  margin: 2.4rem auto;
}
</style>
