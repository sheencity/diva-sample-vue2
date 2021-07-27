<template>
  <div class="video-main">
    <content-block caption="漫游路径"></content-block>
    <div v-for="video in videos" :key="video.index">
      <div class="content" @click="toggleVideo(video)">
        <div class="title">{{video.title}}</div>
        <div class="icon">
          <img src='../assets/icon/video/play.png' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "../components/content-block.vue";

  import {
    data,
    diva
  } from "../global";



  export default {
    data() {
      return {
        videos: [{
            title: "测试路径01",
            index: 0
          },
          {
            title: "测试路径02",
            index: 1
          },
          {
            title: "测试路径03",
            index: 2
          },
          {
            title: "测试路径04",
            index: 3
          },
          {
            title: "测试路径05",
            index: 4
          },
          {
            title: "测试路径06",
            index: 5
          },
          {
            title: "测试路径07",
            index: 6
          },
          {
            title: "测试路径08",
            index: 7
          },
          {
            title: "测试路径09",
            index: 8
          },
          {
            title: "测试路径10",
            index: 9
          },
        ],
      }
    },

    methods: {
      async toggleVideo(video) {
        await diva.client.stopCameraTrack();
        await diva.client.playCameraTrack(video.index);
        data.changeCode(`client.playCameraTrack('${video.title}')`);
      }
    },

    mounted() {
      diva.client.applyScene("半鸟瞰").then(() => {
        data.changeCode(`client.applyScene('半鸟瞰')`);
      })
    },

    components: {
      contentBlock,
    },
  };
</script>

<style lang="scss">
  .video-main {
    .content {
      width: 240px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      margin-top: 8px;
      cursor: pointer;
      pointer-events: all;

      .title {
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        color: #fff;
      }

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    .selected {
      .title {
        color: #fff;
      }
    }
  }
</style>