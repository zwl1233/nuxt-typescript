<template>
  <section class="app-Wechat-Modeltwo">
    <div class="Model-content">
      <div class="errorhandling50">
        <img
          :src="require('@/assets/img/list_img1.png')"
          class="user-head"
          alt
          width="30px"
          height="30px"
        >
        <span class="c4a5 fz17 ml-15">您好，欢迎来到暄桐</span>
      </div>

      <p class="fz12 errorhandlingtel Unified">请选择以下任意一种方式绑定,用于快速找回密码</p>
      <p class="errorhandlinglogin disbang">
        <span
          :class="{active:bindflag=='one'}"
          @click="ctv('one','ruleFormEmail')"
          v-if="list.needMobile"
        >手机绑定</span>
        <span
          :class="{active:bindflag=='two'}"
          @click="ctv('two','ruleFormVerion')"
          v-if="list.needEmail"
        >邮箱绑定</span>
        <span
          :class="{active:bindflag=='three'}"
          @click="ctv('three',null)"
          v-if="list.needWeixin"
        >微信绑定</span>
      </p>
      <el-form
        v-if="bindflag=='one'&&list.needMobile"
        :model="ruleFormVerion"
        :rules="rulesVerion"
        ref="ruleFormVerion"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="phonevion"
          class="el-from-ml100 user-item errorhandlingdiv Unified"
          style="marginTop:5px;"
        >
          <el-input placeholder="手机号" v-model="ruleFormVerion.phonevion" style="width:312px">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="Verion" class="el-from-ml100" style="margin-top:25px">
          <div class="block pull_slider" v-if="this.visionplay">
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
            <el-input placeholder="手机验证码" v-model="ruleFormVerion.Verionnumber" style="width:199px"></el-input>
            <el-button
              class="btn-verify"
              @click="codeFlag?()=>{}:Getvalidation()"
              style="cursor:pointer;width:102px"
              :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
            >
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                key="2"
              />
            </el-button>
            <!-- <el-button class="btn-verify" v-if="codeFlag" style="background:#ccc;width:102px">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="2"
              />
            </el-button> -->
          </div>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10" style="marginTop:30px">
           <!-- @click="submitForm('ruleFormVerion')" -->
          <el-button
            type="primary"
            @click="submitForm('ruleFormVerion')"
            style="width:312px;background:#c4a57f;border:#c4a57f"
          >绑定</el-button>
        </el-form-item>
        <p class="text-center errorhandlingteltwo Unified">
          <span class="c9 fz14">
            温馨提示:不绑定是无法完成注册的哦~~~
            <!-- 账号暂时先不绑定手机， -->
            <!-- <a class="c4a5" @click="closebang">跳过</a> -->
          </span>
        </p>
      </el-form>

      <el-form
        v-if="bindflag=='two'&&list.needEmail"
        :model="ruleFormEmail"
        :rules="rulesEmail"
        ref="ruleFormEmail"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="email"
          class="el-from-ml100 user-item errorhandlingdiv Unified"
          style="marginTop:5px;"
        >
          <el-input placeholder="邮箱" v-model="ruleFormEmail.email" style="width:312px"></el-input>
        </el-form-item>
        <el-form-item prop="emailVerion" class="el-from-ml100" style="marginTop:25px">
          <div class="block pull_slider" v-if="this.visionplay">
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
            <el-input
              placeholder="邮箱验证码"
              v-model="ruleFormEmail.emailVerionnumber"
              style="width:199px"
            ></el-input>
            <el-button
              class="btn-verify"
              @click="codeFlag?()=>{}:Getvaliemail()"
              style="cursor:pointer;width:102px"
               :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
            >
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                key="1"
                
              />
            </el-button>
            <!-- <el-button class="btn-verify" v-if="codeFlag" style="background:#ccc;width:102px">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="1"
              />
            </el-button> -->
            <!-- <el-button
              class="btn-verify"
              @click="Getvaliemail"
              style="cursor:pointer;width:102px"
              v-if="!emailCodeFlag"
            >
              <CodeCountDown :codeFlag="emailCodeFlag" :changeCode="changeEmailCode" style="cursor:auto;"/>
            </el-button>
            <el-button class="btn-verify" style="cursor:auto;width:102px;background:#ccc;" v-if="emailCodeFlag">
              <CodeCountDown :codeFlag="emailCodeFlag" :changeCode="changeEmailCode" style="cursor:auto;"/>
            </el-button>-->
          </div>
        </el-form-item>
        <el-form-item class="el-from-ml100 el-from-mt10" style="marginTop:30px">
          <el-button
            type="primary"
            @click="submitForm('ruleFormEmail')"
            style="width:312px;background:#c4a57f;border:#c4a57f"
          >绑定</el-button>
        </el-form-item>
      </el-form>
      <div
        class="text-center Unified"
        width="100%"
        style="marginTop:75px;"
        v-show="bindflag=='three'&&list.needWeixin"
      >
        <div class="errorhandlingsmalltop app-login_container" id="login_container">
          <!-- <img :src="require('@/assets/img/xtWechat.png')" alt> -->
        </div>
          <p class="fz14 c3 errorhandlingsmall">微信扫码注册</p>
      </div>
    </div>
  </section>
