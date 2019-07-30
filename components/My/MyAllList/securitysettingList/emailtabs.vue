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
      <div class="user-item input-border"   v-if="info.phoneNum&&lic">
        <label class="fz14 c9" style="width:100px">已绑定手机号:</label>
        <span class="fz13 c4a5" style="line-height:36px">{{info.phoneNum.slice(0,3)+'****' +info.phoneNum.slice(7)}}</span>
      </div>
      <!-- <el-form-item prop="password" class="el-from-ml100 user-item input-border">
        <label class="label">登录密码：</label>
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>-->
      <el-form-item prop="phone" class="el-from-ml100 user-item input-border" v-if="!info.phoneNum||!lic" style="margin-bottom:22px">
        <label class="label">邮箱账号：</label>
        <el-input v-model="ruleForm.phone" placeholder="邮箱">
        </el-input>
      </el-form-item>
      <el-form-item prop="short" class="user-item flex ctn" style="margin-left:-135px">
        <label class="label" style="line-height:40px" v-if="info.phoneNum&&lic">短信验证码：</label>
         <label class="label" style="line-height:40px" v-if="!info.phoneNum||!lic">邮箱验证码：</label>
        <div class="Message-verify flex" v-if="info.phoneNum&&lic">
          <el-input placeholder="请输入六位验证码" v-model="ruleForm.short" clearable></el-input>
          <el-button
            class="btn-verify btn-verify-span"
            @click="codeFlag?()=>{}:Getvalidation()"
            style="cursor:pointer;"
            v-if="lic"
            :style="{background:codeFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
          >
            <CodeCountDown :codeFlag="codeFlag" :changeCode="changeCode" key="1"/>
          </el-button>
        </div>
        <div class="Message-verify flex" v-if="!info.phoneNum||!lic">
          <el-input placeholder="验证码" v-model="ruleForm.short" clearable></el-input>
          <!-- 绑定 -->
          <el-button
            class="btn-verify btn-verify-span"
            @click="codeFlag?()=>{}:Getvalidations()"
            style="cursor:pointer;"
            v-if="!lic"
            :style="{background:codeNewFlag?'#ccc':'rgba(196, 165, 127, 0.34)'}"
          >
            <CodeCountDown :codeFlag="codeNewFlag" :changeCode="changeNewCode" :key="2"/>
          </el-button>
        </div>
      </el-form-item>
      <el-form-item class="user-item input-border">
        <el-button
         v-if="info.phoneNum&&lic"
          class="btn-login"
          @click="submitForm('ruleForm','next')"
          style="margin-left: 20px;padding:0;margin-top:7px;"
        >下一步</el-button>
      </el-form-item>
      <el-form-item class="user-item input-border" v-if="!info.phoneNum||!lic">
        <el-button
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
import { validPhone, Verionesuc,isEmail } from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
export default {
    props:{
        changback:{
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
      codeFlag: false, //验证码倒计时开始
      lic:true,
      codeNewFlag:false,
      input10: "", 
      newphonetext: "",
      ruleForm: {
        //手机表单
        password: "",
        phone: "",
        short: ""
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", validator: isEmail } //这里需要用到全局变量
        ],
        password: vaild.password,
        short:{ required: true, trigger: "blur", validator: this.vaildShort } ,
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
     this.ruleForm.phone  =this.info.phoneNum
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
            phone =   this.info.phoneNum
            type = 1
          }else{
            phone = this.ruleForm.phone
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
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    }, 
     changeNewCode(flag) {
      this.codeNewFlag = flag;
    }, 
    ...mapMutations({
      nowTime: "system/nowTime", //传输绑定数据
      getInfo: "my/info/getInfo" //获取个人信息
    }),
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(type=="next"){
            if(this.vaildName!=this.ruleForm.phone){
                  this.$message({
                    duration: 5000,
                    message: this.$selfMsg.validMessage,
                    type: "warning"
                  });
                  return
              }
            this.ruleForm.phone = ''
            this.ruleForm.short = ''
            this.lic=false
            // this.binds()  
          }else{
            // this.ruleForm.short = ''
            // this.lic=true
            
            this.bindsubmit()
          }
          // this.binds();
          //     alert('submit!');//这里就是符合规则，然后去调对应的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下一步
    binds(){
      this.nowTime();
      this.ruleForm.phone = this.info.phoneNum
      console.log(this.ruleForm.phone,'7777777777')
       this.$axios.post("/user/checkConfirmCode", {
          confirmCode:this.ruleForm.short, //验证码
          type:1, //1:手机校验码 2：邮箱验证码")
          findWay: this.ruleForm.phone, //找回方式  手机号/邮箱账号
          nowTime: this.time, //当前时间
          isExist:true
        })
        .then(res => { 
          if(res.result){
             this.lic=false
             this.ruleForm.phone =''
             this.ruleForm.short = ''
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
    //获取对应数据
    async bindsubmit() {
      if(this.vaildName!=this.ruleForm.phone){
        this.$message({
            duration: 5000,
            message: this.$selfMsg.validMessage,
            type: "warning"
          });
        return
      }
      this.nowTime();
      this.getinfo();
      
      let data = await this.$axios.post("/user/bindingemail", {
        email: this.ruleForm.phone,
        confirmCode: this.ruleForm.short,
        nowTime: this.time,
        studentId: this.info.studentId
      });
      this.resetForm("ruleForm");
      if (data.result) {
        this.$emit('changback')
        this.$emit('changenull')
        this.$message({
          duration: 5000,
          message: this.$selfMsg.bindingSucess,
          type: "success"
        });
        this.getinfo();
        this.lic=true
         this.ruleForm.short = ''
         this.ruleForm.phone=''
        // this.ruleForm.short = ''
      } else {
        this.$message({
          duration: 5000,
          message: data.msg,
          type: "error"
        });
      }
      console.log(this.info.studentId, data);
    },
    //获取用户信息
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
      if(this.info.phoneNum&&this.lic){
          if(this.codeFlag)return
          this.ruleForm.phone = this.info.phoneNum
          this.vaildName=this.ruleForm.phone
          let Getvalidation = await this.$axios.post("/send/sendSms", {
          phoneNumList: [this.ruleForm.phone],
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
        if(this.codeNewFlag)return
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(this.ruleForm.phone)) {
         this.vaildName=this.ruleForm.phone
        let Getvalidation = await this.$axios.post("/send/sendSms", {
          phoneNumList: [this.ruleForm.phone],
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

    },
    async Getvalidations(){
        if(this.info.email&&this.lic){
          if(this.codeFlag)return
        console.log(this.info.email,'info.')
        this.ruleForm.phone = this.info.email
        this.vaildName=this.ruleForm.phone
        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.phone],
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
        if(this.codeNewFlag)return
      const reg = /^.*@.+\..+$/;
      if (reg.test(this.ruleForm.phone)) {
         this.vaildName=this.ruleForm.phone
        let Getvalidation = await this.$axios.post("/send/sendEmail", {
          emailList: [this.ruleForm.phone],
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

.SecuritySettings-content{
  
  .el-input-group__prepend{
    width: 39px !important;
  }
}
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
