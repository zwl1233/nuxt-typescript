<template>
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

            <!-- <el-button class="btn-verify" v-if="codeFlag&&!flagactive" style="background:#ccc">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="1"
              />
            </el-button>-->
            <!-- <el-button
              class="btn-verify"
              @click="Getvalidation('email')"
              style="cursor:pointer;"
            >获取验证码</el-button>-->
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
          >
            <!-- <i
              slot="suffix"
              class="el-icon-view"
              v-if="ruleFormEmail.newPasType==''"
              @click="ruleFormEmail.newPasType='password'"
            ></i>
            <i
              slot="suffix"
              class="iconfont icon-yanjing"
              v-if="ruleFormEmail.newPasType=='password'"
              @click="ruleFormEmail.newPasType=''"
            ></i>-->
          </el-input>
        </el-form-item>
        <el-form-item prop="emailnewpassword" class="el-from-ml100">
          <el-input
            placeholder="再次确认密码"
            type="password"
            class="fonPs"
            v-model="ruleFormEmail.emailnewpassword"
            v-showpas="ruleFormEmail.emailnewpassword"
            v-norecord="'password'"
          >
            <!-- <i
              slot="suffix"
              class="el-icon-view"
              v-if="ruleFormEmail.oldPasType==''"
              @click="ruleFormEmail.oldPasType='password'"
            ></i>
            <i
              slot="suffix"
              class="iconfont icon-yanjing"
              v-if="ruleFormEmail.oldPasType=='password'"
              @click="ruleFormEmail.oldPasType=''"
            ></i>-->
          </el-input>
        </el-form-item>
        <el-form-item class="el-from-ml100 tong app-Model-content-left-tong" style="marginTop:-5px">
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
    <div class="Model-content-right dis_in_block errorhandlingsmalltop">
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
</template>
 
<script>
// import RegistrationAgreement from "@/components/RegistrationAgreement"; //了解详情
import ImgCheck from "@/components/ImgCheck";
import {
  validPhone,
  Verionesuc,
  isEmail,
  vaildShort
} from "@/plugins/utils.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
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
      Agreement: "11111111111111111111111",
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
        phone: [{ required: true, trigger: "blur", validator: validPhone}],
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
      checked: false,
      wxPic: "",
      vaildName:"",
    };
  },
  components: {
    ImgCheck,
    CodeCountDown
    // RegistrationAgreement
  },
  props: {
    closeloginnew: {
      type: null
    },
    bangshow: {
      type: null
    },
    modeldetail: {
      type: null
    },
    changgif: {
      type: null
    }
  },
  computed: {
    ...mapState({
      flagactive: state => state.login.activeclass, //注册切换
      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess, //验证成功
      userstoken: state => state.system.token, //用户token
      Time: state => state.system.time,
      storagelist: state => state.system.storagelist
    })
  },
  mounted() {
    this.getWxPic();
  },
  methods: {
    ...mapMutations({
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      activeclass: "login/activeclass", //注册切换
      getCookie: "system/getCookie", //获取用户cookie
      Bindingdata: "login/Bindingdata", //传输绑定数据
      nowTime: "system/nowTime",
      changstorage: "system/changstorage",
      getInfo: "my/info/getInfo" //获取个人信息,
    }),
    //邮箱进入绑定
    storageobj() {
      if(this.vaildName!=this.ruleFormEmail.email){
            this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
          return
          }

      let res = {
        needMobile: true,
        needEmail: false,
        needWeixin: true
      };
      this.Bindingdata(res);
      this.changstorage(this.ruleFormEmail);
      this.bangshow();
      this.closeloginnew();
      console.log(this.ruleFormEmail);
      // this.getbang(2);
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
    //网易刷新
    Refresh() {
      this.Vedislaysuccess(false);
      this.Vedislay(false);
    },
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
    //表单验证
    submitForm(formName) {
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
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //验证
    Verification() {
      this.Vedislay(true);
    },
    //注册切换
    Registrationswitch(type) {
      if (type == "phone") {
        this.codeFlag = false;
        this.resetForm("ruleFormEmail");
        this.activeclass(true);
        this.Vedislaysuccess(false);
      } else {
        this.codeFlag = false;
        this.resetForm("ruleForm");
        this.activeclass(false);
        this.Vedislaysuccess(false);
      }
    },
    async Binding() {
      this.nowTime();
      if (this.checked) {
        //手机注册
        if (this.flagactive) {
          if(this.vaildName!=this.ruleForm.phone){
            this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
            return
          }
          let phone = await this.$axios.post("/user/registerbymobile", {
            confirmCode: this.ruleForm.Verionnumber,
            mobible: this.ruleForm.phone,
            newPassword: this.ruleForm.password,
            newPasswordConfirm: this.ruleForm.newpassword,
            nickName: this.ruleForm.name,
            nowTime: this.Time
          });
          if (phone.result) {
            this.setCookie("userlogin", phone.result, 0);
            this.getCookie(); //获取cookie
            this.$axios
              .post("/user/getuserinfo", {
                token: ""
              })
              .then(res => {
                this.getInfo(res.result);
              });
            this.changgif(3);
            // this.$message({
            //   duration: 2000,
            //   message: "注册成功",
            //   type: "success"
            // });
            // this.getbang(1);
            this.closeloginnew();
            //  history.go(0)
          } else {
            this.$message({
              duration: 5000,
              message: phone.msg,
              type: "error"
            });
          }
          console.log(phone, "我是手机号注册");
        }
        //邮箱注册
        else {
          if(this.vaildName!=this.ruleFormEmail.email){
            this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
          return
          }
          let email = await this.$axios.post("/user/registerbyemail", {
            confirmCode: this.ruleFormEmail.emailVerionnumber,
            email: this.ruleFormEmail.email,
            newPassword: this.ruleFormEmail.emailpassword,
            newPasswordConfirm: this.ruleFormEmail.emailnewpassword,
            nickName: this.ruleFormEmail.emailname,
            nowTime: this.Time
          });
          console.log(email, "我是邮箱注册");
          if (email.result) {
            this.setCookie("userlogin", email.result, 0);
            this.getCookie(); //获取cookie
            this.$message({
              duration: 5000,
              message: this.$selfMsg.registerSucess,
              type: "success"
            });
            this.getbang(2);
            this.closeloginnew();
            //  history.go(0)
          } else {
            this.$message({
              duration: 5000,
              message: email.msg,
              type: "error"
            });
          }
        }
      } else {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.Agreement,
          type: "success"
        });
      }
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
            this.vaildName=this.ruleForm.phone
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
            this.vaildName=this.ruleFormEmail.email
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
    //绑定页面数据
    getbang(type) {
      // this.$axios
      //   .post("/user/needCompleteregistrationinfo", {
      //     token: "",
      //     registerType: type
      //   })
      //   .then(res => {
      //     this.Bindingdata(res.result);
      //     console.log(res.result, "我是需要绑定的数据");
      //     this.bangshow();
      //   });
      if (type == 2) {
        let res = {
          needMobile: true,
          needEmail: false,
          needWeixin: true
        };
        this.Bindingdata(res);
        this.bangshow();
      }
    },
    //喧桐协议
    modeldetailref() {
      this.modeldetail();
      // this.$axios.post("/course/purchaseagreement", {}).then(res => {
      //   this.Agreement = res.result;
      // });
      // this.$refs.RegistrationAgreementflag.flagchange();
    },
    //获取微信验证码
    getWxPic() {
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx0ec5ab0807138971",
        scope: "snsapi_login",
        redirect_uri: "http://cr.uat.xuantong.cn",
        state: "login",
        style: "",
        href: "data:text/css;base64,LyogLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMXB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gKi8KLmltcG93ZXJCb3ggLnRpdGxlewogICAgZGlzcGxheTogbm9uZTsKfQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICB3aWR0aDogMTI1cHg7CiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgbWFyZ2luLXRvcDogMDsKfQouaW1wb3dlckJveCAud3JwX2NvZGV7CiAgICB3aWR0aDoxMjVweDsKfQ==",
        response_type: "code"
      });
    }
  }
};
</script>