</template>

<script>
import ImgCheck from "@/components/ImgCheck";
import { validPhone, Verionesuc,vaildShort,isEmail } from "@/plugins/utils.js";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
export default {
  data() {
    return {
      
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
        Verion: [{ required: true, trigger: "blur", validator: Verionesuc }],
        Verionnumber: [{ required: true, trigger: "blur", validator: vaildShort }],
      },
      ruleFormEmail: {
        //邮箱表单
        email: "",
        emailVerion: "",
        emailVerionnumber: ""
      },
      rulesEmail: {
        //邮箱表单判断
        email: [
         { required: true, trigger: "blur", validator: isEmail }
        ],
        emailVerion: [
          { required: true, trigger: "blur", validator: Verionesuc }
        ],
        emailVerionnumber:[{ required: true, trigger: "blur", validator: vaildShort }],
      },
      codeFlag: false, //手机验证码倒计时开始
      emailCodeFlag: false,

      vaildName:"",//获取验证码的手机号或邮箱号
    };
  },
  components: {
    ImgCheck,
    CodeCountDown
  },
  props: {
    closebang: {
      type: null
    },
    list: {
      type: null
    },
    changgif: {
      type: null
    }
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info,

      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess, //验证成功

      bindflag: state => state.login.bindflag, //切换

      time: state => state.system.time ,//时间

      storagelist: state => state.system.storagelist
    })
  },
  methods: {
    ...mapMutations({
      getInfo: "my/info/getInfo", //获取个人信息

      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      getCookie: "system/getCookie", //获取用户cookie

      bindflagchange: "login/bindflagchange", //切换

      nowTime: "system/nowTime" //传输绑定数据
    }),
    //设置token
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
        document.cookie = name + "=" + escape(value)+";path=/";
      }
    },
    //绑定注册一块
    async NewSuser(form){
      this.nowTime();
      let email = await this.$axios.post("/user/registerbyemail", {
            confirmCode:form.emailVerionnumber,
            email:form.email,
            newPassword:form.emailpassword,
            newPasswordConfirm:form.emailnewpassword,
            nickName:form.emailname,
            nowTime: this.time
          });
          console.log(email, "我是邮箱注册");
          if (email.result) {
            this.setCookie("userlogin", email.result, 0);
            // this.getCookie(); //获取cookie
            this.getinfos(1);
            // this.BiVerionIcephone()
            // this.closebang();
          } else {
            this.$message({
              duration: 5000,
              message: email.msg,
              type: "error"
            });
          }
    },
    restphone() {
          this.$refs.ruleFormVerion.validateField("Verion");
    },
    restemail(){
          this.$refs.ruleFormEmail.validateField("emailVerion");
    }, 
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    },
    changeEmailCode(flag) {
      this.emailCodeFlag = flag;
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //这里就是符合规则，然后去调对应的接口
          if (formName == "ruleFormVerion") {
              this.NewSuser(this.storagelist)
          } else {
            this.getinfos(2)
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
    //手机验证码验证
    Verification() {
      this.Vedislay(true);
    },
    Refresh() {
      //验证刷新
      this.Vedislay(false);
      this.Vedislaysuccess(false);
    },
    //手机绑定
    async BiVerionIcephone(studentId) {
      console.log(this.vaildName,this.ruleFormVerion.phonevion)
      if(this.vaildName!=this.ruleFormVerion.phonevion){
        this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
        return
      }
      this.nowTime();
      console.log(studentId,'??????ssssssssssss????????????????')
      let datalogin = await this.$axios.post("/user/bindingmobile", {
        mobile: this.ruleFormVerion.phonevion,
        confirmCode: this.ruleFormVerion.Verionnumber,
        nowTime: this.time,
        studentId:studentId
      });
      if (datalogin.result) {
        this.changgif(4);
        // this.$message({
        //     duration: 2000,
        //     message: '绑定成功',
        //     type: "success"
        //   });
          this.closebang();
      } else {
        if (datalogin.code !== 0) {
          this.$message({
            duration: 5000,
            message: datalogin.msg,
            type: "error"
          });
        }
      }
    },
    //邮箱绑定
    async BiVerionIceemail(studentId) {
      if(this.vaildName!=this.ruleFormEmail.email){
        this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
        return
      }
      this.nowTime();
      let datalogin = await this.$axios.post("/user/bindingemail", {
        email: this.ruleFormEmail.email,
        confirmCode: this.ruleFormEmail.emailVerionnumber,
        nowTime: this.time,
        studentId: studentId
      });
      if (datalogin.result) {
        this.$message({
            duration: 5000,
            message: this.$selfMsg.bindingSucess,
            type: "success"
          });
        this.closebang();
      } else {
        if (datalogin.code !== 0) {
          this.$message({
            duration: 5000,
            message: datalogin.msg,
            type: "error"
          });
        }
      }
    },
    //获取手机验证码
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
    //获取邮箱验证码
    async Getvaliemail() {
      const reg = /^.*@.+\..+$/;
      if (reg.test(this.ruleFormEmail.email)) {
        this.vaildName=this.ruleFormEmail.email
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
    },
    //切换
    ctv(type, forms) {
      this.bindflagchange(type);
      this.Refresh();
      this.codeFlag = false;
      if (type == "one" || type == "two") {
        if (!this.list.needMobile) {
          this.resetForm(forms);
          return;
        }
      }
    },
    //获取用户个人信息
    getinfos(type) {
      this.getCookie(); //获取cookie
      let that = this
      this.$axios
        .post("/user/getuserinfo", {
          token: ""
        })
        .then(res => {
          if(type==1){
            this.BiVerionIcephone(res.result.studentId)
          }else if(type==2){
            this.BiVerionIceemail(res.result.studentId)
          }
           this.getInfo(res.result);
           console.log(res);
        });
    },
     getWxPic() {
       console.log(this.storagelist)
       localStorage.setItem("storagelist",JSON.stringify(this.storagelist))
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx0ec5ab0807138971", //  暄桐:wx86b9c08d1269ab6e  私:wx6a0d56eb1c12553b
        scope: "snsapi_login",
        redirect_uri: "http://cr.uat.xuantong.cn",//  暄桐:https://www.xuantong.cn  私:http://118.190.202.65:8086/WxLogin/WxCallback
        state: "email",
        style: "",
        href: "data:text/css;base64,LyogLmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMXB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gKi8KLmltcG93ZXJCb3ggLnRpdGxlewogICAgZGlzcGxheTogbm9uZTsKfQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgICB3aWR0aDogMTI1cHg7CiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgbWFyZ2luLXRvcDogMDsKfQouaW1wb3dlckJveCAud3JwX2NvZGV7CiAgICB3aWR0aDoxMjVweDsKfQ==",
        response_type: "code"
      });
      }
  },
  mounted () {
    this.getWxPic()
  },
  beforeDestroy () {
    // localStorage.removeItem("storagelist")
  }
};
</script>

