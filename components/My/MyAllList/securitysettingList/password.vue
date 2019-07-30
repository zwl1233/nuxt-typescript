<template>
  <section>
    <!-- <div class="SecuritySettings-content">
                                                                        <div class="user-item input-border">
                                                                                <label>当前密码：</label>
                                                                                 <el-input 
                                                                                    type="password"
                                                                                    placeholder="请输入密码" > 
                                                                                </el-input>                                     
                                                                        </div> 
                                                                        <div class="user-item input-border">
                                                                                <label>新密码：</label>
                                                                                <el-input
                                                                                    type="password"
                                                                                    placeholder="请输入新密码" >
                                                                                </el-input>
                                                                                                                
                                                                        </div> 
                                                                        <div class="user-item input-border">
                                                                              <label>确认新密码：</label>
                                                                              <el-input
                                                                                    type="password"
                                                                                    placeholder="请确认新密码" >
                                                                                </el-input>                                                                                                                
                                                                        </div> 
                                                                        <div class="user-item text-right">
                                                                            <button class="btn-login" @click="bindsubmit">保存</button>
                                                                        </div>
                                                                       
    </div>-->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm SecuritySettings-content app-change-SecuritySettings-content"
      :validate-on-rule-change="true"
    >
      <el-form-item prop="password" class="el-from-ml100 user-item input-border">
        <label class="label">当前密码：</label>
        <el-input v-model="ruleForm.password" type="password" placeholder="" v-showpas="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" class="el-from-ml100 user-item input-border">
        <label class="label">新密码：</label>
        <el-input v-model="ruleForm.newPassword" type="password" placeholder="密码 (8-16位字母＋数字组合)" v-showpas="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item prop="twonewPassword" class="el-from-ml100 user-item input-border">
        <label class="label">确认新密码：</label>
        <el-input v-model="ruleForm.twonewPassword" type="password" placeholder="" v-showpas="ruleForm.twonewPassword"></el-input>
      </el-form-item>
      <el-form-item class="user-item input-border">
        <el-button
          class="btn-login"
          @click="submitForm('ruleForm')"
          style="margin-left: 20px;marginTop:10px;padding:0"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import {vaild} from "@/plugins/vaildRule"
export default {
  data() {
    let confirmPas=(rule,value,callback)=>{
      if(value==this.ruleForm.newPassword){
        return callback()
      }else{
        return callback(new Error('密码不一致'))
      }
         
    }
    return {
      ruleForm: {
        //手机表单
        password: "",
        newPassword: "",
        twonewPassword: ""
      },
      rules: {
        password: vaild.password,
        newPassword: vaild.password,
        twonewPassword: [
          { required: true, validator: confirmPas,trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bindsubmit();
          //     alert('submit!');//这里就是符合规则，然后去调对应的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      console.log("走我");
      this.$refs[formName].resetFields();
    },
    async bindsubmit() {
      let data = await this.$axios.post("/user/updatepassword", {
        //获取对应数据
        token: "",
        oldPassword: this.ruleForm.password,
        newPassword: this.ruleForm.newPassword,
        confirmNewPassword: this.ruleForm.twonewPassword
      }).then((res)=>{
        if(res.code==0){
          this.$message({
            duration:5000,
             message: this.$selfMsg.update,
             type: 'success'
          })
          this.clearCookie()
          this.$router.push("/")
        }
      });
    },
    ...mapMutations({
      clearCookie:"system/clearCookie"
    })
  }
};
</script>

<style lang="less">
.SecuritySettings-content {
  .user-item {
.el-form-item__content{
  margin-left: 90px!important
}
  }
  .el-from-ml100{
    .el-form-item__content{
      margin-left: 90px!important
    }
  }
  .el-form-item__content {
    display: flex;
  }
  .label {
    display: inline-block;
    width: 140px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    margin-right: 16px;
    text-align: right;
  }
  .el-form-item__error {
    left: 27%;
  }
  .app-password-showHid>.el-input__suffix{
    right: 45px!important;
  }
}
</style>
