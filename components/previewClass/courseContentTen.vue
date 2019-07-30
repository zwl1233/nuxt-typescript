<template>
  <div class="checkpoint_Imgbg mt-90 app-change-checkpoint_Imgbg-ten">
    <div class="pos_r">
      <!-- 通关回顾 -->
      <div
        class="pos_a checkPoint_review"
        @click="changeReview(true)"
        style="cursor:pointer;left:200px"
      >
        <span class="dis_block cb49 fz16 mb-10">学习回顾</span>
        <img :src="require('@/assets/img/checkPoint_review.png')" alt>
      </div>
      <!-- 开课前 -->
      <div class="pos_a learning_Before-course" v-if="false">
        <img :src="require('@/assets/img/checkPoint_head1.png')" alt>
        <!-- <p class="fz14 c077">开课前</p> -->
      </div>
      <!-- end 开课前 -->
      <ul class="checkPoint_headList" v-if="false">
        <!--head1-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head1.png')" alt>
          <p class="fz12 text-center c9">回放已过期</p>
          <!-- <p class="cff3b fz12 text-center">
                                                                    <span>回放倒计时</span>
                                                                    <time>13:00:30</time>
                                                            </p>
          -->
        </li>
        <!--head2-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head2.png')" alt>
          <!-- <p class="fz12 text-center c9">回放已过期</p> -->
          <p class="cff3b fz12 text-center">
            <span>回放倒计时</span>
            <time>13:00:30</time>
          </p>

          <div class="model-hover">
            <p class="fz12 c30">
              <span>第二节</span>
              <time class="fr">2018.09.12</time>
            </p>
            <h4 class="fz14">《颜勤礼碑》练习1</h4>
            <p class="fz12">
              <label for class="c30">颜真卿：</label>
              <span class="c30">天真雄浑</span>
              <span class="c9 fr">
                完成度
                <span class="cb49">90%</span>
              </span>
            </p>
            <p class="fz12">回放倒计时13:00:30</p>
          </div>
        </li>
        <!--head3-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head3.png')" alt>
          <p class="fz12 text-center c9">回放剩余七天</p>
        </li>
        <!--head4-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head4.png')" alt>
          <p class="fz12 text-center c9">直播结束</p>
        </li>
        <!--head5-->
        <li class="active">
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head5.png')" alt>
          <p class="fz12 text-center c077">正在直播</p>
        </li>
        <!--head6-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head6.png')" alt>
          <!-- <p class="fz12 text-center c9">回放已过期</p> -->
          <p class="c3 fz12 text-center">
            <span>直播倒计时</span>
            <time>13:01:55</time>
          </p>
        </li>
        <!--head7-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head7.png')" alt>
          <p class="fz12 text-center c9">
            <time>2018.10.23</time>
          </p>
        </li>
        <!--head8-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head8.png')" alt>
          <p class="fz12 text-center c9">
            <time>2018.10.29</time>
          </p>
        </li>
        <!--head9-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head9.png')" alt>
          <!-- <p class="fz12 text-center c9">
                                                                    <time>2018.10.29</time>
          </p>-->
        </li>
        <!--head10-->
        <li>
          <span>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
            <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
          </span>
          <img :src="require('@/assets/img/checkPoint_head10.png')" alt>
          <!-- <p class="fz12 text-center c9">
                                                                    <time>2018.10.29</time>
          </p>-->
        </li>
      </ul>

      <ul class="checkPoint_headList app-change-game-ten-list">
        <li
          v-for="(item,index) in list"
          :class="{active:index==curIndex,hasStudy:curIndex-1>=index,bottom:item.kind=='bottom',top:item.kind=='top','app-img-galy':!judgeClassHour(item)}"
          :key="item.classhourId"
          :style="{top:positAry[index].y+'px',left:positAry[index].x+'px',}"
        >
          <span
            v-if="item.userHomeworkAssignCompletionResponseVos&&item.userHomeworkAssignCompletionResponseVos.length>0"
          >
            <div
              class="app-change-game-ten-start"
              v-for="(ite,ind) in item.userHomeworkAssignCompletionResponseVos"
              :key="ite.homeworkAssignId"
            >
              <img
                :src="item.videoIsPlay=='1'?require('@/assets/img/checkPoint_praise2.png'):require('@/assets/img/checkPoint_praise1.png')"
                alt
                v-if="ind==0"
                @click="jumpVideo(item)"
              >
              <img
                :src="ite.hasCompleted?require('@/assets/img/checkPoint_praise2.png'):require('@/assets/img/checkPoint_praise1.png')"
                alt
                v-else
                @click="JumpWork(ite.homeworkAssignId,item.classhourId,courseId,item.publishStatus)"
              >
              <span
                class="app-change-game-ten-start-hover"
                v-if="ind==0"
              >{{item.courseType==1?(item.classhourType=='2'?'观看回放':'观看直播'):'观看视频'}}</span>
              <span class="app-change-game-ten-start-hover" v-else>{{ite.homeworkTypeText}}</span>
            </div>
          </span>
          <!-- 倒计时系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="(index==11||index==8)&&item.isStar&&item.classhourNeedCountDown"
          >
            <span>
              {{item.classhourReason}}
              <ClassCountDown
                :time="item.classhourCountDownTime"
                :changeLiving="changeLiving.bind(this,index)"
              />
            </span>
          </p>
          <!-- 时间系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="(index==11||index==8)&&!(item.classhourNeedCountDown&&item.isStar)&&item.classhourCountDownTime"
          >{{item.classhourCountDownTime}}</p>
          <!-- 文本系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="(index==11||index==8)&&item.classhourNeedCountDown==false&&item.isStar==false&&item.classhourReason"
          >
            <span
              v-if="index==11&&item.classhourReason=='正在直播'"
              style="cursor:pointer"
              class="bold les1"
              @click="jumpVideo(item)"
            >正在直播</span>
            <span v-else>{{item.classhourReason}}</span>
          </p>

          <div
            @mouseover="item.hoverFlag=true"
            @mouseout="item.hoverFlag=false"
            class="app-change-gane-ten-hover-modal app-change-game-galyImg"
          >
            <img
              class="app-img-copyBook"
              :src="item.copyBookUri"
              alt
              @click="doing(item.classhourId,item.courseType,item,item.publishStatus,index)"
            >
            <div class="model-hover" style="min-height:85px;height:auto" v-show="item.hoverFlag">
              <!-- <p class="fz12 c30" style="margin-bottom:12px"> -->
              <!-- <span style="rgba(172, 172, 172, 0.09)">第{{index+1}}节</span> -->
              <!-- 直播系列 -->
              <!-- <time class="fr" style="rgba(172, 172, 172, 0.09)" v-if="item.classhourType==1">
              {{formData(item.startTime,'utc','add',false)}}-->
              <!-- {{conversionTime(item.classhourCountDownTime)}} -->
              <!-- <span v-if="item.isStar&&item.classhourNeedCountDown"> -->
              <!-- 倒计时 -->
              <!-- <ClassCountDown
                      :time="item.classhourCountDownTime"
                      :changeLiving="changeLiving.bind(this,index)"
              ></ClassCountDown>-->
              <!-- </span> -->
              <!-- <span v-else>{{conversionTime(item.classhourCountDownTime)}}</span> -->
              <!-- </time> -->
              <!-- </p> -->
              <h4
                class="fz14"
                :title="item.classhourName"
                style="margin-bottom:6px"
              >{{item.classhourName}}</h4>
              <p class="fz12" v-if="item.classhourIntroduction&&item.classhourIntroduction.length>0">
                <span
                  class="classIndruc"
                  :title="item.classhourIntroduction"
                  style="margin-bottom:0px;color:rgba(172, 172, 172);display:inline-block;width:100%;white-space:nowrap"
                >
                  {{item.classhourIntroduction}}
                </span>
              </p>
              <p class="app-z-p" v-if="item.classhourType==1">
                <time
                  class="fr"
                  style="rgba(172, 172, 172, 0.09)"
                  v-if="item.classhourType==1"
                >{{formData(item.startTime,'utc','add',false)}}</time>
              </p>

              <!-- 回放系列 -->
              <!-- <p
                class="fz12 text-left cb49"
                v-if="item.isStar&&item.classhourNeedCountDown&&item.classhourType=='2'"
              >
                {{item.classhourReason}}
                <ClassCountDown :time="item.classhourCountDownTime"/>
              </p>
              <p
                class="fz12 text-left cb49"
                v-if="!(item.classhourNeedCountDown&&item.isStar)&&item.classhourType=='2'"
              >{{item.classhourCountDownTime}}</p>
              <p
                class="fz12 text-left cb49"
                v-if="item.classhourNeedCountDown==false&&item.isStar==false&&item.classhourType=='2'"
              >{{item.classhourReason}}</p>-->
            </div>
          </div>
          <!-- 倒计时系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="index!=8&&index!=11&&item.isStar&&item.classhourNeedCountDown"
          >
            <span>
              {{item.classhourReason}}
              <ClassCountDown
                :time="item.classhourCountDownTime"
                :changeLiving="changeLiving.bind(this,index)"
              />
            </span>
          </p>
          <!-- 时间系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="index!=8&&index!=11&&!(item.classhourNeedCountDown&&item.isStar)&&item.classhourCountDownTime"
          >{{item.classhourCountDownTime}}</p>
          <!-- 文字系列 -->
          <p
            class="fz12 text-center cb49 text_white"
            v-if="index!=8&&index!=11&&item.classhourNeedCountDown==false&&item.isStar==false&&item.classhourReason"
          >
            <span
              v-if="item.classhourReason=='正在直播'"
              style="cursor:pointer"
              class="bold les1"
              @click="jumpVideo(item)"
            >正在直播</span>
            <span v-else>{{item.classhourReason}}</span>
          </p>
        </li>
      </ul>

      <!-- 结课后 -->
      <div class="pos_a learning_After-class" v-if="false">
        <span>
          <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
          <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
          <img :src="require('@/assets/img/checkPoint_praise2.png')" alt>
          <img :src="require('@/assets/img/checkPoint_praise1.png')" alt>
        </span>
        <img :src="require('@/assets/img/checkPoint_head1.png')" alt>
        <!-- <p class="fz14 c077">结课后</p> -->
      </div>
      <!-- end 结课后 -->

      <p class="app-change-game-ten-notice" v-if="isSignUp">您可以在{{studentTime}}之前提交作业和将作业发布到“晒作业”与大家分享</p>
    </div>
    <BaskHomeworkdetail v-if="reviewFlag"/>
    <Studydetail
      v-if="details"
      :classhoursId="classhoursId"
      :courseType="courseType"
      :getCourseList="getCourseList"
      :changeStatus="changeStatus"
    />

    <MessageBox
      v-if="boxVisible"
      :visible="boxVisible"
      :onCancel="closeMessageBox"
      isConfirm="true"
      :msg="msg"
      title="提示"
    />
    <VideoModal v-if="visible" :classhoursId="classhoursId" :getList="getCourseList"></VideoModal>
    <PerfectInformation @changedoing="changedoing" ref="PerfectInformationflag"/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import PerfectInformation from "@/components/PerfectInformation"; //完善个人信息
