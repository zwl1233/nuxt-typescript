<template>
  <section>
    <div class="Model-content">
      <p class="text-center c4a5 fz17 mb-30 errorhandlingdivpassword el-password">找回密码</p>
      <el-steps
        :active="RetrievePassword_active"
        class="mb-30 app-Model-content-step"
        style="width:360px;margin-left:-18px"
        custom-class="123-Model"
        align-center
        finish-status="success"
      >
        <el-step class="errorhandlingdivnext" title="填写账号"></el-step>
        <el-step class="errorhandlingdivnext" title="验证身份"></el-step>
        <el-step class="errorhandlingdivnext" title="重置密码"></el-step>
        <el-step class="errorhandlingdivnext" title="完成"></el-step>
      </el-steps>
      <!-- 填写账号 -->
      <el-form
        @submit.native.prevent
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-show="RetrievePassword_active == 0"
        :validate-on-rule-change="true"
        key="0"
      >
        <el-form-item prop="phone" class="el-from-ml100">
          <el-input v-model="ruleForm.phone" placeholder="请输入注册时的手机号/邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="Verion" class="el-from-ml100">
          <div class="block pull_slider" v-if="this.visionplay">
            <ImgCheck/>
          </div>
          <div
            class="block pull_slider custom"
            v-if="!this.visionplay&&!this.visionplaysuccess"
            @click="Verification"
          >
            <span>
              <b></b>
            </span>
            <a>点击此处验证</a>
          </div>
          <div class="block pull_slider custom customs" v-if="this.visionplaysuccess">
            <span>√</span>
            <a>验证成功</a>
          </div>
        </el-form-item>
        <div style="width:100%;height:40px" v-if="this.visionplay"></div>
        <el-button
          class="btn-next mt-10 errorhandlingdivpasswords"
          @click="submitForm('ruleForm')"
        >找回密码</el-button>
      </el-form>
      <!-- 验证身份 -->
      <el-form
        @submit.native.prevent
        :model="ruleFormVerion"
        :rules="rulesVerion"
        ref="ruleFormVerion"
        label-width="100px"
        class="demo-ruleForm"
        v-if="RetrievePassword_active == 1"
        :validate-on-rule-change="true"
        key="1"
      >
        <el-form-item class="el-from-ml100" style="margin-bottom:10px">
          <p class="text-left" style="color:rgba(0,0,0,.4)" v-if="ruleForm.phone.length>11">
            <span style="display:inline-block;overflow: hidden;">请输入</span>
            <span
              style="color:#c4a57f;display:inline-block;width:172px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;text-align:center"
              class="fz16 bold"
            >{{ruleForm.phone}}</span>
            <span style="display:inline-block;overflow: hidden;">收到的验证码</span>
          </p>
          <p class="text-left" style="color:rgba(0,0,0,.4);display:flex;align:items:center" v-else>
            <span style="display:inline-block;overflow: hidden;">请输入</span>
            <span
              style="color:#c4a57f;display:inline-block;width:115px;text-align:center;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;"
              class="fz16 bold ellipsis"
              :title="ruleForm.phone"
            >{{ruleForm.phone}}</span>
            <span style="display:inline-block;overflow: hidden;">收到的验证码</span>
          </p>
        </el-form-item>
        <el-form-item prop="Verionnumber" class="el-from-ml100" style="margin-bottom:8px">
          <div class="Message-verify flex">
            <el-input placeholder="请输入六位验证码" v-model="ruleFormVerion.Verionnumber" clearable></el-input>
            <el-button
              class="btn-verify"
              @click="codeFlag?()=>{}:GetvalidationPhone()"
              style="cursor:pointer;"
              v-if="!codeFlag&&inputtype==1"
            >
              <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="1"/>
            </el-button>
            <el-button class="btn-verify" v-if="codeFlag&&inputtype==1" style="background:#ccc">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                key="1"
                style="cursor:auto;"
              />
            </el-button>

            <el-button
              class="btn-verify"
              @click="codeFlag?()=>{}:GetvalidationEmail()"
              style="cursor:pointer;"
              v-if="!codeFlag&&inputtype==2"
            >
              <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="2"/>
            </el-button>
            <el-button class="btn-verify" v-if="codeFlag&&inputtype==2" style="background:#ccc">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                key="2"
                style="cursor:auto;"
              />
            </el-button>
            <!-- <el-button class="btn-verify" @click="Getvalidation">获取验证码</el-button> -->
          </div>
        </el-form-item>
        <el-button
          class="btn-next mt-10 errorhandlingdivpasswords"
          @click="submitForm('ruleFormVerion')"
        >下一步</el-button>
      </el-form>
      <!-- 重置密码 -->
      <el-form
        @submit.native.prevent
        :model="newFormpassword"
        :rules="newpassword"
        ref="newFormpassword"
        label-width="100px"
        class="demo-newFormpassword"
        :validate-on-rule-change="true"
        v-if="RetrievePassword_active == 2"
        key="2"
      >
        <el-form-item class="el-from-ml100" prop="password">
          <el-input
            placeholder="新密码 (8-16位字母＋数字组合)"
            type="password"
            class="fonPs"
            v-model="newFormpassword.password"
            v-showpas="newFormpassword.password"
          ></el-input>
        </el-form-item>
        <el-button
          class="btn-next mt-10 errorhandlingdivpasswords"
          @click="submitForm('newFormpassword')"
        >确定</el-button>
      </el-form>
      <!-- 完成 -->
      <el-form
        @submit.native.prevent
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="RetrievePassword_active == 3"
        :validate-on-rule-change="true"
        key="3"
      >
        <el-form-item class="el-from-ml100">
          <p
            class="text-center"
            style="color:rgba(196, 165, 127, 1);font-weight:400;font-size:17px"
          >密码重置成功啦~</p>
        </el-form-item>
        <el-button class="btn-next mt-10 errorhandlingdivpasswords" @click="next">完成</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
