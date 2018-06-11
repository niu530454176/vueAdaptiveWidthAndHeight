<template>
  <div id="leftCover" @click="Close">
    <img src="@/assets/lcover.png" alt="广告位" draggable="false">
  </div>
</template>

<script>
  export default {
    name: 'leftCover',
    methods: {
        Close() {
            this.$emit('close')
        }
    }
  }
</script>

<style lang="less" scoped>
  @import "content";
  #leftCover {
    cursor: pointer;
    z-index: 1000;
    position: absolute;
    left: 0;
    bottom: 2.08vh;
    height: 86.98vh;
    width: 39.38vh;
    img{
      height: 100%;
      width: 100%;

    }
  }
</style>
