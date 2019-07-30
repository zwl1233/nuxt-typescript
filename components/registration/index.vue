<template>
  <section class="app-registration-Model">
    <el-dialog
      :visible.sync="modelflag"
      :before-close="close"
      custom-class="registration-Model"
      width="639px"
      center
    >
      <div class="Model-content">
        <h4 class="fz17 c4c49">报名前请了解</h4>
        <ul class="app-clear" v-if="false">
          <li>
            <label for class="fz14 c4c49">课程回放：</label>
            <span class="fz14 c9">
              如果您需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为
              <strong class="c4a5 fz17">1</strong>天，即当堂直播课程结束后有1天时间补课或复习。
            </span>
          </li>
          <li>
            <label for class="fz14 c4c49">申请退课：</label>
            <span class="fz14 c9">如果您需要退课，请于第一节直播课开始前，在“我的订单”中提出申请，申请审核通过后将全额退款。直播课程开始后，将不再接受退课申请。</span>
          </li>
          <li>
            <label for class="fz14 c4c49">开具发票：</label>
            <span class="fz14 c9">如果您需要发票，请在“我的订单”中提出申请，教室将于第一节直播课开始后开具电子发票。</span>
          </li>
        </ul>
        <LivingSelf v-if="type=='1'&&isSend_reg==false" :registrObj="registr_obj"/>
        <LivingSend v-if="type=='1'&&isSend_reg==true" :registrObj="registr_obj"/>
        <BackSelf v-if="type=='2'&&isSend_reg==false" :registrObj="registr_obj"/>
        <BackSend v-if="type=='2'&&isSend_reg==true" :registrObj="registr_obj"/>


        <div class="fz14" style="color:rgba(114, 113, 113,.8);margin-top:27px" v-if="type=='1'&&isSend_reg==false">
            您可以在<strong class="c4a5">{{registr_obj.studyEndTime}}</strong>之前下载学习资料、提交作业和将作业发布到“晒作业”与大家分享。
        </div>

        <div class="fz14" style="color:rgba(114, 113, 113,.8);margin-top:27px" v-if="type=='1'&&isSend_reg==true">
            <strong class="c4a5">Ta</strong>可以在<strong class="c4a5">{{registr_obj.studyEndTime}}</strong>之前提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料。
        </div>

        <div class="fz14" style="color:rgba(114, 113, 113,.8);margin-top:27px" v-if="type=='2'&&isSend_reg==false">
        <div v-if="registr_obj.backTime!='不限'">
         <strong class="c4a5" >您</strong>可以在<strong class="c4a5">{{registr_obj.backTime}}年内</strong>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<strong class="c4a5">不提供下载</strong>）。
        </div>
        <div v-if="registr_obj.backTime='不限'">
         <strong class="c4a5" >您</strong>可以<strong class="c4a5">{{registr_obj.backTime}}时</strong>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<strong class="c4a5">不提供下载</strong>）。
        </div>
        </div>

        <div class="fz14" style="color:rgba(114, 113, 113,.8);margin-top:27px" v-if="type=='2'&&isSend_reg==true">
          <div v-if="registr_obj.backTime!='不限'">
            <strong class="c4a5" >Ta</strong>可以在<strong class="c4a5">{{registr_obj.backTime}}年内</strong>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<strong class="c4a5">不提供下载</strong>）。
          </div>
          <div v-if="registr_obj.backTime='不限'">
         <strong class="c4a5" >Ta</strong>可以<strong class="c4a5">{{registr_obj.backTime}}时</strong>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频<strong class="c4a5">不提供下载</strong>）。


          </div>
            
        </div>

        <p class="fz20 c4a5" style="margin-top:29px;text-align:center;">祝您暄桐教室学习愉快~</p>
        <div class="user-item" style="margin-top:32px;margin-bottom:34px;">
          <el-checkbox class="c9 fz14 app-check-color-change" v-model="checkflag">同意</el-checkbox>
          <span
            class="c4a5"
            style="cursor:pointer;"
            @click="modeldetail"
          >《{{Agreement.protocolName}}》</span>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button
            class="btn-Agreed"
            type="primary"
            style="background:#ccc !important;color:white;border:none"
            v-if="!indexflag"
          >同意({{index}})</el-button>
          <el-button class="btn-Agreed" type="primary" v-else @click="doing('pay')">同意</el-button>
          <el-button class="btn-noAgreed" @click="close">不同意</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 暄桐报名协议  RegistrationAgreement-->
    <RegistrationAgreement
      :Agreement="Agreement"
      style="width:661px"
      ref="RegistrationAgreementflag"
    />
  </section>
