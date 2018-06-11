<template>
    <div id="video-player" ref="video">
    </div>
</template>

<script>
    require('../lib/prism-min');
    export default {
        name: 'Vplayer',
        props:['url'],
        mounted: function () {
//            console.log('player 组件 mounted ，初始化播放器');
            // 初始化播放器
        },
        updated: function () {
//            console.log('player 组件 updated');
        },
        data: function () {
            return {
                player: ''
            }
        },
        watch: {
            url(newVal, oldVal){
                this.$refs.video.html='';
                if(this.player !== '') {
                    this.player = new prismplayer({
                        id: "video-player",
                        source: this.url,
                        cover: "http://babatest.oss-cn-shanghai.aliyuncs.com/cover.jpg",
//                        source: "",
                        autoplay: true,
                        width: "100%",
                        height: '100%',
                        isLive: false ,     // cover:img
                    });
                    this.player.on('error', function () {
                        console.log('error!!!!');
                    })
                } else {
                  this.player = new prismplayer({
                    id: "video-player",
                    source: this.url,
                    autoplay: true,
                    cover: "http://babatest.oss-cn-shanghai.aliyuncs.com/cover.jpg",
                    width: "100%",
                    height: '100%',
                    isLive: false ,     // cover:img
                  });
                }
            }

        }
    }
</script>

<style>
    #video-player{
        height: 100%;
        width: 100%;
        /*background-color: #fff;*/
    }

</style>
