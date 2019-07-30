<template>
  <div class="app-change-messageContent-student">
    <div class="tabPosition_messageContent app-tabPosition_messageContent-student">
      <h3 class="fz16 c4a5" style="font-weight:600!important">{{name}}</h3>
      <div class="messageContent_text" ref="messageContent">
        <div class="clear" v-for="(item,index) in list" :key="index">
          <div class="text-center fz12 c9">{{item.time}}</div>
          <div class="messageContent_List" v-for="(ite,ind) in item.data" :key="ind">
            <div class="text-left" v-if="!ite.messageType" style="display:inline-block">
              <img
                :src="ite.senderHead"
                alt
                class="fl"
                style="width:30px;height:30px;border-radius:50%"
              >
              <div class="fl">
                <p class="fz14 c3 app-richText-msg" v-html="ite.message"></p>
                <time class="fz12 c9">{{initTime(ite.sendTime)}}</time>
              </div>
            </div>
            <div
              class="text-right mb-15"
              v-if="ite.messageType"
              style="display:inline-block;width:100%"
            >
              <img
                :src="ite.senderHead"
                alt
                class="fr"
                style="width:30px;height:30px;border-radius:50%"
              >
              <div class="fr">
                <p style="text-align:left" class="app-richText-msg" v-html="ite.message"></p>
                <time class="fz12 c9">{{initTime(ite.sendTime)}}</time>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="messageContent_chat bg3f text-right">
      <textarea class="wishContent" placeholder="请输入不超过500个字" maxlength="500" v-model="text" style="width:100%"></textarea>
      <span class="wordsNum">{{text.length}}/500</span>
      <p class="text-right mt-10">
        <button class="btn-buy" @click="send">发送</button>
      </p> 
      </div>-->
    </div>
    <div>
      <RichText ref="richText" :kinds="['emoji']"></RichText>
      <div class="app-change-messageContent-student-btn app-clear">
        <input
            type="button"
            class="fr btn-Bask_homework"
            style="cursor:pointer"
            value="发送"
            @click="send"
          >
      </div>
      
      <div class="app-change-messageContent-student-box"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import RichText from "@/components/RichText";
export default {
  data() {
    return {
      list: [
        {
          message: "", //内容
          sendTime: "", //发送时间
          title: "", //消息标题（纯文本消息无标题）
          receiveHead: "", //自己的头像
          senderHead: "", //发消息的头像
          messageType: "" //是否是自己
        }
      ],
      text: "" //文本
    };
  },
  props: ["senderType", "senderId", "name"],

  mounted() {
    console.log("执行了1212");
    this.$axios
      .post("/privateletter/messagelist", {
        token: "",
        senderId: this.senderId,
        senderType: this.senderType
      })
      .then(res => {
        console.log(res, "SHUJU");
        if (res.code == 0) {
          this.list = this.initData(res.result.privateLetterMessageResponseVos);
          this.scrollBottom();
        }
      });
  },
  methods: {
    //处理数据  将数组处理成 [{time:日期,data:[]该日期下的消息}]
    initData(list) {
      list = list.map(item => {
        item.dataTime = moment(item.sendTime)
          .add(-8,'h')
          .format("YYYY/MM/DD");

        return item;
      });
      console.log("处理后", list);
      let aryDay = [];
      list.forEach(item => {
        if (!aryDay.includes(item.dataTime)) {
          aryDay.push(item.dataTime);
        }
      });
      console.log(aryDay, "所有存在的天数");
      let messageAry = []; //最后组成的数据
      aryDay.forEach(item => {
        let obj = {};
        obj.time = item;
        obj.data = [];
        list.forEach(ite => {
          if (ite.dataTime == item) {
            obj.data.push(ite);
          }
        });
        messageAry.push(obj);
      });
      console.log(messageAry, "最后的数据");
      return messageAry;
    },
    initTime(time) {
      return moment(time)
        .add(-8, "h")
        .format("HH:mm");
    },
    send() {
      let html=this.$refs.richText.getHtml()
       if (htmlhtml == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      this.$axios
        .post("/privateletter/reply", {
          token: "",
          message: html,
          reciveId: this.senderId
        })
        .then(res => {
          if (res.code == 0) {
            this.text = "";
            this.getMessageList();
            this.$refs.richText.clearHtml()
          }
        });
    },
    getMessageList() {
      this.$axios
        .post("/privateletter/messagelist", {
          token: "",
          senderId: this.senderId,
          senderType: this.senderType
        })
        .then(res => {
          console.log(res, "SHUJU");
          if (res.code == 0) {
            this.list = this.initData(
              res.result.privateLetterMessageResponseVos
            );
            this.scrollBottom();
          }
        });
    },
    //移动到底部
    scrollBottom() {
      setTimeout(() => {
        let scr = this.$refs.messageContent;
        this.$nextTick(() => {
          if(scr){
            let H = scr.scrollHeight - scr.offsetHeight;
          console.log(H);
          // console.log(H,'差')
          scr.scrollTop = H;

          }
          
        });
      }, 0);
    }
  },
  components: {
    RichText
  }
};
</script>
<style lang="less">
.app-change-messageContent-student {
  height: 830px;
  font-size: 14px;
  .app-tabPosition_messageContent-student {
    & > .messageContent_text {
      &::-webkit-scrollbar{
        background: rgba(196, 165, 127, 0.01);
      }
      max-height: 380px !important;
      height: 380px !important;
      & > .clear {
        padding-bottom: 0 !important;
      }
    }
    
  }
  .app-change-messageContent-student-box{
    height: 300px;
    margin-top: 10px;
    background: white;
  }
  .app-change-messageContent-student-btn{
    position: relative;
    &>input{
      outline: none;
      margin-top: -24px;
      margin-right: 5px;
    }
  }
  #wangeditor {
      margin-top: 0;
      
    }
    .w-e-menu{
        margin-left: 4px!important;
      }
}


</style>


