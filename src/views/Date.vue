<template>
  <div class="date-main">
    <content-block caption="预设四季"></content-block>
    <div v-for="season in seasons" :key="season.name">
      <div class="content" @click="switchSeason(season)">
        <div class="title">{{ season.title }}</div>
        <div class="icon">
          <img :src="require(`../assets/icon/date/${season.name}.png`)" />
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <content-block caption="预设时间"></content-block>
      <div v-for="noon in noons" :key="noon.title">
        <div class="content" @click="switchNoon(noon)">
          <div class="title">{{ noon.title }}</div>
          <div class="icon">
            <img :src="require(`../assets/icon/date/${noon.name}.png`)" />
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <content-block caption="自定义"></content-block>
      <div class="date-block">
        <div class="date-select">
          <span class="date-title">日期</span>
          <input type="date" @change="onDateChange($event)" :value="date" />
        </div>
        <div class="date-select date-time">
          <span>时间</span>
          <input type="time" @change="onTimeChange($event)" :value="time" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBlock from "@/components/content-block.vue";

  import {
    DataService
  } from "../services/data.service";
  import {
    diva
  } from "../global";
  import {
    WeatherName
  } from "@sheencity/diva-sdk";

  export default {

    data() {
      return {
        data: new DataService(),
        seasons: [{
            title: "春",
            value: "2021-03-21",
            name: "spring",
          },
          {
            title: "夏",
            value: "2021-06-22",
            name: "summer",
          },
          {
            title: "秋",
            value: "2021-11-01",
            name: "autumn",
          },
          {
            title: "冬",
            value: "2021-12-21",
            name: "winter",
          },
          {
            title: "冬 (雪)",
            value: "2021-12-21",
            name: "winterSnow",
          },
        ],
        noons: [{
            title: "早晨",
            value: 8,
            name: "morning",
          },
          {
            title: "中午",
            value: 12,
            name: "noon",
          },
          {
            title: "傍晚",
            value: 17,
            name: "afternoon",
          },
        ],
        date: '',
        time: '',

      }
    },

    methods: {
      // 设置自定义日期
      onDateChange($event) {
        const date = new Date($event.target.value);
        diva.client.setDate(date);
        this.data.changeCode(`client.setDate(new Date('${date}'))`);
      },
      // 设置自定义时间
      onTimeChange($event) {
        const time = new Date();
        const timearr = [...($event.target.value.split(":").map((val) => parseInt(val, 10)))];
        time.setHours(
          Number(timearr[0]),Number(timearr[1])
          );
        diva.client.setTime(time);
        this.data.changeCode(`client.setTime(new Date('${time}'))`);
      },
      async switchSeason(season) {
        await diva.client.setDate(new Date(season.value));
        if (season.name === "winterSnow") {
          await diva.client.setWeather(WeatherName.Snow);
        } else {
          await diva.client.setWeather(WeatherName.Default);
        }
        if (season.name === "winterSnow") {
          this.data.changeCode(
            `client.setDate(new Date('${season.value}'));`,
            `client.setWeather('snow')`
          );
        } else if (season.name === "autumn") {
          // 秋季需要设置 11-01， 代码显示 09-23
          this.data.changeCode(`client.setDate(new Date('2021-09-23'))`);
        } else {
          this.data.changeCode(`client.setDate(new Date('${season.value}'))`);
        }
      },
      async switchNoon(noon) {
        diva.client.setTime(this.getTime(noon.value, 0));
        this.data.changeCode(
          "const now = new Date();",
          `const time = (now.setHours(${noon.value}), now);`,
          "client.setTime(time);"
        );
      },
      getTime(hour, min) {
        const now = new Date();
        now.setHours(hour, min, 0, 0);
        return now;
      },
      getDate(type) {
        const date = new Date();
        if (type === "date") {
          return `${date.getFullYear()}-${this.format(date.getMonth() + 1)}-${this.format(
          date.getDate()
        )}`;
        } else if (type === "time") {
          return `${this.format(date.getHours())}:${this.format(date.getMinutes())}`;
        }
      },
      format(v) {
        return v < 10 ? `0${v}` : `${v}`;
      }
    },
    mounted() {
      this.date = this.getDate("date");
      this.time = this.getDate("time");
      diva.client.setDate(new Date());
      diva.client.setTime(new Date());
      diva.client.applyScene("日期时间").then(() => {
        this.data.changeCode(`client.applyScene('日期时间')`);
      });
    },
    destroyed() {
      diva.client.setWeather(WeatherName.Default);
    },
    components: {
      contentBlock,
    },
  };
</script>

<style lang="scss">
  .date-main {
    pointer-events: all;

    .date-block {
      width: 240px;
      margin-top: 8px;
      padding: 12px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);

      .date-select {
        display: flex;
        justify-content: space-between;

        span {
          font-weight: bold;
          line-height: 24px;
          color: #fff;
        }

        input {
          width: 108px;
          height: 24px;
          padding: 6px;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          border: none;
          border-radius: 2px;
          outline: none;
          user-select: none;
        }

        ::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }

        ::-webkit-calendar-picker-indicator {
          margin-left: 0;
        }
      }

      .date-time {
        margin-top: 8px;
      }
    }

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