<template>
  <article class="w1140 m-auto paymentarticle">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mt-40 dis_in_block fzGB1-0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/classList' }">课程列表</el-breadcrumb-item>
      <el-breadcrumb-item>支付</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="w1000 m-auto">
      <div class="fz18 cb19 fonS" style="font-weight:bold;marginTop:45px">订单信息</div>
      <!-- 课程信息 -->
      <div class="Class_list-content">
        <div class="dis_in_block pos_r Class_list-content-img">
          <span class="pos_a">
            <img
              :src="cousedetail.courseType==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
              alt
            >
          </span>
          <img v-lazy="cousedetail.coursePictureUri" alt>
        </div>
        <div class="dis_in_block pos_r Class_list-content-text">
          <h3 clas="fonS">
            <samp class="fz24">
              <!-- 第一阶<span class="c998">|</span> -->

              <!-- <span class>{{cousedetail.sortName}}  |  {{cousedetail.courseName}}</span> -->
              <span class="fonS app-elils-span">{{cousedetail.courseName}}</span>
              <!-- <span class="fz16 c9" style="position:absolute;top: 5px;">（章节数 - {{cousedetail.classHourCount}}节）</span> -->
            </samp>
          </h3>
          <p class="c4a5 fz16 fzGB1-0" v-if="istype==2">{{cousedetail.courseTitle}}</p>
          <p
            class="c4a5 fz16 app-couse-yichu fzGB1-0"
            v-if="istype==1"
          >{{cousedetail.courseSubtitle}}</p>
          <ul class="fz14 fl">
            <li class="Finepitch">
              <!-- <label class="c9" v-if="istype==2">原学费：</label>
              <s class="c3" v-if="istype==2">{{cousedetail.courseFullPrice}}元</s>-->
              <OriginaPrice
                text="原学费"
                class="fonH"
                :num="cousedetail.courseFullPrice"
                v-if="istype==2"
              />
              <p style="margin-top:8px;display:flex;align-items:center">
                <strong class="c097 fz28" v-if="istype==2">{{cousedetail.payPrice>0?this.picsss:0}}元</strong>
                <strong
                  class="c097 fz34 fzSTHeitiSC-um"
                  v-else
                >{{cousedetail.courseFullPrice>0?cousedetail.courseFullPrice:0}}元</strong>
                <span
                  class="chapter fzGB1-0"
                  style="margin-left:15px;color:#999999"
                >共{{cousedetail.classHourCount}}课</span>
                <span class="app-change-classList-status">{{cousedetail.statusName}}</span>
              </p>
            </li>
          </ul>
          <!-- <div class="pos_a pay_money">
            <div class>
              <strong class="c097 dis_block fz34" style="marginBottom:15px">
                <price v-if="cousedetail.courseFullPrice==0||cousedetail.courseFullPrice" :number="cousedetail.courseFullPrice"/>
              </strong>
            </div>
          </div>-->
        </div>
      </div>
      <!-- 包含课程 -->
      <article class="Contains-course" v-if="cousedetail.courseSingleResponseVos">
        <p class="fz18 cb19 mb-30 fonS" style="font-weight:bold;font-size:18px;">课程组成</p>
        <ul class="app-zwl-Contains-course-list">
          <li v-for="(item,index) in cousedetail.courseSingleResponseVos" :key="index">
            <div :class="{activegif:item.isGray}">
              <div>
                <img v-lazy="item.coursePictureUri" alt>
              </div>
              <div class="app-zwl-Contains-course-list-div">
                <p class="fz16 c3 fzGB1-0" style="marginTop:10px">{{item.courseName}}</p>
                <p style="marginTop:10px">
                  <span class="c097 fzSTHeitiSC-um">{{item.courseFullPrice}}元</span>
                  <span style="float:right">
                    <span class="fz12 c9 fzGB1-0">共{{item.classHourCount}}课</span>
                    <span class="fz12 c9 fzGB1-0">{{item.statusName}}</span>
                  </span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </article>
      <!-- 订单信息 -->
      <div class="pay-content">
        <!-- 赠课人信息 -->
        <div class="pay-item" v-if="this.orderType==4" style="marginBottom:30px;">
          <p class="fz18 cb19 fonS" style="font-weight:bold;">请填写Ta的信息</p>
          <div class="user-item input-border">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              :validate-on-rule-change="true"
              @submit.native.prevent
            >
              <el-form-item prop="phone" class="el-from-ml100 fzGB1-0">
                <el-input
                  :disabled="isEdit"
                  @blur="bian"
                  v-model="ruleForm.phone"
                  placeholder="Ta的手机号"
                ></el-input>
                <!-- <span>学员昵称：JiaNee</span> -->
              </el-form-item>
            </el-form>
            <span v-if="gifname" class="fz14 c3 fonH" style="opacity:0.8;">Ta在暄桐的昵称：{{gifname}}</span>
          </div>
        </div>
        <div class="pay-item">
          <p class="fz18 cb19 fonS" style="font-weight:bold;">选择支付方式</p>
          <div class="Pay_treasure-WeChat">
            <!-- content: "\E639";  对号   -->
            <!-- class="dis_in_block" -->
            <span
              v-if="!Alipayflag"
              :class="{active:Alipayflag}"
              style="cursor:pointer;border:none;"
              @click="changeflag('Y') "
            >
              <img :src="require('@/assets/img/支付宝-1@2x.png')" alt>
            </span>
            <span v-else style="border:none;cursor:pointer;">
              <img :src="require('@/assets/img/支付宝@2x.png')" alt>
            </span>
            <span
              v-if="!WeChatflag"
              :class="{active:WeChatflag}"
              style="cursor:pointer;border:none;"
              @click="changeflag('W')"
            >
              <img :src="require('@/assets/img/微信-1@2x.png')" alt>
            </span>
            <span v-else style="border:none;cursor:pointer;">
              <img :src="require('@/assets/img/微信支付@2x.png')" alt>
            </span>
          </div>
        </div>
        <p
          class="fz14 c9 fzGB1-0"
          style="marginTop:10px;"
          v-if="istype==2"
        >原学费：{{cousedetail.courseFullPrice}}元</p>
        <p
          class="fz14 c9 fzGB1-0"
          style="marginTop:10px;"
          v-if="istype==2"
        >优惠：{{cousedetail.courseDiscountPrice&&cousedetail.courseDiscountPrice}}元</p>
        <p
          class="fz14 c9"
          style="marginTop:10px;marginBottom:40px"
          v-if="istype==2"
        >已支付学费扣减：{{cousedetail.singlePrice}}</p>
        <div class="Total_amount fonH">
          <span class="fz16 c9">需付学费：</span>
          <strong class="fz24 cb19 dis_block" v-if="this.picsss">
            {{this.picsss>0?this.picsss:0}}元
            <!-- <price v-if="this.picsss==0||this.picsss" :number="this.picsss"/> -->
          </strong>
          <!-- <output
            v-if="istype==2"
            class="fz14 c9"
          >（优惠金额{{cousedetail.courseDiscountPrice&&cousedetail.courseDiscountPrice}}元）</output>-->
        </div>
        <div>
          <button class="btn-Agreed fzGB1-0" @click="istypepay" style="cursor:pointer;">支付</button>
        </div>
      </div>
      <el-dialog
        :visible="doingflag"
        custom-class="pay-tip-modal app-change-class-tabs"
        center
        @opened="modelOpen"
        :before-close="close"
      >
        <div class="pay-tip-div">
          <div class="fzGB1-0">微信支付</div>
          <p class="fzGB1-0">
            <span style="font-size:12px;">应付：</span>
            <span style="font-size:18px;color:#BAA182">{{this.picsss&&this.picsss}}元</span>
            <!-- <price style="display:inline-block" :number="this.picsss&&this.picsss"/> -->
          </p>
          <div id="qrcode" ref="paySuccess"></div>
          <p class="fzGB1-0" style="padding-left: 19px;margin-bottom: 12px;">使用微信扫描二维码进行支付</p>
          <p
            class="fzGB1-0"
            style="margin-top: 10px;cursor:pointer;color:#BAA182;padding-left: 19px;"
            @click="close"
          >重新选择支付方式</p>
        </div>
      </el-dialog>
      <div id="box"></div>
    </div>
  </article>
