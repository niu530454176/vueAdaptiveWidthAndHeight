<template>
    <div id="HVC">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <left-cover v-if="cover" @close="cover=false"></left-cover>
      </transition>
      <mheader @select="chooseMenu"></mheader>
      <!--主要区域: 头部以下-->
      <div class="main-content">
        <!--左侧直播菜单-->
        <live-menu :chooseFish="chooseFish" :showMenu="curMenu"></live-menu>
        <!--右侧播放器/中心内容、右侧功能菜单、下部音频流-->
        <div class="content">
          <div class="top">
            <!--播放器/中心内容-->
            <div class="player-room">
              <Aplayer :command="audioControl"></Aplayer>
              <!--<div class="player-fixed" v-show="curState == 'replay'|| curState=='live' ">-->
                <!--<Vplayer :url="curPlayUrl"></Vplayer>-->
              <!--</div>-->
              <!--<main-banner v-show="curState== 'wait'"></main-banner>-->
              <c-center></c-center>
            </div>
            <!--右侧功能菜单-->
            <functional-domain :menu="menuConfig"></functional-domain>
          </div>
          <!--底部音频流-->
          <div class="bottom">
            <bottom-menu @select="chooseFish" @audioCommand="audioCommand"></bottom-menu>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import mheader from './header';
  import Vplayer from '@/components/Vplayer';
  import Aplayer from '@/components/Aplayer2';
  import liveMenu from './liveMenu';
  import functionalDomain from './functionalDomain.vue';
  import mainBanner from './mainBanner.vue';
  import bottomMenu from './bottomMenu.vue';
  import audioRoom from './audioRoom.vue';
  import leftCover from './leftCover.vue';
  import menuConfig from '@/../static/HomeMenu.json';
  import center from './center/Center.vue';

  const Velocity = require("velocity-animate");

  export default {
    name: 'HomeViewController',
    components: {
      Vplayer,
      Aplayer,
      mheader,
      "c-center": center,
      "live-menu": liveMenu,
      "functional-domain": functionalDomain,
      "main-banner": mainBanner,
      "left-cover" : leftCover,
//      "bottom-menu": bottomMenu
      "bottom-menu": audioRoom
    },
    created: function () {
        // 获取权限，并进行边界处理
        let { qx } = this.$route.params;
        qx = qx ? qx : 0;
        qx = qx > 0 && qx < menuConfig.length ? qx : 0;
        this.menuConfig = menuConfig[qx];
    },
    data: function () {
      return {
        curPlayUrl: '',
        curState: '',
        curMenu: 'live',
        cover: false,
        repeatCount: 0,
        audioControl : {},
        menuConfig: menuConfig[1]
      }
    },
    mounted: function () {
        this.cover = true;
        setTimeout(()=>{
            this.cover = false
        },4000)
    },
    computed: {
      audioState() {
          if(this.curState !== 'audio') {
              return false;
          } else {
              return this.repeatCount % 2 === 1;
          }
      }
    },
    methods: {
      chooseFish(url, state) {
        if(url == this.curPlayUrl) {
          this.repeatCount += 1;
        } else {
          this.repeatCount = 0;
        }
        this.curPlayUrl = url;
        this.curState = state;
      },

      audioCommand( param ) {
          this.audioControl = param;
      },

      chooseMenu(menu) {
        this.curMenu = menu;
      },

      beforeEnter(el) {
          el.style.opacity = 0;
          el.style.transformOrigin = 'left top';
          el.style.left = '-10vh';
      },

      enter(el, done) {
        Velocity(el, { opacity: 1, left: 0 },{ duration: 900});
        Velocity(el,{ complete: done });
      },

      leave(el, done) {
        Velocity(el, { opacity: 0 }, { complete: done });
      }
    }
  }

</script>

<style lang="less" scoped>
  @import './content';
  #HVC{
    background-color: #292a2b;
    .main-content{
      padding-top:@Main-header-H;
      height: @Main-Content-H;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .content{
        height: @AH;
        width: @AW;

        .top{
          height: @TH;
          width: @AW;

          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .player-room{
            // w 1090
            height: @TH;
            width: @LW;
            background-color: #212226;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .player-fixed{
              width:113.54vh;
              height: @TH;
            }
          }
        }

        .bottom{
          height: @AH - @TH;
          width: @AW;
        }

      }
    }


  }
</style>
