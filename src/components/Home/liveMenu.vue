<template>
    <div id="liveMenu">
      <fish headname="直播" @select="chooseFish" v-if="showMenu=='live'"></fish>
      <div class="codeRoom">
        <p>惊喜尽在公众号</p>
        <img src="./liveMenu/code.png" alt="二维码">
      </div>
    </div>
</template>

<script>
  import fish from "./liveMenu/fish";

  export default {
    name: 'liveMenu',
    props: ['chooseFish','showMenu'],
    components: {
        fish,
    }
  }
</script>

<style lang="less" scoped>
    @import "../../assets/config";

    #liveMenu {
      width: 39.58vh;
      height: @Main-Content-H;
      background-color: @Main-header-bgc;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .codeRoom{
        position: absolute;
        left: 1vh;
        bottom: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 39.58vh;
        p{
          font-size: 3vh;
          color: #fff * 0.7;
          margin: 0;
        }
        img{
          width: 39.58vh * 0.8;
          height: auto;

        }
      }
    }
</style>
