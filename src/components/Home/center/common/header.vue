<template>
  <div id="header">
    <img :src="logo" alt="">
    <div class="name">{{ name }}</div>
  </div>
</template>
<script>
 export default {
    name: 'headerTitle',
    props: ['data'],
    data: function () {
      return {
        logo: '',
        name: ''
      }
    },
    mounted: function () {
      this.logo = this.data.logo;
      this.name = this.data.name;
    }
  }
</script>
<style lang="less" scoped>
  @import "../center.less";
  @headWidth: @iw/3.5;
  @headHeight: @ih/6.5;
  #header {
    margin-top: 1.3vh;
    height: @headHeight;
    text-align: right;
    line-height: 5.1vh;
    display: inline-block;
    color: #a62100;
    padding-right: 1vh;
    font-size: 1.46rem;
    position: relative;
    font-weight: bold;
    letter-spacing: .1em;
    background: #282a2f;
    &:before {
       content: '';
       height: .15rem;
       background: #a62100;
       position: absolute;
       left: 0;
       width: @iw*.9;
       bottom: -1.6vh;
    }
    img {
      width: 4vh;
      height: 4vh;
      position: absolute;
      left: 1.4vh;
      top: 50%;
      margin-top: -2vh;
    }
    .name {
      height: 1.6vh;
      margin-left: 6.3vh;
    }
  }
</style>
