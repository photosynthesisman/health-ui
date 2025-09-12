<template>
  <FlexColDiv class="select-time-box">
    <InputLabelText label="게임 기간" :required="true" />
    <FlexRowDiv>
      <span class="time-label">시작</span>
      <InputCalendar />
      <InputClock :hour-only="true" />
    </FlexRowDiv>
    <FlexRowDiv>
      <span class="time-label">종료</span>
      <InputCalendar />
      <InputClock :hour-only="true" />
    </FlexRowDiv>
  </FlexColDiv>
</template>

<script setup lang="ts">
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import InputCalendar from '~/components/publishing/input/InputCalendar.vue'
import InputClock from '~/components/publishing/input/InputClock.vue'
</script>

<style lang="scss" scoped>
.select-time-box {
  gap: 0.6rem;
  .flex-row {
    align-items: center;
    gap: 0.6rem;
    .time-label {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 1.5;
    }
    .c-input {
      width: calc(50% - 1.85rem);
      flex-shrink: 1;
      flex-grow: 0;
      .c-inp {
        flex: 0 1 auto;
      }
    }
  }
}
</style>
