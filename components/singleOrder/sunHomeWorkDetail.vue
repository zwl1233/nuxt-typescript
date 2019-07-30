<template>
  <div
    class="Bask_homework m-auto app-change-Bask_homework app-safari-margin"
    style="padding-bottom:150px;margin-top:29px!important"
  >
    <ul class="Homework-ulList">
      <li style="width:100%">
        <label for>
          <img :src="list.discussHeadUri" alt>
        </label>
        <div>
          <span class="fz16 c30">
            <span style="margin-right:21px;color:rgba(0,0,0,.9)">{{list.discussUser}}</span>
            <time class="fz14 c6" style="color:rgba(0,0,0,.9)">
              发表于
              <span class="fz12">{{computingTime(list.createTime)}}</span>
            </time>
          </span>
          <div class="fr app-change-more">
            <div
              class="app-change-more-box"
              @click="privateLetter(list)"
              v-if="list.discussUserId!=studentId"
            >
              <!-- <img :src="require('@/assets/img/sixin.png')" alt> -->
              私信
            </div>
            <div
              class="app-change-more-box"
              v-if="list.discussUserId==studentId"
              @click="removeTask(list.courseDiscussionId)"
            >
              <!-- <i class="el-icon-delete"></i> -->
              删除
            </div>
            <i class="el-icon-more"></i>
          </div>
          <!-- <span
            style="float:right"
            @click="privateLetter(list)"
            v-if="list.discussUserId!=studentId"
          >私信</span>-->
          <!-- <span
            style="float:right"
            @click="removeTask(list.courseDiscussionId)"
            v-if="list.discussUserId==studentId"
          >删除</span>-->
          <div class="mt-5 app-clear" style="margin-top:16px!important">
            <img
              class="middle fl mt-5"
              :src="require('@/assets/img/Placed_top.png')"
              alt
              style="margin-right:5px"
            >
            <span class="fz13 c4c49 app-change-content-text" v-html="list.content"></span>
            <div class="pos_r">
              <ul class="app-clear">
                <li v-for="(item,index) in list.courseDiscussionPictures" :key="index">
                  <img
                    :src="item.discussionThumbUri"
                    class="thumbImg"
                    alt
                    @click="lookImg(list.courseDiscussionPictures,index,'discussionPictureUri')"
                  >
                </li>
              </ul>
              <!-- <span
                class="pos_a fz12 c30"
                style="color:rgba(0, 0, 0, .6)"
                v-if="list.courseDiscussionPictures.length>0"
              >共{{list.courseDiscussionPictures.length}}张</span>-->
              <p
                class="app-change-pic-num"
                v-if="list.courseDiscussionPictures.length>0"
              >共{{list.courseDiscussionPictures.length}}张</p>
            </div>
          </div>

          <div class="mt-10" style="margin-top:0!important">
            <time class="fz14 c9">浏览量 {{list.clickNum}}</time>
            <span class="fr fz14 c9 wdb100">
              <span>
                <i class="icon-message"></i>
                <span>{{list.discussionNum}}</span>
              </span>
              <span class="app-star-line">|</span>
              <span>
                <!-- <i
                  class="el-icon-star-on cb49"
                  v-if="!list.isLiked"
                  @click="fabulous"
                  style="cursor:pointer"
                ></i>
                <i class="el-icon-star-on cb49" style="color:red" v-if="list.isLiked"></i>-->
                <img
                  class="app-star"
                  :src="list.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                  alt
                  @click="fabulous"
                >
                <span>{{list.likeNum}}</span>
              </span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <!--发表评论-->
    <p class="fz14 c30 mt-10">说说你的想法吧</p>
    <div class="mt-24 app-change-richText-mt50">
      <!-- <textarea name id></textarea> -->
      <RichText :kinds="['emoji']" ref="richText"></RichText>
      <div class="mt-15" style="margin-top:-16px;position:relative">
        <input
          type="button"
          class="fr btn-Bask_homework outline"
          value="发表评论"
          style="cursor:pointer;outline:none"
          @click="comment"
        >
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        <!-- <span class="fz12 c3">
          <i class="el-icon-picture cb19 fz16"></i> 表情
        </span>
        <span class="fz12 c3">
          <i class="el-icon-picture cb19 fz16"></i> 图片
        </span>-->
        <!-- <div class="upload__tip">
                                                    <div class="upload__tipTitle">
                                                        <p>
                                                            <span class="fz14 c3">本地上传</span>
                                                            <span class="fr cb49">×</span>
                                                        </p>
                                                        <p class="fz12 c30 mt-15 mb-15">
                                                            共4张，还能上传5张
                                                        </p>
                                                    </div>
                                                    <ul>
                                                        <li>
                                                            <img :src="require('@assets/img/MyHomework1.png" alt="">
                                                        </li>
                                                        <li>
                                                            <img :src="require('@assets/img/MyHomework1.png" alt="">
                                                        </li>
                                                        <li>
                                                            <img :src="require('@assets/img/MyHomework2.png" alt="">
    
                                                        </li>
                                                        <li>
                                                            <img :src="require('@assets/img/MyHomework3.png" alt="">
    
                                                        </li>
                                                        <li>
                                                            <img :src="require('@assets/img/MyHomework4.png" alt="">
    
                                                        </li>
                                                        <li>
                                                            <el-upload class="upload-demo Bask_homework_upload" action="https://jsonplaceholder.typicode.com/posts/"
                                                                :on-preview="handlePreview" :on-remove="handleRemove"
                                                                :file-list="fileList2" list-type="picture">
    
                                                                <span class="c3d fz34">+</span>
    
                                                            </el-upload>
                                                        </li>
                                                    </ul>
    
        </div>-->
      </div>
    </div>
    <!-- 评论回复列表 -->
    <div class="mt-90">
      <ul class="Homework-ulList">
        <li v-for="(item,index) in commentList" :key="index">
          <label for>
            <img :src="item.discussHeadUri" alt>
          </label>
          <div>
            <span class="fz16 c30" style="color:rgba(0,0,0,.9)">
              {{item.discussUser}}
              <time
                class="fz14 c6"
                style="color:rgba(0,0,0,.6);margin-left:19px"
              >
                发表于
                <span class="fz12">{{computingTime(item.createTime)}}</span>
              </time>
            </span>
            <!-- <span
              style="float:right; cursor:pointer"
              @click="privateLetter(item)"
              v-if="item.discussUserId!=studentId"
            >私信</span>
            <span
              style="float:right; cursor:pointer"
              @click="removeComment(item.courseDiscussionCommentId)"
              v-if="item.discussUserId==studentId"
            >删除</span>-->
            <div class="fr app-change-more">
              <div
                class="app-change-more-box"
                @click="privateLetter(item)"
                v-if="item.discussUserId!=studentId"
              >
                <!-- <img :src="require('@/assets/img/sixin.png')" alt> -->
                私信
              </div>
              <div
                class="app-change-more-box"
                @click="removeComment(item.courseDiscussionCommentId)"
                v-if="item.discussUserId==studentId"
              >
                <!-- <i class="el-icon-delete"></i> -->
                删除
              </div>
              <i class="el-icon-more"></i>
            </div>
            <div class="mt-5" style="margin-top:16px!important">
              <span class="fz13 c4c49 app-change-content-text" v-html="item.content"></span>
            </div>
            <div class="mt-10" style="margin-top:0!important">
              <!-- <time class="fz14 c9">浏览量 1290</time> -->
              <span class="fr fz14 c9 wdb100">
                <span>
                  <a
                    href="javascript:;"
                    @click="openComment(item.courseDiscussionCommentId)"
                    :class="[item.replyFlag?'xtjing':'c9']"
                  >{{item.replyFlag?"收起":"回复"}}({{item.replyNum}})</a>
                </span>
                <span class="app-star-line">|</span>
                <span>
                  <img
                    class="app-star"
                    :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                    alt
                    @click="PostFabulous(item.courseDiscussionCommentId)"
                  >
                  <span>{{item.likeNum}}</span>
                </span>
              </span>
            </div>
            <!-- 三级回复 -->
            <div id="showHomework" v-if="item.replyFlag">
              <RichText
                style="margin-top:-50px"
                :kinds="['emoji']"
                hasBorder="false"
                :placeholder="'回复：'+item.discussUser"
                :ref="`richText${item.courseDiscussionCommentId}`"
              ></RichText>
              <div class="text-right" style="position:relative;margin-top:-20px">
                <input
                  type="button"
                  class="btn-grayComment"
                  value="发表评论"
                  @click="replyComment(item.courseDiscussionCommentId,item.discussUser,item.courseDiscussionCommentId)"
                >
              </div>
              <!-- <textarea name id placeholder="回复沫沫："></textarea> -->
              <!-- <div class="text-right">
                <input type="button" class="btn-grayComment" value="发表评论">
              </div>-->
              <div class="showHomework-content app-reply-homework-list app-clear">
                <ul>
                  <li
                    v-for="(ite,index) in item.courseDiscussionReplyResponseVos"
                    :key="index"
                    class="app-clear"
                  >
                    <div class="app-clear">
                      <img :src="ite.discussHeadUri" alt>
                      <div style="font-size:14px">
                        <p
                          style="width:480px"
                          class="dis_in_block app-change-content-text"
                          v-html="initHtml(ite.content,ite.discussUser,ite.beReplyUser)"
                        >
                          <!-- <span class="fz14 cb49">
                            {{ite.discussUser}}:
                            <span style="color:#000">回复 {{ite.beReplyUser}}:</span>
                          </span>-->
                          <!-- <span class="fz14 c30" v-html="ite.content"></span> -->
                          <!-- <span
                            v-html="ite.content"
                            class="fz14 c30"
                            style="display:inline-block;margin-left:0"
                          ></span>-->
                        </p>
                        <div class="fr app-change-more">
                          <div
                            class="app-change-more-box"
                            @click="privateLetter(ite)"
                            v-if="ite.discussUserId!=studentId"
                          >
                            <!-- <img :src="require('@/assets/img/sixin.png')" alt> -->
                            私信
                          </div>
                          <div
                            class="app-change-more-box"
                            @click="removeReply(ite.courseDiscussionCommentId)"
                            v-if="ite.discussUserId==studentId"
                          >
                            <!-- <i class="el-icon-delete"></i> -->
                            删除
                          </div>
                          <i class="el-icon-more"></i>
                        </div>
                      </div>
                    </div>
                    <p class="app-clear mt-20" style="padding-left:40px;box-sizing:border-box">
                      <time class="c9 fz14 fl">{{computingTime(ite.createTime)}}</time>
                      <!-- <span
                        class="fz14 fr"
                        style=" cursor:pointer"
                        v-if="item.discussUserId!=studentId"
                        @click="privateLetter(ite)"
                      >私信</span>
                      <span
                        class="fz14 fr"
                        style="cursor:pointer"
                        @click="removeReply(ite.courseDiscussionCommentId)"
                        v-if="item.discussUserId==studentId"
                      >删除</span>-->

                      <span class="fr fz14 c9 wdb100">
                        <span>
                          <a
                            href="javascript:;"
                            :class="[ite.replyFlag?'xtjing':'c9','fz14', 'c30']"
                            @click="ite.replyFlag=!ite.replyFlag"
                          >{{ite.replyFlag?"收起":"回复"}}</a>
                        </span>
                        <span class="app-star-line">|</span>
                        <span>
                          <img
                            class="app-star"
                            :src="ite.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                            alt
                            @click="replyLike(ite.courseDiscussionCommentId)"
                          >
                          <span>{{ite.likeNum}}</span>
                        </span>
                      </span>
                    </p>
                    <div v-if="ite.replyFlag" style="margin-top:20px;line-height: normal">
                      <RichText
                        :kinds="['emoji']"
                        :placeholder="'回复：'+ite.discussUser"
                        :ref="`richText${ite.courseDiscussionCommentId}`"
                      ></RichText>
                      <div class="text-right" style="position:relative;margin-top:-20px">
                        <input
                          type="button"
                          class="btn-grayComment"
                          value="发表评论"
                          @click="replyComment(item.courseDiscussionCommentId,ite.discussUser,ite.courseDiscussionCommentId)"
                        >
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ViewImg
      v-if="viewFlag"
      :visible="viewFlag"
      :list="ViewImgList"
      :index="viewIndex"
      :close="viewClose"
      :field="field"
    />
    <div
      class="m-auto afters"
      style="clear:both;text-align:center"
      @click="timer"
      v-if="flag&&tit=='加载更多'"
    >{{tit}}</div>
    <div class="m-auto afters" style="clear:both;text-align:center" v-if="flag&&tit!='加载更多'">{{tit}}</div>
    <ScrollBottom @timer="timer" ref="mychild"/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { formData } from "@/plugins/utils";
