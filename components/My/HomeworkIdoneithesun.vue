<template>
  <section class="my-home-work" style="margin-left: -20px;">
    <!-- <blockquote class="cb49" style="paddingLeft:95px;margin-bottom: 20px;">
      我晒过的作业
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote>-->
    <ul class="Homework-ulList define-tabsOrder_list" style="margin-left:62px">
      <li v-for="(item) in list" :key="item.isLikedhomeworkFinishId">
        <div class="pos_r">
          <img class="pos_a user_imgHead" v-lazy="item.studentHeadUri" alt>
          <span class="fz14 c30" style="margin-bottom:14px;display:block">
            <!-- {{item.studentNickname}} -->
            <span style="marginLeft:9px;font-weight:bold;font-size: 16px;color:rgba(0,0,0,.7)">我</span>
            <time class="fz14 c6" style="color:rgba(153, 153, 153, 1);margin-left:17px">
              发表于
              <span class="fz12">
              {{computingTime(item.createTime)}}
              </span>
            </time>
          </span>
          <!-- <p
            style="line-height: 40px;font-weight: 600;cursor:pointer"
            @click="jump(item.courseId,item.courseTempNum)"
          >
          来自于
          <span>《{{item.courseName}}》</span>
          </p> -->
          <p class="fz14 c7271" style="padding-left:9px;box-sizing:border-box">
            来自
          <span class="c4a5" style="cursor:pointer" @click="jump(item.courseId,item.courseTempNum)">《{{item.courseName}}》</span>
          </p>
          <div class="mt-5" style="padding-left:9px;box-sizing:border-box;margin-top:16px">
            <!-- <img
              class="middle"
              :src="require('@/assets/img/Placed_top.png')"
              alt
              style="float:left;margin-right:5px;"
            >-->
            <span class="app-change-content-text fz13" v-html="item.homeworkFinishContent"></span>
            <div class="pos_r">
              <ul class="app-clear">
                <li class="qisrnc" v-for="(ite,ind) in item.homeworkFinishPics" :key="ind">
                  <img
                    :src="ite.thumbUri"
                    alt
                    class="thumbImg"
                    @click="lookImg(item.homeworkFinishPics,ind,'pictureUri')"
                  >
                </li>
              </ul>
              <!-- <span
                class="pos_a fz12 c30"
                style="color:#999999"
                v-if="item.homeworkFinishPics.length>0"
              >共{{item.homeworkFinishPics.length}}张</span>-->
              <p
                class="app-change-pic-num"
                v-if="item.homeworkFinishPics.length>0"
              >共{{item.homeworkFinishPics.length}}张</p>
            </div>
          </div>

          <div class="mt-10">
            <!-- <time class="fz14 c9">浏览量 1290</time> -->
            <span class="fr fz14 c9">
              <span style="cursor:pointer">
                <!-- <i class="el-icon-edit"></i> -->
                <span @click="reply(item.courseId,item.homeworkFinishId)">回复({{item.discussioNum}})</span>
              </span>
              <span class="app-star-line">|</span>
              <span class="wdb100" style="cursor:pointer;width:auto">
                <!-- <i class="el-icon-star-on cb49"  style="color:red"></i> -->
                <!-- <img :src="require('@/assets/img/starclick.png')" alt="" v-if="item.isLiked"> -->
                <!-- <i
                  class="el-icon-star-on cb49"
                  v-if="!item.isLiked"
                  @click="fabulous(item.homeworkFinishId)"
                ></i>-->
                <img
                  class="app-star"
                  :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                  alt
                  @click="fabulous(item.homeworkFinishId)"
                >
                <span>{{item.likeNum}}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="eldiv8s" style="margin-top:36px">
          <span></span>
        </div>
      </li>
      <div
        class="m-auto afters"
        style="clear:both;marginTop:10px"
        @click="timer"
        v-if="flag"
      >{{tit}}</div>
    </ul>
    <ViewImg
      v-if="viewFlag"
      :visible="viewFlag"
      :list="ViewImgList"
      :index="viewIndex"
      :close="viewClose"
      :field="field"
    />

    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import { computingTime } from "@/plugins/utils";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import ViewImg from "@/components/viewImg"; //查看大图
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null,
      pageindex: 1,
      list: [],
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  created() {
    this.$axios
      .post("/userhomeworksun/list", { token: "", pageIndex: this.pageindex })
      .then(res => {
        if (res.code == 0) {
          console.log(res);
          this.list = res.result.userHomeWorkSunResponseVos;
        }
      });
  },
  components: {
    ViewImg,
    ScrollBottom
  },
  methods: {
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
        .post("/userhomeworksun/list", { token: "", pageIndex: this.pageindex })
        .then(res => {
          if (res.code == 0) {
            let newarr = res.result.userHomeWorkSunResponseVos;
            if (newarr.length == 0) {
              this.tit = "目前没有更多数据";
              this.$refs.mychild.gets();
            } else {
              newarr.forEach(item => {
                this.list.push(item);
              });
              this.$refs.mychild.get();
            }
            // console.log(res.result.userHomeWorkSunResponseVos);
            // this.list = res.result.userHomeWorkSunResponseVos;
          }
        });
    },
    jump(courseId, num) {
      // if (num == 3) {
      // this.$router.push({ name: "singleOrder", query: { courseId } });
      // } else if (num == 5) {
      //   this.$router.push({ name: "gameplayfive", query: { courseId } });
      // // }
      let routeData = this.$router.resolve({
        name: "singleOrder",
        query: { courseId }
      });
      window.open(routeData.href, "_blank");
    },
    initTime(time) {
      // return time.split('.')[0]
      return moment(time)
        .format("YYYY.MM.DD HH:mm")
        .replace(/\./g, "-");
    },
    ...mapMutations({
      changeTabId: "Learning/changeTabId"
    }),
    getList(id) {
      this.list.forEach(item => {
        if (item.homeworkFinishId == id) {
          item.isLiked = true;
          item.likeNum++;
        }
      });
      // this.$axios
      //   .post("/userhomeworksun/list", { token: "", pageIndex: page || 1 })
      //   .then(res => {
      //     if (res.code == 0) {
      //       console.log(res);
      //       this.list = res.result.userHomeWorkSunResponseVos;
      //     }
      //   });
    },
    computingTime,
    //点赞
    fabulous(id) {
      this.$axios
        .post("/coursediscussion/praise", {
          token: "",
          id
        })
        .then(res => {
          if (res.code == 0) {
            this.getList(id);
          }
        });
    },
    reply(courseId, homeworkFinishId) {
      let routeData = this.$router.resolve({
        name: "singleOrder",
        query: { courseId: courseId, change: true, homeworkFinishId }
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
    }
  }
};
</script>

