<template>
  <div id="audioRoom">
    <div class="room-fix">
      <div
        class="audio-item"
        v-for="(item, index) in test1"
        :style="{flexShrink:item}"
        :class="['audio-item',HoverAudio==index || playingAudio == index ? 'active':'']"
        @mouseenter="HoverAudio=index">
        <div class="title">
          <p class="name" >视频名称</p>
          <p class="time">2018.8.8</p>
        </div>
        <div class="player"> <!--@click="LoadAudio(item.path, index)"-->
          <span class="long">“03:56</span>
          <i class="iconfont icon-youbofang"></i>
        </div>
      </div>
    </div>
    <div class="room-fix" >
      <div
        class="audio-item"
        v-for="(item, index) in test2"
        :style="{flexShrink:item}"
        :class="['audio-item',HoverAudio==index + 5 || playingAudio == index + 5 ? 'active':'']"
        @mouseenter="HoverAudio=index + 5">
        <div class="title">
          <p class="name" >视频名称</p>
          <p class="time">2018.8.8</p>
        </div>
        <div class="player"> <!--@click="LoadAudio(item.path, index)"-->
          <span class="long">“03:56</span>
          <i class="iconfont icon-youbofang"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'audioRoom',
    data: function () {
      return {
        test1: [], // for test
        test2: [], // for test
        HoverAudio: 0,
        playingAudio: -1,
        audioIsWait: true
      }
    },
    created: function () {
      // 创建一个测试使用的随机数组
      let f = length => Array.from({length}).map((v,k)=>k).sort(() => {
        return 0.5 - Math.random();
      });
      this.test1 = f(5);
      this.test2 = f(5).map( a => {
          return a * 3;
      });
    }
  }
</script>

<style lang="less" scoped>
  @import "./content";
  @P: 4.9vh;
  @H: 23.53vh;
  @LH: @H / 2.3;
  #audioRoom {
    width: @AW - @P * 2;
    padding: 0 @P;
    height: @H;
    background-color: #212226;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .room-fix{
      height:43%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .audio-item{
    height: @LH;
    margin-right: 1.56vh;
    width: 34vh;
    /*background-color: #fff;*/

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .title{
      height: 3.02vh;
      line-height: 3.02vh;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      @topC: #41434b * 1.3;
      @fontSize: 1.4vh;
      .name{
        .tool-ds;
        width: 10vh;
        flex-grow: 2;
        font-size: @fontSize;
        color: @topC;
      }
      .time{
        flex-grow: 2;
        font-size: @fontSize;
        color: @topC;
      }
    }
    .player{
      cursor: pointer;
      height: 6.67vh;
      width:100%;
      background-color: #2c2d2e;
      color: #fff * 0.5;
      border-radius: 0.3vh;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .audioPlay{
        height: 2.50vh;
        width: auto;
      }
      .iconfont{
        padding: 0 1.4vh;
        font-size: 2.5vh;
      }
    }

    &.active {
      .player{
        background-color: @primaryColor;
        color: #fff * 0.9;
      }
    }
  }

</style>
