<template>
  <article class="w1140 m-auto" style="background:white;height:100%;width:100%">
    <div class="w1140 m-auto">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        class="mt-40 dis_in_block"
        style="width:800px"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <div style="display:inline-block" to="{ path: '/Videosharing' }">免费视频及讲座</div> -->
        <el-breadcrumb-item :to="{ path: '/Videosharing' }">视频分享</el-breadcrumb-item>
        <span>
          <span class="cb19" style="font-size:16px">{{detailvideolist.courseName}}</span>
        </span>
      </el-breadcrumb>
    </div>

    <div class="w1000 m-auto">
      <!-- {{this.$store.state.Video.list}}                         -->
      <!-- <div class="fz18 cb19 mt-60">
                                        订单信息
      </div>-->
      <div class="Class_list-content FreeVideo-content" style="marginTop:38px">
        <p class="fz22 fonS">{{detailvideolist.courseName}}</p>
        <p class="fz12 c9 mt-15 mb-20 app-change-videoDetail-icon-line">
          <span style="margin-right:30px">{{formData(detailvideolist.publishTime)}}</span>
          <span style="margin-right:30px">
            <i class="el-icon-view" style="font-size: 16px;"></i>
            <label for class="iconNum">{{detailvideolist.clickVolume}}</label>
          </span>
          <span style="margin-right:30px">
            <!-- <img :src="require('@/assets/img/message_icon1.png')" alt="" style="width:14px;"> -->
            <i class="icon-message" style="font-size: 16px;"></i>
            <label for class="iconNum">{{detailvideolist.commentNum}}</label>
          </span>
          <span @click="couselink" style="cursor:pointer;margin-right:30px">
            <img
              class="app-star"
              style="width:14px;margin-bottom:-1px"
              :src="detailvideolist.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
              alt
              @click="couselink"
            >
            <label for>{{detailvideolist.likeNum||0}}</label>
          </span>

          <!-- <span @click="couselink" v-if="!detailvideolist.isLiked" style="cursor:pointer;">
            <i class="el-icon-star-off"></i>
            <label for>{{detailvideolist.likeNum||0}}</label>
          </span>
          <span v-if="detailvideolist.isLiked"  style="cursor:pointer;">
            <i class="el-icon-star-off" style="color:red"></i>
            <label for>{{detailvideolist.likeNum}}</label>
          </span>-->
        </p>
        <!-- 视频 -->
        <div class="videoContent">
          <!-- <video
            :src="detailvideolist.courseVideoUri"
            controls="controls"
          >your browser does not support the video tag</video>-->
          <!-- <video
            controls
            :poster="detailvideolist.coursePictureUri"
            v-lazy="detailvideolist.coursePictureUri"
          >
            <source :src="detailvideolist.courseVideoUri" :type="detailvideolist.courseVideoUri">
          </video>-->
          <!-- <video  controls="controls" :src="detailvideolist.courseVideoUri" :poster="detailvideolist.coursePictureUri"></video> -->
          <VideoPlay/>
        </div>
        <div class="flex w1000 mt-40 mb-65">
          <div class="fl videoContent-left" style="min-height:1000px">
            <div class="Course_introduction">
              <p class="fz18 cb19 mb-20" style="font-weight: bold;">视频简介</p>
              <p class="fz14 c8">{{detailvideolist.courseAbstract}}</p>
            </div>
            <div class="Comments" style="margin-bottom:180px">
              <!-- 第一个评论 -->
              <p class="fz18 cb19 mb-20" style="margin-bottom:-20px;font-weight: bold;">评论</p>

              <RichText
                ref="richText"
                :kinds="['emoji']"
                style="height:90px;font-size:14px;marginTop:-20px"
                :placeholder="'说说我的想法'"
              ></RichText>

              <p class="clear">
                <el-button
                  class="btn-Agreed fr btn-Reply"
                  @click="comment"
                  style="cursor:pointer;position:relative;letter-spacing:2px"
                >发表评论</el-button>
              </p>
              <ul>
                <!-- <p v-if="detailvideolist.commentList==null&&!this.listflag" style="color:#999999;textAlign:center;width:635px;marginTop:30px">暂时还没有评论,同学快去评论一个吧~~</p> -->
                <li v-for="(item) in commentlists" :key="item.courseDiscussionCommentId">
                  <label style="marginTop:30px" for>
                    <img v-lazy="item.discussHeadUri" alt>
                  </label>
                  <div style="marginTop:30px">
                    <span
                      class="fz16"
                      style="color:rgba(0,0,0,.7);font-weight: 600;margin-bottom: 5px;display: inline-block;"
                    >{{item.discussUser}}</span>
                    <div>
                      <time class="fz14 c8">{{computingTime(item.createTime)}}</time>
                      <span class="fz14 c8" style="float:right">
                        <span
                          style="cursor:pointer;"
                          :class="{fzxtj:svn==item.courseDiscussionCommentId&&svnflag}"
                          @click="ReplyFlag(item.courseDiscussionCommentId)"
                        >{{svn==item.courseDiscussionCommentId&&svnflag?"收起":"回复"}}({{item.courseDiscussionReplyResponseVos.length}})</span>
                        <span
                          class="app-star-line"
                          style="font-size: 12px;margin: 0 8px;font-weight: normal;"
                        >|</span>
                        <span style="cursor:pointer;" v-if="studentId!=item.discussUserId">
                          <img
                            class="app-star"
                            :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                            alt
                            @click="Give(item.courseDiscussionCommentId)"
                          >
                          <span>{{item.likeNum}}</span>
                        </span>
                        <span
                          v-else
                          style="cursor:pointer"
                          @click="removeComment(item.courseDiscussionCommentId)"
                        >删除</span>
                      </span>
                    </div>
                    <p
                      class="fz14 c4c49"
                      style="marginTop:-15px;width:534px;word-wrap:break-word;line-height:26px;opacity: 0.7;color: #000000;"
                      v-html="item.content"
                    ></p>
                    <!-- 回复评论 -->
                    <!-- <div class="Comments_area" v-if="svn==item.courseDiscussionId&&svnflag"> -->
                    <div class="Comments_area" style="marginTop:30px;">
                      <div
                        v-if="svn==item.courseDiscussionCommentId&&svnflag"
                        style="margin-bottom:33px"
                      >
                        <RichText
                          ref="richTexts"
                          :kinds="['emoji']"
                          style="height:90px;marginTop:-40px"
                          hasBorder="false"
                        ></RichText>
                        <p class="clear" style="margin-top:8px">
                          <el-button
                            class="btn-Agreed fr btn-Reply app-zwl-commentBtn"
                            style="position:relative;letter-spacing:2px"
                            @click="Replylitle(item.courseDiscussionCommentId,item.discussUser,0)"
                          >发表评论</el-button>
                        </p>
                      </div>
                      <ul>
                        <li
                          v-for="Reitem in item.courseDiscussionReplyResponseVos"
                          :key="Reitem.courseDiscussionCommentId"
                        >
                          <label for>
                            <img v-lazy="Reitem.discussHeadUri" style="width:45px;height:45px" alt>
                          </label>
                          <div class="news">
                            <span class="fz16 c030 newsname">
                              <span style="color:rgba(0,0,0,.7);font-weight: 600;">{{Reitem.discussUser}}</span>
                              <span style="opacity: 0.7;" class="fz14">回复</span>
                              <span style="color:rgba(0,0,0,.7);font-weight: 600;">{{Reitem.beReplyUser}}</span>
                            </span>
                            <div>
                              <time class="fz14 c8 newstime">{{computingTime(Reitem.createTime)}}</time>
                              <span class="fz14 c8 newshui" style="float:right;">
                                <span
                                  :class="{fzxtj:svnlitle==Reitem.courseDiscussionCommentId&&svnlitleflag}"
                                  @click="Replyit(Reitem.courseDiscussionCommentId)"
                                  style="cursor:pointer"
                                >
                                {{svnlitle==Reitem.courseDiscussionCommentId&&svnlitleflag?"收起":"回复"}}
                                <!-- 回复 -->
                                </span>
                                <span
                                  class="app-star-line"
                                  style="font-size: 12px;margin: 0 8px;font-weight: normal;"
                                >|</span>
                                <span v-if="studentId!=Reitem.discussUserId">
                                  <img
                                    class="app-star"
                                    style="cursor:pointer"
                                    :src="Reitem.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                                    alt
                                    @click="commentlitle(Reitem.courseDiscussionCommentId)"
                                  >
                                  <span>{{Reitem.likeNum}}</span>
                                </span>
                                <span v-else @click="removeReply(Reitem.courseDiscussionCommentId)" style="cursor:pointer">删除</span>
                              </span>
                              <p
                                style="marginTop:-15px;width:534px;word-wrap:break-word;line-height:26px;opacity: 0.7;color: #000000;padding-left:60px"
                                class="fz14"
                                v-html="Reitem.content"
                              ></p>
                            </div>
                            <!-- <p class="fz14 c4c49 " style="width:475px;word-wrap:break-word;" v-html="Reitem.content"></p> -->
                            <!-- <p style="height:20px;background:red"></p> -->
                            <!-- <br> -->
                            <!-- 回复评论的回复 -->
                            <div
                              v-if="svnlitle==Reitem.courseDiscussionCommentId&&svnlitleflag"
                              style="margin-bottom:33px;width:470px;float:right"
                            >
                              <RichText
                                class="wrap-app-son"
                                ref="richTexts"
                                :kinds="['emoji']"
                                style="height:90px;marginTop:-42px"
                                hasBorder="false"
                              ></RichText>
                              <p class="clear" style="margin-top:8px">
                                <el-button
                                  class="btn-Agreed fr btn-Reply app-zwl-commentBtn"
                                  style="position:relative;letter-spacing:2px"
                                  @click="Replylitle(item.courseDiscussionCommentId,Reitem.discussUser,0)"
                                >发表评论</el-button>
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <!-- <p
                        style="text-align:center"
                        @click="More(item.courseDiscussionId,0)"
                      >{{titleflag}}</p>-->
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="fr videoContent-right">
            <p class="fz18 cb19 mb-20 bold">
              相关课程
              <!-- <img
                class="Recommended_course-ico"
                :src="require('@/assets/img/Recommended_course-ico.png')"
                alt
              > -->
            </p>
            <ul class="Recommended_course">

              <li v-for="item in courseList" :key="item.courseId" @click="jumpCourseFree(item.courseId,item.discussionId)">
                <img :src="item.coursePictureUri" alt>
                <div style="padding-right:25px">
                  <span class="fz16 cf" :title="item.courseAbstract">{{item.courseAbstract}}</span>
                </div>
              </li>
              <!-- <li>
                <img :src="require('@/assets/img/Recommended_course2.png')" alt>
                <div>
                  <span class="fz16 cf">一起学习，一起玩耍...</span>
                </div>
              </li>
              <li>
                <img :src="require('@/assets/img/Recommended_course3.png')" alt>
                <div>
                  <span class="fz16 cf">ASK林曦 | 单身怎么破</span>
                </div>
              </li> -->
            </ul>
          </div>
        </div>
        <!--分页-->
        <div class="clear text-center mt-40">
          <Pagination
            :total="pagenum"
            :getList="getList"
            :pageSize="size"
            :currentPage="pages"
            top="700"
          />
          <!-- <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagenum"
            ></el-pagination>
          </div>-->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import RichText from "@/components/RichText"; //富文本