</template>

<script>
import QRCode from "qrcodejs2";
import { validgifPhone, Verionesuc } from "@/plugins/utils.js";
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件
import price from "@/components/price"; //价格小数点
import OriginaPrice from "@/components/originalPrice";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    timer, //定时器组件
    price,
    OriginaPrice
  },
  async asyncData(api) {},
  data() {
    return {
      datares: null,
      dataresflag: null, //没用
      orderType: null, //订单类型
      orderSNID: null, //订单id
      ruleForm: {
        phone: ""
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", validator: this.validgifPhone } //这里需要用到全局变量
        ]
      },
      orderdetail: [], //订单详情
      Alipayflag: true, //class支付宝
      WeChatflag: false, //class微信
      paytype: 2, //支付类型 1:微信  2:支付宝
      giftPhoneNum: "", //赠课他手机号
      doingflag: false, //支付中
      doingtext: true, //是否支付完成
      picsss: null, //价格
      orderid: null, //订单id
      istype: null, //单阶全阶
      cousedetail: [], //课程展示详情
      fullid: null, //课程id
      text: null, //没用
      timeropen: null, //定时器
      paytypelist: null, //支付方式列表
      gifname: null,

      //针对转全阶前 已购买单阶的标记
      isTurnFull: false,
      singleIds: null, //已购买单阶ID数组

      isEdit: false //是否可修改  已经生成的订单  不可修改
    };
  },
  computed: {
    ...mapState({
      isGive: state => state.classlist.isGive, //是否是赠课
      selfPhone: state => state.my.info.info.phoneNum //本人手机号
    })
  },
  mounted() {
    this.isnewsousechange(false);
    //订单参数
    this.ruleForm.phone = this.$route.query.typenumber;
    this.gifname = this.$route.query.nickName;
    if (this.$route.query.nickName) {
      this.isEdit = true;
    }
    this.orderid = this.$route.query.orderid; //订单id
    this.orderType = this.$route.query.orderType; //赠课还是自己买
    this.istype = this.$route.query.istype; //单阶还是全阶
    this.fullid = this.$route.query.fullid; //课程id
    this.isTurnFull = this.$route.query.isTurnFull; //是否转全阶
    this.orderSNID = this.$route.query.orderSNID;
    this.paylist();
    this.getfororder();
    // this.getdetail()
  },
  methods: {
    modelOpen() {
      this.$refs.paySuccess.innerHTML = "";
      new QRCode(this.$refs.paySuccess, this.datares);
    },
    validgifPhone,
    ...mapMutations({
      isnewsousechange: "login/isnewsousechange" //注册手机号查询是否存在
    }),
    //订单详情
    getdetail() {
      this.$axios
        .post("/order/detail", {
          orderId: this.orderid, //
          token: ""
        })
        .then(res => {
          console.log(res.result, "orderlist");
          this.orderdetail = res.result;
        });
    },
    //订单展示详情
    getfororder() {
      let isgif;
      let phoneNum;
      if (this.orderType == 4) {
        isgif = true;
        phoneNum = this.ruleForm.phone;
      } else {
        isgif = false;
        phoneNum = this.ruleForm.phone;
      }
      //istype:1 单阶  2:全阶
      if (this.istype == 2) {
        this.$axios
          .post("/course/fulldetailfororder", {
            courseFullId: this.fullid,
            token: "",
            isTurnFull: this.isTurnFull,
            isGift: isgif,
            phoneNum: phoneNum
          })
          .then(res => {
            this.cousedetail = res.result;
            //判断是否转全阶  singlePrice:全阶下的已购买单阶价格 (减免)
            if (res.result.singlePrice && res.result.singlePrice > 0) {
              this.isTurnFull = true;
            }
            //singleIds 为全阶下已购买的单阶id
            //存在且为数组的情况下进行赋值
            //如不存在  或为空数组  则为null
            if (
              res.result.singleIds &&
              res.result.singleIds instanceof Array &&
              res.result.singleIds.length > 0
            ) {
              this.singleIds = res.result.singleIds.join(","); //已购买的单阶id
            }

            this.picsss = this.cousedetail.payPrice;
            console.log(res.result, "我的全");
          });
      } else {
        this.$axios
          .post("/course/singledetailfororder", {
            courseId: this.fullid,
            token: ""
          })
          .then(res => {
            this.cousedetail = res.result;
            this.picsss = this.cousedetail.courseFullPrice;
            console.log(res, "我的单");
          });
      }
    },
    //支付类型
    paylist() {
      this.$axios.post("/utility/paytypelist", {}).then(res => {
        this.paytypelist = res.result;
        console.log(res.result, "我是支付列表");
      });
    },
    //判断支付方式
    changeflag(type) {
      if (type == "W") {
        this.WeChatflag = true;
        this.Alipayflag = false;
        this.paytype = 1; //微信支付
      } else {
        this.WeChatflag = false;
        this.Alipayflag = true;
        this.paytype = 2; //支付宝支付
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.pay()
          this.isgetlivedata();
          // return true
          //     alert('submit!');//这里就是符合规则，然后去调对应的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bian() {
      if (this.ruleForm.phone == this.selfPhone) {
        //自己的手机号
        this.$message({
          duration: 5000,
          message: "不能赠课给自己哦~",
          type: "warning"
        });
        return;
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(this.ruleForm.phone)) {
        this.$axios
          .post("/user/checkNicknameByPhone", { phone: this.ruleForm.phone })
          .then(res => {
            this.gifname = res.result.nickName;
          });
        this.getfororder();
      }
    },
    //支付
    istypepay() {
      // console.log(this.orderdetail)
      if (this.orderType == 4) {
        this.submitForm("ruleForm");
      } else {
        this.isgetlivedata();
        //  this.getlivedata()
        // this.pay()
      }
    },
    //判断是否重复下单
    isgetlivedata() {
      let isGift;
      if (this.orderType == 1) {
        isGift = false;
      } else {
        isGift = true;
      }
      this.$axios
        .post("/course/courseisorder", {
          token: "",
          courseId: this.fullid,
          courseType: this.istype,
          phoneNum: this.ruleForm.phone,
          isGift: isGift
        })
        .then(res => {
          console.log(res.code);
          if (res.code == 300009 || res.code == 300010) {
            return;
          }
          if (res.result.orderId == null) {
            this.getlivedata();
          } else {
            this.pay(res.result.orderId);
          }
          console.log(res, "pppp");
        });
    },
    //下单
    getlivedata() {
      if (this.istype == 1) {
        //单阶下单
        this.$axios
          .post("/course/buysingle", {
            orderId: this.orderSNID,
            sourceId: 1,
            courseId: this.fullid,
            token: "",
            orderType: this.orderType,
            phoneNum: this.ruleForm.phone
          })
          .then(res => {
            this.pay(res.result.orderId);
          });
      } else {
        //全阶下单
        console.log(
          this.cousedetail.courseFullPrice,
          this.picsss,
          this.cousedetail.courseDiscountPrice + this.cousedetail.singlePrice
        );
        this.$axios
          .post("/course/buyfull", {
            orderId: this.orderSNID,
            sourceId: 1,
            courseId: this.fullid,
            token: "",
            orderType: this.orderType,
            courseFullPrice: this.cousedetail.courseFullPrice,
            payPrice: this.picsss,
            discountPrice:
              this.cousedetail.courseDiscountPrice +
              this.cousedetail.singlePrice,
            phoneNum: this.ruleForm.phone,
            isTurnFull: this.isTurnFull,
            singleIds: this.singleIds
          })
          .then(res => {
            this.pay(res.result.orderId);
          });
      }
    },
    async pay(orderid) {
      let data = await this.$axios.post("/order/pay", {
        paymentType: this.paytype, //支付类型 1 微信  2 支付宝
        giftPhoneNum: this.ruleForm.phone, //赠课人手机号
        sourceId: 1,
        orderItemName: this.cousedetail.courseName,
        orderId: orderid,
        token: ""
      });
      console.log(data, "datadatadata");
      //判断是否符合支付条件
      if (data.result == null) {
        this.$message({
          duration: 5000,
          message: data.msg,
          type: "error"
        });
      } else {
        if (this.paytype == 2) {
          let div = document.querySelector("#box");
          div.innerHTML = data.result.split("<script>")[0]; //支付宝表单
          if (this.orderType == 4) {
            // document.forms[1].setAttribute('accept-charset', 'gbk');
            // document.forms[1].setAttribute('_charset', 'gbk');
            document.forms[1].submit();
          } else {
            // document.forms[0].setAttribute('accept-charset', 'gbk');
            // document.forms[0].setAttribute('_charset', 'gbk');
            document.forms[0].submit();
          }
        } else {
          //微信
          this.doingflag = true;
          this.datares = data.result;
          let that = this;
          this.timeropen = setInterval(function() {
            that.paysuccess(orderid);
          }, 2000);
        }
      }
    },
    //订单是否完成
    paysuccess(orderid) {
      let that = this;
      this.$axios
        .post("/order/detail", {
          orderId: orderid, //
          token: ""
        })
        .then(res => {
          if (res.result.isPay) {
            clearInterval(that.timeropen);
            this.$router.push({
              name: "paisuc",
              query: {
                pic: this.orderdetail.courseActualPaymentPrice,
                orderSn: res.result.orderSn,
                flag: 2
              }
            });
          } else {
            this.doingtext = false;
          }
        });
    },
    handleClose() {
      this.doingflag = false;
    },
    //关闭弹出层
    close() {
      clearInterval(this.timeropen);
      this.doingflag = false;
      this.doingtext = true;
      // this.$refs.paySuccess.innerHTML = ''
    },
    validgifPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else if (!this.isvalidPhone(value)) {
        return callback(new Error("请输入正确的11位手机号"));
      } else if (value == this.selfPhone) {
        return callback(new Error("不能填写自己的手机号"));
      } else {
        return callback();
      }
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    }
  }
};
</script>

