<template>
  <div class="cus-main">
    <content-block caption="数字孪生电梯演示"></content-block>
    <div class="drop-block" v-for="(lift,i) in lifts" :key="lift.title">
      <div class="drop-item">
        <span>{{ lift.title }}</span>
        <div>
          <drop-down :options="options" :initvalue="initvalue" @select="selectLift($event,i)" :disabled="false">
          </drop-down>
          <span style="margin-left: 4px">层</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "@/components/content-block.vue";
  import dropDown from "@/components/dropdown.vue";
  import {
    diva,data
  } from "../global";

  import {
    Elevator,
    ElevatorController,
    Vector3
  } from "@sheencity/diva-sdk";


  export default {
    data() {
      return {
        lifts: [],
        liftModels: [],
        controllers: [],
        currentLift: [1, 1, 1, 1],
        step: 299.7,
        options: [],
        initvalue: {
          value: '1',
          placeholder: '1'
        }
      }
    },
    created() {
      this.lifts = [{
          title: '一号梯',
        },
        {
          title: '二号梯',
        },
        {
          title: '三号梯',
        },
        {
          title: '四号梯',
        },
      ];
      this.options = [{
          value: '1',
          placeholder: '1'
        },
        {
          value: '2',
          placeholder: '2'
        },
        {
          value: '3',
          placeholder: '3'
        },
        {
          value: '4',
          placeholder: '4'
        },
        {
          value: '5',
          placeholder: '5'
        },
        {
          value: '6',
          placeholder: '6'
        },
        {
          value: '7',
          placeholder: '7'
        },
        {
          value: '8',
          placeholder: '8'
        },
        {
          value: '9',
          placeholder: '9'
        },
        {
          value: '10',
          placeholder: '10'
        },
        {
          value: '11',
          placeholder: '11'
        },
        {
          value: '12',
          placeholder: '12'
        },
      ]
    },
    methods: {
      addSelected(lift, i) {
        let selected = {
          value: this.currentLift[i].toString(),
          placeholder: this.currentLift[i].toString(),
        };
        return {
          ...lift,
          selected
        };
      },

      /**
       * 选择电梯层数
       * @param $event (dropdownData) 下拉框选中的值
       * @param i (number) 被触发电梯的 index 值
       */
      async selectLift($event, i) {
        const value = Number($event.value);
        this.controllers[i].land(`f${value}`);
        data.changeCode(`elevatorController.land('f${value}')`);
      }
    },
    async mounted() {
      diva.client.applyScene('电梯演示');
      data.changeCode(`client.applyScene('电梯演示')`);
      this.lifts = this.lifts.map((lift, index) => this.addSelected(lift, index));
      for (let i = 0; i < 4; i++) {
        const [model] = await diva.client.getEntitiesByName(
          this.lifts[i].title
        );
        const coord = await model.getCoordinate();
        const controller = new ElevatorController({
          // 初始化电梯控制器
          landings: {
            f1: new Vector3(coord.x, coord.y, 987),
            f2: new Vector3(coord.x, coord.y, 987 + this.step),
            f3: new Vector3(coord.x, coord.y, 987 + this.step * 2),
            f4: new Vector3(coord.x, coord.y, 987 + this.step * 3),
            f5: new Vector3(coord.x, coord.y, 987 + this.step * 4),
            f6: new Vector3(coord.x, coord.y, 987 + this.step * 5),
            f7: new Vector3(coord.x, coord.y, 987 + this.step * 6),
            f8: new Vector3(coord.x, coord.y, 987 + this.step * 7),
            f9: new Vector3(coord.x, coord.y, 987 + this.step * 8),
            f10: new Vector3(coord.x, coord.y, 987 + this.step * 9),
            f11: new Vector3(coord.x, coord.y, 987 + this.step * 10),
            f12: new Vector3(coord.x, coord.y, 987 + this.step * 11),
            f13: new Vector3(coord.x, coord.y, 987 + this.step * 12),
          },
          speed: 500,
        });
        const lift = new Elevator({
          model,
          signal: controller.signal
        }); // 初始化电梯
        this.liftModels.push(lift);
        this.controllers.push(controller);
      }
    },
    components: {
      contentBlock,
      dropDown,
    },
  };
</script>

<style lang="scss">
  @import "../common/styles/styles.scss";

  .cus-main {
    pointer-events: all;
    color: #fff;

    .drop-block {
      width: 100%;
      padding: 18px 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      cursor: pointer;
      position: relative;
      @include reverseCascade(1, 4);

      .drop-item {
        height: 24px;
        display: flex;
        justify-content: space-between;
        color: #fff;

        span {
          line-height: 24px;
          font-weight: bold;
        }

        app-dropdown {
          width: 57px;
        }
      }
    }
  }
</style>