<template>
  <section class="myordersection app-myordersection">
    <article class="m-auto" style="width:900px">
      <div class="mt-73">
        <div class="Orderuser_img">
          <span class="Orderuser_img_app">
          <img v-lazy="info.headUri" :key="info.headUri" alt>
          </span>
          <span class="fz14 app-change-name-name fzGB1-0" style="color:rgba(0,0,0,.7)" :title="info.nickName">{{info.nickName}}</span>
          <span  class="cb49 app-change-iconImg" style="margin-left: -33px;">
            <span class="fzGB1-0">{{addtext}}</span>
            <img src="~assets/changeIcon/19.png" alt="" style="width:18px!important;height:18px!important;" v-if="addtext=='我的课程'">
           <!-- <i class="el-icon-date iconfont-shufa" v-if="addtext=='我的作业'"></i>
           <i class="el-icon-date iconfont-shufa" v-if="addtext=='我晒出的作业'"></i> -->
             <img src="~assets/changeIcon/33.png" alt="" style="width:16px!important;height:16px!important" v-if="addtext=='我的作业'">
               <img src="~assets/changeIcon/33.png" alt="" style="width:16px!important;height:16px!important" v-if="addtext=='我晒出的作业'">
           <img src="~assets/changeIcon/20.png" alt="" style="width:16px!important;height:16px!important;margin-top:1px" v-if="addtext=='我的订单'">
           <img src="~assets/changeIcon/24.png" alt="" style="width:16px!important;height:16px!important;margin-top:1px" v-if="addtext=='站内信'">
           <img src="~assets/changeIcon/23.png" alt="" style="width:16px!important;height:16px!important;" v-if="addtext=='个人信息设置'">
           <img src="~assets/changeIcon/22.png" alt="" style="width:16px!important;height:16px!important;" v-if="addtext=='安全设置'">
            </span>

        </div>
        <div>
          <el-tabs
            :tab-position="tabPosition"
            class="leftClass-tab app-myordersection-tab"
            @tab-click="handleClick"
            v-model="tabId"
          >
            <el-tab-pane label="我的课程" name="0" names="我的课程">
              <Mycourse v-if="tabId=='0'"/>
            </el-tab-pane>
            <el-tab-pane label="我的作业" name="2">
              <Myhomework v-if="tabId=='2'"/>
            </el-tab-pane>
            <el-tab-pane label="我晒出的作业" name="4">
              <HomeworkIdoneithesun v-if="tabId=='4'"/>
            </el-tab-pane>
            <el-tab-pane label="我的订单" name="5">
              <Myorder v-if="tabId=='5'"/>
            </el-tab-pane>
            <!-- <el-tab-pane label="退款管理" name="6">
              <Refundmanagement v-if="tabId=='6'"/>
            </el-tab-pane> -->
            <el-tab-pane class="Bask_homework PostedHomework" label="站内信" name="9">
              <mail v-if="tabId=='9'"/>
            </el-tab-pane>
            <el-tab-pane label="个人信息设置" name="7">
              <Personalinformation v-if="tabId=='7'"/>
            </el-tab-pane>
            <el-tab-pane label="安全设置" name="8">
              <securitysetting v-if="tabId=='8'"/>
            </el-tab-pane>
            <!-- <el-tab-pane class="Bask_homework PostedHomework" label="站内信" name="9">
              <mail v-if="tabId=='9'"/>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </article>
  </section>
</template>
<script>
import Mycourse from "@/components/My/Mycourse";
import Myhomework from "@/components/My/Myhomework";
import HomeworkIdoneithesun from "@/components/My/HomeworkIdoneithesun";
import Myorder from "@/components/My/Myorder/index";
import Refundmanagement from "@/components/My/Refundmanagement"; //弃用
import Personalinformation from "@/components/My/Personalinformation"; //个人信息
import securitysetting from "@/components/My/securitysetting";

