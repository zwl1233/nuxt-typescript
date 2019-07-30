<template >
  <section style="background: rgb(248, 243, 238)">
    <article class="w1000 m-auto">
      <div class="Learning_body">
        <div class="Learning_title fonH" style="padding-top:54px">
          <h4 class="fz24 c30 dis_in_block fonS" style="margin-right:10px">
            <span
              class="live fz16 fonH"
              style="font-weight:400;margin-right:-2px"
              v-if="list.courseTypeId==1"
            >{{list.courseTypeName}}</span>
            <span
              class="live fz16"
              style="background:#EA9C91;font-weight:400;margin-right:-2px"
              v-else
            >{{list.courseTypeName}}</span>
            {{list.courseName}}
          </h4>
          <!-- <span class="middle" v-if="list.purchased">
            <span style="color:#999999;font-size:14px">共{{list.classHourCount}}课</span> &nbsp;
            <span style="color:#077478;font-size:14px;font-weight:bold;">已报名</span>
          </span>-->
          <div class="dis_in_block fonH" v-if="list.purchased">
            <!-- <input type="button" class="btn-green-checkpoint mr-20" value="切换课程">
                            <input type="button" class="btn-green-checkpoint mr-20" value="收藏课程">
            <input type="button" class="btn-green-checkpoint mr-20" value="说明">-->
            <span class="middle fz14 c9">共{{list.classHourCount}}课</span>
            <span class="middle fz14 c077 bold">{{list.statusName}}</span>
          </div>
          <div class="dis_in_block fr Learning_titleBtn" v-if="list.purchased">
            <span>
              <label
                for
                class="fz16"
                style="cursor:pointer;display:flex;align-items:center;"
                @click="changeDescription(true)"
              >
                <i class="el-icon-question"></i>
                <span style="margin-left:5px">开课前请了解</span>
              </label>
            </span>
            <!-- <span class="fz14 c4a5"> &#60;&#60; 返回学习主页</span> -->
            <!-- <span>
            <label for class="fz16 c4a5">
              <i class="el-icon-star--on"></i>
              <span>已收藏</span>
            </label>
            </span>-->
            <span
              @click="Fullscalewho(list.courseFullId)"
              style="float:right;"
              v-if="list.purchased&&list.canGift"
            >
              <label for class="fz16 pos_r">
                <i class="el-icon-printer Give-lessons"></i>
                <span class="Give-lessonsModel">赠课给他人</span>
              </label>
            </span>
          </div>

          <p class="fz16 c4a5 dis_flow fonS" style="line-height:26px;overflow:hidden">
            {{list.courseTitle}}
            <span style="float:right">
              <time v-if="list.statusName=='报名未开始'" style="font-size:14px">报名未开始</time>
              <time v-else class="fr c4a5">
                <span v-if="list.buyButtonText!=='转报全阶'">
                  <timer
                    class="fzMicroYaHei"
                    v-if="list.courseDynamicElement"
                    style="display:inline-block;font-size:14px"
                    :date="JSON.parse(list.courseDynamicElement).signDeadlineTime"
                  ></timer>
                </span>
                <span v-else>
                  <timer    
                    class="fzMicroYaHei"
                    v-if="list.courseDynamicElement"
                    style="display:inline-block;font-size:14px"
                    :date="JSON.parse(list.courseDynamicElement).turnSignDeadlineTime"
                  ></timer>
                </span>
              </time>
            </span>
          </p>
          <p v-if="!list.purchased" style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
            <small style="color:rgba(153, 153, 153, 1);display:flex;align-items:center">
              <!-- <s class="c9">原学费：{{list.courseFullPrice}}元</s> -->
              <h3
                class="fz28 c097 dis_in_block fzGB1-0"
              >{{list.courseDiscountPrice}}元</h3>
              <span class="middle fzMicroYaHei fz14" style="margin-left:12px">共{{list.classHourCount}}课 &nbsp;{{list.statusName}}</span>
            </small>
            <span v-if="!list.purchased"></span>
            <span style="float:right">
              <!-- 
                                        //置灰色    .Apply_gray
                                        //全阶     .Apply_allOrder
                                        //立即报名 .Apply_promptly
                                        //赠课好友 .Apply_zkBorder 
              -->
              <!-- 赠课 -->
              <span >
                <button
                  class="btn-yellow-border"
                  style="margin-right: 20px;background:white"
                  v-if="list.canGift"
                  @click="Fullscalewho(list.courseFullId)"
                >{{list.giftButtonText}}</button>
                <button class="btn-yellow-border btngreen-over-gif" v-else>{{list.giftButtonText}}</button>
              </span>
              <!-- 报名 -->
              <span v-if="istype==null">
                <button
                  class="btngreen-over"
                  v-if="list.canBuy"
                  @click="Fullscaleyou(list.courseFullId)"
                >{{list.buyButtonText}}</button>
                <button
                  class="btngreen-over"
                  v-else
                  style="background:#acacac;outline:none"
                >{{list.buyButtonText}}</button>
              </span>
              <!-- 转全阶 -->
              <span v-else>
                <button
                  class="btngreen-over"
                  style="background:#C4A57F"
                  v-if="istype=='true'"
                  @click="Fullscalzhan(list.courseFullId)"
                >转报全阶</button>
                <button class="btngreen-over" v-else style="background:#acacac;outline:none">转报全阶</button>
              </span>
            </span>
          </p>

          <div class="moneyApply app-change-moneyApply" v-if="!list.purchased" style="line-height:20px;margin-top:10px">
            <OriginaPrice class="fonH" text="原学费" :num="list.courseFullPrice"/>
            <article class="fr fzGB1-0">
              
            </article>
          </div>
        </div>
        <div class="Learning_content" style="margin-top:60px">
          <el-tabs
            :tab-position="tabPosition"
            class="leftClass-tab app-fullOrder-change-tab app-change-class-tabs"
            v-model="tabId"
            @tab-click="changeTab"
          >
            <el-tab-pane label="课程介绍" name="first">
              <span slot="label" class="app-change-el-tabs-span fonS">去上课</span>
              <FullIntroduce v-if="tabId=='first'"/>
            </el-tab-pane>

            <el-tab-pane label="课程组成" name="second">
              <span slot="label" class="app-change-el-tabs-span fonS">课程组成</span>
              <FullOrderList :item="list.courseSingleResponseVos" v-if="tabId=='second'"/>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- <registration
          :Tips="Tips"
          :Agreement="Agreement"
          @changedoing="changedoing"
          ref="registrationflag"
        />
        <PerfectInformation @changedoing="changedoing" ref="PerfectInformationflag"/>
        </div>-->
        <registration
          :Tips="Tips"
          :type="list.courseTypeId"
          :isSend="isSend"
          :Agreement="Agreement"
          @changedoing="changedoing"
          ref="registrationflag"
          :registrObj="registrObj"
          
        />
        <PerfectInformation @changedoing="changedoing" ref="PerfectInformationflag"/>
        <GameDescriptiondetail
          v-if="GameDescription"
          :changeDescription="changeDescription"
          :GameDescription="GameDescription"
           :content="understandBefore"
        />
      </div>
    </article>
  </section>
