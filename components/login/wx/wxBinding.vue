<template>
  <el-dialog
    :visible.sync="bindingFlag"
    width="538px"
    class="el-dialog--center app-wx-callback-binding"
    :before-close="handleClose"
  >
    <section class="app-Wechat-Modeltwo">
      <div class="Model-content">
        <div class="errorhandling50">
          <img
            :src="headimgurl"
            class="user-head"
            alt
            width="30px"
            height="30px"
          >
          <span class="c4a5 fz17 ml-15">您好，欢迎来到暄桐</span>
        </div>

        <p class="fz12 errorhandlingtel Unified">请选择以下任意一种方式绑定,用于快速找回密码</p>
        <p class="errorhandlinglogin disbang">
          <span :class="{active:bindflag=='one'}" @click="ctv('one','ruleFormEmail')">手机绑定</span>
          <span :class="{active:bindflag=='two'}" @click="ctv('two','ruleFormVerion')">邮箱绑定</span>
        </p>
        <!-- 手机绑定 -->
        <el-form
          v-if="bindflag=='one'"
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
              <el-input
                placeholder="手机验证码"
                v-model="ruleFormVerion.Verionnumber"
                style="width:199px"
              ></el-input>
              <el-button
                class="btn-verify"
                @click="codeFlag?()=>{}:Getvalidation()"
                style="cursor:pointer;width:102px"
                :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
              >
                <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="2"/>
              </el-button>
              <!-- <el-button class="btn-verify" v-if="codeFlag" style="background:#ccc;width:102px">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="2"
              />
              </el-button>-->
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
              温馨提示:不绑定是无法完成登录的哦~~~
              <!-- 账号暂时先不绑定手机， -->
              <!-- <a class="c4a5" @click="closebang">跳过</a> -->
            </span>
          </p>
        </el-form>
        <!-- 邮箱绑定 -->
        <el-form
          v-if="bindflag=='two'"
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
                <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="1"/>
              </el-button>
              <!-- <el-button class="btn-verify" v-if="codeFlag" style="background:#ccc;width:102px">
              <CodeCountDown
                :codeFlag="codeFlag"
                :changeCode="changeCode"
                style="cursor:auto;"
                key="1"
              />
              </el-button>-->
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
      </div>
    </section>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ImgCheck from "@/components/ImgCheck";
