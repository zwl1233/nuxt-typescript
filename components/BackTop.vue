<template>
  <div class="app-back-top">
    <ul>
      <li class="app-zwl-WXmodal">
        <!-- 微信弹出框 -->
        <!-- <i class="el-icon-download"></i> -->
        <img :src="require('@/assets/changeIcon/9.png')" alt>
        <div class="WXmodal-content">
          <img :src="require('@/assets/img/Qr_code.jpeg')" style="width:79px;height:79px">
        </div>
      </li>
      <li id="btn" class="app-zhichi zhiCustomBtn" @click="kf">
        <span class="app-unReadNum" v-if="unReadNum>0">{{unReadNum}}</span>
        <!-- 客服 -->
        <img :src="require('@/assets/changeIcon/10.png')" alt>
        <!-- <i class="el-icon-download"></i> -->
      </li>
      <li @click="backTop">
        <!-- 回到顶部 -->
        <img :src="require('@/assets/changeIcon/11.png')" alt>
        <!-- <i class="el-icon-download"></i> -->
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { formData } from "@/plugins/utils";

export default {
  data() {
    return {
      backTimer: null,
      // unReadNum: 0
    };
  },
  methods: {
    kf(){
      if(document.getElementById("zhichiBtnBox")){
        let box=document.getElementById("zhichiBtnBox")
        box.click()
      }
    },
    //回到顶部
    backTop() {
      this.bindEvent(true);
      let that = this;
      this.backTimer = setInterval(() => {
        let n = 0;
        let osTop =
         document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        osTop = osTop - 30;
        if (document.documentElement.scrollTop == 0) {
                    document.body.scrollTop = osTop;
                }
                else {
                    document.documentElement.scrollTop = osTop;        
                }
        // document.documentElement.scrollTop = osTop;
        if (osTop <= 0) {
          clearInterval(that.backTimer);
          this.bindEvent(false);
        }
      }, 10);
    },

    clear() {
      console.log("滚轮");
      clearInterval(this.backTimer);
      this.bindEvent(false);
    },

    addEvent(obj, xEvent, fn) {
      if (obj.attachEvent) {
        obj.attachEvent("on" + xEvent, fn);
      } else {
        obj.addEventListener(xEvent, fn, false);
      }
    },
    //绑定事件/取消取消事件
    bindEvent(flag) {
      if (flag) {
        //绑定事件
        if (document.addEventListener) {
          if (navigator.userAgent.indexOf("Firefox") >= 0) {
            // 火狐
            document.addEventListener("DOMMouseScroll", this.clear, false);
          } else {
            document.addEventListener("mousewheel", this.clear, false);
          }
        } else {
          window.onmousewheel = document.onmousewheel = this.clear;
        }
      } else {
        //取消事件
        if (document.addEventListener) {
          if (navigator.userAgent.indexOf("Firefox") >= 0) {
            // 火狐
            document.removeEventListener("DOMMouseScroll", this.clear, false);
          } else {
            document.removeEventListener("mousewheel", this.clear, false);
          }
        } else {
          window.onmousewheel = document.onmousewheel = null;
        }
      }
    },
    formData
  },
  props:["unReadNum"],
  computed: {
    ...mapState({
      token: state => state.system.token, //用户token
      userInfo: state => state.my.info.info
    })
  },
  mounted() {
    // if(!this.userInfo.studentId){//未登录客服
    // let that = this;
    //     var zhiManager = getzhiSDKInstance();
    //    zhiManager.on("load",function(){
    //      zhiManager.initBtnDOM()
    //    })
    //      zhiManager.set("color", "009487");
    //      zhiManager.set("customBtn", true); //不使用系统默认的按钮
    //       console.log(document.cookie);
    //       console.log("cookie");
    //       // if (that.token) {
    //       let testObj = {
    //         等级: "VIP用户",
    //         客户状态: "意向客户",
    //         订单号: "12345667899",
    //         订单信息: "付费订单",
    //         customField2: "测试自定义"
    //       };
    //       console.log(that.userInfo.nickName, "昵称。。。");
    //       //对接系统默认的字段
    //       zhiManager.set("userinfo", {
    //         tel: that.userInfo.phoneNum, //电话或手机
    //         email: that.userInfo.email, //邮箱
    //         uname: that.userInfo.nickName, //昵称
    //         visitTitle: "", //对话页标题，若不传入系统将获取用户打开咨询组件时所在页面的标题
    //         visitUrl: "", //对话页URL，若不传入系统将获取用户打开咨询组件时所在页面的URL
    //         face: that.userInfo.headUri, //头像URL
    //         realname: "", //真实姓名
    //         weibo: "", //微博账号
    //         weixin: "", //微信账号
    //         qq: "", //QQ号
    //         sex: that.userInfo.sex, //0 男 1 女
    //         birthday: that.userInfo.birthday, //生日，如“1990-01-01”
    //         params: JSON.stringify(testObj),
    //         remark: "备注一下",
    //         partnerId: that.userInfo.userName, //用户id  对接id
    //       });
    //       //自定义字段
    //       let customObj = {
    //         customField3: that.userInfo.userOrderInfoResponseVo.courseName, //商品名称
    //         customField4: that.userInfo.userOrderInfoResponseVo.courseType, //课程类型,
    //         customField5: that.userInfo.userOrderInfoResponseVo.orderId, //订单编号
    //         customField7: that.userInfo.userOrderInfoResponseVo.orderStatus, //订单状态
    //         customField8: that.userInfo.userOrderInfoResponseVo.orderType, //订单类型
    //         customField9: that.userInfo.userOrderInfoResponseVo.orderWay, //付款类型
    //         customField10: that.userInfo.userOrderInfoResponseVo.paymentType, //支付方式
    //         customField11: that.userInfo.userOrderInfoResponseVo.createTime, //下单时间
    //         customField11: that.userInfo.userOrderInfoResponseVo.closeTime, //取消时间
    //         customField13: that.userInfo.userOrderInfoResponseVo.finishTime //付款时间
    //       };
    //       console.log("自定义信息", JSON.stringify(customObj));
    //       zhiManager.set("customerFields", JSON.stringify(customObj));

    //       zhiManager.set("color", "009487");
    //       zhiManager.set("customBtn", true); //不使用系统默认的按钮

    //       //   未读消息 只有在用户将窗口折起时，客服发送给用户的消息，这个事件才可以触发。
    //       zhiManager.on("receivemessage", function(ret) {
    //         //code write here ...
    //         /**
    //          * 返回格式：[{content:'您好',msgId:'615b0a3801804f14be1d456e11b329af',customName:'智齿科技'}]
    //          */
    //         console.log(ret, "未读消息内容");
    //       });
    //       //未读消息数
    //       zhiManager.on("unread.count", function(data) {
    //         console.log(data, "未读消息数");
    //         that.unReadNum = data;
    //       });
    // }

  },
  watch: {
    // userInfo(newVal, oldVal) {
    //   console.log("更新", newVal, oldVal);
    //   if (newVal.studentId) {
    //     var zhiManager = getzhiSDKInstance();
    //     let that = this;
    //     // zhiManager.set('customTitle', "客服");
    //     zhiManager.on("load", function() {
    //       zhiManager.initBtnDOM();
    //       console.log(document.cookie);
    //       console.log("cookie");
    //       // if (that.token) {
    //       let testObj = {
    //         等级: "VIP用户",
    //         客户状态: "意向客户",
    //         订单号: "12345667899",
    //         订单信息: "付费订单",
    //         customField2: "测试自定义"
    //       };
    //       console.log(that.userInfo.nickName, "昵称。。。");
    //       //对接系统默认的字段
    //       zhiManager.set("userinfo", {
    //         tel: that.userInfo.phoneNum, //电话或手机
    //         email: that.userInfo.email, //邮箱
    //         uname: that.userInfo.nickName, //昵称
    //         visitTitle: "", //对话页标题，若不传入系统将获取用户打开咨询组件时所在页面的标题
    //         visitUrl: "", //对话页URL，若不传入系统将获取用户打开咨询组件时所在页面的URL
    //         face: that.userInfo.headUri, //头像URL
    //         realname: "", //真实姓名
    //         weibo: "", //微博账号
    //         weixin: "", //微信账号
    //         qq: "", //QQ号
    //         sex: that.userInfo.sex, //0 男 1 女
    //         birthday: that.userInfo.birthday, //生日，如“1990-01-01”
    //         params: JSON.stringify(testObj),
    //         remark: "备注一下",
    //         partnerId: that.userInfo.userName, //用户id  对接id
    //       });
    //       //自定义字段
    //       let customObj = {
    //         customField3: that.userInfo.userOrderInfoResponseVo.courseName, //商品名称
    //         customField4: that.userInfo.userOrderInfoResponseVo.courseType, //课程类型,
    //         customField5: that.userInfo.userOrderInfoResponseVo.orderId, //订单编号
    //         customField7: that.userInfo.userOrderInfoResponseVo.orderStatus, //订单状态
    //         customField8: that.userInfo.userOrderInfoResponseVo.orderType, //订单类型
    //         customField9: that.userInfo.userOrderInfoResponseVo.orderWay, //付款类型
    //         customField10: that.userInfo.userOrderInfoResponseVo.paymentType, //支付方式
    //         customField11: that.userInfo.userOrderInfoResponseVo.createTime, //下单时间
    //         customField11: that.userInfo.userOrderInfoResponseVo.closeTime, //取消时间
    //         customField13: that.userInfo.userOrderInfoResponseVo.finishTime //付款时间
    //       };
    //       console.log("自定义信息", JSON.stringify(customObj));
    //       zhiManager.set("customerFields", JSON.stringify(customObj));

    //       zhiManager.set("color", "009487");
    //       zhiManager.set("customBtn", true); //不使用系统默认的按钮

    //       //   未读消息 只有在用户将窗口折起时，客服发送给用户的消息，这个事件才可以触发。
    //       zhiManager.on("receivemessage", function(ret) {
    //         //code write here ...
    //         /**
    //          * 返回格式：[{content:'您好',msgId:'615b0a3801804f14be1d456e11b329af',customName:'智齿科技'}]
    //          */
    //         console.log(ret, "未读消息内容");
    //       });
    //       //未读消息数
    //       zhiManager.on("unread.count", function(data) {
    //         console.log(data, "未读消息数");
    //         that.unReadNum = data;
    //       });
    //       // }
    //     });
    //   }
    // }
  },
};
</script>
<style lang="less" scoped>
.app-back-top {
  position: fixed;
  top: 50%;
  right: 20px;
  z-index: 99;
  font-size: 30px;
  ul {
    li {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // background: rgba(221, 221, 221, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 50px;
      margin-bottom: 24px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .app-zhichi {
    position: relative;
    .app-unReadNum {
      position: absolute;
      font-size: 12px;
      color: #fff;
      width: 20px;
      height: 20px;
      background: red;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      left: 20px;
      top: -5px;
    }
  }

  // 微信弹出框
  .app-zwl-WXmodal {
    position: relative;
    &:hover .WXmodal-content {
      display: flex;
    }
    .WXmodal-content {
      display: none;
      position: absolute;
      left: -107px;
      top: -13px;
      width: 100px;
      height: 100px;
      background: #fff;
      justify-content: center;
      align-items: center;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 10px;
        position: absolute;
        top: 25px;
        right: -10px;
        border-left: 10px solid #fff;
        border-bottom: 10px solid transparent;
        border-top: 10px solid transparent;
      }
    }
  }
}
</style>


