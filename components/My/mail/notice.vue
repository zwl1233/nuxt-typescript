<template>
<div class="tabPosition_messageContent" style="height:590px;margin-bottom:300px">
    <h3 class="fz14 c4a5"  style="font-weight:600!important">{{name}}</h3>
    <div class="messageContent_text" ref="messageContent">
      <!-- <div class="clear">
                    <div class="text-center fz12 c9 pb-15">2018/11/04</div>
                    <div class="messageContent_List">
                      <h4 class="fz14 c3">暄桐教室出新课程啦～～</h4>
                      <p class="fz14 c9">同学们，暄桐教室出新课程啦，拿起你们手中的笔来抓紧时间练习啦～</p>
                      <time class="fz12 c9">09:16:12</time>
                    </div>

                    <div class="messageContent_List">
                      <h4 class="fz14 c3">林曦和她的三个乐园</h4>
                      <p class="fz14 c9">同学们，暄桐教室出新课程啦，拿起你们手中的笔来抓紧时间练习啦～</p>
                      <time class="fz12 c9">09:16:12</time>
                    </div>
      </div>-->
      <div class="clear" v-for="(ite,ind) in list" :key="ind">
        <div class="text-center fz12 c9 pb-15">{{ite.time}}</div>
        <div class="messageContent_List" v-for="(item,index) in ite.data" :key="index">
          <h4 class="fz14 c3">{{item.title}}</h4>
          <p class="fz14 c9" style="margin:10px 0 5px 0" >{{item.message}}</p>
          <time class="fz12 c9" >{{initTime(item.sendTime)}}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//处理成  [{time,ary},{},{}]
import moment from "moment";
export default {
  data() {
    return {
      list: []
    };
  },
  props: ["senderType", "senderId", "name"],
  created() {},
  mounted() {
    this.$axios
      .post("/privateletter/messagelist", {
        token: "",
        senderId: this.senderId,
        senderType: this.senderType
      })
      .then(res => {
        if (res.code == 0) {
          this.list = this.initData(res.result.privateLetterMessageResponseVos);
          this.scrollBottom();
        }
      });
    // console.log("是事实")
    // console.dir(this.$refs.messageContent,"notice")
    // this.$refs.messageContent.scrollTop=this.$refs.messageContent.scrollHeight
  },
  methods: {
    //处理数据  将数组处理成 [{time:日期,data:[]该日期下的消息}]
    initData(list) {
      console.log(list);
      list = list.map(item => {
        item.dataTime = moment(item.sendTime).add(-8,'h').format("YYYY/MM/DD");
        console.log(item.dataTime,'时间')
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
    //时间处理
    initTime(time) {
      return moment(time)
        .add(-8, "h")
        .format("HH:mm");
    },
    //移动到底部
    scrollBottom() {
      // setTimeout(() => {
      this.$nextTick(() => {
        let scr = this.$refs.messageContent;
        console.log(scr, "公告通知");
        if(scr){
        let H = scr.scrollHeight - scr.offsetHeight;
        scr.scrollTop = H;
        }
       
      });
      // }, 0);
    }
  }
};
</script>

<style lang="less">
</style>