<style lang="less">
//修改3:
.app-change-el-h4 {
  font-size: 22px;
  color: rgba(7, 118, 122, 1);
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 20px;
}
.app-change-news-regin-line {
  color: rgba(196, 165, 127, 1) !important;
  margin-left: 0 !important;
  font-size: 12px;
  font-weight: 600;
}

.app-Model-content-left-tong {
  & > .el-form-item__content > .el-checkbox.is-checked {
    .el-checkbox__label {
      color: #b49876;
    }
    .el-checkbox__inner {
      background-color: #b49876 !important;
      border-color: #b49876 !important;
    }
  }
}
.custom {
  height: 40px !important;
  line-height: 40px;
  position: relative;
  line-height: 45px;
  a {
    position: absolute;
    top: -0px;
    line-height: 40px;
    left: 60px;
  }
  span {
    text-align: center;
    border-radius: 50%;
    background: #e6ddd1;
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
    margin-top: 10px;
    cursor: pointer;
    b {
      position: absolute;
      background: #c4a57f;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 20px;
      line-height: 20px;
      left: 4px;
      top: 4px;
    }
  }
}
.customs {
  height: 40px !important;
  line-height: 40px;
  border: 1px solid #1ebe5e !important;
  background: #edfef4;
  span {
    background: #1ebe5e !important;
    color: white !important;
    line-height: 20px;
    //   top: -5px;
  }
  a {
    color: #1ebe5e;
  }
}
.prant {
  width: 360px;
  margin-top: -185px;
  margin-left: -25px;
  z-index: 99;
}
.news-regin {
  .Model-content-left {
    overflow: none !important;
  }
  .RegistrationAgreement-Model .el-dialog__body {
    padding: 0px 66px 40px !important;
  }
  .RegistrationAgreement-Model .Model-content > h4 {
    position: relative;
    top: -54px;
    margin-top: 0 !important;
  }
  .RegistrationAgreement-Model .Model-content > h4 + div {
    margin-top: -70px;
  }
  .RegistrationAgreement-Model .Model-content .Agreement-text .Agreement-title {
    line-height: 22px;
    margin-bottom: 0px;
    margin-top: -20px;
  }
  .RegistrationAgreement-Model {
    .el-dialog__header {
      display: block !important;
    }
  }
}
</style>
