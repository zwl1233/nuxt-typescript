<template>
  <section>
     <!-- 选项 -->
     <div class="app-phone-email-tab" v-if="info.email&&!moreFlag"  >
      <p>请选择手机/邮箱验证：</p>
      <div class="app-phone-email-div">
      <div> <img :src="require('@/assets/img/phone.png')"  @click="flagphone" alt ><span @click="flagphone">手机</span></div>
      <div><img :src="require('@/assets/img/email.png')" @click="flagemail" alt ><span @click="flagemail">邮箱</span></div>
      </div>
    </div> 
  
     <!-- 切换验证   -->
    <Phonetab   @changenull="changenull" @changback="changback" v-if="info.email&&moreFlag&&selfFlag" />
    <Emailtab   @changenull="changenull"  @changbacks="changbacks" v-if="info.email&&moreFlag&&!selfFlag" key="1"/>
    <!-- 邮箱绑定 -->
    <Emailtab    v-if="!info.email" key="2"/>
  </section>
</template>

<script>
// 邮箱未绑定  
//邮箱已绑定
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import CodeCountDown from "@/components/CodeCountDown";
import { validPhone, Verionesuc, isEmail } from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
import Phonetab from "@/components/My/MyAllList/securitysettingList/emailtabs";
import Emailtab from "@/components/My/MyAllList/securitysettingList/emailtab";
export default {
  components: {
    CodeCountDown,
    Phonetab,
    Emailtab
  },
    props:{
    changeactiveNames:{
      type:null
    }
  },
  data() {
    return {
      moreFlag:false,//是否展示可选
      selfFlag:false,//true 手机验证  false 邮箱验证
      codeFlag: false, //验证码倒计时开始
      lic:true,//下一步
      ruleForm: {
        //手机表单
        email: "",
        emailcode: ""
      },
      rules: {
        email: [
          { required: true, trigger: "blur", validator: isEmail } //这里需要用到全局变量
        ],
        emailcode: vaild.short
      }
    };
  },
  computed: {
    ...mapState({
      time: state => state.system.time, //时间
      info: state => state.my.info.info
    })
  },
  methods: {
     flagphone(){  //手机切换
     this.moreFlag=true
     this.selfFlag=true
    },
    changback(){  //手机切换返回
     this.moreFlag=false
     this.selfFlag=false
    },  
    flagemail(){  //邮箱切换
     this.moreFlag=true
     this.selfFlag=false
    },
    changbacks(){  //邮箱切换返回
      this.moreFlag=false
      this.selfFlag=false
    },
    changenull(){
       this.$emit('changeactiveNames')
    },
    ...mapMutations({
      nowTime: "system/nowTime", //传输绑定数据
      getInfo: "my/info/getInfo" //获取个人信息
    }),
    changeCode(flag) {
      this.codeFlag = flag;
    },
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(type=="next"){
              this.ruleForm.emailcode = ''
              this.ruleForm.email=''
              this.lic=false
              // this.binds()
            }else{
               this.ruleForm.emailcode = ''
               this.lic=true
              //  this.bindsubmit();
            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    binds(){
      this.nowTime();
      this.ruleForm.email =   this.info.email
      
      console.log(this.ruleForm.email,'7777777777')
       this.$axios.post("/user/checkConfirmCode", {
          confirmCode:this.ruleForm.email, //验证码
          type:2, //1:手机校验码 2：邮箱验证码")
          findWay: this.ruleForm.email, //找回方式  手机号/邮箱账号
          nowTime: this.time, //当前时间
          isExist:true
        })
        .then(res => { 
          if(res.result){
            this.ruleForm.email=''
             this.ruleForm.emailcode = ''
             this.lic=false
          }else{
            this.$message({
              duration: 5000,
              message: res.msg,
              type: "error"
            });
          }
        })
    },
    //重置
    resetForm(formName) {
      console.log("走我");
      this.$refs[formName].resetFields();
    },
    //绑定
    async bindsubmit() {
      this.nowTime();
      this.getinfo();
      let datalogin = await this.$axios.post("/user/bindingemail", {
        email: this.ruleForm.email,
        confirmCode: this.ruleForm.emailcode,
        nowTime: this.time,
        studentId: this.info.studentId
      });
      this.resetForm("ruleForm");
      if (datalogin.result) {
         this.$message({
          duration: 5000,
          message:this.$selfMsg.bindingSucess,
          type: "success"
        });
        this.getinfo();
         this.ruleForm.emailcode = ''
         this.ruleForm.email=''
         this.lic=true
       
      } else {
        this.$message({
          duration: 5000,
          message: datalogin.msg,
          type: "error"
        });
      }
      console.log(this.info.studentId, datalogin);
    },
    async getinfo() {
      let data = await this.$axios.post("/user/getuserinfo", {
        token: ""
      });
      console.log(data, "信息");
      if (data.code == 0) {
        this.getInfo(data.result);
      }
    },
    //获取验证码
    async Getvalidation() {
      if(this.info.email&&this.lic){
        console.log(this.info.email,'info.')
        this.ruleForm.email = this.info.email
        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.email],
          sendType: 1
        });
        if (Getvalidation.code == 0) {
          this.changeCode(true);
        }
      }else{
      const reg = /^.*@.+\..+$/;
      if (reg.test(this.ruleForm.email)) {
        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.email],
          sendType: 1
        });
        if (Getvalidation.code == 0) {
          this.changeCode(true);
        }
        console.log(Getvalidation.result);
      } else {
        return;
      }
      }
    }
  }
};
</script>

<style lang="less">
.ctn {
  .el-form-item__error {
    left: 35% !important;
  }
}
.btn-verify-span {
  span {
    margin-left: -1px;
  }
}
</style>
