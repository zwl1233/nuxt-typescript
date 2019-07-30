<template>
<!-- 弃用 -->
  <div class="app-game-five">
    <article class="checkpoint_body learning_body w1140" style="width:1140px;margin:0 auto;height:auto">
      <div class="w1140 m-auto checkpoint_content" style="min-height:600px">
        <div class="checkpoint_title">
          <h3 class="fz24 c30 dis_in_block">{{courseName}}</h3>
          <span class="fz18 c077 ml-20" v-if="isCollection">已收藏</span>
        </div>
        <div class="pos_r">
          <gametab/>
          <div class="learning_Imgbg w1140">
            <div class="pos_r">
              <!-- 通关回顾 -->
              <!--太阳-->
              <div class="pos_a learning_sun">
                <img :src="require('@/assets/img/learning_sun.png')" alt>
              </div>
              <!--人-少年-->
              <div class="pos_a learning_people">
                <img :src="require('@/assets/img/learning_people.png')" alt>
              </div>
              <!--云朵-->
              <div class="pos_a learning_cloud">
                <img :src="require('@/assets/img/learning_cloud.png')" alt>
              </div>
              <!--月亮-->
              <div class="pos_a learning_moon">
                <img :src="require('@/assets/img/learning_moon.png')" alt>
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
                <li v-for="(item,index) in userClassHourResponseVos" :key="item.classhourId">
                  <p class="fz12 cb49">{{item.classhourName}}</p>
                  <span
                    v-if="item.userHomeworkAssignCompletionResponseVos&&item.userHomeworkAssignCompletionResponseVos.length>0"
                  >
                    <img
                      :src="ite.hasCompleted?require('@/assets/img/checkPoint_praise2.png'):require('@/assets/img/checkPoint_praise1.png')"
                      alt
                      v-for="ite in item.userHomeworkAssignCompletionResponseVos"
                      :key="ite.homeworkAssignId"
                    >
                  </span>
                  <img
                    :src="require('@/assets/img/checkPoint_head1.png')"
                    alt
                    @click="doing(item.classhourId,item.courseType)"
                  >
                  <!-- <img :src="item.copyBookUri" alt=""> -->
                  <p class="fz12 text-center c9">{{item.classhourReason}}</p>
                  <div class="model-hover">
                    <p class="fz12 c30" style="color:rgba(172, 172, 172);margin-bottom:12px">
                      <span>第{{index+1}}节</span>
                      <time class="fr">{{item.classhourCountDownTime}}</time>
                    </p>
                    <h4 class="fz14" :title="item.classhourName" style="margin-bottom:12px">《{{item.classhourName}}》</h4>
                    <p class="fz12">
                      <span
                        class="classIndruc"
                        :title="item.classhourIntroduction"
                        style="color:rgba(172, 172, 172);margin-bottom:12px"
                      >{{item.classhourIntroduction}}</span>
                      <!-- <label
                      for=""
                      class="c30"
                    >颜真卿：</label>
                      <span class="c30">天真雄浑</span>-->
                      <span class="c9 fr">
                        完成度
                        <span
                          class="cb49"
                        >{{initComplete(item.userHomeworkAssignCompletionResponseVos)}}</span>
                      </span>
                    </p>
                    <p class="fz12" v-if="item.classhourCountDownTime">回放倒计时{{timeAry[index]}}</p>
                  </div>
                </li>
                <!--head2-->
                <!-- <li>
                                        <p class="fz12 cb49">写字作业</p>
                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head2.png')" alt="">
                                        <p class="cff3b fz12 text-center">
                                            <span>回放倒计时</span>
                                            <time>13:00:30</time>
                                        </p>
                </li>-->
                <!--head3-->
                <!-- <li class="active">
                                        <p class="fz12 cb49">写字作业</p>
                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head3.png')" alt="">
                                        <p class="fz12 text-center c9">回放剩余七天</p>
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
                <!--head4-->
                <!-- <li>
                                        <p class="fz12 cb49">写字作业</p>

                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head4.png')" alt="">
                                        <p class="fz12 text-center c9">直播结束</p>
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
                <!--head5-->
                <!-- <li>
                                        <p class="fz12 cb49">写字作业</p>

                                        <span>
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt="">
                                            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt="">
                                        </span>
                                        <img :src="require('@/assets/img/checkPoint_head5.png')" alt="">
                                        <p class="fz12 text-center c077">正在直播</p>
                </li>-->
              </ul>

              <!--船-->
              <div class="pos_a learning_ships">
                <img :src="require('@/assets/img/learning_ships.png')" alt>
              </div>
              <!--鸭子-->
              <div class="pos_a learning_duck">
                <img :src="require('@/assets/img/learning_duck.png')" alt>
              </div>
            </div>
          </div>
        </div>
        <div style="margin:0 auto; position:relative">
          <gamebottom :courseId="courseId" :courseName="courseName"/>
        </div>
      </div>
      <BaskHomeworkdetail v-if="BaskHomework"/>
      <Studydetail v-if="details" :classhoursId="classhoursId" :courseType="courseType"/>
    </article>
  </div>
