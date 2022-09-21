<template>
  <div class="overlay-main">
    <content-block caption="创建覆盖物">
    </content-block>
    <div class="overlay-block">
      <div class="drop-item">
        <span>种类</span>
        <div>
          <drop-down :key="1" :options="typeOptions" :initvalue="typeInitial" @select="setSelectedType"
            :disabled="false">
          </drop-down>
        </div>
      </div>
      <div class="btn-item">
        <span>坐标拾取</span>
        <button @click="pickup" @mouseup.stop="mouseupStop">拾取</button>
      </div>
      <div class="input-item">
        <span>坐标</span>
        <div class="coordinate-items">
          <div class="coordinate-item">
            <span>X</span><input @keydown="onKeyDown($event)" v-model="corrdinateX" type="number" />
          </div>
          <div class="coordinate-item">
            <span>Y</span><input @keydown="onKeyDown($event)" v-model="corrdinateY" type="number" />
          </div>
          <div class="coordinate-item">
            <span>Z</span><input @keydown="onKeyDown($event)" v-model="corrdinateZ" type="number" />
          </div>
        </div>
      </div>
      <div class="input-item" v-if="selectedType.value === 'Marker'">
        <span>标题</span>
        <input @keydown="onKeyDown($event)" type="text" v-model="title" placeholder="请输入文字" />
      </div>
      <div class="input-item" :style="{height: (selectedType.value === 'poi' ? '24px' : '48px')}"
        v-if="selectedType.value !== 'emissive'">
        <span>内容</span>
        <textarea cols="4" @keydown="onKeyDown($event)" v-model="content" placeholder="请输入文字"></textarea>
      </div>
      <div class="drop-item" style="margin-top: 12px;" v-if="selectedType.value === 'Marker'">
        <span>对齐方式</span>
        <div>
          <drop-down :key="2" :options="alignOptions" :initvalue="alignInitial" @select="setSelectedAlign"
            :disabled="false">
          </drop-down>
        </div>
      </div>
      <div class="drop-item" style="margin-top: 12px;" v-if="selectedType.value === 'emissive'">
        <span>类型</span>
        <div>
          <drop-down :key="3" :options="emissiveOptions" :initvalue="emissiveInitial" @select="setSelectedEmissive"
            :disabled="false"></drop-down>
        </div>
      </div>
      <div class="drop-item" style="margin-top: 12px;" v-if="selectedType.value === 'poi'">
        <span>类型</span>
        <div>
          <drop-down :key="3" :options="iconTypeOption" :initvalue="iconTypeInitial" @select="setSelectedIconType"
            :disabled="false"></drop-down>
        </div>
      </div>
      <div class="drop-item" style="margin-top: 12px;" v-if="selectedType.value === 'poi'">
        <span>图标</span>
        <div>
          <drop-down :key="4" :options="iconOptions" :initvalue="iconInitial" @select="setSelectedIcon"
            :disabled="false">
          </drop-down>
        </div>
      </div>
      <div class="input-item">
        <span>颜色</span>
        <input v-model="color" type="color" />
      </div>
      <div class="input-item" v-if="selectedType.value === 'emissive'">
        <span>旋转</span>
        <div class="coordinate-items">
          <div class="coordinate-item">
            <span>X</span><input @keydown="onKeyDown($event)" v-model="rotationX" type="number" />
          </div>
          <div class="coordinate-item">
            <span>Y</span><input @keydown="onKeyDown($event)" v-model="rotationY" type="number" />
          </div>
          <div class="coordinate-item">
            <span>Z</span><input @keydown="onKeyDown($event)" v-model="rotationZ" type="number" />
          </div>
        </div>
      </div>
      <div class="input-item">
        <span>缩放</span>
        <input-number :key="1" :min="0" :max="100" v-model="scale"></input-number>
      </div>
      <div class="input-item" v-if="selectedType.value !== 'emissive'">
        <span>不透明度</span>
        <input-number :key="2" :min="0" :max="100" v-model="opacity"></input-number>
      </div>
      <div class="input-item" v-if="selectedType.value === 'Marker'">
        <span>边框大小</span>
        <input-number :key="3" :min="0" :max="1" v-model="border"></input-number>
      </div>
      <div class="input-item" v-if="selectedType.value === 'Marker'">
        <span>边框颜色</span>
        <input v-model="borderColor" type="color" />
      </div>
      <div class="input-item" v-if="selectedType.value === 'emissive'">
        <span>自发光强度</span>
        <input-number :key="4" :min="0" v-model="emission"></input-number>
      </div>
      <div class="input-item" v-if="selectedType.value === 'emissive'">
        <span>速度</span>
        <input-number :key="5" :min="0" v-model="speed"></input-number>
      </div>
      <div class="btn-item">
        <span></span>
        <button @click="create()">创建</button>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <content-block caption="覆盖物列表"></content-block>

      <div class="scroll">
        <div v-for="overlay in overlays" :key="overlay.id" class="overlay-list" @click="selectOverlay(overlay)">
          <div class="overlay-item" :class="{'selected': selectedId === overlay.id}">
            <span>{{overlay.type === 'poi' ? overlay.content : overlay.type === 'Marker' ? overlay.title : overlay.icon}}</span>
            <div class="overlay-info">
              <span>{{overlay.type === 'poi' ? 'POI' : overlay.type === 'Marker' ? 'Marker' : 'Emissive'}}</span>
              <div class="overlay-delete" @click="del($event, overlay)">
                <img src="../assets/icon/overlay/delete.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Emissive,
    Marker,
    Model,
    POI,
    POIIcon
  } from '@sheencity/diva-sdk';
  import {
    Quaternion,
    Vector3,
    Euler, 
    deg2rad
  } from '@sheencity/diva-sdk-math';
  import {
    EmissionType,
    EmissiveOverlay,
    MarkerOverlay,
    OverlayType,
    POIOverlay
  } from '../models/overlay.model';
  import contentBlock from '../components/content-block.vue';
  import dropDown from '../components/dropdown.vue';
  import inputNumber from '../components/input-number.vue';
  import { data, diva } from '../global';
  import { LocalStorageService } from '../services/localStorage.service';

  export default {
    data() {
      return {
        store: new LocalStorageService(),
        typeOptions: [],
        alignOptions: [],
        iconOptions: [],
        iconTypeOption: [],
        emissiveOptions: [],
        overlays: [],
        selectedType: {
          value: OverlayType.POI,
          placeholder: 'POI',
        },
        selectedIcon: {
          value: POIIcon.Camera,
          placeholder: '摄像头',
        },
        selectedIconType: {
          value: 'POI文字标签',
          placeholder: 'POI文字标签',
        },
        selectedEmissive: {
          value: EmissionType.type1,
          placeholder: '悬浮标记01',
        },
        corrdinateX: 0.0,
        corrdinateY: 0.0,
        corrdinateZ: 0.0,
        title: '',
        content: '',
        color: '#ff0000',
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1.0,
        opacity: 1.0,
        border: 0.0,
        borderColor: '#ffffff',
        selectedId: null,
        emission: 1.0,
        speed: 2.0,
        selectedAlign: {
          value: 'center',
          placeholder: '居中',
        },
        alignInitial: {
          value: 'center',
          placeholder: '居中'
        },
        emissiveInitial: {
          value: '悬浮标记01',
          placeholder: '悬浮标记01'
        },
        iconInitial: {
          value: 'camera',
          placeholder: '摄像头'
        },
        iconTypeInitial: {
          value: 'POI文字标签',
          placeholder: 'POI文字标签'
        },
        typeInitial: {
          value: 'poi',
          placeholder: 'POI'
        },
      }
    },
    created() {
      this.typeOptions = [{
          value: OverlayType.POI,
          placeholder: 'POI'
        },
        {
          value: OverlayType.Marker,
          placeholder: 'Marker'
        },
        {
          value: OverlayType.Emissive,
          placeholder: 'Emissive'
        },
      ];
      this.alignOptions = [{
          value: 'center',
          placeholder: '居中'
        },
        {
          value: 'left',
          placeholder: '左对齐'
        },
        {
          value: 'right',
          placeholder: '右对齐'
        },
      ];
      this.iconOptions = [{
          value: POIIcon.Camera,
          placeholder: '摄像头'
        },
        {
          value: POIIcon.Location,
          placeholder: '定位'
        },
        {
          value: POIIcon.TrafficLight,
          placeholder: '红绿灯'
        },
        {
          value: POIIcon.TrashCan,
          placeholder: '垃圾桶'
        },
        {
          value: POIIcon.StreetLamp,
          placeholder: '路灯'
        },
        {
          value: POIIcon.BusStation,
          placeholder: '公交站'
        },
        {
          value: POIIcon.Exit,
          placeholder: '出口'
        },
        {
          value: POIIcon.Restaurant,
          placeholder: '餐饮'
        },
        {
          value: POIIcon.Parking,
          placeholder: '停车场'
        },
        {
          value: POIIcon.Dock,
          placeholder: '码头'
        },
        {
          value: POIIcon.Subway,
          placeholder: '地铁'
        },
        {
          value: POIIcon.Supermarket,
          placeholder: '超市'
        },
        {
          value: POIIcon.Mall,
          placeholder: '商场'
        },
        {
          value: POIIcon.Toilet,
          placeholder: '卫生间'
        },
      ];
      this.iconTypeOption = [
        { value: 'POI文字标签', placeholder: 'POI文字标签' },
        { value: 'POI圆形标签', placeholder: 'POI圆形标签' },
        { value: 'POI水滴', placeholder: 'POI水滴' },
      ];
      this.emissiveOptions = [{
          value: EmissionType.type1,
          placeholder: '悬浮标记01'
        },
        {
          value: EmissionType.type2,
          placeholder: '圆形区域轮廓02'
        },
        {
          value: EmissionType.type3,
          placeholder: '雷达标记'
        },
        {
          value: EmissionType.type4,
          placeholder: '地面标记01'
        },
        {
          value: EmissionType.type5,
          placeholder: '圆形区域轮廓01'
        },
        {
          value: EmissionType.type6,
          placeholder: '事故标记'
        },
        {
          value: EmissionType.type7,
          placeholder: '悬浮标记02'
        },
        {
          value: EmissionType.type8,
          placeholder: '圆形区域轮廓03'
        },
      ];
    },
    methods: {
      /**
       * 创建覆盖物
       */
      async create() {
        if (this.selectedType.value === OverlayType.POI) {
          const overlay = new POIOverlay();
          overlay.icon = this.selectedIcon.value;
          overlay.iconType = this.selectedIconType.value;
          overlay.corrdinateX = this.corrdinateX;
          overlay.corrdinateY = this.corrdinateY;
          overlay.corrdinateZ = this.corrdinateZ;
          overlay.content = this.content;
          overlay.color = this.color;
          overlay.scale = this.scale;
          overlay.opacity = this.opacity;
          const poiOverlay = new POI({
            // @ts-ignore
            icon: overlay.icon,
            title: overlay.content,
            backgroundColor: overlay.color,
            opacity: overlay.opacity,
            scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
            resource: {
              name: overlay.iconType,
            },
            coord: new Vector3(
              overlay.corrdinateX,
              overlay.corrdinateY,
              overlay.corrdinateZ
            ),
            id: overlay.id,
            name: this.uniqueName('poi'),
            autoSize: false,
          });
          await poiOverlay.setClient(diva.client);
          poiOverlay.focus(1000, -Math.PI / 6);
          this.store.storeOverlay(overlay);
          data.changeCode(
            `const overlay = new POI(config_learnMoreInTutorial);`,
            `await overlay.setClient(diva.client);`
          );
        } else if (this.selectedType.value === OverlayType.Marker) {
          const overlay = new MarkerOverlay();
          overlay.corrdinateX = this.corrdinateX;
          overlay.corrdinateY = this.corrdinateY;
          overlay.corrdinateZ = this.corrdinateZ;
          overlay.title = this.title;
          overlay.content = this.content;
          overlay.align = this.selectedAlign.value;
          overlay.color = this.color;
          overlay.scale = this.scale;
          overlay.opacity = this.opacity;
          overlay.borderWidth = this.border;
          overlay.borderColor = this.borderColor;
          const markerOverlay = new Marker({
            id: overlay.id,
            title: overlay.title,
            content: overlay.content,
            // @ts-ignore
            align: overlay.align,
            border: {
              color: overlay.borderColor,
              width: overlay.borderWidth,
            },
            backgroundColor: overlay.color,
            opacity: overlay.opacity,
            scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
            coord: new Vector3(
              overlay.corrdinateX,
              overlay.corrdinateY,
              overlay.corrdinateZ
            ),
            resource: {
              name: '文字标签',
            },
            name: this.uniqueName('marker'),
            autoSize: false,
          });
          await markerOverlay.setClient(diva.client);
          markerOverlay.focus(1000, -Math.PI / 6);
          this.store.storeOverlay(overlay);
          data.changeCode(
            `const overlay = new Marker(config_learnMoreInTutorial);`,
            `await overlay.setClient(diva.client);`
          );
        } else if (this.selectedType.value === OverlayType.Emissive) {
          const overlay = new EmissiveOverlay();
          overlay.icon = this.selectedEmissive.value;
          overlay.corrdinateX = this.corrdinateX;
          overlay.corrdinateY = this.corrdinateY;
          overlay.corrdinateZ = this.corrdinateZ;
          overlay.color = this.color;
          overlay.emission = this.emission;
          overlay.speed = this.speed;
          overlay.rotationX = this.rotationX;
          overlay.rotationY = this.rotationY;
          overlay.rotationZ = this.rotationZ;
          overlay.scale = this.scale;
          const emissiveOverlay = new Emissive({
            emissionColor: overlay.color,
            emissionStrength: overlay.emission,
            speed: overlay.speed,
            coord: new Vector3(
              overlay.corrdinateX,
              overlay.corrdinateY,
              overlay.corrdinateZ
            ),
            rotation: Quaternion.FromEuler(
              new Euler(
                ...deg2rad([
                  overlay.rotationX,
                  overlay.rotationY,
                  overlay.rotationZ,
                ])
              )
            ),
            scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
            resource: {
              name: overlay.icon,
            },
            id: overlay.id,
            name: this.uniqueName('effect'),
          });
          await emissiveOverlay.setClient(diva.client);
          emissiveOverlay.focus(1000, -Math.PI / 6);
          this.store.storeOverlay(overlay);
          data.changeCode(
            `const overlay = new Emissive(config_learnMoreInTutorial);`,
            `await overlay.setClient(diva.client);`
          );
        }
        this.overlays = this.store.getAllOverlays();
        this.reset();
      },

      uniqueName(prefix) {
        return '' + prefix + '_' + new Date().toISOString();
      },

      /**
       * 删除覆盖物
       */
      async del($event, overlay) {
        $event.stopPropagation();
        this.store.deleteOverlay(overlay);
        this.overlays = this.store.getAllOverlays();
        /**@type {Model} */
        const entity = await diva.client.getEntityById(overlay.id);
        entity.setClient(null);
        data.changeCode(`entity.setClient(null)`);
      },

      /**
       * 创建覆盖物之后重置所有配置
       */
      reset() {
        this.selectedIcon = {
          value: POIIcon.Camera,
          placeholder: '摄像头',
        };
        this.selectedEmissive = {
          value: EmissionType.type1,
          placeholder: '悬浮标记01',
        };
        this.selectedAlign = {
          value: 'center',
          placeholder: '居中',
        };
        this.corrdinateX = 0.0;
        this.corrdinateY = 0.0;
        this.corrdinateZ = 0.0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.title = '';
        this.content = '';
        this.color = '#ff0000';
        this.scale = 1.0;
        this.opacity = 1.0;
        this.border = 0.0;
        this.borderColor = '#ffffff';
        this.emission = 1.0;
        this.speed = 2.0;
      },
      /**
       * 聚焦覆盖物
       */
      async selectOverlay(overlay) {
        this.selectedId = overlay.id;
        /**@type {Model} */
        const entity = await diva.client.getEntityById(overlay.id);
        entity.focus(1000, - Math.PI / 6);
        data.changeCode(`model.focus(1000, - Math.PI / 6)`);
      },
      /**
       * 拾取世界坐标
       */
      async pickup() {
        const handler = (event) => {
          [this.corrdinateX, this.corrdinateY, this.corrdinateZ] = event.detail.coord;
          document.body.style.cursor = 'default';
        };
        await diva.client.addEventListener('click', handler, {
          once: true
        });
        document.body.style.cursor = 'crosshair';
      },

      mouseupStop: () => {},

      /**
       * 阻止事件冒泡
       * @param $event
       */
      onKeyDown($event) {
        $event.stopPropagation();
      },
      setSelectedType(item) {
        this.selectedType.value = item.value;
        this.selectedType.placeholder = item.placeholder;
      },
      setSelectedAlign(item) {
        this.selectedAlign.value = item.value;
        this.selectedAlign.placeholder = item.placeholder;
      },
      setSelectedEmissive(item) {
        this.selectedEmissive.value = item.value;
        this.selectedEmissive.placeholder = item.placeholder;
      },
      setSelectedIcon(item) {
        this.selectedIcon.value = item.value;
        this.selectedIcon.placeholder = item.placeholder;
      },
      setSelectedIconType(item) {
        this.selectedIconType.value = item.value;
        this.selectedIconType.placeholder = item.placeholder;
      }
    },
    async mounted() {
      this.store.getAllOverlays().forEach(e => {
        this.overlays.push(e);
      })
      await diva.client.applyScene('覆盖物');
      data.changeCode(`client.applyScene('覆盖物')`);
      this.overlays.map(async (overlay) => {
        /**@type {Model} */
        const entity = await diva.client.getEntityById(overlay.id);
        entity.setVisibility(true);
      });
    },
    components: {
      contentBlock,
      dropDown,
      inputNumber
    },
  };
