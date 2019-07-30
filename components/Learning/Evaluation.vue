<template>
  <section class="app-box-height">
    <div class="Bask_homework Evaluation"> 
      <p class="fz14 c30" v-if="userCommentList.length<=0" style="margin-bottom:-30px">说些什么吧～</p>
      <div class="mt-24" v-if="userCommentList.length<=0">
        <!-- <textarea
          name=""
          id=""
          @change="change"
        ></textarea> -->
        <!-- <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="info.comment"
        >
        </el-input> -->
        <RichText ref="richText" :kinds="['emoji']"></RichText>
        <div class="mt-15" style="position:relative;margin-top:-30px">
          <input
            type="button"
            class="fr btn-Bask_homework"
            style="cursor:pointer"
            value="发表"
            @click="publish"
          >

          <!-- <span class="fz12 c3"><i class="el-icon-picture cb19 fz16"></i> 表情</span> -->
        </div>
      </div>
      <div>
        <div class="myHomework-ulList">
          <ul class="Homework-ulList">
            <li
              v-for="item in userCommentList"
              :key="item.commentId"
            >
              <label for="">
                <img
                  v-lazy="item.userHeadUri"
                  alt=""
                >
              </label>
              <div>
                <span class="fz16 c30"><span style="marginRight:20px">我</span><time class="fz14 c6">发表于 {{computingTime(item.createTime)}}</time></span>
                <div class="mt-5">
                  <!-- <img class="middle" src="/img/Placed_top.png" alt=""> -->
                  <span class="fz14 c4c49" v-html="item.content">
                    <!-- {{item.content}} -->
                  </span>
                </div>

              </div>
            </li>
          </ul>
        </div>
        <div class="myHomework-ultitle">
          <span class="fz14 cb49">最新评价</span>
        </div>
        <ul class="Homework-ulList">
          <li
            v-for="item in courseCommentResponseVos"
            :key="item.commentId"
          >
            <label for="">
              <img
                v-lazy="item.userHeadUri"
                alt=""
              >
            </label>
            <div>
              <span class="fz16 c30"><span  style="marginRight:20px">{{item.userNickName}}</span><time class="fz14 c6">发表于 {{computingTime(item.createTime)}}</time></span>
              <div class="mt-5">
                <!-- <img
                  class="middle"
                  src="/img/Placed_top.png"
                  alt=""
                > -->
                <span class="fz14 c4c49" v-html="item.content">
                </span>
              </div>

            </div>
          </li>
          <!-- <li>
            <label for="">
              <img
                src="/img/People_write2.png"
                alt=""
              >
            </label>
            <div>
              <span class="fz16 c30">学而不语 <time class="fz14 c6">发表于 08-27 18:22</time></span>
              <div class="mt-5">
                <img
                  class="middle"
                  src="/img/collectActive.png"
                  alt=""
                >
                <span class="fz14 c4c49">
                  喜欢林曦老师讲课，大爱大爱～～
                </span>
              </div>

            </div>
          </li>
          <li>
            <label for="">
              <img
                src="/img/People_write2.png"
                alt=""
              >
            </label>
            <div>
              <span class="fz16 c30">小艺 <time class="fz14 c6">发表于 1小时前</time></span>
              <div class="mt-5">

                <span class="fz14 c4c49">
                  运笔稳重求变化，接受能力好，写字手感好，有韧性，字工整，漂亮，进步明显，悟性好。
                </span>
              </div>

            </div>
          </li> -->

        </ul>

      </div>

    </div>
    <div
      class="m-auto"
      style="width:100%;text-align:center"
      v-if="flag"
    >{{tit}}</div>
    <ScrollBottom
      @timer="timer"
      ref="getMore"
    ></ScrollBottom>
  </section>
</template>

<script>
// 弃用
import { mapState, mapMutations, mapActions } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom";
import RichText from "@/components/RichText"
import {computingTime} from "@/plugins/utils"
export default {
  data() {
    return {
      Timingopen: null,
      flag: true,
      tit: "加载更多"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取评价列表
    getList(page) {
      const { courseType, pageIndex, typeKey } = this.info;
      this.createpage(1)
      this.$axios
        .post("/coursecomment/list", {
          token: "",
          courseId:this.courseId,
          courseType,
          pageIndex:page||1,
          typeKey
        })
        .then(res => {
          if(res.result.courseCommentResponseVos.length==0){
            this.$refs.getMore.gets()
            this.tit = "目前没有更多数据"
          }else{
            this.$refs.getMore.get()
            this.tit = "加载更多"
          }
          if (res.code == 0) {
            this.setValue({ attrName: "data", attrValue: res.result });
          }
        });
    },
    ...mapMutations({
      setValue: "Learning/evaluation/setValue",
      changePage: "Learning/evaluation/changePage",
      createpage: "Learning/evaluation/createpage",
      addList: "Learning/evaluation/addList"
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
            
            if (res.result.courseCommentResponseVos.length==0) {
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
      console.log(this.$refs.richText)
      const { courseType, comment } = this.info;
      // if (!comment) {
      //   this.$message({
        // duration:2000,
      //     message: "评价内容不能为空",
      //     type: "warning"
      //   });
      //   return;
      // }
      let html=this.$refs.richText.getHtml()
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
          comment:html,
          courseId:this.courseId,
          courseType,
          scoreLevel: 1
        })
        .then(res => {
          if (res.code == 0) {
            this.getList(1);
            this.$refs.richText.clearHtml()
            this.setValue({ attrName: "comment", attrValue: "" });
            this.$message({
              duration:5000,
              message: this.$selfMsg.leaveMesage,
              type: "success"
            });
          }
        });
    },
    computingTime,

  },
  components: {
    ScrollBottom,
    RichText,//富文本
  },
  computed: {
    ...mapState({
      info: state => state.Learning.evaluation,
      courseCommentResponseVos: state =>
        state.Learning.evaluation.data.courseCommentResponseVos,
      userCommentList: state => state.Learning.evaluation.data.userCommentList,
      courseId:state=>state.Learning.courseId
    })
  }
};
</script>

<style>
</style>
