<template>
  <div id="Aplayer">
    <embed
      src="/static/swf/NewsPlayer.swf?dix=abc"
      ref="swf"
      quality="high"
      bgcolor="#FFFFFF"
      width="400"
      height="300"
      name="swf"
      type="application/x-shockwave-flash"
      swLiveConnect="true"
      pluginspage="http://www.macromedia.com/go/getflashplayer">
    </embed>
  </div>
</template>

<script>
  window.abcrenderComplete = function () {
//    console.log('音频播放器加载完成');
  };
  export default {
    name: 'Aplayer',
    props: ['command'],
    data: function () {
      return {
        obj: '',
        playing: true
      }
    },
    mounted: function () {
      this.obj = this.$refs.swf;
    },
    methods: {
      load(url) {
        this.obj.resetSound(url,5000)
      },
      pause() {
        this.obj.pause();
      },
      play() {
        this.obj.play2()
      },
      setVolume(volume) {
        this.obj.setVolume(volume);
      }
    },
    watch: {
        command(nval,oval) {
            let {command, url} = nval;
            switch (command) {
              case 'load' :
                  this.load(url);
                  break;
              case 'play' :
                  this.play();
                  break;
              case 'pause' :
                  this.pause();
                  break;
              default:
                  console.log("Aplayer2 : error command");
                  this.pause();
            }
        }
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/config";
  #Aplayer {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
</style>
