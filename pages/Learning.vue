<template>
  <div style="background:#FBF8F5;paddingTop:65px">
    <article class="w900 m-auto app-learning">
      <div class="Learning_body">
        <div class="Learning_title pos_r" style="marginBottom:100px;">
          <h4 class="fz24 c30 dis_in_block mr-20">{{courseName}}</h4>
          <gametab style="margin-left: 240px;margin-top: 15px;"/>
          <div class="dis_in_block fr">
            <span class="fz14 c4a5" @click="goBack()" style="cursor:pointer">&#60;&#60; 返回学习主页</span>
          </div>
        </div>
        <div class="mt-60 Learning_content">
          <el-tabs
            :tab-position="tabPosition"
            class="leftClass-tab"
            @tab-click="typelist"
            v-model="tabId"
          >
            <!--晒作业-->
            <el-tab-pane name="first">
              <span slot="label">
                <i class="el-icon-date"></i> 晒作业
              </span>
              <Baskhomework v-if="tabId=='first'"/>
            </el-tab-pane>
            <!--评价-->
            <el-tab-pane label="评价" name="second">
              <span slot="label">
                <i class="el-icon-date"></i> 评价
              </span>
              <Evaluation v-if="tabId=='second'"/>
            </el-tab-pane>
            <!-- 介绍 -->
            <el-tab-pane label="介绍" name="third">
              <span slot="label">
                <i class="el-icon-date"></i> 介绍
              </span>
              <introduce v-if="tabId=='third'"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <GameDescriptiondetail v-if="GameDescription"/>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Baskhomework from "@/components/Learning/Bask_homework"; //晒作业
import Evaluation from "@/components/Learning/Evaluation"; //评价
import introduce from "@/components/Learning/introduce"; //介绍
import gametab from "@/components/gamedetail/gametab"; //gametab左上按钮
import GameDescriptiondetail from "@/components/gamedetail/GameDescriptiondetail"; //说明
export default {
  asyncData(api){
    console.log(api)
    if(api.query.change){
      console.log("跳转")
      api.store.commit("Learning/changeTabId","first")
      api.store.commit("Learning/homework/changePostFlag",true)
      api.store.commit("Learning/changeCourseId",api.query.courseId)
      api.store.commit("Learning/homework/changePostId",api.query.homeworkFinishId)
    }
    if(api.query.courseId){
      api.store.commit("Learning/changeCourseId",api.query.courseId)
      api.store.commit("games/changeCourseId",api.query.courseId)
    }
  },
  components: {
    Baskhomework, //晒作业
    Evaluation, //评价
    introduce, //介绍
    GameDescriptiondetail, //说明
    gametab
  },
  data() {
    return {
      tab: "second",
      fileList2: [
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
        //, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      tabPosition: "left",
      flag: false,
      canStudylist: []
    };
  },
  created() {
    console.log(this.courseId);
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      courseId: state => state.Learning.courseId, //课程id
      courseName: state => state.Learning.courseName, //课程名
      GameDescription: state => state.games.courseinfo.GameDescription, //说明
      courseTemplateClasshourCount: state => state.games.courseinfo.courseTemplateClasshourCount //课程模板
    }),
    //tabId
    tabId: {
      get() {
        return this.$store.state.Learning.tabId;
      },
      set(newVal) {
        console.log(newVal);
        this.$store.state.Learning.tabId = newVal;
      }
    }
  },
  methods: {
    switchClass() {},
    ...mapMutations({
      changeTabId: "Learning/changeTabId",
      changeGameDescription: "games/changeGameDescription" //说明
    }),
    typelist(tab, e) {
      switch (tab.index) {
        case "0":
          this.changeTabId("first");
          break;
        case "1":
          this.changeTabId("second");
          break;
        case "2":
          this.changeTabId("third");
          break;
      }
    },
    goBack() {
      if (this.courseTemplateClasshourCount == "3") {
        this.$router.push({name:"gameplaythree",query:{courseId:this.courseId}});
      } else if (this.courseTemplateClasshourCount == "5") {
        this.$router.push({name:"gameplayfive",query:{courseId:this.courseId}});
      }
      console.log("返回");
    },
    //游戏闯关说明
    introduce() {
      console.log("游戏闯关说明");
      this.changeGameDescription(true);
    },
    showdiv() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    //切换课程
    getCourse() {
      this.$axios.post("/usercourse/canstudylist", { token: "" }).then(res => {
        console.log(res.result);
        this.canStudylist = res.result;
      });
    }
  }
};
</script>

