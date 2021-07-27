<template>
  <div class="global-main">
    <content-block caption="操作帮助"></content-block>
    <div class="help-block">
      <div class="title">鼠标操作帮助</div>
      <div class="help-item">
        <span>左键</span>
        <span>触发事件</span>
      </div>
      <hr />
      <div class="help-item">
        <span>右键</span>
        <span>旋转</span>
      </div>
      <hr />
      <div class="help-item">
        <span>中键</span>
        <span>绕屏幕中心旋转</span>
      </div>
      <hr />
      <div class="help-item">
        <span>Shift + 中键</span>
        <span>平移</span>
      </div>
    </div>
    <div class="help-block">
      <div class="title">键盘操作帮助</div>
      <div class="help-item">
        <span>W,S,A,D</span>
        <span>前，后，左，右</span>
      </div>
      <hr />
      <div class="help-item">
        <span>Q,E</span>
        <span>垂直升降</span>
      </div>
    </div>

    <div style="margin-top: 20px">
      <content-block caption="其他设置"></content-block>
      <div class="global-block">
        <div class="drop-item">
          <span>模式</span>
          <div>
            <drop-down :options="options" :initvalue="initvalue" @select="select" :disabled="false"></drop-down>
          </div>
        </div>
        <div class="switch-item">
          <switcher :label="'罗盘'" v-model="compass" @switch="swit"></switcher>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "../components/content-block.vue";
  import dropDown from "../components/dropdown.vue";
  import switcher from "../components/switcher.vue";
  import {
    diva,
    data
  } from "../global";
  import {
    MovementMode
  } from "@sheencity/diva-sdk";

  export default {
    data() {
      return {
        compass: false,
        options: [{
            value: "false",
            placeholder: "飞行",
          },
          {
            value: "true",
            placeholder: "人视",
          },
        ],
        initvalue: {
          value: "false",
          placeholder: "飞行",
        }
      }
    },
    methods: {
      select(v) {
        diva.client.setMovementMode(
          v.value == "true" ? MovementMode.ThirdPerson : MovementMode.Fly
        );
        data.changeCode(
          `client.setMovementMode(${
          v.value == "true" ? "MovementMode.ThirdPerson" : "MovementMode.Fly"
        })`
        );
      },
      swit(v) {
        diva.client.setCompass(!this.compass);
        data.changeCode(`client.setCompass(${!this.compass})`);
      }
    },
    async mounted() {
      await diva.client.applyScene("全局配置");
      this.compass = data.compass;
      diva.client.setCompass(this.compass);
      data.changeCode(`client.setCompass(${this.compass})`);
      setTimeout(() => {
        data.changeCode(`client.applyScene('全局配置')`);
      }, 0);
    },
    destroyed() {
      diva.client.setMovementMode(MovementMode.Fly);
    },
    components: {
      contentBlock,
      dropDown,
      switcher,
    },
  };
</script>

<style lang="scss">
  .global-main {
    pointer-events: all;

    .help-block {
      width: 240px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      color: #fff;

      hr {
        width: 100%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.5);
        margin: 0;
        border: none;
      }

      .title {
        line-height: 17px;
        margin-bottom: 6px;
      }

      .help-item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-top: 7px;
        margin-bottom: 6px;
      }
    }

    .global-block {
      width: 240px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);

      .drop-item {
        height: 24px;
        display: flex;
        justify-content: space-between;

        span {
          line-height: 24px;
          font-weight: bold;
          color: #fff;
        }

        app-dropdown {
          width: 57px;
        }
      }

      .switch-item {
        width: 100%;
        margin-top: 12px;

        app-switcher {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>