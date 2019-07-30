<template>
  <article class="w1140 m-auto shopartile app-shopartile" >
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mt-40 dis_in_block fzGB1-0" >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">课程列表</el-breadcrumb-item> -->
      <el-breadcrumb-item class="fonH">暄桐文房</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="w1000 m-auto" >
      <div class="fz18 cb19 mt-60" style="height:40px;line-height:40px">
        <img class="app-change-icon" :src="require('@/assets/changeIcon/1.png')" alt>
        <span class="middle" style="display:inline-block;transform:translateY(3px)">暄桐文房</span>
        <label class="fr app-shopartile-searchInput fzMicroYaHei">
          <el-input  prefix-icon="el-icon-search" placeholder="查找我想要的..." v-model="commodityName" @keyup.enter.native="search" clearable></el-input>
        </label>
      </div> 
      <div class="FreeVideo_lectures-content" style="marginTop:22px;"> 
        <div class="w1000 m-auto">
          <el-tabs
            v-model="FourStores"
            @tab-click="handleClick"
            class="FourStores app-FourStores-tab"
          >
            <!-- <el-tab-pane 
                                                label="全部" name="FourStores_all" >
                                                    <div>
                                                            <el-row :gutter="25">
                                                                   <Shoplist :datalist="datalist"/>
                                                            </el-row>
                                                    </div>
            </el-tab-pane>-->
            <el-tab-pane
              v-for="item in shoplist"
              :key="item.typeId"
              :label="item.typeName"
              :name="item.typeId.toString()"
            > 
              <Shoplist :datalist="datalist"/>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!--分页-->
        <div class="clear text-center mt-40">
          <Pagination :total="pagenum" :getList="getList" :pageSize="size"></Pagination>
          <!-- <div class="page">
            <span class="demonstration">页数较少时的效果</span>
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagenum"
              :page-size="size"
            ></el-pagination>
          </div>-->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Shoplist from "@/components/shopList/List";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      FourStores: "",
      shoplist: [], //商品大类列表
      datalist: [], //商品列表
      idx: "", //商品大类tabid
      pagenum: 1, //页码
      size: 10,
      commodityName:"",//搜索内容
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    async getdata() {
      let datas = await this.$axios.post("/commodity/typelist"); //商品类型
      if (datas.code == 0) {
        this.idx = datas.result[0].typeId;
      }
      let data = await this.$axios.post("/commodity/list", {
        pageIndex: 1,
        typeId: this.idx,
        commodityName:this.commodityName
      }); //初始获取数据
      this.pagenum = data.result.total; //页码均分
      this.size = data.result.size;
      this.FourStores = datas.result[0].typeId.toString();
      this.datalist = data.result.commodityResponseVos;
      this.shoplist = datas.result;
    },
    async handleCurrentChange(e) {
      //页码分页切换
      console.log(this.idx);
      let data = await this.$axios.post("/commodity/list", {
        //获取数据
        pageIndex: e,
        typeId: this.idx,
        commodityName:this.commodityName
      });
      this.datalist = data.result.commodityResponseVos;
    },
    async handleClick(tab, event) {
      console.log(tab.name, "ll");
      //商品大类tab切换
      this.idx = tab.name; //tabid
      let data = await this.$axios.post("/commodity/list", {
        pageIndex: 1,
        typeId: tab.name,
        commodityName:this.commodityName
        
      }); //获取数据
      let pages = Math.ceil(data.result.total / data.result.size) + "0"; //多少页码
      this.pagenum = Number(pages); //页码均分
      this.datalist = data.result.commodityResponseVos;
      console.log(data.result.commodityResponseVos);
    },
    //获取数据
    getList(page) {
      this.$axios
        .post("/commodity/list", {
          pageIndex: page || 1,
          typeId: this.idx,
          commodityName:this.commodityName
        })
        .then(res => {
          if (res.code == 0) {
            this.pagenum = res.result.total;
            this.size = res.result.size;
            this.datalist = res.result.commodityResponseVos;
          }
        });
    },
    //搜索
    search(){
      console.log('搜索')
      this.getList()
        
    }
  },
  components: {
    Shoplist,
    Pagination
  }
};
</script>

