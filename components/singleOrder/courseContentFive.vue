<template>
  <article class="checkpoint_body learning_body app-change-game-five app-safari-margin">
    <div class="w1140 m-auto checkpoint_content">
      <div class="pos_r">
        <div class="learning_Imgbg">
          <div class="pos_r">
            <!-- 通关回顾 -->
            <!--太阳-->
            <!-- <div class="pos_a learning_sun">
              <img :src="require('@/assets/img/learning_sun.png')" alt>
            </div>-->
            <!--人-少年-->
            <div
              class="pos_a learning_people"
              v-if="curIndex!=null"
              :style="{left:currPos[curIndex].x+'px',top:currPos[curIndex].y+'px'}"
            >
              <img :src="require('@/assets/img/learning_people.png')" alt>
            </div>
            <!--云朵-->
            <!-- <div class="pos_a learning_cloud">
              <img :src="require('@/assets/img/learning_cloud.png')" alt>
            </div>-->
            <!--月亮-->
            <!-- <div class="pos_a learning_moon" style="top:218px">
              <img :src="require('@/assets/img/learning_moon.png')" alt>
            </div>-->

            <!--人-通关回顾-->
            <div
              class="pos_a learning_checkPointReview"
              style="top:130px;cursor:pointer"
              @click="changeReview(true)"
            >
              <p class="fz16 cb49">学习回顾</p>
              <img v-lazy="require('@/assets/img/checkPoint_review.png')" alt>
            </div>

            <ul class="learning_headList app-change-game-five-list">
              <li
                :class="{active:index==curIndex,top:item.kind=='top',bottom:item.kind=='bottom','app-img-galy':!judgeClassHour(item)}"
                v-for="(item,index) in list"
                :key="item.classhourId"
                :style="{top:positAry[index].y+'px',left:positAry[index].x+'px',}"
              >
                <!-- <p class="fz12 cb49">第{{index+1}}节课</p> -->
                <!-- 倒计时系列 -->
                <p
                  class="fz12 text-center cb49 text_white"
                  v-if="item.isStar&&item.classhourNeedCountDown&&item.kind=='top'"
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
                  v-if="!(item.classhourNeedCountDown&&item.isStar)&&item.classhourCountDownTime&&item.kind=='top'"
                >{{item.classhourCountDownTime}}</p>
                <!-- 文字系列 -->
                <p
                  class="fz12 text-center cb49 text_white"
                  v-if="item.classhourNeedCountDown==false&&item.classhourReason&&item.isStar==false&&item.kind=='top'"
                >
                  <span
                    v-if="item.classhourReason=='正在直播'"
                    style="cursor:pointer"
                    class="bold les1"
                    @click="jumpVideo(item)"
                  >正在直播</span>
                  <span v-else>{{item.classhourReason}}</span>
                </p>
                <span
                  v-if="item.userHomeworkAssignCompletionResponseVos&&item.userHomeworkAssignCompletionResponseVos.length>0"
                >
                  <div
                    class="app-change-game-five-start"
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
                      class="app-change-game-five-start-hover"
                      v-if="ind==0"
                    >{{item.courseType==1?(item.classhourType=='2'?'观看回放':'观看直播'):'观看视频'}}</span>
                    <span class="app-change-game-five-start-hover" v-else>{{ite.homeworkTypeText}}</span>
                  </div>
                </span>
                <div
                  @mouseover="item.hoverFlag=true"
                  @mouseout="item.hoverFlag=false"
                  class="app-change-game-galyImg"
                >
                  <img
                    class="app-img-copyBook"
                    :src="item.copyBookUri"
                    alt
                    @click="doing(item.classhourId,item.courseType,item,item.publishStatus,index)"
                  >
                  <div
                    class="model-hover"
                    style="min-height:85px;height:auto"
                    v-show="item.hoverFlag"
                  >
                    <!-- <p class="fz12 c30" style="margin-bottom:12px"> -->
                    <!-- <span style="rgba(172, 172, 172, 0.09)">第{{index+1}}节</span> -->
                    <!-- 直播系列   改为只需显示直播开始时间-->
                    <!-- <time class="fr" style="rgba(172,172,172,.09)" v-if="item.classhourType==1">
                    {{formData(item.startTime,'utc','add',false)}}-->
                    <!-- <time
                        class="fr"
                        style="rgba(172, 172, 172, 0.09)"
                        v-if="item.classhourType==1"
                      >
                    <span v-if="item.isStar&&item.classhourNeedCountDown">-->
                    <!-- 倒计时 -->
                    <!-- <ClassCountDown
                            :time="item.classhourCountDownTime"
                            :changeLiving="changeLiving.bind(this,index)"
                          ></ClassCountDown>
                        </span>
                    <span v-else>{{conversionTime(item.classhourCountDownTime)}}</span>-->
                    <!-- </time> -->
                    <!-- </p> -->
                    <h4
                      class="fz14"
                      :title="item.classhourName"
                      style="margin-bottom:6px"
                    >{{item.classhourName}}</h4>
                    <p class="fz12">
                      <span
                        class="classIndruc"
                        :title="item.classhourIntroduction"
                        style="margin-bottom:0px;color:rgba(172, 172, 172);display:inline-block;width:100%;white-space:nowrap"
                      >{{item.classhourIntroduction}}</span>
                      <!-- <label for class="c30">颜真卿：</label>
                      <span class="c30">天真雄浑</span>-->
                      <!-- <span class="c9 fr">
                      完成度
                      <span class="cb49">90%</span>
                      </span>-->
                      <!-- <span class="c9 fr">
                      完成度
                      <span
                        class="cb49"
                      >{{initComplete(item.userHomeworkAssignCompletionResponseVos)}}</span>
                      </span>-->
                    </p>
                    <p class="app-z-p">
                      <time
                        class="fr"
                        style="rgba(172,172,172,.09)"
                        v-if="item.classhourType==1"
                      >{{formData(item.startTime,'utc','add',false)}}</time>
                    </p>
                    <!-- <p
                    class="fz12"
                    v-if="item.classhourNeedCountDown"
                    style="color:rgba(172, 172, 172)"
                  >
                    {{item.classhourReason}}
                    <ClassCountDown :time="item.classhourCountDownTime"/>
                    </p>-->
                    <!-- 回放系列 弃用 -->
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
                  v-if="item.isStar&&item.classhourNeedCountDown&&item.kind!='top'"
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
                  v-if="!(item.classhourNeedCountDown&&item.isStar)&&item.classhourCountDownTime&&item.kind!='top'"
                >{{item.classhourCountDownTime}}</p>
                <!-- 文字系列 -->
                <p
                  class="fz12 text-center cb49 text_white"
                  v-if="item.classhourNeedCountDown==false&&item.isStar==false&&item.classhourReason&&item.kind!='top'"
                >
                  <span
                    v-if="item.classhourReason=='正在直播'"
                    style="cursor:pointer"
                    class="bold les1"
                    @click="jumpVideo(item)"
                  >正在直播</span>
                  <span v-if="item.classhourReason!='正在直播'">{{item.classhourReason}}</span>
                </p>
              </li>
            </ul>

            <!--船-->
            <div class="pos_a learning_ships" style="bottom:0">
              <img :src="require('@/assets/img/learning_ships.png')" alt>
            </div>
            <!--鸭子-->
            <!-- <div class="pos_a learning_duck" style="bottom:-100px">
              <img :src="require('@/assets/img/learning_duck.png')" alt>
            </div>-->
            <p class="app-change-game-five-notice" v-if="isSignUp">您可以在{{studentTime}}之前提交作业和将作业发布到“晒作业”与大家分享</p>
          </div>
        </div>
      </div>
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
    <VideoModal v-if="visible" :getList="getCourseList"></VideoModal>
    <PerfectInformation @changedoing="changedoing" ref="PerfectInformationflag"/>
  </article>
