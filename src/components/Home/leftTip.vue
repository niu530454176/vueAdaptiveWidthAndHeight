<template>
  <div id="leftTip">
    <i class="iconfont icon-lnext-copy"></i>
    <div class="shader"></div>
  </div>
</template>

<script>
  import '@/assets/iconfont/iconfont.css';
    export default {
        name: 'leftTip'
    }
</script>

<style lang="less" scoped>
    @import "../../assets/config";

    #leftTip {
      height: 100%;
      width: 5vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .shader{
        height: 100%;
        width: 0;
        position: absolute;
        top: 0;
        right: 0;
        box-shadow: 0 -5vh 5vh 5vh #212225 * 1.5;
      }
      .iconfont {
        z-index: 100;
        font-size: 3.13vh;
        color: #fff * 0.5;
      }

    }
</style>
