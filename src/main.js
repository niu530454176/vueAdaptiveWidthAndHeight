// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

const Velocity = require('velocity-animate');

Vue.config.productionTip = false;

// 在有item的外层额外添加一个container,而且不要在有click事件，有drag自带的click事件管理拖拽
// 而内层的点击要加上captrue参数来启动捕获
Vue.directive('drag',//自定义指令
  {componentUpdated:function (el, binding) {

    let oDiv = el;   //当前元素
    let self = this;  //上下文

    function stopClick(e) {
      // 先删除原来的click事件
        oDiv.removeEventListener("click",stopClick,true);
        let ev = e||window.event;
        ev.stopPropagation();
        return false;
    }

    oDiv.onmousedown = function (e) {
      let curML = oDiv.style.marginLeft.slice(0,-2) || 0;
      let disX = e.clientX;



      let l;
      document.onmousemove = function (e) {
        //通过事件委托，计算移动的距离
        l = e.clientX - disX;
        // let t = e.clientY - disY;
        //移动当前元素
        let move = parseInt(curML) + parseInt(l);
        oDiv.style.marginLeft = String(move) + 'px';

      };
      // document.onmouseup = function (e) {
      document.onmouseup = function (e) {
        let curML = oDiv.style.marginLeft.slice(0,-2) || 0;

          // 过量右侧动画
          // 通过binding动态获取最大的宽度
          let MaxML = binding.value.slice(0,-2) || 0;
          // 因为直接使用这个宽度，将是等全部已经隐藏的距离,所以要加上他的原始宽度上限，来确保能显示最后一屏
          MaxML -= 158.75; //150 是特定值，不通用
          MaxML = MaxML > 0 ? MaxML : 0;
          MaxML *= 9.6;

        if(curML > 0) {
          // 过量左侧动画
          Velocity(oDiv,'stop');
          Velocity(oDiv,{
            'marginLeft': 0
          },"ease-out");
        }else if(curML < - MaxML) {
          Velocity(oDiv,'stop');
          Velocity(oDiv,{
            'marginLeft': - MaxML
          },"ease-out");
        }

        // 当移动小于3时触发事件捕获，如果大于3，则阻止事件捕获
        if(l > 3 || l < -3) {
          oDiv.addEventListener("click",stopClick,true);
        }else {
          oDiv.removeEventListener("click",stopClick,true);
        }

        document.onmousemove = null;
        document.onmouseup = null;

      }
    };
  }
  }
);

if( !window.fetch ) {
  require('es6-promise').polyfill();
  window.fetch = require('fetch-ie8');
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
