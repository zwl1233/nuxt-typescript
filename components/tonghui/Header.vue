<template>
  <section class="header">
    <div class="header_pic">
      <img src="~assets/img/logo.png" alt>
    </div>
    <ul class="header_link">
      <nuxt-link to="/" tag="li">首页</nuxt-link>
      <nuxt-link to="/classList?tabid=1" tag="li">课程</nuxt-link>
      <nuxt-link to="/Videosharing" tag="li">视频分享</nuxt-link>
      <nuxt-link to="/Libraryshop" tag="li">暄桐文房</nuxt-link>
      <!-- <nuxt-link to="/My" tag="li">我的作业 </nuxt-link>    -->
      <nuxt-link to="/about" tag="li">关于暄桐</nuxt-link>
      <li
        v-if="userstoken"
        @click="jumpMy('0','我的课程')"
        style="cursor:pointer;color:rgba(196, 165, 127, 1)"
      >我的课程</li>
    </ul>

    <div class="header_icon">
      <Signin ref="child"/>
      <!-- <Studydetail v-if="details"/> -->
      <div class="Landingregistration">
        <ul>
          <!-- <li>
              <span  @click="doing">学习详情</span>
          </li>-->
          <!-- <li>
              <span  @click="Landingregistration('WeChatscancode')">微信扫码</span>
          </li>-->
          <!-- <li>
              <span  @click="Landingregistration('Forgetpassword')">找回密码</span>
          </li>-->
        </ul>
      </div>
      <i class="el-icon-search" @click="search" style="margin-right:10px;transform:translateY(1px)"></i>
      <span
        @click="jumpMail"
        style="margin-right:10px;transform:translateY(1px)"
        class="app-header-mail"
      >
        <span class="app-header-mail-num" v-if="info.msgNum&&info.msgNum>0">{{info.msgNum}}</span>
        <!-- <i class="el-icon-bell"></i> -->
        <img
          :src="require('@/assets/changeIcon/26.png')"
          alt
          style="width:17px;height:17px;transform:translateY(3px);cursor:pointer"
        >
      </span>
      <div class="userModel app-userModel" v-if="userstoken">
        <img
          v-lazy="info.headUri"
          :key="info.headUri"
          alt
          style="border-radius: 50%;cursor:pointer;transform:translateY(3px)"
          class="userImg"
          @click="jumpMy('7','个人中心')"
        >
        <div class="changeclinx">
          <div class="userContent">
            <div class="userTitle">
              <div>
                <!-- @click="Landingregistration()" -->
                <img
                  :src="info.headUri"
                  :key="info.headUri"
                  @click="jumpMy('7','个人中心')"
                  alt
                  style="cursor:pointer;width:55px;height:55px"
                >
              </div>
              <div>
                <span
                  class="fz14 c30 app-nickName"
                  @click="jumpMy('7','个人中心')"
                  :title="info.nickName"
                >
                  {{info.nickName}}
                  <!-- 学习时长学习时长学习时长学习时长 -->
                </span>
                <span class="fz14 c30 userExit" @click="loginOut">退出</span>
                <!--  -->
                <p class="fz12 c4a5 fzGB1-0" v-if="info.studyPeriod>=0" style="clear:both;">
                  学习时长：
                  <time>{{info.studyPeriod||0}}</time>小时
                </p>
              </div>
            </div>
            <div class="userOrder">
              <ul>
                <!-- <li @click="jumpMy('0','我的课程')">
                  <span style="marginLeft:5px;">我的课程</span>
                </li>-->
                <li @click="jumpMy('2','我的作业')">
                  <span>我的作业</span>
                </li>
                <li @click="jumpMy('5','我的订单')">
                  <span>我的订单</span>
                </li>
                <li @click="jumpMy('4','我晒出的作业')">
                  <span>我晒出的作业</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span class="header-login" v-if="!userstoken">
        <span class="header-login-in" @click="Landingregistration()">登录</span>
        <span class="header-register" @click="newlogin()">注册</span>
      </span>
    </div>
    <BackTop :unReadNum="unReadNum"/>
    <wxCallback/>
  </section>
