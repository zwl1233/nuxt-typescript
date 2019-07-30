<template>
  <section>
    <!-- <blockquote
      class="cb49"
      style="paddingLeft:65px"
    >
      我的课程
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote>-->
    <div class="MyCourses">
      <el-tabs
        @tab-click="handleClick"
        class="overflowDefine define-tabsClass_List define-tabsOrder_list app-MyCourses-tab"
      >
        <el-tab-pane>
          <span slot="label" style="font-size:14px;">全部</span>
          <Mycoursedetails /> 
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" style="font-size:14px;">开课中</span>
          <Mycoursedetails />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" style="font-size:14px;">已结课</span>
          <Mycoursedetails  />
        </el-tab-pane>
        <!-- 目前不要掉收藏功能 4.10-->
        <!-- <el-tab-pane>
          <span slot="label">收藏</span>
          <Mycoursedetails/>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- <div class="m-auto afters" v-if="flag">{{tit}}</div> -->
    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Mycoursedetails from "@/components/My/MyAllList/Mycoursedetails";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
export default {
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null,
    };
  },
  components: {
    Mycoursedetails,
    ScrollBottom
  },
  computed: {
    ...mapState({
      courseidx: state => state.my.Mycourse.page, //我的课程页码
      coursetab: state => state.my.Mycourse.tabId
    })
  },
  mounted() {
    this.changeTabMycourse(0);
    this.$axios
      .post("/usercourse/list", {
        pageIndex: this.courseidx,
        typeKey: this.coursetab,
        token: ""
      })
      .then(res => {
        // if(res.result.courseSingles.length==0){
        //   this.changedanlist(null)
        // }else{
        //   this.changedanlist(res.result.courseSingles)
        // }
        console.log(res.result,'rrrrrrrrrrrrrrrrrrrrr')
        this.MycourseList(res.result.userCourseFullResponseVos);
        if (res.result.userCourseFullResponseVos.length == 0) {
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
       changedanlist: "my/Mycourse/changedanlist", //我的课程获取list
      changeTabMycourse: "my/Mycourse/changeTab", //我的课程切换tab
      MycourseList: "my/Mycourse/MycourseList", //我的课程获取list
      MycoursechangePage: "my/Mycourse/changePage", //我的课程获取page
      Mycourseaddlist: "my/Mycourse/addlist"
    }),
    timer(fn) {
      // let that = this;
      // fn = null; //关闭滚动条
      // this.$refs.mychild.get();
      // this.tit = "正在加载...";
      // that.Timingopen = setInterval(function() {
      //   that.MycoursechangePage(); //订单
      //   that.getListadd();
      // }, 1000);
    },
    async getListadd(type) {
      clearInterval(this.Timingopen);
      let data = await this.$axios.post("/usercourse/list", {
        pageIndex: this.courseidx,
        typeKey: this.coursetab,
        token: ""
      });
      let newarr = data.result.userCourseFullResponseVos;
      if (newarr.length == 0) {
        this.tit = "目前没有更多数据";
        this.$refs.mychild.gets();
      } else {
        this.Mycourseaddlist(newarr);
        this.$refs.mychild.get();
      }
    },
    //切换数据
    async handleClick(tab) {
      this.$refs.mychild.get();
      this.tit = "加载更多";
      this.changeTabMycourse(Number(tab.index));
      let data = await this.$axios.post("/usercourse/list", {
        pageIndex: 1,
        typeKey: tab.index,
        token: ""
      });
      if (data.result.userCourseFullResponseVos.length == 0) {
        this.tit = "目前没有更多数据";
        this.$refs.mychild.gets();
      } else {
        this.tit = "加载更多";
        this.$refs.mychild.get();
      }
      this.MycourseList(data.result.userCourseFullResponseVos);
      //  this.$emit("repeat");
    }
  }
};
</script>

<style lang="less">

// 改变tab切换的样式
.app-MyCourses-tab {
  & > .el-tabs__header.is-top {
    & > .el-tabs__nav-wrap.is-top {
      & > .el-tabs__nav-scroll {
        & > .el-tabs__nav.is-top {
          & > .el-tabs__item {
            width: 120px;
          }
        }
      }
    }
  }

  .el-tabs__active-bar {
    display: block !important;
    margin-left: 22.5%;
    // position: relative;
    // width: 0!important;
    border: none !important;
    background: transparent;

    &:after {
      position: absolute;
      // width: 10px;
      background: rgba(196, 165, 127, 1);
      // height: 10px;
      border-radius: 50%;
      // background: red;
      left: 50%;
      top: -12px;
      margin-left: -10px;
      content: "";
      width: 20px !important;
      height: 20px !important;
      border: 4px solid white;
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
    // background-color:transparent!important;
        // background-size: contain!important; 
    background: transparent url(~assets/img/tabs_after2.png) no-repeat -230px -362px!important;
    background-size: cover;
  }
}
/* 调用我的课程 */
.MyCourses .MyCourses-content {
  padding-top: 26px;
}
.MyCourses .MyCourses-content h3 {
  height: 40px;
  line-height: 40px;
  margin-bottom: -7px;
}
.MyCourses .MyCourses-content h3 span img {
  width: 45px;
  height: 45px;
  position: absolute;
  display: inline-block;
  left: -50px;
  border-radius: 50%;
  text-align: center;
}
.MyCourses .MyCourses-content .Order_list-content::after {
  content: url(~assets/img/turnOrder.png);
}
.MyCourses .MyCourses-content .Order_list-content div.text-center {
  margin-top: 41px;
}
.MyCourses .MyCourses-content .Order_list-content div.text-center p {
  margin-top: 17px;
  margin-bottom: 5px;
}
.MyCourses .MyCourses-content .Order_list-content .el-col-8 {
  margin-right: 24px;
  margin-top: 24px;
  width: 202px;
}
.MyCourses .MyCourses-content .Order_list-content .el-col-8:last-child {
  margin-right: 0px;
}
.MyCourses .MyCourses-content .Order_list-content .grid-content {
  box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
}
.MyCourses .MyCourses-content .Order_list-content .grid-content img {
  width: 100%;
  height: 100%;
}
.MyCourses .MyCourses-content .Order_list-content .grid-content dl dt {
  margin-top: 4px;
  margin-bottom: 8px;
}
.MyCourses .MyCourses-content .Order_list-content .grid-content dl dt span {
  padding: 0px 1px;
}
.MyCourses .MyCourses-content .Order_list-content .grid-content dl dd {
  margin-left: 0px;
  padding-bottom: 20px;
}
</style>
