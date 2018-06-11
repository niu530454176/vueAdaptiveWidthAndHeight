<template>
    <div id="BYCL">
      <div class="show-item">
        <first-option></first-option>
      </div>
      <div class="show-item">
        <!--<second-option></second-option>-->
      </div>
      <div class="show-item">
        <!--<three-option></three-option>-->
        <pie :datas="pieData" :colors="pieColors"></pie>
      </div>
      <div class="show-item">
        <!--<four-option></four-option>-->
      </div>
      <!--<pie :datas="pieData" :colors="pieColors"></pie>-->
    </div>
</template>

<script>
  import  firstOption from './common/firstOption';
//  import  secondOption from './common/secondOption.vue';
//  import  threeOption from './common/threeOption.vue';
//  import  fourOption from './common/fourOption.vue';
  import pie from './BYCL/pie.vue'
    export default {
      name: 'BYCL',
      components: {
        pie,
        'first-option': firstOption,
//        'second-option': secondOption,
//        'three-option': threeOption,
//        'four-option': fourOption
      },
    data: function () {
      return {
        pieData: [
          {name: '现金', value: 80},
          {name: '股票', value: 20}
        ],
        pieColors: ['#5a99d3','#eb6100']
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './center';
    #BYCL {
      height: @height;
      width: @width;
      /*background-color: whitesmoke;*/

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

  .show-item {
    position: relative;
    width: @iw *0.998;
    height: @ih *0.99;
    background-color: #2c2d2f;
  }

  }
</style>
