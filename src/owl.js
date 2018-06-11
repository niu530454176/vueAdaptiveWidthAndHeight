/**
 * Created by zy on 2018/4/3.
 */

const audioDomain = "http://47.92.26.118:3002";
module.exports = {
  domain: "http://www.cctvjy.cn/",
  fish: "program/liveList.do",
  channel: "program/kungfuListByType.do",
  information3: "http://caishanzixun.babazixun.com/zixunserver/index.php/news14/dataconcctvnews/",
  teachers: "teacher/list",
  vipCoursesID: "userCenter/app/courses.do?permission=jgb",
  // information2: "http//caishanzixun.babazixun.com/"
  getCourses: "userCenter/app/videos",


  // 测试音频 //for test
  audio: {
    domain: "http://47.92.26.118:3002/",
    all: audioDomain+"/audio/all.do",
    getMp3(path) {
      return this.domain + "mp3/" + path;
    }
  }
};
