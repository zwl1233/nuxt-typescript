<template>
  <section class="Myhomework">
    <!-- <blockquote class="cb49" style="paddingLeft:65px">
      我的作业
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote> -->
    <div class="MyHomework">
       <div class="text-right app-radio-group-color-change">
          <el-radio v-model="MyHomework_radio" label="1" @change="already">已提交</el-radio>
          <el-radio v-model="MyHomework_radio" label="2" @change="already">已评阅</el-radio>
        </div>
        <div style="marginLeft:53px">
          <Myhomeworklist/>
        </div>
          <!-- <Myhomeworklist/> -->
      <!-- <el-tabs
        @tab-click="handleClick"
        type
        class="overflowDefine define-tabsClass_List define-tabsOrder_list app-Myhomework-tab"
      >
        <div class="text-right app-radio-group-color-change">
          <el-radio v-model="MyHomework_radio" label="1" @change="already">已提交</el-radio>
          <el-radio v-model="MyHomework_radio" label="2" @change="already">已评阅</el-radio>
        </div>
        <el-tab-pane>
          <span slot="label" class="fz14">写字作业</span>
          <Myhomeworklist/>
        </el-tab-pane>
        <el-tab-pane label>
          <span slot="label" class="fz14">读书作业</span>
          <Myhomeworklist/>
        </el-tab-pane>
        <el-tab-pane label>
          <span slot="label" class="fz14">思考作业</span>
          <Myhomeworklist/>
        </el-tab-pane>
      </el-tabs> -->
    </div>
    <div class="m-auto afters" style="clear:both;margin-left:40px !important;" @click="timer" v-if="flag">{{tit}}</div>
    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import Myhomeworklist from "@/components/My/MyAllList/Myhomeworklist";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
export default {
  data() {
    return {
      MyHomework_radio: "1",
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null
    };
  },
  components: {
    Myhomeworklist,
    ScrollBottom
  },
  computed: {
    ...mapState({
      homeidx: state => state.my.myhomework.page, //我的作业页码
      hometab: state => state.my.myhomework.tabId,
      homekey: state => state.my.myhomework.typeKey
    })
  },
  mounted() {
    this.$axios
      .post("/userhomework/list", {
        pageIndex: 1, //页码
        typeKey: 1,
        typeId:1,
        courseId: 0,
        token: ""
      })
      .then(res => {
        
        this.homeworklist(res.result.userHomeWorkResponseVos);
        if (res.result.userHomeWorkResponseVos.length == 0) {
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
      changetypeKey: "my/myhomework/changetypeKey", //提交  批阅

      changeTabhomework: "my/myhomework/changeTab", //我的作业切换tab
      homeworklist: "my/myhomework/gethomeworkList", //我的作业获取list
      homeworkchangePage: "my/myhomework/changePage", //我的课程获取page
      homeworkaddlist: "my/myhomework/addlist"
    }),
    timer(fn) {
      if(this.tit == "目前没有更多数据"){
        return
      }
      let that = this;
      // fn=null  //关闭滚动条
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.homeworkchangePage(); //订单
        that.getListadd();
      }, 1000);
    },
    async getListadd(type) {
      clearInterval(this.Timingopen);
      let data = await this.$axios.post("/userhomework/list", {
        pageIndex: this.homeidx,
        courseId:0,
        typeId:this.hometab,
        typeKey: this.homekey,
        token: ""
      });
      let newarr = data.result.userHomeWorkResponseVos;
      if (newarr.length == 0) {
        this.tit = "目前没有更多数据";
        this.$refs.mychild.gets();
      } else {
        this.homeworkaddlist(newarr);
        this.$refs.mychild.get();
      }
    },
    //切换数据
    async handleClick(tab, event) {
      this.changeTabhomework(Number(tab.index)+1);
      let data = await this.$axios.post("/userhomework/list", {
        pageIndex: 1,
        typeKey: this.homekey,
        courseId:0,
        typeId:this.hometab,
        token: ""
      });
      if (data.result.userHomeWorkResponseVos.length == 0) {
        this.tit = "目前没有更多数据";
        this.$refs.mychild.gets();
      } else {
        this.tit = "加载更多";
        this.$refs.mychild.get();
      }
      this.homeworklist(data.result.userHomeWorkResponseVos);
    },
    //提交  批阅
    async already(tab) {
      this.changetypeKey(Number(tab));
      let data = await this.$axios.post("/userhomework/list", {
        pageIndex: 1,
        typeKey: this.homekey,
        typeId:this.hometab,
        token: "",
        courseId: 0
      });
      if (data.result.userHomeWorkResponseVos.length == 0) {
        this.tit = "目前没有更多数据";
        this.$refs.mychild.gets();
      } else {
        this.tit = "加载更多";
        this.$refs.mychild.get();
      }
      this.homeworklist(data.result.userHomeWorkResponseVos);
    }
  }
};
</script>

