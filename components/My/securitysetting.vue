<template>
  <section>
    <!-- <blockquote class="cb49" style="paddingLeft:65px">
      安全设置
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote>-->
    <div
      class="overflowDefine define-tabsClass_List define-tabsOrder_list"
      style="margin-top:-2px;margin-left:53px"
    >
      <el-collapse
        class="SecuritySettings app-SecuritySettings"
        v-model="activeNames"
        @change="handleChange"
        accordion
      >
        <el-collapse-item name="password">
          <template slot="title">
            修改密码
            <div class="Operation_change" v-if="!activeNames.includes('password')">
              <span class="fl fz14 app-cs3">{{info.password}}</span>
              <span class="fr fz14 app-cs3">编辑</span>
            </div>
            <div class="Operation_change" v-if="activeNames.includes('password')">
              <span class="fr fz14 app-cs3">收起</span>
            </div>
          </template>
          <Password/>
        </el-collapse-item>
        <el-collapse-item name="phone">
          <template slot="title">
            手机绑定
            <div class="Operation_change" v-if="!activeNames.includes('phone')">
              <span
                class="fl fz14 c3 bold"
                v-if="info.phoneNum"
              >{{info.phoneNum.slice(0,3)+'****' +info.phoneNum.slice(7)}}</span>
              <span class="fl fz14 app-cs3" v-if="!info.phoneNum">未绑定</span>
              <span class="fr fz14 app-cs3">编辑</span>
            </div>
            <div class="Operation_change" v-if="activeNames.includes('phone')">
              <span class="fr fz14 app-cs3">收起</span>
            </div>
          </template>
          <!-- 手机绑定 -->
          <Phone @changeactiveNames="changeactiveNames"/>
        </el-collapse-item>
        <el-collapse-item name="email">
          <template slot="title">
            邮箱绑定
            <div class="Operation_change" v-if="!activeNames.includes('email')">
              <span
                class="fl fz14 c3"
                v-if="info.email"
              >{{info.email.slice(0,3)+'*******'+info.email.split('@')[1]}}</span>
              <span class="fl fz14 app-cs3" v-if="!info.email">未绑定</span>
              <!-- <span class="fl fz14 c3">******</span> -->
              <span class="fr fz14 app-cs3">编辑</span>
            </div>
            <div class="Operation_change" v-if="activeNames.includes('email')">
              <span class="fr fz14 app-cs3">收起</span>
            </div>
          </template>
          <email @changeactiveNames="changeactiveNames"/>
        </el-collapse-item>
        <el-collapse-item name="wx">
          <template slot="title">
            微信绑定
            <div class="Operation_change" v-if="!activeNames.includes('wx')">
              <span class="fl fz14 app-cs3">{{info.bindingWechat?'已绑定':'未绑定'}}</span>
              <span class="fr fz14 app-cs3">编辑</span>
            </div>
            <div class="Operation_change" v-if="activeNames.includes('wx')">
              <span class="fr fz14 app-cs3">收起</span>
            </div>
          </template>
          <div class="SecuritySettings-content" v-show="!info.bindingWechat">
            <div class="text-center" id="login_container">
              <!-- <img :src="require('@/assets/img/xtWechat.png')" alt width="125" height="125"> -->
            </div>
             <p class="fz14 c3" style="text-align:center">
                <span>请使用微信扫描二维码登录</span>
                <!-- <span>"暄桐教室"</span> -->
              </p>
              <p class="fz14 c3" style="text-align:center">
                <span>"暄桐教室"</span>
              </p>
          </div>
          <div
            class="SecuritySettings-content"
            v-if="info.bindingWechat"
            style="display:flex;justify-content:center"
          >
            <el-button class="btn-login" @click="Untying" style="cursor:pointer;padding:0">解绑</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <MessageBox
      v-if="boxVisible"
      :visible="boxVisible"
      :onCancel="closeMessageBox"
      :onOK="onOk"
      isConfirm="false"
      :msg="msg"
      title="确认"
    />
  </section>
</template> 

<script>
import Password from "@/components/My/MyAllList/securitysettingList/password";
import Phone from "@/components/My/MyAllList/securitysettingList/phone";
import Email from "@/components/My/MyAllList/securitysettingList/email";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import MessageBox from "@/components/messageBox"; //弹出框
export default {
  data() {
    return {
      boxVisible:false,
      msg: "您确认要解除微信绑定吗?",
      input10: "",
      activeNames: []
    };
  },
  components: {
    Password,
    Phone,
    Email,
    MessageBox,
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info,
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
    })
  },
  mounted() {
    this.isnewsousechange(false);
    // document.getElementById("login_container")
    this.getWxPic()
  },
  methods: {
    ...mapMutations({
      isnewsousechange: "login/isnewsousechange", //注册手机号查询是否存在
      untiedWechat:"my/info/untiedWechat",//解绑微信
    }),
    handleChange(val) {
      console.log(val, "bal");
      console.log(this.activeNames);
    },
    changeactiveNames() {
      this.activeNames = [];
    },
    //解绑微信
    Untying(){
      this.boxVisible=true
    },
    async onOk(){
      this.$axios.post("wechat/wxuntied",{token:""}).then(res=>{
          if(res.code==0){
            this.untiedWechat(false)
            this.closeMessageBox()
             this.$message({
                  duration:5000,
                  message: this.$selfMsg.wxuntied,
                  type: 'success'
              });
          }
      })
      

    },
    closeMessageBox(){
      this.boxVisible=false
    },
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
  }
  }
};

</script>

<style lang="less">
.app-SecuritySettings {
  .app-cs3 {
    font-weight: normal;
    color: #666666;
  }
  .el-icon-arrow-right {
    transform: rotate(90deg);
    &::before {
      content: "\E613" !important;
      color: rgba(196, 165, 127, 1);
    }
  }
  .is-active {
    .el-icon-arrow-right {
      transform: rotate(-90deg);
    }
  }

  .el-collapse-item__header {
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
  }
}
</style>
