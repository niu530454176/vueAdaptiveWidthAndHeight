<template>
  <div id="mheader">
    <div class="fish-menu-select">
      <div :class="['choose',active==0?'active':'']" @click="choose(0)">视频直播</div>
      <div :class="['choose',active==1?'active':'']" @click="choose(1)">节目视频</div>
    </div>
    <div class="tbox">{{time}}</div>
  </div>
</template>

<script>
  const moment = require('moment');
  export default {
    name: 'mheader',
    created: function () {
      let that = this;
      this.time = this.getTime();
      clearInterval(this.color);
      this.color = -1;
      this.color = setInterval(()=>{
        that.time = that.getTime();
      },3000)
    },
    data: function () {
      return {
        time: '',
        active: 0
      }
    },
    methods:{
      getTime() {
        return  moment().format('YYYY/MM/DD - hh:mm');
      },
      choose(tag) {
          this.active = tag;
          switch(tag) {
            case 0: this.$emit('select','live');break;
            case 1: this.$emit('select','suject');break;
            default:this.$emit('select','live');
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/config";
  @font-face{
    font-family: "digital";
    src:url("../../assets/font/Let's go Digital Regular.ttf");
  }
  #mheader{
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: @Main-header-bgc;
    width: @MainWidth;
    height: @Main-header-H;
    box-shadow: 0px 5px 10px 0px
    rgba(16, 8, 5, 0.13);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @fp: 5vh;
    .fish-menu-select {
      width: 41.25vh - @fp * 2;
      padding: 0 @fp;
      height: 100%;

      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-around;

      .choose{
        position: relative;
        cursor: pointer;
        font-size: 1.88vh;
        color: #fff*0.27;
        line-height: 2.45;

        transition: all .5s;
        @border: 0.45vh;
        &.active {
          font-size: 2.5vh ;
          color: #fff * 0.9;
          &::before{
            content: "";
            position: absolute;
            left: 50% * 0.5;
            bottom: 0;
            width: 50%;
            height: @border;
            background-color: #fff * 0.9;
          }
        }

        &:hover{
          color: #fff * 0.9;
        }
      }

    }

    .tbox{
      margin: 0 1.56vh;
      width: 31.88vh;
      height: 6.25vh;
      background-color: #232324;
      box-shadow: inset 0px 0px 3px 0px
      rgba(34, 23, 20, 0.35);
      font-family: 'digital', serif;
      font-size: 3.96vh;
      color: #474747;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
</style>
