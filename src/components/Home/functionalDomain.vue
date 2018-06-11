<template>
    <div id="functionalDomain">
      <div class="title">
        <span>{{menu.title}}</span>
      </div>
      <div class="room">
        <btn-box :menu="menu.menu" v-if="menu.menu.length<5"></btn-box>
        <mult-btn-box :menu="menu.menu" v-else></mult-btn-box>
      </div>
      <div class="title">
        <span>活动专区</span>
      </div>
      <div class="room">
        <banner></banner>
      </div>
    </div>
</template>

<script>
  import btnBox from './functionalDomain/btnBox.vue';
  import multBtnBox from './functionalDomain/multBtnBox.vue';
  import banner from './functionalDomain/banner.vue';
  export default {
    name: 'functionalDomain',
    props: [
        'menu'
    ],
    components : {
      "btn-box" : btnBox,
      "mult-btn-box": multBtnBox,
      banner,
    },
    data: function () {
      return {
        menuTag: 0
      }
    }
  }
</script>

<style lang="less" scoped>
    @import './content';

    #functionalDomain {
      width: @RW;
      height: @TH;
      background-color: #292a2b;
      font-family: -apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif;

      .title{
        color: @primaryColor;
        font-size: 1.46vh;
        line-height: 1.6vh;
        margin-top: 1.5vh;
        border-bottom: 2px solid #343539;
        span{
          display: inline-block;
          padding: 2.52vh / 2 1.04vh;
          border-bottom: 2px solid @primaryColor;
          margin-bottom: -2px;
          padding-right: 2vh;
        }
      }
      .room{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 1.56vh 0;
      }

    }
</style>
