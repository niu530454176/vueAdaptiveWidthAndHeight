<template>
    <div id="btnBox">
      <div
        :class="['box-item',active==index ? 'active':'']"
        v-for="(item, index) in menu"
        @mouseenter="active=index"
        :style="{width: itemWidth}"
      >
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <p class="title">{{item.name}}</p>
      </div>
    </div>
</template>

<script>
  import '@/assets/iconfont/iconfont.js';
  export default {
    name: 'btnBox',
    props: ['menu'],
    data: function () {
      return {
        active: 0
      }
    },
    computed: {
        itemWidth() {
          let count = Math.ceil(this.menu.length / 2 );
            return 30.73 / count;
        }
    }
    ,
    created: function () {
    }
  }
</script>

<style lang="less" scoped>
    @import "../content";
    @import "./hover";
    @b2: @primaryColor;
    #btnBox {
      width: 30.73vh;
      height: 24.27vh;
      background-color: #2c2d2e;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .box-item {
        .hoverEx2;
        *{
          z-index: 1;
        }
        width: 14.06vh;
        height: 10vh;
        background-color: #363738;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /*.iconfont {*/
          /*font-size: 3.13vh;*/
          /*margin-bottom: -2vh;*/
          /*color: #2c2d2e;*/
        /*}*/
        .icon{
          width: 3.13vh;
          height: 3.13vh;
          margin-bottom: 2.12vh * 0.6;
        }
        .title{
          color: #fff * 0.47;
          margin: 0;
        }

        &.active{
          &::before {
            transform: scale3d(1,1,1);
            transform-origin: 50% 0%;
          }

          p,span,i{
            color: #fff;
          }
        }
      }
      //w 135px   h 96px
    }
</style>
