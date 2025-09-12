<template>
  <section class="attaching-file-wrap">
    <div class="wrap-attach-desc">
      <div class="attach-item">
        <img class="img-attach" src="/assets/images/insu/icon-attach01.svg" alt="서류 글씨가 잘 보이도록 촬영" />
        <span class="text">서류 글씨가<br />잘 보이도록 촬영</span>
      </div>
      <div class="attach-item">
        <img class="img-attach" src="/assets/images/insu/icon-attach02.svg" alt="최대 15장까지 서류첨부가 가능" />
        <span class="text">최대 15장까지<br />서류첨부가 가능</span>
      </div>
    </div>
    <!-- 서류첨부 버튼 -->
    <label class="btn-attach" for="file-upload">
      <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
      <img src="/assets/images/insu/icon-attach.svg" alt="첨부파일" />
      <span class="text">첨부서류</span>
    </label>
    <div class="wrap-attached-file">
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
      <button class="btn-delete-attached">
        <img class="img" src="/assets/images/insu/img-attached-file.png" alt="첨부파일" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrap-attach-desc {
  margin: 3.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .attach-item {
    // border: 1px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    &:first-child {
      padding-right: 1.6rem;
    }
    &:not(:first-child) {
      border-left: 0.1rem solid #eeeeee;
      padding-left: 1.6rem;
    }
    .img-attach {
      width: 3.6rem;
      height: auto;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
    }
  }
}
.btn-attach {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 1.8rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  border: 0.1rem dashed var(--Semantic-Border-BRD-01, #e2e2e2);
  [type='file'] {
    display: none;
  }
}
.wrap-attached-file {
  margin-top: 0.8rem;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.1rem;
  .btn-delete-attached {
    flex: 0 0 9.7rem;
    position: relative;
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    width: 9.7rem;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: '';
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      background: url('/assets/images/insu/icon-delete-circle.svg') center center no-repeat;
      background-size: 100%;
    }
  }
}
</style>
