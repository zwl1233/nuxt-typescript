<template>
<!-- 弃用 -->
  <article
    class="checkpoint_body learning_body learning_island app-game-three"
    style="height:750px"
  >
    <div class="w1140 m-auto checkpoint_content">
      <div class="checkpoint_title">
        <h3 class="fz24 c30 dis_in_block">{{courseName}}</h3>
        <span class="fz18 c077 ml-20" v-if="isCollection">已收藏</span>
      </div>
      <div class="pos_r">
        <gametab/>
        <div class="learning_Imgbg">
          <div class="pos_r">
            <!--人-游泳-->
            <div class="pos_a learning_swimming">
              <img :src="require('@/assets/img/learning_swimming.png')" alt>
            </div>
            <!--人-通关回顾-->
            <div
              class="pos_a learning_checkPointReview"
              style="cursor:pointer"
              @click="changeBaskHomework(true)"
            >
              <p class="fz16 cb49">通关回顾</p>
              <img :src="require('@/assets/img/checkPoint_review.png')" alt>
            </div>

            <ul class="learning_headList">
              <!--head1-->
              <li
                class="active"
                v-for="(item,index) in userClassHourResponseVos"
                :key="item.classhourId"
              >
                <p
                  class="fz12 text-center cb49"
                  v-if="item.classhourNeedCountDown"
                >{{item.classhourReason}}{{countDown(item.classhourCountDownTime,index)}}</p>
                <p
                  class="fz12 text-center cb49"
                  v-if="!item.classhourNeedCountDown"
                >{{item.classhourReason}}</p>
                <span
                  v-if="item.userHomeworkAssignCompletionResponseVos&&item.userHomeworkAssignCompletionResponseVos.length>0"
                >
                  <img
                    alt
                    v-for="ite in item.userHomeworkAssignCompletionResponseVos"
                    :key="ite.homeworkAssignId"
                    :src="ite.hasCompleted?require('@/assets/img/checkPoint_praise2.png'):require('@/assets/img/checkPoint_praise1.png')"
                  >
                </span>
                <img
                  :src="require('@/assets/img/checkPoint_head1.png')"
                  alt
                  @click="doing(item.classhourId,item.courseType)"
                >
                <!-- <img :src="item.copyBookUri" alt="" @click="doing(item.classhourId)"> -->
                <p class="fz12 c30">第{{index+1}}节课</p>
                <div class="model-hover">
                  <p class="fz12 c30" style="margin-bottom:12px">
                    <span style="rgba(172, 172, 172, 0.09)">第{{index+1}}节</span>
                    <time class="fr" style="rgba(172, 172, 172, 0.09)">{{item.classhourCountDownTime}}</time>
                  </p>
                  <h4 class="fz14 ellipsis" :title="item.classhourName" style="margin-bottom:13px">《{{item.classhourName}}》</h4>
                  <p class="fz12">
                    <!-- <label
                      for=""
                      class="c30"
                    >颜真卿：</label>
                    <span class="c30">天真雄浑</span>-->
                    <span
                      class="classIndruc"
                      :title="item.classhourIntroduction"
                      style="margin-bottom:5px;color:rgba(172, 172, 172)"
                    >{{item.classhourIntroduction}}</span>
                    <span class="c9 fr">完成度
                      <span
                        class="cb49"
                      >{{initComplete(item.userHomeworkAssignCompletionResponseVos)}}</span>
                    </span>
                  </p>
                  <!-- <p class="fz12" v-if="item.classhourNeedCountDown">回放倒计时{{countDownTime("",index)}}</p> -->
                  <p class="fz12" v-if="item.classhourNeedCountDown" style="color:rgba(172, 172, 172)">回放倒计时<ClassCountDown :time="item.startTime"/></p>
                </div>
              </li>
              <!--head2-->
              <!-- <li>
                                        <p class="cff3b fz12 text-center">
                                            <span>回放倒计时</span>
                                            <time>13:00:30</time>
                                        </p>
                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head2.png')" alt="">

                                        <p class="fz12 c30">写字作业</p>

              </li>-->
              <!--head3-->
              <!-- <li class="active">
                                        <p class="fz12 text-center cb49">正在直播</p>
                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head3.png')" alt="">
                                        <p class="fz12 c30">写字作业</p>

                                        <div class="model-hover">
                                            <p class="fz12 c30">
                                                <span>第二节</span>
                                                <time class="fr">2018.09.12</time>
                                            </p>
                                            <h4 class="fz14">《颜勤礼碑》练习1</h4>
                                            <p class="fz12">
                                                <label for="" class="c30">颜真卿：</label>
                                                <span class="c30">天真雄浑</span>
                                                <span class="c9 fr">完成度<span class="cb49">90%</span></span>
                                            </p>
                                            <p class="fz12">回放倒计时13:00:30</p>
                                        </div>
              </li>-->
            </ul>
          </div>
        </div>
      </div>
      <div style="margin:-100px auto;position:relative">
        <gamebottom :courseId="courseId" :courseName="courseName"/>
      </div>
    </div>
    <Studydetail v-if="details" :classhoursId="classhoursId" :courseType="courseType"/>
    <BaskHomeworkdetail v-if="BaskHomework"/>
  </article>
