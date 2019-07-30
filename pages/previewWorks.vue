<template>
  <section style="background:rgb(248, 243, 238)">
    <article class="w1000 m-auto" style="min-height:800px">
      <div class="Learning_body flex" style="min-height:800px">
        <!-- 左 -->
        <div class="Learning_leftContent bg3f">
          <div>
            <h3 class="fz16 c3" style="font-weight:400">{{detail.homeworkTitle}}</h3>
            <div>
              <!-- <p class="fz14 c3 text-center mt-30">写字是门日课，也是闯关游戏，祝你玩耍愉快，一路通关晋级～</p> -->
              <div
              class="app-change-index-richText"
                style="margin-top:30px;height:700px;overflow:auto;padding-right:10px"
                v-html="detail.homeworkContent"
              ></div>
            </div>
          </div>

          <!-- <div v-for="(item,index) in myworklist" :key="item.homeworkAssignId">
          <h3 class="fz16 c3">{{item.typeName}}</h3>-->
          <!-- <p class="fz14 c3 text-center mt-30">写字是门日课，也是闯关游戏，祝你玩耍愉快，一路通关晋级～</p> -->
          <!-- <div class="text-center" v-if="index==0">
              <h3 class="fz16 c3">《{{item.homeworkTitleList}}》</h3>
              <p>作业内容1： {{item.homeworkContent}}</p>
          </div>-->
          <!-- <div class="text-center" v-if="index==1&&myworklist1.length>0">
              <h3 class="fz16 c3">《{{myworklist1.homeworkTitleList}}》</h3>
              <p>作业内容2： {{myworklist1.homeworkContent}}</p>
            </div>
            <div class="text-center" v-if="index==2&&myworklist0.length>0">
              <h3 class="fz16 c3">《{{myworklist2.homeworkTitleList}}》</h3>
              <p>作业内容3： {{myworklist2.homeworkContent}}</p>
          </div>-->
          <!-- </div> -->
        </div>
        <!-- 右 -->
        <div class="Learning_rightContent">
          <div class="Learning_rightContent-Title">
            <h3 class="fz16 c0 dis_in_block" style="font-weight:400">答题区</h3>
            <span class="fz14 c4a5 fr" @click="goBack()" style="cursor:pointer">&#60;&#60; 返回学习主页</span>
          </div>
          <!--晒作业-->
          <div class="Bask_homework app-Bask_homework">
            <p class="fz14 c30" style="color:rgba(0,0,0,.7)">分享你本周写字的作业，提交照片即可</p>
            <div class="mt-24 app-change-richText-mt50 " style="margin-top:13px">
              <RichText ref="richText" :kinds="['picture']" style="width:100%;height:90px"></RichText>
              <div class="mt-15 app-change-write-label " style="margin-top:11px;position:relative">
                <input type="button" class="fr btn-Bask_homework outline" value="提交作业" @click="Submit">
                <span class="fz12 cb49 fr">
                  <el-checkbox
                    v-model="checked"
                    class="autoLogin app-check-color-change"
                    style="color:rgba(0,0,0,.7)"
                  >同时分享至“晒作业”</el-checkbox>
                </span>
              </div>
            </div>
            <!-- 往期作业 -->
            <div class="Past_work">
              <h3 class="fz16 c30" style="font-weight:400">往期作业</h3>
              <ul class="Homework-ulList app-Homework-ulList" v-if="oldlist.length>0">
                <li v-for="(item) in oldlist" :key="item.homeworkFinishId" style="padding-top:10px" >
                  <div style="width:100%">
                    <time class="fz14 c30">
                      <i class="el-icon-date cb19 fz16"></i>
                      <span style="color:rgba(0,0,0,.8)">{{initTime(item.createTime)}}</span>
                    </time>
                    <span
                        class="app-MyHomework-content-sunBtn"
                        v-if="!item.isSun"
                        style="margin-top:-9px"
                       @click="openModal(item.homeworkFinishId)"
                      >晒作业
                      </span>
                      <span class="app-MyHomework-content-sun" v-else
                      >
                      <!-- <i class="el-icon-check" style="font-weight:bolder"></i> -->
                      <!-- <img :src="require('@/assets/img/yesTrue.png')" alt="" style="width:16px"> -->
                      已晒出
                    </span>
                    <!-- <span
                      class="cb19 fz16"
                      style="cursor:pointer"
                      @click="openModal(item.homeworkFinishId)"
                      v-if="!item.isSun"
                    >
                      <i class="el-icon-share"></i>
                      <span class="fz14">晒作业</span>
                    </span> -->
                    <!-- <span
                      class="cb19 fz16"
                      style="cursor:pointer;background:#fdfcfa"
                      v-if="item.isSun"
                    >
                     <i class="el-icon-check"></i>
                      <span class="fz14">已晒过</span>
                    </span> -->

                    <div class="mt-5">
                      <!-- <img
                        class="middle fl"
                        :src="require('@/assets/img/Placed_top.png')"
                        alt
                        style="margin-right:5px"
                      > -->
                      <span
                        class="fz14"
                        v-html="item.content"
                        style="marginTop:10px;display:block;width:321px;color:rgba(0,0,0,.9)"
                      ></span>
                      <div class="pos_r">
                        <ul>
                          <li v-for="(itemimg,indeximg) in item.picList" :key="itemimg.id" style="width:100px!important;height:100px!important">
                            <img
                              v-lazy="itemimg.homeworkPictureUri"
                              alt
                              style="object-fit:cover;cursor:pointer"
                              @click="lookImg(item.picList,indeximg,'homeworkPictureUri')"
                            >
                          </li>
                        </ul>
                        <!-- <span
                          class="pos_a fz12 c30"
                          style="color:rgba(0,0,0,.5)"
                          v-if="item.picList.length>0"
                        >共{{item.picList.length}}张</span> -->
                      </div>
                        <div class="fz12 app-change-pic-num" v-if="item.picList.length>0">共{{item.picList.length}}张</div>

                    </div>
                    <!-- <div class="mt-10">
                                                <time class="fz14 c9">浏览量 1290</time>
                                                <span class="fr fz14 c9">
                                                    <span>
                                                        <a href="Learning">
                                                            <i class="el-icon-edit"></i>
                                                            <span>1232</span>
                                                        </a>

                                                    </span>
                                                    <span>
                                                        <i class="el-icon-star-on cb49"></i>
                                                        <span>999</span>
                                                    </span>
                                                </span>
                    </div>-->
                    <!-- 老师评语 -->
                    <div class="teacherEvaluation">
                      <ul>
                        <li
                          v-for="(items,indexs) in item.userHomeWorkCommnetResponseVos"
                          :key="indexs"
                        >
                          <h4 class="fz14 cb49" style="font-weight:400">老师评语：</h4>
                          <p
                            class="fz14 c30"
                            style="color:rgba(0,0,0,.8)"
                            v-html="items.content"
                          ></p>
                         
                          <div class="pos_r">
                            <ul>
                              <li v-for="(itemsimg,indexsimg) in items.picList" :key="indexsimg">
                                <img
                                  v-lazy="itemsimg.homeworkPictureUri"
                                  alt
                                  style="object-fit:cover"
                                >
                              </li>
                            </ul>
                            <!-- <span
                          style="color:rgba(0,0,0,.5)"
                              class="pos_a fz12 c30"
                              v-if="items.picList.length>0"
                            >共{{items.picList.length}}张</span> -->
                          </div>
                          <p class="fz12 c30" style="color:rgba(0,0,0,.5);margin-bottom:10px" v-if="items.picList.length>0">共{{items.picList.length}}张</p>
                           <time
                            class="fz14 c9"
                          >{{items.userNickName}} {{initTime(items.createTime)}}</time>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="course_no_data" v-if="oldlist.length<=0" style="text-align:center">
                <img :src="require('@/assets/img/null-show.png')" alt>
                <p class="fz12 c4a5 mt-15">暂时没有作业哦~</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <!-- <el-dialog
      title="确认"
      :visible="dialogVisible"
      width="303px"
      top="30vh"
      v-if="dialogVisible"
      @close="dialogVisible = false"
    >
      <p style="text-align:center">您确认分享这条信息吗?</p>
      <span slot="footer" class="dialog-footer" style="display:flex;justify-content: center;">
        <el-button @click="dialogVisible = false" class="app-btn-confirm">取 消</el-button>
        <el-button
          type="primary"
          @click="share(id)"
          class="app-btn-confirm"
          style="background: #07767a;"
        >确 定</el-button>
      </span>
    </el-dialog> -->
    <MessageBox
      v-if="dialogVisible"
      :visible="dialogVisible"
      :onCancel="()=>{this.dialogVisible = false}"
      :onOK="share.bind(this,id)"
      isConfirm="false"
      msg="您确认分享这条信息吗?"
    />
    <ViewImg
      v-if="viewFlag"
      :visible="viewFlag"
      :list="ViewImgList"
      :index="viewIndex"
      :close="viewClose"
      :field="field"
    />
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import RichText from "@/components/RichText"; //富文本
import { computingTime } from "@/plugins/utils";
import moment from "moment";
import ViewImg from "@/components/viewImg"; //查看大图
import MessageBox from "@/components/messageBox"; //弹出框
export default {
  // asyncData(api) {
  //   console.log(api.params.homeworkAssignId, "任务id");
  //   let homeworkAssignId = api.params.homeworkAssignId;
  //   let classhoursId = api.params.classhoursId
  //   return {
  //     homeworkAssignId:homeworkAssignId,
  //     classhoursId:classhoursId
  //     };
  // },
  layout:"living",
  data() {
    return {
      checked: false,
      oldlist: [], //往期作业
      typelist: [], //作业类型
      oklist: [], //作业完成度
      myworklist0: [],
      myworklist1: [],
      myworklist2: [],
      myworklist: [],
      dialogVisible: false, //弹出框
      homeworkAssignId: null,
      classhoursId: null,
      id: "", //分享id
      detail: {
        homeworkAssignId: "",
        homeworkContent: "", //作业内容
        homeworkTitle: "", //作业标题
        homeworkType:"",//1 写字作业  2:读书作业  3:思考作业   写字:图片必传。其它文字必传 
      },
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  components: {
    RichText,
    ViewImg,
    MessageBox
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
      // courseTemplateClasshourCount: state =>
      //   state.games.courseinfo.courseTemplateClasshourCount
    })
  },
  mounted() {
    this.homeworkAssignId = this.$route.query.homeworkAssignId;
    // this.classhoursId = this.$route.query.classhourId;
    // console.log(this.$route.query, this.homeworkAssignId, this.classhoursId);
    // this.getdata();
    this.getDetail(this.homeworkAssignId);
    // this.getPastlist();
  },
  methods: {
    initTime(time) {
      return moment(time)
        .add(-8, "h")
        .format("YYYY-MM-DD HH:mm");
    },
    openModal(id) {
      this.id = id;
      this.dialogVisible = true;
    },
    computingTime,
    ...mapMutations({}),
    //返回学习主页
    goBack() {
      return
      console.log(this.$route.query.courseId);
      this.$router.push({
        name: "singleOrder",
        query: { courseId: this.$route.query.courseId }
      });

      // if (this.courseTemplateClasshourCount == "3") {
      //   this.$router.push({
      //     name: "gameplaythree",
      //     query: { courseId: this.courseId }
      //   });
      // } else if (this.courseTemplateClasshourCount == "5") {
      //   this.$router.push({
      //     name: "gameplayfive",
      //     query: { courseId: this.courseId }
      //   });
      // }
      console.log("返回");
    },
    //获取往期作业
    getPastlist(page) {
      this.$axios
        .post("/userhomework/pastlist", {
          pageIndex: page || 1,
          token: "",
          homeworkAssignId: this.homeworkAssignId
        })
        .then(res => {
          this.oldlist = res.result.userHomeWorkPastResponseVos;
        });
    },
    //获取初始数据 弃用
    getdata() {
      //往期作业
      // this.$axios
      //   .post("/userhomework/pastlist", {
      //     pageIndex: 1,
      //     token: "",
      //     homeworkAssignId: this.homeworkAssignId
      //   })
      //   .then(res => {
      //     this.oldlist = res.result.userHomeWorkPastResponseVos;
      //   });
      this.getPastlist();
      //作业类型
      this.$axios
        .post("/userhomework/typelist", {
          token: ""
        })
        .then(res => {
          //返回  类型id
          this.typelist = res.result;
        });
      let ary = [];

      //课程作业列表
      this.$axios
        .post("/homework/list", {
          id: this.classhoursId, //课时id
          token: ""
        })
        .then(async res => {
          let newarr = null;
          //返回  作业类型Id
          console.log("课程作业列表", res);
          ary = res.result;
          //循环获取数据
          ary.map(async item => {
            item.homeworkTitleList = item.homeworkTitle;
            delete item.homeworkTitle;
            let obj = {};
            // let res = await this.$axios.post("/homework/detail", {
            //   id: item.homeworkId
            // });
            let res = await this.getDetail(item.homeworkId);
            res.result.homeworkTitleDetail = res.result.homeworkTitle;
            delete res.result.homeworkTitle;

            res.result.homeworkContent = res.result.homeworkContent
              ? JSON.parse(res.result.homeworkContent).blocks[0].text
              : null;
            delete res.result.homeworkTitle;
            obj = { ...item, ...res.result };
            if (newarr == null) {
              newarr = [];
            }
            newarr.push(obj);
          });
          let timer = setInterval(() => {
            if (newarr.length > 0) {
              clearInterval(timer);
              this.myworklist0 = newarr[0] || [];
              this.myworklist1 = newarr[1] || [];
              this.myworklist2 = newarr[2] || [];
              newarr.map(item => {
                let typeName = "";
                this.typelist.forEach(ite => {
                  if ((ite.typeId = item.homeworkTypeId)) {
                    typeName = ite.typeName;
                  }
                });
                item.typeName = typeName;
                return item;
              });
              this.myworklist = newarr;
              console.log(this.typelist);
              console.log(newarr, "?????");
              return;
            }
            // this.myworklist = newarr[2]
          }, 1000);
        });
    },
    //获取详情
    getDetail(id) {
      this.$axios
        .post("/homework/detail", {
          id
        })
        .then(res => {
          if (res.code == 0) {
            //已修改成html格式
            // if (res.result.homeworkContent) {
            //   res.result.homeworkContent = JSON.parse(
            //     res.result.homeworkContent
            //   ).blocks[0].text;
            // }
            this.detail = res.result;
          }
        });
    },
    //写作业
    Submit() {
      return
      let content = this.$refs.richText.getHtml();
       if (content == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      let picturesUrlList = this.$refs.richText.getImageUrl();
      // if (content == null) {
      //   this.$message({
      //     duration: 2000,
      //     message: "请先输入内容",
      //     type: "error"
      //   });
      //   return;
      // }
      // 拦截 根据作业类型的不同  确定哪些必填
      if(this.detail.homeworkType==1){//写字作业
        if(picturesUrlList.length<=0){
          this.$message({
              duration: 5000,
              message: this.$selfMsg.writeWork,
              type: "warning"
            });
            return
        }
        }else{//其它类型
          if(content==null){
            this.$message({
              duration: 5000,
              // message: `${this.detail.homeworkType==2?'读书作业':'思考作业'}必须提交内容!`,
              message:this.detail.homeworkType==2?this.$selfMsg.readWork:this.$selfMsg.thoughtWork,
              type: "warning"
            });
            return
          }

      }
      this.$axios
        .post("/userhomework/add", {
          token: "",
          homeworkAssignId: this.homeworkAssignId, //所要完成作业的任务Id
          homeworkTypeId: 1, //作业类型id
          isSun: this.checked, //是否晒作业
          picList: picturesUrlList, //作业图片地址列表
          content: content, //作业描述内容
          courseType: 1
        })
        .then(res => {
          if (res.result) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.sumbinSucess,
              type: "success"
            });
            // this.getdata();
            this.getPastlist();
          }
          this.$refs.richText.clearHtml();
          this.$refs.richText.clearImgAry();
        });
    },
    //晒作业
    share(id) {
      return
      this.$axios
        .post("/userhomeworksun/sunbyhomeworkId", {
          token: "",
          homeworkFinishId: id,
          courseType: 1
        })
        .then(res => {
          if (res.code == 0) {
            this.dialogVisible = false;
            this.getPastlist();
            this.$message({
              duration: 5000,
              message: this.$selfMsg.sendSucess,
              type: "success"
            });
          }
        });
    },
    //查看大图
    lookImg(list, index, field) {
      this.viewFlag = true;
      this.ViewImgList = list;
      this.viewIndex = index;
      this.field = field;
    },
    viewClose(flag) {
      this.viewFlag = flag;
    }
  }
};
</script>

