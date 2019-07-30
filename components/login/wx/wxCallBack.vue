<template>
  <section>
      <!-- 微信选择 -->
    <el-dialog
      :visible.sync="selectFlag"
      width="538px"
      class="el-dialog--center app-wx-callback"
      :before-close="handleClose"
    >
      <p class="app-wx-callback-title text-center c4a5">您的微信号尚未绑定和注册,请选择以下方式进行微信绑定或注册</p>
      <div class="app-wx-callback-content">
        <div class="app-wx-callback-binding">
          <span @click="bind">绑定</span>
        </div>
        <div class="app-wx-callback-register">
          <span @click="register">注册</span>
        </div>
      </div>
    </el-dialog>
    <!-- 微信绑定 -->
    <WxBinding v-if="bindingFlag" />

    <!-- 微信注册 -->
    <WxRegister/>

    <WxBindUser  v-if="bindUserFlag"/>
  </section>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import WxRegister from "@/components/login/wx/wxRegister"
import WxBinding from "@/components/login/wx/WxBinding"
import WxBindUser from "@/components/login/wx/WxBindUser"
export default {
  data() {
    return {
      flag: true
    };
  },
  methods: {
    ...mapMutations({
      changeSelectFlag: "wxin/changeSelectFlag", //改变微信选择状态
      changeRegisterFlag: "wxin/changeRegisterFlag", //改变微信注册状态
      changeBingFlag: "wxin/changeBingFlag" //改变微信绑定状态
    }),
    handleClose() {
      this.changeSelectFlag(false);
    },
    //bind绑定
    bind() {
      this.changeSelectFlag(false);
      this.changeBingFlag(true);
    },
    //注册
    register() {
      this.changeSelectFlag(false);
      this.changeRegisterFlag(true);
    },
    
  },
  computed: {
    ...mapState({
      selectFlag: state => state.wxin.selectFlag, //微信选择显示隐藏
      bindingFlag: state => state.wxin.bindingFlag, //微信注册flag
      bindUserFlag: state => state.wxin.bindUserFlag, //微信注册flag
    })
  },
  components: {
    WxRegister,//微信注册
    WxBinding,//微信绑定
    WxBindUser,//绑定用户信息
  }
};
</script>
<style lang="less">
.app-wx-callback {
  border-radius: 5px;
  text-align: center;
  .app-wx-callback-title {
  }
  .app-wx-callback-content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    span {
      color: #c4a57f;
      cursor: pointer;
    }
  }
}
</style>


