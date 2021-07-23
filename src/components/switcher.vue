<template>
  <div class="switcher">
    <span class="switcher-lable-title" v-if="label">{{label}}</span>
    <label class="switch" :class="{'switch-disabled':disabled}" @click="$event.stopPropagation()">
      <input type="checkbox" :checked="checked" :disabled="disabled" @change="$emit('change', $event.target.checked)" />
      <div class="slider round" :class="{'ball-color':!!ballColor}" @click="onClick($event)"
        :style="{background: background}"></div>
    </label>
  </div>
</template>

<script>
  export default {

    model: {
      prop: 'checked',
      event: 'change'
    },
    props: ['label', 'ballColor', 'disabled', 'checked'],

    data() {
      return {
        background: "rgba(255, 255, 255, 0.1)",
      }
    },

    async mounted() {

    },

    methods: {
      onClick(e) {
        e.stopPropagation();
        this.$emit("switch", !this.checked)
      }
    }
  };
</script>


<style lang="scss">
  .switcher {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    .switcher-lable-title {
      display: inline-block;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      margin-right: 8px;
    }

    .switch {
      width: 24px;
      height: 14px;
      position: relative;
      display: inline-block;
    }

    .switch-disabled {
      opacity: 0.5;
    }

    input {
      display: none;
    }

    .round {
      border-radius: 10px;
    }

    .slider {
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 24px;
      transition: all 0.2s;
      cursor: pointer;
      // adding inset bottom box-shadow
      // box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.5);
    }

    //小圆点
    .slider:after {
      content: "";
      width: 10px;
      height: 10px;
      display: block;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      position: absolute;
      top: 2px;
      left: 2px;
      transition: all 0.2s;
    }

    .ball-color:after {
      background: #444;
    }

    //单选框选中后改变的样式
    input:checked+.slider:after {
      transform: translateX(10px);
      background: #fff;
    }
  }
</style>