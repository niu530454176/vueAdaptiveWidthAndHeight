<template>
    <div id="mainBanner">
      <div class="show">
        <transition name="fade">
          <img :src="banner.big" alt="活动" class="show" v-for="(banner, index) in banners" v-if="active==index" :key="banner.name" draggable="false">
        </transition>
      </div>
      <div class="blist">
        <img class="bitem" :src="banner.small" alt="缩略图" v-for="(banner, index) in banners" :key="banner.name" @click="active=index" draggable="false">
      </div>
    </div>
</template>

<script>
  import test from './mainBanner/test/main.json';
  export default {
    name: 'mainBanner',
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
        banners: test,
        active: 0,
        schedule: -1
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./content";
    #mainBanner {
      width: @LW;
      height: @TH;
      /*background-color: #fff;*/

      .cj{
        border-radius: 0 0 2% 2%;
      }

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .show{
        //1090 562
        position: relative;
        width: 113.54vh;
        height: 58.54vh;
        background-color: @primaryColor;
        margin-bottom: -4.97vh;
        .cj;
        img{
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          .cj;
        }
      }
      .blist{
        position: relative;
        //106
        height: 11.04vh;
        width: @LW;
        //background-color: #f56e26  * 0.8;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        bitem{
          position: absolute;
          z-index: 10;
          border-radius: 1vh;
          width: 20.21vh;
          height: 11.04vh;
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
