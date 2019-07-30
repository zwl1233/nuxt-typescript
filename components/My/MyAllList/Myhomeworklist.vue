<template>
  <section style="padding-top:8px" class="app-clear app-MyHomework-content-work">
    <div
      class="MyHomework-content app-MyHomework-content"
      v-for="(item) in gethomeworkList"
      :key="item.homeworkFinishId"
    >
      <!-- 第{{item.homeworkLevel}}节 -->
      <h3 class="fz17 c4c49" style="font-weight:400;">{{item.classhourName}} {{item.homeworkTitle}}</h3>
      <p class="fz14 c7271" style="margin-bottom:20px">
        来自
        <span
          class="c4a5 app-MyHomework-content-courseName"
          @click="jump(item.courseId,item.courseTempNum)"
        >《{{item.courseName}}》</span>

        <span class="app-MyHomework-content-sun" v-if="item.isSun">
          <!-- <i class="el-icon-check"></i> -->
          <!-- <img :src="require('@/assets/img/yesTrue.png')" alt="" style="width:16px"> -->
          已晒出
        </span>
        <span
          class="app-MyHomework-content-sunBtn"
          v-else
          @click="sunHomeWork(item.homeworkFinishId)"
        >晒作业</span>
      </p>
      <article style="margin-top:0" class="app-clear" >
        <!-- <span class="c3 fz14" style="color:#000">我的回答：</span> -->
        <p class="fz13" v-html="item.content" v-if="item.content" style="line-height: 26px; color: rgba(0, 0, 0,.7);margin-bottom:20px"></p>
        <ul style class="app-myhomework-flex">
          <li
            style="position:relative;"
            v-for="(itemimg,ind) in item.picList"
            :key="itemimg.homeworkFinishId"
          >
            <img
              v-lazy="itemimg.homeworkThumbUri"
              :src="itemimg.homeworkThumbUri"
              alt
              class="thumbImg"
              width="208"
              height="208"
              @click="lookImg(item.picList,ind,'homeworkPictureUri')"
            >
            <span
              style="right: -50px;position: absolute;bottom: -37px;"
              class="c9 fz12 fr"
              v-if="item.picList.length>0&&item.picList.length-1==ind"
            >共{{item.picList.length }}张</span>
          </li>
          <div class="over-time" style="width:100%">
        <p v-if="item.picList.length>0" class="fz12 app-change-pic-num">共{{item.picList.length}}张</p>

            <!-- <time class="c9 fz14">{{item.nickName}} &nbsp; &nbsp; {{initTime(item.createTime)}}</time> -->
             <time class="c9 fz14">{{initTime(item.createTime)}}</time>
            <!-- <time class="c9 fz14">沫沫er  {{item.createTime}}</time> -->
          </div>
        </ul>
        <!-- 老师追评 -->
        <div class="comments-content" v-if="item.userHomeWorkCommnetResponseVos.length>0">
          <ul>
            <li
              v-for="(itemcomment,commentIndex) in item.userHomeWorkCommnetResponseVos"
              :key="itemcomment.reviewId"
            >
              <h4 class="c4a5 fz14"  style="font-weight:400">助教老师说：</h4>
              <p class="c3 fz14 app-my-homeWork-teach" >
                <span
                  v-html="itemcomment.content"
                  class="app-my-homeWork-teach-content fz13"
                  style="line-height: 26px; color: rgba(0, 0, 0, 0.7);"
                ></span>
                <!-- <span
                  class="app-my-homeWork-teach-reply"
                  style="float:right"
                  @click="itemcomment.replyFlag=!itemcomment.replyFlag"
                >{{itemcomment.replyFlag?"收起":"回复"}}</span> -->
              </p>
              <p class="app-my-homeWork-picAry app-clear">
                <span
                  v-for="(itemimgs,i) in itemcomment.picList"
                  :key="itemimgs.homeworkFinishId"
                >
                  <img
                    v-lazy="itemimgs.homeworkThumbUri"
                    :src="itemimgs.homeworkThumbUri"
                    @click="lookImg(itemcomment.picList,i,'homeworkPictureUri')"
                    alt
                  >
                </span>
              </p>
              <div class="over-time" style="margin-bottom:0;width:100%">
                 <p v-if="itemcomment.picList.length>0" class="fz12 app-change-pic-num">共{{itemcomment.picList.length}}张</p>
                <!-- <time class="c9 fz14">沫沫er  {{itemcomment.createTime}}</time> -->
                <!-- <span
                  class="c9 fz12 fr"
                  v-if="itemcomment.picList.length>0"
                  style="margin-right:230px"
                >共{{itemcomment.picList.length}}张</span> -->
              </div>

              <div
                v-for="(myselfItem) in itemcomment.homeworkReviewReplies"
                :key="myselfItem.id"
                style="margin:15px 0;font-size:14px;"
              >
                <span style="color:rgba(196, 165, 127, 1)">我 :</span>
                <span v-html="myselfItem.replyContent" class="fz13 cfont" style="display:inline-block"></span>
              </div>
              
              <time
                v-if="commentIndex==item.userHomeWorkCommnetResponseVos.length-1"
                class="c9 fz14"
              >{{itemcomment.userNickName+'助教'}} {{initTime(itemcomment.createTime)}}
               <span
                  class="app-my-homeWork-teach-reply"
                  style="float:right"
                  @click="itemcomment.replyFlag=!itemcomment.replyFlag"
                >{{itemcomment.replyFlag?"收起":"回复"}}</span>
              </time>
              <div class="app-my-homeWork-replyBox app-change-richText-mt50" v-show="itemcomment.replyFlag" v-if="commentIndex==item.userHomeWorkCommnetResponseVos.length-1">
                <RichText :kinds="['emoji']" :ref="`richText${itemcomment.reviewId}`" hasBorder='false' :placeholder="'回复'+itemcomment.userNickName+'助教'+':'"/>
                <input
                  type="button"
                  class="fr btn-Bask_homework app-my-homeWork-btn outline"
                  style="cursor:pointer;margin-top:-19px"
                  value="回复"
                  @click="publish(itemcomment.reviewId)"
                >
              </div>
            </li>
          </ul>
        </div>
      </article>
      <!-- <div class="eldiv8s">
        <span></span>
      </div> -->
    </div>
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
import moment from "moment";
import { computingTime } from "@/plugins/utils";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ViewImg from "@/components/viewImg"; //查看大图
import RichText from "@/components/RichText";
export default {
  data() {
    return {
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  computed: {
    ...mapState({
      hometab: state => state.my.myhomework.tabId,
      homekey: state => state.my.myhomework.typeKey,
      gethomeworkList: state => state.my.myhomework.gethomeworkList //作业列表
    })
  },
  methods: {
    ...mapMutations({
      homeworklist: "my/myhomework/gethomeworkList" //我的作业获取list
    }),
    jump(courseId, num) {
      // this.$router.push({ name: "singleOrder", query: { courseId } });
      let routeData = this.$router.resolve({
        name: "singleOrder",
        query: { courseId,}
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
    computingTime,
    initTime(time) {
      let Time = moment(time).format("YYYY.MM.DD HH:mm");
      return Time.replace(/\./g, "-");
    },
    //晒作业
    sunHomeWork(id) {
      this.$axios
        .post("/userhomeworksun/sunbyhomeworkId", {
          homeworkFinishId: id,
          token: "",
          courseType: 1
        })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$message({
              message: this.$selfMsg.sunWork,
              type: "success",
              duration: 5000
            });
            this.getList();
          }
        });
    },
    getList(page) {
      this.$axios
        .post("/userhomework/list", {
          pageIndex: page | 1, //页码
          typeKey: this.homekey,
          typeId: this.hometab,
          courseId: 0,
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.homeworklist(res.result.userHomeWorkResponseVos);
          }
        });
    },
    publish(id) {
      console.log(id);
      //获取html
      let html = this.$refs[`richText${id}`][0].getHtml();
      this.$axios
        .post("userhomework/reply", {
          replyContent: html,
          homeworkReviewId: id,
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              duration: 5000,
              message: this.$selfMsg.ReplySucess,
              type: "success"
            });
            this.$refs[`richText${id}`][0].clearHtml();

            this.getList();
          }
        });
    }
  },
  components: {
    ViewImg,
    RichText //富文本
  }
};
</script>

