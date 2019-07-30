<template>
  <section class="sectindex app-Order_list-content-order" style="margin-top:27px">
    <div
      class="Order_list-content"
      v-for="(item) in $store.state.my.order.orderList"
      :key="item.orderId"
    >
      <div class="clear pos_r" style="margin-bottom:20px">
        <h4 class="c097 fz17 fzGB1-0 normal" :style="{color:item.orderStatusColor}">
          {{item.orderStatusText}}
          <!-- 赠课订单 -->
          <span
            v-if="item.orderStatusText=='已退款'&&item.giftInfo!=null"
            style="font-size:12px;color:#ccc"
          >学费已退回至赠课人的账户</span>
        </h4>
        <time class="fz14 c7271 fzGB1-0" style="width: 799px;display: inline-block;">
          <span>{{formData(item.orderTime,"utc","add")}}</span>
          <span>订单编号：{{item.orderSn}}</span>
          <span v-if="item.refundSn">退款编号：{{item.refundSn}}</span>
        </time>
        <Countdown
          v-if="item.isCancel"
          :str="item.orderTime"
          :item="item"
          :cancelOrder="autoCancelOrder"
        />
        <span class="c077 fz14 pos_a fzGB1-0" style="top:17px;" v-if="item.orderStatusText=='未支付'">
          应付学费：
          <strong class="c097 fz32">{{item.courseActualPaymentPrice}}元</strong>
        </span>
      </div>
      <!-- 赠送订单 -->
      <div class="app-orderlist-givebox fzGB1-0" v-if="item.giftInfo">
        <p class="app-orderlist-giving"></p>
        <span class="app-orderlist-givebox-span fzGB1-0">
          <i class="el-icon-info" style="color:#c4a57f"></i>&nbsp;
          <span class="fzGB1-0" v-if="item.giftInfo.typeName">{{item.giftInfo.typeName}}：</span>
          <span class="fzGB1-0">
            {{item.giftInfo.nickName}}&nbsp;
            <span v-if="item.giftInfo.phoneNum">
              <span v-if="item.giftInfo.nickName">(</span>
              {{item.giftInfo.phoneNum}}
              <span v-if="item.giftInfo.nickName">)</span>
            </span>
          </span>
          <!-- 增送人 -->
          <span class="fzGB1-0" v-if="item.giftInfo.typeName=='已赠给'">
            <!-- 是否领取  status:已领取  未领取  已退课  已领取一个颜色  未领取 已退课 一个颜色 isReceive弃用-->

            <b
              :style="{color:item.giftInfo.status=='已领取'?'#c4a57f':'#097276'}"
              v-if="item.giftInfo.status"
            >{{item.giftInfo.status}}</b>
            <!-- <b style="color:#c4a57f" v-if="item.giftInfo.isReceive">已领取</b> -->
            <!-- <b style="color:#097276" v-else>未领取</b> -->
          </span>
        </span>
      </div>
      <div class="flex" v-for="(items,indexs) in item.courseIdList" :key="items.courseId">
        <div class="dis_in_block pos_r Order_list-content-img">
          <img
            style="cursor:pointer"
            @click="jumpCourse(items.courseType,items.courseId)"
            :src="items.coursePictureThumbUri"
            alt
            width="159"
            height="144"
            v-lazy="items.coursePictureThumbUri"
          >
          <span class="pos_a" style="top:-22.5px;left:-22.5px;display:inline-block">
            <img
              style="width:45px;height:45px;"
              :src="item.type==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
              alt
            >
          </span>
        </div>
        <div class="dis_in_block pos_r Order_list-content-text Order_list-content-text-ie">
          <div class="dis_in_block">
            <p class="fz16 c3 fzGB1-0" style="marginTop:33px;margin-bottom:15px">
              <span class="c998"></span>
              <span
                style="font-weight:normal;cursor:pointer"
                @click="jumpCourse(items.courseType,items.courseId)"
              >
              <!-- {{items.courseName}} -->
              {{cutStr(items.courseName,32)}}
              </span>
            </p>
            <strong class="c097 dis_block fz16 fonH">
              <!-- 单独一个单阶取外面的价格 -->
              {{item.coursePrice}}元
              <!-- <price :number="items.coursePrice" style="display:inline-block"/> -->
            </strong>
            <time
              class="fz12 c4a5"
              v-if="items.refundEndTime"
            >退课截至{{formData(items.refundEndTime,"utc","add")}}</time>
          </div>
          <div class="dis_in_block" v-if="indexs==0" style="width:145px;padding-top:33px">
            <!-- <button class="btn-green-pay" @click="invoiceStatus(item)">{{item.invoiceStatusText}}</button> -->
            <div style="margin-bottom:23px;" v-for="(itemse,index) in item.operation" :key="index">
              <button class="btn-green-pay" v-if="itemse=='pay'" @click="pay(item,items)">支付</button>
              <button
                class="btn-yellow-border btn-yellow-order fzGB1-0"
                v-if="itemse=='cancelOrder'"
                @click="cancelOrder(item)"
                style="cursor:pointer;font-size:19px"
              >取消订单</button>
              <button
                class="btn-yellow-border btn-yellow-order fzGB1-0"
                v-if="itemse=='refund'"
                style="cursor:pointer;font-size:19px"
                @click="refude(item)"
              >申请退课</button>
              <button
                class="btn-yellow-border btn-yellow-order fzGB1-0"
                v-if="itemse=='refunds'"
                style="cursor:pointer;font-size:19px;background:#ccc;border-color:#ccc;color:white"
              >申请退课</button>
              <button
                class="btn-yellow-border btn-yellow-order fzGB1-0"
                v-if="itemse=='CancelRefude'"
                style="cursor:pointer;font-size:19px;"
                @click="CancelRefude(item)"
              >取消退课申请</button>
              <button
                class="btn-yellow-border btn-yellow-order fzGB1-0"
                v-if="itemse=='CancelRefudes'"
                style="cursor:pointer;font-size:19px;background:#ccc;border-color:#ccc;color:white"
              >取消退课申请</button>
              <!-- {{!ctn}} -->

              <button
                class="btn-yellow-invoice fzGB1-0"
                v-if="itemse=='invoice'"
                style="font-size:19px"
                @click="invoiceStatus(item)"
              >{{item.invoiceStatusText}}</button>
              <button
                class="btn-yellow-invoice fzGB1-0"
                v-if="itemse=='invoices'"
                style="opacity:0.5;font-size:19px"
              >{{item.invoiceStatusText}}</button>
              <button
                class="btn-yellow-invoice fzGB1-0"
                v-if="itemse=='invoicing'"
                style="opacity:0.5;font-size:19px"
              >{{item.invoiceStatusText}}</button>
              <button
                class="btn-yellow-invoice fzGB1-0"
                v-if="itemse=='uninvoice'"
                style="font-size:19px"
              >{{item.invoiceStatusText}}</button>
            </div>
            <span class="fz12" style="color:#C4A57F;display:inline-block;" v-if="item.luboCanRefund">录播形式的虚拟内容服务，报名后，不支持退课</span>
            
            <!-- 只有付款的赠送人且还没开发票才会显示 -->
            <span
              v-if="item.giftInfo&&item.giftInfo.typeName=='已赠给'&&item.operation.includes('invoice')"
              style="font-size:12px;color:#C4A57F;display:inline-block"
            >若被赠课人提出退课申请，学费将原路返回您的账户</span>

            <!-- <button class="btn-yellow-loading">发票开具中</button> -->
            <!-- <button class="btn-yellow-border btn-yellow-order">取消订单</button> -->
          </div>
          <div class="dis_in_block" v-if="indexs!==0"></div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="invoiceflag"
      title="申请发票"
      v-if="invoiceflag"
      custom-class="app-change-apply-invoice"
      width="600px"
      class="app-invoice-form"
      :before-close="handleClose"
    >
      <div style="width:500px;margin:0 auto;" class="Model-content">
        <h4 class="fz14  c3" style="margin-bottom:20px">请填写发票信息</h4>
        <div class="content">
          <!-- <h3>填写开票信息</h3> -->
          <el-form
            ref="invoiceForm"
            class="app-zwl-invoiceForm"
            :model="invoiceForm"
            label-width="100px"
            :rules="ruleForm"
            hide-required-asterisk
          >
            <el-form-item label="客户所属" prop="type">
              <el-radio-group v-model="invoiceForm.type" class="app-radio-group-color-change">
                <el-radio label="1">企业</el-radio>
                <el-radio label="2">
                  个人
                  <span style="color:#acacac">(企业发票和纳税人编号为非必填)</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票性质">电子发票</el-form-item>
            <el-form-item label="发票类型">增值税普通发票</el-form-item>
            <el-form-item label="发票抬头" prop="headName">
              <el-input v-model="invoiceForm.headName" placeholder="" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="invoiceSn" v-if="invoiceForm.type!='2'">
              <el-input v-model="invoiceForm.invoiceSn" placeholder="" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="发票内容">培训费</el-form-item>
            <el-form-item label="发票金额"><span style="color:#c4a57f">
              {{invoicelist.invoicePrice}}
              </span>元</el-form-item>
          </el-form>
          <p style="text-align:center">
            <el-button
              @click="invoice"
              style="background: rgba(9,114,118,1);color: white;padding: 10px 30px 10px 30px;"
            >提交</el-button>
          </p>
        </div>
      </div>
    </el-dialog>
    <MessageBox
      v-if="boxVisible"
      :visible="boxVisible"
      :onCancel="closeMessageBox"
      :onOK="onOk"
      isConfirm="false"
      :msg="msg"
      title="确认"
    />
  </section>
