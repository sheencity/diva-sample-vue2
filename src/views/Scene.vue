<template>
  <div class="scene-main">
    <content-block caption="场景切换"></content-block>
    <div v-for="scene in scenes" :key="scene.index">
      <div class="content" @click="switchScene(scene)">
        <div class="title">{{scene.title}}</div>
        <div class="icon">
          <img src="../assets/icon/scene/scene.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "../components/content-block.vue";

  import {
    data
  } from "../global";
  import {
    diva
  } from "../global";

  export default {

    data() {
      return {
        scenes: [{
            title: "测试场景01",
            index: 0,
          },
          {
            title: "测试场景02",
            index: 1,
          },
          {
            title: "测试场景03",
            index: 2,
          },
          {
            title: "测试场景04",
            index: 3,
          },
          {
            title: "测试场景05",
            index: 4,
          },
          {
            title: "测试场景06",
            index: 5,
          },
          {
            title: "测试场景07",
            index: 6,
          },
          {
            title: "测试场景08",
            index: 7,
          },
          {
            title: "测试场景09",
            index: 8,
          },
          {
            title: "测试场景10",
            index: 9,
          },
        ],
      }
    },

    methods: {
      switchScene(scene) {
        diva.client.applyScene(scene.index).then(() => {
          data.changeCode(`client.applyScene('${scene.title}')`);
        });
      }
    },

    async mounted() {
      diva.client.applyScene("半鸟瞰").then(() => {
        data.changeCode(`client.applyScene('半鸟瞰')`);
      });
    },
    components: {
      contentBlock
    }
  };
</script>

<style lang="scss">
  .scene-main {
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

    .content:hover .title {
      color: #fff;
    }
  }
</style>