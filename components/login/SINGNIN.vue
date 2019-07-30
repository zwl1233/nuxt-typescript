<template>
  <section class="loginpage">
    <el-dialog
      v-if="centerDialogVisible"
      :visible.sync="centerDialogVisible"
      custom-class="login-Model login-Modelone app-change-el-dislog"
      width="780px"
      center
      :before-close="closelogin"
      style="opacity:.95;"
    >
      <Signin  v-if="centerDialogVisible"
               :changgif="changgif"
               :newlogin="newloginshow"  
               :passwordshow="passwordshow"
               :closelogin="closelogin"
               :bangshow="bangshow"
                ref="login"/>
    </el-dialog>
    <el-dialog
      v-if="newlogin"
      :visible.sync="newlogin"
      custom-class="login-Model login-Modeltwo app-change-el-dislog"
      width="780px"
      center
      style="opacity:0.9;"
      :before-close="closeloginnew"
    >
      <NewSignin  
        v-if="newlogin" 
        :changgif="changgif"
       :closeloginnew="closeloginnew"
       :bangshow="bangshow"
       :modeldetail="modeldetail"
        ref="newlogin"/>
    </el-dialog>
    <el-dialog
      v-if="Forgetpasswords"
      :visible.sync="Forgetpasswords"
      custom-class="RetrievePassword-Model RetrievePassword-Modeltwo app-change-el-dislog"
      width="780px"
      center
      :before-close="closeloginpassword"
       style="opacity:0.9;"
    >
      <PhonePasswordRetrieval v-if="Forgetpasswords" :closeloginpassword="closeloginpassword" ref="pasword"/>
    </el-dialog>
    <el-dialog
      v-if="WechatModel"
      :visible.sync="WechatModel"
      custom-class="Wechat-Model Wechat-Modeltwo  app-Wechat-Modeltwo app-change-el-dislog"
      width="539px"
      center
      :before-close="closebang"
      style="opacity:0.9;"
    >
      <Binding
        v-if="WechatModel"
        :changgif="changgif"
        :closebang="closebang"
        ref="Binding"
        :list="WechatModelist"
      />
    </el-dialog>
    <el-dialog
      v-if="gifPage"
      :visible.sync="gifPage"
      custom-class="gifPage-Model app-change-el-dislog"
      width="539px"
      center
      style="opacity:0.9;"
      :before-close="gifCan"
    >
      <div class="app-gifPage-Model" >
            <p>你的朋友<span>[{{gifPhone}}]</span>给您送礼物啦</p>
            <p>拆开礼物看看吧，希望您喜欢</p>
            <h3>{{gifCouseName}}</h3>
            <p><button @click="gifOk" style="outline:none;cursor:pointer">拆礼物</button></p>
        </div>
    </el-dialog>
    <RegistrationAgreement :Agreement="Agreement" ref="RegistrationAgreementflag" />
  </section>
</template>

