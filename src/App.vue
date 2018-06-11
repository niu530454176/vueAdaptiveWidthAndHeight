<template>
  <div id="app">
    <div class="center-main">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>


<style lang="less">
  @import './assets/config';
  // CLEAN 样式
  body{
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    // 禁止选中
    user-select:none;

    // 图片禁止拖拽
    /*  字体  */
    font-family: -apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif;

    /*  字号 */
    /*font-size: 16px;*/

    /*  字体颜色  */
    color: #333;

    /* 行距 */
    /*line-height: 1.75;*/

  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  #app {
    position: relative;
    width: @MainWidth;
    height: 100vh;


    // 清除滚动条
    overflow-x: hidden;
    overflow-y: hidden;

    font-family: 'apple-default', serif;

    @baseBgColor: #fff;
    background-color: @baseBgColor;

    .center-main{
      position: absolute;
      top: 0;
      left: 0;
      width: @MainWidth;
      height: 100vh;
    }

    .fade-leave-active {
      transition: opacity .3s ease;
    }
    .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      /*transition: ;*/
    }
    .fade-enter-active{
      transition: opacity .3s ease;
    }
    .fade-enter{
      opacity: 0;
      /*transition: ;*/
    }
  }
</style>