<style lang="less">
.app-MyHomework-content-sun{
   float: right;
   color: rgba(196, 165, 127, 1);
}
.app-MyHomework-content-sunBtn {
    float: right;
    display: block;
    width: 90px;
    height: 30px;
    width: 90px;
    height: 30px;
    background: rgba(196, 165, 127, 1);
    border-radius: 4px;
    color: rgba(251, 249, 248, 1);
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
.Learning_body {
  .is-checked .el-checkbox__inner {
    background-color: #b49876 !important;
    border-color: #b49876 !important;
  }
  .is-checked .el-checkbox__label {
    color: #b49876 !important;
  }
  .el-checkbox {
    border-color: #b49876 !important;
  }
  .el-checkbox__inner:hover {
    border-color: #b49876 !important;
  }
  .el-checkbox__input.isfocus .el-checkbox__inner {
    border-color: #b49876 !important;
    vertical-align: middle;
  }
}
// .autoLogin {
//   .el-checkbox__inner{
//     color: red !important;
//   }
//   //  .el-checkbox__input .is-checked{
//   //    color: red !important;
//   // }
//     .el-checkbox__label {
//       color: #ccc !important;
//     }
//   }
.app-Homework-ulList {
  height: 460px;
  overflow-y: auto;
  padding-right: 23px;
  overflow-x: hidden;
  &>li{
    width: 321px
  }
}
.app-btn-confirm {
  width: 91px;
  height: 32px;
  line-height: 10px;
}
.app-Bask_homework {
  .app-BASK-Span {
    .is-checked {
      border: red;
    }
  }
  .tool {
    position: relative;
    width: 100px;
    z-index: 10;
  }
}
.Learning_rightContent {
  display: inline-block;
  width: calc(430px);
  background: RGBA(253, 252, 250, 1);
  padding: 64px 30px 10px;
}
.Learning_rightContent .Bask_homework {
  margin-top: 25px;
  margin-bottom: 10px;
}
.Learning_rightContent .Bask_homework .el-checkbox__inner:hover {
  border-color: #b49876 !important;
}
.Learning_rightContent .Bask_homework > div.mt-24 > textarea {
  height: 90px;
  border: 1px solid rgba(196, 165, 127, 0.5);
  width: 100%;
  resize: none;
}
.Learning_rightContent .Bask_homework > div.mt-24 > div.mt-15 {
  height: 32px;
  line-height: 32px;
}
.Learning_rightContent .Bask_homework > div.mt-24 > div.mt-15 span {
  font-weight: normal;
}
.Learning_rightContent
  .Bask_homework
  > div.mt-24
  > div.mt-15
  span
  .el-checkbox__label {
  font-size: 12px;
}
.Learning_rightContent
  .Bask_homework
  > div.mt-24
  > div.mt-15
  .btn-Bask_homework {
  margin-left: 13px;
}
.Learning_rightContent .Bask_homework .Past_work > h3 {
  margin-top: 42px;
  margin-bottom: 24px;
}
.Learning_rightContent .Bask_homework .Past_work .Homework-ulList > li {
  border-bottom: 1px dashed rgba(196, 165, 127, 0.6);
  padding-bottom: 26px;
  margin-bottom: 24px;
}
.Learning_rightContent
  .Bask_homework
  .Past_work
  .Homework-ulList
  > li:last-child {
  border-bottom: 0px;
  padding-bottom: 0px;
}
.Learning_rightContent
  .Bask_homework
  .Past_work
  .Homework-ulList
  > li
  div
  > span.cb19.fz16 {
  padding: 1px 6px;
  background: rgba(180, 152, 118, 0.1);
  border-radius: 55px;
  margin-left: 11px;
}
.Learning_rightContent div.pos_r {
  display: flex;
  margin-top: 12px;
}
.Learning_rightContent div.pos_r ul {
  float: left;
  clear: both;
}
.Learning_rightContent div.pos_r ul li {
  width: 90px !important;
  height: 90px !important;
  float: left;
  margin-right: 9px;
  margin-bottom: 8px;
}
.Learning_rightContent div.pos_r ul li:nth-child(3n) {
  margin-right: 0px;
}
.Learning_rightContent div.pos_r ul li img {
  width: 100%;
  height: 100%;
}
.Learning_rightContent div.pos_r span.pos_a {
  right: -62px;
  bottom: 8px;
  width: 62px;
}
.Learning_rightContent
  .Bask_homework
  .Past_work
  .Homework-ulList
  > li
  div
  .teacherEvaluation
  > ul
  > li
  h4 {
  margin-top: 7px;
}
.Learning_rightContent
  .Bask_homework
  .Past_work
  .Homework-ulList
  > li
  div
  .teacherEvaluation
  > ul
  > li
  p {
  margin-top: 6px;
}
.Learning_rightContent
  .Bask_homework
  .Past_work
  .Homework-ulList
  > li
  div
  .teacherEvaluation
  > ul
  > li
  time {
  display: inline-block;
  margin-top: 3px;
}
.Learning_leftContent {
  display: inline-block;
  width: calc(580px);
  padding: 64px 34px 64px;
}
.Learning_leftContent div.text-center h3 {
  margin: 25px auto;
  font-weight: 500;
}
.Learning_leftContent div.text-center p {
  font-size: 14px;
  color: #666;
  line-height: 30px;
  line-height: 44px;
}
</style>
