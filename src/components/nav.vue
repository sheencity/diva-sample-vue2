<template>
  <div class="nav-main">
    <div class="nav-list">
      <div class="nav-item">
        <router-link to="/scene" class="nav-block" active-class="selected">
          <span>场景切换</span>
        </router-link>
        <router-link to="/video" class="nav-block" active-class="selected">
          <span>漫游路径</span>
        </router-link>
        <router-link to="/global" class="nav-block" active-class="selected">
          <span>全局配置</span>
        </router-link>
        <router-link to="/weather" class="nav-block" active-class="selected">
          <span>天气控制</span>
        </router-link>
        <router-link to="/date" class="nav-block" active-class="selected">
          <span>日期时间</span>
        </router-link>
        <router-link to="/floor" class="nav-block" active-class="selected">
          <span>楼层展示</span>
        </router-link>
        <router-link to="/state" class="nav-block" active-class="selected">
          <span>状态演示</span>
        </router-link>
        <router-link to="/overlay" class="nav-block" active-class="selected">
          <span>覆盖物</span>
        </router-link>
        <router-link to="/monitor" class="nav-block" active-class="selected">
          <span>监控设备</span>
        </router-link>
        <router-link to="/lamp" class="nav-block" active-class="selected">
          <span>灯光控制</span>
        </router-link>
        <router-link to="/airConditioner" class="nav-block" active-class="selected">
          <span>高级定制</span>
        </router-link>
        <router-link to="/customize" class="nav-block" active-class="selected">
          <span>高级定制</span>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }

  .nav-main {
    pointer-events: all;

    .nav-list {
      position: relative;

      .nav-block {
        display: block;
        width: 130px;
        height: 58px;
        margin-top: 2px;
        line-height: 62px;
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        color: #fff;
        font-weight: 700;

        span {
          backdrop-filter: unset;
        }

        &:hover {
          cursor: pointer;
          background: rgba(38, 38, 38, 0.85);
          color: #fff;
        }

        &:focus {
          outline: none;
          border: 0;
        }
      }
    }

    .selected {
      color: #ffffff !important;
      background-color: rgba(0, 165, 255, 0.43) !important;

      &:hover {
        background-color: rgba(0, 165, 255, 0.43) !important;
      }
    }
  }
</style>