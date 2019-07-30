<template>
  <section style="background:RGBA(248, 243, 238, 1);margin-top:-60px;padding-top:50px;padding-bottom:40px">
    <article class="w1000 m-auto">
      <div class="Learning_body">
        <div class="Learning_title mt-60">
          <h4 class="fz24 c30 dis_in_block mr-20 fonS" >
            <span
              class="live fz16 fonH"
              v-if="list.courseType==1"
              style="font-weight:400"
            >{{list.courseTypeName}}</span>
            <span
              class="live fz16 fonH"
              style="background:#EA9C91;font-weight:400"
              v-else
            >{{list.courseTypeName}}</span>
            {{list.courseName}}
          </h4>
          <div class="dis_in_block">
            <!-- <input type="button" class="btn-green-checkpoint mr-20" value="切换课程">
                            <input type="button" class="btn-green-checkpoint mr-20" value="收藏课程">
            <input type="button" class="btn-green-checkpoint mr-20" value="说明">-->
            <span class="middle fz14 c9" style="margin-right:4px" v-if="list.purchased">共{{list.classHourCount}}课</span>
            <span class="middle fz14 c077 bold" v-if="list.purchased">{{list.statusName}}</span>
          </div>
          <div class="dis_in_block fr Learning_titleBtn">
            <!-- <span class="fz14 c4a5"> &#60;&#60; 返回学习主页</span> -->
            <span v-if="isSignUp">
              <label for class="fz16" @click="changeDescription(true)" style="cursor:pointer;display:flex;align-items:center">
                <i class="el-icon-question"></i>
                <span style='margin-left:5px'>开课前请了解</span>
              </label>
            </span>
            <!-- <span>
            <label for class="fz16">
              <i class="el-icon-star-off"></i>
              <span>收藏</span>
            </label>
            </span>-->
            <span @click="Fullscalewho(list.courseId)" v-if="list.purchased">
              <label for class="fz16 pos_r">
                <i class="el-icon-printer Give-lessons"></i>
                <span class="Give-lessonsModel">赠课给他人</span>
              </label>
            </span>
          </div>
          <p class="fz16 c4a5 dis_flow" style="overflow:hidden">
            <span class="fzMicroYaHei">{{list.courseSubtitle}}</span>
            <span v-if="!list.purchased">
              <time class="fr" v-if="list.statusName=='报名未开始'" style="font-size:14px">报名未开始</time>
              <time v-else class="fr">
                <timer
                  v-if="list.courseDynamicElement"
                  class="fzMicroYaHei"
                  style="display:inline-block;font-size:14px"
                  :date="JSON.parse(list.courseDynamicElement).signDeadlineTime"
                />
              </time>
            </span>
          </p>

          <div class="moneyApply app-change-moneyApply" v-if="!list.purchased">
            <h3 class="fz28 c097 dis_in_block fzGB1-0">{{list.courseFullPrice}}元</h3>
            <span class="middle fzGB1-0" >共{{list.classHourCount}}课 &nbsp;{{list.statusName}}</span>
            <!-- <span class="middle"></span> -->
            <!-- <span class="middle"></span> -->
            <article class="fr" v-if="!list.purchased">
              <!-- 
                                        //置灰色    .Apply_gray
                                        //全阶     .Apply_allOrder
                                        //立即报名 .Apply_promptly
                                        //赠课好友 .Apply_zkBorder 
              -->
              <!-- 赠课 -->
              <button
                class="btn-yellow-border fzGB1-0"
                style="margin-right: 20px;background:white;"
                v-if="list.canGift"
                @click="Fullscalewho(list.courseId)"
              >{{list.giftButtonText}}</button>
              <button class="btn-yellow-border btngreen-over-gif" v-else>{{list.giftButtonText}}</button>
              <!-- 报名 -->
              <button
                class="btngreen-over fzGB1-0"
                v-if="list.canBuy"
                style="font-family:"
                @click="Fullscaleyou(list.courseId)"
              >{{list.buyButtonText}}</button>
              <button
                class="btngreen-over fzGB1-0"
                v-else
                style="background:#acacac;outline:none;"
              >{{list.buyButtonText}}</button>
            </article>
          </div>
        </div>
        <div class=" Learning_content" style="marginTop:40px">
          <el-tabs
            :tab-position="tabPosition"
            class="leftClass-tab app-singleOrder-change-tab app-change-class-tabs"
            v-model="tabId"
            @tab-click="changeTab"
          >
            <el-tab-pane label="课程介绍" name="first">
              <span slot="label" class="fzSTSongti-Regu" >课程介绍</span>
              <!-- <blockquote class="cb49">
                                        课程介绍                                        
              </blockquote>-->
              <!--介绍-->
              <CourseIntroduce v-if="tabId=='first'"/>
            </el-tab-pane>

            <el-tab-pane label="课程内容" name="second">
              <span slot="label" class="fzSTSongti-Regu" >课程内容</span>
              <!-- <blockquote class="cb49">
                                        课程内容
                                       
              </blockquote>-->
              <!--介绍-->

              <!-- <CourseContentTen v-if="tabId=='second'"/> -->

              <CourseContentThree v-if="tabId=='second'&&tempNum=='3'"/>
              <CourseContentFive v-if="tabId=='second'&&tempNum=='5'"/>
              <CourseContentTen v-if="tabId=='second'&&tempNum=='10'"/>
            </el-tab-pane>

            <el-tab-pane name="third">
              <span slot="label" class="fzSTSongti-Regu" >晒作业</span>
              <SunHomeWork v-if="tabId=='third'&&isSignUp&&!isBeOverdue"/>
              <div
                v-if="tabId=='third'&&(!isSignUp||isBeOverdue)"
                class="app-Introduce-noData"
                style="height:500px;overflow:hidden;clear:both"
              >
                <img
                  :src="require('@/assets/img/null-show.png')"
                  alt
                  style="display:block;margin:30px auto"
                >
                <p class="fz12 c4a5 mt-15 text-center">{{isBeOverdue?'该课程已截止~':'您还没有报名哦，赶紧去报名吧～!'}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="评价" name="fourth">
              <span slot="label" class="fzSTSongti-Regu" >评价</span>
              <!--评价-->
              <CourseEvaluate v-if="tabId=='fourth'"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <registration
        :Tips="Tips"
        :Agreement="Agreement"
        @changedoing="changedoing"
        ref="registrationflag"
        :type="list.courseType"
        :isSend="isSend"
      />
      <PerfectInformation @changedoing="changedoing" ref="PerfectInformationflag"/>
      <GameDescriptiondetail
        v-if="GameDescription"
        :changeDescription="changeDescription"
        :GameDescription="GameDescription"
      />
    </article>
  </section>
</template>
<script>
// 预览页面
import registration from "@/components/registration"; //报名前请了解
import PerfectInformation from "@/components/PerfectInformation"; //完善个人信息
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件
import SunHomeWork from "@/components/previewClass/sunHomeWork";
import CourseEvaluate from "@/components/previewClass/courseEvaluate";
import CourseIntroduce from "@/components/previewClass/CourseIntroduce";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import CourseContentThree from "@/components/previewClass/courseContentThree";
import CourseContentFive from "@/components/previewClass/courseContentFive";
import CourseContentTen from "@/components/previewClass/courseContentTen";
import GameDescriptiondetail from "@/components/gamedetail/GameDescriptiondetail"; //说明
import moment from "moment";
export default {
  asyncData(api) {
    console.log(api.query.courseId);
    //改变vuex的courseId
    api.store.commit("singleOrder/changeCourseId", api.query.courseId);
    api.store.commit("singleOrder/changeTabId", "second");
    // if (api.query.change) {
    //   //跳转到帖子详情
    //   console.log("跳转");
    //   api.store.commit("singleOrder/changeTabId", "third");
    //   api.store.commit("singleOrder/homework/changePostFlag", true);
    //   api.store.commit("singleOrder/changeCourseId", api.query.courseId);
    //   api.store.commit(
    //     "singleOrder/homework/changePostId",
    //     api.query.homeworkFinishId
    //   );
    // }
  },
  layout: 'living',
  data() {
    return {
      list: [],
      Tips: "", //报名前提示
      Agreement: "", //报名协议
      id: null,
      isGive: null,
      tabPosition: "top",
      classHourCount: "", //模版地图
      GameDescription: false, //介绍
      tempNum: "", //模版
      isSend:false,//是否赠课
    };
  },
  //初始获取数据
  created() {
    this.id = this.$route.query.courseId;
    this.$axios
      .post("/course/singledetail", { token: "", courseId: this.id })
      .then(res => {
        this.list = res.result;
        this.tempNum = res.result.tempNum;
        let obj = JSON.parse(res.result.courseDynamicElement);
        this.changeSign(res.result.purchased);
        this.initStundentTime(obj);
        console.log(this.$route.query.change, 12);
        let change = this.$route.query.change;
        // if (!change) {
        //   //非详情页
        //   if (res.result.purchased) {
        //     //已报名
        //     this.changeTabId("second");
        //   } else {
        //     //未报名
        //     this.changeTabId("first");
        //   }
        // }

        console.log(JSON.parse(res.result.courseDynamicElement), "list");
      });
  },
  methods: {
    ...mapMutations({
      changeTabId: "singleOrder/changeTabId", //切换tabid
      clearInfo: "singleOrder/clearInfo", //清除信息
      changeStundenTime: "singleOrder/changeStundentTime", //学习有效期
      changeSign: "singleOrder/changeSign", //是否报了名
      Loginpage: "login/Loginpage", //改变登录页面状态
      getCookie: "system/getCookie", //获取用户cookie
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Mobileverion: "login/Mobilephoneverification" //用户没有登录 请先登录
    }),
    //切换tab
    changeTab(tab, e) {
      this.changeTabId(tab.name);
    },
    //报名
    Fullscaleyou(id) {
      return
      this.getCookie();
      if (this.userstoken == null) {
        this.Mailboxlogin(false);
        this.Mobileverion(false);
        this.Loginpage(true);
        return;
      }
      this.$refs.registrationflag.flagchange();
      this.prevmsg(id);
      this.isGive = 1;
    },
    //赠课
    Fullscalewho(id) {
      return
      this.getCookie();
      if (this.userstoken == null) {
        this.Mailboxlogin(false);
        this.Mobileverion(false);
        this.Loginpage(true);
        return;
      }
      this.isSend=true
      this.$refs.registrationflag.flagchange();
      this.prevmsg(id);
      this.isGive = 4;
    },
    //判断是否完善信息
    isneed() {
      return
      this.$axios
        .post("/user/needcompleteuserinfo", { type: 1, token: "" })
        .then(res => {
          if (res.result) {
            console.log(this)
            this.$refs.PerfectInformationflag.flagchange();
          } else {
            this.linkdetail();
          }
        });
    },
    //报名前提示
    prevmsg(id) {
      return
      this.$axios.post("/course/purchasetips", {}).then(res => {
        this.Tips = res.result;
      });
      this.$axios.post("/course/purchaseagreement", {courseId:id,courseType:2}).then(res => {
        this.Agreement = res.result;
        // console.log(JSON.parse( this.Agreement.protocolContent).blocks)
      });
    },
    //下单关闭
    changedoing(type) {
      return
      if (type == "info") {
        this.$refs.registrationflag.flagchange();
      } else if (type == "pay") {
        console.log(this.isSend)
        if(this.isSend){
           this.linkdetail();
        }else{
          this.isneed();
        }
      }
    },
    //下单
    // getlivedata() {
    //   this.$axios
    //     .post("/course/buysingle", {
    //       sourceId: 1,
    //       courseId: this.id,
    //       token: "",
    //       orderType: this.isGive
    //     })
    //     .then(res => {
    //       this.linkdetail(res);
    //     });
    // },
    //进入支付页面
    linkdetail(data) {
      return
        this.$router.push({
          name: "payment",
          query: {
            istype: 1,
            fullid: this.id,
            isTurnFull:false,
            orderType: this.isGive,
            orderSNID:null
          }
        });
    },
    //闯关说明
    changeDescription(flag) {
      this.GameDescription = flag;
    },
    //处理学习有效期  只有录播课走这 
    initStundentTime(obj) {
      return
      if (!obj.learnEndTime) {
          //录播  取studyValidityPeriod 天数  从第二天开始算的
        let n = Number(obj.studyValidityPeriod) + 1;
        let time = moment()
          .add("d", n)
          .format("YYYY年MM月DD日");
        this.changeStundenTime(time);
       
      } else {
         //直播  取learnEndTime  直播课在list接口里取
        // let time = obj.learnEndTime;
        // time = moment(time).format("YYYY年MM月DD日");
        // this.changeStundenTime(time);
      }
    }
  },
  components: {
    SunHomeWork, //晒作业
    CourseEvaluate, //评价
    CourseIntroduce, //介绍
    CourseContentFive, //课程内容五模版
    CourseContentThree, //课程内容三模版
    CourseContentTen, //课程内容十模版
    timer,
    registration,
    PerfectInformation,
    GameDescriptiondetail, //说明
  },
  computed: {
    ...mapState({
      userstoken: state => state.system.token, //用户token
      isSignUp: state => state.singleOrder.isSignUp, //是否报名
      isBeOverdue: state => state.singleOrder.isBeOverdue //是否过期
    }),
    tabId: {
      //tabId
      get() {
        return this.$store.state.singleOrder.tabId;
      },
      set(newVal) {
        this.$store.state.singleOrder.tabId = newVal;
      }
    }
  },
  beforeDestroy() {
    this.clearInfo();
  }
};
</script>
<style lang='less'>
.app-singleOrder-change-tab {
  .el-tabs__nav-scroll{
    height:50px;
  }
  .el-tabs__active-bar {
    display: block !important;
    margin-left: 20.5%;
    // position: relative;
    // width: 0!important;
    border: none !important;
    background: transparent;
    z-index: 2;

    &:after {
      position: absolute;
      // width: 10px;
      background: rgba(196, 165, 127, 1);
      // height: 10px;
      border-radius: 50%;
      // background: red;
      left: 50%;
      top: -8px;
      margin-left: -10px;
      content: "";
      width: 20px !important;
      height: 20px !important;
      border: 5px solid white;
      box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    }
  }
  .is-active::after {
    display: none !important;
    width: 0;
  }
  .el-tabs__item.is-top {
    height: 50px;
    & > span {
      padding: 0 30px;
    }
  }
  .el-tabs__item.is-top:nth-child(2) {
    padding-left: 0 !important;
  }
  .el-tabs__item.is-top:last-child {
    padding-right: 0 !important;
  }
  .el-tabs__nav-wrap:after {
    // opacity: 0.4;
    // background: radial-gradient(#eaeaea, #c4a57f, #eaeaea);
    background:transparent url(~assets/img/tabs_after2.png) no-repeat -230px -362px;
  }
  .el-tabs__nav-wrap::after {
    top: 50px !important;
    position: absolute;
  }
}
.btngreen-over-gif {
  cursor: pointer;
  margin-right: 20px;
  background: #acacac;
  border-color: #acacac;
  color: white;
  outline: none;
}
.btngreen-over {
  outline: none;
  width: 140px;
  height: 40px;
  background: #07767a;
  color: #fff;
  border-radius: 2px;
  border: none;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.app-change-moneyApply {
  & > .middle {
    color: #999999;
    font-size: 14px;
    &:nth-of-type(1) {
      margin-left: 12px;
    }
  }
}
//兼容safari 边距问题
.app-safari-margin {
  padding-top: 36px;
  clear: both;
}
</style>





