<template>
  <div id="pdfRoom">
    <object
      :data="source"
      type="application/pdf"
      width="100%"
      height="100%"
      internalinstanceid="4"
    >
    </object>
  </div>
</template>

<script>

  import pdf from '../../static/test.pdf';
  export default {
    name: 'pdfRoom',
    data: function () {
      return {
          source: pdf // 测试使用 for test
      }
    },
  }
</script>

<style lang="less" scoped>
  #pdfRoom {
    height: 100%;
    width: 100%;
  }
</style>
