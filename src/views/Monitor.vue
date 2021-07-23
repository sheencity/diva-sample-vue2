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
  import contentBlock from '@/components/content-block.vue'

  import {
    diva
  } from '../global'
  import {
    DataService
  } from '../services/data.service';
  import {
    RenderingStyleMode
  } from '@sheencity/diva-sdk';


  export default {

    data() {
      return {
        data: new DataService,
        monitors: [],
        monitorEquis: [],
        models: new Map,
        monitorHandlers: [],
      }
    },
    created() {
      this.monitors = [{
          title: '测试设备01',
          url: 'rtmp://xxxxxxxxxxxxxxxxxx',
        },
        {
          title: '测试设备02',
          url: 'rtmp://xxxxxxxxxxxxxxxxxx',
        }
      ];
      this.monitorEquis = [{
          title: '测试设备03',
          url: 'https://www.sheencity.com',
        },
        {
          title: '测试设备04',
          url: 'https://www.sheencity.com',
        }
      ];
    },
    methods: {
      async removeWidget(name) {
        await (await this.getModelByName(name)).setWebWidget(null);
      },
      async setWidget(monitor, url) {
        if (typeof monitor === 'string') {
          monitor = await this.getModelByName(monitor);
        }
        if (!url) return;
        await monitor.setWebWidget(new URL(url), 500, 280);
        this.data.changeCode(`model.setWebWidget(new URL('${url}'), 500, 280)`);
      },
      async refresh(monitorEqui) {
        try {
          await this.removeWidget(monitorEqui.title);
        } catch {
          console.log('当前模型无可清除的 web 组件');
        }
        await this.setWidget(monitorEqui.title, monitorEqui.url);
      },
      async selectMonitor(name) {
        await (await this.getModelByName(name)).focus(1000, -Math.PI / 6);
        this.data.changeCode(`model.focus(1000, -Math.PI / 6)`);
      },
      async getModelByName(name) {
        let m = this.models.get(name);
        if (!m) {
          m = (await diva.client.getEntitiesByName(name))[0];
          this.models.set(name, m);
        }
        return m;
      },
      stopPropagation($event) {
        $event.stopPropagation();
      }
    },
    async mounted() {
      const monitors = [{
          title: '测试设备01',
          url: 'rtmp://xxxxxxxxxxxxxxxxxx',
        },
        {
          title: '测试设备02',
          url: 'rtmp://xxxxxxxxxxxxxxxxxx',
        },
        {
          title: '测试设备03',
          url: 'https://www.sheencity.com',
        },
        {
          title: '测试设备04',
          url: 'https://www.sheencity.com',
        }
      ];
      diva.client.applyScene('监控设备').then(() => {
        this.data.changeCode(`client.applyScene('监控设备')`);
      });
      this.models = new Map();
      this.monitorHandlers = [];
      for (let i = 0; i < monitors.length; i++) {
        const model = await this.getModelByName(monitors[i].title);
        const handle = (model) => {
          const url = monitors.find((m) => m.title === model.name).url;
          this.setWidget(model, url);
        };
        model.setRenderingStyleMode(RenderingStyleMode.Default);
        model.addEventListener('click', () => {
          handle(model)
        });
        this.monitorHandlers.push(handle);
      }
    },
    destroyed() {
      this.monitors.forEach(async (m, i) => {
        const model = await this.getModelByName(m.title);
        model.removeEventListener('click', this.monitorHandlers[i]);
      });
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

        span {
          color: #fff;
          font-weight: bold;
        }

        .refresh-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
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