import { computingTime, formData } from "@/plugins/utils";
import VideoPlay from "@/components/videoPlay";
import Pagination from "@/components/Pagination";
export default {
  asyncData(app) {
    // console.log(2222, app.query.id, app.query.discussionId);
    if (app.query.discussionId) {
      app.store.commit("Video/changeDiscussionId", app.query.discussionId);
    }
    if (app.query.id) {
      app.store.commit("Video/changeID", app.query.id);
    }
    //获取详情
    app.$axios
      .post("/coursefree/detail", {
        token: "",
        courseFreeId: app.store.state.Video.id
      })
      .then(res => {
        if (res.code == 0) {
          app.$axios
            .post("utility/getUrl", { key: res.result.courseVideoUri })
            .then(data => {
              if (data.code == 0) {
                let list = res.result;
                list.courseVideoUri = [
                  {
                    name: "高清",
                    url: data.result.highUrl
                  },
                  {
                    name: "标清",
                    url: data.result.url
                  },
                  {
                    name: "流畅",
                    url: data.result.lowUrl
                  }
                ];
                app.store.commit("Video/changeList", list);
                let obj = {};
                obj.video = {};
                obj.video.defaultQuality = 1;
                obj.video.quality = [
                  {
                    name: "高清",
                    url: data.result.highUrl
                  },
                  {
                    name: "标清",
                    url: data.result.url
                  },
                  {
                    name: "流畅",
                    url: data.result.lowUrl
                  }
                ];
                obj.video.pic = res.result.coursePictureUri;
                console.log(obj, 99999);
                app.store.commit("videoPlay/changeVideo", obj);
              }
            });
          // this.changeList(res.result); //视频详情
        }
      });
  },
  data() {
    return {
      Replylists: [], //我的评论列表
      commentlists: [], //评论列表
      courseList:[],//相关课程列表
      listflag: false,
      pagenum: 0,
      pages: 1, //默认分页
      svn: null,
      svnflag: false, //评论开关
      svnlitle: null,
      svnlitleflag: false, //回复评论开关
      pageslitle: 1,
      size: 10,
      titleflag: "加载更多",
    };
  },
  components: {
    RichText,
    VideoPlay,
    Pagination
  },
  computed: {
    ...mapState({
      detailvideolist: state => state.Video.list, //当前list
      id: state => state.Video.id, //当前id
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      studentId: state => state.my.info.info.studentId //登录用户的id
    })
  },
  mounted() {
    //获取视频链接
    // this.getVideoUrl()

    this.getdata();
    this.getCourse()
  },

  methods: {
    ...mapMutations({
      changeList: "Video/changeList",
      changeCourseVideoUri: "Video/changeCourseVideoUri",
      changeparise: "Video/changeParise",
      changeparisenum: "Video/changeParisenum"
      // changeVideo:"videoPlay/changeVideo",
    }),
    formData,
    //获取视屏链接
    // getVideoUrl(){
    //   console.log(1111,this.detailvideolist)
    //   this.$axios.post("utility/getUrl",{key:this.detailvideolist.courseVideoUri}).then((res)=>{
    //     if(res.code==0){
    //       this.changeCourseVideoUri(res.result)
    //       this.options.url=res.result
    //     }
    //   })
    // },
    computingTime,
    //获取初始数据
    getdata(page) {
      let data = this.$axios
        .post("/coursediscussion/commentlist", {
          token: "",
          id: this.detailvideolist.discussionId,
          pageIndex: page || 1
        })
        .then(res => {
          if (res.code == 0) {
            this.pages = page || 1;
            console.log(res.result.courseDiscussionCommentResponseVos);
            this.commentlists = res.result.courseDiscussionCommentResponseVos;
            // this.mycommentlists = res.result.userCommentList
            // let pages = Math.ceil(res.result.total / res.result.size) + "0"; //分页个数
            // console.log(Number(pages));
            // if (Number(pages) <= 0) {
            //   this.pagenum = 10;
            // } else {
            //   this.pagenum = Number(pages);
            // }
            this.pagenum = res.result.total;
            this.size = res.result.size;
          }
        });
    },
    //获取数据
    getList(page) {
      this.$axios
        .post("/coursediscussion/commentlist", {
          token: "",
          id: this.detailvideolist.discussionId,
          pageIndex: page || 1
        })
        .then(res => {
          if (res.code == 0) {
            this.pages = page || 1;
            this.commentlists = res.result.courseDiscussionCommentResponseVos;
            this.pagenum = res.result.total;
            this.size = res.result.size;
          }
        });
    },

    //获取相关课程
    getCourse(){
      this.$axios.post("/coursefree/recommendlist",{pageIndex: 1}).then(res=>{
        if(res.code==0){
          this.courseList=res.result.courseFreeResponseVos
        }
      })
    },
    //跳转视频详情
    jumpCourseFree(id,discussionId){
      let routeData = this.$router.resolve({
         name:"VideoSharingDetails",
          query: {
            id:id,
            discussionId,
          }
      });
      window.open(routeData.href, "_blank");
    },
    //点赞
    Give(id) {
      let data = this.$axios
        .post("/coursediscussion/commentLike", {
          id: id,
          token: ""
        })
        .then(res => {
          this.getdata(this.pages);
          console.log(res);
        });
    },
    //发表评论
    comment() {
      // console.log(this.$refs.richText)
      let html = this.$refs.richText.getHtml();
       if (html == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      let picturesUrlList = this.$refs.richText.getImageUrl();
      let data = this.$axios
        .post("/coursediscussion/reply", {
          token: "",
          content: html,
          discussionId: this.detailvideolist.discussionId,
          replyId: 0
        })
        .then(res => {
          if (res.code == 0) {
            this.$refs.richText.clearHtml();
            this.$refs.richText.clearImgAry();
            this.getdata();
            this.$message({
              duration: 5000,
              message: this.$selfMsg.comment,
              type: "success"
            });
          }

          console.log(res);
        });
    },
    //回复评论列表
    ReplyFlag(id) {
      if (this.svn == id) {
        this.svnflag = false;
        this.svn = null;
      } else {
        this.svn = id;
        this.svnflag = true;
        this.svnlitleflag = false;
        this.svnlitle = null;
      }
    },
    //回复评论
    Replylitle(id, beReplyUser, idx) {
      let html = this.$refs.richTexts[idx].getHtml();

      console.log(html, "hhhhhhhhhhhh");
      let data = this.$axios
        .post("/coursediscussion/reply", {
          token: "",
          discussionId: this.detailvideolist.discussionId,
          replyId: id, //要回复谁
          content: html,
          beReplyUser: beReplyUser
        })
        .then(res => {
          if (res.code == 0) {
            console.log(res, "resres");
            this.getdata(this.pages);
          }
          // this.ReplyFlag(id)
          this.$refs.richTexts[idx].clearHtml();
        });
    },
    //回复点赞
    commentlitle(id) {
      this.$axios
        .post("/coursediscussion/replyLike", {
          token: "",
          id
        })
        .then(res => {
          this.getdata(this.pages);
        });
    },
    //回复他人
    Replyit(id) {
      if (this.svnlitle == id) {
        this.svnlitleflag = false;
        this.svnlitle = null;
      } else {
        this.svnlitle = id;
        this.svnlitleflag = true;
        this.svnflag = false;
        this.svn = null;
      }
    },
    //分页
    // handleCurrentChange(e) {
    //   this.pages = e;
    //   let data = this.$axios
    //     .post("/coursediscussion/list", {
    //       token: "",
    //       pageIndex: e,
    //       courseType: 0,
    //       courseId: this.id,
    //       sortType: "create_time"
    //     })
    //     .then(res => {
    //       this.commentlists = res.result.courseDiscussionResponseVos;
    //     });
    // },
    //课程点赞
    couselink() {
      let that = this;

      this.$axios
        .post("/coursefree/praise", {
          courseFreeId: this.$route.query.id,
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.$axios
              .post("/coursefree/detail", {
                token: "",
                courseFreeId: this.$route.query.id
              })
              .then(rescou => {
                // 详情
                if (rescou.code == 0) {
                  console.log(
                    rescou.result.likeNum,
                    "看好零零落落来来来零零落落零零落落来来来"
                  );
                  that.changeparise(true);
                  let likeNum = rescou.result.likeNum;
                  that.changeparisenum(likeNum);
                }
              });
          }
        });
    },
    //删除自己的评论
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
             this.getdata(this.pages);
          }
        });
    },
    //删除自己的回复
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
              message:this.$selfMsg.delete,
              type: "success"
            });
             this.getdata(this.pages);
          }
        });
    }
  }
};
</script>
<style lang="less">
//发表按钮
.app-zwl-commentBtn{
  letter-spacing: 1px!important;
    width: 100px!important;
    height: 30px!important;
    line-height: 33px!important;
    font-size: 16px!important;
    span{
          height: 30px!important;
          line-height: 30px!important;
    }

}
// 图标对齐
.app-change-videoDetail-icon-line {
  display: flex;
  align-items: center;
  & > span {
    display: flex;
    align-items: center;
    & > i,
    & > img {
      margin-right: 5px;
    }
  }
}
.wrap-app-son {
}
.page {
  margin-bottom: 80px;
  /**/
  /*Up-page*/
  /*Down-page */
}
.page .el-pager li.active {
  color: #fff;
  background: #c4a57f;
}
.page .el-pager li.active + li {
  border-left: 1px solid rgba(196, 165, 127, 0.3);
}
.page .el-pager li {
  border: 1px solid rgba(196, 165, 127, 0.3);
  color: #c4a57f;
  font-size: 14px;
  font-weight: normal;
  height: 34px;
  line-height: 34px;
  margin-right: 15px;
}
.page .el-pager li:last-child {
  margin-right: 0px;
}
.page .el-pagination button {
  border: 1px solid rgba(196, 165, 127, 0.3);
  color: #c4a57f;
  font-size: 14px;
  font-weight: normal;
  padding: 10px 12px;
  height: 34px;
}
.page .el-pager {
  margin: 0px 15px;
}
.page .el-pagination button:disabled {
  color: #c0c4cc !important;
}
.page .el-icon-arrow-left:before {
  content: "上一页";
}
.page .el-icon-arrow-right:before {
  content: "下一页";
}
</style>


