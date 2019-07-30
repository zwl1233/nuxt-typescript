<template>
  <article class="w1140 m-auto classlistarticle app-classlistarticle" style="margin-bottom:70px !important">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="dis_in_block navright fzGB1-0" style="margin-top:40px;marginBottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>所有课程</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 课程列表 -->
    <div class="w1000 m-auto app-classlistarticle-tabSwitch">
      <div class="app-classlistarticle-switchSort">
        <span :class="{'app-classlistarticle-switchSort-select':sortType==1}"  style="font-family: FZXIYSK--GBK1-0;" @click="switchTab(1)"  >按时间排序</span>
        <span style="font-size:14px;font-weight:600;color:rgba(196, 165, 127, 1)">|</span>
        <span :class="{'app-classlistarticle-switchSort-select':sortType==2}" style="font-family: FZXIYSK--GBK1-0;" @click="switchTab(2)">按学费排序</span>
      </div>
      <!-- 切换 -->
      <el-tabs
        v-model="tabId"
        type
        :class="['overflowDefine', 'define-tabsClass_List', 'app-classlistarticle-tab',{'app-classlistarticle-tab-two':tablist.length==2},{'app-classlistarticle-tab-three':tablist.length==3},{'app-classlistarticle-tab-one':tablist.length==1},'app-change-class-tabs']"
        @tab-click="typelist"
      >
        <el-tab-pane label v-for="(item,index) in tablist" :key="index" :name="item.tabId" >
          <span slot="label">
            <i class="el-icon-date" style="display:block"></i>
            <span style="font-family: FZXIYSK--GBK1-0;">{{item.text}}</span>
          </span>
          <div>
            <Eltab :tablist="tablist" :listDatas="listData" :sortType="sortType" v-if="sortType==1"  :key="item.tabId+1"/>
            <Eltab :tablist="tablist" :listDatas="listData" :sortType="sortType" v-if="sortType==2&&sortName=='Asc'" :key="item.tabId+2"/>
            <Eltab :tablist="tablist" :listDatas="listData" :sortType="sortType" v-if="sortType==2&&sortName=='Desc'" :key="item.tabId+3" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="m-auto afters" v-if="flag">{{tit}}</div> -->
    <ScrollBottom @timer="timer" ref="mychild"/>
  </article>
</template>
<script>
import Eltab from "@/components/classlistlevel/el-tab"; //切换组件
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
//渲染组件
export default {
  data() {
    return {
      activeNames: "写字课",
      //头部的tab渲染
      tablist: [
        {
          text: "写字课",
          icon: "el-icon-bell",
          tabId:"1",
        },
        {
          text: "读书课",
          icon: "el-icon-bell",
          tabId:"2",
        },
        {
          text: "写作课",
          icon: "el-icon-bell",
          tabId:"3",
        },
        {
          text: "养生课",
          icon: "el-icon-bell",
          tabId:"4",
        }
      ],
      activeName: "second",
      Timingopen: null, //加载更多定时器开关
      flag: true, //加载更多展示开关
      tit: "加载更多", //加载更多更换文字
      listData: [],
      sortType:1,//排序规则  1:按时间排序  2:按价格排序   时间没有倒序
      sortName:"Asc",//Asc 正序  Desc 倒序
    };
  },
  components: {
    Eltab,
    ScrollBottom
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      // tabId: state => state.classlist.tabId, //tabid
      page: state => state.classlist.page //page页码
    })
  },
  methods: {
    ...mapMutations({
      getCookie: "system/getCookie", //获取用户cookie
      changeTab: "classlist/changeTab", //切换tab
      changePage: "classlist/changePage" //加载更多
    }),
    //点击tab切换时切换数据
    typelist(tab) {
      console.log(tab.name)
      this.changeTab(tab.name.toString());
      this.getdata()
      // this.getList("add");
    },
    //加载更多
    async getList(type) {
      let that = this;
      clearInterval(that.Timingopen);
      let data = await this.$axios.post("/course/list", {
        columnId: this.tabId, //下标以后要用的 圈起来
        pageIndex: this.page||1,
        sortType:this.sortType,
        sortName:this.sortName,
        courseStyle:this.tabId
      });
      let newarr = data.result.courseFullResponseVos;
      if (type !== undefined) {
        this.listData = newarr;
        if (newarr.length == 0) {
          that.tit = "目前没有更多数据";
          that.$refs.mychild.gets();
        } else {
          that.tit = "加载更多";
          that.$refs.mychild.get();
        }
      } else {
        if (newarr.length == 0) {
          that.tit = "目前没有更多数据";
          that.$refs.mychild.gets();
        } else {
          newarr.forEach((item, i) => {
            that.listData.push(item);
          });
          that.tit = "加载更多";
          that.$refs.mychild.get();
        }
      }
    },
    //定时器开关
    timer(fn) {
      // fn = null;
      // let that = this;
      // this.tit = "正在加载...";
      // that.Timingopen = setInterval(function() {
      //   that.changePage();
      //   that.getList();
      // }, 1000);
    },
    //获取初始数据
    getdata() {
      // courseStyle:（
      this.$axios
        .post("/course/list", {
          pageIndex: 1,
          columnId: 1,
          sortType:this.sortType,
          sortName:this.sortName,
          courseStyle:this.tabId,
        })
        .then(res => {
          this.listData = res.result.courseFullResponseVos;
          if (this.listData.length == 0) {
            this.$refs.mychild.gets();
            this.tit = "目前没有更多数据";
          } else {
            this.$refs.mychild.get();
            this.tit = "加载更多";
          }
          
          console.log(this.listData, "我是课程数据");
        });
    },
    switchTab(type){
        if(type==this.sortType&&type==1)return

        if(type==2&&type==this.sortType){
          if(this.sortName=="Asc"){
            this.sortName="Desc"
          }else{
            this.sortName="Asc"
          }
        }else{
          this.sortName="Asc"
        }
        this.sortType=type
        this.getdata()
        


    }
  },
  mounted() {
    let tabname = this.$route.query.tabid
    if(tabname==1){
      this.activeNames="书法课"
    }else if(tabname==2){
      this.activeNames="读书课"
    }else if(tabname==3){
      this.activeNames="写作课"
    }else if(tabname==4){
      this.activeNames="养生课"
    }else{
      this.activeNames="书法课"
    }
    this.getdata();
  },
  computed:{
    tabId: {
      get() {
        return this.$store.state.classlist.tabId;
      },
      set(newVal) {
        this.$store.state.classlist.tabId = newVal;
      }
    }
  }
};
</script>