<style lang="less">
.app-elils-span {
  width: 450px;
  height: 29px;
  line-height: 29px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.pay-tip-modal {
  .el-dialog__body {
    padding: 20px 25px 30px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: rgb(186, 161, 130);
  }
  #qrcode {
    width: 119px;
    height: 117px;
    padding-left: 120px;
    canvas {
      height: 100%;
    }
    img {
      height: 100%;
    }
    margin-bottom: 15px;
  }
  .el-dialog__header {
    // display: none;
  }
  width: 388px;
  height: 300px;
  box-shadow: 0px 5px 59px 0px rgba(14, 5, 10, 0.05);
  opacity: 0.95;
  border-radius: 3px;
  .pay-tip-div {
    div:nth-of-type(1) {
      position: absolute;
      top: 20px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(76, 73, 72, 1);
    }
    text-align: center;
    p:nth-of-type(1) {
      font-size: 16px;
      font-weight: 700;
      color: #1c1f21;
      line-height: 24px;
    }
    p {
      margin: 4px auto 14px;
      font-size: 12px;
      color: #9199a1;
      line-height: 18px;
    }
    button {
      padding: 8px 52px;
      cursor: pointer;
      background: #383d42;
      border-radius: 24px;
      font-size: 14px;
      color: #fff;
      line-height: 20px;
      outline: none;
      border: none;
    }
  }
}
.el-main {
  background: white;
}
.paymentarticle {
  /**首页-课程列表-支付页面**/
  .pay_money {
    bottom: -5px;
  }
  .pay-content {
    margin-top: 58px;
    padding-bottom: 85px;
    /* 提示去完善》》 */
    /* 合计金额 */
  }
  .pay-content .pay-item {
    margin-bottom: 52px;
  }
  .pay-content .pay-item > p {
    margin-bottom: 24px;
  }
  .pay-content .input-border {
    display: flex;
  }
  .pay-content .input-border > label {
    display: inline-block;
    width: 140px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    margin-right: 16px;
    text-align: right;
  }
  .pay-content .input-border div {
    width: 100%;
  }
  .pay-content .input-border div .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  .pay-content .input-border div .el-input-group__prepend {
    border-color: rgba(196, 165, 127, 0.3);
    background: #fff;
  }
  .pay-content .input-border div .el-input__inner {
    width: 310px;
    height: 36px;
    border: 1px solid rgba(196, 165, 127, 0.3);
    border-radius: 3px;
  }
  .pay-content .input-border div {
    width: auto;
  }
  .pay-content .input-border > span {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    margin-left: 18px;
  }
  .pay-content .Pay_prompt {
    margin-top: -28px;
    margin-bottom: 50px;
  }
  .pay-content .Total_amount {
    margin-bottom: 24px;
  }
  .pay-content .Total_amount > strong {
    margin-top: 8px;
    margin-bottom: 4px;
  }
  .Pay_treasure-WeChat span {
    border-radius: 3px;
    width: 120px;
    height: 42px;
    border: 1px solid #b49876;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
  .Pay_treasure-WeChat span:last-child {
    left: 25px;
  }
  .Pay_treasure-WeChat span img {
    vertical-align: middle;
  }
  .Pay_treasure-WeChat span.active::after {
    content: url(~assets/img/Pay_active.png);
    width: 20px;
    height: 26px;
    display: inline-block;
    color: #b49876;
    position: absolute;
    right: -1px;
    bottom: -2px;
  }
  .Class_list-content {
    margin-top: 53px;
  }

  .Class_list-content > .Class_list-content-img img {
    width: 488px;
    height: 276px;
  }

  .Class_list-content > .Class_list-content-img > span img {
    width: 52px;
    height: 52px;
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
    width: 465px;
    height: 276px;
  }

  .Class_list-content-text > h3 {
    margin-bottom: 5px;
    margin-top: 22px;
  }
  .Class_list-content-text > h3 + p {
    margin-bottom: 23px;
  }

  .Class_list-content-text > ul li {
    line-height: 30px;
    width: auto;
    min-width: 30%;
    float: left;
    margin-right: 20px;
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
    width: 13px;
    height: 13px;
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
.paymentarticle {
  .Contains-course {
    padding: 0px 0px;
    .app-zwl-Contains-course-list {
      & > li {
        box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
      }
    }
    .app-zwl-Contains-course-list {
      .app-zwl-Contains-course-list-div {
        padding: 0px 20px 20px 20px;
      }
    }
  }
  .Contains-course {
    margin-top: 40px;
  }
  .Contains-course ul li {
    width: 203px;
    height: 193px;
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 20px;
  }
  .Contains-course ul li > div:nth-child(1) img {
    width: 202px;
    height: 115px;
  }
  .Contains-course ul li > div:nth-child(2) {
    margin-top: 15px;
    padding-left: 19px;
    padding-right: 19px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
  }
  .Contains-course ul li > div:nth-child(2) p:last-child {
    margin-top: 9px;
  }
  .Contains-course ul li .activegif div:nth-child(1) {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
  .Contains-course ul li .activegif div:nth-child(2) p.fz16.c3 {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: rgb(104, 87, 87);
  }
}
</style>
