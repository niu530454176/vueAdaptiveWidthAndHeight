<template>
    <div id="First">
      <div class="show-item">
        <img class="bg" :src="bg" alt="">
      </div>
      <div class="show-item">
        <img class="bg" :src="bg" alt="">
      </div>
      <div class="show-item">
        <img class="bg" :src="bg" alt="">
      </div>
      <div class="show-item">
        <img class="bg" :src="bg" alt="">
      </div>
    </div>
</template>

<script>
  import test from '@/assets/cover.png';
  export default {
    name: 'First',
    data: function () {
      return {
          bg: test
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './center';
    #First {
      height: @height;
      width: @width;
      /*background-color: whitesmoke;*/

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .show-item{
        position: relative;
        width: @iw*0.998;
        height: @ih*0.99;
        background-color: red;
        .bg{
          height: 100%;
          width: 100%;
        }
      }
    }
</style>
