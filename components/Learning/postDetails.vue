
<template>
<!-- 弃用 -->
  <div class="Bask_homework">
    <ul class="Homework-ulList">
      <li>
        <label for>
          <img :src="list.discussHeadUri" alt>
        </label>
        <div>
          <span class="fz16 c30">
            <span style="marginRight:20px">{{list.discussUser}}</span>
            <time class="fz14 c6">发表于 {{computingTime(list.createTime)}}</time>
          </span>
          <span
            style="float:right"
            @click="privateLetter(list)"
            v-if="list.discussUserId!=studentId"
          >私信</span>
          <span
            style="float:right"
            @click="removeTask(list.courseDiscussionId)"
            v-if="list.discussUserId==studentId"
          >删除</span>
          <div class="mt-5">
            <img
              class="middle fl"
              :src="require('@/assets/img/Placed_top.png')"
              alt
              style="margin-right:5px"
            >
            <span class="fz14 c4c49" v-html="list.content"></span>
            <div class="pos_r">
              <ul>
                <li v-for="(item,index) in list.courseDiscussionPictures" :key="index">
                  <img
                    :src="item.discussionThumbUri"
                    class="thumbImg"
                    alt
                    @click="lookImg(list.courseDiscussionPictures,index,'discussionPictureUri')"
                  >
                </li>
              </ul>
              <span
                class="pos_a fz12 c30"
                v-if="list.courseDiscussionPictures.length>0"
              >共{{list.courseDiscussionPictures.length}}张</span>
            </div>
          </div>

          <div class="mt-10">
            <time class="fz14 c9">浏览量 {{list.clickNum}}</time>
            <span class="fr fz14 c9 wdb100">
              <span>
                <i class="el-icon-edit"></i>
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
    <p class="fz14 c30">发表评论</p>
    <div class="mt-24">
      <!-- <textarea
                  name=""
                  id=""
      ></textarea>-->
      <RichText :kinds="['emoji']" ref="richText"></RichText>

      <div class="mt-15" style="margin-top:-30px;position:relative">
        <input
          type="button"
          class="fr btn-Bask_homework"
          value="发表"
          style="cursor:pointer"
          @click="comment"
        >
      </div>
    </div>
    <div class="mt-90">
      <ul class="Homework-ulList">
        <li v-for="(item) in commentList" :key="item.discussUserId">
          <label for>
            <img :src="item.discussHeadUri" alt>
          </label>
          <div>
            <span class="fz16 c30">
              {{item.discussUser}}
              <time class="fz14 c6">发表于 {{computingTime(item.createTime)}}</time>
            </span>
            <span style="float:right; cursor:pointer" @click="privateLetter(item)" v-if="item.discussUserId!=studentId">私信</span>
            <span style="float:right; cursor:pointer" @click="removeComment(item.courseDiscussionCommentId)" v-if="item.discussUserId==studentId">删除</span>
            <div class="mt-5">
              <span class="fz14 c4c49" v-html="item.content"></span>
            </div>
            <div class="mt-10">
              <!-- <time class="fz14 c9">浏览量 1290</time> -->
              <span class="fr fz14 c9 wdb100">
                <span>
                  <a href="##" @click="item.replyFlag=!item.replyFlag">回复</a>
                </span>
                <span class="app-star-line">|</span>

                <span>
                  <!-- <i
                    class="el-icon-star-on cb49"
                    v-if="!item.isLiked"
                    style="cursor:pointer"
                    
                  ></i>
                  <i class="el-icon-star-on cb49" style="color:red" v-if="item.isLiked"></i>-->
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
            <div id="showHomework" v-show="item.replyFlag">
              <!-- <textarea name id :placeholder="'回复：'+item.discussUser"></textarea> -->
              <!-- <el-input type="textarea" :placeholder="'回复：'+item.discussUser" :rows="3" :ref="'text'+item.courseDiscussionCommentId"></el-input> -->
              <RichText
                :kinds="['emoji']"
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
            </div>
            <div class="showHomework-content">
              <ul>
                <li v-for="(ite) in item.courseDiscussionReplyResponseVos" :key="ite.courseDiscussionCommentId">
                  <div class="app-howHomework-content">
                    <!-- :src="ite.discussHeadUri" -->
                    <label for>
                      <img :src="ite.discussHeadUri" alt>
                    </label>

                    <div class="app-howHomework-content-text">
                      <p class="dis_in_block">
                        <span class="fz14 cb49">{{ite.discussUser}}： 回复{{ite.beReplyUser}}</span>
                        <span class="fz14 c30" v-html="ite.content"></span>
                      </p>
                      <span class="fr">
                        <span style="cursor:pointer" v-if="item.discussUserId!=studentId" @click="privateLetter(ite)">私信</span>
                        <span style="float:right; cursor:pointer" @click="removeReply(ite.courseDiscussionCommentId)" v-if="item.discussUserId==studentId">删除</span>
                        <time class="c9 fz14">{{computingTime(ite.createTime)}}</time>
                        <span
                          style="cursor:pointer"
                          class="fz14 c30"
                          @click="ite.replyFlag=!ite.replyFlag"
                        >回复</span>
                      </span>
                      <div id="showHomework" v-show="ite.replyFlag">
                        <!-- <textarea name id :placeholder="'回复：'+ite.discussUser"></textarea> -->
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
                    </div>
                  </div>
                </li>
              </ul>
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
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
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
  props:['getPost'],
  data() {
    return {
      replyFlag: false, //回复框
      list: { courseDiscussionPictures: [] }, //帖子详情
      commentList: [], //讨论帖子
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  computed: {
    ...mapState({
      postId: state => state.Learning.homework.postId, //帖子id
      userstoken: state => state.system.token, //用户token
      studentId: state => state.my.info.info.studentId, //学员id
      courseId:state=>state.Learning.courseId,
    })
  },
  methods: {
    ...mapMutations({
      changeTabId: "my/changeTabId", //改变tabId
      chanaddtext: "my/chanaddtext",
      Loginpage: "login/Loginpage" ,//弹出登录框
      changePostFlag:'Learning/homework/changePostFlag',//改变帖子详情的状态
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
              item.replyFlag = false;
              item.courseDiscussionReplyResponseVos.forEach(ite => {
                ite.replyFlag = false;
              });
            });
            this.commentList = res.result.courseDiscussionCommentResponseVos;
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
            this.$refs.richText.clearHtml();
            this.$refs.richText.clearImgAry();
            this.getCommentList();
          }
        });
    },
    //回复他人回复
    replyPost(id) {
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
          replyId: id
        })
        .then(res => {
          if (res.code == 0) {
            
            this.$refs.richText.clearHtml();
            this.$refs.richText.clearImgAry();
            this.getCommentList();
          }
        });
    },
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
            //  this.$refs.richText.clearHtml();
            this.$refs[`richText${id}`][0].clearHtml();
            console.log(res);
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
            this.getCommentList();
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
            this.changePostFlag(false)
            this.getPost()
            this.$router.push({name:'Learning',query:{courseId:this.courseId}})
          }
        });
    },
    //删除评论
    removeComment(id){
      this.$axios.post('/userhomeworksun/delDiscussionComment',{homeworkFinishId:id,token:""}).then((res)=>{
        if(res.code==0){
          this.$message({
              duration: 5000,
              message: this.$selfMsg.delete,
              type: "success"
            });
        this.getCommentList()
        }

      })

    },
    //删除回复
    removeReply(id){
      this.$axios.post('/userhomeworksun/delDiscussionReply',{homeworkFinishId:id,token:""}).then((res)=>{
        if(res.code==0){
          this.$message({
              duration: 5000,
              message: this.$selfMsg.delete,
              type: "success"
            });
        this.getCommentList()
        }

      })


    }
  },
  components: {
    RichText,
    ViewImg
  }
};
</script>
<style lang="less">
.Bask_homework {
  .app-howHomework-content {
    margin: 30px 0;
    display: flex;
    .app-howHomework-content-text {
      padding: 0 !important;
      margin: 10px 0 !important;
    }
  }
}
</style> 