<style lang="less">
.app-learning {
   #show > ul > li {
    clear: both;
    float: left;
    padding-bottom: 18px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 18px;
    
}
  #show {
    position: absolute;
    margin-left: 108px;
    z-index: 3;
    width: auto;
    height: auto;
    background: #ffffff;
    box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
    border-radius: 3px;
    padding: 31px 39px 31px 30px;
    &::before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #fff;
      left: -16px;
      top: 10px;
    }
    .gameTab-list {
      max-height: 241px;
      overflow: hidden;
      overflow-y: scroll;
      margin-right: -35px;
      padding-right: 45px;
      > li {
        &:last-child {
          margin-bottom: 0;
          border-bottom: 0;
        }
        > div {
          &:nth-child(1) {
            width: 95px;
            height: 55px;
            border-radius: 3px;
            overflow: hidden;
            margin-right: 11px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .btnmt4{
            margin-left: 20px;
            >li{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .Learning_content>.leftClass-tab>.el-tabs__content{
      min-height: 600px;
    }
}
.Learning_body {
  .leftClass-tab .el-tabs__active-bar {
    /* display: none; */
    // width: 20px !important;
    // height: 20px !important;
    background: rgba(196, 165, 127, 1);
    border: 5px solid #eae0d5;
    border-radius: 50%;
  }
  .el-tabs__header {
    height: 45px;
  }
  .leftClass-tab .define-tabsOrder_list .el-tabs__item.is-active::after {
    content: none;
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    left: 50%;
    /* margin-left: -20px; */
    bottom: -16px;
  }
  .define-tabsClass_List .el-tabs__nav {
    text-align: center;
    width: 100%;
    height: 52px;
  }
  .Class_list-carousel li {
    margin-top: 51px;
    width: calc(25% - 3px);
    border-right: 1px solid #dcc9b2;
    padding: 0px 30px;
  }
  .Class_list-carousel li:first-child {
    padding-left: 0px;
  }
  .Class_list-carousel li:last-child {
    border-right: 0;
  }
  .leftClass-tab .define-tabsOrder_list .el-tabs__item.is-active::after {
    content: "";
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    left: 50%;
    /* margin-left: -20px; */
    bottom: -16px;
  }
  .define-tabsClass_List .el-tabs__item.is-active::after {
    content: "";
    width: 13px;
    height: 13px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -8px;
    bottom: -16px;
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    /**/
  }
  .Class_list-carousel li span.dis_block span.pos_a {
    right: 0px;
  }
  .Class_list-carousel li span.dis_block a:nth-child(1) {
    border-left: 0;
  }
  .Class_list-carousel li span.dis_block a {
    color: #000;
    border-left: 1px solid #000;
    padding: 0px 5px 0px 8px;
  }
  .Class_list-carousel li span.dis_block span.c4a5 a {
    color: #c4a57f;
    border-color: #c4a57f;
  }
  /* .Class_list-content >.Class_list-content-img >span.lb_class{
    background: #ea9c91;
} */
  /*** 覆盖element-ui tabs **/
  .define-tabsClass_List {
  }
  .define-tabsClass_List .el-tabs__nav-scroll {
    overflow: hidden;
    height: 54px;
  }
  .define-tabsClass_List .el-tabs__item {
    font-size: 18px;
  }
  .define-tabsClass_List .el-tabs__item.is-active {
    color: #c4a57f;
    position: relative;
  }
  .define-tabsClass_List .el-tabs__item.is-active::after {
    content: "";
    width: 13px;
    height: 13px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -8px;
    bottom: -16px;
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  /**灰色线**/
  .define-tabsClass_List .el-tabs__nav-wrap::after {
    bottom: 5px !important;
    height: 1px !important;
    background-color: #e5dcd2;
  }
  .define-tabsClass_List .el-tabs__item:hover {
    color: #c4a57f;
  }

  .define-tabsClass_List .el-tabs__nav {
    text-align: center;
    width: 100%;
    height: 52px;
  }
  /*active - --**/
  .define-tabsClass_List .el-tabs__active-bar {
    display: none;
    /*     
    width: 13px  !important;
    height: 13px;
    background: #C4A57F;
    border-radius: 50%;
    display: inline-block;
     */
  }
  .define-tabsClass_List .iconfont-shufa {
  }
}
.Learning_body .Learning_content .Bask_homework {
  margin-left: 65px;
  width: 660px;
}
.Learning_body .Learning_content .Bask_homework textarea {
  height: 90px;
  padding: 4px 10px;
  border: 1px solid rgba(196, 165, 127, 0.5);
  border-radius: 2px;
  resize: none;
  outline: none;
  line-height: 20px;
  width: 100%;
}
.Learning_body .Learning_content .Bask_homework .Bask_homework_upload {
  display: inline-block;
  width: 76px;
  height: 76px;
  border: 2px dashed #ddd;
  text-align: center;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .Bask_homework_upload
  > div
  > span.c3d.fz34 {
  line-height: 70px;
}
.Learning_body .Learning_content .Bask_homework .upload__tip {
  position: absolute;
  margin-top: 10px;
  width: calc(300px);
  height: auto;
  padding: 20px 20px 13px;
  background: #ffffff;
  box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
  border-radius: 4px;
  /* float: left; */
  z-index: 11;
}
.Learning_body .Learning_content .Bask_homework .upload__tip::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #fff;
  left: 16px;
  top: -16px;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .upload__tip
  .upload__tipTitle
  p
  span.cb49 {
  font-size: 17px;
  font-weight: bold;
  position: relative;
  top: -2px;
  cursor: pointer;
}
.Learning_body .Learning_content .Bask_homework .upload__tip > ul {
  float: left;
}
.Learning_body .Learning_content .Bask_homework .upload__tip > ul li {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .upload__tip
  > ul
  li:nth-child(3n) {
  margin-right: 0px;
}
.Learning_body .Learning_content .Bask_homework .upload__tip > ul li > img {
  width: 100%;
  height: 100%;
}
.Learning_body .Learning_content .Bask_homework .define-tabsOrder_list {
  margin-left: 0px;
  margin-top: 45px;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .define-tabsOrder_list
  .el-tabs__item {
  font-size: 14px;
  font-weight: normal;
  padding-left: 20px;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .define-tabsOrder_list
  .el-tabs__item.is-active::after {
  width: 20px;
  height: 20px;
}
.Learning_body .Learning_content .Introduce {
  margin-left: 65px;
}
.Homework-ulList > li {
  display: flex;
}
.Homework-ulList > li label {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  margin-right: 11px;
}
.Homework-ulList > li label > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.Homework-ulList > li label + div {
  padding-bottom: 30px;
  margin-bottom: 40px;
  float: right;
  width: 91%;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r {
  width: 100%;
  clear: both;
  height: auto;
  float: left;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r span.pos_a {
  bottom: 10px;
  left: 390px;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r ul {
  width: 670;
  margin-top: 14px;
  clear: both;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r ul li {
  width: 180px;
  height: 180px;
  margin-right: 24px;
  margin-bottom: 24px;
  float: left;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r ul li > img {
  width: 100%;
  height: 100%;
}
.Homework-ulList > li label + div > div.mt-5 div.pos_r ul li:nth-child(3n) {
  margin-right: 0px;
}
/* 评价 Homework-ulList*/
.myHomework-ulList {
  margin-top: 59px;
}
.myHomework-ultitle {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
}
.myHomework-ultitle > span {
  position: relative;
  top: -10px;
  background: #fbf8f5;
  padding: 0px 4px;
  /* display: inline-block; */
  z-index: 1;
}
.myHomework-ultitle::before {
  content: "";
  position: absolute;
  left: 0px;
  height: 1px;
  width: 100%;
}
.myHomework-ultitle::after {
  content: "";
  position: absolute;
  right: 0px;
  height: 1px;
  width: 100%;
  border-bottom: 1px dashed #e2d3c0;
}
.Homework-ulList li label {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
.Homework-ulList li label > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.Homework-ulList li label + div {
  padding-bottom: 30px;
  margin-bottom: 20px;
  float: right;
  width: 100%;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r {
  width: 100%;
  clear: both;
  height: auto;
  float: left;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r span.pos_a {
  bottom: 10px;
  left: 390px;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r ul {
  width: 380px;
  margin-top: 14px;
  clear: both;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r ul li {
  width: 120px;
  height: 120px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r ul li > img {
  width: 100%;
  height: 100%;
}
.Homework-ulList li label + div > div.mt-5 div.pos_r ul li:nth-child(3n) {
  margin-right: 0px;
}
</style>