<style lang="less">
// tab切换的样式
.app-Myhomework-tab {
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
  .el-tabs__item.is-top:last-child{
    padding-right: 0!important
  }
  .el-tabs__nav-wrap:after {
    // opacity: 0.4;
    // background: radial-gradient(#eaeaea, #c4a57f, #eaeaea);
    background-color:transparent!important;
        background-size: contain!important; 
    background: url(~assets/img/tabs_after.png) no-repeat;
  }
  
}

.Myhomework {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #b49876 !important;
    background: white !important;
    &::after {
      background: #b49876;
      width: 7px;
      height: 7px;
    }
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #b49876 !important;
  }
}
/** 调用我的作业 **/
// .MyHomework .MyHomework-content::after {
//   content: url(~assets/img/turnOrder.png);
//   width: 100%;
//   margin: 0px auto;
//   display: inline-block;
//   text-align: center;
//   margin-top: 25px;
// }
.MyHomework .MyHomework-content h3 {
  margin-top: 10px;
  margin-bottom: 14px;
}
.MyHomework .MyHomework-content article {
  margin-top: 30px;
}
.MyHomework .MyHomework-content article > p.c7271 {
  margin: 14px auto 20px;
}
.MyHomework .MyHomework-content article > ul {
  clear: both;
  float: left;
}
// .MyHomework .MyHomework-content article > ul li {
//   float: left;
//   margin-right: 22px;
//   margin-bottom: 22px;
//   width: 213px;
//   height: 213px;
//   color:red;
//   // overflow: hidden;
// }
// .MyHomework .MyHomework-content article > ul li{
//   color:red;
// }
// .MyHomework .MyHomework-content article > ul li:nth-child(4n) {
//   margin-right: 0px;
// }
// .MyHomework .MyHomework-content article > ul li:first-child {
//   margin-right: 22px;
// }
.MyHomework .MyHomework-content article > ul li img {
  width: 180px;
  height: 180px;
}
.MyHomework .MyHomework-content article .over-time {
  float: left;
  margin-bottom: 30px;
  width: 899px;
  clear: both;
}
.MyHomework .MyHomework-content article .comments-content {
  border-top: 1px solid rgba(196, 165, 127, 0.3);
  padding-top: 29px;
  float: left;
  width: 100%;
}
.MyHomework .MyHomework-content article .comments-content ul li {
  margin-bottom: 22px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #b49876 !important;
}

// /** 调用我的作业 **/
// .MyHomework .MyHomework-content::after {
//   content: url(~assets/img/turnOrder.png);
//   width: 100%;
//   margin: 0px auto;
//   display: inline-block;
//   text-align: center;
//   margin-top: 25px;
// }
.MyHomework .MyHomework-content h3 {
  margin-top: 10px;
  margin-bottom: 14px;
}
.MyHomework .MyHomework-content article {
  margin-top: 26px;
}
.MyHomework .MyHomework-content article > p.c7271 {
  margin: 12px auto 20px;
}
.MyHomework .MyHomework-content article > ul {
  clear: both;
  float: left;
}
// .MyHomework .MyHomework-content article > ul li {
//   float: left;
//   margin-right: 22px;
//   margin-bottom: 22px;
//   width: 208px;
//   height: 208px;
//   overflow: hidden;
// }
// .MyHomework .MyHomework-content article > ul li:nth-child(4n) {
//   margin-right: 0px;
// }
// .MyHomework .MyHomework-content article > ul li:first-child {
//   margin-right: 22px;
// }
// .MyHomework .MyHomework-content article > ul li img {
//   width: 100%;
//   height: 100%;
// }
.MyHomework .MyHomework-content article .over-time {
  float: left;
  margin-bottom: 30px;
  width: 899px;
  clear: both;
}
.MyHomework .MyHomework-content article .comments-content {
  border-top: 1px solid rgba(196, 165, 127, 0.3);
  padding-top: 29px;
  float: left;
  width: 100%;
}
.MyHomework .MyHomework-content article .comments-content ul li {
  margin-bottom: 22px;
}
.MyHomework .MyHomework-content article .comments-content ul li h4 {
  margin-bottom: 9px;
}
.MyHomework .MyHomework-content article .comments-content ul li h4 + p {
  line-height: 24px;
  margin-bottom: 2px;
}
</style>
