<template>
  <section class="app-message-mail">
    <blockquote class="cb49" style="paddingLeft:65px;margin-bottom: 20px;display:none">
      站内信
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote>
    <div class="message_content">
      <div class="message_Search">
        <el-input
          type="text"
          placeholder="通过昵称快速查找"
          v-model="value"
          @keyup.enter.native="searchName"
        >
          <i class="iconfont icon-sousuo" slot="prefix"></i>
        </el-input>
      </div>
      <div class="message_Content">
        <template>
          <!-- <ul class="app-message-list">
            <li class="active">
              <div class="app-message-list-pic">
                <img v-lazy alt class="thumbImg">
              </div>
              <div class="app-message-list-text">
                <p>同学小欢呀</p>
                <p>哈哈哈,开心</p>
              </div>
              <div class="app-message-list-icon"></div>
            </li>
            <li>1121212</li>
            <li>112121</li>
            <li>11212</li>
            <li>11212</li>
            <li>112121</li>
          </ul>
          <div class="app-message-info">
            <StudentInfo/>
          </div>-->
          <el-tabs
            :tab-position="tabPosition_message"
            class="tabPosition_message app-chnage-my-mail-tab"
            @tab-click="changeTab"
            v-model="tabId"
          >
            <el-tab-pane
              v-for="(item,index) in list"
              :key="item.isMine?item.receiveId:item.senderId"
              :name="item.isMine?item.receiveId.toString():item.senderId.toString()"
            >
              <div
                slot="label"
                class="flex"
                @click="clearRedInfo(item.messageFlag,item.unReadMessageCount)"
              >
                <div class="fl message_img" style="position:relative">
                  <img
                    v-lazy="item.isMine?item.receiveHeadUri:item.senderHeadUri"
                    alt
                    class="thumbImg"
                  >
                  <div class="message_img_num" v-if="item.messageFlag">{{item.unReadMessageCount}}</div>
                </div>
                <div class="fl">
                  <span class="message_name app-change-message-name">
                    <span
                      class="ellipsis bold"
                    >{{item.isMine?item.receiveNickname:item.senderNickname}}</span>
                    <span
                      style="float:right;font-size:12px;color:rgba(153, 153, 153, 1);height:30px;display:inline-block"
                    >{{computingDataTime(item.lastSendTime)}}</span>
                  </span>
                  <p
                    class="message_text app-richText-msg app-zwl-message-text"
                    
                    v-html="item.lastSendMessage"
                  ></p>
                </div>
              </div>
              <StudentInfo
                v-if="item.senderType==1&&item.flag"
                :senderType="item.senderType"
                :senderId="item.isMine?item.receiveId:item.senderId"
                :isMine="item.isMine"
                :key="index"
                :name="item.isMine?item.receiveNickname:item.senderNickname"
              />
              <Notice
                v-if="item.senderType==2&&item.flag"
                :senderType="item.senderType"
                :senderId="item.senderId"
                :key="index"
                :name="item.senderNickname"
              />
              <PayList
                v-if="item.senderType==3&&item.flag"
                :senderType="item.senderType"
                :senderId="item.senderId"
                :key="index"
                :name="item.senderNickname"
              />
            </el-tab-pane>
            <!-- <el-tab-pane>
              <div slot="label" class="flex">
                <div class="fl message_img">
                  <img :src="require('@/assets/img/people.png')" alt>
                </div>
                <div class="fl">
                  <span class="message_name">宅宅助教</span>
                  <p class="message_text">哈哈哈，开心</p>
                </div>
              </div>
              <div class="tabPosition_messageContent">
                <h3 class="fz16 c4a5">宅宅助教</h3>
                <div class="messageContent_text">
                  <div class="clear">
                    <div class="text-center fz12 c9 pb-15">2018/11/04</div>
                    <div class="messageContent_List">
                      <div class="text-left mb-30">
                        <img :src="require('@/assets/img/people.png')" alt class="fl">
                        <div class="fl">
                          <p
                            class="fz14 c3"
                          >还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧还是要多加练习，才能熟能生巧</p>
                          <time class="fz12 c9">09:12</time>
                        </div>
                      </div>
                      <div class="text-right mb-30">
                        <img :src="require('@/assets/img/people.png')" alt class="fr">
                        <div class="fr">
                          <p>嗯嗯，谢谢老师喔，我继续努力</p>
                          <time class="fz12 c9">09:12</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="messageContent_chat bg3f text-right">
                  <textarea class="wishContent" placeholder="请输入不超过500个字" maxlength="500"></textarea>
                  <span class="wordsNum">0/500</span>
                  <p class="text-right mt-10">
                    <button class="btn-buy">发送</button>
                  </p>
                </div>
              </div>
            </el-tab-pane>-->
            <!-- <el-tab-pane>
              <div slot="label" class="flex">
                <div class="fl message_img">
                  <img :src="require('@/assets/img/checkPoint_Img.png')" alt>
                </div>
                <div class="fl">
                  <span class="message_name">同学小黄鸭</span>
                  <p class="message_text">哈哈哈，开心</p>
                </div>
              </div>
              <StudentInfo/>
            </el-tab-pane>-->
            <!-- <el-tab-pane>
              <div slot="label" class="flex">
                <div class="fl message_img">
                  <img :src="require('@/assets/img/message_icon.png')" alt>
                </div>
                <div class="fl">
                  <span class="message_name">系统消息</span>
                  <p class="message_text">您的订单已支付成功！</p>
                </div>
              </div>
              <PayList/>
            </el-tab-pane>-->
          </el-tabs>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import Notice from "@/components/My/mail/notice"; //教室通知