</template>

<script>
import price from "@/components/price"; //价格小数点
import Countdown from "./Countdown.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { invoiceRise, invoiceSn } from "@/plugins/vaildRule";
import { formData,cutStr } from "@/plugins/utils";
import MessageBox from "@/components/messageBox"; //弹出框
export default {
  data() {
    return {
      boxVisible: false, //确认框状态
      boxType: "", //二次确认框应携带的信息
      msg: "学费将原路退回至赠课人账户", //提示信息
      status: "refude", //refude:退课   noRefude 取消退课申请  

      ctn: false,
      invoiceForm: {
        type: "1", //开票类型 1企业 2个人
        headName: "", //发票抬头
        invoiceSn: "" //纳税人识别号
      },
      ruleForm: {
        type: [
          { required: true, message: "请选择客户所属", trigger: "change" }
        ],
        headName: invoiceRise,
        invoiceSn: invoiceSn
      },
      orderId: "",
      invoiceflag: false, //发票
      enterprise: true,
      invoicelist: [] //发票数据
    };
  },
  props: {
    typeId: {
      type: null
    },
    changeMychildGet: {
      type: null
    }
  },
  // props: ["typeId","changeMychildGet"],
  components: {
    price,
    Countdown,
    MessageBox
  },
  methods: {
    formData,
    cutStr,//根据字节截取字符串
    //取消订单
    async cancelOrder(type) {
      this.msg="您确定取消订单吗?"
        this.boxVisible = true;
        this.boxType = type;
        this.status = "cancelOrder";
        return;
      
      console.log(data);
    },
    //自动取消订单
    async autoCancelOrder(type){
      let siGift;
      if (type.orderType == 1) {
        siGift = false;
      } else {
        siGift = true;
      }
      console.log(type.orderId);
      let data = await this.$axios.post("/order/cancel", {
        orderId: type.orderId,
        token: "",
        orderType: 1,
        siGift: siGift
      });
      this.$message({
        duration: 5000,
        message: this.$selfMsg.cancelOrder,
        type: "success"
      });
      this.update();

    },
    //付款
    async pay(fater, son) {
      console.log(son, "son");
      let typenumber, nickName;
      if (fater.giftInfo) {
        typenumber = fater.giftInfo.phoneNum;
        nickName = fater.giftInfo.nickName;
      }
      let routeData = this.$router.resolve({
        name: "payment",
        query: {
          istype: son.courseType,
          fullid: son.courseId,
          isTurnFull: false,
          orderType: fater.orderType,
          orderSNID: null,
          typenumber: typenumber,
          nickName: nickName
        }
      });
      window.open(routeData.href, "_blank");
      console.log(fater, "fasss");
    },
    //退款  申请退课
    async refude(type) {
      console.log(type);
      if (type.giftInfo != null) {//赠课单
        //被赠退课
        this.msg="学费将延原路退回至赠课人账户!"
        this.boxVisible = true;
        this.boxType = type;
        this.status = "refude";
        return;
      }else{//非赠课单
        this.msg="您确定申请退课吗?"
        this.boxVisible = true;
        this.boxType = type;
        this.status = "refude";
        return;
      }
      this.ctn = type.orderId;
      let data = await this.$axios.post("/order/refund", {
        orderId: type.orderId,
        token: ""
      });
      console.log(data);
      this.$message({
        duration: 5000,
        message: this.$selfMsg.applyRefund,
        type: "success"
      });
      this.update();
    },
    //取消退款
     CancelRefude(type) {
      this.boxVisible = true;
      this.boxType = type;
      this.msg = "您确认要取消退课申请吗?";
      this.status = "noRefude";
      // return;
      // this.ctn = false;
      // console.log(type);
      // let data = await this.$axios.post("/order/closerefund", {
      //   orderId: type.orderId,
      //   token: ""
      // });
      // console.log(data);
      // this.$message({
      //   duration: 2000,
      //   message: "您已取消申请退款",
      //   type: "success"
      // });
      // this.update();
    },
    //开具发票模板
    async invoiceStatus(type) {
      let data = await this.$axios.post("/order/invoiceTemplate", {
        orderId: type.orderId,
        token: ""
      });
      this.orderId = type.orderId;
      this.invoiceflag = true;
      this.invoicelist = data.result;
      console.log(data.result);
      console.log(type);
    },
    //更新列表数据
    async update() {
      let data = await this.$axios.post("/order/list", {
        orderStatus: this.$store.state.my.order.tabId, //订单状态
        pageIndex: 1, //页码
        token: ""
      });
      console.log(data, "123");
      this.getOrderList(data.result.orderResponseVos);
      this.pageZero();
      this.changeMychildGet();
    },
    //申请发票
    invoice() {
      this.$refs.invoiceForm.validate(vaild => {
        console.log(vaild);
        if (!vaild) return;
        if (this.invoiceForm.type == 2) {
          //个人
          delete this.invoiceForm.invoiceSn;
        }
        console.log(this.invoiceForm);
        this.$axios
          .post("/order/invoice", {
            token: "",
            orderId: this.orderId,
            ...this.invoiceForm
            // headName:"",//发票抬头
            // invoiceSn:"",//纳税人识别号
            // orderId:"",//订单id
            // type:"",//开票类型（1：企业 2：个人）
          })
          .then(res => {
            if (res.code == 0) {
              this.invoiceflag = false;
              this.$message({
                duration: 5000,
                message: this.$selfMsg.invoicing,
                type: "success"
              });
              this.$axios
                .post("/order/list", {
                  orderStatus: this.typeId, //订单状态
                  pageIndex: 1,
                  token: ""
                })
                .then(res => {
                  this.getOrderList(res.result.orderResponseVos);
                });
            }
          });
      });
    },
    handleClose() {
      this.$refs.invoiceForm.resetFields();
      this.invoiceflag = false;
    },
    //跳到课程详情页
    jumpCourse(type, id) {
      //type: 1  单阶  2:全阶
      if (type == 1) {
        this.$router.push({
          name: "singleOrder",
          query: {
            courseId: id
          }
        });
      } else if (type == 2) {
        this.$router.push({
          name: "fullOrder",
          query: {
            courseId: id
          }
        });
      }
    },
    //关闭二次确认框
    closeMessageBox() {
      this.boxVisible = false;
      this.boxType=""
      this.status=""
      this.msg=""
    },
    //被赠课:退款,  取消退课
    async onOk() {
      if (this.status == "refude") { //退课
        //退课
        const type = this.boxType;
        this.ctn = type.orderId;
        let data = await this.$axios.post("/order/refund", {
          orderId: type.orderId,
          token: ""
        });
        console.log(data);
        this.closeMessageBox()
        this.$message({
          duration: 5000,
          message: this.$selfMsg.applyRefund,
          type: "success"
        });
        this.update();
      } else if (this.status == "noRefude") {//取消退课
        //取消退课
        const type = this.boxType;
        this.ctn = false;
        console.log(type);
        let data = await this.$axios.post("/order/closerefund", {
          orderId: type.orderId,
          token: ""
        });
        console.log(data);
        this.closeMessageBox()
        this.$message({
          duration: 5000,
          message: this.$selfMsg.cancelApplyRefund,
          type: "success"
        });
        this.update();
      }else if(this.status=="cancelOrder"){
        let siGift;
        const type = this.boxType;
      if (type.orderType == 1) {
        siGift = false;
      } else {
        siGift = true;
      }
      console.log(type.orderId);
      let data = await this.$axios.post("/order/cancel", {
        orderId: type.orderId,
        token: "",
        orderType: 1,
        siGift: siGift
      });
      this.closeMessageBox()
      this.$message({
        duration: 5000,
        message: this.$selfMsg.cancelOrder,
        type: "success"
      });
      this.update();
      console.log(data);

      }
    },
    ...mapMutations({
      getOrderList: "my/order/getOrderList", //获取list
      pageZero: "my/order/pageZero" //我的订单获取page
    })
  },
  computed: {
    ...mapState({
      orderList: state => state.myHomeWork.orderList //当前tab
    })
  }
};
</script>

