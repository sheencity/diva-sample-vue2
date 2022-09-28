<template>
  <div class="monitor-main">
    <content-block caption="监控视频演示"></content-block>
    <div v-for="monitor in monitors" :key="monitor.title">
      <div class="drop-block">
        <div class="content-block" @click="selectMonitor(monitor.title)">
          <div class="content-item">
            <span>{{monitor.title}}</span>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <content-block caption="设备弹窗演示"></content-block>
      <div v-for="monitorEqui in monitorEquis" :key="monitorEqui.title">
        <div class="refresh-block" @click="selectMonitor(monitorEqui.title)">
          <div class="refresh-item">
            <span>{{monitorEqui.title}}</span>
            <div class="refresh-icon" @click="refresh(monitorEqui)">
              <img src="../assets/icon/monitor/refresh.png" />
            </div>
          </div>
          <input @click="stopPropagation($event)" @keydown="stopPropagation($event)" v-model="monitorEqui.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { RenderingStyleMode } from '@sheencity/diva-sdk';
  import contentBlock from '../components/content-block.vue';
  import { data, diva } from '../global';

  export default {
    data() {
      return {
        monitors: [
          {
            title: '测试设备01',
            url: 'rtmp://xxxxxxxxxxxxxxxxxx',
          },
          {
            title: '测试设备02',
            url: 'rtmp://xxxxxxxxxxxxxxxxxx',
          }
        ],
        monitorEquis: [
          {
            title: '测试设备03',
            url: 'https://www.sheencity.com',
          },
          {
            title: '测试设备04',
            url: 'https://www.sheencity.com',
          }
        ],
        models: new Map(),
        monitorHandlers: [],
        // 存在弹窗的模型
        widgetModel: null,
      }
    },
    async mounted() {
      const totalMonitors = this.monitors.concat(this.monitorEquis);
      diva.client.applyScene('监控设备').then(() => {
        data.changeCode(`client.applyScene('监控设备')`);
      });
      for (let i = 0; i < totalMonitors.length; i++) {
        const model = await this.getModelByName(totalMonitors[i].title);
        const handle = (model) => {
          const url = totalMonitors.find((m) => m.title === model.name).url;
          this.setWidget(model, url);
        };
        model.setRenderingStyleMode(RenderingStyleMode.Default);
        model.addEventListener('click', () => handle(model));
        this.monitorHandlers.push(handle);
      }
    },
    async destroyed() {
      await this.removeWidget();
      this.monitors.forEach(async (m, i) => {
        const model = await this.getModelByName(m.title);
        model.removeEventListener('click', this.monitorHandlers[i]);
      });
    },
    methods: {
      async removeWidget() {
        if (this.widgetModel) await this.widgetModel.setWebWidget(null);
      },
      async setWidget(monitor, url) {
        if (typeof monitor === 'string') {
          monitor = await this.getModelByName(monitor);
        }
        if (!url) return;
        await monitor.setWebWidget(new URL(url), {
          width: 500,
          height: 280,
          mouseInput: true,
          keyboardInput: true,
          dismissable: true,
        });
        this.widgetModel = monitor;
        data.changeCode(
          `model.setWebWidget(new URL('${url}'), { width: 500, height: 280, mouseInput: true, keyboardInput: true })`
        );
      },
      async refresh(monitorEqui) {
        try {
          await this.removeWidget();
        } catch {
          console.log('当前模型无可清除的 web 组件');
        }
        await this.setWidget(monitorEqui.title, monitorEqui.url);
      },
      async selectMonitor(name) {
        await (await this.getModelByName(name)).focus(1000, -Math.PI / 6);
        data.changeCode(`model.focus(1000, -Math.PI / 6)`);
      },
      async getModelByName(name) {
        let model = this.models.get(name);
        if (!model) {
          model = (await diva.client.getEntitiesByName(name))[0];
          this.models.set(name, model);
        }
        return model;
      },
      stopPropagation($event) {
        $event.stopPropagation();
      }
    },
    components: {
      contentBlock,
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/styles.scss';

  .monitor-main {
    pointer-events: all;

    .content-block {
      width: 240px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      cursor: pointer;

      .content-item {
        width: 100%;
        pointer-events: none;

        span {
          color: #fff;
          font-weight: bold;
        }
      }
    }

    .refresh-block {
      width: 240px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      cursor: pointer;

      .refresh-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;

        span {
          color: #fff;
          font-weight: bold;
        }

        .refresh-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
          pointer-events: all;
        }
      }

      input {
        margin-top: 6px;
        width: 100%;
        height: 24px;
        padding: 3px 6px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 18px;
        border: none;
        border-radius: 2px;
        outline: none;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>