<style lang="less">
.app-classlistarticle {
  //课程列表 标题不加粗
  .dis_in_block.pos_r.Class_list-content-text{
  .nobold.fonS{
    font-weight:400!important;
  }
  }
  // .Class_list-content:last-child{
  //   background: red;
  //   .app-detai-dan{
  //      .Class_list-content-text{
          
  //      }
  //   }
  // }
  .app-classlistarticle-tabSwitch{
    position:relative;
    .app-classlistarticle-switchSort{
      position:absolute;
      right: 10px;
      // top: 100px;
      top:-85px;
      font-size: 16px;
      color:rgba(153, 153, 153, 1);
      &>span:nth-child(2n+1){
        cursor:pointer;
        &:hover{
          color:rgba(196, 165, 127, 1)
        }
      
      }
      .app-classlistarticle-switchSort-select{
        color:rgba(196, 165, 127, 1)
      }

    }
  }
  .app-classlistarticle-tab {
      &>.el-tabs__content{
        margin-top:100px;
      }
    margin-top: -10px;
    & > .el-tabs__header.is-top {
      display: none;//隐藏掉课程tab切换
      font-family: FZXIYSK--GBK1-0;
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
      margin-left: 30%;
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
        top: -23px;
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
      // background-color: transparent !important;
      // background-size: contain !important;
      // background-position: center;
      // height: 154px!important;
      // bottom: -102px!important;
      // left: -58px!important;
      height: 1px;
      position: absolute;
      background: transparent url(~assets/img/tabs_after2.png) no-repeat -230px -362px;
      bottom: 12px
    }
  }
  //两个tab
  .app-classlistarticle-tab-two {
    .el-tabs__active-bar {
      margin-left: 40% !important;
    }
  }
  //三个tab
  .app-classlistarticle-tab-three {
    .el-tabs__active-bar {
      margin-left: 35% !important;
    }
  }
  //只有一个
  .app-classlistarticle-tab-one{
    .el-tabs__header.is-top{
      display: none;
    }
    

  }
}
/* .define-tabsClass_List .el-tabs__item.is-active:nth-of-type(2)::after */
.classlistarticle {
  .afters {
    width: 100%;
    text-align: center;
  }
  .Class_list-content {
    margin-top:38px;
  }
  section {
    background: white;
  }
  .define-tabsClass_List .el-tabs__nav {
    height: 70px;
  }
  /* .Class_list-content >.Class_list-content-img img{
    width: 488px;
    height: 276px;
}

.Class_list-content >.Class_list-content-img >span{
    width: 56px;
    height: 53px;
    border: 3px solid #fff;
    display: inline-block;
    left: -30px;
    top: -30px;
    border-radius: 50%;
    background: #C4A57F;
    color: #fff;
    text-align: center;
    line-height: 20px;
    padding-top: 3px;
} */

  .Class_list-content-text {
    vertical-align: top;
    margin-top: -5px;
    margin-left: 32px;
    width: 465px;
    height: 276px;
  }

  .Class_list-content-text > h3 {
    margin-top: 3px;
    position: relative;
    span:nth-of-type(1) {
      // width: 280px;
      width: 450px;
      height: 29px;
      line-height: 29px;
      overflow: hidden;
      // text-overflow: ellipsis;
      white-space: clip;
      display: inline-block;
    }
    span:nth-of-type(2) {
      position: absolute;
    }
    margin-bottom: 9px;
    height: 29px;
    line-height: 29px;
  }
  .Class_list-content-text > h3 + p {
    margin-bottom: 12px;
  }

  .Class_list-content-text > ul li {
    // line-height: 30px;
    width: auto;
    min-width: 30%;
    /* display: inline-block; */
    float: left;
    margin-right: 20px;
  }
  .Class_list-content-text > ul li timer {
    display: inline !important;
  }
  .toll {
    width: 100%;
    bottom: 0px;
    border-top: 1px solid #ddd7d1;
    padding-top: 30px;
  }
  .toll::before {
    content: "";
    position: absolute;
    width: 0;
    height: 10px;
    position: absolute; /**注意⚠️一下**/
    top: 12px;
    right: 62px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #c4a57f;
    opacity: 0.5;
  }

  .toll > time {
    margin-top: 20px;
  }

  .toll > div:last-child {
    width: 140px;
    float: right;
  }

  .toll > div:first-child {
    position: absolute;
    bottom: 0px;
  }

  .toll > div:first-child output {
    margin-bottom: 6px;
  }

  .toll > div:first-child strong {
    margin-bottom: 21px;
  }

  .toll > div:last-child .btn-yellow-border {
    margin-top: 22px;
  }

  /**/
  .Class_list-carousel {
  }

  .Class_list-carousel {
    position: relative;
    margin-bottom: 90px;
    padding-bottom: 40px;
    /* box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05) */
    // box-shadow: 0 4px 59px -17px rgba(14, 5, 10, 0.05);
  }

  /* .Class_list-carousel::after{
    content: url(/img/People_write-left.png);
    position: absolute;
    top: 50%;
    margin-top:-11px;
    left:-3.125rem;
} */

  /* .Class_list-carousel::before{
    content: url(/img/People_write-right.png);
    position: absolute;
    right:-3.125rem;
    top: 50%;
    margin-top:-11px;
} */

  .Class_list-carousel li {
    margin-top: 51px;
    border-right: 1px solid #dcc9b2;
    padding: 0px 30px;
    padding-right: 5%;
    transition: all 1s !important;
  }

  .Class_list-carousel li:first-child {
    padding-left: 0px;
  }

  .Class_list-carousel li:last-child {
    border-right: 0;
  }

  /**/

  .Class_list-carousel li span.dis_block span.pos_a {
    right: 0px;
  }

  .Class_list-carousel li span.dis_block a:nth-child(1) {
    border-left: 0;
  }

  .Class_list-carousel li span.dis_block a {
    color: #000;
    // border-left: 1px solid #000;
    padding: 0px 5px 0px 8px;
  }

  .Class_list-carousel li span.dis_block span.c4a5 a {
    color: #c4a57f;
    border-color: #c4a57f;
  }

  .Class_list-content > .Class_list-content-img > span.lb_class {
    background: #ea9c91;
  }

  /*** 覆盖element-ui tabs **/
  .define-tabsClass_List {
  }

  .define-tabsClass_List .el-tabs__nav-scroll {
  }

  .define-tabsClass_List .el-tabs__item {
    font-size: 18px;
  }

  .define-tabsClass_List .el-tabs__item.is-active {
    color: #c4a57f;
    position: relative;
  }

  .define-tabsClass_List .el-tabs__item.is-active::after {
    /* content:'';
    width: 13px;
    height: 13px;
    background: #C4A57F;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    
    bottom: -32px; */
  }
  .define-tabsClass_List .el-tabs__item.is-active:nth-of-type(2)::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: -32px;
    border: 5px solid white;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  .define-tabsClass_List .el-tabs__item.is-active:nth-of-type(3)::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -13px;
    bottom: -32px;
    border: 5px solid white;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  .define-tabsClass_List .el-tabs__item.is-active:nth-of-type(4)::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    bottom: -32px;
    border: 5px solid white;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  .define-tabsClass_List .el-tabs__item.is-active:nth-of-type(5)::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: 0px;
    bottom: -32px;
    border: 5px solid white;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  /**灰色线**/
  .define-tabsClass_List .el-tabs__nav-wrap::after {
    // bottom: 12px !important;
    // height: 1px !important;
  }

  // .define-tabsClass_List .el-tabs__item:hover {
  //   color: #c4a57f;
  // }

  .define-tabsClass_List .el-tabs__nav {
    text-align: center;
    width: 100%;
    height: 80px;
  }

  /*active - --**/
  .define-tabsClass_List .el-tabs__active-bar {
    display: none;

    /*     
    width: 13px  !important;
    height: 13px;
    background: #C4A57F;
    border-radius: 50%;
    display: inline-block;
     */
  }

  .define-tabsClass_List .iconfont-shufa {
  }
}
.el-main {
  background: white;
}
</style>
