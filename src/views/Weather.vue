<template>
  <div class="weather-main">
    <content-block caption="天气切换"></content-block>
    <div v-for="weather in weathers" :key="weather.index">
      <div class="content" @click="switchWeather(weather)">
        <div class="title">{{weather.title}}</div>
        <div class="icon">
          <img :src="require(`../assets/icon/weather/${weather.typeName}.png`)" />
          <!-- <img src="../assets/icon/weather/default.png" /> -->
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
  import {
    WeatherName
  } from "@sheencity/diva-sdk";

  export default {
    data() {
      return {
        weathers: [{
            title: "默认",
            typeName: "default",
          },
          {
            title: "晴天",
            typeName: WeatherName.Sunny,
          },
          {
            title: "多云",
            typeName: WeatherName.Overcast,
          },
          {
            title: "小雨",
            typeName: WeatherName.Rain,
          },
          {
            title: "暴雨",
            typeName: WeatherName.Storm,
          },
          {
            title: "雾霾",
            typeName: WeatherName.Smog,
          },
          {
            title: "雪天",
            typeName: WeatherName.Snow,
          },
          {
            title: "摄影棚",
            typeName: WeatherName.Studio,
          },
        ],
      }
    },

    methods: {
      switchWeather(weather) {
        if (!weather.typeName) return;
        diva.client.setWeather(weather.typeName).then(() => {
          data.changeCode(`client.setWether('${weather.typeName}')`);
        });
      }
    },
    async mounted() {
      diva.client.applyScene("天气控制").then(() => {
        data.changeCode(`client.applyScene('天气控制')`);
      });
    },
    components: {
      contentBlock,
    },
  };
</script>

<style lang="scss">
  .weather-main {
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