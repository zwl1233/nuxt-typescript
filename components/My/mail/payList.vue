<template>
  <div class="tabPosition_messageContent" style="height:590px;margin-bottom:300px">
    <h3 class="fz16 c4a5" style="font-weight:600!important">{{name}}</h3>
    <div class="messageContent_text" ref="messageContent">
      <!-- <div class="clear">
                    <div class="text-center fz12 c9 pb-15">2018/11/04</div>
                    <div class="messageContent_List">
                      <h4 class="fz14 c3">订单支付成功</h4>
                      <p class="fz14 c9">您的订单
                        <span class="c4a5">201811061201594354</span> 已经支付成功
                      </p>
                      <time class="fz12 c9">09:16:12</time>
                    </div>

                    <div class="messageContent_List">
                      <h4 class="fz14 c3">订单支付成功</h4>
                      <p class="fz14 c9">您的订单
                        <span class="c4a5">201811061201594354</span> 已经支付成功
                      </p>
                      <time class="fz12 c9">09:16:12</time>
                    </div>
      </div>-->
      <div class="clear" v-for="(item,index) in list" :key="index">
        <div class="text-center fz12 c9 pb-15">{{item.time}}</div>
        <div class="messageContent_List" v-for="(ite,ind) in item.data" :key="ind">
          <h4 class="fz14 c3">{{ite.title}}</h4>
          <p class="fz14 c9 app-zwl-systemMessage" style="margin:10px 0 5px 0" v-html="ite.message">
            <!-- 您的订单
            <span class="c4a5">201811061201594354</span> 已经支付成功 -->
          </p>
          <time class="fz12 c9">{{initTime(ite.sendTime)}}</time>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment"
export default {
  data() {
    return {
      list: [
        {
          message: "", //内容
          messageType: "", //消息类型（1：纯文本，2：公告，3：通知）
          sendTime: "", //发送时间
          title: "" //消息标题（纯文本消息无标题）
        }
      ],
      
    };
  },
  props: ["senderType", "senderId", "name"],
  created() {
    this.$axios
      .post("/privateletter/messagelist", {
        token: "",
        senderId: this.senderId,
        senderType: this.senderType
      })
      .then(res => {
        if (res.code == 0) {
          this.list = this.initData(res.result.privateLetterMessageResponseVos);
        }
      });
  },
  mounted () {
    // this.$refs.messageContent.scrollTop=this.$refs.messageContent.scrollHeight
    this.scrollBottom()
  },
  methods: {
    //处理数据  将数组处理成 [{time:日期,data:[]该日期下的消息}]
    initData(list) {
      list = list.map(item => {
        console.log(item,"时间")
        item.dataTime = moment(item.sendTime).add(-8,'h').format("YYYY/MM/DD");
        return item;
      });
      let aryDay = [];
      list.forEach(item => {
        if (!aryDay.includes(item.dataTime)) {
          aryDay.push(item.dataTime);
        }
      });
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
    initTime(time){
      console.log(time)
      return moment(time).add(-8, "h").format("HH:mm")
    },
    scrollBottom() {
      let scr = this.$refs.messageContent;
      
      setTimeout(() => {
        this.$nextTick(() => {
          if(scr){
              let H=scr.scrollHeight-scr.offsetHeight
          // console.log(H,'差')
          scr.scrollTop = H;
            
          }
    
        });
      }, 100);
    }
  }
};
</script>

<style lang="less" >
// 系统消息大通知样式
.app-zwl-systemMessage{
  p{
      line-height: 20px;
  }

}
</style>


