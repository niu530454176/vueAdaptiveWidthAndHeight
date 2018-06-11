<template>
  <div id="multBtnBox">
    <div
      :class="['box-item',active==index ? 'active':'']"
      v-for="(item, index) in menu"
      @mouseenter="active=index"
    >
      <div class="iconbg">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </div>
      <p class="title">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  //  import '@/assets/iconfont/iconfont.css';
  import '@/assets/iconfont/iconfont.js';
  export default {
    name: 'multBtnBox',
    props: ['menu'],
    data: function () {
      return {
        active: 0
      }
    },
    created: function () {
    }
  }
</script>

<style lang="less" scoped>
  @import "../content";
  @import "./hover";
  @b2: @primaryColor;
  #multBtnBox {
    width: 30.73vh;
    height: 24.27vh;
    background-color: #2c2d2e;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .box-item {
      width: 14.06vh / 2;
      height: 10vh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /*.iconfont {*/
      /*font-size: 3.13vh;*/
      /*margin-bottom: -2vh;*/
      /*color: #2c2d2e;*/
      /*}*/
      @rect: 14.06vh / 2;
      .iconbg{
        .hoverEx2;
        *{
          z-index: 1;
        }
        width: @rect;
        height: @rect;
        background-color: #363738;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon{
          width: 3.13vh;
          height: 3.13vh;
        }
      }
      .title{
        color: #fff * 0.47;
        margin: 0;
      }

      &.active{
        .iconbg{
          .icon {
            width: 3.5vh;
            height: 3.5vh;
          }
          &:before{
            transform: scale3d(1,1,1);
            transform-origin: 50% 0%;
          }
        }

        p,span,i{
          color: #fff;
        }
      }
    }
    //w 135px   h 96px
  }
</style>