<style lang="less" scoped>
.app-MyHomework-content-work{
  .MyHomework-content::after{
    margin-bottom: 40px;
  }
  .MyHomework-content:last-child::after{
    
    display: none;
    // background: red;
  }
}
//老师追评
.app-my-homeWork-teach {
  width: 100%;
  .app-my-homeWork-teach-content {
    width: 100%;
    display: inline-block;
  }
  
  
}
.app-my-homeWork-picAry{
  margin-top: 24px;
    &>span{
      margin-right:24px;
      margin-bottom:24px;
      display:block;
      width:180px;
      height:180px;
      float: left;
      &:nth-child(3n){
        margin-right: 0;
      }
      &>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }

  }
.app-my-homeWork-replyBox {
  // margin-top: -30px;
  // width: 593px;
  // height: 150px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
  border-radius: 3px;
  width: 593px;
  box-sizing: border-box;
  padding: 32px 24px;
  position: relative;
  float: right;
  margin-right: 5px;
  margin-top: 10px;
  &::after{
        content: "";
    width: 0;
    height: 10px;
    position: absolute;
    top: -10px;
    right: 15px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;

  }
  .app-editor {
    margin-top: -50px;
  }
  .app-my-homeWork-btn {
    margin-top: -30px;
    position: relative;
  }
}
.app-my-homeWork-teach-reply {
    color: rgba(196, 165, 127, 1);
    cursor: pointer;
    // width:80%;
    //回复框
  }

.app-myhomework-flex {
  // margin-top: 20px;
  // max-width: 750px;
  width: 100%;
  // background: red;
  display: flex;
  flex-wrap: wrap;
  &>li {
    max-flex: 25%;
    margin-right: 22px;
    margin-bottom: 22px;
    &>img{
      width: 180px!important;
      height: 180px!important;
    }
  }
}
.app-MyHomework-content:last-child {
  .eldiv8s {
    display: none;
  }
}
.app-MyHomework-content {
  .app-MyHomework-content-courseName {
    cursor: pointer;
  }
  .app-MyHomework-content-sun {
    color: rgba(177, 149, 117, 1);
    font-size: 16px;
    float: right;
    i {
      font-weight: bolder;
    }
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
  .eldiv8s {
    span {
      display: inline-block;
      margin-left: -200px;
    }
    span::after {
      content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      height: 25px;
      top: -25px;
    }
  }
}
</style>
