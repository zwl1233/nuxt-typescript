<template>
  <section class="app-box-height">
    <div class="Bask_homework Evaluation m-auto app-safari-margin" >
      <p class="fz14 c30" v-if="!userIsComment&&isSignUp" style="color:rgba(0,0,0,.7)">说说你的想法吧</p>
      <div class="mt-24 app-change-richText-mt50" v-if="!userIsComment&&isSignUp" >
        <RichText ref="richText" :kinds="['emoji']"></RichText>
        <div class="mt-15">
          <input
            type="button"
            class="fr btn-Bask_homework outline app-evaluate-btn"
            style="cursor:pointer"
            value="发表"
            @click="publish"
          >
        </div>
      </div>
      <div>
        <div class="myHomework-ulList" style="margin-top:0">
          <ul class="Homework-ulList" style="width:100%;overflow:hidden">
            <li v-for="item in userCommentList" :key="item.commentId" style="margin-bottom:15px">
              <label for>
                <img v-lazy="item.userHeadUri" alt>
              </label>
              <div>
                <span class="fz16 c30" style="margin-right:20px;color:rgba(0,0,0,.9)">
                  我
                  <time class="fz14 c6 app-evaluate-publish-from">发表于 
                    <span class="fz12">
                    {{computingTime(item.createTime)}}
                    </span>
                    </time>
                </span>
                <div class="mt-14">
                  <!-- <img class="middle" :src="require('@assets/img/Placed_top.png" alt=""> -->
                  <span class="fz13 c4c49 app-change-content-text" v-html="item.content"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="myHomework-ultitle" style="margin-bottom:40px">
          <span class="fz14 cb49 mt-10">最新留言</span>
        </div>
        <ul class="Homework-ulList">
          <li v-for="item in courseCommentResponseVos" :key="item.commentId" style="margin-bottom:15px">
            <label for>
              <img v-lazy="item.userHeadUri" alt>
            </label>
            <div style="margin-bottom:0">
              <span class="fz16 c30" style="color:rgba(0,0,0,.9)">
                {{item.userNickName}}
                <time class="fz14 c6 app-evaluate-publish-from">发表于 
                  <span class="fz12">
                  {{computingTime(item.createTime)}}
                  </span>
                  </time>
              </span>
              <div style="margin-top:9px">
                <!-- <img class="middle" :src="require('@/assets/img/Placed_top.png')" alt> -->
                <span class="fz13 c4c49 app-change-content-text" v-html="item.content"></span>
              </div>
            </div>
          </li>
          <!-- <li>
            <label for>
              <img :src="require('@/assets/img/People_write2.png')" alt>
            </label>
            <div>
              <span class="fz16 c30">
                学而不语
                <time class="fz14 c6">发表于 08-27 18:22</time>
              </span>
              <div class="mt-5">
                <img class="middle" :src="require('@/assets/img/collectActive.png')" alt>
                <span class="fz14 c4c49">喜欢林曦老师讲课，大爱大爱～～</span>
              </div>
            </div>
          </li>
          <li>
            <label for>
              <img :src="require('@/assets/img/People_write2.png')" alt>
            </label>
            <div>
              <span class="fz16 c30">
                小艺
                <time class="fz14 c6">发表于 1小时前</time>
              </span>
              <div class="mt-5">
                <span class="fz14 c4c49">运笔稳重求变化，接受能力好，写字手感好，有韧性，字工整，漂亮，进步明显，悟性好。</span>
              </div>
            </div>
            </li>
          </li>-->
        </ul>
      </div>
    </div>
    <div
      class="m-auto afters"
      style="width:100%;text-align:center;color:rgba(180, 152, 118, 1)"
      v-if="flag&&tit=='加载更多'"
      @click="timer"
    >{{tit}}</div>
    <div
      class="m-auto afters"
      style="width:100%;text-align:center;color:rgba(180, 152, 118, 1)"
      v-if="flag&&tit!='加载更多'"
    >{{tit}}</div>
    <ScrollBottom @timer="timer" ref="getMore"></ScrollBottom>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom";