<style lang="less">
.app-login_container{
  width: 125px;
  height: 125px;
  margin: 0 auto!important;

}
.Wechat-Model form div .pull_slider {
  width: 312px !important;
}
.disbang {
  text-align: center;
  width: 320px;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  span {
    width: 80px;
    padding-left: 20px;
    display: inline-block;
    height: 12px;
    line-height: 12px;
    border-left: 1px solid #999999;
    color: black !important;
  }
  span:nth-of-type(1) {
    border: none;
  }
}
.Unified {
  width: 312px !important;
}
.Unified1 {
  width: 312px !important;
  margin-left: 0px !important;
}
/** Wechat **/
.app-Wechat-Modeltwo {
  .prant {
    width: 360px;
    margin-top: -176px !important;
    margin-left: -25px;
    z-index: 99 !important;
  }
  .el-dialog--center .el-dialog__body {
    padding: 15px 20px 30px !important;
  }
  .Wechat-Model form .btn-login {
    margin-left: 10px;
  }
  .Model-content {
    margin-left: 0px !important;
  }
  .el-tabs__content {
    overflow: visible;
  }
  .blocks {
    width: 100%;
    height: 36px;
    padding: 0px 4% 0px 7%;
    border-radius: 2px;
  }
  .el-tabs__nav {
    width: 312px !important;
  }
}
.Wechat-Model .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.Wechat-Model .el-step__title {
  font-size: 14px;
}
.Wechat-Model .el-dialog__header {
  display: none;
}
.Wechat-Model .Model-content {
  // height: 433px;!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  height: 453px;
  padding: 11px 88px;
  width: 539px;
  margin-left: -33px;
}
.Wechat-Model .Model-content .user-head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.Wechat-Model form > p {
  margin-top: 24px;
  margin-bottom: 8px;
}
.Wechat-Model form .btn-login {
  width: 100%;
  height: 36px;
  background: #c4a57f;
  border-radius: 3px;
  border: 0px;
  color: #fff;
  font-size: 18px;
}
.Wechat-Model form .user-item {
  margin-bottom: 17px;
  p {
    span {
      color: #999999;
      cursor: pointer;
      border-right: 1px solid #999999;
      padding-right: 10px;
      line-height: 12px;
      display: inline-block;
      margin-left: 10px;
    }
    span:first-child {
      font-weight: bold;
      color: #000;
    }
    span:last-child {
      border: none;
    }
    .active {
      font-weight: bold;
      color: #000;
    }
  }
}
.Wechat-Model form .user-item label > span.el-checkbox__label {
  vertical-align: bottom;
}
.Wechat-Model form div .pull_slider {
  width: 100%;
  height: 36px;
  border: 1px solid rgba(196, 165, 127, 0.3);
  padding: 0px 4% 0px 7%;
  border-radius: 2px;
}
.Wechat-Model form div .el-input-group__append,
.Wechat-Model form .el-input-group__prepend {
  background: #fff;
  border-color: rgba(196, 165, 127, 0.3);
  color: #333;
  font-weight: bold;
}
.Wechat-Model form div .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.Wechat-Model form .Message-verify .el-input {
  width: 90%;
}
.Wechat-Model form .Message-verify .btn-verify {
  width: 139px;
  height: 40px;
  color: #000;
  margin-left: 10px;
  font-size: 14px;
  border: 0px;
  border-radius: 3px;
  background: rgba(196, 165, 127, 0.34);
}
</style>