<script>
import RegistrationAgreement from "@/components/RegistrationAgreement"; //了解详情
import Signin from "@/components/login/login-Model";
import NewSignin from "@/components/login/Newuser";
import PhonePasswordRetrieval from "@/components/login/PhonePasswordRetrieval";
import Binding from "@/components/login/Binding";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      gifList:[],//赠课数据
      gifPage:false,//赠课页面
      list: [], //绑定页面数据
      Agreement:'',
      gifPhone:'',//赠客人手机号
      gifCouseName:'',//课程名称
      gifId:'',//赠课id
      gifType:null,
      gifCouseId:null,
      timer:null,//是否循环询问结束
    };
  },
  components: {
    Signin,
    NewSignin,
    PhonePasswordRetrieval,
    Binding,
    RegistrationAgreement
  },
  computed: {
    ...mapState({
      centerDialogVisible: state => state.login.centerDialogVisible, // 登录页面
      newlogin: state => state.login.newlogin, //注册页面
      Forgetpasswords: state => state.login.Forgetpassword, //密码页面
      WechatModelist: state => state.login.WechatModelist, //绑定页面数据
      WechatModel: state => state.login.WechatModel, //绑定页面

      flagactive: state => state.login.activeclass, //注册切换

      userstoken: state => state.system.token //用户token
    })
  },
  methods: {
    ...mapMutations({
      Vedislaysuccess: "login/Vedislaysuccess", //验证成功重新开始
      Vedislay: "login/Vedislay", //验证重新开始
      getCookie: "system/getCookie", //获取用户cookie
      Loginpage: "login/Loginpage", //登录页面
      Newuser: "login/Newuser", //  注册页面显示
      Forgetpassword: "login/Forgetpassword", //  密码页面显示
      WechatModelBin: "login/WechatModelBin", //绑定页面

      isnewsousechange: "login/isnewsousechange", //注册手机号查询是否存在

      activeclass: "login/activeclass", //注册切换
    }),
    //关闭登录函数
    closelogin() {
      this.Loginpage(false);
      this.Refresh()
    },
    //关闭注册函数
    closeloginnew() {
      this.Newuser(false);
      this.Refresh()
    },
    //关闭密码函数
    closeloginpassword() {
      this.Forgetpassword(false);
      this.Refresh()
    },
    //关闭绑定函数 
    closebang() {
      this.WechatModelBin(false);
      this.Refresh()
    },
    //登录页面
    login(){
        this.isnewsousechange(true);
        this.Loginpage(true);
        this.Refresh()
    },
    //注册页面
    newloginshow(){
       this.activeclass(true)
       this.isnewsousechange(false);
       this.Newuser(true);
       this.Refresh()
    }, 
    //修改密码页面
    passwordshow(){
       this.isnewsousechange(true);
        this.Forgetpassword(true);
        this.Refresh()
    },
    bangshows(){
      
    },
    //绑定页面
    bangshow(){
       this.isnewsousechange(false);
      console.log(this.WechatModelist,'我是绑定页面数据')
      this.list =  this.WechatModelist
      if(!this.list.needMobile&&!this.list.needEmail&&!this.list.needWeixin){
        this.WechatModelBin(false)
      }else{
        this.WechatModelBin(true)
      }
    },
    //网易刷新
    Refresh(){
       this.Vedislaysuccess(false);
        this.Vedislay(false);
        // history.go(0)
    },
    modeldetail() {
      // this.$axios.post("/course/purchaseagreement", {}).then(res => {
      //   this.Agreement = res.result;
      // });
      this.$refs.RegistrationAgreementflag.flagchange(2);
    },
    //赠课
    changgif(type){
       this.getCookie();
      if (this.userstoken == null) {
        return
      }
       return this.$axios.post("/course/giftcourselist", {token:''}).then(res=>{
        //  res.result=[{phoneNum:"18720960540",courseName:"课程",id:1,courseType:1,courseId:23}]
           if(res.result){
             this.gifList=res.result
             if(this.gifList.length==0){
                if(type==1){
                  this.gifPage=false
                  localStorage.setItem("loginmsg",'登录成功');
                  history.go(0)
                }else{
                  this.gifPage=false//确认没有了
                }
             }else{
               //有数据
               if(type==1){
                 this.$message({
                    duration: 5000,
                    message: this.$selfMsg.loginSucess,
                    type: "success"
                  });
               }
               if(type==3){
                 this.$message({
                    duration: 5000,
                    message: this.$selfMsg.registerSucess,
                    type: "success"
                  });
               }
               if(type==4){
                 this.$message({
                    duration: 5000,
                    message: this.$selfMsg.bindingSucess,
                    type: "success"
                  });
               }
                this.gifPhone=this.gifList[0].phoneNum
                this.gifCouseName = this.gifList[0].courseName
                this.gifId = this.gifList[0].id
                this.gifType = this.gifList[0].courseType
                this.gifCouseId = this.gifList[0].courseId
                this.gifPage=true
             }
           }
            console.log(res,'sssssssssssssssssssssssss')
        })
    },
    //拆礼物
    async gifOk(){
      clearInterval(this.timer)
      // this.gifOne()
     await this.gifCan()
     this.timer=setInterval(async()=>{
       console.log("赠")
       if(!this.gifPage){
        await clearInterval(this.timer)
         await this.jump()
       }
     },100)
    },

    //跳转页面
    jump(){
       if(this.gifType==1){
              this.$router.push({
              name:"singleOrder",
              query: {
                courseId:this.gifCouseId
              }
            });
        }else{
              this.$router.push({
              name:"fullOrder",
              query: {
                courseId:this.gifCouseId
              }
            });
        }
    },
    //表示知道
    gifCan(){
      return this.$axios.post("/course/updateAlert", {token:'',id:this.gifId}).then(res=>{
        //拆完一个知道后  再次询问是否还有
              return this.changgif(2)
      })
    },
    //出现一次
    gifOne(){
       this.$axios.post("/course/updateAlert", {token:'',id:this.gifId}).then(res=>{
             
      })
    }
  }
};
</script>