</template>

<script>
import gametab from "@/components/gamedetail/gametab"; //gametab左上按钮
import gamebottom from "@/components/gamedetail/gamebottom"; //gamebottom中间按钮
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Studydetail from "@/components/gamedetail/Studydetail"; //学习详情
import BaskHomeworkdetail from "@/components/gamedetail/BaskHomeworkdetail"; //通关回顾
import { formData, computingTime } from "@/plugins/utils";
import moment from "moment"
export default {
  async asyncData(api) {
    if(api.query.courseId){
      api.store.commit("games/changeCourseId",api.query.courseId)
    }
    api.store.commit("games/changeDetails", false);
    console.log(api.store.state.games.courseinfo.courseId); //课程id
    let courseId = api.store.state.games.courseinfo.courseId;
    let res = await api.$axios.post("/userclasshour/list", {
      token: "",
      courseId
    });
    let info = await api.$axios.post("/usercourse/detail", {
      token: "",
      id: courseId
    });
    info = info.result;
    let total = res.result.total;
    let userClassHourResponseVos = res.result.userClassHourResponseVos;
    return {
      total,
      userClassHourResponseVos,
      info,
      courseId
    };
  },
  data() {
    return {
      img1: require("@/assets/img/learning_peak.png"),
      img2: require("@/assets/img/learning_tree.png"),
      classhoursId: "",
      courseType: "", //课程类型 直播 1   录播 2
      timerAry: [], //定时器
      timeAry: [],
      positAry: [
        { x: 20, y: 200 },
        { x: 330, y: 130 },
        { x: 550, y: 30 },
        { x: 120, y: 860 }
      ] //定位数组
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
  methods: {
    formData,
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

    doing(id,courseType) {
      //学习详情显示
      this.changeDetails(true);
      this.classhoursId = id;
      this.courseType = courseType;
    },
    ...mapMutations({
      changeDetails: "games/changeDetails", //学习详情
      changeCourseId: "games/changeCourseId", //学习详情
      changeBaskHomework: "games/changeBaskHomework" //通关回顾
    }),
    //倒计时计算工具
    countDownTime(time, index) {
      console.log(index);
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
  components: {
    gametab, //gametab左上按钮
    gamebottom, //gamebottom中间按钮
    Studydetail, //学习详情
    BaskHomeworkdetail //通关回顾
  },
  computed: {
    ...mapState({
      details: state => state.games.courseinfo.details,
      BaskHomework: state => state.games.courseinfo.BaskHomework, //通关回顾
      courseName: state => state.games.courseinfo.courseName,
      isCollection: state => state.games.courseinfo.isCollection //是否收藏
    })
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
.app-game-five {
  background: #f8f5f3;
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
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show {
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
  top: 95px;
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
  height: 582px;
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
  top: -35px;
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
  // height: calc(85px);
  min-height: calc(85px);
  background: #ffffff;
  box-shadow: 0px 6px 32px 0px rgba(172, 172, 172, 0.09);
  border-radius: 6px;
  padding: 10px 15px;
  position: absolute;
  right: -236px;
  top: 2em;
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
  background: #f8f5f3 url(/img/learning_island.png) center 70px no-repeat;
}
.learning_island .learning_Imgbg {
  background: url() no-repeat;
}
.learning_island .learning_Imgbg .learning_swimming {
  right: 270px;
  top: 205px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(1) {
  top: 22px;
  left: 332px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(1)::before {
  top: 120px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(2) {
  top: 167px;
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
  margin-top: 66px;
}
.learning_island .learning_Imgbg .learning_headList li:nth-child(3) {
  top: -8px;
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
