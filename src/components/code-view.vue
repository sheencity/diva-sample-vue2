<template>
  <p class="code">{{code}}</p>
</template>

<script>
import {
    data
  } from "../global";
  export default {
    data(){
      return{
        code: ''
      }
    },
    mounted(){
      data.code.subscribe((res)=>{
        this.code = res;
      });
    }
  }
</script>

<style lang="scss" scoped>
 .code {
    height: 100%;
    margin: 0;
    margin-right: 6px;
    padding: 0;
    word-wrap: break-word;
    font-family: Roboto;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
    overflow: auto;
    text-align: justify;
    white-space: pre-wrap;
    pointer-events: all;
}
::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .3);
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 7px;
}
 
</style>