<style lang="less">
.app-zwl-invoiceForm{
  label{
    // margin-right: 18px!important;
  }
  .app-radio-group-color-change{
    
    .el-radio{
      &:nth-child(2){
        // margin-left: 0!important;
      }
    }
  }
  .el-form-item__content{
      margin-left: 130px!important;
    }
}
.Order_list-content-text-ie {
  width: 458px !important;
  padding-left: 30px !important;
  margin-left: 0px !important;
}
.app-Order_list-content-order {
  .Order_list-content-text {
    width: 458px !important;
    padding-left: 30px !important;
    margin-left: 0px !important;
  }
  .Order_list-content:last-child {
    margin-bottom: 50px;
  }
  .Order_list-content:last-child::after {
    // background: red;
    display: none;
  }
}
// 申请发票
.app-change-apply-invoice {
  .el-dialog__header {
    // padding: 0;
    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #b49876;
      }
    }
  }
}

.app-orderlist-givebox {
  position: relative;
  margin-bottom: 25px;
  .app-orderlist-givebox-span {
    position: absolute;
    font-size: 14px;
    font-weight: 400;
    // color:red;
    z-index: 999;
    left: 10px;
    width: 100%;
    top: 6px;
    span:nth-of-type(1) {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    span:nth-of-type(2) {
      font-size: 14px;
      font-weight: 400;
      color: #c4a57f;
    }
    span:nth-of-type(3) {
      float: right;
      margin-right: 40px;
      font-size: 14px;
      margin-top: 3px;
      // b:nth-of-type(1){
      //    color:rgba(196,165,127,1);
      //   //  margin-right: 5px;
      // }
      //  b:nth-of-type(2){
      //    color:#097276;
      // }
      // font-weight:bold;
    }
  }
}
.app-orderlist-giving {
  height: 32px;
  width: 100%;
  line-height: 32px;
  background: rgba(196, 165, 127, 1);
  opacity: 0.1;
  border-radius: 3px;
}
.app-invoice-form {
  .el-form-item {
    margin-bottom: 20px;
  }
}
/** 报名前了解model **/
.invoice-Model .el-dialog__body {
  padding: 0px 53px 40px;
}
.invoice-Model .el-dialog__header {
  padding: 20px 20px 30px;
  border-bottom: 1px solid #ccc;
}
.invoice-Model .el-dialog__header .el-dialog__close {
  color: #c4a57f;
  top: 14px;
  position: relative;
  font-size: 17px;
  font-weight: 600;
}
.invoice-Model .Model-content > h4 {
  position: relative;
  top: -34px;
  left: -40px;
  font-weight: normal;
}
.invoice-Model .el-icon-close:before {
  position: absolute;
  color: black;
  top: -30px;
  right: -10px;
  font-size: 18px;
  content: "\E60F";
}
.invoice-Model {
  .content {
    h3 {
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      margin-left: -20px;
    }
    p {
      width: 100%;
      height: 50px;
      line-height: 50px;
      .el-radio__input.is-checked .el-radio__inner {
        background: rgb(255, 168, 0);
        border-color: rgb(255, 168, 0);
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #606266;
        font-weight: bolder;
      }
      .rise {
        height: 35px;
        color: black;
        width: 50%;
        padding-left: 10px;
      }
    }
    p .good {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 20px;
      color: #999999;
    }
  }
}
</style>