import mail from "@/components/My/mail";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  asyncData(app) {
    console.log(app.store.state.my.tabId, "是多少");
    if (!app.store.state.system.token) {
      app.redirect("/");
    }
  },
  components: {
    Mycourse, //我的课程
    Myhomework, //我的作业
    HomeworkIdoneithesun, //我晒过的作业
    Myorder, //我的订单
    Refundmanagement, //退款管理
    Personalinformation, //个人信息
    securitysetting, //安全设置
    mail, //站内信
  },
  data() {
    return {
      tabPosition: "left",
      addindex: "我的课程"
    };
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info,
      addtext: state => state.my.addtext
    }),
    //tabId
    tabId: {
      get() {
        return this.$store.state.my.tabId;
      },
      set(newVal) {
        console.log(newVal, 11);
        this.$store.state.my.tabId = newVal;
      }
    }
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    ...mapMutations({
      getInfo: "my/info/getInfo", //获取个人信息
      changeTabId: "my/changeTabId", //改变tabId
      chanaddtext: "my/chanaddtext"
    }),
    //切换tab
    handleClick(tab, event) {
      // if()
      this.chanaddtext(tab.label);
      // this.addindex = tab.label;
      console.log(tab.name, "????????????????");
      this.changeTabId(tab.name);
    },
    //个人信息
    async getinfo() {
      let data = await this.$axios.post("/user/getuserinfo", {
        token: ""
      });
      console.log(data, "信息");
      if (data.code == 0) {
        this.getInfo(data.result);
      }
    }
  }
};
</script>

<style lang="less">
.Orderuser_img_app{
  width:55px;
  height: 55px;
  border-radius: 50%;
  display: block;
}

.app-myordersection {
  .app-change-name-name{
      display:inline-block;
      width:150px;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-right: 24px;
}
  min-height: 600px;
  .app-myordersection-tab {
    & > .el-tabs__header.is-left {
      & > .el-tabs__nav-wrap.is-left {
        &::after{
          height:120%;
        }
        & > .el-tabs__nav-scroll {
          & > .el-tabs__nav.is-left {
            &>.el-tabs__active-bar.is-left{
              border: 4px solid RGBA(234, 224, 213, 1)!important;

            }
            & > #tab-4 {
              height: 62px;
              // margin-bottom: 70px
            }
            & > #tab-9 {
              // margin-bottom: 70px;
              height: 62px;
            }
          }
        }
      }
    }

  }
  .app-change-iconImg{
    &>img{
      width: 24px!important;
    height: 24px!important;
    border-radius: 0!important;
    vertical-align: text-top!important;
    }
  }
}
.el-main {
  background: white;
}

