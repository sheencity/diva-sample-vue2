<template>
  <div class="state-main">
    <content-block caption="设备状态"></content-block>
    <div class="drop-block" v-for="(equipment,i) in equipments" :key="equipment.title">
      <div class="drop-item" :class="{'selected':selected === i}">
        <span>{{equipment.title}}</span>
        <div class="drop-down">
          <drop-down v-model="equipment.selected" :options="options" @select="onChange(equipment, $event)" :disabled="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "../components/content-block.vue";
  import dropDown from "../components/dropdown.vue";
  import {
    diva,
    data
  } from "../global";
  import {
    RenderingStyleMode
  } from "@sheencity/diva-sdk";

  export default {
    data() {
      return {
        equipments: [],
        options: [],
        selected: null
      }
    },
    created() {
      this.equipments = [{
          title: "空调",
          state: RenderingStyleMode.Default,
        },
        {
          title: "电视机",
          state: RenderingStyleMode.Default,
        },
        {
          title: "路由器",
          state: RenderingStyleMode.Default,
        },
        {
          title: "冰箱",
          state: RenderingStyleMode.Default,
        },
      ];
      this.options = [{
          value: RenderingStyleMode.Default,
          placeholder: "默认"
        },
        {
          value: RenderingStyleMode.Alarm,
          placeholder: "报警"
        },
        {
          value: RenderingStyleMode.Translucence,
          placeholder: "半透"
        },
        {
          value: RenderingStyleMode.Highlight,
          placeholder: '高亮'
        },
        {
          value: RenderingStyleMode.Emission,
          placeholder: '自发光'
        }
        // {
        //   value: RenderingStyleMode.Hidden,
        //   placeholder: "隐藏"
        // },
      ];
      this.equipments = this.equipments.map((equipment) => this.addSelected(equipment));
    },
    methods: {
      addSelected(equipment) {
        let selected;
        switch (equipment.state) {
          case RenderingStyleMode.Default:
            selected = {
              value: RenderingStyleMode.Default,
              placeholder: "默认"
            };
            break;
          case RenderingStyleMode.Alarm:
            selected = {
              value: RenderingStyleMode.Alarm,
              placeholder: "报警"
            };
            break;
          case RenderingStyleMode.Translucence:
            selected = {
              value: RenderingStyleMode.Translucence,
              placeholder: "半透",
            };
            break;
          case RenderingStyleMode.Highlight:
            selected = {
              value: RenderingStyleMode.Highlight,
              placeholder: '高亮',
            };
            break;
          case RenderingStyleMode.Emission:
            selected = {
              value: RenderingStyleMode.Emission,
              placeholder: '自发光'
            };
            break;
          // case RenderingStyleMode.Hidden:
          //   selected = {
          //     value: RenderingStyleMode.Hidden,
          //     placeholder: "隐藏"
          //   };
          //   break;
          default:
            selected = {
              value: RenderingStyleMode.Default,
              placeholder: "默认"
            };
            break;
        }
        return {
          ...equipment,
          selected
        };
      },
      async onChange(equi, $event) {
        const [model] = await diva.client.getEntitiesByName(equi.title);
        if (!model || !$event.value) return;
        const type = $event.value;
        let code = `model.setRenderingStyleMode(RenderingStyleMode.${
          type.slice(0, 1).toUpperCase() + type.slice(1)
        }`;
        if (type === RenderingStyleMode.Emission) {
          model.setRenderingStyleMode(type, {
            color: "#20fdfa99",
            strength: 0.2,
          });
          code += `, { color: '#20fdfa99', strength: 0.2 })`;
        } else {
          model.setRenderingStyleMode(type);
          code += `)`;
        }
        data.changeCode(code);
      }
    },
    async mounted() {
      diva.client.applyScene("状态演示").then(() => {
        data.changeCode(`client.applyScene('状态演示')`);
      });
      const highlightStyleOpt = {
        color: '#20fdfa99',
        border: {
          color: '#20fdfa',
          width: 2,
        },
      }
      diva.client.setHighlightStyle(highlightStyleOpt);
    },
    destroyed() {
      this.equipments.forEach(async (equi) => {
        const [model] = await diva.client.getEntitiesByName(equi.title);
        model.setRenderingStyleMode(RenderingStyleMode.Default);
      });
    },
    components: {
      contentBlock,
      dropDown,
    },
  };
</script>

<style lang="scss">
  @import "../common/styles/styles.scss";

  .state-main {
    pointer-events: all;

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

        .drop-down {
          width: 57px;
        }
      }

      .selected {
        color: #fff;
      }
    }
  }
</style>