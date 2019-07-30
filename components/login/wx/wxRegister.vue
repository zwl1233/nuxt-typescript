<template>
  <el-dialog
    :visible.sync="registerFlag"
    width="512px"
    class="el-dialog--center app-wx-callback-register"
    :before-close="handleClose"
  >
    <section class="news-regin" style="height:624px">
      <div class="Model-content-left dis_in_block">
        <h4 class="el-h4 app-change-el-h4">欢迎来喧桐</h4>
        <p class="errorhandlinglogin">
          <span :class="{active:this.flagactive}" @click="Registrationswitch('phone')">手机注册</span>
          <span class="app-change-news-regin-line">|</span>
          <span :class="{active:!this.flagactive}" @click="Registrationswitch('email')">海外注册</span>
        </p>
        <!-- 手机注册 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          v-if="this.flagactive"
        >
          <el-form-item prop="phone" class="el-from-ml100" style="margin-top:11px;">
            <el-input v-model="ruleForm.phone" placeholder="手机号">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <div style="height:1px;"></div>
          <el-form-item prop="Verion" class="el-from-ml100">
            <!-- -132px 147 -->
            <div class="block pull_slider" style="marginTop:-147px;" v-if="this.visionplay">
              <ImgCheck :rest="restphone"/>
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
          <el-form-item prop="Verionnumber" class="el-from-ml100">
            <div class="Message-verify flex">
              <el-input style placeholder="请输入六位验证码" v-model="ruleForm.Verionnumber"></el-input>

              <el-button
                class="btn-verify"
                @click="codeFlag?()=>{}:Getvalidation('phone')"
                style="cursor:pointer;"
                v-if="flagactive"
                :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
              >
                <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="2"/>
              </el-button>

              <!-- <el-button class="btn-verify" v-if="codeFlag&&flagactive" style="background:#ccc">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="2"
              />
              </el-button>-->
              <!-- <el-button
              class="btn-verify"
              @click="Getvalidation('phone')"
              style="cursor:pointer;"
              >获取验证码</el-button>-->
            </div>
          </el-form-item>
          <el-form-item prop="name" class="el-from-ml100">
            <el-input
              placeholder="昵称"
              v-model="ruleForm.name"
              autocomplete="new-password"
              v-norecord="'text'"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="el-from-ml100">
            <el-input
              placeholder="密码 (8-16位字母＋数字组合)"
              class="fonPs"
              autocomplete="new-password"
              type="password"
              v-model="ruleForm.password"
              v-showpas="ruleForm.password"
              v-norecord="'password'"
            >
              <!-- <i
              slot="suffix"
              class="el-icon-view"
              v-if="ruleForm.newPasType==''"
              @click="ruleForm.newPasType='password'"
            ></i>
            <i
              slot="suffix"
              class="iconfont icon-yanjing"
              v-if="ruleForm.newPasType=='password'"
              @click="ruleForm.newPasType=''"
              ></i>-->
            </el-input>
          </el-form-item>
          <el-form-item prop="newpassword" class="el-from-ml100">
            <el-input
              placeholder="再次确认密码"
              autocomplete="new-password"
              type="password"
              class="fonPs"
              v-model="ruleForm.newpassword"
              v-showpas="ruleForm.password"
              v-norecord="'password'"
            >
              <!-- <i
              slot="suffix"
              class="el-icon-view"
              v-if="ruleForm.oldPasType==''"
              @click="ruleForm.oldPasType='password'"
            ></i>
            <i
              slot="suffix"
              class="iconfont icon-yanjing"
              v-if="ruleForm.oldPasType=='password'"
              @click="ruleForm.oldPasType=''"
              ></i>-->
            </el-input>
          </el-form-item>
          <el-form-item class="el-from-ml100 app-Model-content-left-tong" style="marginTop:-5px">
            <el-checkbox v-model="checked" class="app-check-color-change">我已看过并同意</el-checkbox>
            <a class="c4a5 fz14" @click="modeldetailref">{{xieyiname}}</a>
          </el-form-item>
          <el-form-item class="el-from-ml100">
            <el-button
              class="btn-login"
              @click="submitForm('ruleForm')"
              style="cursor:pointer;padding:0"
            >注册</el-button>
            <!-- <button class="btn-login" @click="Binding" style="cursor:pointer;">注册</button> -->
          </el-form-item>
        </el-form>
        <!-- 邮箱注册 -->
        <el-form
          :model="ruleFormEmail"
          :rules="rulesEmail"
          ref="ruleFormEmail"
          label-width="100px"
          class="demo-ruleForm"
          v-if="!this.flagactive"
        >
          <div style="height:2.8px;"></div>
          <el-form-item prop="email" class="el-from-ml100">
            <el-input v-model="ruleFormEmail.email" placeholder="邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="emailVerion" class="el-from-ml100">
            <div class="block pull_slider" style="marginTop:-147px;" v-if="this.visionplay">
              <ImgCheck :rest="restemail"/>
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
          <el-form-item prop="emailVerionnumber" class="el-from-ml100">
            <div class="Message-verify flex">
              <el-input style placeholder="邮箱验证码" v-model="ruleFormEmail.emailVerionnumber"></el-input>
              <el-button
                class="btn-verify"
                @click="codeFlag?()=>{}:Getvalidation('email')"
                style="cursor:pointer;"
                v-if="!flagactive"
                :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
              >
                <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="3"/>
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="emailname" class="el-from-ml100">
            <el-input
              placeholder="昵称"
              v-model="ruleFormEmail.emailname"
              autocomplete="new-password"
              v-norecord="'text'"
            ></el-input>
          </el-form-item>
          <el-form-item prop="emailpassword" class="el-from-ml100">
            <el-input
              placeholder="密码 (8-16位字母＋数字组合)"
              autocomplete="new-password"
              type="password"
              class="fonPs"
              v-model="ruleFormEmail.emailpassword"
              v-showpas="ruleFormEmail.emailpassword"
              v-norecord="'password'"
            ></el-input>
          </el-form-item>
          <el-form-item prop="emailnewpassword" class="el-from-ml100">
            <el-input
              placeholder="再次确认密码"
              type="password"
              class="fonPs"
              v-model="ruleFormEmail.emailnewpassword"
              v-showpas="ruleFormEmail.emailnewpassword"
              v-norecord="'password'"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="el-from-ml100 tong app-Model-content-left-tong"
            style="marginTop:-5px"
          >
            <el-checkbox v-model="checked" style="top:-0px" class="app-check-color-change">同意</el-checkbox>
            <a class="c4a5 fz14" @click="modeldetailref">{{xieyiname}}</a>
          </el-form-item>
          <el-form-item class="el-from-ml100">
            <!-- @click="submitForm('ruleFormEmail')" -->
            <!-- @click="storageobj" -->
            <el-button
              class="btn-login"
              @click="submitForm('ruleFormEmail')"
              style="cursor:pointer;padding:0"
            >注册</el-button>
            <!-- <button class="btn-login" @click="Binding" style="cursor:pointer;">注册</button> -->
          </el-form-item>
        </el-form>
      </div>
      <!-- 微信扫码注册 -->
      <div class="Model-content-right dis_in_block errorhandlingsmalltop" v-if="false">
        <img :src="require('@/assets/img/XT-login-right.png')" alt>
        <div class="pos_a">
          <div style="width:125px;height:125px" id="login_container">
            <!-- <img :src="require('@/assets/img/xtWechat.png')" alt> -->
          </div>
          <!-- <img :src="wxPic" alt style="width:125px;height:125px;display:inline-block"> -->
          <p class="fz14 c3" style="height: 20px;line-height: 20px;margin-top: 10px;">微信扫码注册</p>
        </div>
      </div>
      <!-- <RegistrationAgreement :Agreement="Agreement" ref="RegistrationAgreementflag"/> -->
    </section>
  </el-dialog>
  
  
