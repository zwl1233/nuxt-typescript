<template>
  <section>
    <el-dialog
      :visible.sync="reviewFlag"
      custom-class="BaskHomework-Model app-change-el-dislog"
      width="640px"
      center
      :before-close="closes"
    >
      <div class="Model-content">
        <div class="BaskHomework_title"  >
          <h3 class="fz16 c30">亲爱的沫沫同学：</h3>
          <ul>
            <li>勤奋好学的你这一学年一共上了{{info.courseHourNum||0}}节课，总时长{{info.courseHourTime||0}}个小时</li>
            <li>观看过{{info.zhiBo}}个小时的直播与{{info.luBo||0}}个小时的视频</li>
            <li>你最喜欢的课程是{{info.favouriteCourse||0}}</li>
            <li>一共晒出了{{info.sunHomeWorkTime||0}}份作业</li>
            <li>你的话题收到了{{info.topicPraiseNum||0}}人点赞</li>
            <li>上交过{{info.homeWorkNum||0}}份作业</li>
            <li>参与过{{info.joinDiscuss||0}}个话题讨论</li>
            <li>上传过{{info.pictureNum||0}}张图片</li>
          </ul>
        </div>
        <div class="BaskHomework_time">
          <p
            class="fz14 c4a5"
            style="lineHeight:20px;"
          >
            我们一起回忆下你进步过程吧~
          </p>
          <ul class="fz12 c30">
            <li>{{formData(info.joinTime)}} 加入暄桐教室</li>
            <li v-for="(item,index) in info.courseMessage" :key="index">{{formData(item.joinTime)}} 报名了{{item.courseName}}课程
            </li>
            <!-- <li>2018-09-02 报名了第一阶《篆隶筑基》课程</li>
            <li>2018-09-24 报名了第二阶《楷书精进》课程</li> -->
          </ul>

        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import {formData} from "@/plugins/utils"
export default {
  data() {
    return {
      info: {
        joinTime: "", // 加入时间
        courseMessage: [], //课程信息
        courseHourNum: "", //上课节数
        courseHourTime: "", //上课时长
        zhiBo: "", //直播课时长
        luBo: "", //录播课时长
        favouriteCourse: "", //最喜欢的课程
        sunHomeWorkTime: "", //晒作业次数
        topicPraiseNum: "", // 话题收到点赞个数
        joinDiscuss: "", // 参与话题数
        homeWorkNum: "", // 上交作业次数
        pictureNum: "" // 上传图片数
      }
    };
  },
  created() {
    this.$axios
      .post("/activity/coursestudyreview", { token: "" })
      .then(res => {
        // console.log("信息返回",res.result)
        // console.log(res.result.joinTime)
        // console.log(this.formData(res.result.joinTime))
        this.info=res.result
      });
  },
  computed: {
    ...mapState({
     reviewFlag:state=>state.singleOrder.courseContent.reviewFlag,//通关回顾状态
    })
  },
  methods: {
    ...mapMutations({
      getCookie: "system/getCookie", //获取用户cookie
      changeFlag:"singleOrder/courseContent/changeFlag",//改变通关回顾
    }),
    closes() {
      this.changeFlag(false);
    },
    formData,
  }
};
</script>

<style>
/*end 游戏闯关介绍*/
/*晒作业-课程-回忆 BaskHomework*/
.BaskHomework-Model {
  background: rgba(255, 255, 255, 0.95);
}
.BaskHomework-Model .el-dialog__header {
  display: none;
}
.BaskHomework-Model .el-dialog__body {
  padding: 0px;
}
.BaskHomework-Model .BaskHomework_title {
  min-height: 340px;
  background: url(~assets/img/BaskHomework_bg.png) right bottom no-repeat;
}
.BaskHomework-Model .BaskHomework_title > h3 {
  padding-top: 32px;
  margin-left: 36px;
  line-height: 20px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul {
  padding: 20px 37px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul li {
  line-height: 20px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(1) {
  padding-left: 32px;
  color: #077478;
  font-size: 16px;
  margin-bottom: 16px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(2) {
  font-size: 18px;
  text-align: right;
  color: #c4a57f;
  padding-right: 26px;
  margin-bottom: 15px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(3) {
  padding-left: 97px;
  font-size: 22px;
  color: #7a9e7c;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(4) {
  color: #ddcfbe;
  font-size: 14px;
  display: inline-block;
  margin-top: 12px;
  padding-left: 32px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(5) {
  color: #c4a57f;
  font-size: 16px;
  display: inline-block;
  text-align: right;
  padding-left: 137px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(6) {
  color: #077478;
  font-size: 14px;
  padding-right: calc(200px);
  text-align: right;
  margin-top: 12px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(7) {
  color: #c4a57f;
  font-size: 14px;
  padding-left: 87px;
  margin-top: 2px;
}
.BaskHomework-Model .BaskHomework_title > h3 + ul > li:nth-child(8) {
  color: #7a9e7c;
  font-size: 14px;
  padding-left: 189px;
  margin-top: 13px;
}
.BaskHomework-Model .BaskHomework_time {
  height: auto;
  padding: 30px 30px 45px 68px;
  background: #fff;
}
.BaskHomework-Model .BaskHomework_time > ul {
  width: 100%;
  margin-top: 23px;
  position: relative;
}
.BaskHomework-Model .BaskHomework_time > ul::before {
  position: absolute;
  content: "";
  display: inline-block;
  left: 0px;
  height: 100%;
  width: 1px;
  opacity: 0.4;
  background: -webkit-linear-gradient(#eaeaea, #c4a57f, #eaeaea);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#eaeaea, #c4a57f, #eaeaea);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#eaeaea, #c4a57f, #eaeaea);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(#eaeaea, #c4a57f, #eaeaea);
  /* 标准的语法（必须放在最后） */
}
.BaskHomework-Model .BaskHomework_time > ul > li {
  line-height: 20px;
  margin-left: 17px;
  padding-bottom: 28px;
  font-size: 12px;
  color: #000;
}
.BaskHomework-Model .BaskHomework_time > ul > li::before {
  position: relative;
  content: "";
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top-color: #c4a57f;
  opacity: 0.5;
  left: -22px;
  top: 9px;
}
</style>