</template>
<script>
import PerfectInformation from "@/components/PerfectInformation"; //完善个人信息
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { formData, computingTime } from "@/plugins/utils";
import ClassCountDown from "@/components/gamedetail/ClassCountDown";
import moment from "moment";
import BaskHomeworkdetail from "@/components/gamedetail/BaskHomeworkdetail"; //通关回顾
import Studydetail from "@/components/gamedetail/Studydetail"; //学习详情
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
        { y: 355, x: -10 },
        { y: 325, x: 140 },
        { y: 271, x: 310 },
        { y: 164, x: 550 },
        { y: 255, x: 840 },
        { y: 170, x: -102 },
        { y: 295, x: 973 }
      ], //定位数组
      courseType: "", //课程类型 直播 1   录播 2
      currPos: [
        // 学习节点的位置

        { x: 0, y: 234 },
        { x: 150, y: 185 },
        { x: 320, y: 150 },
        { x: 545, y: 52 },
        { x: 860, y: 130 },
        { x: -146, y: 235 },
        { x: 961, y: 206 }
      ],
      curIndex: null, //当前的学习节点
      boxVisible: false, //弹出框状态
      msg: "该课程已截止!",
      info: "", //课时详情信息
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
            // publishStatus  发布状态: 1:发布  2:未发布
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
              if (index == 5) {
                if (item.kind == "top") {
                  //头部课程  不作改变
                }
                if (item.kind == "bottom") {
                  this.positAry[5] = ary[6];
                  this.positAry[6] = ary[5];
                  this.currPos[5] = ary1[6];
                  this.currPos[6] = ary1[5];
                }
              }
              //给userHomeworkAssignCompletionResponseVos放一个值   跳转直播录播
              item.userHomeworkAssignCompletionResponseVos.unshift(1);
              return item;
            });
            this.list = res.result.userClassHourResponseVos;
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
      //status:发布状态  1:已发布  2:未发布
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      if (status == 2) return;
      this.statusIndex = index;
      this.classhoursId = id;
      this.courseType = courseType;
      this.info = info;
      this.$axios
        .post("/user/needcompleteuserinfo", { type: 1, token: "" })
        .then(res => {
          if (res.result) {
            this.$refs.PerfectInformationflag.flagchange();
          } else {
            this.changeDetails({ flag: true, info });
          }
        });
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
    //倒计时计算工具
    // countDownTime(time, index) {
    //   // console.log(index);
    //   time = "20:00:00";
    //   let ary = time.split(":");
    //   let data = moment().set({
    //     h: Number(ary[0]),
    //     m: Number(ary[1]),
    //     s: Number(ary[2])
    //   });
    //   this.timerAry[index] = null; //对应的定时器
    //   this.timeAry[index] = this.computingTime(data, true); //对应的倒计时时间
    //   this.timerAry[index] = setInterval(() => {
    //     if (
    //       moment().format("YY-MM-DD HH:mm:ss") ==
    //       data.format("YY-MM-DD HH:mm:ss")
    //     ) {
    //       clearInterval(this.timerAry[index]);
    //       return;
    //     }
    //     // console.log("定时器")
    //     this.timeAry[index] = this.computingTime(data, true);
    //     this.timeAry = [...this.timeAry];
    //     // console.log(this.timeAry)
    //   }, 1000);
    //   // return this.timeAry[index]

    //   // console.log(ary[0])
    //   //将取到的时间 进行完整解析成 YY-MM-DD HH:mm:ss
    //   // let data=moment().set({h:Number(ary[0]),m:Number(ary[1]),s:Number(ary[2])})
    //   // console.log(data)//目标时间
    //   // console.log(this.computingTime(data,true))//倒计时时间
    //   //  this.timer=setInterval(()=>{
    //   //   if(moment().format("YY-MM-DD HH:mm:ss")==data.format("YY-MM-DD HH:mm:ss")){
    //   //     clearInterval(this.timer)
    //   //     return
    //   //   }
    //   //   this.timeAry[index]=this.computingTime(data,true)
    //   //   console.log("定时器",this.timeAry)
    //   //   this.timeAry=this.timeAry.map((item,ind)=>{
    //   //     if(ind==index){
    //   //       item=this.computingTime(data,true)
    //   //     }
    //   //     console.log(111111,item)
    //   //     return item
    //   //   })
    //   // },10000)
    //   // return this.timeAry[index]
    // },
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
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      this.changeFlag(flag);
    },
    //弹出框关闭
    closeMessageBox() {
      this.boxVisible = false;
    },
    //跳转作业页面
    JumpWork(homeworkAssignId, classhourId, courseId, status) {
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
    jumpVideo_drop(type, url, pic, time, id, isLiving, status, backUrl) {
      //isLiving 是否正在直播
      // console.log(type,url,pic,time,id)
      if (!this.isSignUp || this.isBeOverdue) {
        this.boxVisible = true;
        return;
      }
      if (status == 2) return;
      if (type == 1) {
        //判断是否正在直播
        //直播
        if (isLiving) {
          //判断直播是否开始
          this.jumpLiving(id, url);
          // window.open(url);
          //   this.$router.push({
          //   name:"living",
          //   query: {
          //     url
          //   }
          // });
        } else {
          return;
        }
      } else {
        //录播
        this.changeTime(time);
        this.changeClassHourId(id);
        //录播
        this.changeVideo(pic, url);
      }
    },
    jumpVideo(obj) {
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
          //正在直播
          obj.videoIsPlay = 1;
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
    //跳转直播,回放
    jumpLiving(id, url) {
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
      // let uid = moment().valueOf();
      // url = url + `?classhourId=${id}&token=${this.token}`;
      //  console.log(url)
      // window.open(url);
      // window.location.href=url
      //  this.standardPost(url,"zhou-zwl")
      // this.$axios.post("/userclasshour/play", {
      //   uid,
      //   classhourId: id,
      //   token: ""
      // }).then((res)=>{
      //   console.log(res)
      //    localStorage.removeItem('callbackHTML');
      //     localStorage.setItem('callbackHTML',res);
      //     this.$router.push("living")
      // })
    },
    //回放
    jumpBack(id) {
      // this.$router.push({
      //     name:"courseBack",
      //     query: {
      //       id:id
      //     }
      //   });
      let routeData = this.$router.resolve({
        name: "courseBack",
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
      // window.open(url)
      // this.$axios.post("/userclasshour/playback",{coursewareId:url}).then((res)=>{
      //   console.log(res)
      // })
    },
    conversionTime(time) {
      if (!time) return null;
      //  time= time.replace(/:/g, ".");
      return moment(time).format("YYYY-MM-DD");
    },
    //是否正在直播
    changeLiving(index) {
      //改变直播状态
      console.log(index);
      this.list[index].classhourNeedCountDown = false;
      this.list[index].isStar = false;
      this.list[index].classhourCountDownTime = null;
      this.list[index].classhourReason = "正在直播";
      this.list[index].isLiving = true;
      (this.list[index].currentLearningNode = true),
        this.initCurIndex(this.list);
    },
    standardPost(url, arg) {
      // var form = $("<form method='post'></form>");
      var form = document.createElement("form");
      form.setAttribute("method", "get");
      form.setAttribute("action", url);
      form.setAttribute("name", "form-name-z");
      // form.attr({"action":url});
      if (arg) {
        // var input = $("<input type='hidden'>");
        var input = document.createElement("input");
        input.setAttribute("name", arg);
        input.value = arg;
        // form.append(input);
        form.appendChild(input);
      }
      // $("html").append(form);
      document.body.appendChild(form);
      console.log(form);
      form.submit();
    },
    //判断课时是否亮 暗   直播: 只有直播  过了直播开始时间 亮  录播  点击过就暗
    judgeClassHour(obj) {
      if (obj.courseType == 1) {
        //优先判断是否正在直播
        if (obj.isLiving) return true;
        if (obj.classhourReason == "正在直播") return true;
        if (obj.classhourReason == "直播已结束") return true;
        if (obj.classhourReason == "回放已结束") return true;
        
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
<style lang='less'>
.app-change-game-five {
  background: url(~assets/img/learning_peak2.png) no-repeat center 10px;
  width: 1400px;
  margin-left: -165px;
  height: 600px;
  .app-change-game-five-list {
    & > li {
      &::after{
        font-size: 14px;
        font-weight: 600;
      }
      & > span {
        top: 0 !important;
      }
      &::before {
        display: none !important;
      }
      &::after {
        position: absolute;
        top: -40px !important;
        left: 26px !important;
        // display: none!important;
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
      &.active::after {
        background: #207175 !important;
      }
      &:nth-child(6) > p {
        // margin-bottom: 12px;
      }
      &:nth-child(7) {
        & > p {
          height: 32px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        & > span {
          top: 32px !important;
        }
      }

      // &:nth-child(1)::after {
      //   content: "";
      //   width: 11px;
      //   height: 11px;
      //    left: 32px!important;
      //   background: rgba(7, 116, 120, 1) !important;
      // }
      &:nth-child(1)::after {
        content: "1";
      }
      &:nth-child(2)::after {
        content: "2";
      }
      &:nth-child(3)::after {
        content: "3" !important;
      }
      &:nth-child(4)::after {
        content: "4";
      }
      &:nth-child(5)::after {
        content: "5";
      }
      &:nth-child(6) {
        & > p {
          height: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        & > span {
          top: 36px !important;
        }
        &::after {
          content: "";
          width: 11px;
          height: 11px;
          left: 32px !important;
          top: -40px !important;
          background: rgba(7, 116, 120, 1) !important;
        }
      }
      &:nth-child(7)::after {
        content: "";
        width: 11px;
        height: 11px;
        background: rgba(7, 116, 120, 1) !important;
      }
      &.top::after {
        top: 130px !important;
      }
      &.bottom::after {
        left: 30px !important;
        top: -32px !important;
      }

      .model-hover {
        top: 10px !important;
        & > h4 {
          white-space: nowrap;
        }
      }
    }
  }
  .app-change-game-five-notice {
    position: absolute;
    color: rgba(180, 155, 118, 1);
    font-size: 14px;
    right: 0px;
    bottom: 0px;
  }
  //星星经过效果
  .app-change-game-five-start {
    margin-bottom: 2px;
    position: relative;
    & > img {
      width: 14px;
      height: 14px;
    }
    .app-change-game-five-start-hover {
      position: absolute;
      display: none;
      left: 20px;
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
    &:hover .app-change-game-five-start-hover {
      display: block;
    }
  }
  .app-img-copyBook {
    width: 75px;
    height: 75px;
    border-radius: 5px;
    object-fit: cover;
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
    margin-top: 8px;
    time {
      float: left !important;
    }
  }
}
</style>



