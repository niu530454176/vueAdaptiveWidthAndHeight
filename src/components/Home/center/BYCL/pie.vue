<template>
    <div id="pie">
      <header-title :data="headerName"></header-title>
      <div class="body" ref="body">
        <schart
          :canvasId="canvasId"
          :type="type"
          :data="datas"
          :options="options"
        >
        </schart>
      </div>
    </div>
</template>

<script>
  import schart from 'vue-schart';
  import headerLogo from '@/assets/logos/cw.png';
  import headerTitle from '../common/header'
  export default {
    name: 'pie',
    props: ['datas','colors'],
    components: {
      schart,
      'header-title': headerTitle
    },
    created() {
        if(this.colors && this.colors.length > 0) {
            this.options.colorList = this.colors;
        }else {
            console.log('no color')
        }
    },
    mounted() {
      const ibody = this.$refs.body;
      const w  = ibody.clientWidth;
      const h  = ibody.clientHeight;
      this.ph = h;
      this.pw = w;
    },
    data: function () {
      return {
        headerName: {
          name: '总仓位配比',
          logo: headerLogo
        },
        canvasId: 'myCanvas',
        type: 'pie',
        options: {
          bgColor: '#363739',
          radius: '70',
          legendColor: '#fdfdfd',
//          colorList: ['#5a99d3','#eb6100']
        },
        ph: 0,
        pw: 0,
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../center';
  #pie {
    height: @ih;
    width: @iw;
    background-color: #2c2d2f ;
    .body{
      @padding-top: 3vh;
      margin: 0 (0.05 * @iw);
      padding:@padding-top 0;
      width: @iw * 0.9;
      height: 0.65 * @ih - (@padding-top * 2) ;
      background-color: #363739;
    }
  }
</style>
