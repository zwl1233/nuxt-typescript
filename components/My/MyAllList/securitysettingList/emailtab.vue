<template>
  <section>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm SecuritySettings-content"
      :validate-on-rule-change="true"
      @submit.native.prevent
    >
      <div class="user-item input-border"   v-if="info.email&&lic">
        <label class="fz14 c9" style="width:100px;margin-right:21px">已绑定邮箱号:</label>
        <span class="fz13 c4a5" style="line-height:36px">{{info.email.slice(0,3)+'*******'+info.email.split('@')[1]}}</span>
      </div>
      <el-form-item prop="email" class="el-from-ml100 user-item input-border" style="margin-bottom: 22px;" v-if="!info.email||!lic">
        <label class="label">邮箱账号：</label>
        <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="emailcode" class="user-item flex ctn" style="margin-left:-135px">
        <label class="label" style="line-height:40px">邮箱验证码：</label>
        <div class="Message-verify flex">
          <el-input placeholder="请输入六位验证码" v-model="ruleForm.emailcode" clearable></el-input>
          <!-- 下一步 -->
          <el-button
            class="btn-verify btn-verify-span"
            @click="codeFlag?()=>{}:Getvalidation()"
            style="cursor:pointer;"
            v-if="lic"
            :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
          >
            <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="1"/>
          </el-button>
          <!-- 绑定 -->
          <el-button
            class="btn-verify btn-verify-span"
            @click="codeNewFlag?()=>{}:Getvalidation()"
            style="cursor:pointer;"
            v-if="!lic"
            :style="{background:codeNewFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
          >
            <CodeCountDown :codeFlag="codeNewFlag" :changeCode="changeNewCode" key="2"/>
          </el-button>
        </div>
      </el-form-item>
        <el-form-item class="user-item input-border">
        <el-button
         v-if="info.email&&lic"
          class="btn-login"
          @click="submitForm('ruleForm','next')"
          style="margin-left: 20px;padding:0;margin-top:7px;"
        >下一步</el-button>
      </el-form-item>
      <el-form-item class="user-item input-border">
        <el-button
        v-if="!info.email||!lic"
          class="btn-login"
          @click="submitForm('ruleForm','prev')"
          style="margin-left: 20px;padding:0"
        >绑定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import CodeCountDown from "@/components/CodeCountDown";
import { validPhone, Verionesuc, isEmail } from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
export default {
    props:{
       changbacks:{
           type:null
       },
       changenull:{
          type:null
      }
    },
  components: {
    CodeCountDown
  },
  data() {
    return {
      lic:true,
      codeFlag: false, //验证码倒计时开始
      codeNewFlag:false,
      ruleForm: {
        //手机表单
        email: "",
        emailcode: ""
      },
      rules: {
        email: [
          { required: true, trigger: "blur", validator: isEmail } //这里需要用到全局变量
        ],
        emailcode: { required: true, trigger: "blur", validator: this.vaildShort } ,
      },
      vaildName:"",//获取验证码的手机号或邮箱号
    };
  },
  computed: {
    ...mapState({
      time: state => state.system.time, //时间
      info: state => state.my.info.info
    })
  },
  mounted() {
     this.ruleForm.email  =this.info.email
  },
  methods: {
    vaildShort(rule, value,callback){
        const reg = /^\d{6}$/g
        console.log(value.length,'验证码1111')
        if (!value){
          return  callback(new Error('请输入六位验证码'))
        }else  if (!reg.test(value)){
          return   callback(new Error('验证码长度为六位'))
        }else {
          //下一步绑定
          let phone,type
          if(this.lic){
            phone =   this.info.email
            type = 2
          }else{
            phone = this.ruleForm.email
            type = 2
          }
          this.nowTime();
            this.$axios.post("/user/checkConfirmCode", {
                confirmCode:value, //验证码
                type:type, //1:手机校验码 2：邮箱验证码")
                findWay:phone, //找回方式  手机号/邮箱账号
                nowTime: this.time, //当前时间  
                isExist:false
              })
              .then(res => { 
                    if(res.result){
                      return   callback()
                    }else{
                      return   callback(new Error(res.msg))
                    }
                })
        
        }
    },
    ...mapMutations({
      nowTime: "system/nowTime", //传输绑定数据
      getInfo: "my/info/getInfo" //获取个人信息
    }),
    changeCode(flag) {
      this.codeFlag = flag;
    },
     changeNewCode(flag) {
      this.codeNewFlag = flag;
    },
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(type=="next"){
              if(this.vaildName!=this.ruleForm.email){
                  this.$message({
                    duration: 5000,
                    message: this.$selfMsg.validMessage,
                    type: "warning"
                  });
                  return
              }
              this.ruleForm.emailcode = ''
              this.ruleForm.email=''
              this.lic=false
              // this.binds()
            }else{
              //  this.ruleForm.emailcode = ''
              //  this.lic=true
               
               this.bindsubmit();
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
          confirmCode:this.ruleForm.emailcode, //验证码
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
      if(this.vaildName!=this.ruleForm.email){
                  this.$message({
                    duration: 5000,
                    message: this.$selfMsg.validMessage,
                    type: "warning"
                  });
                  return
     }
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
        this.$emit('changbacks')
         this.$message({
          duration: 5000,
          message:this.$selfMsg.bindingSucess,
          type: "success"
        });
        this.getinfo();
        this.$emit('changenull')
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
        if(this.codeFlag)return
        console.log(this.info.email,'info.')
        this.ruleForm.email = this.info.email
        this.vaildName=this.ruleForm.email

        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.email],
          sendType: 1
        });
        if (Getvalidation.code == 0) {
          if(this.lic){
               this.changeCode(true);
          }else{
              this.changeNewCode(true);
          }
        }
      }else{
      if(
        this.codeNewFlag)return
      const reg = /^.*@.+\..+$/;
      if (reg.test(this.ruleForm.email)) {
        this.vaildName=this.ruleForm.email
        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.email],
          sendType: 1
        });
        if (Getvalidation.code == 0) {
              if(this.lic){
                  this.changeCode(true);
              }else{
                  this.changeNewCode(true);
              }
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
