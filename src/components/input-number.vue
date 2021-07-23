<template>
  <input ref="inputDOM" type="number" v-model="value" @keydown="onKeyDown($event)" @input="inputHandle()" />
</template>

<script>
  export default {
    model: {
      prop: 'initial',
      event: 'input'
    },
    props: ['max', 'min', 'initial'],

    data() {
      return {
        value: Number
      }
    },
    created() {
      this.value = this.initial

    },
    watch: {
      initial() {
        this.value = this.initial
      }
    },
    methods: {
      inputHandle() {

        if (this.min !== null && this.value < this.min) {
          this.value = this.min;
        } else if (this.max !== null && this.value > this.max) {
          this.value = this.max;
        }
        this.$emit('input', Number(this.value))
      },
      onKeyDown($event) {
        $event.stopPropagation();
      }
    }
  }
</script>


<style lang="scss">
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
</style>