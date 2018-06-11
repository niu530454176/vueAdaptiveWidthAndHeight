<template>
  <div id="banner">
    <transition name="fade">
      <img :src="banner.img" alt="活动" class="show" v-for="(banner, index) in banners" v-if="active==index" :key="index" draggable="false">
    </transition>
    <div class="dot-room">
      <div :class="['dot', active==i?'active':'']" v-for="(b,i) in banners" @click="active=i"></div>
    </div>
  </div>
</template>

<script>
  import test from './test/banner.json';
  export default {
    name: 'banner',
    mounted: function () {
        if(this.schedule>0) {
          clearInterval(this.schedule);
        }
        this.schedule = setInterval(()=>{
            let next = this.active + 1;
            this.active =( next >= this.banners.length ) ? 0 : next;
        },7000)
    },
    data: function () {
      return {
        active: 1,
        banners: test,
        schedule: -1
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../content";


  #banner {
    // w 295
    // h 268
    @width: 30.73vh;
    @height: 27.92vh;
    @bannerW: 28.96vh;
    @bannerH: 25.83vh;

    position: relative;
    width: @width;
    height: @height;
    background-color: #363738;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .show{
      // 278
      // 248
      cursor: pointer;
      position: absolute;
      top: ( @height - @bannerH) / 2;
      left: (@width - @bannerW) / 2;
      width: @bannerW;
      height: @bannerH;
    }

    .dot-room {
      cursor: pointer;
      position: absolute;
      width: @width;

      height: 2vh;
      left: 0;
      bottom: 2.5vh;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .dot{
        border-radius: 50%;
        width: 1.04vh;
        height: 1.04vh;
        background-color: #888;
        margin: 0.83vh / 2;
        &.active {
          background-color: @primaryColor;
        }
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