</template>
<script>
import Signin from "@/components/login/SINGNIN";
import BackTop from "@/components/BackTop";
import wxCallback from "@/components/login/wx/wxCallBack";

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Signin, //登录
    BackTop,
    wxCallback //微信回调  确认登录还是注册
  },
  data() {
    return {
      unReadNum: 0 // 未读消息
    };
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      info: state => state.my.info.info,
      code: state => state.wxin.code,
      state: state => state.wxin.state
    })
  },
  created() {
    // 微信回调时  隐藏code state
    if (this.$route.query.code) {
      this.changeCode(this.$route.query.code);
      this.changeState(this.$route.query.state);
      this.clearCookie(); //退出登录
      this.$router.push({
        pathname: "/"
      });
    }
    if (this.code) {
      if (this.state == "login") {
        this.wxCallback(this.code, this.state);
      } else if (this.state == "email") {
        //邮箱绑定
        let obj = JSON.parse(localStorage.getItem("storagelist"));
        localStorage.removeItem("storagelist");
        this.bindWx(obj,this.code,this.state);
      }
      this.changeCode("");
      this.changeState("");
    }

    if (this.$store.state.system.token) {
      this.$axios
        .post("/user/getuserinfo", {
          token: ""
        })
        .then(async res => {
          if (res.code == 0) {
            await this.getInfo(res.result);
            //  window.onload=()=>{
            this.bindCustomer();
            //  }
          }
        });
    } else {
      // window.onload=()=>{
      this.bindCustomer();

      // }
    }
  },
  mounted() {
    console.log(this.$refs.child, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    this.$refs.child.changgif(2);
  },
  methods: {
    ...mapMutations({
      getInfo: "my/info/getInfo", //获取个人信息
      getCookie: "system/getCookie", //获取用户cookie
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Mobileverion: "login/Mobilephoneverification", //用户没有登录 请先登录
      // changeDetails: "games/changeDetails", //学习详情  弃用
      clearCookie: "system/clearCookie", //退出登陆
      changeTabId: "my/changeTabId", //改变tabId
      chanaddtext: "my/chanaddtext",
      Loginpage: "login/Loginpage", //弹出登录框

      changeBingFlag: "wxin/changeBingFlag", //微信回调绑定绑
      changeCode: "wxin/changeCode", //微信回调code
      changeState: "wxin/changeState", //微信毁掉state
      changeWxInfo: "wxin/changeWxInfo" //微信资料
    }),
    Landingregistration() {
      this.getCookie();
      this.Mailboxlogin(false);
      this.Mobileverion(false);
      console.log(this.userstoken == null, "token");
      if (this.userstoken == null) {
        this.$refs.child.login();
      } else {
        console.log("123");
        this.changeTabId("0");
        this.$router.push({ name: "My" });
      }
    },
    newlogin(type) {
      //  this.$refs.child.bangshow();
      this.$refs.child.newloginshow();
    },
    //退出登陆
    loginOut(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue == false;
      }
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
      //清除cookie
      this.clearCookie();
    },
    search() {
      this.$router.push({
        name: "Search"
      });
    },
    jumpMail() {
      if (this.userstoken) {
        //跳转到站内信
        this.changeTabId("9");
        this.chanaddtext("站内信");
        this.$router.push("/My");
      } else {
        this.Loginpage(true);
      }
    },
    jumpMy(kind, type) {
      console.log(1, kind);
      //跳转到站内信
      this.changeTabId(kind);
      this.chanaddtext(type);
      this.$router.push("/My");
    },
    //绑定客服
    bindCustomer() {
      let that = this;
      var zhiManager = getzhiSDKInstance();
      zhiManager.on("load", function() {
        zhiManager.initBtnDOM();
      });
      zhiManager.set("color", "009487"); //设置主题色
      zhiManager.set("customBtn", true); //不使用系统默认的按钮
      let testObj = {
        等级: "VIP用户",
        客户状态: "意向客户",
        订单号: "12345667899",
        订单信息: "付费订单",
        customField2: "测试自定义"
      };
      //对接系统默认的字段
      zhiManager.set("userinfo", {
        tel: that.info.phoneNum, //电话或手机
        email: that.info.email, //邮箱
        uname: that.info.nickName, //昵称
        visitTitle: "", //对话页标题，若不传入系统将获取用户打开咨询组件时所在页面的标题
        visitUrl: "", //对话页URL，若不传入系统将获取用户打开咨询组件时所在页面的URL
        face: that.info.headUri, //头像URL
        realname: "", //真实姓名
        weibo: "", //微博账号
        weixin: "", //微信账号
        qq: "", //QQ号
        sex: that.info.sex, //0 男 1 女
        birthday: that.info.birthday, //生日，如“1990-01-01”
        params: JSON.stringify(testObj),
        remark: "备注一下",
        partnerId: that.info.userName //用户id  对接id
      });
      //自定义字段
      let customObj = {
        customField3: that.info.userOrderInfoResponseVo.courseName, //商品名称
        customField4: that.info.userOrderInfoResponseVo.courseType, //课程类型,
        customField5: that.info.userOrderInfoResponseVo.orderId, //订单编号
        customField7: that.info.userOrderInfoResponseVo.orderStatus, //订单状态
        customField8: that.info.userOrderInfoResponseVo.orderType, //订单类型
        customField9: that.info.userOrderInfoResponseVo.orderWay, //付款类型
        customField10: that.info.userOrderInfoResponseVo.paymentType, //支付方式
        customField11: that.info.userOrderInfoResponseVo.createTime, //下单时间
        customField11: that.info.userOrderInfoResponseVo.closeTime, //取消时间
        customField13: that.info.userOrderInfoResponseVo.finishTime //付款时间
      };
      console.log("自定义信息", JSON.stringify(customObj));
      zhiManager.set("customerFields", JSON.stringify(customObj));

      //   未读消息 只有在用户将窗口折起时，客服发送给用户的消息，这个事件才可以触发。
      zhiManager.on("receivemessage", function(ret) {
        //code write here ...
        /**
         * 返回格式：[{content:'您好',msgId:'615b0a3801804f14be1d456e11b329af',customName:'智齿科技'}]
         */
        console.log(ret, "未读消息内容");
      });
      //未读消息数
      zhiManager.on("unread.count", function(data) {
        console.log(data, "未读消息数");
        that.unReadNum = data;
      });
    },
    //存储cookie
    setCookie(name, value, day) {
      if (day !== 0) {
        //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
        console.log(date);
        document.cookie =
          name +
          "=" +
          escape(value) +
          ";expires=" +
          date.toUTCString() +
          ";path=/";
      } else {
        document.cookie = name + "=" + escape(value) + ";path=/";
      }
    },
    //微信登录+注册
    wxCallback(code, state) {
      this.$axios
        .post("wechat/pccallback", {
          state,
          code
        })
        .then(res => {
          if (res.code == 0) {
            if (res.result.loginSuccess) {
              //登录成功
              console.log(res.result.token);
              this.setCookie("userlogin", res.result.token, 7); //设置cookie
              history.go(0);
            } else {
              //没有该openId  需要注册
              this.changeWxInfo({
                openId: res.result.unionid,
                nickName: res.result.nickname,
                headimgurl: res.result.headimgurl
              });
              this.changeBingFlag(true);
            }
          }
        });
    },
    //邮箱+绑定微信注册
    bindWx(obj, code, state) {
      this.$axios.post("wechat/pcemailbindingwechat", {
        code: code,
        state: state,
        userRegisterByEmailVo: {
          email: obj.email,
          nickName: obj.emailname,
          newPassword: obj.emailpassword,
          newPasswordConfirm: obj.emailnewpassword,
          confirmCode: obj.emailVerionnumber,
          nowTime: new Date().valueOf()
        }
      }).then(res=>{
        if(res.code==0){
          this.setCookie("userlogin", res.result.token, 7); //设置cookie
          if(res.result.isLogin){
            localStorage.setItem("loginmsg",this.$selfMsg.loginSucess);
          }else{
            localStorage.setItem("loginmsg",this.$selfMsg.registerSucess);
          }
          history.go(0);
        }
      })
    }
  }
};
</script>
<style lang="less" >
.header {
  width: 100%;
  background: white;
  height: 72px;
  line-height: 72px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 3px 10px 0px rgba(136, 136, 136, 0.12);
  color: rgba(51, 51, 51, 1);
  // border-bottom: 5px solid red;
  .header_pic {
    float: left;
    display: flex;
    align-items: center;
    width: 250px;
    // height: 47px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header_link {
    font-size: 18px;
    // width: 700px;
    width: 745px;
    height: 72px;
    line-height: 72px;
    display: flex;
    // margin-left: -150px;
    justify-content: space-around;
    li {
      float: left;
      // width: 60px;
      text-align: center;
      cursor: pointer;
    }
  }
  .Landingregistration {
    position: absolute;
    font-size: 14px;
    color: #409eff;
    left: -200px;
    ul li {
      float: left;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .header_icon {
    padding-right: 30px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 17px;
    white-space: nowrap;
    .header_avator {
      display: inline-block;
      width: 45px;
      height: 45px;
      // overflow: hidden;
      border-radius: 50%;
      vertical-align: middle;
      // cursor: pointer;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover .header_avator_mask {
        display: flex;
      }
      .header_avator_mask {
        box-shadow: 0px 3px 10px 0px rgba(136, 136, 136, 0.12);
        display: none;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 200px;
        height: 250px;
        background: white;
        z-index: 5;
        left: -100px;
        top: 60px;
        font-size: 14px;
        // line-height: 250px;
        text-align: center;
        .header_avator_mask_loginout {
          width: 100%;
          height: 30px;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        &::before {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-bottom-color: #fff;
          left: 115px;
          top: -20px;
        }
      }
    }
    .header-login {
      font-size: 14px;
      color: #c4a57f;
      & > span {
        cursor: pointer;
      }
    }
    i {
      color: #c4a57f;
      margin-right: 0px;
      cursor: pointer;
    }
  }

  .userModel {
    position: relative;
    &:hover {
      .changeclinx {
        display: block;
      }
    }
    .changeclinx {
      display: none;
      width: 335px;
      min-height: 183px;
      position: absolute;
      right: 0px;
      // right: 50px;
      top: 60px;
      // background: red;
      // box-shadow: 0px 1px 10px 0px rgba(159, 159, 159, 0.17);
      border-radius: 4px;
      z-index: 22;
      // margin-top: 24px;
      // padding: 0px 27px 6px;
    }
    .userContent {
      display: block;
      width: 335px;
      min-height: 183px;
      position: absolute;
      right: 0px;
      // right: 50px;
      top: 0px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 10px 0px rgba(159, 159, 159, 0.17);
      border-radius: 4px;
      z-index: 22;
      // margin-top: 24px;
      padding: 0px 20px 0px;

      &::before {
        content: "";
        width: 0;
        height: 10px;
        position: absolute; /**注意⚠️一下**/
        top: -10px;
        right: 15px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }

      .userTitle {
        display: flow-root;
        line-height: 30px;
        margin-top: 33px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(196, 165, 127, 0.2);
        overflow: hidden;
        div {
          float: left;
          & > img {
            width: 55px;
            height: 55px;
            border-radius: 100px;
          }

          &:last-child {
            margin-left: 19px;
          }
        }
      }
      /**/
      .userOrder {
        display: flow-root;
        margin-top: 15px;
        // user-select: none;
        ul {
          overflow: hidden;
          li {
            font-size: 14px;
            font-family: FZLTXHJW--GB1-0;
            opacity: 0.6;
            margin-right: 15.7px;
            //
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 0px;
              height: 0px;
              top: 50%;
              left: 0px;
              margin-top: -5px;
              border-top: 5px solid transparent;
              border-bottom: 6px solid transparent;
              border-left: 9px solid #c4a57f;
            }
            width: 28%;
            float: left;
            padding-left: 12px;
            height: 37px;
            line-height: 38px;
          }
        }
      }
    }
  }
  .app-userModel {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    padding-top: 15px;
    width: 45px;
    height: 100px;
    line-height: 100px;
    text-align: left;
    box-sizing: border-box;
    .userImg {
      width: 45px !important;
      height: 45px !important;
    }
    .userExit {
      font-family: FZLTHK--GBK1-0;
      opacity: 0.7;
      cursor: pointer;
      float: right;
      &:hover {
        color: rgba(180, 152, 118, 1);
      }
    }
    .userOrder {
      & > ul > li {
        cursor: pointer;
        &:hover {
          color: rgba(180, 152, 118, 1);
        }
      }
    }
    .app-nickName {
      font-family: FZLTHK--GBK1-0;
      opacity: 0.8;
      width: 190px;
      cursor: pointer;
      display: block;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: rgba(180, 152, 118, 1);
      }
    }
  }
  .app-header-mail {
    position: relative;
    .app-header-mail-num {
      top: -5px;
      right: -5px;
      z-index: 1000;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: red;
      color: white;
      text-align: center;
      line-height: 14px;
      position: absolute;
      font-size: 8px;
    }
  }
}
.exact-active-link {
  color: rgba(7, 118, 122, 1);
}
// .active-link{
//   color: red!important;
// }
</style>
