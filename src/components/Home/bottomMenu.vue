<template>
  <div id="avdio">
    <div class="audio-room" :style="{width: audiosWidth}">
      <div ref="audioContainer" class="container" v-drag="audiosWidth">
        <div
          :class="['audio-item',HoverAudio==index || playingAudio == index ? 'active':'']"
          v-for="(item, index) in audios"
          @mouseenter="HoverAudio=index">
          <div class="title">
            <p class="name" :style="playingAudio==index ? {color: 'red'} : {}">{{item.name}}</p>
            <p class="time" :style="playingAudio==index ? {color: 'red'} : {}">{{item.time}}</p>
          </div>
          <div
            class="player"
            @click="LoadAudio(item.path, index)"
          >
            <span class="long">“03:56</span>
            <i class="iconfont icon-zanting" v-if="playingAudio==index&&audioIsWait"></i>
            <i class="iconfont icon-youbofang" v-else></i>
          </div>
        </div>
      </div>
      <div class="left-tip" @click="whenAudioLeftClick">
        <left-tip></left-tip>
      </div>
    </div>
    <div class="video-room" :style="{width: videosWidth}">
      <div ref="videoContainer" class="container" v-drag="videosWidth">
        <div
          class="video-item"
          v-for="(item, index) in channelData"
          :key="item.id"
          v-on:click.capture="SelectChannel(item)">
          <img :src="item.kfImg" alt="img" class="img" draggable="false">
          <div class="info">
            <span class="name">{{item.title}}</span>
            <span class="other">{{item.kfDesc}}</span>
          </div>
        </div>
      </div>
      <div class="left-tip" @click="whenVideoLeftClick">
        <left-tip></left-tip>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/iconfont/iconfont.css';
  import leftTip from './leftTip.vue';
  import owl from '@/owl';
  const Velocity = require('velocity-animate');
  const moment = require('moment');
  export default {
    name: 'bottomMenu',
    components: {
      "left-tip" : leftTip
    },
    data: function () {
      return {
        testSrc: '../../assets/mp3/test.mp3',
        channelData: [],
        obj: false,
        audios: [],
        HoverAudio: 0,
        playingAudio: -1,
        audiosWidth: 0,
        videosWidth: 0,
        audioIsWait: true
      }
    },
    mounted: function () {
      this.getChannel();
      this.obj = this.$refs.swf;
      this.getAudios();
    },
    methods: {
      getChannel() {
        const pageIndex=1;
        const pageSize=14;
        const type=10004;
        let that = this;
        fetch(owl.domain+owl.channel + `?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}`).then( res => {
          return res.json();
        }).then (json => {
          const data = json.meta.rows;
          data.map(item => {
            const img = owl.domain + item.kfImg;
            item.kfImg = img;
            return item;
          });
          this.channelData = data;

          // 动态计算总宽度，用来适应drag指令
          let allw = that.channelData.length * (18.23 + 1.56 ) + 5; //每个item的宽度和margin-right
          allw = allw > 158 ? allw : 158;
          that.videosWidth = `${allw}vh`;

        });
      },
      SelectChannel(item) {
        const selectedUrl = item.kfVideo;
        this.$emit('select',selectedUrl,'replay');
      },
      // 音频
      getAudios() {
        const that = this;
        let audio = owl.audio;
        fetch(audio.all,{method: 'POST'}).then( res => {
          return res.json();
        }).then( json => {
          that.audios = json.map( item => {
            return {
              ... item,
              time: moment(item.date).format('MM-DD HH:mm:ss')
            }
          }).splice(19);
          // 动态计算总宽度，用来适应drag指令
          let allw = that.audios.length * (29 + 1.56 ) + 5; //每个item的宽度和margin-right
          allw = allw > 158 ? allw : 158;
          that.audiosWidth = `${allw}vh`;
        });
      },
      LoadAudio(path, index) {
        const p = owl.audio.getMp3(path);
        if( index === this.playingAudio ) {
            if( this.audioIsWait ) {
              this.$emit('audioCommand',{ command: 'play', url: p});
            } else {
              this.$emit('audioCommand',{ command: 'pause', url: p});
            }
            this.audioIsWait = !this.audioIsWait;
        } else {
          this.$emit('audioCommand',{ command: 'load', url: p});
          this.audioIsWait = false;
          this.playingAudio = index;
        }
//        this.$emit('select',p,'audio');
      },
      whenAudioLeftClick() {
        let audio = this.$refs.audioContainer;
        let curML = audio.style.marginLeft.slice(0,-2) || 0;
        Velocity(audio, {
          marginLeft: `${curML - 50 * 9.6}px`
        });
      },
      whenVideoLeftClick() {
        let video = this.$refs.videoContainer;
        let curML = video.style.marginLeft.slice(0,-2) || 0;
        Velocity(video, {
          marginLeft: `${curML - 50 * 9.6}px`
        });
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "./content";

  @H: 23.53vh;
  @audioH: 9.6vh;
  #avdio {
    height: @H;
    width: 100%;
    background-color: #212226;
    .audio-room{
      position: relative;
      width: @AW;
      height: @audioH;
      background-color: #212226;
      padding-left: 4.9vh;
      overflow-x: visible;
      overflow-y: hidden;

      .container{
        cursor: move;
        height: @audioH;
        overflow-y: hidden;
        overflow-x: hidden;
        white-space: nowrap;
        /*width: 210vh;*/

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        .audio-item{
          margin-right: 1.56vh;
          width: 29vh;
          /*background-color: #fff;*/
          .title{
            height: 3.02vh;
            line-height: 3.02vh;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-weight: 600;
            @topC: #41434b * 1.3;
            .name{
              .tool-ds;
              width: 10vh;
              flex-grow: 2;
              font-size: 1.15vh;
              color: @topC;
            }
            .time{
              flex-grow: 2;
              font-size: 1.15vh;
              color: @topC;
            }
          }
          .player{
            cursor: pointer;
            height: 4.79vh;
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


      }

      .left-tip{
        @left-tip-width: 5vh;
        position: absolute;
        height: @audioH;
        //width: @left-tip-width;
        top: 0;
        left: @AW - @left-tip-width;
      }

    }
    .video-room{
      /*display: none;*/
      position: relative;
      @ru: 0;
      padding-left: 4.9vh;
      height: @H - @audioH;
      background-color: #1f2024;

      overflow-x: visible;
      overflow-y: hidden;
      /*display: flex;*/
      .container{

        cursor: move;
        overflow-y: hidden;
        overflow-x: hidden;
        white-space: nowrap;
        flex-direction: row;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        .video-item{
          // 175 124
          margin-right: 1.56vh;
          transition: all 0.3s ease;
          &:hover{
            /*transform: ;*/
            transform: translateY(-1.5vh);
          }
          cursor: pointer;
          margin-top: -1vh;
          @height: 12.92vh;
          @width: 18.23vh;
          width: @width;
          height: @height;
          background-color: #fff;
          @imgH: 8.23vh;

          border-radius: @ru @ru 0 0;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .img {
            border-radius: @ru @ru 0 0;
            width: @width;
            height: @imgH;
            /*background-color: darkcyan;*/
          }
          .info {
            .pl{
              padding-left: 0.94vh;
            }
            width: @width;
            height: @height - @imgH;
            background-color: #2c2d2e;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .name{
              .pl;
              font-size: 1.35vh;
              color: #fff * 0.9;
            }
            .other{
              .pl;
              font-size: 1.05vh;
              color: #fff * 0.75;
            }
          }
        }

      }


      .left-tip{
        @videoH: @H - @audioH;
        @left-tip-width: 5vh;
        position: absolute;
        height: @videoH;
        width: @left-tip-width;
        top: 0;
        left: @AW - @left-tip-width;
      }

    }

  }
</style>
