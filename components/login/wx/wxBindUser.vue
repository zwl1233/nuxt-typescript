<template>
  <section>
    <el-dialog
      :visible.sync="bindUserFlag"
      width="538px"
      class="el-dialog--center app-wx-callback-binding"
      :before-close="handleClose"
    >
      <section class="app-Wechat-Modeltwo">
        <div class="Model-content">
          <div class="errorhandling50">
            <img :src="headimgurl" class="user-head" alt width="30px" height="30px">
            <span class="c4a5 fz17 ml-15">您好，欢迎来到暄桐</span>
          </div>

          <p class="fz12 errorhandlingtel Unified">请填写您的信息</p>
          <!-- 填写用户信息-->
          <el-form
            :model="ruleFormUser"
            :rules="rulesUser"
            ref="ruleFormUser"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="nickName" class="el-from-ml100">
              <el-input
                placeholder="昵称"
                v-model="ruleFormUser.nickName"
                autocomplete="new-password"
                v-norecord="'text'"
                style="width:312px"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password" class="el-from-ml100">
              <el-input
                placeholder="密码 (8-16位字母＋数字组合)"
                class="fonPs"
                autocomplete="new-password"
                type="password"
                v-model="ruleFormUser.password"
                v-showpas="ruleFormUser.password"
                v-norecord="'password'"
                style="width:312px"
              ></el-input>
            </el-form-item>
            <el-form-item prop="newPassWord" class="el-from-ml100">
              <el-input
                placeholder="再次确认密码"
                autocomplete="new-password"
                type="password"
                class="fonPs"
                v-model="ruleFormUser.newPassWord"
                v-showpas="ruleFormUser.newPassWord"
                v-norecord="'password'"
                style="width:312px"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-from-ml100 app-Model-content-left-tong" style="marginTop:-5px">
              <el-checkbox v-model="checked" class="app-check-color-change">我已看过并同意</el-checkbox>
              <a class="c4a5 fz14" @click="modeldetailref">{{xieyiname}}</a>
            </el-form-item>
            <el-form-item class="el-from-ml100">
              <el-button
                class="btn-login"
                type="primary"
                @click="submitForm('ruleFormUser')"
                style="width:312px;"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </el-dialog>
    <RegistrationAgreement :Agreement="Agreement" ref="RegistrationAgreementflag"/>
  </section>
</template>

<script>
import RegistrationAgreement from "@/components/RegistrationAgreement"; //了解详情
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import {
  validPhone,
  Verionesuc,
  vaildShort,
  isEmail
} from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
// 微信注册
export default {
  data() {
    let confirmPas = (rule, value, callback) => {
      console.log(this.ruleFormUser.password, 1,value, "2mima");
      if (value == this.ruleFormUser.password) {
        console.log("密码一致");
        return callback();
      } else {
        return callback(new Error("密码不一致"));
      }
    };
    return {
      ruleFormUser: {
        nickName: "", //昵称
        password: "", //密码
        newPassWord: "" //确认密码
      },
      rulesUser: {
        nickName: vaild.nickName,
        password: vaild.password,
        newPassWord: [
          { required: true, validator: confirmPas, trigger: "blur" }
        ]
      },
      emailCodeFlag: false,
      xieyiname: "《 用户协议 》",
      checked: false,
      Agreement: ""
    };
  },
  created() {
    this.ruleFormUser.nickName = this.nickName;
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.ruleFormUser.validateField("nickName", vaild => {
      });
    });
  },
  computed: {
    ...mapState({
      bindUserFlag: state => state.wxin.bindUserFlag, //微信注册flag
      bindType: state => state.wxin.bindType, //one手机注册  two邮箱注册
      bindValue: state => state.wxin.bindValue, //手机号/邮箱
      openId: state => state.wxin.openId, //openId
      headimgurl: state => state.wxin.headimgurl, //头像
      nickName: state => state.wxin.nickName, //nickName
      confirmCode:state=>state.wxin.confirmCode,//验证码
    })
  },
  methods: {

    ...mapMutations({
      changeBingFlag: "wxin/changeBingFlag", //改变微信注册状态
      changeBindUserFlag: "wxin/changeBindUserFlag" //改变用户信息页状态
    }),
    handleClose() {
      this.changeBindUserFlag(false);
    },
    //喧桐协议
    modeldetailref() {
      this.$refs.RegistrationAgreementflag.flagchange(2);
    },

    //提交
    submitForm(formName) {
      // console.log("绑定");
      // this.changeBingFlag(false);
      // this.changeBindUserFlag(true);
      // return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.checked){
            this.$message({
                  duration:5000,
                  message: this.$selfMsg.Agreement,
                  type: 'success'
              });
            return 
          }
          this.wxregistra();
          
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

    //注册
    wxregistra() {
      if (this.bindType == "one") {
        //手机
        this.$axios
          .post("user/registerbymobile", {
            nowTime:new Date().valueOf(),
            confirmCode:this.confirmCode,
            mobible: this.bindValue, //手机号
            nickName: this.ruleFormUser.nickName, //昵称
            wechat: this.openId, //openId
            newPassword: this.ruleFormUser.password, //新密码
            newPasswordConfirm: this.ruleFormUser.newPassWord //新密码确认
          })
          .then(res => {
            if (res.code == 0) {
               this.setCookie("userlogin", res.result, 7);
               localStorage.setItem("loginmsg",this.$selfMsg.registerSucess)
               history.go(0)
            }
          });
      } else if (this.bindType == "two") {
        //邮箱
        this.$axios
          .post("user/registerbyemail", {
            email: this.bindValue, //邮箱号
            nowTime:new Date().valueOf(),
            confirmCode:this.confirmCode,
            nickName: this.ruleFormUser.nickName, //昵称
            wechat: this.openId, //openId
            newPassword: this.ruleFormUser.password, //新密码
            newPasswordConfirm: this.ruleFormUser.newPassWord //新密码确认
          })
          .then(res => {
            if(res.code==0){
              localStorage.setItem("loginmsg",this.$selfMsg.registerSucess)
               this.setCookie("userlogin", res.result, 7);
               history.go(0)
            }
          });
      }
    },
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
  },
  components: {
    RegistrationAgreement
  }
};
</script>


<style>
</style>