import {
  validPhone,
  Verionesuc,
  vaildShort,
  isEmail
} from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
// 微信注册
export default {
  data() {
    return {
      bindflag: "one", //one :手机绑定   two: 邮箱绑定
      ruleFormVerion: {
        //手机验证码验证
        phonevion: "",
        Verion: "",
        Verionnumber: ""
      },
      rulesVerion: {
        //手机验证码验证判断
        phonevion: [
          { required: true, trigger: "blur", validator: this.validPhone } //这里需要用到全局变量
        ],
        Verion: [{ required: true, trigger: "blur", validator: Verionesuc }],
        Verionnumber: [
          { required: true, trigger: "blur", validator: vaildShort }
        ]
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
          { required: true, trigger: "blur", validator: this.vaildEmail }
        ],
        emailVerion: [
          { required: true, trigger: "blur", validator: Verionesuc }
        ],
        emailVerionnumber: [
          { required: true, trigger: "blur", validator: vaildShort }
        ]
      },
      codeFlag: false, //手机验证码倒计时开始
      emailCodeFlag: false,

      isPerfectInfo: false, //是否需要完善信息   微信回调  手机号不存在时 :true

      vaildName:"",//获取验证码的手机号或邮箱号
    };
  },
  computed: {
    ...mapState({
      bindingFlag: state => state.wxin.bindingFlag, //微信注册flag
      visionplay: state => state.login.Verificationdisplay, //显示验证
      visionplaysuccess: state => state.login.Vedislaysuccess, //验证成功
      openId:state => state.wxin.openId,//openId
      nickName:state => state.wxin.nickName,//nickName
      headimgurl:state => state.wxin.headimgurl,//头像
    })
  },
  methods: {
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
    //手机验证
    validPhone(rule, value, callback) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入正确的11位手机号"));
      } else {
        //验证手机号有没有注册过  注册过有没有绑定微信
        this.$axios
          .post("wechat/wxbindingcheck", {
            checkType: this.bindflag == "one" ? 1 : 2, //1 手机  2 邮箱
            checkInfo: value //手机号/邮箱
          })
          .then(res => {
            if (res.code == 0) {
              // {
              // needRegistered:是否需要注册//true  手机号 不存在  false 存在
              // canBinding://true:没有绑定微信  false:绑定的微信
              // }
              if (res.result.needRegistered) {
                //手机号不存在
                this.isPerfectInfo = true;
                return callback();
              } else {
                //手机号存在
                this.isPerfectInfo = false;
                if (res.result.canBinding) {
                  //没有绑定微信
                  return callback();
                } else {
                  //绑定了微信
                  return callback(
                    new Error("该手机号已经绑定过微信,请重新输入")
                  );
                }
              }
            }
          });
      }
    },
    //邮箱验证
    vaildEmail(rule, value, callback) {
       const reg = /^.*@.+\..+$/
      if (!value) {
        return callback(new Error("请输入邮箱地址"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入正确的邮箱地址"));
      } else {
        this.$axios
          .post("wechat/wxbindingcheck", {
            checkType: this.bindflag == "one" ? 1 : 2, //1 手机  2 邮箱
            checkInfo: value //手机号/邮箱
          })
          .then(res => {
            if (res.code == 0) {
              // {
              // needRegistered:是否需要注册//true  邮箱 不存在  false 存在
              // canBinding://true:没有绑定微信  false:绑定的微信
              // }
              if (res.result.needRegistered) {
                //邮箱不存在
                this.isPerfectInfo = true;
                return callback();
              } else {
                //邮箱存在
                this.isPerfectInfo = false;
                if (res.result.canBinding) {
                  //没有绑定微信
                  return callback();
                } else {
                  //绑定了微信
                  return callback(
                    new Error("该邮箱地址已经绑定过微信,请重新输入")
                  );
                }
              }
            }
          });
       
      }
    },

    ...mapMutations({
      changeBingFlag: "wxin/changeBingFlag", //改变微信注册状态
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      changeBindUserFlag: "wxin/changeBindUserFlag", //改变用户信息页状态
      changeBindValue:"wxin/changeBindValue",//填写的手机号/邮箱
      changeBindType:"wxin/changeBindType",//手机完善信息 还是邮箱信息
      changeBindConfirmCode:"wxin/changeBindConfirmCode",//验证码
    }),
    handleClose() {
      this.changeBingFlag(false);
    },
    //切换绑定方式
    ctv(type, forms) {
      if (this.bindflag == type) return;
      this.bindflag = type;
      this.Refresh();
      this.codeFlag = false;
      this.bindflag = type;
      this.resetForm(forms);
    },
    //验证刷新
    Refresh() {
      this.Vedislay(false);
      this.Vedislaysuccess(false);
    },
    restphone() {
      this.$refs.ruleFormVerion.validateField("Verion");
    },
    restemail(){
          this.$refs.ruleFormEmail.validateField("emailVerion");
    },
    //获取手机验证码
    async Getvalidation() {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(this.ruleFormVerion.phonevion)) {
        if (this.visionplaysuccess) {
          this.vaildName=this.ruleFormVerion.phonevion
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
        if (this.visionplaysuccess) {
          this.vaildName=this.ruleFormEmail.email
          console.log(this.ruleFormEmail.email)
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
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    },
    changeEmailCode(flag) {
      this.emailCodeFlag = flag;
    },
    //提交
    submitForm(formName) {
      // console.log("绑定");
      // this.changeBingFlag(false);
      // this.changeBindUserFlag(true);
      // return;
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.bindflag=='one'){//手机
            this.wxBinding(this.ruleFormVerion)
          }else if(this.bindflag=='two'){//邮箱
            this.wxBinding(this.ruleFormEmail)
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
    //微信绑定
    wxBinding(value){
      let bindingType=this.bindflag=='one'?1:2;
      let bindingInfo=this.bindflag=='one'?value.phonevion:value.email
      let bindcConfirmCode=this.bindflag=='one'?value.Verionnumber:value.emailVerionnumber
      console.log(this.vaildName,bindingInfo)
      if(this.vaildName!=bindingInfo){
        this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
        return 
      }

      if(this.isPerfectInfo){//需要完善信息
        this.changeBindType(this.bindflag)
        this.changeBindValue(bindingInfo)
        this.changeBindConfirmCode(bindcConfirmCode)
        this.changeBingFlag(false)
        this.changeBindUserFlag(true)
      }else{//不需要
        this.$axios.post("wechat/wxbinding",{
          bindingType,
          bindingInfo,//手机号/邮箱
          openid:this.openId,//微信openId
        }).then(res=>{
          if(res.code==0){
             console.log(res.result,"绑定成功,返回token")
             localStorage.setItem("loginmsg",this.$selfMsg.bindingSucess)
             this.setCookie("userlogin", res.result, 7); //设置cookie
             history.go(0)
             
          }
        })

      }
    },
  },
  components: {
    ImgCheck,
    CodeCountDown
  }
};
</script>
<style lang="less">
.app-wx-callback-binding {
  .Model-content {
    height: 453px;
    padding: 11px 88px;
    width: 539px;
    margin-left: 0px !important;
    .errorhandling50 {
      height: 50px;
      line-height: 50px !important;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span {
        float: right;
        margin-right: 130px;
      }
    }
    .errorhandlingtel.Unified {
      height: 19px;
      line-height: 19px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .errorhandlinglogin.disbang {
      height: 19px;
      line-height: 19px;
      text-align: center;
      width: 320px;
      margin-top: 20px !important;
      margin-bottom: 20px !important;
      span {
        margin-right: 10px;
        cursor: pointer;
        width: 80px;
        padding-left: 20px;
        display: inline-block;
        height: 12px;
        line-height: 12px;
        color: black !important;
        &:nth-of-type(1) {
          border: none;
        }
        &:nth-of-type(2) {
          margin-left: 10px;
        }
      }
      .active {
        font-weight: bold;
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
        width: 312px !important;
        height: 40px !important;
        line-height: 45px;
        .prant {
          margin-top: -174px !important;
        }
      }
      .Message-verify .btn-verify {
        height: 40px;
        color: #000;
        margin-left: 10px;
        font-size: 14px;
        border: 0px;
        border-radius: 3px;
      }
    }
    .errorhandlingteltwo {
      margin-top: -30px !important;
      margin-bottom: 8px;
    }
    .el-input__inner {
      border: 1px solid rgba(196, 165, 127, 0.3);
    }
  }
}
</style>