import { formData, computingTime } from "@/plugins/utils";
import ClassCountDown from "@/components/gamedetail/ClassCountDown";
import moment from "moment";
import BaskHomeworkdetail from "@/components/gamedetail/BaskHomeworkdetail"; //通关回顾
import Studydetail from "@/components/previewClass/Studydetail"; //学习详情
import VideoModal from "@/components/videoModal";
import MessageBox from "@/components/messageBox"; //弹出框
export default {
  data() {
    return {
      list: [], //课时列表
      classhoursId: "",
      timerAry: [], //定时器
      timeAry: [],
      positAry: [
        //坐标位置
        { y: 155, x: 234 },
        { y: 102, x: 501 },
        { y: 30, x: 673 },
        { y: 4, x: 988 },
        { y: 175, x: 1150 },
        { y: 486, x: 1144 },
        { y: 493, x: 821 },
        { y: 474, x: 593 },
        { y: 419, x: 384 },
        { y: 595, x: 144 },
        { y: 243, x: 480 },
        { y: 360, x: 83 }
      ], //定位数组
      courseType: "", //课程类型 直播 1   录播 2
      currPos: [
        // 学习节点的位置
        { x: 0, y: 234 },
        { x: 150, y: 185 },
        { x: 320, y: 150 },
        { x: 545, y: 52 },
        { x: 860, y: 130 },
        { x: -100, y: 235 },
        { x: 961, y: 206 }
      ],
      curIndex: 3, //当前的学习节点
      boxVisible: false, //弹出框状态
      msg: "该课程已截止!",
      info: "", //当前课时详情的信息
      statusIndex: "" //用于改变状态(直播 录播)
    };
  },
  created() {
    this.getCourseList();
    if (!this.isSignUp) {
      //过期
      this.msg = "请您先报名!";
    }
  },
  computed: {
    ...mapState({
      courseId: state => state.singleOrder.courseId, //课程id
      reviewFlag: state => state.singleOrder.courseContent.reviewFlag, //通关回顾状态
      details: state => state.singleOrder.courseContent.details, //学习详情
      studentTime: state => state.singleOrder.studentTime, //学习有效期
      isSignUp: state => state.singleOrder.isSignUp, //是否报名
      visible: state => state.videoModal.visible, //video弹出框可见
      isBeOverdue: state => state.singleOrder.isBeOverdue, //是否过期
      token: state => state.system.token //token
    })
  },
  methods: {
    ...mapMutations({
      changeFlag: "singleOrder/courseContent/changeFlag", //改变通关回顾
      changeDetails: "singleOrder/courseContent/changeDetails", //学习详情
      changeVisible: "videoModal/changeVisible",
      changeUrl: "videoModal/changeUrl",
      changeTime: "videoModal/changeTime", //改变上次播放时间
      changeClassHourId: "videoModal/changeClassHourId",
      changeStundenTime: "singleOrder/changeStundentTime" //学习有效期
    }),
    //获取课时列表
    getCourseList() {
      this.$axios
        .post("/userclasshour/list", { token: "", courseId: this.courseId })
        .then(res => {
          if (res.code == 0) {
            //classhourType 1: 直播  2:回放  3:录播
            // publishStatus  发布状态: 1:发布  2:未发布
            // res.result.userClassHourResponseVos.map(item => {
            //   item.hoverFlag = false;
            //   item.isLiving = false; //是否正在直播
            //   return item;
            // });
            //判断直播课程是否过期
            if (res.result.learnEndTime) {
              //存在 即位直播课  计算出课程截止日期
              let time = res.result.learnEndTime;
              time = moment(time).format("YYYY年MM月DD日");
              this.changeStundenTime(time);
            }
            let ary = [...this.positAry];
            let ary1 = [...this.currPos];
            res.result.userClassHourResponseVos.map((item, index) => {
              item.hoverFlag = false;
              if (item.classhourReason == "正在直播") {
                item.isLiving = true; //是否正在直播
              } else {
                item.isLiving = false; //是否正在直播
              }
              //给userHomeworkAssignCompletionResponseVos放一个值   跳转直播录播
             item.userHomeworkAssignCompletionResponseVos.unshift(1)
              if (index == 10) {
                if (item.kind == "top") {
                  //头部课程  不作改变
                }
                if (item.kind == "bottom") {
                  this.positAry[10] = ary[11];
                  this.positAry[11] = ary[10];
                  this.currPos[10] = ary1[11];
                  this.currPos[11] = ary1[10];
                }
              }
              return item;
            });
            console.log(res.result.userClassHourResponseVos, "list");

            this.list = res.result.userClassHourResponseVos; //取前是个课程

            this.initCurIndex(res.result.userClassHourResponseVos);
          }
        });
    },
    computingTime,
    //计算倒计时
    // countDown(time, index) {
    //   //大于一天  年月日   2019-12-01
    //   //小于一天  时分秒   12:55:11
    //   if (/-/g.test(time)) {
    //     //时间
    //     return time;
    //   } else {
    //     //时间
    //     return this.countDownTime(time, index);
    //   }
    // },
    //计算完成度
    initComplete(ary) {
      if (!ary) return "0%";
      let n = 0;
      ary.forEach(item => {
        if (item.hasCompleted) {
          n++;
        }
      });
      return ((n / ary.length) * 100).toFixed(1) + "%";
    },
    doing(id, courseType, info, status, index) {
      // if (!this.isSignUp || this.isBeOverdue) {
      //   this.boxVisible = true;
      //   return;
      // }
      // if (status == 2) return;
      this.statusIndex = index;
      this.classhoursId = id;
      this.courseType = courseType;
      this.info = info;
      // this.$axios
      //   .post("/user/needcompleteuserinfo", { type: 1, token: "" })
      //   .then(res => {
      //     if (res.result) {
      //       this.$refs.PerfectInformationflag.flagchange();
      //     } else {
            this.changeDetails({ flag: true, info });
          // }
        // });
      //courseType  1  z直播  2 录播
      //学习详情显示
      // this.changeDetails(true);
    },
    changedoing(type) {
      if (type == "pay") {
        this.changeDetails({ flag: true, info: this.info });
      }
    },
    formData,

    //计算当前的学习节点
    initCurIndex(ary) {
      let index = null;
      ary.forEach((item, ind) => {
        if (item.currentLearningNode) {
          index = ind;
        }
      });
      this.curIndex = index;
    },
    //通关回顾
    changeReview(flag) {
      return
      // if (!this.isSignUp || this.isBeOverdue) {
      //   this.boxVisible = true;
      //   return;
      // }
      this.changeFlag(flag);
    },
    //弹出框关闭
    closeMessageBox() {
      this.boxVisible = false;
    },
    //跳转作业页面
    JumpWork(homeworkAssignId, classhourId, courseId, status) {
      return
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      if (status == 2) return;
      this.$router.push({
        name: "wirtehomework",
        query: { homeworkAssignId, classhourId, courseId }
      });
    },
    //打开视频播放器
    changeVideo(picture, key) {
      return
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      this.$axios.post("utility/getUrl", { key }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.changeVisible(true);
          this.changeUrl({
            picture,
            quality: [
              {
                name: "高清",
                url: res.result.highUrl
              },
              {
                name: "标清",
                url: res.result.url
              },
              {
                name: "流畅",
                url: res.result.lowUrl
              }
            ]
          });
        }
      });
    },
    //直播录播
    jumpVideo_drop(type, url, pic, time, id, status) {
      return
      // debugger;
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      if (status == 2) return;
      if (type == 1) {
        // window.open(url);
        this.jumpLiving(id, url);
      } else {
        // 录播
        this.changeTime(time);
        this.changeClassHourId(id);
        //录播
        this.changeVideo(pic, url);
      }
    },
    jumpVideo(obj) {
      return
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      if (obj.publishStatus == 2) return;
      console.log(obj);
      // classhourType  1 直播  2回放  3 录播
      if (obj.classhourType == 1) {
        //直播
        //是否正在直播
        if (obj.classhourReason == "正在直播") {
          obj.isLiving = true;
        }
        if (obj.isLiving) {
          obj.videoIsPlay = 1;
          //正在直播
          this.jumpLiving(obj.classhourId, obj.courseUrl);
        } else {
          //没有直播
          return;
        }
      } else if (obj.classhourType == 2) {
        if (obj.classhourReason == "回放已结束") return;
        //回放
        obj.videoIsPlay = 1;
        this.jumpBack(obj.classhourId);
      } else {
        //录播
        this.changeTime(obj.rememberVideoTime);
        this.changeClassHourId(obj.classhourId);
        this.changeVideo(obj.coverPictureUrl, obj.courseUrl);
      }
    },
    conversionTime(time) {
      if (!time) return null;
      //  time= time.replace(/:/g, ".");
      return moment(time).format("YYYY-MM-DD");
    },
    //是否正在直播
    changeLiving(index) {
      // debugger
      //改变直播状态
      console.log(index);
      this.list[index].classhourNeedCountDown = false;
      this.list[index].isStar = false;
      this.list[index].classhourCountDownTime = null;
      this.list[index].classhourReason = "正在直播";
      (this.list[index].currentLearningNode = true),
        this.initCurIndex(this.list);
    },
    //跳转直播
    jumpLiving(id, url) {
      return
      // url = url + `?classhourId=${id}`;
      // console.log(url)
      // debugger
      // this.$router.push({
      //     name:"course",
      //     query: {
      //       id:id
      //     }
      //   });
      let routeData = this.$router.resolve({
        name: "course",
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");

      // console.log(url)
      // window.open(url);
    },
    //回放
    jumpBack(id) {
      return
      // this.$router.push({
      //   name: "courseBack",
      //   query: {
      //     id: id
      //   }
      // });
      let routeData = this.$router.resolve({
        name: "courseBack",
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
      // window.open(url);
      // this.$axios.post("/userclasshour/playback",{coursewareId:url,token:""}).then((res)=>{
      //   console.log(res)
      // })
    },
    //判断课时是否亮 暗   直播: 只有直播  过了直播开始时间 亮  录播  点击过就暗
    judgeClassHour(obj) {
      if (obj.courseType == 1) {
        if (obj.isLiving) return true;
        if (obj.classhourReason == "正在直播") return true;
        //直播
        if (obj.classhourCountDownTime) {
          //是否有目标时间
          if (obj.classhourType == 2) {
            //判断是直播 还是回放  1:直播  2:回放  3:录播
            //回放·
            return true;
          } else {
            //直播
            //判断时间是否过了当前时间
            let cur = moment().valueOf();
            let m = moment(obj.classhourCountDownTime).valueOf();
            if (cur > m) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      } else if (obj.courseType == 2) {
        //录播
        if (obj.videoIsPlay == 1) {
          //是否播放过
          //1: 是
          return true;
        } else {
          //0 2:否
          return false;
        }
      }
    },
    //改变状态  直播 录播 跳转之后 星星变亮
    changeStatus() {
      this.list[this.statusIndex].videoIsPlay = 1;
    }
  },
  components: {
    ClassCountDown,
    BaskHomeworkdetail,
    Studydetail,
    VideoModal,
    MessageBox,
    PerfectInformation
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
<style lang="less">
.app-change-checkpoint_Imgbg-ten {
  background: url("~assets/img/checkpoint_Imgbg.png") no-repeat top center;
  width: 1366px;
  margin-left: -150px;
  height: 700px;
  //地图列表
  .app-change-game-ten-list {
    & > li.active {
      p {
        color: #207175 !important;
      }
    }
    & > li::after {
      display: none !important;
    }
    & > li.hasStudy::after {
      display: block !important;
    }
    & > li {
      .app-change-game-ten-start {
        position: relative;
        &>img{
          width:14px;
          height: 14px;
        }
        .app-change-game-ten-start-hover {
          position: absolute;
          display: none;
          left: -35px;
          top: 20px;
          min-width: 100px;
          height: 28px;
          background: #ffffff;
          box-shadow: 0px 3px 7px 0px rgba(196, 127, 165, 0.35);
          border-radius: 4px;
          font-size: 14px;
          color: #c4a57f;
          line-height: 28px;
          text-align: center;
          z-index: 20;
        }
        &:hover .app-change-game-ten-start-hover {
          display: block;
        }
      }
      // 图片
      .app-change-gane-ten-hover-modal {
        width: 75px;
        height: 75px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .model-hover {
        min-width: calc(226px);
        width: auto;
        display: block;
        // right: -231px !important;
        left: 82px !important;
        right: auto !important;
        & > h4 {
          white-space: nowrap;
        }
      }
      & > p {
        width: 75px;
        white-space: nowrap;
        line-height: 16px;
      }
      &:nth-child(1) {
        .app-change-game-ten-start-hover {
          left: -83px !important;
        }
        & > p {
          margin-left: 18px;
        }
        & > span {
          position: relative;
          z-index: 2;
        }
        .app-change-gane-ten-hover-modal {
          position: relative;
          z-index: 2;
        }
      }
      &:nth-child(2) {
        &::before {
          top: -37px !important;
          left: 45px !important;
        }
        .app-change-game-ten-start-hover {
          left: -83px !important;
        }
        & > p {
          margin-left: 18px;
        }
        .model-hover {
          z-index: 10;
          left: 104px!important;
        }
      }
      &:nth-child(3) {
        .app-change-game-ten-start-hover {
          left: -83px !important;
        }
        & > p {
          margin-left: 18px;
        }
        & > .app-change-gane-ten-hover-modal {
          z-index: 3;
          position: relative;
        }
      }
      &:nth-child(4) {
        &::before {
          left: -37px !important;
          top: 27px !important;
        }
        .app-change-game-ten-start-hover {
          left: 0px !important;
        }
        & > span {
          z-index: 2;
        }
        .app-change-gane-ten-hover-modal {
          position: relative;
          z-index: 2;

          .model-hover {
            // right: -212px !important;
          }
        }
      }
      &:nth-child(5) {
        &::before {
          left: -37px !important;
          top: 27px !important;
        }
        &::after {
          right: 1px !important;
        }

        & > .app-change-gane-ten-hover-modal {
          position: relative;
          z-index: 2;
        }
        .app-change-game-ten-start-hover {
          left: 0px !important;
        }
        .app-change-gane-ten-hover-modal {
          .model-hover {
            right: 85px !important;
            left: auto !important;
            &::before {
              left: auto !important;
              right: -20px;
              border-right-color: transparent;
              border-left-color: #fff;
            }
          }
        }
      }
      &:nth-child(6) {
        &::before {
          top: -38px !important;
        }
        &::after {
          bottom: 102px !important;
        }
        .app-change-game-ten-start-hover {
          left: -84px !important;
        }
        .app-change-gane-ten-hover-modal {
          .model-hover {
            left: auto !important;
    right: 85px !important;
            &::before {
              left: auto !important;
              right: -20px;
              border-right-color: transparent;
              border-left-color: #fff;
            }
          }
        }
        & > p {
          margin-left: 18px;
        }
      }
      &:nth-child(7) {
        &::before {
          left: 45px !important;
          top: -37px !important;
        }
        & > p {
          margin-left: 18px;
        }
        .app-change-game-ten-start-hover {
          left: -84px !important;
        }
        .model-hover{
          left: 104px!important;
        }
      }
      &:nth-child(8) {
        &::before {
          left: 45px !important;
          top: -37px !important;
        }
        & > p {
          margin-left: 18px;
        }
        & > .app-change-gane-ten-hover-modal {
          position: relative;
          z-index: 2;
        }
        & > span {
          & > .app-change-game-ten-start {
            z-index: 2;
            .app-change-game-ten-start-hover {
              left: -84px !important;
            }
          }
        }
      }
      &:nth-child(9) {
        &::before {
          left: 24px !important;
        }
        &::after {
          bottom: -66px !important;
          left: -196px !important;
        }
        & > span {
          position: absolute;
          left: -20px;
          top: 13px;
        }
        & > .app-change-gane-ten-hover-modal {
          position: relative;
          z-index: 2;
        }
        .app-change-game-ten-start {
          z-index: 2;
          .app-change-game-ten-start-hover {
            left: -84px !important;
          }
        }
        & > p {
          // margin-left: 18px;
        }
      }
      &:nth-child(10) {
        &::before {
          left: 27px !important;
        }
        .app-change-game-ten-start-hover {
          left: -5px;
        }
        .model-hover {
          right: -211px !important;
        }
      }
      &:nth-child(11) {
        & > span {
          position: absolute;
          right: 4px;
          .app-change-game-ten-start-hover {
            left: 5px !important;
          }
        }
        .model-hover {
          right: -211px !important;
        }

        &::before {
          content: "";
          width: 11px;
          height: 11px;
          background: #077478;
          display: inline-block;
          position: absolute;
          top: 32px;
          left: -33px;
          border-radius: 50px;
        }
      }
      &:nth-child(12) {
        & > span {
          position: absolute;
          left: -18px;
          top: 14px;
        }
        & > p {
          // margin-left: 18px;
        }
        .model-hover {
          right: -211px !important;
        }

        &::before {
          content: "";
          width: 11px;
          height: 11px;
          background: #077478;
          display: inline-block;
          position: absolute;
          top: 122px;
          left: 32px;
          border-radius: 50px;
        }
        .app-change-game-ten-start-hover {
          left: -88px !important;
        }
      }
    }
    & > li.bottom::before {
      top: 110px !important;
    }
    & > li.top::before {
      left: -31px !important;
    }
  }
  .app-change-game-ten-notice {
    position: absolute;
    color: rgba(180, 155, 118, 1);
    font-size: 14px;
    right: 126px;
    bottom: -135px;
  }
  .app-img-copyBook {
    width: 75px;
    height: 75px;
    border-radius: 5px;
    object-fit: cover;
    position: relative;
  }

  //通关回顾
  .checkPoint_review {
    z-index: 2;
  }
  //图片致灰

  .app-img-galy {
    .app-change-game-galyImg {
      & > img {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        -webkit-filter: grey;
        filter: gray;
        opacity: 0.3;
      }
    }
  }
  .app-z-p {
    color: rgb(172, 172, 172);
    font-size: 12px;
    text-align: left;
    line-height: 18px;
    height: 18px;
    width: 100%;
    text-align: left;
    margin-top: 12px;
    time {
      float: left !important;
    }
  }
}
</style>


