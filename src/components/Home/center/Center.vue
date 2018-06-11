<template>
  <div id="Center">
    <!--<first></first>-->
    <project-1></project-1>
  </div>
</template>

<script>
  import first from './first';
  import BYCL from './BYCL';
  import pdfRoom from '@/components/pdfRoom';
  export default {
    name: 'Center',
    components: {
      first,
      "pdf-room": pdfRoom,
      'project-1': BYCL
    }
  }
</script>

<style lang="less" scoped>
  @import './center';
  #Center {
    height: @height;
    width: @width;
  }
</style>
