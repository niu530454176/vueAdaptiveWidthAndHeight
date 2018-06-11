<template>
  <div class="container">
    <div class="header">
      <img :src="icon" alt="">
      <span> {{headname}} </span>
      <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
    </div>
    <div class="bamboo">
      <transition-group name="list" mode="out-in">
        <div class="bamboo-item" v-for="(item, index) in data" @click="Select(item)" :key="item.id">
          <div class="t1">
            <img :src="isReplay(item) ? replayIcon : liveIcon" alt="time" class="icon">
            <p>{{intToDate(item.startTime)}}</p>
            <p>{{intToTime(item.startTime)}}</p>
          </div>
          <div class="item-bottom"> {{item.name}} </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  const icon = require('./title.png');
  const icon1 = require('./live.png');
  const icon2 = require('./replay.png');
  const owl = require('@/owl');
  const moment = require('moment');
  import DP from './datepicker.vue'
  export default {
    name: 'fish',
    props: ['choosed'],
    components : {
      'date-picker': DP
    },
    data: function () {
      return {
        headname: "当日课程",
        icon,
        liveIcon: icon1,
        replayIcon: icon2,
        curLesson: -1,
        data: [],
        // 以下是插件配置
        startTime: {
          time: ''
        },
        endtime: {
          time: ''
        },
        option: {
          type: 'day',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', ' 十一月', '腊月'],
          format: 'YYYY-MM-DD',
          placeholder: '历史回看',
          inputStyle: {
            'display': 'inline-block',
            'text-align': 'center',
            'width' : '15vh',
            'height': '2.4vh',
//                        'padding': '0.2vh',
            'margin-left': '3vh',
            'line-height': '2.0vh',
            'font-size': '1vh',
            'border': '2px solid #a62100',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#808080',
            'background-color': '#2f2f2f',
            'cursor': 'pointer',
          },
          color: {
            header: 'rgba(40,40,40, 0.92)',
            headerText: '#a62100'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
        timeoption: {
          type: 'min',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD HH:mm'
        },
        multiOption: {
          type: 'multi-day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format:"YYYY-MM-DD HH:mm"
        },
        limit: [
          {
            type: 'weekday',
            available: [1, 2, 3, 4, 5]
          },
          {
            type: 'fromto',
            from: moment().subtract(30,'days').format('YYYY-MM-DD'), // 最多观看一个月前的
            to: moment().add(1,'days').format('YYYY-MM-DD')
          }
        ]
      };
    },
    watch:{
      // 监听日期选择器，重选时间后重新请求数据
      ['startTime.time'](newval,oldval){
          let today = moment().format("YYYY-MM-DD");
        this.getDataByDay(newval);
          if(newval === today) {
              this.headname = '当日课程'
          } else {
            this.headname = '历史回看'
          }
      }
    },
    mounted: function () {
      const that = this;
      this.getDataByDay(moment(),function () {
        // 新进入界面时进行状态判断
        const cur = that.getCurLiving();
        if (cur < 0) {
          // 在未开始或全部结束时间使用 Cover图
//          if (cur === -2) {
//            that.$emit('select','','wait');
//            return;
//          }
          that.$emit('select','','wait');
          return;
          // 在其他等待时间使用直播流
        }
        const curLesson = that.data[0].flvUrl;
        that.$emit('select',curLesson,'live');
      });
    },
    methods: {
//      getDataByDay(cb = ()=>{}){
//        fetch(owl.domain+owl.fish).then( res1 => {
//          return res1.json();
//        }).then( json => {
//          this.data = json.data;
//          // 使默认播放为直播流
//          cb();
//        });
//      },
      getDataByDay( FormatDate = moment(), cb = ()=>{}){
        const format ='YYYY-MM-DD';
        const chooseTime = moment(FormatDate);
        const format2 ='X';
        // 獲取今天0:00 時刻的時間
        const chooseday = moment(chooseTime.format(format)).format(format2);
        // 獲取今天23:59 + 1 時刻的時間
        const tomorrow = chooseTime.add(1,'day').format(format2);

        fetch(owl.domain+owl.fish+`?startTime=${chooseday}&endTime=${tomorrow}`).then( res1 => {
          return res1.json();
        }).then( json => {
          this.data = [];
          //json.data
          let i = 0;
          while (i<json.data.length ) {
            setTimeout( () => {
              this.data.push(json.data.shift());
            },(i * 200));
            i += 1;
          }
          cb();
        });
      },
      isReplay(item) {
          if (item) {
            let t = item.mtsState;
            if ( t>=1 ){
              return true;
            }
          }
          return false;
      },
      intToDate( intparam ) {
        return moment(intparam*1000).format('MM-DD');
      },
      intToTime( intparam ) {
        return moment(intparam*1000).format('HH:mm');
      },
      getCurLiving(now = moment().format('X')) {
        // 必须从最早的数据开始遍历
        // 如果目前时间大于该遍历项时间，且录播开关为空，证明该项可能为直播项
        // 继续向后遍历直到没有时间大于现在的项
        const datas = this.data;
        let curlive = -1;
        if (datas.length > 0) {
          for (let i=0 ;i<datas.length - 1; i++) {
            const item = datas[i];
            const startTime = item.startTime;
            // 當前時間大於該積木的播放時間
            if ( now > startTime ) {
              if ( parseInt(item.mtsState) === 0) {
                curlive = i;
              }
            }else {
              if ( i == 0 || i == datas.length - 1 ) {
                // 直播未开始
                return -2; // 证明现在未开始或结束状态
              }
              // 第 i-1 个正在直播
              return curlive;
            }
          }
          // 所有直播已经结束
        } else {
            //无节目t add
        }
        // 说明不再所有直播段，也不再开始之前和结束之后，有可能是中午,或没数据 返回-1
        return curlive;
      },
      Select(item) {
          if(this.isReplay(item)) {
              // 录播状态
            this.$emit('select',item.playBackUrl,'replay');

          } else {
            // 直播状态
            this.$emit('select',item.flvUrl,'live');
          }
      }
    },
    computed: {
      activeNum: function () {
        if (this.choosed.index < 0) {
          // 证明在直播
          return 0;
        } else {
          // 没有直播，在录播
          return -1;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/config';
  @import './Animation';

  @b2: @cf2;
  @padding: 2vh;

  *{
    font-family: -apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif;
  }
  .item-base {
    font-size: @sf16;
    color: #fff*0.5;
    width: 35.31vh;
    //margin: 0 @padding;
    height: 8.33vh;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .t1{
      width: 15vh;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .icon{
        /*padding-left: 1.48vh;*/
        /*padding-right: 1.27vh;*/
        height: 2.43vh;
        width: 2.43vh;
      }
    }
  }
  /*.item-bottom{*/
  /*width: 11.58vh;*/
  /*text-align: center;*/
  /*}*/
  .item-active{
    .item-base;
    box-shadow: 0 0.21vh 1.69vh 0 rgba(0, 0, 0, 0.2);
    .t1{
      color: #fff;
    }
    .item-bottom{
      color: @primaryColor;
    }
  }
  .container {
    font-size: @sf16;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-weight: 600;
      img{
        height: 2.50vh;
        width: auto;
      }
      span{
        text-align: center;
        width: 13vh;
        font-size: @sf22;
      }
      padding: 3.6vh 2.65vh;
      padding-bottom: 1.07vh;
      color: @primaryColor;
      /*font-weight:  600;*/

    }
    .bamboo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .bamboo-item{
        .item-base;
        &:hover {
          .item-active;
        }
      }
    }
  }
</style>