import RichText from "@/components/RichText";
import { computingTime } from "@/plugins/utils";
import ViewImg from "@/components/viewImg"; //查看大图
export default {
  created() {
    console.log("帖子详情");
    this.getPostDetail();
    //讨论
    this.getCommentList();
    console.log;
  },
  props: ["getPost"],
  data() {
    return {
      replyFlag: false, //回复框
      list: { courseDiscussionPictures: [] }, //帖子详情
      commentList: [], //讨论帖子
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "", //所取的字段
      openFlag: [], //请求前成打开状态的回复列表
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null,
      pageindex: 1
    };
  },
  computed: {
    ...mapState({
      postId: state => state.singleOrder.homework.postId, //帖子id
      userstoken: state => state.system.token, //用户token
      studentId: state => state.my.info.info.studentId, //学员id
      courseId: state => state.singleOrder.courseId,
      page: state => state.my.page
    })
  },
  methods: {
    ...mapMutations({
      changeTabId: "my/changeTabId", //改变tabId
      changeindex: "my/changeindex", //改变change
      chanaddtext: "my/chanaddtext",
      Loginpage: "login/Loginpage", //弹出登录框
      changePostFlag: "singleOrder/homework/changePostFlag" //改变帖子详情的状态
    }),
    //私信他
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
    //获取帖子详情
    getPostDetail() {
      this.$axios
        .post("/coursediscussion/detail", {
          token: "",
          id: this.postId
        })
        .then(res => {
          if (res.code == 0) {
            this.list = res.result;
            console.log(res.result);
          }
        });
    },
    //获取评论列表
    getCommentList() {
      this.$axios
        .post("/coursediscussion/commentlist", {
          token: "",
          id: this.postId,
          pageIndex: 1
        })
        .then(res => {
          if (res.code == 0) {
            res.result.courseDiscussionCommentResponseVos.forEach(item => {
              item.replyFlag = false; //回复状态是否打开
              if (this.openFlag.includes(item.courseDiscussionCommentId)) {
                item.replyFlag = true;
              }
              item.courseDiscussionReplyResponseVos.forEach(ite => {
                ite.replyFlag = false; //输入框显示
              });
            });
            this.commentList = res.result.courseDiscussionCommentResponseVos;
          }
        });
    },
    timer(fn) {
      if (this.tit == "目前没有更多数据") {
        return;
      }
      let that = this;
      fn = null; //关闭滚动条
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.pageindex++;
        that.getListadd();
      }, 1000);
    },
    getListadd() {
      clearInterval(this.Timingopen);
      this.$axios
        .post("/coursediscussion/commentlist", {
          token: "",
          id: this.postId,
          pageIndex: this.pageindex
        })
        .then(res => {
          if (res.code == 0) {
            res.result.courseDiscussionCommentResponseVos.forEach(item => {
              console.log(item);
              item.replyFlag = false; //回复状态是否打开
              if (this.openFlag.includes(item.courseDiscussionCommentId)) {
                item.replyFlag = true;
              }
              item.courseDiscussionReplyResponseVos.forEach(ite => {
                ite.replyFlag = false; //输入框显示
              });
            });

            let newarr = res.result.courseDiscussionCommentResponseVos;
            if (newarr.length == 0) {
              this.tit = "目前没有更多数据";
              this.$refs.mychild.gets();
            } else {
              newarr.forEach(item => {
                this.commentList.push(item);
              });
              this.$refs.mychild.get();
            }

            // this.commentList = res.result.courseDiscussionCommentResponseVos;
          }
        });
    },
    //评论
    comment() {
      let html = this.$refs.richText.getHtml();
       if (html == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      let picture = this.$refs.richText.getImageUrl();
      this.$axios
        .post("/coursediscussion/reply", {
          token: "",
          content: html,
          discussionId: this.postId,
          replyId: 0
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.comment,
              type: "success"
            });
            this.$refs.richText.clearHtml();
            this.$refs.richText.clearImgAry();
            this.getCommentList();
            this.$message({
              duration: 5000,
              message: this.$selfMsg.comment,
              type: "success"
            });
          }
        });
    },
    // //回复他人回复
    // replyPost(id) {
    //   let html = this.$refs.richText.getHtml();
    
    //   let picture = this.$refs.richText.getImageUrl();
    //   this.$axios
    //     .post("/coursediscussion/reply", {
    //       token: "",
    //       content: html,
    //       discussionId: this.postId,
    //       replyId: id
    //     })
    //     .then(res => {
    //       if (res.code == 0) {
    //         this.$message({
    //           duration: 2000,
    //           message: "回复成功",
    //           type: "success"
    //         });
    //         this.$refs.richText.clearHtml();
    //         this.$refs.richText.clearImgAry();
    //         this.getCommentList();
    //       }
    //     });
    // },
    //回复评论
    replyComment(id, discussUser, refId) {
      // console.log(this)
      // console.log(this.$refs[`text${id}`][0].$refs.textarea.value)
      // console.log(id);
      // let content=this.$refs[`text${id}`][0].$refs.textarea.value
      let content = this.$refs[`richText${refId}`][0].getHtml();
      console.log(this);
      console.log(this.$refs["richText" + refId][0].getHtml());

      this.$axios
        .post("/coursediscussion/reply", {
          token: "",
          content,
          discussionId: this.postId,
          replyId: id,
          beReplyUser: discussUser //它人昵称
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.ReplySucess,
              type: "success"
            });
            this.$refs[`richText${id}`][0].clearHtml();
            console.log(res);
            this.$message({
              duration: 5000,
              message: this.$selfMsg.ReplySucess,
              type: "success"
            });
            this.getCommentList();
          }
          // this.$refs[`text${id}`][0].$refs.textarea.value=""
        });
    },
    //点赞
    fabulous() {
      this.$axios
        .post("/coursediscussion/praise", {
          token: "",
          id: this.postId
        })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.clickSucess,
              type: "success"
            });
            this.getPostDetail();
          }
        });
    },
    //评论点赞
    PostFabulous(id) {
      this.$axios
        .post("/coursediscussion/commentLike", {
          token: "",
          id
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.clickSucess,
              type: "success"
            });
            this.commentList.forEach(item => {
              if (item.courseDiscussionCommentId == id) {
                item.isLiked = true;
                item.likeNum++;
              }
            });
            // this.getCommentList();
          }
        });
    },
    formData,
    computingTime,
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
            this.changePostFlag(false);
            this.getPost();
            this.$router.push({
              name: "singleOrder",
              query: { courseId: this.courseId }
            });
          }
        });
    },
    //删除评论
    removeComment(id) {
      this.$axios
        .post("/userhomeworksun/delDiscussionComment", {
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
            this.getCommentList();
          }
        });
    },
    //删除回复
    removeReply(id) {
      this.$axios
        .post("/userhomeworksun/delDiscussionReply", {
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
            this.getCommentList();
          }
        });
    },
    //处理html
    initHtml(html, discussUser, beReplyUser) {
      //发送人:discussUser
      //被回复人:beReplyUser
      // <p>是的黄金时间多少</p>
      let str = html;
      if (str) {
        let str1 = `<span class="fz14 cb49">${discussUser}:<span style="color:#000">回复 ${beReplyUser}:</span></span>`;
        str = str.slice(3); //去除开头的p
        str = str1 + str;
        str = "<p>" + str;
      }

      return str;
    },
    //回复点赞
    replyLike(id) {
      this.$axios
        .post("/coursediscussion/replyLike", { token: "", id })
        .then(res => {
          if (res.code == 0) {
            if (res.code == 0) {
              this.commentList.forEach(item => {
                item.courseDiscussionReplyResponseVos.forEach(items => {
                  if (items.courseDiscussionCommentId == id) {
                    items.isLiked = true;
                    items.likeNum++;
                  }
                });
              });
              // this.getCommentList();
              this.$message({
                duration: 5000,
                message: this.$selfMsg.clickSucess,
                type: "success"
              });
            }
          }
        });
    },
    //打开评论列表
    openComment(id) {
      this.commentList.map(item => {
        if (item.courseDiscussionCommentId == id) {
          item.replyFlag = !item.replyFlag;
          if (item.replyFlag) {
            //true  显示
            this.openFlag.push(item.courseDiscussionCommentId);
            //去重
            this.openFlag = [...new Set(this.openFlag)];
          } else {
            //隐藏
            this.openFlag = this.openFlag.filter(ite => {
              return ite != id;
            });
          }
          console.log(this.openFlag, "回复数组");
        }
      });
    }
  },
  components: {
    RichText,
    ViewImg,
    ScrollBottom
  }
};
</script>

<style lang="less">
.app-change-Bask_homework {
  #showHomework {
    // overflow: hidden;
    height: auto;
    box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
    border-radius: 3px;
  }
  .app-reply-homework-list {
    & > ul > li > div {
      min-height: 30px;
    }
  }
}
</style> 


