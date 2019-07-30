<template>
<!-- 弃用 -->
  <section>
    <div class="Bask_homework app-Bask-homework" v-if="!postFlag">
      <p class="fz14 c30" style="margin-bottom:-30px">晒出你做满意的作业作品吧～</p>
      <div class="mt-24">
        <!-- <textarea
          name
          id
        ></textarea>-->
        <RichText ref="richText" :kinds="['picture']"></RichText>
        <div class="mt-15" style="margin-top:-15px">
          <input
            type="button"
            class="fr btn-Bask_homework"
            style="cursor:pointer;"
            value="晒作业"
            @click="sunTask"
          >
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          <!-- 点击 -->
        </div>
      </div>
      <!-- 晒作业列表 -->
      <div>
        <el-tabs
          type
          class="overflowDefine define-tabsClass_List define-tabsOrder_list el-tabs el-tabs--top app-bask_homework-tab"
          @tab-click="typelist"
          v-model="tabId"
        >
          <!-- 最新 -->
          <el-tab-pane name="create_time">
            <span slot="label">最新</span>
            <ul class="Homework-ulList" style="marginTop:30px;">
              <li v-for="(item) in list" :key="item.discussUserId">
                <label for>
                  <img v-lazy="item.discussHeadUri" alt>
                </label>
                <div>
                  <span class="fz16 c30">
                    <span style="marginRight:20px">{{item.discussUser}}</span>
                    <time class="fz14 c6">发表于{{computingTime(item.createTime)}}</time>
                  </span>
                  <span
                    style="float:right"
                    v-if="item.discussUserId!=studentId"
                    @click="privateLetter(item)"
                  >私信</span>
                  <span
                    style="float:right"
                    v-if="item.discussUserId==studentId"
                    @click="removeTask(item.courseDiscussionId)"
                  >删除</span>
                  <div class="mt-5">
                    <img
                      class="middle fl"
                      :src="require('@/assets/img/Placed_top.png')"
                      style="cursor:pointer;margin-right:5px"
                      alt
                    >
                    <span class="fz14 c4c49" v-html="item.content"></span>
                    <div class="pos_r">
                      <ul>
                        <li v-for="(items,index) in item.courseDiscussionPictures" :key="index">
                          <img
                            v-lazy="items.discussionThumbUri"
                            alt
                            class="thumbImg"
                            @click="lookImg(item.courseDiscussionPictures,index,'discussionPictureUri')"
                          >
                        </li>
                      </ul>
                      <span
                        class="pos_a fz12 c30"
                        v-if="item.courseDiscussionPictures.length!==0"
                      >共{{item.courseDiscussionPictures.length}}张</span>
                    </div>
                  </div>

                  <div class="mt-10">
                    <time class="fz14 c9">浏览量 {{item.clickNum}}</time>
                    <span class="fr fz14 c9 wdb100">
                      <span @click="jumpPost(item.courseDiscussionId)" style="cursor:pointer">
                        <i class="el-icon-edit" style="cursor:pointer;"></i>
                        <span>{{item.discussionNum}}</span>
                      </span>
                      <span class="app-star-line">|</span>
                      <span @click="fabulous(item.courseDiscussionId)">
                        <!-- <i
                          class="el-icon-star-on cb49"
                          v-if="!item.isLiked"
                          style="cursor:pointer;"
                        ></i>
                        <i
                          class="el-icon-star-on cb49"
                          v-if="item.isLiked"
                          style="color:red;cursor:pointer;"
                        ></i>-->
                        <img
                          class="app-star"
                          :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                          alt
                          style="cursor:pointer"
                        >
                        <span>{{item.likeNum}}</span>
                      </span>
                    </span>
                  </div>
                  <!-- <div
                    id="showHomework"
                    v-show="item.flag"
                  >
                    <textarea
                      name=""
                      id=""
                      :placeholder="'回复：'+item.discussUser"
                    ></textarea>
                    <div class="text-right">
                      <input
                        type="button"
                        class="btn-grayComment"
                        value="发表评论"
                      >
                    </div>
                    <div class="showHomework-content">
                      <ul>
                        <li>
                          <div>
                            <img
                              :src="require('@/assets/img/0003.png')"
                              alt=""
                            >
                            <div>
                              <p class="dis_in_block">
                                <span class="fz14 cb49">沫沫er：</span>
                                <span class="fz14 c30">有人知道吗？</span>
                              </p>
                              <span class="fr">
                                <time class="c9 fz14">
                                  2018-09-18 12:22
                                </time>
                                <span class="fz14 c30">
                                  回复
                                </span>
                              </span>
                            </div>
                          </div>

                        </li>
                        <li>
                          <div>
                            <img
                              :src="require('@/assets/img/list_img1.png')"
                              alt=""
                            >
                            <div>
                              <p class="dis_in_block">
                                <span class="fz14 cb49">书法迷：</span>
                                <span class="fz14 c30">回复沫沫er：认真仔细点～</span>
                              </p>
                              <span class="fr">
                                <time class="c9 fz14">
                                  2018-09-18 12:22
                                </time>
                                <span class="fz14 c30">
                                  回复
                                </span>
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>-->
                </div>
              </li>
            </ul>
            <!-- 死数据 -->
          </el-tab-pane>
          <!-- 最热 -->
          <el-tab-pane label name="discussion_num">
            <span slot="label">最热</span>
            <ul class="Homework-ulList" style="marginTop:30px;">
              <li v-for="(item) in list" :key="item.courseDiscussionId">
                <label for>
                  <img v-lazy="item.discussHeadUri" alt>
                </label>
                <div>
                  <span class="fz16 c30">
                    {{item.discussUser}}
                    <time class="fz14 c6">发表于{{computingTime(item.createTime)}}</time>
                  </span>
                  <span
                    style="float:right"
                    v-if="item.discussUserId!=studentId"
                    @click="privateLetter(item)"
                  >私信</span>
                  <span
                    style="float:right"
                    v-if="item.discussUserId==studentId"
                    @click="removeTask(item.courseDiscussionId)"
                  >删除</span>
                  <div class="mt-5">
                    <img
                      class="middle fl"
                      :src="require('@/assets/img/Placed_top.png')"
                      style="cursor:pointer;margin-right:5px"
                      alt
                    >
                    <span class="fz14 c4c49" v-html="item.content"></span>
                    <div class="pos_r">
                      <ul>
                        <li
                          v-for="(items,index) in item.courseDiscussionPictures"
                          :key="index"
                          class="tt"
                        >
                          <img
                            v-lazy="items.discussionThumbUri"
                            class="thumbImg"
                            alt
                            @click="lookImg(item.courseDiscussionPictures,index,'discussionPictureUri')"
                          >
                        </li>
                      </ul>
                      <span
                        class="pos_a fz12 c30"
                        v-if="item.courseDiscussionPictures.length!==0"
                      >共{{item.courseDiscussionPictures.length}}张</span>
                    </div>
                  </div>

                  <div class="mt-10">
                    <time class="fz14 c9">浏览量 {{item.clickNum}}</time>
                    <span class="fr fz14 c9 wdb100">
                      <span @click="jumpPost(item.courseDiscussionId)">
                        <i class="el-icon-edit" style="cursor:pointer;"></i>
                        <span>{{item.discussionNum}}</span>
                      </span>
                      <span class="app-star-line">|</span>
                      <span @click="fabulous(item.courseDiscussionId)">
                        <!-- <i
                          class="el-icon-star-on cb49"
                          v-if="!item.isLiked"
                          style="cursor:pointer;"
                        ></i>
                        <i
                          class="el-icon-star-on cb49"
                          v-if="item.isLiked"
                          style="color:red;cursor:pointer;"
                        ></i>-->
                        <img
                          class="app-star"
                          style="cursor:pointer"
                          :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                          alt
                        >
                        <span>{{item.likeNum}}</span>
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <!-- 滚动条 -->
          <div class="m-auto afters" style="text-align:center">{{tit}}</div>
          <ScrollBottom @timer="timer" ref="mychild"/>
        </el-tabs>
      </div>
    </div>
    <PostDetails v-if="postFlag" :getPost="getPost"></PostDetails>
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
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import RichText from "@/components/RichText"; //富文本
import PostDetails from "@/components/Learning/postDetails"; //帖子详情
import { computingTime } from "@/plugins/utils";
import ViewImg from "@/components/viewImg"; //查看大图
export default {
  components: {
    ScrollBottom,
    RichText,
    PostDetails,
    ViewImg
  },
  data() {
    return {
      Timingopen: null,
      tit: "加载更多",
      fileList2: [
        //上传的文件列表
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
        //, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      tabPosition: "left",
      flag: false, //上传图片的显示隐藏
      imgAry: [], //上传图片数组
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      studentId: state => state.my.info.info.studentId, //登录用户的id
      list: state => state.Learning.homework.list,
      page: state => state.Learning.homework.page, //page页码
      courseId: state => state.Learning.courseId,
      courseType: state => state.Learning.homework.courseType,
      postFlag: state => state.Learning.homework.postFlag
    }),
    tabId: {
      get() {
        return this.$store.state.Learning.homework.tabId;
      },
      set(newVal) {
        this.$store.state.Learning.homework.tabId = newVal;
      }
    }
  },
  //初始获取数据
  created() {
    console.log(this.courseId);
    this.$axios
      .post("/coursediscussion/list", {
        token: "",
        sortType: "create_time", //1最新  2最热
        pageIndex: 1,
        courseId: this.courseId,
        courseType: this.courseType
      })
      .then(res => {
        this.getlist(res.result.courseDiscussionResponseVos);
        this.changepagesouse();
        if (res.result.courseDiscussionResponseVos.length == 0) {
          this.$refs.mychild.gets();
          this.tit = "目前没有更多数据";
        } else {
          this.$refs.mychild.get();
          this.tit = "加载更多";
        }
      });
  },
  methods: {
    ...mapMutations({
      changeTab: "Learning/homework/changetab", //切换tab
      changePage: "Learning/homework/changepage", //加载更多
      getlist: "Learning/homework/getlist",
      changepagesouse: "Learning/homework/changepagesouse", //key
      changeFlag: "Learning/homework/changeFlag", //回复框的显示隐藏
      changePostFlag: "Learning/homework/changePostFlag", //修改帖子详情的可见状态
      changePostId: "Learning/homework/changePostId", //修改帖子详情的可见状态
      changeTabId: "my/changeTabId", //改变tabId
      chanaddtext: "my/chanaddtext",
      Loginpage: "login/Loginpage" //弹出登录框
    }),
    computingTime,
    ////点击tab切换时切换数据
    async typelist(tab, e) {
      this.$refs.mychild.get();
      this.tit = "加载更多";
      if (tab.index == 0) {
        this.changeTab("create_time");
      } else {
        this.changeTab("discussion_num");
        console.log(this.tabId);
      }
      this.loadMore("add"); //获取接口数据
    },
    //加载更多
    async loadMore(type) {
      let that = this;
      clearInterval(that.Timingopen);
      let data = await this.$axios.post("/coursediscussion/list", {
        appid: this.appid,
        token: this.userstoken,
        sortType: this.tabId, //1最新  2最热
        pageIndex: this.page,
        courseId: this.courseId,
        courseType: 1
      });
      let newarr = data.result.courseDiscussionResponseVos;
      if (type !== undefined) {
        that.getlist(newarr);
      } else {
        if (newarr.length == 0) {
          //没有数据的时候
          that.flag = true;
          that.tit = "目前没有更多数据";
          that.$refs.mychild.gets();
        } else {
          //接口继续添加数据
          newarr.forEach((item, i) => {
            that.list.push(item);
          });
          that.$refs.mychild.get();
        }
      }
      console.log(this.tabId, this.page, this.list, "new");
    },
    //加载事件
    timer(fn) {
      fn = null;
      let that = this;
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.changePage();
        that.loadMore();
      }, 1000);
    },
    handleChange(val) {
      console.log(val);
    },
    showHomeworkdiv() {
      if (
        (showHomeworkdiv_display =
          document.getElementById("showHomework").style.display == "none")
      ) {
        //如果show是隐藏的
        document.getElementById("showHomework").style.display = "block"; //show的display属性设置为block（显示）
      } else {
        //如果show是显示的
        document.getElementById("showHomework").style.display = "none"; //show的display属性设置为none（隐藏）
      }
    },
    //回复
    reply() {
      console.log("回复");
    },
    //发帖子
    sunTask() {
      let content = this.$refs.richText.getHtml();
       if (content == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      let picturesUrlList = this.$refs.richText.getImageUrl();
      this.$axios
        .post("/coursediscussion/add", {
          token: "",
          courseType: 1, //课程类型 0:免费 1单阶
          content, //帖子内容
          picturesUrlList, //帖子图片
          courseId: this.courseId //课程id
        })
        .then(res => {
          if (res.code == 0) {
            this.$refs.richText.clearHtml();
            this.$refs.richText.clearImgAry();
            this.$refs.richText.changeUploadFlag(false);
            //重新获取数据
            this.getPost();
          }
        });
    },
    //点赞
    fabulous(id) {
      this.$axios
        .post("/coursediscussion/praise", { token: "", id })
        .then(res => {
          console.log(res);
          this.getPost();
        });
    },
    //获取帖子数
    getPost() {
      this.$axios
        .post("/coursediscussion/list", {
          token: "",
          courseId: this.courseId,
          courseType: 1,
          pageIndex: 1,
          sortType: this.tabId //排序类型 create_time：按最新、discussion_num：按最热
        })
        .then(res => {
          this.getlist(res.result.courseDiscussionResponseVos);
        });
    },
    //查看帖子详情
    jumpPost(id) {
      console.log(id);
      //修改帖子id
      // this.changePostId(id);
      //修改帖子详情的可见
      // this.changePostFlag(true);
      let routeData = this.$router.resolve({
        name: "Learning",
        query: { courseId: this.courseId, change: true, homeworkFinishId: id }
      });
      window.open(routeData.href, "_blank");
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
    },
    //私信
    privateLetter(obj) {
      if (this.userstoken) {
        //跳转到站内信
        this.changeTabId("9");
        this.chanaddtext("站内信");
        this.$router.push({
          name: "My",
          params: {
            info: obj
          }
        });
      } else {
        this.Loginpage(true);
      }
    },
    //删除帖子
    removeTask(id) {
      this.$axios
        .post("/userhomeworksun/delDiscussion", {
          homeworkFinishId: id,
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.delete,
              type: "success"
            });
            this.getPost()

          }
        });
    }
  }
};
// <span
//             class="fz12 c3"
//             style="cursor:pointer;"
//             @click="flag=!flag"
//           >
//             <i class="el-icon-picture cb19 fz16"></i> 图片
//           </span>
//           <div
//             class="upload__tip"
//             v-show="flag"
//           >
//             <div class="upload__tipTitle">
//               <p>
//                 <span class="fz14 c3">本地上传</span>
//                 <span
//                   class="fr cb49"
//                   @click="flag=false"
//                 >×</span>
//               </p>
//               <p class="fz12 c30 mt-15 mb-15">共{{imgAry.length}}张，还能上传{{9-imgAry.length}}张</p>
//             </div>
//             <ul>
//               <li
//                 v-for="(item,index) in imgAry"
//                 :key="index"
//                 @click="remove(index)"
//               >
//                 <img
//                   :src="item"
//                   alt=""
//                   style="object-fit:cover"
//                 >