</template>
<script>
import ImgCheck from "@/components/ImgCheck";
import {
  validPhone,
  Verionesuc,
  isEmail,
  vaildShort
} from "@/plugins/utils.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import RegistrationAgreement from "@/components/RegistrationAgreement"; //了解详情
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
// 微信注册
export default {
  data() {
    let confirmPas = (rule, value, callback) => {
      console.log(this.ruleForm.password, value, "2mima");
      if (value == this.ruleForm.password) {
        console.log("密码一致");
        return callback();
      } else {
        return callback(new Error("密码不一致"));
      }
    };
    let confirmEmailPas = (rule, value, callback) => {
      console.log(this.ruleFormEmail.emailpassword, value, "2mima");
      if (value == this.ruleFormEmail.emailpassword) {
        console.log("密码一致");
        return callback();
      } else {
        return callback(new Error("密码不一致"));
      }
    };
    return {
      Agreement:'',
      flagactive: true, //注册切换  true=> phone:手机 false=> email:邮箱
      xieyiname: "《 用户协议 》",
      codeFlag: false, //验证码倒计时开始
      ruleForm: {
        //手机表单
        phone: "", //手机号
        Verionnumber: "", //验证码
        name: "", //昵称
        password: "", //密码
        newpassword: "", //确认密码
        Verion: ""
      },
      rules: {
        //手机表单判断 vaildShort
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        Verion: [{ required: true, validator: Verionesuc }],
        Verionnumber: [
          { required: true, trigger: "blur", validator: vaildShort }
        ],
        name: vaild.nickName,
        password: vaild.password,
        newpassword: [
          { required: true, validator: confirmPas, trigger: "blur" }
          // { required: true, message: "请输入确认密码", trigger: "blur" },
          // { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      ruleFormEmail: {
        //邮箱表单
        email: "", //手机号
        emailVerionnumber: "", //验证码
        emailname: "", //昵称
        emailpassword: "", //密码
        emailnewpassword: "", //确认密码
        emailVerion: ""
      },
      rulesEmail: {
        //邮箱表单判断
        email: [
          { required: true, trigger: "blur", validator: isEmail } //这里需要用到全局变量
        ],
        emailVerion: [
          { required: true, trigger: "blur", validator: Verionesuc }
        ],
        emailVerionnumber: [
          { required: true, trigger: "blur", validator: vaildShort }
        ],
        emailname: vaild.nickName,
        // emailpassword: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        // ],
        emailpassword: vaild.password,
        emailnewpassword: [
          { required: true, validator: confirmEmailPas, trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  computed: {
    ...mapState({
      registerFlag: state => state.wxin.registerFlag, //微信注册flag
      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess //验证成功
    })
  },
  methods: {
    ...mapMutations({
      changeRegisterFlag: "wxin/changeRegisterFlag", //改变微信注册状态
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay" //验证重新开始
    }),
    handleClose() {
      this.changeRegisterFlag(false);
    },
    //注册切换
    Registrationswitch(type) {
      if (type == "phone") {
        if (this.flagactive) return;
        this.codeFlag = false;
        this.resetForm("ruleFormEmail");
        this.activeclass(true);
        this.Vedislaysuccess(false);
      } else {
        if (!this.flagactive) return;
        this.codeFlag = false;
        this.resetForm("ruleForm");
        this.activeclass(false);
        this.Vedislaysuccess(false);
      }
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    activeclass(flag) {
      this.flagactive = flag;
    },
    //验证
    Verification() {
      this.Vedislay(true);
    },
    restphone() {
      this.$refs.ruleForm.validateField("Verion");
    },
    restemail() {
      this.$refs.ruleFormEmail.validateField("emailVerion");
    },
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    },
    //喧桐协议
    modeldetailref() {
      // this.modeldetail();
      // this.$axios.post("/course/purchaseagreement", {}).then(res => {
      //   this.Agreement = res.result;
      // });
      this.$refs.RegistrationAgreementflag.flagchange(2);
    },
    //获取验证码
    async Getvalidation(type) {
      console.dir();
      // this.$refs.ruleForm.validateField(['phone'])
      //手机验证码
      if (type == "phone") {
        if (this.$refs.ruleForm.$el.childNodes[0].children[0].children[1])
          return;
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(this.ruleForm.phone)) {
          if (this.visionplaysuccess) {
            let Getvalidation = await this.$axios.post("/send/sendSms", {
              phoneNumList: [this.ruleForm.phone],
              sendType: 1
            });
            if (Getvalidation.code == 0) {
              this.changeCode(true);
            }
            console.log(Getvalidation.result);
          } else {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.pleaseVaildImg,
              type: "success"
            });
          }
        } else {
          return;
        }
      }
      //邮箱验证码
      else {
        const reg = /^.*@.+\..+$/;
        if (reg.test(this.ruleFormEmail.email)) {
          if (this.visionplaysuccess) {
            let Getvalidation = await this.$axios.post("/send/sendEmail", {
              emailList: [this.ruleFormEmail.email],
              sendType: 1
            });
            if (Getvalidation.code == 0) {
              this.changeCode(true);
            }
            console.log(Getvalidation.result);
          } else {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.pleaseVaildImg,
              type: "success"
            });
          }
        } else {
          return;
        }
      }
    },
    //提交
    //表单验证
    submitForm(formName) {
      return;
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "ruleFormEmail") {
            if (this.checked) {
              this.storageobj();
            } else {
              this.$message({
                duration: 5000,
                message: this.$selfMsg.Agreement,
                type: "success"
              });
            }
          } else {
            this.Binding();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
  },
  components: {
    ImgCheck,
    CodeCountDown,
    RegistrationAgreement
  }
};
</script>
<style lang="less">
.app-wx-callback-register {
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body {
    background: white;
    border-radius: 5px;
    padding: 0px;
    .Model-content-left {
      border-radius: 5px;
      height: 620px;
      background: #ffffff;
      box-shadow: 0px 3px 30px 0px rgba(14, 5, 10, 0.05);
      opacity: 0.95;
      padding: 30px 102px 37px;
      width: 512px;
      .app-change-el-h4 {
        font-size: 22px;
        color: #07767a;
        font-weight: 400;
        line-height: 32px;
        margin-bottom: 20px;
      }
      .errorhandlinglogin {
        height: 19px;
        line-height: 19px;
        margin-top: 0px;
        margin-bottom: 10px;
        .active {
          font-weight: bold;
          color: #000;
        }
        span {
          margin-right: 10px;
          cursor: pointer;
          color: #999999;
        }
        .app-change-news-regin-line {
          color: #c4a57f !important;
          margin-left: 0 !important;
          font-size: 12px;
          font-weight: 600;
        }
      }
      .demo-ruleForm {
        .el-input-group__prepend {
          background: #fff;
          border-color: rgba(196, 165, 127, 0.3);
          color: #333;
          font-weight: bold;
          padding: 0 10px;
        }
        .pull_slider {
          border: 1px solid rgba(196, 165, 127, 0.3);
          padding: 0px 4% 0px 7%;
          border-radius: 2px;
          width: 100%;
          height: 40px !important;
          position: relative;
          line-height: 45px;
          .prant{
            margin-top: -25px;
          }
          
        }
        .el-input__inner {
          border-color: rgba(196, 165, 127, 0.3);
        }
      }
    }
    .Model-content-right {
      height: 620px;
      background: rgba(14, 5, 10, 0.05);
      box-shadow: 0px 3px 30px 0px rgba(14, 5, 10, 0.05);
      opacity: 0.95;
      vertical-align: top;
      padding: 83px 64px 66px;
      text-align: center;
      position: relative;
      width: 253px;
    }
  }
}
</style>
