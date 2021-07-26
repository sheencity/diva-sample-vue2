<template>
  <div class="lamp-main">
    <content-block caption="灯光控制"></content-block>
    <div v-for="(lightDec,i) in lightDecs" :key="lightDec.title" @click="onClick(i)">
      <div class="switch-block">
        <div class="switch-item">
          <switcher v-model="lightDec.state" :label="lightDec.title" @switch="onSwitch($event, i)"></switcher>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "../components/content-block.vue";
  import switcher from "../components/switcher.vue";
  import {
    diva
  } from "../global";
  import {
      data
    } from "../global";
  import {
    DeviceController
  } from "@sheencity/diva-sdk";

  export default {
    data() {
      return {
        lightDecs: [],
        lights: [],
        lightControllers: []
      }
    },
    created() {
      this.lightDecs = [{
          title: "测试灯光01",
          state: true,
        },
        {
          title: "测试灯光02",
          state: true,
        },
        {
          title: "测试灯光03",
          state: true,
        },
        {
          title: "测试灯光04",
          state: true,
        },
      ];
    },

    methods: {
      /**
       * 灯光的开关
       * @param $event (boolean) switch 的值
       * @param index 控制灯光的 index 值
       * @returns void
       */

      onSwitch($event, index) {
        if (this.lightControllers.length === 0) return;
        $event ? this.lightControllers[index].turnOn() : this.lightControllers[index].turnOff();
        data.changeCode(`device.${$event ? "turnOn()" : "turnOff()"}`);
      },

      /**
       * 设备聚焦
       * @param index 选中设备的 index 值
       * @returns
       */
      async onClick(index) {
        if (!this.lights[index]) return;
        await this.lights[index].focus(1000, -Math.PI / 6);
        data.changeCode(`device.focus(1000, -Math.PI / 6)`);
      },
    },
    mounted() {
      diva.client.applyScene("灯光控制");
      // 初始化设备的初始状态
      this.lightDecs.forEach((lightDec) => (lightDec.state = true));
      this.lightDecs.forEach(async (lightDec) => {
        const lightController = new DeviceController();
        const [light] = await diva.client.getEntitiesByName(
          lightDec.title
        );
        light.bind(lightController.signal); // 绑定控制器
        lightController.turnOff();
        this.lights.push(light);
        this.lightControllers.push(lightController);
      });
      setTimeout(() => {
        data.changeCode(`client.applyScene('灯光控制')`);
      }, 0);
    },
    components: {
      contentBlock,
      switcher,
    },
  };
</script>

<style lang="scss">
  .lamp-main {
    pointer-events: all;

    .switch-block {
      width: 240px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);

      .switch-item {
        width: 100%;

        app-switcher {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>