</script>

<style lang="scss" >
  .overlay-main {
    .content-block-main {
      width: 282px;
    }

    pointer-events: all;
    width: 282px;

    .overlay-block {
      width: 282px;
      padding: 12px 20px;
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

      .input-item {
        margin-top: 12px;
        height: 24px;
        display: flex;
        justify-content: space-between;

        span {
          line-height: 24px;
          font-weight: bold;
          color: #fff;
        }

        .coordinate-items {
          width: 174px;
          display: flex;
          justify-content: space-between;

          .coordinate-item {
            display: flex;
            justify-content: space-between;
            width: 55px;

            span {
              font-weight: normal;
              font-size: 12px;
              line-height: 24px;
            }

            input {
              width: 45px;
            }
          }
        }

        input {
          font-size: 12px;
          color: #fff;
          width: 57px;
          height: 100%;
          padding: 6px;
          box-sizing: border-box;
          border: none;
          border-radius: 2px;
          outline: none;
          background: rgba(0, 0, 0, 0.3);
        }

        input[type="number"] {
          text-align: right;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }

        input[type="text"] {
          width: 194px;

          &::placeholder {
            color: #fff;
            font-size: 12px;
            font-weight: normal;
          }

          // text-align: right;
        }

        input[type="color"] {
          background-color: #fff;
          padding: 2px;

          &::-webkit-color-swatch {
            border: none;
          }
        }

        textarea {
          width: 194px;
          box-sizing: border-box;
          padding: 0 6px;
          padding-top: 4px;
          outline: none;
          border: none;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 12px;
          font-family: "微软雅黑";
          resize: none;

          &::placeholder {
            color: #fff;
            font-size: 12px;
            font-weight: normal;
          }
        }

        textarea::-webkit-scrollbar {
          width: 3px;
        }

        textarea::-webkit-scrollbar-thumb {
          width: 3px;
          border-radius: 2px;
          background-color: rgba(255, 255, 255, 0.3);
        }
      }

      .btn-item {
        width: 100%;
        height: 24px;
        display: flex;
        margin-top: 12px;
        justify-content: space-between;

        span {
          line-height: 24px;
          font-weight: bold;
          color: #fff;
        }

        button {
          cursor: pointer;
          width: 58px;
          background: rgba(255, 255, 255, 0.1);
          line-height: 22px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          border: 1px solid #fff;
          outline: none;
          border-radius: 2px;
        }
      }
    }

    .overlay-list {
      width: 282px;
      padding: 20px;
      margin-top: 8px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      cursor: pointer;

      .overlay-item {
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: space-between;
        color: #fff;

        span {
          line-height: 24px;
          font-weight: bold;
        }

        .overlay-info {
          display: flex;
          justify-content: space-between;

          .overlay-delete {
            cursor: pointer;
            margin-left: 12px;
            width: 24px;
            height: 24px;
          }
        }
      }

      .selected {
        color: #fff;
      }
    }

    .scroll {
      width: 300px;
      max-height: 400px;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .scroll::-webkit-scrollbar {
      background-color: transparent;
      width: 14px;
    }

    .scroll::-webkit-scrollbar-button {
      display: none;
    }

    .scroll::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 7px;
    }

  }
</style>