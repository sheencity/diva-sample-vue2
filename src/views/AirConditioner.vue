<template>
  <div class="air-main">
    <content-block caption="空调控制"></content-block>
    <div v-for="(airDec,i) in airDecs" :key="airDec.title">
      <div class="switch-block" @click="onClick(i)">
        <div class="switch-item">
          <switcher v-model="airDec.state" :label="airDec.title" @switch="onSwitch($event, i)"></switcher>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import contentBlock from "@/components/content-block.vue";
  import switcher from "@/components/switcher.vue";
  import {
    diva,data
  } from "../global";
  import {
    DeviceController
  } from "@sheencity/diva-sdk";

  export default {
    data() {
      return {
        airDecs: [],
        airs: [],
        airControllers: [],
      }
    },
    created() {
      this.airDecs = [{
          title: '测试空调01',
          state: false,
        },
        {
          title: '测试空调02',
          state: false,
        },
        {
          title: '测试空调03',
          state: false,
        },
        {
          title: '测试空调04',
          state: false,
        },
      ];
    },
    methods: {
      /**
       * 空调的开关
       * @param $event (boolean) switch 的值
       * @param index 控制空调的 index 值
       * @returns void
       */
      onSwitch($event, index) {
        if (this.airControllers.length === 0) return;
        $event ? this.airControllers[index].turnOn() : this.airControllers[index].turnOff();
        data.changeCode(`device.${$event ? 'turnOn()' : 'turnOff()'}`);
      },

      /**
       * 设备聚焦
       * @param index 选中设备的 index 值
       * @returns
       */
      async onClick(index) {
        if (!this.airs[index]) return;
        await this.airs[index].focus(1000, -Math.PI / 6);
        data.changeCode(`device.focus(1000, -Math.PI / 6)`);
      }
    },
    async mounted() {
      diva.client.applyScene('空调控制');
      // 初始化设备的初始状态
      this.airDecs.forEach((airDec) => (airDec.state = false));
      this.airDecs.forEach(async (airDec) => {
        const airController = new DeviceController();
        const [air] = await diva.client.getEntitiesByName(airDec.title);
        air.bind(airController.signal); // 绑定控制器
        airController.turnOff();
        this.airs.push(air);
        this.airControllers.push(airController);
      })
      setTimeout(() => {
        data.changeCode(`client.applyScene('空调控制')`)
      }, 0);
    },
    destroyed() {
      this.airControllers.forEach((airController) => airController.turnOff());
    },
    components: {
      contentBlock,
      switcher,
    },
  };
</script>

<style lang="scss">
  .air-main {
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
        pointer-events: none;

        app-switcher {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>