import StudentInfo from "@/components/My/mail/studentInfo"; //学员信息
import PayList from "@/components/My/mail/payList"; //系统消息
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { computingDataTime } from "@/plugins/utils";
import moment from "moment";
export default {
  data() {
    return {
      tabPosition_message: "left",
      value: "" //搜索内容
      // tabId:"",
    };
  },
  created() {
    console.log(this.$route.params.info, 12);
    this.searchName();
  },
  methods: {
    ...mapMutations({
      changeList: "my/mail/changeList", //改变发件人列表
      changeTabId: "my/mail/changeTabId", //改变tabId
      clearData: "my/mail/clearData", //清空数据
      changeMsgNum: "my/info/changeMsgNum" //获取个人信息
    }),
    computingDataTime,
    //tab切换
    changeTab(tab, e) {
      console.log(tab.name);
      this.tabId = tab.name;
      let ary = [...this.list];
      ary = ary.map(item => {
        let id = item.isMine ? item.receiveId : item.senderId;
        if (id == tab.name) {
          item.flag = true;
          item.messageFlag = false;
        } else {
          item.flag = false;
        }
        return item;
      });
      this.changeTabId(tab.name);
      this.changeList(ary);
    },
    searchName() {
      this.$axios
        .post("/privateletter/senderlist", { token: "", nickName: this.value })
        .then(res => {
          if (res.code == 0) {
            //处理数据  分开发件人 收件人
            res.result = this.changeData(res.result);
            //默认打开的信息
            let ind = 0;
            let ary = [];
            //过滤掉公告通知
            res.result = res.result.filter((item, index) => {
              if (item.senderId == -2) {
                //公告通知
                ary.push(item);
                return false;
              }
              return true;
            });
            ary = [...ary, ...res.result];

            //判断是否存在私信转过来的可能
            if (this.$route.params && this.$route.params.info) {
              let info = this.$route.params.info;
              console.log(info);
              //评论跳来的  增加一个发件人
              let obj = {
                lastSendMessage: "",
                lastSendTime: moment().add(8, "h"),
                senderHeadUri: "",
                receiveHeadUri: info.discussHeadUri,
                senderId: this.studentId,
                receiveId: info.discussUserId,
                senderNickname: "",
                receiveNickname: info.discussUser,
                senderType: 1,
                unReadMessageCount: 0,
                flag: false,
                messageFlag: false,
                isMine: true
              };
              if (
                obj.receiveNickname.includes(this.value) ||
                this.value == ""
              ) {
                //同时 返回的数组里必须没有才添加
                let flag = true;
                ary.forEach((item, index) => {
                  if (
                    obj.receiveId == item.senderId ||
                    obj.receiveId == item.receiveId
                  ) {
                    //存在这条消息
                    flag = false;
                    ind = index;
                  }
                });
                if (flag) {
                  ary.unshift(obj);
                }
              }
            }
            if (ary.length > 0) {
              (ary[ind].flag = true), //默认第一条显示
                (ary[ind].messageFlag = false), //默认第一条显示
                (this.tabId = ary[ind].isMine
                  ? ary[ind].receiveId.toString()
                  : ary[ind].senderId.toString());
              this.changeTabId(this.tabId);
              this.changeList(ary);
            }
          }
        });
    },
    //改造数据
    changeData(ary) {
      return ary.map(item => {
        item.isMine = false; //发送人是否时本人  true则列表应取收件人的参数  false取发件人的参数
        if (item.id == item.senderId) {
          item.isMine = true;
        } else {
          item.isMine = false;
        }
        //排除公告通知 与系统消息
        if (item.senderId == -2 || item.senderId == -3) {
          item.isMine = false;
        }
        //判断未读消息
        item.flag = false; //全部读消息列表都隐藏
        //是否有未读消息
        if (item.unReadMessageCount > 0) {
          item.messageFlag = true;
        } else {
          item.messageFlag = false;
        }
        return item;
      });
    },
    //清除消息提示
    clearRedInfo(type, num) {
      if (type) {
        //存在未度消息
        this.changeMsgNum(num);
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.my.mail.list, //发件人列表
      studentId: state => state.my.info.info.studentId //学员id
    }),
    //tabId
    tabId: {
      get() {
        return this.$store.state.my.mail.tabId;
      },
      set(newVal) {
        console.log(newVal);
        this.$store.state.my.mail.tabId = newVal;
      }
    }
  },
  components: {
    Notice, //教室通知
    StudentInfo, //学员信息
    PayList //系统消息
  },
  beforeDestroy() {
    console.log("销毁前23232332");
    //清空vuex中的数据
    this.clearData();
  }
};
</script>