</template>

<script>
import gametab from "@/components/gamedetail/gametab"; //gametab左上按钮
import gamebottom from "@/components/gamedetail/gamebottom"; //gamebottom中间按钮
import Studydetail from "@/components/gamedetail/Studydetail"; //学习详情
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import BaskHomeworkdetail from "@/components/gamedetail/BaskHomeworkdetail"; //通关回顾
import { formData, computingTime } from "@/plugins/utils";
import ClassCountDown from "@/components/gamedetail/ClassCountDown"
import moment from "moment";
export default {
  async asyncData(api) {
    if (api.query.courseId) {
      let courseId=api.query.courseId
      api.store.commit("games/changeCourseId",courseId);
    }
    //默认关闭课时详情弹出框
    api.store.commit("games/changeDetails", false);

    let courseId = api.store.state.games.courseinfo.courseId;
    //课时列表
    let res = await api.$axios.post("/userclasshour/list", {
      token: "",
      courseId
    });
    //课程详情
   let info=await api.$axios.post("/usercourse/detail", { token: "", id: courseId })
   if(info.code==0){
     api.store.commit("games/getCourseDetail", info.result);
     info=info.result
   }
    // courseId 课程id courseName 课程名 courseTemplateClasshourCount课时数量 courseTemplateId 课程模板id courseTemplatePicUri 模板图片 hasSignUp是否报名
    let userClassHourResponseVos = res.result.userClassHourResponseVos;
    let total = res.result.total;
    return {
      total,
      userClassHourResponseVos,
      info,
      courseId
    };
  },
  data() {
    return {
      msg: "",
      img1: require("@/assets/img/learning_island.png"),
      img2: require("@/assets/img/learning_tree.png"),
      classhoursId: "",
      timerAry: [], //定时器
      timeAry: [],
      positAry: [
        { x: 50, y: 375 },
        { x: 300, y: 300 },
        { x: 630, y: 450 },
        { x: 780, y: 235 }
      ], //定位数组
      courseType: "" //课程类型 直播 1   录播 2
    };
  },
  created() {
    this.userClassHourResponseVos.forEach((item, index) => {
      if (item.classhourNeedCountDown) {
        //需要倒计时
        this.countDown(item.classhourCountDownTime, index);
      }
    });
  },
  computed: {
    ...mapState({
      details: state => state.games.courseinfo.details,
      BaskHomework: state => state.games.courseinfo.BaskHomework, //通关回顾
      courseName: state => state.games.courseinfo.courseName,
      isCollection: state => state.games.courseinfo.isCollection //是否收藏
    })
  },
  components: {
    gametab, //gametab左上按钮
    gamebottom, //gamebottom中间按钮
    Studydetail,
    BaskHomeworkdetail, //通关回顾
    ClassCountDown,//倒计时组件
  },
  methods: {
    computingTime,
    //计算倒计时
    countDown(time, index) {
      //大于一天  年月日   2019-12-01
      //小于一天  时分秒   12:55:11
      if (/-/g.test(time)) {
        //时间
        return time;
      } else {
        //时间
        return this.countDownTime(time, index);
      }
    },
    //计算完成度
    initComplete(ary) {
      if (!ary) return "0%";
      let n = 0;
      ary.forEach(item => {
        if (item.hasCompleted) {
          n++;
        }
      });
      return (n / ary.length) * 100 + "%";
    },
    doing(id, courseType) {
      //courseType  1  z直播  2 录播
      //学习详情显示
      this.changeDetails(true);
      this.classhoursId = id;
      this.courseType = courseType;
    },
    formData,
    ...mapMutations({
      changeDetails: "games/changeDetails", //学习详情
      changeCourseId: "games/changeCourseId", //学习详情
      changeBaskHomework: "games/changeBaskHomework" //通关回顾
    }),
    //倒计时计算工具
    countDownTime(time, index) {
      // console.log(index);
      time = "20:00:00";
      let ary = time.split(":");
      let data = moment().set({
        h: Number(ary[0]),
        m: Number(ary[1]),
        s: Number(ary[2])
      });
      this.timerAry[index] = null; //对应的定时器
      this.timeAry[index] = this.computingTime(data, true); //对应的倒计时时间
      this.timerAry[index] = setInterval(() => {
        if (
          moment().format("YY-MM-DD HH:mm:ss") ==
          data.format("YY-MM-DD HH:mm:ss")
        ) {
          clearInterval(this.timerAry[index]);
          return;
        }
        // console.log("定时器")
        this.timeAry[index] = this.computingTime(data, true);
        this.timeAry = [...this.timeAry];
        // console.log(this.timeAry)
      }, 1000);
      // return this.timeAry[index]

      // console.log(ary[0])
      //将取到的时间 进行完整解析成 YY-MM-DD HH:mm:ss
      // let data=moment().set({h:Number(ary[0]),m:Number(ary[1]),s:Number(ary[2])})
      // console.log(data)//目标时间
      // console.log(this.computingTime(data,true))//倒计时时间
      //  this.timer=setInterval(()=>{
      //   if(moment().format("YY-MM-DD HH:mm:ss")==data.format("YY-MM-DD HH:mm:ss")){
      //     clearInterval(this.timer)
      //     return
      //   }
      //   this.timeAry[index]=this.computingTime(data,true)
      //   console.log("定时器",this.timeAry)
      //   this.timeAry=this.timeAry.map((item,ind)=>{
      //     if(ind==index){
      //       item=this.computingTime(data,true)
      //     }
      //     console.log(111111,item)
      //     return item
      //   })
      // },10000)
      // return this.timeAry[index]
    }
  },
  beforeDestroy() {
    console.log("销毁");
    this.timerAry.forEach(item => {
      clearInterval(item);
    });
    this.timerAry = [...this.timerAry];
  }
};
</script>