<style lang="less">
.my-home-work {
  .Homework-ulList {
    li:last-child {
      .eldiv8s {
        display: none;
      }
    }
  }
  .eldiv8s {
    span {
      display: inline-block;
      margin-left: -70px;
    }
    span::after {
      content: url(/_nuxt/assets/img/turnOrder.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 25px;
      margin-bottom: 40px;
      // content: url(~assets/img/turnOrder.png);
      // width: 100%;
      // margin: 0px auto;
      // display: inline-block;
      // text-align: center;
      // margin-top: 10px;
      // margin-bottom: 10px;
      // height: 25px;
      // top:-25px;
    }
  }
  .Homework-ulList li > div {
    float: right;
    width: 91%;
  }
  .Homework-ulList > li {
    display: initial;
  }
  .Homework-ulList > li div img.user_imgHead {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    left: -50px;
  }
  .Homework-ulList li > div div.mt-5 div.pos_r {
    width: fit-content;
  }
  .Homework-ulList li > div div.mt-5 div.pos_r ul {
    max-width: 670px;
    margin-top: 14px;
    display: flow-root;
    margin-right: 20px;
  }
  .Homework-ulList li > div div.mt-5 div.pos_r span.pos_a {
    right: -30px;
    bottom: 10px;
  }
  .Homework-ulList li > div div.mt-5 div.pos_r ul li {
    width: 180px;
    height: 180px;
    margin-right: 24px;
    margin-bottom: 24px;
    &:nth-child(3n){
      margin-right: 0!important;
    }
    float: left;
  }
  .Homework-ulList li > div div.mt-5 div.pos_r ul li img {
    width: 100%;
  }
  .Homework-ulList .define-tabsOrder_list > li::after {
    content: url(~assets/img/turnOrder.png);
    width: 100%;
    margin: 0px auto;
    display: inline-block;
    text-align: center;
    margin-top: 33px;
    margin-bottom: 33px;
  }
}
</style>
