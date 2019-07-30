<template>
  <section>
    <!-- 全部验证 -->
    <div class="app-phone-email-tab" v-if="info.email&&!moreFlag" >
      <p>请选择手机/邮箱验证：</p>
      <div class="app-phone-email-div">
      <div> <img :src="require('@/assets/img/phone.png')" @click="flagphone" alt ><span>手机</span></div>
      <div><img :src="require('@/assets/img/email.png')" @click="flagemail" alt  ><span>邮箱</span></div>
      </div>
    </div>
     <!--手机验证  -->
    <Phonetab   @changenull="changenull" @changback="changback" key="1" v-if="info.email&&moreFlag&&selfFlag"/>
    <Emailtab  @changenull="changenull"  @changbacks="changbacks" v-if="info.email&&moreFlag&&!selfFlag"/>  
    <!-- 手机验证 -->
     <Phonetab    v-if="!info.email" key="2"/>
  </section>
</template>
 
<script>
//手机号是必须绑的
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { validPhone, Verionesuc } from "@/plugins/utils.js";
import { vaild } from "@/plugins/vaildRule";
import CodeCountDown from "@/components/CodeCountDown";
import Phonetab from "@/components/My/MyAllList/securitysettingList/phonetab";
import Emailtab from "@/components/My/MyAllList/securitysettingList/phonetabs";
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
        password: "",
        phone: "",
        short: ""
      },
      rules: {
        phone: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ],
        password: vaild.password,
        short: vaild.short
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
    changbacks(){ //邮箱切换返回
      this.moreFlag=false
      this.selfFlag=false
    },
    changenull(){
       this.$emit('changeactiveNames')
    },
    //改变验证码状态
    changeCode(flag) {
      this.codeFlag = flag;
    }, 
    ...mapMutations({
      nowTime: "system/nowTime", //传输绑定数据
      getInfo: "my/info/getInfo" //获取个人信息
    }),
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(type=="next"){
            // this.binds()  
            this.ruleForm.phone = ''
            this.ruleForm.short = ''
            this.lic=false
          }else{
            this.ruleForm.short = ''
            this.lic=true
            // this.bindsubmit()
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
      this.ruleForm.phone =   this.info.phoneNum
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
      this.nowTime();
      this.getinfo();
      let data = await this.$axios.post("/user/bindingmobile", {
        mobile: this.ruleForm.phone,
        confirmCode: this.ruleForm.short,
        nowTime: this.time,
        studentId: this.info.studentId
      });
      this.resetForm("ruleForm");
      if (data.result) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.bindingSucess,
          type: "success"
        });
        this.getinfo();
        this.lic=true
        this.ruleForm.short = ''
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
          this.ruleForm.phone = this.info.phoneNum
          let Getvalidation = await this.$axios.post("/send/sendSms", {
          phoneNumList: [this.ruleForm.phone],
          sendType: 1
          });
          if (Getvalidation.code == 0) {
            this.changeCode(true);
          }
      }else{

      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(this.ruleForm.phone)) {
        let Getvalidation = await this.$axios.post("/send/sendSms", {
          phoneNumList: [this.ruleForm.phone],
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

    },
  
  }
};
</script>

<style lang="less">
.app-phone-email-tab{
     width: 320px;
    height: 180px;
    margin-left: 180px;
    margin-top: 20px;
    // background: red;
    text-align: center;
    padding-top: 20px;
    p{
      color: #C9AD8A;
      line-height: 25px;
      margin-bottom: 23px;
    }
    div{
      float: left;
      position: relative;
      img{
        width: 52px;
        cursor:pointer
      }
      span{
        position: absolute;
        bottom:-20px;
        left: 1px;
        width: 50px;;
        cursor:pointer
      }
    }
    div:nth-of-type(1){
     margin-left: 37px;
     margin-right: 60px;
    }
    
}
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