import ImgCheck from "@/components/ImgCheck";
import { validPhoneandemail, Verionesuc } from "@/plugins/utils.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import CodeCountDown from "@/components/CodeCountDown";
import { vaild } from "@/plugins/vaildRule";
export default {
  data() {
    return {
      codeFlag: false, //验证码倒计时开始
      phonetext: "",
      RetrievePassword_active: 0,
      inputtype: "",
      number: "",
      //手机表单
      ruleForm: {
        phone: "",
        Verion: ""
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", validator: validPhoneandemail } //这里需要用到全局变量
        ],
        Verion: [{ required: true, trigger: "blur", validator: Verionesuc }]
      },
      //手机验证码验证判断
      ruleFormVerion: {
        Verionnumber: ""
      },
      rulesVerion: {
        Verionnumber: vaild.short
      },
      //密码表单
      newFormpassword: {
        password: ""
      },
      newpassword: {
        password: vaild.password
      },
      //验证码
      codeFlag: false
    };
  },
  components: {
    ImgCheck,
    CodeCountDown
  },
  props: {
    closeloginpassword: {
      type: null
    }
  },
  computed: {
    ...mapState({
      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess, //验证成功
      userstoken: state => state.system.token, //用户token
      Time: state => state.system.time
    })
  },
  methods: {
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    },
    ...mapMutations({
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      getCookie: "system/getCookie", //获取用户cookie
      nowTime: "system/nowTime"
    }),
    //表单提交
    changeCode(flag) {
      this.codeFlag = flag;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(vaild, "错误");
        if (valid) {
          this.next();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // firstone() {
    //   //重置找回密码页面
    //   this.RetrievePassword_active = 0;
    //   this.number = "";
    // },
    async next() {
      if (this.RetrievePassword_active == 0) {
        this.phonetext = this.ruleForm.phone;
        const reg = /^.*@.+\..+$/;
        if (reg.test(this.phonetext)) {
          this.inputtype = 2;
        } else {
          this.inputtype = 1;
        }
        console.log(this.inputtype);
        return (this.RetrievePassword_active =
          this.RetrievePassword_active + 1);
      }
      //验证码校验是否错误
      if (this.RetrievePassword_active == 1) {
        return this.VerificationCode();
      }
      if (this.RetrievePassword_active == 2) {
        if (this.inputtype == 1) {
          return this.updatePhone();
        } else {
          return this.updateEmail();
        }
      }
      if (this.RetrievePassword_active > 2) {
        this.closeloginpassword();
        this.Vedislaysuccess(false);
      }
    },
    Verification() {
      //验证
      this.Vedislay(true);
    },
    //手机重置密码
    updatePhone() {
      this.nowTime();
      this.$axios
        .post("/user/getpasswordbymobile", {
          mobile: this.ruleForm.phone,
          confirmCode: this.ruleFormVerion.Verionnumber,
          newPassword: this.newFormpassword.password,
          newPasswordConfirm: this.newFormpassword.password,
          nowTime: this.Time
        })
        .then(res => {
          console.log(res, "确认修改");
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.update,
              type: "success"
            });
            this.RetrievePassword_active++;
          }
        });
    },
    //邮箱重置密码
    updateEmail() {
      this.nowTime();
      this.$axios
        .post("/user/getpasswordbyemail", {
          emailAddress: this.ruleForm.phone,
          confirmCode: this.ruleFormVerion.Verionnumber,
          newPassword: this.newFormpassword.password,
          newPasswordConfirm: this.newFormpassword.password,
          nowTime: this.Time
        })
        .then(res => {
          console.log(res, "确认修改");
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.update,
              type: "success"
            });
            this.RetrievePassword_active++;
          }
        });
    },
    //获取手机验证码
    async GetvalidationPhone() {
      let Getvalidation = await this.$axios.post("/send/sendSms", {
        phoneNumList: [this.ruleForm.phone],
        sendType: 1
      });
      if (Getvalidation.code == 0) {
        this.changeCode(true);
      }
      console.log(Getvalidation.result);
    },
    //获取邮箱验证码
    async GetvalidationEmail() {
      let Getvalidation = await this.$axios.post("/send/sendEmail", {
        emailList: [this.ruleForm.phone],
        sendType: 1
      });
      if (Getvalidation.code == 0) {
        this.changeCode(true);
      }
      console.log(Getvalidation.result);
    },
    //验证码验证
    VerificationCode() {
      this.nowTime();
      this.$axios
        .post("/user/checkConfirmCode", {
          confirmCode: this.ruleFormVerion.Verionnumber, //验证码
          type: this.inputtype, //1:手机校验码 2：邮箱验证码")
          findWay: this.ruleForm.phone, //找回方式  手机号/邮箱账号
          nowTime: this.Time, //当前时间
          isExist: true
        })
        .then(res => {
          if (res.result) {
            this.RetrievePassword_active++;
          } else {
            this.$message({
              duration: 5000,
              message: res.msg,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang="less">
//修改步骤样式
.app-Model-content-step {
  // 当前状态
  .el-step__head.is-process {
    .el-step__icon-inner {
      display: none;
    }
    .el-step__icon.is-text {
      background: #c4a57f;
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    }
  }
  //等候状态
  .el-step__head.is-wait {
    .el-step__icon-inner {
      display: none;
    }
    .el-step__icon.is-text {
      background: rgba(159, 160, 160, 1);
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    }
  }
  //成功状态
  .el-step__head.is-success {
    .el-step__icon-inner {
      display: none;
    }
    .el-step__icon.is-text {
      background: rgba(229, 219, 208, 1);
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    }
    .el-step__line {
      background-color: RGBA(207, 199, 193, 1) !important;
    }
  }
  //线
  .el-step__line {
    background-color: RGBA(207, 199, 193, 1) !important;
    width: 250%;
    left: -10% !important;
    background-color: transparent !important;
    background-size: contain !important;
    background: url(~assets/img/tabs_after.png) no-repeat;
  }
  .el-step {
    &:nth-child(1) {
      // .el-step__line{
      //   width: 180%;
      //   left: -20%!important

      // }
    }
    &:nth-child(3) {
      .el-step__head.is-success {
        .el-step__line {
          width: 220%;
        }
      }
    }
  }
}
.RetrievePassword-Modeltwo {
  width: 538px !important;
  .el-input-group__append,
  .el-input-group__prepend {
    background: #fff;
    border-color: rgba(196, 165, 127, 0.3);
    color: #333;
    font-weight: bold;
  }
  .prant {
    width: 360px !important;
    margin-top: -176px !important;
    margin-left: -25px !important;
    z-index: 99 !important;
  }
  .Model-content-left form div .el-input__inner {
    border-color: rgba(196, 165, 127, 0.3);
  }
  // .el-form-item.is-error .el-input__inner{
  //   border-color: rgba(196, 165, 127, 0.3);
  // }
}
.RetrievePassword-Model .el-dialog__header {
  display: none;
}
.RetrievePassword-Model .el-step__title {
  font-size: 14px;
}
.RetrievePassword-Model .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.RetrievePassword-Model .el-step__title.is-process,
.RetrievePassword-Model .el-step__head.is-process {
  color: #c4a57f;
  font-weight: 400;
}
.RetrievePassword-Model .el-step__icon.is-text {
  border-color: initial;
}
.RetrievePassword-Model .el-step__title.is-success {
  color: rgba(196, 165, 127, 0.5);
}
.RetrievePassword-Model .el-step__head.is-success {
  color: rgba(196, 165, 127, 0.5);
  border-color: rgba(196, 165, 127, 0.5);
}
.RetrievePassword-Model .Model-content {
  height: 350px;
  padding: 16px 89px;
}
.RetrievePassword-Model .Model-content .user-item {
  margin-bottom: 17px;
}
.RetrievePassword-Model .Model-content .pull_slider {
  width: 100%;
  height: 36px;
  border: 1px solid rgba(196, 165, 127, 0.3);
  padding: 0px 4% 0px 7%;
  border-radius: 2px;
}
.RetrievePassword-Model .Model-content .Message-verify .el-input {
  width: 90%;
}
.RetrievePassword-Model .Model-content .Message-verify .btn-verify {
  width: 139px;
  height: 40px;
  color: #000;
  margin-left: 10px;
  font-size: 14px;
  border: 0px;
  border-radius: 3px;
  background: rgba(196, 165, 127, 0.34);
  cursor: pointer;
}
.RetrievePassword-Model .Model-content .btn-next {
  width: 310px;
  height: 36px;
  background: #c4a57f;
  color: #fff;
  font-size: 18px;
  border: 0px;
  line-height: 0px;
}
</style>