<style lang="less">
 .app-zwl-message-text{
   font-size:12px;
   color:#acacac;
   margin-top:-9px;
   height: 17px;
   &>p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
}
.app-change-message-name {
  width: 142px;
  font-size: 14px;
  color: #333333;
  height: 30px;
  display: inline-block;
  margin-top: 4px;

  & > span {
    &:nth-child(1) {
      width: 80px;
      height: 30px;
      display: inline-block;
    }
  }
}
.app-message-mail {
  .app-chnage-my-mail-tab {
    & > .el-tabs__header.is-left {
      background: #fafafa;
    }
  }
  .message_Search {
    background: #fafafa;
    & > .el-input.el-input--prefix {
      & > .el-input__prefix {
        left: 20px;
        top: 17px;
        & > i {
          font-size: 14px !important;
          font-weight: 600;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .message_img {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
    .message_img_num {
      top: -5px;
      right: -5px;
      z-index: 1000;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      color: white;
      text-align: center;
      line-height: 20px;
      position: absolute;
      font-size: 8px;
    }
  }
  .tabPosition_messageContent {
    display: block !important;
    min-height: 450px;
  }
  .el-tab-pane {
    display: block !important;
  }
  .el-tabs__nav-scroll {
    height: 534px !important;
    overflow: auto !important;
  }
  .el-tabs__content {
    // height: 900px;
    background: white !important;
    overflow: hidden !important;
    .el-tab-pane {
      background: rgba(196, 165, 127, 0.1);
    }
  }
  .el-tabs__item.is-left {
    box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
  }
}
// .app-message-mail {
//   .app-message-list {
//     width: 220px;
//     height: 350px;
//     float: left;
//     margin-left: 65px;
//     font-size: 14px;
//     & > li {
//       width: 100%;
//       height: 70px;
//       display: flex;
//       align-items: center;
//       cursor: pointer;
//       &:hover{
//         color: #b49876;
//       }
//       // justify-content: space-evenly;
//       .app-message-list-pic {
//         width: 45px;
//         height: 45px;
//         border-radius: 50%;
//         overflow: hidden;
//         margin-left: 15px;
//       }
//       .app-message-list-text {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-evenly;
//         margin-left: 10px;
//         height: 70px;
//         width: 150px;
//         & > p {
//           width: 100%;
//           line-height: 14px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//         }
//       }
//     }
//     & > .active {
//       background: rgba(196, 165, 127, 0.1);
//     }
//   }
//   .app-message-info {
//     float: left;
//   }
//   .message_img {
//     border-radius: 50%;
//     overflow: hidden;
//   }
// }
.message_Search {
  margin-left: 65px;
  border-bottom: 1px solid rgba(196, 165, 127, 0.1);
}
.message_Search input {
  border: 0px;
  width: calc(220px);
  outline: none;
  height: 30px;
  border-radius: 20px;
  padding: 0px 9px;
  padding-left: 31px;
  background: #eee;
  margin-left: 9px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.message_Search input::placeholder {
  color: #999;
  font-size: 12px;
}
.message_Content {
  .el-tabs__item.is-left {
    width: 240px !important;
    height: 70px;
  }
  .el-tabs__nav {
    height: 100%;
  }
  .el-tabs__nav-scroll {
    height: 100%;
  }
  .el-tabs__item.is-active::after {
    display: none;
  }
  .el-tabs__item {
    font-size: 14px;
    color: #333;
    font-weight: normal;
  }
  .el-tabs__header.is-left {
    margin-left: 65px;
    margin-right: 0px;
  }
  .el-tabs__item.is-active {
    color: #333;
    background: rgba(196, 165, 127, 0.1);
  }
  .el-tabs__content {
    position: relative;
    top: -56px;
    overflow-y: auto;
    background: rgba(196, 165, 127, 0.1);
    border-radius: 3px;
  }
  .tabPosition_message {
    overflow: inherit;
  }
  .tabPosition_messageContent h3 {
    font-weight: 300;
    padding-top: 20px;
    padding-bottom: 17px;
    padding-left: 26px;
  }
  .tabPosition_messageContent .messageContent_text {
    max-height: 450px;
    overflow-y: auto;
  }
  .tabPosition_messageContent .messageContent_text > div.clear {
    padding-top: 30px;
    // padding-bottom: 30px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List {
    margin-top: 5px;
    padding-left: 26px;
    padding-right: 26px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-left {
    display: flow-root;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-left
    > div.fl {
    max-width: 270px;
    position: relative;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-left
    > div.fl
    time {
    position: absolute;
    right: -49px;
    top: 50%;
    margin-top: -6px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-left
    > div.fl
    > p {
    padding: 11px 16px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
    margin-left: 10px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-left
    > div.fl
    .app-richText-msg {
    word-wrap: break-word;
    &::before {
      content: url(~assets/img/messageContent_List1.png);
      position: absolute;
      left: -9px;
    }
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-right {
    display: flow-root;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-right
    > div.fr {
    max-width: 270px;
    position: relative;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-right
    > div.fr
    time {
    position: absolute;
    left: -49px;
    top: 50%;
    margin-top: -6px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-right
    > div.fr
    > p {
    padding: 11px 16px;
    border-radius: 22px;
    background: rgba(196, 165, 127, 0.2);
    position: relative;
    margin-right: 10px;
  }

  .tabPosition_messageContent
    .messageContent_text
    > div.clear
    .messageContent_List
    .text-right
    > div.fr
    .app-richText-msg{
      word-wrap:break-word;
      &::before {
    content: url(~assets/img/messageContent_List2.png);
    position: absolute;
    right: -8px;
  }

    }
    
  .tabPosition_messageContent .messageContent_chat textarea {
    width: -webkit-fill-available;
    height: 80px;
    padding: 5px 10px;
    resize: none;
    outline: none;
    border: 1px solid rgba(196, 165, 127, 0.1);
  }
  div.flex {
    height: 70px;
  }
  div.flex div.fl:last-child {
    height: 70px;
    margin-left: 10px;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  div.flex p.message_text {
    line-height: 14px;
    width: 143px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .message_img {
    display: inline-block;
    vertical-align: middle;
    height: 45px;
    width: 45px;
    margin-top: 12px;
  }
  .el-tabs__active-bar.is-left {
    display: none;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