</template>

<script>
import registration from "@/components/registration"; //报名前请了解
import PerfectInformation from "@/components/PerfectInformation"; //完善个人信息
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件
import FullOrderList from "@/components/fullOrder/fullOrderList";
import FullIntroduce from "@/components/fullOrder//fullIntroduce";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import OriginaPrice from "@/components/originalPrice";
import GameDescriptiondetail from "@/components/gamedetail/GameDescriptiondetail"; //说明
export default {
  asyncData(api) {
    console.log(api.query.courseId);
    api.store.commit("fullOrder/changeCourseId", api.query.courseId);
  },
  layout: 'bg',
  data() {
    return {
      GameDescription: false, //介绍
      list: [],
      Tips: "", //报名前提示
      Agreement: "", //报名协议
      id: null,
      isGive: null,
      istype: null,
      fileList2: [
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
        //, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      MyHomework_radio: "1",
      tabPosition: "top",
      homeSelect: "left",
      activeNames: ["1"],
      input10: "",
      home_head: "1",
      industry: "",
      professional: "",
      schooling: "",
      home: "",
      isTurnFull: false,
      isSend:false,//是否赠课
      registrObj:{}
    };
  },
  //初始获取展示数据
  mounted() {
    this.id = this.$route.query.courseId;
    this.istype = this.$route.query.istype;
    this.$axios
      .post("/course/fulldetail", { token: "", courseFullId: this.id })
      .then(res => {
        
        this.list = res.result;
        this.initRegistrObj(res.result);
        if(!res.result.isView){
          //true 查看过  不弹窗   false 未查看  弹窗
          this.changeDescription(true)
        }
        this.understandBefore=res.result.understandBefore
        console.log(res.result, "list");
      });
  },
  methods: {
    ...mapMutations({
      changeTabId: "fullOrder/changeTabId", //切换tab
      Loginpage: "login/Loginpage", //改变登录页面状态
      getCookie: "system/getCookie", //获取用户cookie
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Mobileverion: "login/Mobilephoneverification" //用户没有登录 请先登录
    }),
    //闯关说明
    changeDescription(flag) {
      this.GameDescription = flag;
    },
    //转全阶
    Fullscalzhan(id) {
      this.getCookie();
      if (this.userstoken == null) {
        this.Mailboxlogin(false);
        this.Mobileverion(false);
        this.Loginpage(true);
        return;
      }
      this.isSend=false
      this.$refs.registrationflag.flagchange();
      this.prevmsg(id);
      this.isGive = 1;
      this.isTurnFull = true;
      // this.$router.push({
      //       name: "payment",
      //       query: {
      //       istype: 2,
      //       fullid: this.id,
      //       isTurnFull:true,
      //       orderType: 1,
      //       orderSNID:null
      //       }
      // });
    },
    //tab切换
    changeTab(tab, e) {
      this.changeTabId(tab.name);
    },
    //报名
    Fullscaleyou(id) {
      this.getCookie();
      if (this.userstoken == null) {
        this.Mailboxlogin(false);
        this.Mobileverion(false);
        this.Loginpage(true);
        return;
      }
      this.isSend=false
      // this.$refs.PerfectInformationflag.flagchange();
      this.$refs.registrationflag.flagchange();
      this.prevmsg(id);
      this.isGive = 1;
      this.isTurnFull = false;
    },
    //赠课
    Fullscalewho(id) {
      this.getCookie();
      if (this.userstoken == null) {
        this.Mailboxlogin(false);
        this.Mobileverion(false);
        this.Loginpage(true);
        return;
      }
      this.isSend=true//增课类型  
      this.$refs.registrationflag.flagchange();
      this.prevmsg(id);
      this.isGive = 4;
      this.isTurnFull = false;
    },
    //报名前提示
    prevmsg(id) {
      this.$axios.post("/course/purchasetips", {}).then(res => {
        this.Tips = res.result;
      });
      this.$axios
        .post("/course/purchaseagreement", { courseId: id, courseType: 1 })
        .then(res => {
          this.Agreement = res.result;
        });
    },
    //下单关闭  同意之后
    changedoing(type) {
      if (type == "info") {
        this.$refs.registrationflag.flagchange();
      } else if (type == "pay") {
        //是否需要完善信息    增课是不需要完善信息的
        if(this.isSend){
        this.linkdetail()
        }else{
          this.isneed();
        }
      }
    },
    //判断是否完善信息
    isneed() {
      this.$axios
        .post("/user/needcompleteuserinfo", { type: 1, token: "" })
        .then(res => {
          if (res.result) {
            this.$refs.PerfectInformationflag.flagchange();
          } else {
            this.linkdetail();
          }
        });
    },
    //下单
    // getlivedata() {
    //   this.$axios.post("/course/buyfull", {
    //     sourceId: 1,
    //     courseId: this.id,
    //     token: "",
    //     orderType: this.isGive,
    //   }).then(res=>{
    //     this.linkdetail(res);
    //   })
    // },
    //进入支付页面
    linkdetail(data) {
      this.$router.push({
        name: "payment",
        query: {
          istype: 2,
          fullid: this.id,
          isTurnFull: this.isTurnFull,
          orderType: this.isGive,
          orderSNID: null
        }
      });
    },
     //处理registrObj信息
    initRegistrObj(obj) {
      let registrObj={}
      if (obj.courseType == 1) {
        //直播
        registrObj.backTime = JSON.parse(obj.courseDynamicElement).coursePlaybackDays; //回放天数
        registrObj.studyEndTime = moment(JSON.parse(obj.courseDynamicElement).learnEndTime).format("YYYY年MM月DD日"); //学习截止日期
      } else {
        //录播
        //studyValidiyEnable: 是否永久有效
        registrObj.backTime = JSON.parse(obj.courseDynamicElement).studyValidiyEnable
          ? '不限'
          : Math.round(
              JSON.parse(obj.courseDynamicElement).studyValidityPeriod / 365
            ); //回放天数
      }
      this.registrObj=registrObj
    }
  },
  computed: {
    ...mapState({
      userstoken: state => state.system.token //用户token
    }),
    tabId: {
      //tabId
      get() {
        return this.$store.state.fullOrder.tabId;
      },
      set(newVal) {
        this.$store.state.fullOrder.tabId = newVal;
      }
    }
  },
  components: {
    FullOrderList, //包含课程
    FullIntroduce, //全阶介绍
    timer, //倒计时
    PerfectInformation, //完善个人信息
    registration,
    OriginaPrice,
    GameDescriptiondetail
  }
};
</script>
<style lang="less">
// .el-main{
//   background: rgb(248, 243, 238)
// }
.app-fullOrder-change-tab {
  .el-tabs__header.is-top {
    font-size: 18px;
    & > .el-tabs__nav-wrap.is-top > .el-tabs__nav-scroll {
      height: 50px;
    }
  }
  .el-tabs__active-bar {
    display: block !important;
    margin-left: 39.5%;
    // position: relative;
    width: 0 !important;
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
      border: 4px solid white;
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
      padding: 0 53px;
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
    // background-color: transparent !important;
    // background-size: contain !important;
    background: transparent url(~assets/img/tabs_after2.png) no-repeat -230px -362px !important;
  }
  .el-tabs__nav-wrap::after {
    bottom: 0 !important;
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
  font-size: 19px;
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
</style>