<style lang="less" scoped>
.app-game-three {
  .classIndruc {
    width: 60%;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.checkpoint_body {
  background: #f8f3ee;
  width: 100%;
  height: 100%;
  display: flex;
}
.checkpoint_body .checkpoint_content .checkpoint_title {
  padding-top: 57px;
  margin-bottom: 36px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn {
  z-index: 2;
  left: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  > input {
  display: block;
  margin-bottom: 22px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  > input:hover {
  cursor: pointer;
  background: #159094;
}
.pos_r .checkpoint_leftBtn + #show {
  position: absolute;
  margin-left: 108px;
  z-index: 3;
  width: auto;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
  border-radius: 3px;
  padding: 31px 39px 31px 30px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: #fff;
  left: -16px;
  top: 10px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul {
  max-height: 241px;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: -35px;
  padding-right: 45px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li {
  clear: both;
  float: left;
  padding-bottom: 18px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 18px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li:last-child {
  margin-bottom: 0px;
  border-bottom: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:nth-child(1) {
  width: 95px;
  height: 55px;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 11px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:nth-child(1)
  > img {
  width: 100%;
  height: 100%;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:last-child
  > time
  > span:last-child {
  margin-left: 20px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:last-child
  > time
  > span:last-child:hover {
  color: #c4a57f;
  cursor: pointer;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg {
  background: url(/img/checkpoint_Imgbg.png) no-repeat top center;
  width: 100%;
  height: 702px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_review {
  top: 280px;
  left: 54px;
  text-align: center;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList {
  height: 582px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li {
  width: 94px;
  position: absolute;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li::before {
  width: 23px;
  height: 23px;
  background: #b49b76;
  color: #fff;
  display: inline-block;
  border-radius: 55px;
  text-align: center;
  line-height: 23px;
  font-size: 14px;
  position: absolute;
  z-index: 1;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li::after {
  position: absolute;
  display: none;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)::after {
  display: block;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li.active::before {
  background: #207175;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1) {
  top: 155px;
  left: 120px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::after {
  content: url(~assets/img/001-2@2x.png);
  top: -144px;
  left: 79px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::before {
  content: "1";
  right: -23px;
  top: -25px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2) {
  top: 104px;
  left: 390px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::after {
  content: url(~assets/img/002-3@2x.png);
  left: 50px;
  top: -97px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::before {
  content: "2";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3) {
  top: 30px;
  left: 563px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::after {
  content: url(~assets/img/003-4@2x.png);
  right: -196px;
  top: -24px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::before {
  content: "3";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4) {
  top: 4px;
  left: 872px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)::after {
  content: url(~assets/img/004-5@2x.png);
  right: -49px;
  top: 37px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)
  > span {
  position: absolute;
  right: -3px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)
  > p {
  margin-left: 0px;
}
.learning_body {
  height: -webkit-fill-available;
  height: -o-fill-available;
  height: -moz-fill-available;
  background: #f8f5f3 url(~assets/img/learning_peak.png) no-repeat center 197px;
  width: 100%;
}
.learning_body .checkpoint_content .checkpoint_btn > input {
  margin-bottom: 50px;
}
.learning_body .learning_Imgbg {
  background: url(~assets/img/learning_tree.png) no-repeat 79px 48px;
}
.learning_body .learning_Imgbg .learning_sun {
  left: 277px;
  top: 10px;
}
.learning_body .learning_Imgbg .learning_people {
  top: 118px;
  left: 306px;
}
.learning_body .learning_Imgbg .learning_cloud {
  right: 53px;
  top: -63px;
}
.learning_body .learning_Imgbg .learning_moon {
  right: 280px;
  top: 118px;
}
.learning_body .learning_Imgbg .learning_checkPointReview {
  right: 40px;
  top: 130px;
  text-align: center;
}
.learning_body .learning_Imgbg .learning_checkPointReview > p {
  margin-bottom: 10px;
}
.learning_body .learning_Imgbg .learning_ships {
  left: 401px;
  bottom: 164px;
}
.learning_body .learning_Imgbg .learning_duck {
  right: 94px;
  bottom: 36px;
}
.learning_body .learning_Imgbg .learning_headList {
  width: 1140px;
  height: 615px;
  margin: 0 auto;
  background: url(~assets/img/learning_island.png) center top no-repeat;
}
.learning_body .learning_Imgbg .learning_headList li {
  width: 95px;
  position: absolute;
}
.learning_body .learning_Imgbg .learning_headList li::before {
  width: 23px;
  height: 23px;
  background: #b49b76;
  color: #fff;
  display: inline-block;
  border-radius: 55px;
  text-align: center;
  line-height: 23px;
  font-size: 14px;
  position: absolute;
  z-index: 1;
}
.learning_body .learning_Imgbg .learning_headList li.active::before {
  background: #207175;
}
.learning_body .learning_Imgbg .learning_headList li.active > p.cb49 {
  color: #207175;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(1) {
  top: 296px;
  left: -10px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(1)::after {
  top: -144px;
  left: 79px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(1)::before {
  content: "1";
  left: 26px;
  top: -38px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(2) {
  top: 260px;
  left: 144px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(2)::after {
  left: 50px;
  top: -97px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(2)::before {
  content: "2";
  left: 26px;
  top: -41px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(3) {
  top: 217px;
  left: 315px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(3)::after {
  right: -196px;
  top: -24px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(3)::before {
  content: "3";
  left: 26px;
  top: -33px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(4) {
  top: 125px;
  left: 558px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(4)::after {
  left: 26px;
  top: 37px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(4)::before {
  content: "4";
  left: 26px;
  top: 120px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(5) {
  top: 206px;
  right: 200px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(5)::after {
  right: -5px;
  bottom: -192px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(5)::before {
  content: "5";
  left: 26px;
  top: -36px;
}
.learning_body .learning_Imgbg .learning_headList li > p.cb49 {
  width: 72px;
  text-align: center;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(1) > p.cb49 {
  margin-bottom: 14px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(2) > p.cb49 {
  margin-bottom: 17px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(3) > p.cb49 {
  margin-bottom: 12px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(4) > p.cb49 {
  margin-bottom: 15px;
}
.learning_body .learning_Imgbg .learning_headList li:nth-child(5) > p.cb49 {
  margin-bottom: 18px;
}
.learning_body .learning_Imgbg .learning_headList li > span {
  width: 15px;
  display: inline-block;
  vertical-align: top;
  position: absolute;
  right: -3px;
}
.learning_body .learning_Imgbg .learning_headList li > span > img {
  margin-bottom: 5px;
}
.learning_body .learning_Imgbg .learning_headList li > span > img:last-child {
  margin-bottom: 0px;
}
.learning_body .learning_Imgbg .learning_headList li > span + img {
  width: 75px;
  height: 75px;
}
.learning_body .learning_Imgbg .learning_headList li > img + p {
  width: 72px;
  margin-top: 4px;
}
.learning_body .learning_Imgbg .learning_headList li:hover {
  cursor: pointer;
}
.learning_body .learning_Imgbg .learning_headList li:hover .model-hover {
  display: block;
  cursor: pointer;
}
.learning_body .learning_Imgbg .learning_headList li .model-hover {
  display: none;
  width: calc(226px);
  // height: calc(115px);
  min-height: calc(85px);
  background: #ffffff;
  box-shadow: 0px 6px 32px 0px rgba(172, 172, 172, 0.09);
  border-radius: 6px;
  padding: 10px 15px;
  position: absolute;
  right: -236px;
  top: -4em;
  z-index: 2;
}
.learning_body .learning_Imgbg .learning_headList li .model-hover::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #fff;
  left: -16px;
  top: 30px;
}
.learning_body .learning_Imgbg .learning_headList li .model-hover > h4.fz14 {
  margin-top: 4px;
  margin-bottom: 5px;
}
.learning_body
  .learning_Imgbg
  .learning_headList
  li
  .model-hover
  > p:last-child {
  margin-top: 5px;
}
.learning_island {
  background: #f8f5f3;
  // background: #f8f5f3 url(~assets/img/learning_island.png) center 70px no-repeat;
}
.learning_island .learning_Imgbg {
  background: url() no-repeat;
}
.learning_island .learning_Imgbg .learning_swimming {
  right: 270px;
  top: 205px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(1) {
  top: 88px;
  left: 332px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(1)::before {
  top: 120px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(2) {
  top: 256px;
  left: 622px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(2)::before {
  top: 145px;
}
.learning_island
  .learning_Imgbg
  .learning_headList
  li:nth-child(2)
  > p.fz12.c30 {
  margin-top: 77px;
}
.learning_island
  .learning_Imgbg
  .learning_headList
  li:nth-child(2)
  > p.fz12.c30 {
  margin-top: 66px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(3) {
  top: 54px;
  left: 790px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(3)::before {
  top: 129px;
}
.learning_island
  .learning_Imgbg
  .learning_headList
  li:nth-child(3)
  > p.fz12.c30 {
  margin-top: 52px;
}
.learning_island
  .learning_Imgbg
  .learning_headList
  li:nth-child(3)
  > p.text-center.cb49 {
  margin-bottom: 5px;
}
.learning_island .learning_Imgbg .learning_headList li > p.text-center.c9,
.learning_island .learning_Imgbg .learning_headList li > p.text-center.cff3b {
  width: 75px;
  margin-right: 11px;
  margin-bottom: 6px;
}
.learning_island .learning_Imgbg .learning_headList li > p.fz12.c30 {
  text-align: center;
  margin-top: 58px;
}
.learning_island .learning_Imgbg .learning_headList li > .model-hover {
  top: 7em;
}
</style>
