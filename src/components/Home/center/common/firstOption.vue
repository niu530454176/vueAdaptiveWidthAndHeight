<template>
  <div id="firstOption">
    <header-title :data="headerName"></header-title>
  </div>
</template>

<script>
  import headerLogo from '@/assets/header-logo-1.png';
  import headerTitle from './header'
  export default {
    name: 'firstOption',
    components: {
      'header-title': headerTitle
    },
    data: function () {
      return {
        headerName: {
          name: '热点点板块',
          logo: headerLogo
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../center.less';
  #firstOption {
    width: @iw*0.9;
    margin: 0 auto;
  }
</style>
