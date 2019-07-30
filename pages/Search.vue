<template>
  <section class="app-Search">
    <div class="Search_content">
      <!-- <img :src="require('@/assets/img/02.png')" alt class="banner_img"> -->
      <div class="Search_input">
        <el-input placeholder="搜索你感兴趣的内容" class="input-with-select fzMicroYaHei"
        @keyup.enter.native="search"
         v-model="searchtext">
          <el-button slot="append" class="fzMicroYaHei" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div> 
    <template>
      <article class="w1000 m-auto Search_contentList" style="margin-top: -68px !important;">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: -80px;" class="mt-40 dis_in_block fzGB1-0">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{titletext}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 课程列表  Course list-->
        <div class="w1000 m-auto">
          <el-tabs
            type
            class="overflowDefine define-tabsClass_List app-Search-tab"
            @tab-click="typelist"
          >
            <el-tab-pane>
              <span class="fzGB1-0" slot="label">课程</span>
              <searchcourse v-if="searchindex==0" ref="course" :searchtext="searchtext"/>
            </el-tab-pane>
            <el-tab-pane label>
              <span class="fzGB1-0" slot="label">文章</span>
              <searcharticle v-if="searchindex==1" ref="article" :searchtext="searchtext"/>
            </el-tab-pane>
            <el-tab-pane label>
              <span class="fzGB1-0" slot="label">商品</span>
              <searchcommodity v-if="searchindex==2" ref="commodity" :searchtext="searchtext"/>
            </el-tab-pane>
            <el-tab-pane label>
              <span class="fzGB1-0" slot="label">视频</span>
              <searchvideoFree v-if="searchindex==3" ref="videoFree" :searchtext="searchtext"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </article>
    </template>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import searchcourse from "@/components/Search/searchcourse"; //搜索课程
import searcharticle from "@/components/Search/searcharticle"; //搜索文章
import searchcommodity from "@/components/Search/searchcommodity"; //搜索商品
import searchvideoFree from "@/components/Search/searchvideoFree"; //搜索视频
export default {
  components: {
    searchcourse,
    searcharticle,
    searchcommodity,
    searchvideoFree
  },
  data() {
    return {
      titletext: "搜索课程",
      searchtextref: "",
      searchtext: "", //搜索关键字
      searchindex: 0,
      courselist: [], //搜索课程列表
      articlelist: [],
      commoditylist: [],
    };
  },
  methods: {
    ...mapMutations({
      changePagesRes: "search/changePageRes",
      changePageachRes: "search/changePageachRes",
      changepagecoumRes: "search/changepagecoumRes",
      changepageZero:'search/changepageZero'
    }),
    //切换tab
    typelist(tab) {
      this.searchindex = tab.index;
      if (tab.index == 0) {
        this.titletext = "搜索课程";
        this.changePagesRes();
      } else if (tab.index == 1) {
        this.titletext = "搜索文章";
        this.changePageachRes();
      } else if(tab.index==2){
        this.titletext = "搜索商品";
        this.changepagecoumRes();
      }else{
        this.titletext = "搜索视频";
        this.changepageZero()
      }
    },
    //搜索
    search() {
      if (this.searchindex == 0) {
        if(this.$refs.course){
          this.$refs.course.getdata();
        }
        this.changePagesRes();
      } else if (this.searchindex == 1) {
        if(this.$refs.article){
          this.$refs.article.getdata();
        }
        this.changePageachRes();
      } else if(this.searchindex==2){
        if(this.$refs.commodity){
          this.$refs.commodity.getdata();
        }
        this.changepagecoumRes();
      }else{
        if(this.$refs.videoFree){
          this.$refs.videoFree.getdata();
        }
        this.changepageZero()
      }
    }
  }
};
</script>

<style lang="less">
.app-Search {
  .app-Search-tab {
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
      margin-left: 26%;
      // position: relative;
      // width: 0!important;
      border: none !important;
      background: transparent;
      z-index: 2;

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
    background-color:transparent!important;
        background-size: contain!important; 
    background: url(~assets/img/tabs_after.png) no-repeat;
    }
    .el-tabs__nav-wrap::after {
      bottom: 12px !important;
      position: absolute;
    }
  }
}

