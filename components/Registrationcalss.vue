<template>
  <section>
    <!-- width="639px" -->
    <el-dialog :visible.sync="modelflag" custom-class="RegistrationAgreement-Model" center>
      <div class="Model-content">
        <h4 class="fz17 c4c49">暄桐报名协议</h4>
        <div class="Agreement-text">
          <p class="fz14 c4c49 Agreement-head ps">尊敬的报名人员：</p>
          <ul class="fz14 c4c49 Agreement-content " v-html="this.Agreement.protocolContent">
            <!-- {{this.Agreement}} -->
            <!-- <li>
                                                    一、本网站报名受理系统的所有权和运作权归广安市考试指导中心报考人必须完全同意条款，才可在本网站上报名。
          
                                        </li>
                                        <li>
                                                    二、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。  
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
                                        </li>
                                        <li>
                                                    三、只有在广安市人事考试主管机构指定的地点参加考试者才可以在本网站报名，否则所做的一切操作无效。
            </li>-->
          </ul>
        </div>
        <!-- <div slot="footer" class="dialog-footer text-center">
                                    <el-button class="btn-Agreed" type="primary" @click="doing('pay')">
                                      同 意</el-button>
                                  
        </div>-->
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    Agreement: {
      type: null
    },
    changedoing: {
      type: null
    }
  },
  data() {
    return {
      modelflag: false
    };
  },
  methods: {
    // doing(type){
    //     this.modelflag =  false
    //     this.$emit('changedoing',type)
    // },
    flagchange() {
      this.modelflag = true;
    }
  }
};
</script>

<style lang="less">
/** 暄桐报名协议model **/
.RegistrationAgreement-Model {
  border-radius: 5px;
  .el-button--primary {
    background: rgba(180, 152, 118, 0.9);
    border: 1px solid rgba(180, 152, 118, 0.9);
    margin-top: 30px;
  }
}
.RegistrationAgreement-Model .el-dialog__body {
  padding: 0px 66px 40px;
}
.RegistrationAgreement-Model .el-dialog__header {
  padding: 20px 20px 30px;
}
.RegistrationAgreement-Model
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  color: #c4a57f;
  top: 14px;
  position: relative;
  font-size: 17px;
  font-weight: 600;
}
.RegistrationAgreement-Model .Model-content {
  margin-top: 15px;
}
.RegistrationAgreement-Model .Model-content > h4 {
  position: relative;
  top: -34px;
   padding-bottom:15px;
  border-bottom: 1px solid #f5f5f5;
 
}
.RegistrationAgreement-Model .Model-content > h4 + div {
  height: 344px;
  overflow: auto;
  overflow-y: auto;
  /*UI*/
  margin-right: -45px;
  padding-right: 45px;
}
.RegistrationAgreement-Model .Model-content .Agreement-text .Agreement-head {
  margin-bottom: 16px;
}
.RegistrationAgreement-Model .Model-content .Agreement-text .Agreement-title {
  line-height: 22px;
  margin-bottom: 34px;
}
.RegistrationAgreement-Model p{
  
}
.RegistrationAgreement-Model .ps{
  height: 30px ;
  line-height: 30px;
}
.RegistrationAgreement-Model .mbps{
  margin-bottom: 10px;
}
.RegistrationAgreement-Model
  .Model-content
  .Agreement-text
  .Agreement-title
  > span {
  margin-bottom: 12px;
  display: inline-block;
}
.RegistrationAgreement-Model
  .Model-content
  .Agreement-text
  .Agreement-content
  li {
  line-height: 22px;
  margin-bottom: 22px;
}
</style>