<style lang="less">
.app-shopartile {
  .app-shopartile-searchInput{
    margin-right: 10px;
    width: 243px;
    height:36px;
    .el-input__prefix{
      // left: 35px;
      .el-input__icon {
              
      margin-left:45px;
      }
    }
    input{
      padding-left: 45px;
      border-radius: 100px;
      overflow: hidden;
      margin-left: 35px;
      margin-top: 2px; 
      width: 220px;
      height: 32px;;
    }
    .el-icon-search{
      font-size: 18px;
    }
  }
  .app-FourStores-tab {
    .el-tabs__header{
      margin-bottom: 36px;
    }
    .el-tabs__active-bar {
      display: block !important;
      margin-left: 22.5%;
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
        top: -20px;
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
    .el-tabs__item.is-top{
      padding:0 27px;
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
      background:transparent url(~assets/img/tabs_after2.png) no-repeat -230px -362px!important;
    }
    .el-tabs__nav-wrap::after {
      bottom: 10px !important;
      position: absolute;
    }
  }
  
}
// .FourStores .el-tabs__item.is-active::after
/** 文房商店 **/
.shopartile {
  .Four_stores {
    height: 1051px;
    box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  }
  .Four_stores-carousel {
    position: relative;
  }
  .Four_stores-carousel::after {
    content: url(~assets/img/People_write-left.png);
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: -50px;
  }

  .Four_stores-carousel::before {
    content: url(~assets/img/People_write-right.png);
    position: absolute;
    right: -50px;
    top: 50%;
    margin-top: -11px;
  }
  .Four_stores-carousel li {
    margin-top: 27px;
    margin-right: 25px;
  }
  .Four_stores-carousel li:last-child {
    margin-right: 0px;
  }
  .Four_stores-carousel li > p {
    margin-top: 22px;
    color: #030000;
  }
  .Four_stores-carousel li > p > span {
    color: #717171;
  }
  // classList
  .Class_list-content {
    margin-top: 58px;
  }

  .Class_list-content > .Class_list-content-img img {
    width: 488px;
    height: 276px;
  }

  .Class_list-content > .Class_list-content-img > span img {
    width: 52px;
    height: 52px;
    /* border: 3px solid #fff; */
    position: absolute;
    display: inline-block;
    left: -30px;
    top: -30px;
    border-radius: 50%;
    /* background: #C4A57F;
    color: #fff; */
    text-align: center;
    /* line-height: 20px;
    padding-top: 3px; */
  }

  .Class_list-content-text {
    vertical-align: top;
    margin-top: -5px;
    margin-left: 32px;
    width: 465px;
    height: 276px;
  }

  .Class_list-content-text > h3 {
    margin-bottom: 9px;
  }
  .Class_list-content-text > h3 + p {
    margin-bottom: 12px;
  }

  .Class_list-content-text > ul li {
    width: 50%;
    margin-bottom: 6px;
    float: left;
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
    position: absolute; /**注意一下**/
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
    box-shadow: 0 4px 59px -17px rgba(14, 5, 10, 0.05);
  }

  .Class_list-carousel::after {
    content: url(~assets/img/People_write-left.png);
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: -3.125rem;
  }

  .Class_list-carousel::before {
    content: url(~assets/img/People_write-right.png);
    position: absolute;
    right: -3.125rem;
    top: 50%;
    margin-top: -11px;
  }

  .Class_list-carousel li {
    margin-top: 51px;
    width: calc(25% - 3px);
    border-right: 1px solid #dcc9b2;
    padding: 0px 30px;
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
    border-left: 1px solid #000;
    padding: 0px 5px 0px 8px;
  }

  .Class_list-carousel li span.dis_block span.c4a5 a {
    color: #c4a57f;
    border-color: #c4a57f;
  }

  /* .Class_list-content >.Class_list-content-img >span.lb_class{
    background: #ea9c91;
} */

  /*** 覆盖element-ui tabs **/
  .define-tabsClass_List {
  }

  .define-tabsClass_List .el-tabs__nav-scroll {
    overflow: hidden;
    height: 54px;
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
    width: 13px;
    height: 13px;
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
    bottom: 5px !important;
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
  .FourStores {
    .el-col-6{
      width: auto;
      margin-right: 25px;
    }
  }
  .FourStores .el-col {
    margin-bottom: 21px;
    position: relative;
    
  }
  .FourStores .el-col:hover .buy-model {
    display: block;
  }
  .FourStores .el-tabs__nav {
    width: 100%;
    text-align: center;
    padding-bottom: 22px;
  }
  .FourStores .el-tabs__active-bar {
    // left: 146px;
  }
  .FourStores .el-tabs__item.is-active {
    color: #c4a57f;
  }
  .FourStores .el-tabs__active-bar {
    display: none;
    background-color: transparent;
    width: 0px;
  }
  .FourStores .el-tabs__item.is-active {
    position: relative;
  }
  .FourStores .el-tabs__item.is-top:nth-child(2) {
    // padding-left: 20px !important;
  }
  .FourStores .el-tabs__item.is-top:last-child {
    // padding-right: 20px !important;
  }
  .FourStores .el-tabs__item:hover {
    color: #c4a57f;
  }
  .FourStores .el-tabs__item {
    color: #727172;
  }
  .FourStores .el-tabs__item.is-active::after {
    content: "";
    width: 15px !important;
    height: 15px;
    background: #c4a57f;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    bottom: -17px;
    border: 3px solid #fff;
    left: calc(35%);
    box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
  }
  .FourStores .el-tabs__nav-wrap::after {
    // display: inline-block;
    // width: 100%;
    // background: url(~assets/img/tabs_after.png) no-repeat;
    // position: absolute;
    // bottom: 3px;
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
  /* 购买-btn-model */
  .buy-model {
    background: rgba(0, 0, 0, 0.6);
    width: 231px;
    height: 231px;
    position: absolute;
    top: 0px;
    display: none;
    text-align: center;
    // opacity: 0.6;
  }
  .buy-model > p:nth-child(1) {
    
    padding-top: 97px;
    padding-bottom: 7px;
    letter-spacing:2px;
  }
  .buy-model > p:nth-child(2) {
    margin-top: 7px;
    margin-bottom: 27px;
    letter-spacing:1px;
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
  .el-main {
    background: white;
  }
}
</style>
