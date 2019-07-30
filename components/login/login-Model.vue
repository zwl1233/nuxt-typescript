<template>
  <section style="height:477px;" class="app-Model-phone">
    <div class="Model-content-left dis_in_block">
      <img :src="require('@/assets/img/XT-login.png')" alt>
      <p class="errorhandlinglogin" style="font-weight:600">登录</p>
      <!-- 手机登录 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="!this.Logonhandover&&!this.Mobileverion"
        :validate-on-rule-change="true"
        @submit.native.prevent
      >
        <el-form-item prop="phone" class="el-from-ml100" style="margin-top:11px;">
          <el-input v-model="ruleForm.phone" placeholder="手机号">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="el-from-ml100">
          <el-input
            v-model="ruleForm.password"
            :type="ruleForm.passType"
            placeholder="密码"
            v-showpas="ruleForm.password"
          >
            <!-- <i slot="suffix" class="el-icon-view" v-if="ruleForm.passType==''" @click="ruleForm.passType='password'"></i>
            <i slot="suffix" class="iconfont icon-yanjing" v-if="ruleForm.passType=='password'" @click="ruleForm.passType=''"></i>-->
          </el-input>
        </el-form-item>

        <el-form-item class="el-from-ml100 el-from-mt10">
          <el-checkbox v-model="checkedphone" class="autoLogin app-check-color-change">自动登录</el-checkbox>
          <span v-if="!this.Mobileverion">
            <a
              class="c4a5 fz14 fr"
              @click="Mailislogin('email','ruleForm')"
              v-if="!this.Logonhandover"
            >海外登录</a>
          </span>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            native-type="submit"
            class="btn-cli"
          >
            <!-- <p style="height:1px;"></p> -->
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <span
            style="cursor: pointer"
            v-if="!this.Mobileverion"
            @click="Mobileveriontab('Verification','ruleForm')"
          >手机验证码登录</span>
          <span class="fz14 fr">
            <a href="##" class="c4a5" @click="Forgetpassword">
              找回密码
              <span class="pas-new">|</span>
            </a>
            <a href="##" class="c077" @click="Newuser">立即注册</a>
          </span>
        </el-form-item>
      </el-form>
      <!-- 境外登录 -->
      <el-form
        :model="ruleFormEmail"
        :rules="rulesEmail"
        ref="ruleFormEmail"
        label-width="100px"
        class="demo-ruleForm"
        key="2"
        v-if="this.Logonhandover&&!this.Mobileverion"
        @submit.native.prevent
      >
        <div style="height:2.19px;"></div>
        <el-form-item prop="email" class="el-from-ml100">
          <el-input placeholder="邮箱" v-model="ruleFormEmail.email"></el-input>
        </el-form-item>
        <el-form-item prop="emailpassword" class="el-from-ml100">
          <el-input
            placeholder="密码"
            type="password"
            class="fonPs"
            v-model="ruleFormEmail.emailpassword"
            v-showpas="ruleFormEmail.emailpassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-from-ml100 tong" style="margin-top:-11px">
          <el-checkbox v-model="checkedemail" class="autoLogin app-check-color-change">自动登录</el-checkbox>
          <span v-if="!this.Mobileverion">
            <a
              class="c4a5 fz14 fr"
              @click="Mailislogin('phone','ruleFormEmail')"
              v-if="this.Logonhandover"
            >手机号登录</a>
          </span>
        </el-form-item>
        <!-- <div style="height:0.1px;"></div> -->
        <!-- <p style="height:0.5px;"></p> -->
        <el-form-item class="el-from-ml100" style="margin-top:-10px">
          <el-button
            type="primary"
            @click="submitForm('ruleFormEmail')"
            native-type="submit"
            class="btn-cli"
          >登录</el-button>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <span
            style="cursor: pointer"
            v-if="!this.Mobileverion"
            @click="Mobileveriontab('Verification','ruleFormEmail')"
          >手机验证码登录</span>
          <span class="fz14 fr">
            <a href="##" class="c4a5" @click="Forgetpassword">
              找回密码
              <span class="pas-new">|</span>
            </a>

            <a href="##" class="c077" @click="Newuser">立即注册</a>
          </span>
        </el-form-item>
      </el-form>
      <!-- 手机验证码 -->
      <el-form
        :model="ruleFormVerion"
        :rules="rulesVerion"
        ref="ruleFormVerion"
        label-width="100px"
        class="demo-ruleForm"
        v-if="this.Mobileverion"
        @submit.native.prevent
      >
        <el-form-item prop="phonevion" class="el-from-ml100">
          <el-input placeholder="手机号" v-model="ruleFormVerion.phonevion">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="Verion" class="el-from-ml100">
          <div class="block pull_slider" v-if="this.visionplay">
            <ImgCheck :rest="rest"/>
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
            <el-input style placeholder="手机验证码" v-model="ruleFormVerion.Verionnumber"></el-input>
            <el-button
              class="btn-verify"
              @click="codeFlag?()=>{}:Getvalidation()"
              style="cursor:pointer;"
              :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
            >
              <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" :key="1"/>
            </el-button>
            <!-- <el-button class="btn-verify" v-if="codeFlag" style="background:#ccc">
              <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" style="cursor:auto;"/>
            </el-button>-->
          </div>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <el-checkbox v-model="checkedvon" class="autoLogin app-check-color-change">自动登录</el-checkbox>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <el-button
            type="primary"
            @click="submitForm('ruleFormVerion')"
            native-type="submit"
            class="btn-cli"
          >登录</el-button>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10">
          <span
            style="cursor: pointer"
            v-if="this.Mobileverion"
            @click="Mobileveriontab('phone','ruleFormVerion')"
          >账号登录</span>
          <span class="fz14 fr">
            <a href="##" class="c4a5" @click="Forgetpassword">
              找回密码
              <span class="pas-new">|</span>
            </a>
            <a href="##" class="c077" @click="Newuser">立即注册</a>
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="Model-content-right dis_in_block errorhandlingsmalltop">
      <img :src="require('@/assets/img/XT-login-right.png')" alt>
      <div class="pos_a" style="bottom:60px" >
        <!-- <img :src="require('@/assets/img/xtWechat.png')" alt> -->
        <div style="width:125px;height:125px" id="login_container">
          <img :src="require('@/assets/img/xtWechat.png')" alt>
        </div>
        <p class="fz14 c3" style="height: 20px;line-height: 20px;margin-top: 10px;">微信扫码登录</p>
      </div>
    </div>
  </section>
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
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
export default {
  data() {
    return {
      ruleForm: {
        //手机表单
        phone: "",
        password: "",
        passType: "password"
      },
      rules: {
        //手机表单判断
        phone: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ],
        password: vaild.password
      },
      ruleFormEmail: {
        //邮箱表单
        email: "",
        emailpassword: ""
      },
      rulesEmail: {
        //邮箱表单判断
        email: [
          { required: true, trigger: "blur", validator: isEmail } //这里需要用到全局变量
        ],
        emailpassword: [
          { required: true, message: "请输入邮箱密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      ruleFormVerion: {
        //手机验证码验证
        phonevion: "",
        Verion: "",
        Verionnumber: ""
      },
      rulesVerion: {
        //手机验证码验证判断
        phonevion: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ],
        Verion: [{ required: true, trigger: "change", validator: Verionesuc }],
        Verionnumber: [
          { required: true, trigger: "blur", validator: vaildShort }
        ]
      },
      checkedphone: false, //复选框
      checkedemail: false, //复选框1
      checkedvon: false, //复选框2
      codeFlag: false, //验证码倒计时开始
      wxPic: "",

       vaildName:"",//获取验证码的手机号或邮箱号
    };
  },
  components: {
    ImgCheck,
    CodeCountDown
  },
  props: {
    newlogin: {
      type: null
    },
    passwordshow: {
      type: null
    },
    closelogin: {
      type: null
    },
    bangshow: {
      type: null
    },
    changgif: {
      type: null
    }
  },
  computed: {
    ...mapState({
      Logonhandover: state => state.login.Logonhandover, //判断邮箱登录还是手机登录
      Mobileverion: state => state.login.Mobilephoneverification, //判断手机验证码登录还是密码登录
      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess, //验证成功
      userstoken: state => state.system.token, //用户token
      time: state => state.system.time //时间
    })
  },
  created () {
  },
  mounted() {
    this.getWxPic();
  },
  methods: {
    rest() {
      this.$refs.ruleFormVerion.validateField("Verion");
    },
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    },
    //校验图片
    vaildImgCheck(flag) {
      console.log("chuf");
      this.rulesVerion = { ...this.rulesVerion };
    },
    ...mapMutations({
      getInfo: "my/info/getInfo", //获取个人信息
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      Mobilephoneverification: "login/Mobilephoneverification", //判断手机验证码登录还是密码登录
      getCookie: "system/getCookie", //获取用户cookie
      Bindingdata: "login/Bindingdata", //传输绑定数据
      loginRefresh: "system/loginRefresh",
      nowTime: "system/nowTime" //传输绑定数据
    }),
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
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Binding();
          //     alert('submit!');//这里就是符合规则，然后去调对应的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      console.log("走我");
      this.$refs[formName].resetFields();
    },
    //切换登录
    Mailislogin(type, forms) {
      this.checkedphone = false;
      this.checkedemail = false;
      this.checkedvon = false;
      //判断如何密码登录
      console.log(forms, "切换");
      this.resetForm(forms);
      if (type == "email") {
        this.Mailboxlogin(true);
      } else {
        this.Mailboxlogin(false);
      }
    },
    //新用户注册
    Newuser() {
      this.newlogin();
      this.Refresh();
    },
    //判断如何登录
    Mobileveriontab(type, forms) {
      this.checkedphone = false;
      this.checkedemail = false;
      this.checkedvon = false;
      console.log(forms, "登录", type);
      this.resetForm(forms);
      if (type == "Verification") {
        //验证码登录
        this.Mobilephoneverification(true);
        this.Refresh();
      } else {
        //密码登录
        this.Mobilephoneverification(false);
        this.Refresh();
      }
    },
    //手机验证码验证
    Verification() {
      this.Vedislay(true);
    },
    //d页面
    Forgetpassword() {
      this.passwordshow();
      this.Refresh();
    },
    //登录按钮 包含登录成功   登录成功绑定页面
    async Binding() {
      //调用绑定接口
      this.Refresh();
      this.nowTime();
      if (!this.Mobileverion) {
        //密码登录
        let isloginpassword;
        if (!this.Logonhandover) {
          console.log("手机密码");
          console.log(this.ruleForm.phone, this.ruleForm.password);
          isloginpassword = await this.$axios.post("/user/loginbypassword", {
            account: this.ruleForm.phone,
            password: this.ruleForm.password
          });
        } else {
          console.log("邮箱密码");
          isloginpassword = await this.$axios.post("/user/loginbypassword", {
            account: this.ruleFormEmail.email,
            password: this.ruleFormEmail.emailpassword
          });
        }
        if (isloginpassword.result !== null) {
          //判断是否需要完善信息
          if (this.checkedphone) {
            this.setCookie("userlogin", isloginpassword.result, 7); //设置cookie
          } else if (this.checkedemail) {
            this.setCookie("userlogin", isloginpassword.result, 7); //设置cookie
          } else {
            this.setCookie("userlogin", isloginpassword.result, 0); //设置cookie
          }

          // this.setCookie("loginmsg",'登录成功', 0);
          this.getCookie();
          this.getuserinfo();
          this.changgif(1);

          // this.$message({
          //   duration: 2000,
          //   message: "登录成功",
          //   type: "success"
          // });
          // this.loginRefresh();
          this.closelogin(); //跳转绑定页面
        } else {
          this.$message({
            duration: 5000,
            message: isloginpassword.msg,
            type: "error"
          });
        }
      }
      //验证码登录
      else {
        if(this.vaildName!=this.ruleFormVerion.phonevion){
          this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
          return 
        }
        let isloginVerification = await this.$axios.post(
          "/user/loginbyconfirm",
          {
            confirmCode: this.ruleFormVerion.Verionnumber,
            mobile: this.ruleFormVerion.phonevion,
            nowTime: this.time
          }
        );
        console.log(isloginVerification.result, "我是验证码登录");
        if (isloginVerification.code == 0) {
          if (this.checkedvon) {
            this.setCookie("userlogin", isloginVerification.result, 7);
          } else {
            this.setCookie("userlogin", isloginVerification.result, 0);
          }
          localStorage.setItem("loginmsg", "登录成功");
          //  this.getCookie()
          this.closelogin();
          this.getuserinfo();
          this.changgif(1);
          // history.go(0)
          this.$message({
            duration: 5000,
            message: this.$selfMsg.loginSucess,
            type: "success"
          });
        } else {
          this.$message({
            duration: 5000,
            message: isloginVerification.msg,
            type: "warning"
          });
        }
      }
    },
    //验证刷新
    Refresh() {
      this.Vedislaysuccess(false);
      this.Vedislay(false);
    },
    //获取验证码
    async Getvalidation() {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(this.ruleFormVerion.phonevion)) {
        this.vaildName=this.ruleFormVerion.phonevion
        if (this.visionplaysuccess) {
          let Getvalidation = await this.$axios.post("/send/sendSms", {
            phoneNumList: [this.ruleFormVerion.phonevion],
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
    },
    //获取用户信息
    getuserinfo() {
      this.getCookie();
      console.log(this.userstoken);
      this.$axios
        .post("/user/getuserinfo", {
          token: ""
        })
        .then(res => {
          this.getInfo(res.result);
        });
    },
    //获取微信登录的二维码
    getWxPic() {
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx0ec5ab0807138971", //  暄桐:wx86b9c08d1269ab6e  私:wx6a0d56eb1c12553b
        scope: "snsapi_login",
        redirect_uri: "http://cr.uat.xuantong.cn",//  暄桐:https://www.xuantong.cn  私:http://118.190.202.65:8086/WxLogin/WxCallback
        state: "login",
        style: "",
        href: "data:text/css;base64,LyogLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMXB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gKi8KLmltcG93ZXJCb3ggLnRpdGxlewogICAgZGlzcGxheTogbm9uZTsKfQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICB3aWR0aDogMTI1cHg7CiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgbWFyZ2luLXRvcDogMDsKfQouaW1wb3dlckJveCAud3JwX2NvZGV7CiAgICB3aWR0aDoxMjVweDsKfQ==",
        response_type: "code"
      });
      // https://open.weixin.qq.com/connect/qrconnect?appid=wx6a0d56eb1c12553b&redirect_uri=http://cr.uat.xuantong.cn/&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect

      //    this.$axios.get("/WxLogin/wxlogin", {}).then(res => {
      //   console.log("wx", res);
      //   if (res.code == 0) {
      //     console.log(res.result)
      //     this.wxPic=res.result
      //   }
      // });
    }
  }
};
</script>

<style lang="less">
.app-Model-phone {
  .autoLogin {
    .el-checkbox__label {
      color: #ccc !important;
    }
  }
  .is-checked {
    .el-checkbox__label {
      color: #b49876 !important;
    }
    .el-checkbox__inner {
      background-color: #b49876 !important;
      border-color: #b49876 !important;
    }
  }
}
.pas-new {
  // color: #07767a;
  font-size: 12px;
  margin: 0px 8px;
  font-weight: normal;
}
.btn-cli {
  height: 40px;
  // line-height: 20px;
  width: 100%;
  background: rgba(7, 118, 122, 1) !important;
}
</style>