<style lang="less">
.gifPage-Model{
  width: 500px;
  height: 330px;
   .el-dialog__body{
      //  background: red;
       height: 330px;
       padding: 0px !important;
    }
    background: url(~assets/img/gifZU.png) cornsilk;
    background-size: cover;
}
.app-gifPage-Model{
    margin-top: 80px;
    padding-top: 80px;
    // padding-left: 100px;
    text-align: center;
    p{
      height:17px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:17px;
      margin-bottom: 13px;
    }
    p:nth-of-type(1){
      span{
        color:#C4A57F;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    p:nth-of-type(2){
        // width: 217px;
        // margin-left: 50px;
         margin-bottom: 23px;
    }
    h3{
      height:30px;
      font-size:20px;
      font-weight:400;
      color:rgba(0,0,0,1);
      line-height:36px;
    }
    p:nth-of-type(3){
      margin-top: 50px;
      button{
        width:100px;
        height:36px;
        background:rgba(196,165,127,1);
        box-shadow:0px 4px 10px 0px rgba(196,165,127,0.19);
        border-radius:18px;
        border:none;
        color:white;
      }
    }
    // right bottom no-repeat
    // background: url(../img/lectures.png) no-repeat;
  //  .app-gifPage-Model-p{
  //    display: flex;
  //    text-align: center;
  //    span{
  //      flex: 0.5;
  //     //  background:red;
  //      cursor:pointer;
  //      border:1px solid;
  //    }
  //  }
}
// .is-checked .el-checkbox__inner{
//   background-color: #b49876 !important;
//     border-color: #b49876 !important;
// }
// .is-checked .el-checkbox__label{
//       color: #b49876 !important;
// }
// .el-checkbox{
//   border-color: #b49876 !important;
// }
// .el-checkbox__inner:hover{
//   border-color: #b49876 !important;
// }
// .el-checkbox__input.isfocus .el-checkbox__inner{
//    border-color: #b49876 !important;
// }
  .app-Wechat-Modeltwo{
    .prant {
      width: 360px;
      margin-top: -176px !important;
      margin-left: -25px;
      z-index: 99 !important;
    }
  }
  .login-Modelone{
 .prant {
      width: 360px;
      margin-top: -176px !important;
      margin-left: -24px !important;
      z-index: 99 !important;
    }
  }
.tong {
  .el-checkbox__inner {
    top: 0.5px;
  }
}
.el-from-ml100 {
  margin-left: -100px;
}
.el-from-mt10 {
  margin-top: -10px;
}
//登录和注册页面样式
.loginpage {
  .RegistrationAgreement-Model{
        width:780px;
        height:624px;
        
  }
  .RegistrationAgreement-Model .Model-content > h4 {
    top: -54px;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom:0px;
  }
  .RegistrationAgreement-Model .Model-content > h4 + div{
    margin-top: -30px;
    height: 420px;
  }
   .el-form-item.is-success .el-input__inner{
         border-color: rgba(196, 165, 127, 0.3)!important;
   }
  .login-Modelone{
      border-radius: 5px;
      height:487px;
   
    .el-dialog__body{
      border-radius: 5px;
    }
    .Model-content-left{
      height: 477px;
      border-radius: 5px;
    }
    .Model-content-right{
      height: 477px;
    }
  }
  .el-input__inner{
      border: 1px solid rgba(196, 165, 127, 0.3);
    }
  .el-input-group__append, .el-input-group__prepend{
        padding: 0 10px;
  }

  .Wechat-Modeltwo{
    border-radius: 5px;
    .el-dialog__body{
      border-radius: 5px;
    }
    .Model-content-left{
      border-radius: 5px;
    }
    // .prant {
    //   width: 360px;
    //   margin-top: -190px;
    //   margin-left: -25px;
    //   z-index: 99 !important;
    // }
  }
  //用户注册验证
  .login-Modeltwo {
     border-radius: 5px;
     .el-dialog__body{
      border-radius: 5px;
    }
    .prant {
      margin-top: -25px;
    }
    .Model-content-left{
       border-radius: 5px;
      height: 620px;
    }
    .Model-content-right{
      height: 620px;
    }
  }
  //找回密码验证
  .RetrievePassword-Modeltwo {
    border-radius: 5px;
    .Model-content-left{
       border-radius: 5px;
    }
    .el-dialog__body{
      border-radius: 5px;
    }
    .prant {
      margin-left: 77px;
      margin-top: 50px;
    }
  }
  //判断绑定样式
  .formone {
    .el-tabs__nav-scroll {
      height: 30px;
      line-height: 30px;
      // margin-top: 10px;
      // margin-bottom: 10px;
      text-align: center;
      .el-tabs__nav {
        width: 100%;
        .el-tabs__item.is-active {
          color: #000;
          font-weight: bold;
        }
        .el-tabs__item:hover {
          color: #000;
          font-weight: bold;
        }
        .el-tabs__item {
          line-height: 12px;
          height: 12px;
          padding-right: 20px;
          border-right: 1px solid #999999;
        }
        .el-tabs__item:last-child {
          padding-right: 0px;
          border-right: none;
        }
      }
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__active-bar {
      display: none;
    }
  }

  .errorhandlinglogin {
    height: 19px;
    line-height: 19px;
    margin-top: 0px;
    margin-bottom: 10px;
    span {
      margin-right: 10px;
      color: #999999;
      cursor: pointer;
    }
    span:nth-of-type(2) {
      margin-left: 10px;
    }
    .active {
      font-weight: bold;
      color: #000;
    }
  }
  .errorhandling {
    height: 19px;
    line-height: 19px;
  }
  .errorhandlingsmall {
    margin-top: -20px;
  }
  .errorhandlingsmalltop {
    margin: 0%;
  }
  .errorhandlingtel {
    height: 19px;
    line-height: 19px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .errorhandlingteltwo {
    //绑定手机偏移30
    margin-top: -30px !important;
  }
  .errorhandling50 {
    //高度50
    height: 50px;
    line-height: 50px !important;
  }
  .errorhandling50 span {
    //手机登录和微信登录下的 文字 欢迎文字
    float: right;
    margin-right: 130px;
  }
  .errorhandlingdiv {
    //input框样式有问题 需要一些修改
    height: 40px !important;
    line-height: 40px;
    // margin-bottom: 30px !important;
    .customs {
      height: 40px !important;
      line-height: 40px;
      border: 1px solid #1ebe5e !important;
      background: #edfef4;
      span {
        background: #1ebe5e !important;
        color: white !important;
        line-height: 20px;
        top: -5px;
      }
      a {
        color: #1ebe5e;
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
  }
  .errorhandlingdivnext {
    //找回密码icon样式偏移
    height: 40px !important;
    line-height: 30px;
    margin-left: 0px;
    margin-top: -30px;
    margin-bottom: 20px;
  }
  .errorhandlingdivpassword {
    //找回密码框向上偏移
    margin-top: -20px;
  }
  .errorhandlingdivpasswords {
    //找回密码下一步样式
    // margin-bottom: -60px;
  }

  .el-dialog__wrapper:nth-of-type(4) .el-dialog__body {
    min-height: 200px !important;
  }
  .el-dialog__wrapper:nth-of-type(2) .login-Model {
    height: 598px;
    .Model-content-left {
      height: 598px;
    }
    .Model-content-right {
      height: 598px;
    }
  }

  //登录
  .login-Model {
    height: 477px;
    h4 {
      // margin-top: -50px;
    }
  }
  // .login-Model .el-input__inner {
  //   border-color: rgba(196, 165, 127, 0.3);
  // }
  .login-Model .el-step__title {
    font-size: 14px;
  }
  .login-Model .el-dialog__header {
    display: none;
  }
  .Model-content-left {
    width: 512px;
    height: 487px;
    background: #ffffff;
    box-shadow: 0px 3px 30px 0px rgba(14, 5, 10, 0.05);
    opacity: 0.95;
    padding: 30px 102px 37px;
    // overflow: hidden;
  }
  .Model-content-left form > p {
    // margin-top: 24px;
    // margin-bottom: 8px;
  }
  .Model-content-left form .btn-login {
    width: 100%;
    height: 36px;
    background: rgba(7, 118, 122, 0.9);
    border-radius: 3px;
    border: 0px;
    color: #fff;
    font-size: 18px;
  }
  .Model-content-left form .user-item {
    margin-bottom: 17px;
  }
  .Model-content-left form .user-item label > span.el-checkbox__label {
    vertical-align: bottom;
  }
  .Model-content-left form div .pull_slider {
    width: 100%;
    height: 36px;
    border: 1px solid rgba(196, 165, 127, 0.3);
    padding: 0px 4% 0px 7%;
    border-radius: 2px;
  }
  .Model-content-left form div .el-input-group__append,
  .Model-content-left form .el-input-group__prepend {
    background: #fff;
    border-color: rgba(196, 165, 127, 0.3);
    color: #333;
    font-weight: bold;
  }
  // .Model-content-left form div .el-input__inner {
  //   border-color: rgba(196, 165, 127, 0.3);
  // }
  .Model-content-left form .Message-verify .el-input {
    width: 90%;
  }
  .Model-content-left form .Message-verify .btn-verify {
    width: 139px;
    height: 40px;
    color: #000;
    margin-left: 10px;
    font-size: 14px;
    border: 0px;
    border-radius: 3px;
    background: rgba(196, 165, 127, 0.34);
  }
  .Model-content-right {
    width: 253px;
    height: 487px;
    background: rgba(14, 5, 10, 0.05);
    box-shadow: 0px 3px 30px 0px rgba(14, 5, 10, 0.05);
    opacity: 0.95;
    vertical-align: top;
    padding: 83px 64px 66px;
    text-align: center;
    position: relative;
  }
  .Model-content-right div.pos_a {
    bottom: 110px;
  }
  .Model-content-right div.pos_a p {
    // margin-top: 5px;
  }
  .login-Model.el-dialog--center .el-dialog__body {
    padding: 0px;
    background: transparent;
    background: white;
  }
}
</style>