.Search_content {
  background: url(~assets/img/search_bg.png);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;

  // background: url(~assets/img/01.png);
  text-align: center;
  height: 340px;
  width: 100%;
  position: relative;
  top: -60px;
  .Search_input {
    width: 700px;
    margin: 0px auto;
    position: absolute;
    left: 50%;
    bottom: 114px;
    margin-left: -350px;
  }
  .Search_input input {
    font-weight: 300;
  }
  .Search_input input::placeholder {
    font-weight: 300;
  }
  .Search_input .el-button--default {
    background: #1e7275;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .banner_img {
    bottom: 0px;
    position: absolute;
    left: 50%;
    margin-left: -615px;
    // height: 272px;
  }
}
.Search_contentList {
  
  .goods_list > a {
    margin-right: 25px;
    margin-bottom: 30px;
    width: 263px;
    height: 263px;
    display: inline-block;
  }
  .goods_list > a img {
    width: 100%;
    height: 100%;
  }
  .goods_list > a:nth-child(4n) {
    margin-right: 0px;
  }
  .Class_list-content {
    width: 1000px;
    margin-left: 0px;
    margin-right: -70px;
    margin-top: 40px;
  }
  .Class_list-content > div.clear {
    margin-bottom: 58px;
  }
  .Class_list-content .Class_list-content-img img {
    // width: 410px;
    // height: 236px;
    width: 488px;
    height: 291px;
  }
  .Class_list-content .Class_list-content-text {
    // width: 557px;
    // height: 236px;
    width: 465px;
    height: 276px;
    margin-top: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 25px;

    
  }
  .Class_list-content .Class_list-content-text > p.fz14 {
    margin-bottom: 30px;
    line-height: 22px;
    // margin-top: 20px;
  }
  .Class_list-content .Class_list-content-text > p.fz14:last-child {
    margin-bottom: 0px;
  }
  .articleDefine > p.mb-15 {
    margin-bottom: 40px;
  }
  .articleDefine > div.clear {
    margin-left: 0px;
  }
  .articleDefine > div.clear > h3 {
    margin-bottom: 17px;
  }
  .articleDefine > div.clear > h3 time {
    /* content: ''; */
    width: 45px;
    height: 39px;
    border-radius: 50%;
    display: inline-block;
    background: #f5f5f5;
    position: absolute;
    left: -60px;
    top: -8px;
    font-size: 13px;
    text-align: center;
    padding-top: 0.375rem;
    color: #999;
  }
  .articleDefine .Class_list-content-text {
    width: 500px;
  }
  .articleDefine .Class_list-content-text p:last-child {
    margin-bottom: 0px;
  }
  .articleDefine .Class_list-content-text a.c077.pos_a {
    bottom: 0px;
  }
  .articleDefine .Class_list-content-text a.c077.pos_a:hover {
    color: #077478 !important;
    text-decoration: underline;
  }
  /*** 覆盖element-ui tabs **/
  .define-tabsClass_List {
  }

  .define-tabsClass_List .el-tabs__nav-scroll {
    overflow: hidden;
    height: 62px;
  }

  .define-tabsClass_List .el-tabs__item {
    font-size: 18px;
  }

  .define-tabsClass_List .el-tabs__item.is-active {
    color: #c4a57f;
    position: relative;
  }

  .define-tabsClass_List .el-tabs__item.is-active::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -8px;
    bottom: -16px;
    border: 4px solid #fff;
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }

  /**灰色线**/
  .define-tabsClass_List .el-tabs__nav-wrap::after {
    // bottom: 12px !important;
    height: 1px !important;
    background-color: #e5dcd2;
  }

  .define-tabsClass_List .el-tabs__item:hover {
    color: #c4a57f;
  }

  .define-tabsClass_List .el-tabs__nav {
    text-align: center;
    width: 100%;
    height: 52px;
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
</style>