.myordersection {
      padding-bottom: 40px ;
  .afters {
    width: 100%;
    text-align: center;
    margin-top: 103px !important;
  }
  // padding-bottom: 20px;
  .leftClass-tab .is-left .el-tabs__active-bar {
    width: 20px !important;
    height: 20px !important;
    border: 4px solid white;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  /*** 我的课程-公用less ***/

  /** 我的作业-公用less **/

  /*** 个人中心-单据为空 ***/
  .null-My_discussion {
    width: 110px;
    margin: 130px auto 40px;
    padding-left: 65px;
  }
  .null-My_discussion img {
    display: block;
    width: 100%;
    height: 76px;
  }
  .null-My_discussion p {
    margin-top: 26px;
  }
  /** 级联选项-国内外 **/
  .home-select {
    width: 310px;
    height: 340px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 5px 59px 0px rgba(14, 5, 10, 0.05);
    border-radius: 3px;
    padding: 27px 34px 34px;
  }

  /********* MyOrder **********/
  .Order_list-content {
    position: relative;
    padding-bottom: 0px;
  }
  // .app-couse-list-count .app-zhuan-full::after {
  //   content: url(~assets/img/order_divider.png);
  //   width: 100%;
  //   margin: 0px auto;
  //   display: inline-block;
  //   text-align: center;
  //   // margin-top: 33px;
  //   margin-top: 23px;
  // }
  // .Order_list-content::after {
  //   // content: url(~assets/img/order_divider.png);
  //   content: "";
  //   background: url("~assets/img/order_divider.png") no-repeat;
  //   width: 100%;
  //   height: 30px;
  //   background-size:cover; 
  //   margin: 0px auto;
  //   display: inline-block;
  //   text-align: center;
  //   // margin-top: 33px;
  //   // margin-top: 8px;
  // }
  .Order_list-content div.clear {
    margin-bottom:10px;
    margin-top: 35px;
  }
  .Order_list-content div.clear h4 {
    margin-bottom: 15px;
  }
  .Order_list-content div.clear span.pos_a {
    right: 0px;
    top: 7px;
  }
  .Order_list-content div.clear time.c7271 span {
    position: relative;
    padding-right: 19px;
    margin-right: 15px;
  }
  .Order_list-content div.clear time.c7271 span::after {
    content: "";
    width: 1px;
    display: inline-block;
    background: #c4a57f;
    height: 12px;
    right: 0px;
    top: 4px;
    position: absolute;
  }
  .Order_list-content div.clear time.c7271 span:last-child::after {
    display: none;
  }
  .define-tabsOrder_list {
    margin-left: 66px;
  }
  .define-tabsOrder_list .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
  .Order_list-content-img {
    width: 202px;
    height: 114px;
  }
  .Order_list-content-img img {
    width: 203px;
    height: 100%;
  }
  .Order_list-content-text {
    margin-left: 30px;
    width: 100%;
  }
  // .Order_list-content-text div:first-child {
  //   margin-top: 32px;
  // }
  .Order_list-content-text div:first-child p {
    margin-bottom: 10px;
  }
  .Order_list-content-text div:first-child time {
    position: relative;
    top: 10px;
  }
  .Order_list-content-text div:last-child {
    width: 145px;
    float: right;
    padding: 6px 0px;
  }
  .Order_list-content-text div:last-child button:first-child {
    margin-bottom: -10px !important;
  }
  .Order_list-content-text div:last-child button {
    margin-bottom: 23px;
  }
  .Order_list-content-text div:last-child button:last-child {
    margin-bottom: 0px;
  }
  .Orderuser_img {
    height: 55px;
    line-height: 55px;
    margin-bottom: 31px;
    padding-left: 20px;
  }
  .Orderuser_img img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .Orderuser_img span {
    display: inline-block;
    vertical-align: top;
    // margin-left: 7px;
  }
  .leftClass-tab {
    /*** 安全设置 ***/
    /** 个人信息 ***/
  }
  .leftClass-tab .el-tabs__content div > blockquote.cb49 {
    margin-left: 65px;
  }
  .leftClass-tab .el-collapse.SecuritySettings {
    border-top: 0px;
  }
  .leftClass-tab .SecuritySettings .Operation_change {
    width: 80%;
    margin-left: 51px;
  }
  .leftClass-tab .SecuritySettings {
    /** +86 宽度更改 **/
    /** 获取验证码 宽度更改 **/
    /*** end ***/
  }
  .leftClass-tab .SecuritySettings .el-collapse-item__header {
    border-bottom-color: rgba(196, 165, 127, 0.2);
  }
  .leftClass-tab .SecuritySettings .el-collapse-item__header.is-active {
    border-bottom: 1px dashed rgba(196, 165, 127, 0.2);
    // background: red;
  }
  .leftClass-tab .SecuritySettings .el-collapse-item__wrap {
    border-bottom: 0px;
  }
  .leftClass-tab .SecuritySettings .Message-verify .el-input {
    width: 90%;
  }
  .leftClass-tab .SecuritySettings .Message-verify .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  .leftClass-tab .SecuritySettings .Message-verify .btn-verify {
    width: 139px;
    height: 40px;
    color: #000;
    margin-left: 10px;
    font-size: 14px;
    border: 0px;
    border-radius: 3px;
    background: rgba(196, 165, 127, 0.34);
  }
  .leftClass-tab .SecuritySettings .user-item {
    margin-bottom: 15px;
  }
  .leftClass-tab .SecuritySettings .btn-login {
    width: 310px;
    height: 36px;
    background: #c4a57f;
    border-radius: 3px;
    border: 0px;
    color: #fff;
    font-size: 18px;
  }
  .leftClass-tab .SecuritySettings .input-border {
    display: flex;
  }
  .leftClass-tab .SecuritySettings .input-border > label {
    display: inline-block;
    width: 140px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    margin-right: 16px;
    text-align: right;
  }
  .leftClass-tab .SecuritySettings .input-border div {
    width: 100%;
  }
  .leftClass-tab .SecuritySettings .input-border div .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  .leftClass-tab .SecuritySettings .input-border div .el-input-group__prepend {
    border-color: rgba(196, 165, 127, 0.3);
    background: #fff;
  }
  .leftClass-tab .SecuritySettings .input-border div .el-input__inner {
    width: 310px;
    height: 36px;
    border: 1px solid rgba(196, 165, 127, 0.3);
    border-radius: 3px;
  }
  .leftClass-tab .SecuritySettings .el-input-group--prepend .el-input__inner {
    width: 243px !important;
  }
  .leftClass-tab .SecuritySettings .el-input--suffix {
    width: 200px !important;
  }
  .leftClass-tab .SecuritySettings .el-input--suffix + button.btn-verify {
    width: 100px;
  }
  .leftClass-tab .SecuritySettings .SecuritySettings-content {
    width: 426px;
    margin: 0px auto;
    margin-top: 35px;
    margin-bottom: 65px;
  }
  .leftClass-tab .SecuritySettings .user-item > label {
    display: inline-block;
    width: 140px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    margin-right: 16px;
    text-align: right;
  }
  .leftClass-tab .SecuritySettings .user-item > .Message-verify {
    width: 310px;
  }
  .leftClass-tab .PersonalInformation-head {
    margin-top: 64px;
  }
  .leftClass-tab .PersonalInformation-head > img {
    width: 115px;
    height: 115px;
    border-radius: 50%;
  }
  .leftClass-tab .PersonalInformation-head > span {
    display: inline-block;
    vertical-align: top;
    margin-left: 17px;
    height: 115px;
    line-height: 115px;
  }
  .leftClass-tab .PersonalInformation-head > div > img {
    padding-right: 70px;
    width: 23px;
    height: 23px;
  }
  .leftClass-tab .PersonalInformation-content .Message-verify .el-input {
    width: 90%;
  }
  .leftClass-tab .PersonalInformation-content .Message-verify .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  .leftClass-tab .PersonalInformation-content .Message-verify .btn-verify {
    width: 139px;
    height: 40px;
    color: #000;
    margin-left: 10px;
    font-size: 14px;
    border: 0px;
    border-radius: 3px;
    background: rgba(196, 165, 127, 0.34);
  }
  .leftClass-tab .PersonalInformation-content .btn-login {
    width: 310px;
    height: 36px;
    background: #c4a57f;
    border-radius: 3px;
    border: 0px;
    color: #fff;
    font-size: 18px;
  }
  .leftClass-tab .PersonalInformation-content .PersonalInformation-item {
    width: 426px;
    margin: 0px auto;
    margin-top: 16px;
    margin-bottom: 10px;
    /*** 所在地级联菜单 ***/
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border {
    margin-bottom: 15px;
    display: flex;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border
    > label {
    display: inline-block;
    width: 140px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    margin-right: 16px;
    text-align: right;
    font-family:MicrosoftYaHei 
  }
  .leftClass-tab
    .PersonalInformation-content 
    .PersonalInformation-item
    .input-border
    > label
    + span {
    height: 36px;
    line-height: 36px;
    display: inline-block;
    width: 100%;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border
    > label
    + div {
    width: 100%;
    height: 36px;
    line-height: 36px;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border
    div
    .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border
    div
    .el-input-group__prepend {
    border-color: rgba(196, 165, 127, 0.3);
    background: #fff;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .input-border
    div
    .el-input__inner {
    width: 310px;
    height: 36px;
    border: 1px solid rgba(196, 165, 127, 0.3);
    border-radius: 3px;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content {
    border-top: 1px solid rgba(180, 152, 118, 0.2);
    margin-top: 20px;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs__nav-scroll {
    overflow: inherit !important;
    height: 224px;
    border-right: 1px solid rgba(180, 152, 118, 0.2);
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs__nav {
    text-align: center;
    width: 100%;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs--left
    .el-tabs__item.is-left {
    width: 98px;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs__item {
    font-size: 14px;
    color: #333;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs__active-bar {
    display: block;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    .el-tabs__item.is-active::after {
    display: none;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    div.el-tabs__content
    ul {
    float: left;
    width: 200px;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    div.el-tabs__content
    ul
    li {
    padding-left: 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    float: left;
  }
  .leftClass-tab
    .PersonalInformation-content
    .PersonalInformation-item
    .home-content
    div.el-tabs__content
    ul
    li
    a {
    color: #727172;
  }
  /** MyOrder-end **/
  .Class_list-content {
    margin-top: 58px;
  }

  .Class_list-content > .Class_list-content-img img {
    width: 488px;
    height: 276px;
  }

  .Class_list-content > .Class_list-content-img > span img {
    width: 40px;
    height: 40px;
    /* border: 3px solid #fff; */
    position: absolute;
    display: inline-block;
    left: -30px;
    top: -30px;
    border-radius: 50%;
    /* background: #C4A57F;
    color: #fff; */
    text-align: center;
    /* line-height: 20px;
    padding-top: 3px; */
  }

  .Class_list-content-text {
    vertical-align: top;
    margin-top: -5px;
    margin-left: 32px;
    width: 345px;
    height: 276px;
  }

  .Class_list-content-text > h3 {
    margin-bottom: 9px;
  }
  .Class_list-content-text > h3 + p {
    margin-bottom: 12px;
  }

  .Class_list-content-text > ul li {
    width: 50%;
    /* display: inline-block; */
    float: left;
  }

  .toll {
    width: 100%;
    bottom: 0px;
    border-top: 1px solid #ddd7d1;
    padding-top: 30px;
  }
  .toll::before {
    content: "";
    position: absolute;
    width: 0;
    height: 10px;
    position: absolute; /**注意⚠️一下**/
    top: 12px;
    right: 62px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #c4a57f;
    opacity: 0.5;
  }

  .toll > time {
    margin-top: 20px;
  }

  .toll > div:last-child {
    width: 140px;
    float: right;
  }

  .toll > div:first-child {
    position: absolute;
    bottom: 0px;
  }

  .toll > div:first-child output {
    margin-bottom: 6px;
  }

  .toll > div:first-child strong {
    margin-bottom: 21px;
  }

  .toll > div:last-child .btn-yellow-border {
    margin-top: 22px;
  }

  /**/
  .Class_list-carousel {
  }

  .Class_list-carousel {
    position: relative;
    margin-bottom: 90px;
    padding-bottom: 40px;
    /* box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05) */
    box-shadow: 0 4px 59px -17px rgba(14, 5, 10, 0.05);
  }

  .Class_list-carousel::after {
    content: url(~assets/img/People_write-left.png);
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: -3.125rem;
  }

  .Class_list-carousel::before {
    content: url(~assets/img/People_write-right.png);
    position: absolute;
    right: -3.125rem;
    top: 50%;
    margin-top: -11px;
  }

  .Class_list-carousel li {
    margin-top: 51px;
    width: calc(25% - 3px);
    border-right: 1px solid #dcc9b2;
    padding: 0px 30px;
  }

  .Class_list-carousel li:first-child {
    padding-left: 0px;
  }

  .Class_list-carousel li:last-child {
    border-right: 0;
  }

  /**/

  .Class_list-carousel li span.dis_block span.pos_a {
    right: 0px;
  }

  .Class_list-carousel li span.dis_block a:nth-child(1) {
    border-left: 0;
  }

  .Class_list-carousel li span.dis_block a {
    color: #000;
    border-left: 1px solid #000;
    padding: 0px 5px 0px 8px;
  }

  .Class_list-carousel li span.dis_block span.c4a5 a {
    color: #c4a57f;
    border-color: #c4a57f;
  }

  /* .Class_list-content >.Class_list-content-img >span.lb_class{
    background: #ea9c91;
} */

  /*** 覆盖element-ui tabs **/
  .define-tabsClass_List {
  }

  .define-tabsClass_List .el-tabs__nav-scroll {
    overflow: hidden;
    height: 54px;
  }

  .define-tabsClass_List .el-tabs__item {
    font-size: 18px;
  }

  .define-tabsClass_List .el-tabs__item.is-active {
    color: #c4a57f;
    position: relative;
  }

  .define-tabsClass_List .el-tabs__item.is-active::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -8px;
    bottom: -16px;
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }

  /**灰色线**/
  .define-tabsClass_List .el-tabs__nav-wrap::after {
    bottom: 5px !important;
    height: 1px !important;
    background-color: #e5dcd2;
  }

  .define-tabsClass_List .el-tabs__item:hover {
    color: #c4a57f;
  }

  .define-tabsClass_List .el-tabs__nav {
    text-align: center;
    width: 100%;
    height: 52px;
  }

  /*active - --**/
  .define-tabsClass_List .el-tabs__active-bar {
    display: none;

    /*     
    width: 13px  !important;
    height: 13px;
    background: #C4A57F;
    border-radius: 50%;
    display: inline-block;
     */
  }

  .define-tabsClass_List .iconfont-shufa {
  }
}
</style>