import RichText from "@/components/RichText";
import { computingTime } from "@/plugins/utils";
export default {
  data() {
    return {
      Timingopen: null,
        flag: true,
      tit: "加载更多",
      userIsComment:false
    };
  },
  mounted() { 
    this.getList();
  },
  methods: {
    //获取评价列表
    getList(page) {
      const { courseType, pageIndex, typeKey } = this.info;
      this.createpage(page || 1);
      this.$axios
        .post("/coursecomment/list", {
          token: "",
          courseId: this.courseId,
          courseType,
          pageIndex: page || 1,
          typeKey
        })
        .then(res => {
          if (res.result.courseCommentResponseVos.length == 0) {
            this.$refs.getMore.gets();
            this.tit = "目前没有更多数据";
          } else {
            this.$refs.getMore.get();
            this.tit = "加载更多";
          }
          if (res.code == 0) {
            this.userIsComment=res.result.userIsComment
            this.setValue({ attrName: "data", attrValue: res.result });
          }
        });
    },
    ...mapMutations({
      setValue: "singleOrder/evaluation/setValue", //修改vuex
      changePage: "singleOrder/evaluation/changePage",
      createpage: "singleOrder/evaluation/createpage",
      addList: "singleOrder/evaluation/addList" //增加list
    }),

    timer(fn) {
      fn = null; //关闭滚动条
      let that = this;
      //  that.flag=true
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.changePage(); //改变页码
        that.addClassList();
      }, 1000);
    },
    //加载更多
    addClassList() {
      clearInterval(this.Timingopen);
      const { courseId, courseType, pageIndex, typeKey } = this.info;
      this.$axios
        .post("/coursecomment/list", {
          token: "",
          courseId,
          courseType,
          pageIndex,
          typeKey
        })
        .then(res => {
          if (res.code == 0) {
            this.userIsComment=res.result.userIsComment
            if (res.result.courseCommentResponseVos.length == 0) {
              this.tit = "目前没有更多数据";
              this.$refs.getMore.gets();
            } else {
              this.tit = "加载更多";
              this.$refs.getMore.get();
              this.addList(res.result);
            }
          }
        });
    },
    //发表
    publish() {
      console.log(this.$refs.richText);
      const { courseType, comment } = this.info;
      // if (!comment) {
      //   this.$message({
      // duration:2000,
      //     message: "评价内容不能为空",
      //     type: "warning"
      //   });
      //   return;
      // }
      let html = this.$refs.richText.getHtml();
       if (html == "内容过多") {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.content,
          type: "warning"
        });
      }
      this.$axios
        .post("/coursecomment/comment", {
          token: "",
          comment: html,
          courseId: this.courseId,
          courseType,
          scoreLevel: 1
        })
        .then(res => {
          if (res.code == 0) {
            this.getList(1);
            this.$refs.richText.clearHtml();
            this.setValue({ attrName: "comment", attrValue: "" });
            this.$message({
              duration: 5000,
              message: this.$selfMsg.leaveMesage,
              type: "success"
            });
          }
        });
    },
    computingTime
  },
  components: {
    ScrollBottom,
    RichText //富文本
  },
  computed: {
    ...mapState({
      info: state => state.singleOrder.evaluation.info, //请求信息
      courseCommentResponseVos: state =>
        state.singleOrder.evaluation.data.courseCommentResponseVos, //评价列表
      userCommentList: state =>
        state.singleOrder.evaluation.data.userCommentList, //我的评价
      courseId: state => state.singleOrder.courseId ,//课程id
      isSignUp: state => state.singleOrder.isSignUp, //是否报名
    })
  }
};
</script>
<style>
.app-evaluate-btn{
  position: relative;
  top: -29px;
  font-size: 14px;
}
.app-evaluate-publish-from{
  color: rgba(0, 0, 0, .6);
  margin-left: 20px;
}
</style>


