<template>
  <section>
    <!-- width="639px" -->
    <el-dialog :visible.sync="modelflag" custom-class="RegistrationAgreement-Model" center>
      <div class="Model-content">
        <h4 class="fz17 c4c49" v-if="type==1">用户报名协议</h4>
        <h4 class="fz17 c4c49" v-if="type==2">用户服务协议</h4>
        <div class="Agreement-text">
          <p class="fz14 c4c
          
          49 Agreement-head ps" v-if="type==1">尊敬的报名人员：</p>
           <p class="ps" v-if="type==1">您好!</p>
          <div class="fz14 c9 Agreement-title" style="white-space:normal" v-if="type==2 ">
            <p style="color:black;opacity: 0.8;"><b>暄桐教室在线课程学习平台——用户服务协议</b></p>
             <br>
            <p>欢迎使用暄桐教室在线课程学习平台（以下简称“暄桐教室”，平台首页为http://xuantong.cn），为了保障您（以下也称“用户”）的权益，请在使用暄桐教室提供的服务之前，详细阅读此服务协议（以下简称“本协议”）所有内容，确认您已理解和接受本协议，当您在平台注册账号时，需点击“同意服务协议并注册”，成功注册后，即表明您已同意本协议。
            如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并在法定监护人的指导下使用本服务。
            本协议内容包括协议正文及将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，您使用暄桐教室提供的服务均受本协议约束。
            </p>
            <br>
            <p class="mbps"><b>第一条 定义</b></p>
            <p >（1）暄桐教室在线课程学习平台、暄桐教室在线课程均是暄桐文化（北京）有限公司推出的在线教育产品和服务，向用户提供关于书法等美育学习的课程。
            （2）用户是指在暄桐教室平台上注册，或支付了暄桐教室在线课程费用并参与该课程学习的个人。
            </p>
            <br>
            <p class="mbps"><b>第二条 协议的修订</b></p>
            <p>暄桐教室有权在必要时通过暄桐教室的网页或微信公众号上发出公告等合理方式来修改本协议及相关服务条款。您在使用暄桐教室在线课程平台、参与暄桐教室在线课程时，应当及时查阅了解修改的内容，并自觉遵守本协议的相关内容。如您继续使用暄桐教室在线课程平台的服务，则视为同意修改内容，当发生有关争议时，将以最新的服务协议为准。如您不同意上述修改内容，可以停止使用本协议涉及的服务。
            </p>
            <br>
            <p class="mbps"><b>第三条 在线课程学习平台的使用约定</b></p>
            <p>您须对自己在使用暄桐教室服务过程中的行为承担法律责任。您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿；以及在暄桐教室首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予暄桐教室等额的赔偿。
            您了解并同意，暄桐教室有权应有关部门的要求，向其提供您提交给暄桐教室或在使用暄桐教室提供的服务中存储于暄桐教室服务器的必要信息。如您涉嫌侵犯他人合法权益，则暄桐教室有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供关于您的前述必要信息。
            </p>
            <br>
            <p class="mbps"><b>第四条 ​个人隐私</b></p>
            <p>您知悉并同意，为便于向您提供更好的服务，暄桐教室将在您自愿选择服务或者提供信息的情况下收集您的个人信息，并将这些信息进行整合。在您使用暄桐教室在线课程平台的服务时，服务器会自动记录某些用户信息，包括但不限于URL、IP地址、浏览器类型、使用语言、访问日期和时间等。为方便您登录或使用暄桐教室在线课程平台服务，暄桐教室在有需要时将使用cookies等技术，并将收集到的信息发送到对应的服务器。您可以选择接受或者拒绝cookies。如您选择拒绝cookies，则您有可能无法登录或使用依赖于cookies的服务或者功能。暄桐教室收集的信息将成为暄桐教室在线课程平台常规教学档案的一部分，用户同意暄桐教室在线课程平台善意使用所收集的信息。暄桐教室将采取可能的措施保证信息安全。尊重用户个人隐私是暄桐教室的一项基本政策。所以，暄桐教室不会公开或透露您的注册资料及保存在暄桐教室在线课程平台服务中的非公开内容，除非暄桐教室在诚信的基础上认为透露这些信息在以下几种情况是必要的：
            </p>
            <p>（1）事先获得您的明确授权；
              </p>
            <p>（2）根据国家有关法律规定，包括但不限于在国家司法机关要求等必要情况时提供您的注册信息、您在网页上发布的信息内容及其发布时间、互联网地址、域名等信息；
            </p>
            <p>（3）保持维护暄桐教室的知识产权和其他重要权利；
            </p>
            <p>（4）在紧急情况下竭力维护您个人和社会大众的隐私安全；
            </p>
            <p>（5）根据本协议相关规定或者暄桐教室认为必要的其他情况下。
            </p>
            <br>
            <p class="mbps"><b>第五条 ​账号使用的约定</b></p>
            <p>（1）您可通过以下方式注册成为暄桐教室的正式用户：
              </p>
            <p>a. 经本平台注册系统完成注册程序的用户；</p>
            <p>b. 经平台批准的第三方合作网站登录的用户，包括微信绑定登录等。</p>
            <p>成为暄桐教室正式用户即获得本平台赋予用户所享有的权限。暄桐教室有对用户的权限设计进行变更的权利。</p>
            <p>（2）如发现用户的帐号中含有不雅文字或不恰当名称的，本平台保留取消其用户资格的权利。</p>
            <p>（3）您的用户帐号的所有权归属于暄桐教室，您仅享有使用权。</p>
            <p>（4）您有义务保障密码和帐号的安全，您利用该密码和帐号所进行的一切活动引起的任何损失或损害，由您自行承担全部责任，暄桐教室不承担任何责任。如您发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请及时通知暄桐教室的工作人员。因黑客行为或您的保管疏忽导致帐号非法使用，暄桐教室不承担任何责任。</p>
            <br>
            <p class="mbps"><b>第六条 适当言论</b></p>
            <p>您知悉并同意，在暄桐教室课程相关的线上或线下社区、用户互动组群等场所，保持良好的言行准则，遵守法律，尊重他人，不发表违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的言论，不进行违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的行为。
            </p>
            <br>
            <p class="mbps"><b>第七条 在线课程的约定</b></p>
            <p>（1）暄桐教室提供的在线课程学习内容，是暄桐教室及其教师基于本组织或教师所研究和积累的相关内容的学术表达，不代表任何其它组织或个人的意见，同时也不保证与任何其它包括学术观点的任何观点与理论的一致性。
            </p>
            <p>（2）课程费用仅为暄桐在线课程的教育信息费，并不兑现其它产品及服务，且不包含上网电话费、上网信息费等用户端的为获取课程所需要的费用。
            </p>
            <p>（3）视频回放：以当堂课开课当天为起始日算起，在每节直播课程结束后的14日以内，报名缴费的用户可登录在线课堂进行补课或重复观看与复习。
            </p>
            <p>（4）课程播出日程：在线课程（包括本人购买以及他人赠送的课程）按照既定日程播出，如暄桐教室遇特殊情况需要调整变动直播上课时间，必须在暄桐教室的网页及微信公众号上提前通知报名缴费的用户。用户有义务按时收看直播课程或在直播课程后14日内观看回放课程进行学习。无论用户是否收看直播课程或在课程后14日内观看回放课程，均不影响课程的正常进行。如果用户没有及时收看直播课程或在课程后14日内观看回放课程，则代表用户放弃本节课程的学习。任何没有及时收看直播课程或在课程后14日内观看回放课程的用户，都无权以未收看上述课程的理由向暄桐教室提出退还上述课程费用的要求。
            </p>
            <p>（5）退课：每一门在线课程（包括本人购买以及他人赠送课程）按照既定日程播出，在每一门课程的第一节直播课程开始上课之前，报名缴费的用户可以申请退课退款，第一节直播课一旦开始上课，则不接受用户的退课申请，暄桐教室将退还已支付的全额费用，一旦用户提交退课退款申请，暄桐教室将同时停止用户的听课及课程结束后14日内观看回放、参与课程互动等权限。
            </p>
            <p>（6）开具发票：需要开具课程费用发票的缴费用户，可以在暄桐教室网页提交开票申请，并填写发票开具的具体信息，发票将于第一节课开始后开具，且不接受退票，发票为增值税普通发票，开票内容为培训费，发票形式为电子发票。
            </p>
            <br>
            <p class="mbps"><b>第八条 内容所有权及知识产权</b></p>
            <p>暄桐文化（北京）有限公司拥有暄桐教室所有课程内容，包括且不限于：直播视频、重播视频、相关网页及视频中的文字、图片、音频、视频等内容的著作权、知识产权以及经营权，未经暄桐文化（北京）有限公司书面授权许可，任何学员、任何组织和个人不得对上述内容进行任何形式的下列行为：包括但不限于复制、改编、录制、传播、交易、出售、发表、存储或上传至其他平台（不论商业或非商业途径）。如有违反，暄桐文化（北京）有限公司将依据《中华人民共和国著作权法》、《互联网信息网络传播管理条例》、《中华人民共和国刑法》等相关法律法规的规定，追究侵权人的相关法律责任。
            </p>
            <br>
            <p>本协议适用中华人民共和国法律。当本协议的任何内容与中华人民共和国法律相抵触时，以法律规定为准，同时相关内容将按法律规定进行修改或重新解释。本协议其他部分的法律效力不变。
            </p>
            <p>本协议自您同意之日起生效，您与暄桐教室共同遵守。
            </p>
            <p>暄桐教室不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响暄桐教室在未来行使该权利。
              </p>
          </div>
          <ul class="fz14 c4c49 Agreement-content"  v-if="type==1">
             <!-- <li v-for="(item) in JSON.parse(this.Agreement.protocolContent).blocks" :key="item.key">
               {{item.text}}
             </li> -->
             <li v-html="Agreement.protocolContent" class="app-change-index-richText"></li>
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
      modelflag: false,
      type:null
    };
  },
  methods: {
    // doing(type){
    //     this.modelflag =  false
    //     this.$emit('changedoing',type)
    // },
    flagchange(type) {
      this.type = type
      console.log(type,'ssssssssssssss')
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
  color: black;
  opacity: 0.8;
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
