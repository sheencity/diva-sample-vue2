<template>
  <div class="content-block-main">
    <div class="title">
      <span>{{ caption }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      caption: String,
      width: Number,
    }

  }
</script>


<style lang="scss">
  .content-block-main {
    width: 240px;

    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #fff;

      span {
        line-height: 24px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      // max-height: 680px;
      // overflow-y: scroll;
    }
  }
</style>