//               </li>
//               <li v-if="imgAry.length<9">
//                 <el-upload
//                   class="upload-demo Bask_homework_upload"
//                   action=""
//                   :file-list="fileList2"
//                   accept="image/png, image/jpeg, image/jpg,image/webp"
//                   :http-request="customUpload"
//                 >
//                   <span class="c3d fz34">+</span>
//                 </el-upload>
//               </li>
//             </ul>
//           </div>
</script>

<style lang="less">
.app-Bask-homework {
  min-height: 600px;
  .app-bask_homework-tab {
    & > .el-tabs__header.is-top {
      & > .el-tabs__nav-wrap.is-top {
        & > .el-tabs__nav-scroll {
          & > .el-tabs__nav.is-top {
            & > .el-tabs__item {
              width: 100px;
            }
          }
        }
      }
    }
    .el-tabs__active-bar {
      display: block !important;
      margin-left: 39.5%;
      // position: relative;
      // width: 0!important;
      border: none !important;
      background: transparent !important;
      z-index: 2;

      &:after {
        position: absolute;
        // width: 10px;
        background: rgba(196, 165, 127, 1);
        // height: 10px;
        border-radius: 50%;
        // background: red;
        left: 50%;
        top: 6px;
        margin-left: -10px;
        content: "";
        width: 20px !important;
        height: 20px !important;
        border: 5px solid white;
        box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
      }
    }
    .is-active::after {
      display: none !important;
      width: 0;
    }
    .el-tabs__item.is-top:nth-child(2) {
      padding-left: 0 !important;
    }
    .el-tabs__item.is-top:last-child {
      padding-right: 0 !important;
    }
    .el-tabs__nav-wrap:after {
      // opacity: 0.4;
      // background: radial-gradient(#eaeaea, #c4a57f, #eaeaea);
      background-color: transparent !important;
      background-size: contain !important;
      background: url(~assets/img/tabs_after.png) no-repeat;
    }
    .el-tabs__nav-wrap::after {
      bottom: 12px !important;
      position: absolute;
    }
  }
}
</style>