</template>

<script>
import RegistrationAgreement from "@/components/RegistrationAgreement"; //了解详情
import LivingSelf from "@/components/registration/livingSelf";//直播自己购买
import LivingSend from "@/components/registration/livingSend";//直播赠课
import BackSelf from "@/components/registration/backSelf";//录播自己购买
import BackSend from "@/components/registration/backSend";//录播赠课
export default {
  components: {
    RegistrationAgreement, //暄桐报名协议
    LivingSelf,
    LivingSend,
    BackSelf,
    BackSend,
  },
  created () {
      console.log(this.type,this.isSend,"报名")
      this.isSend_reg=this.isSend
      this.registr_obj=this.registrObj
      console.log(this.registrObj,'报名信息')
  },
  props: {
    Tips: {
      //了解内容
      type: null
    },
    changedoing: {
      //同意下一步
      type: null
    },
    Agreement: {
      type: null
    },
    type:{//1 直播  2  录播
      type:null
    },
    isSend:{//false:自己购买  true:赠课
      type:null
    },
    registrObj:{
      type:null
    }
  },
  data() {
    return {
      modelflag: false,
      checkflag: false,
      index: 15,
      indexflag: false,
      timer: null,
      isSend_reg:true,//true  :赠课  false :自己购买
      registr_obj:{}
    };
  },
  methods: {
    doing(type) {
      if (this.checkflag) {
        this.$emit("changedoing", type);
        this.modelflag = false;
      } else {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.Agreement,
          type: "success"
        });
      }
    },
    //用户服务协议
    modeldetail() {
      this.$refs.RegistrationAgreementflag.flagchange(1);
    },
    //关闭了解
    flagchange() {
      this.modelflag = true;
      this.checkflag = false;
      this.indexflag = false;
      this.index = 15;
      this.opentimers();
    },
    opentimers() {
      let that = this;
      that.timer = setInterval(function() {
        that.index--;
        console.log(that.index);
        if (that.index <= 0) {
          clearInterval(that.timer);
          that.indexflag = true;
        }
      }, 1000);
    },
    //关闭了解
    close() {
      clearInterval(this.timer);
      this.checkflag = false;
      this.modelflag = false;
    },
    textChange(text){
      if(text=='不限'){
        return 
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    deep:true,
    isSend(newVal,oldVal){
      console.log(newVal,"是否赠课")
       this.isSend_reg=newVal
    },
    registrObj(newVal,oldVal){
      console.log(newVal,"更新新娥")
      this.registr_obj=newVal
    }

  }
};
</script>

<style lang="less">
.app-registration-Model {
  .RegistrationAgreement-Model {
    width: 661px;
  }
}
/** 报名前了解model **/
.registration-Model .el-dialog__body {
  // 文字要在一行 修改:
  padding: 0px 60px 40px;
  // padding: 0px 65px 40px;
}
.registration-Model .el-dialog__header {
  padding: 20px 20px 30px;
}
.registration-Model .el-dialog__header .el-dialog__close {
  color: #c4a57f;
  top: 14px;
  position: relative;
  font-size: 17px;
  font-weight: 600;
}
.registration-Model .Model-content {
  margin-top: 15px;
}
.registration-Model .Model-content > h4 {
  position: relative;
  top: -34px;
}
.registration-Model .Model-content > ul li {
  float: left;
  width: 100%;
  margin-bottom: 20px;
}
.registration-Model .Model-content > ul li label {
  float: left;
  line-height: 19px;
}
.registration-Model .Model-content > ul li span {
  float: left;
  width: 86%;
  line-height: 19px;
}
.registration-Model .Model-content > ul + p {
  clear: both;
  position: relative;
  margin-top: 2px;
  margin-bottom: 32px;
  padding-left: 64px;
}
.registration-Model .Model-content > ul + p + div.user-item {
  margin-bottom: 34px;
}
.registration-Model
  .Model-content
  > ul
  + p
  + div.user-item
  + .dialog-footer
  button:last-child {
  margin-left: 37px;
}
.registration-Model {
  .el-button--primary {
    background: rgba(180, 152, 118, 0.9);
    border: 1px solid rgba(180, 152, 118, 0.9);
  }
  .el-button:focus,
  .el-button:nth-of-type(2) {
    color: rgba(180, 152, 118, 0.9);
    border: 1px solid rgba(180, 152, 118, 0.9);
  }
}
</style>
