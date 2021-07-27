<template>
  <div class="floor-main">
    <content-block caption="楼层展示"></content-block>
    <div class="switch-block">
      <div class="switch-item">
        <switcher :label="'炸开'" v-model="explode" @switch="explodef" :disabled="false"></switcher>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <content-block caption="楼层展示"></content-block>
      <div class="switch-block">
        <div class="switch-item">
          <switcher v-model="gradation" :label="'分层聚焦'" @switch="gradationf"></switcher>
        </div>
      </div>
      <div class="drop-block" style="z-index: 100;">
        <div class="drop-item">
          <span>聚焦楼层</span>
          <div>
            <drop-down class="drop-down" :options="options" :initvalue="initial" @select="selectf" :disabled="!gradation"></drop-down>
            <span style="margin-left: 4px;">层</span>
          </div>
        </div>
      </div>
      <div class="switch-block">
        <div class="switch-item">
          <switcher class="switcher" v-model="pipe" :label="'显示管线'" @switch="pipef" :disabled="!gradation"></switcher>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "@/components/content-block.vue";
  import dropDown from "@/components/dropdown.vue";
  import switcher from "@/components/switcher.vue";


  import {
    data,
    diva
  } from "../global";
  import {
    defer,
    from,
    Observable
  } from "rxjs";
  import {
    shareReplay
  } from "rxjs/operators";

  export default {

    data() {
      return {
        models: [],
        pipeModels: [],
        selectedFloor: {
          placeholder: "1",
          value: "一层-1_1",
        },
        pipe: false,
        group$: new Observable(),
        explode: false,
        gradation: false,
        options: [],
        initial: {}
      }
    },

    created() {
      this.options = [{
            placeholder: "1",
            value: "一层-1_1",
            pipeLineName: "一层管线"
          },
          {
            placeholder: "2",
            value: "二层(1)-1_1",
            pipeLineName: "二层管线"
          },
          {
            placeholder: "3",
            value: "三楼-1_5",
            pipeLineName: "三层管线"
          },
          {
            placeholder: "4",
            value: "标准层(1)-1_11",
            pipeLineName: "四层管线"
          },
          {
            placeholder: "5",
            value: "标准层(1)-1_12",
            pipeLineName: "五层管线"
          },
          {
            placeholder: "6",
            value: "标准层(1)-1_15",
            pipeLineName: "六层管线"
          },
          {
            placeholder: "7",
            value: "标准层(1)-1_16",
            pipeLineName: "七层管线"
          },
          {
            placeholder: "8",
            value: "标准层(1)-1_9",
            pipeLineName: "八层管线"
          },
          {
            placeholder: "9",
            value: "标准层(1)-1_10",
            pipeLineName: "九层管线"
          },
          {
            placeholder: "10",
            value: "标准层(1)-1_14",
            pipeLineName: "十层管线"
          },
          {
            placeholder: "11",
            value: "标准层(1)-1_17",
            pipeLineName: "十一层管线",
          },
          {
            placeholder: "12",
            value: "标准层(1)-1_13",
            pipeLineName: "十二层管线",
          },
          {
            placeholder: "13",
            value: "顶楼_12",
            pipeLineName: "顶层管线"
          },
        ],
        this.initial = {
          placeholder: "1",
          value: "一层-1_1",
          pipeLineName: "一层管线",
        }
    },
    methods: {
      setexplode(val) {
        if (!this.group$) return;
        this.group$.subscribe((group) => {
          const options = {
            spacing: 300,
            eachHeight: 290,
            duration: 5
          };

          if (val) group.disassemble(options);
          else group.assemble();

          data.changeCode(
            `const group = client.getEntityGroupByGroupPath('场景模型/主楼拆分');`,
            val ?
            "client.disassemble(group, { spacing: 300, eachHeight: 290, duration: 5 })" :
            "client.assemble(group)"
          );
        });
      },

      setgradation(v) {
        if (v) {
          // 聚焦到已选中的层数
          this.focusFloor(Number(this.selectedFloor.placeholder));
          this.setpipe(false);
        } else {
          this.setVisibility(this.models, true, true);
          this.setVisibility(this.pipeModels, false, true);
        }
        this.gradation = !v;
      },

      setselectedFloor(v) {
        if (!this.gradation) {
          return;
        }
        if (this.gradation) {
          // 聚焦到已选中的层数
          this.focusFloor(Number(v.placeholder));
        }
        // 此处设置层数
        this.selectedFloor = v;
      },

      setpipe(v) {
        if (!this.gradation) {
          return;
        }
        // 此处设置显示管线
        const currentPipe = this.pipeModels.filter(
          (pipeModel) =>
          pipeModel.name ===
          this.options[Number(this.selectedFloor.placeholder) - 1].pipeLineName
        );
        if (this.gradation && v) {
          this.setVisibility(currentPipe, true);
        } else {
          this.setVisibility(currentPipe, false);
        }
      },

      async focusFloor(floor) {
        // 显示当前层数模型
        const modelToFocus = this.models.filter(
          (model) => model.name === this.options[floor - 1].value
        );
        // 隐藏其他层数模型
        const modelToHide = this.models.filter(
          (model) => model.name !== this.options[floor - 1].value
        );
        // 显示当前层数管道
        const pipeToShow = this.pipeModels.filter(
          (pipeModel) => pipeModel.name === this.options[floor - 1].pipeLineName
        );
        // 隐藏其他层数的管道
        const pipeToHide = this.pipeModels.filter(
          (pipeModel) => pipeModel.name !== this.options[floor - 1].pipeLineName
        );

        // 聚焦当前楼层
        await this.focus(modelToFocus[0]);
        await this.setVisibility(modelToFocus, true);
        await this.setVisibility(modelToHide, false);
        await this.setVisibility(pipeToHide, false);
        await this.setVisibility(pipeToShow, this.pipe ? true : false);
        data.changeCode(
          `client.setVisibility(${[
          ...modelToFocus.map((model) => `'${model.id}'`),
        ]}, true)`
        );
      },

      // 聚焦方法
      async focus(model) {
        await model.focus(5000, -Math.PI / 6);
        data.changeCode(`model.focus(5000, -Math.PI / 6)`);
      },
      // 显示隐藏方法
      setVisibility(models, visible, leave) {
        models.map((model) => model.setVisibility(visible));
        if (!leave) {
          data.changeCode(
            `client.setVisibility(${[
              ...models.map((model) => `'${model.id}'`),
            ]}, ${visible})`
          );
        }

      },
      // 获取模型方法
      async getModel(name) {
        const [model] = await diva.client.getEntitiesByName(name);
        return model;
      },
      // 设置路径显示隐藏
      SetPathVisibility(v) {
        const pathIndexArray = [0, 1, 2, 3, 4];
        pathIndexArray.forEach((i) => {
          diva.client.setPathVisibility(i, v);
        });
      },

      explodef(val) {
        this.setexplode(val);
      },
      gradationf(val) {
        this.setgradation(val);
      },
      pipef(val) {
        this.setpipe(val);
      },

      selectf(val) {
        this.setselectedFloor(val);
      },

    },

    async mounted() {
      await diva.client.applyScene("楼层展示");
      data.changeCode(`client.applyScene('楼层展示')`);
      this.options.forEach(async (option) => {
        const model = await this.getModel(option.value);
        const pipeModel = await this.getModel(option.pipeLineName);
        // 获取所有楼层模型以及管道模型
        this.models.push(model);
        this.pipeModels.push(pipeModel);
      });
      this.SetPathVisibility(false);
      const getGroup = () =>
        from(diva.client.getModelGroupByGroupPath("场景模型/主楼拆分"));
      this.group$ = defer(getGroup).pipe(shareReplay(1));
    },
    async destroyed() {
      if (this.group$) {
        this.group$.subscribe((group) => group.assemble());
      }
      // 显示所有楼层，隐藏所有管道，并且不显示示例代码
      this.setVisibility(this.models, true, true);
      this.setVisibility(this.pipeModels, false, true);
      this.SetPathVisibility(true);
    },
    components: {
      contentBlock,
      switcher,
      dropDown,
    },
  };
</script>

<style lang="scss">
  .floor-main {
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

        .switcher {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .drop-block {
      width: 100%;
      padding: 18px 20px;
      margin-top: 8px;
      box-sizing: border-box;
      position: relative;
      background: rgba(255, 255, 255, 0.1);
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

        .drop-down {
          width: 57px;
        }
      }
    }
  }
</style>