<style lang="less" scoped>
.fzxtj {
  color: #c4a57f;
}
.news {
  position: relative;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  .newsname {
    position: absolute;
    top: -75px;
    left: 60px;
  }
  .newstime {
    position: absolute;
    top: -45px;
    left: 60px;
  }
  .newscont {
    position: absolute;
    top: -20px;
    left: 60px;
  }
  .newshui {
    position: absolute;
    right: 0;
    top: -55px;
  }
}
.isgive {
  color: red;
}
// .el-main {
//   background: white;
// }
/*免费视频*/
.Free_video {
  height: 827px;
  box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
}
.Free_videoList {
  width: 1000px;
  margin-top: 45px;
}

.Free_videoList li {
  height: 50px;
  line-height: 50px;
  font-size: 1rem;
  color: #999899;
  width: 101%;
  border-bottom: 1px solid #dcd6d1;
}
.Free_videoList li span {
  width: 33%;
  display: inline-block;
}
.Free_videoList li span:last-child {
  text-align: end;
}

.Free_videoList li span::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50px;
  background: #999899;
  margin-top: -3px;
  margin-right: 5px;
  vertical-align: middle;
}

.Free_videoList li span.active a {
  color: #097276;
}
.Free_videoList li span a:hover {
  color: #097276;
}
.Free_videoList li span.active::before {
  background: #097276;
}
/* 免费视频及讲座-列表详情 */
.FreeVideo-content {
  .videoContent-left {
    #wangeditor {
      margin-top: -20px !important;
    }
  }

  .app-editor-nullBorder {
    background: red;
  }
}

.FreeVideo-content .videoContent {
  width: 100%;
  height: 35.25rem;
}
.FreeVideo-content .videoContent video {
  width: 100%;
  height: 100%;
}
.FreeVideo-content .page {
  width: 660px;
  text-align: center;
}
.FreeVideo-content .videoContent-left {
  width: 660px;
  border-right: 1px solid rgba(196, 165, 127, 0.2);
  padding-right: 24px;
  margin-right: 23px;
}
.FreeVideo-content .videoContent-left .Course_introduction > p.fz14.c8 {
  line-height: 25px;
  padding-bottom: 33px;
  padding-right: 11px;
  border-bottom: 1px solid rgba(196, 165, 127, 0.2);
  margin-bottom: 36px;
}
.FreeVideo-content .videoContent-left .Comments {
  /* 留言评论区 */
}
.FreeVideo-content .videoContent-left .Comments > textarea {
  width: -webkit-fill-available;
  height: 100px;
  background: rgba(249, 249, 249, 0.05);
  border-radius: 3px;
  border: 1px solid #e5dcd0;
  padding: 16px;
  outline: none;
  resize: none;
  font-size: 14px;
}
.FreeVideo-content .videoContent-left .Comments > textarea::placeholder {
  font-size: 14px;
  color: #999;
}
.FreeVideo-content .videoContent-left .Comments p.clear {
  width: 100%;
  margin-top: 16px;
  display: inline-block;
  vertical-align: middle;
}
.FreeVideo-content .videoContent-left .Comments p.clear span {
  height: 40px;
  line-height: 40px;
}
.FreeVideo-content .videoContent-left .Comments > ul {
  margin-top: 34px;
  float: left;
}
.FreeVideo-content .videoContent-left .Comments > ul li {
  float: left;
}
.FreeVideo-content .videoContent-left .Comments > ul li label {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  float: left;
  margin-right: 25px;
}
.FreeVideo-content .videoContent-left .Comments > ul li label img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.FreeVideo-content .videoContent-left .Comments > ul li > div {
  padding-bottom: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid rgba(196, 165, 127, 0.2);
  width: 531px;
  padding-left: 0px;
  float: left;
  /*评论内容*/
  /* 评论区-填写 */
}
.FreeVideo-content .videoContent-left .Comments ul li:last-child {
  div {
    border-bottom: none;
  }
  // background:red;
}
.FreeVideo-content .videoContent-left .Comments > ul li > div > span + div {
  margin-top: 5px;
  margin-bottom: 26px;
}
.FreeVideo-content
  .videoContent-left
  .Comments
  > ul
  li
  > div
  .Comments_area
  textarea {
  width: -webkit-fill-available;
  height: 74px;
  background: #fbfaf8;
  border-radius: 3px;
  border: 1px solid #fbfaf8;
  padding: 16px;
  font-size: 14px;
  outline: none;
  resize: none;
  margin-top: 14px;
}
.FreeVideo-content
  .videoContent-left
  .Comments
  > ul
  li
  > div
  .Comments_area
  .btn-Agreed:disabled {
  background: rgba(180, 152, 118, 0.5);
}
.btn-Reply:hover {
  background: #d9cbba;
}
.btn-Reply {
  width: 140px;
  height: 40px;
  background: rgba(180, 152, 118, 0.9);
  border-radius: 2px;
  color: #fff;
  border: 0px;
  font-size: 21px;
  line-height: 40px;
  padding: 0px;
}
// .FreeVideo-content
//   .videoContent-left
//   .Comments
//   > ul
//   li
//   > div
//   .Comments_area
//   .btn-Agreed:hover{
//     background:red !important;
//   }
.FreeVideo-content .videoContent-right .Recommended_course-ico {
  position: relative;
  top: 2px;
}
.FreeVideo-content .videoContent-right .Recommended_course li {
  cursor:pointer;
  position: relative;
  width: 317px;
  height: 179px;
  overflow: hidden;
  margin-bottom: 26px;
}
.FreeVideo-content .videoContent-right .Recommended_course li > img {
  width: 100%;
  height: 100%;
}
.FreeVideo-content .videoContent-right .Recommended_course li > div {
  position: absolute;
  width: 100%;
  height: 44px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.6);
}
.FreeVideo-content .videoContent-right .Recommended_course li > div > span {
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  padding-left: 25px;
  line-height: 44px;
}
.lectures-content::after {
  content: url(~assets/img/lectures.png);
  width: 100%;
  margin: 0px auto;
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pos_r {
  width: 100%;
  clear: both;
  height: auto;
  float: left;
}
.pos_r span.pos_a {
  bottom: 10px;
  left: 390px;
}
.pos_r ul {
  width: 380px;
  margin-top: 14px;
  clear: both;
}
.pos_r ul li {
  width: 120px;
  height: 120px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}
.pos_r ul li > img {
  width: 100%;
  height: 100%;
}
.pos_r ul li:nth-child(3n) {
  margin-right: 0px;
}
</style>
