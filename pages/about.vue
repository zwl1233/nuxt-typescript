<template>
  <section class="app-about">
    <article class="w1000 m-auto">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-left:-70px"
        class="mt-40 dis_in_block fzMicroYaHei"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于暄桐</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs class="listTabs app-about-listTabs" v-model="tabId" @tab-click="typelist">
        <el-tab-pane
          v-for="(item,index) in articleTypelist"
          :label="item.typeName"
          :key="item.typeId"
          :name="item.typeId.toString()"
        >
          <div class="aboutTab clear w1000 mt-20" v-if="index==2||index==3">
            <div
              class="flex pos_r"
              style="padding-left:70px;box-sizing:border-box;marginTop:50px;marginBottom:25px"
            >
              <h3
                class="fz20 dis_in_block mr-60 fzGB1-0"
                style="font-weight:600;margin-left: -70px;"
              >
                授课老师
                <p style="margin-top:10px">林曦</p>
              </h3>
              <ul class="dis_in_block fzGB1-0">
                <li>林曦，水墨画家，1983年生于重庆，暄桐教室的创办人与授课老师。</li>
                <li>毕业于中央美术学院，擅长描绘当下的生活，笔墨师法古人，有朴拙天真的样子，也细腻灵动，尤其喜画花朵、孩童、案头玩意等美好小景。</li>
                <li>受家庭熏陶，她从小就很喜欢并且有机会深入学习体验中国传统，尤其喜爱书法。学习过程中，有幸与诸位大德名士结缘，被教导，并熏习其中，在举办画展、出版诗文画集、古琴与音乐专辑的同时，一直致力于中国文人传统美学和生活方式的转译与传播。</li>
              </ul>
              <div class="pos_a dis_in_block" style="height:280px">
                <img :src="require('@/assets/img/list_img1.png')" alt style="height:100%">
              </div>
            </div>
            <div class="eldiv8s">
              <span></span>
            </div>
          </div>

          <!-- <div class="boxShadow-tabBoottom"></div> -->
          <AboutList :articleList="articleList" :key="item.typeId"/>
        </el-tab-pane>
      </el-tabs>
      <div class="m-auto afters" @click="timer" v-if="flag">{{tit}}</div>
      <ScrollBottom @timer="timer" ref="mychild"/>
    </article>
  </section>
</template>

<script>
//list组件
import AboutList from "@/components/about/aboutList"; //渲染列表组件
//加载更多组件
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    AboutList,
    ScrollBottom
  },
  data() {
    return {
      Timingopen: null,
      flag: true,
      tit: "加载更多",
      articleTypelist: [], //tab切换
      articleList: [] //数据
    };
  },
  computed: {
    ...mapState({
      // tabId: state => state.about.tabId, //tabid
      page: state => state.about.page //page页码
    })
  },
  mounted() {
    console.log(this.tabId,"tab")
    this.getdata();
  },
  methods: {
    ...mapMutations({
      changeTab: "about/changeTab", //切换tab
      changePage: "about/changePage" //加载更多
    }),
    //点击加载
    //初始获取数据
    getdata() {
      this.$axios.post("article/typelist").then(res => {
        this.articleTypelist = res.result;
      });
      this.$axios
        .post("article/list", {
          columnId: 1,
          pageIndex: 1
        })
        .then(res => {
          this.articleList = res.result.artivityResponseVos;
          if (this.articleList.length == 0) {
            this.$refs.mychild.gets();
            this.tit = "这里是全部信息列哦!";
          } else {
            this.$refs.mychild.get();
            this.tit = "加载更多";
          }
        });
    },
    //点击tab切换时切换数据
    async typelist(tab) {
      console.log(tab)
      let index = tab.name;
      // if (index == 4) {
      //   index = 3;
      //   this.changeTab(index.toString());
      //   this.getList("add");
      //   return;
      // }
      // if (index == 3) {
      //   index = 4;
      //   this.changeTab(index.toString());
      //   this.getList("add");
      //   return;
      // }

      this.changeTab(index.toString());
      this.getList("add");
    },
    //获取aboutList数据
    async getList(type) {
      let that = this;
      clearInterval(that.Timingopen);
      let data = await this.$axios.post("article/list", {
        //获取对应数据
        columnId: this.tabId,
        pageIndex: this.page||1
      });
      let newarr = data.result.artivityResponseVos;
      console.log(newarr, "new");
      if (type !== undefined) {
        this.articleList = newarr;
        if (newarr.length == 0) {
          that.tit = "目前没有更多数据";
          that.$refs.mychild.gets();
        } else {
          that.tit = "加载更多";
          that.$refs.mychild.get();
        }
      } else {
        //没有数据的时候
        if (newarr.length == 0) {
          that.tit = "目前没有更多数据";
          that.$refs.mychild.gets();
        }
        //接口继续添加数据
        else {
          newarr.forEach((item, i) => {
            that.articleList.push(item);
          });
          that.tit = "加载更多";
          that.$refs.mychild.get();
          console.log(this.tabId, this.page);
        }
      }
    },
    timer(fn) {
      if (this.tit == "目前没有更多数据") {
        return;
      }
      fn = null; //关闭滚动条
      let that = this;
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.changePage();
        that.getList();
      }, 1000);
    }
  },
  computed:{
    tabId: {
      get() {
        return this.$store.state.about.tabId;
      },
      set(newVal) {
        console.log(newVal);
        this.$store.state.about.tabId = newVal;
      }
    }
  }
};
</script>

<style lang="less" >
.app-about {
  .el-tabs__content {
    overflow: inherit !important;
  }
  .eldiv8s {
    position: absolute;
    span {
      display: inline-block;
      width: 1000px;
    }
    span::after {
      position: absolute;
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
  .el-tabs__active-bar {
    // left: -35px;
  }
  .el-tabs__content {
    // margin-top: 50px;
  }
  height: 100%;
  width: 100%;
  background: white;
  padding-bottom: 55px;
  .app-about-listTabs {
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
    }

    .el-tabs__active-bar{
      border: none !important;
      background: transparent;
      // margin-left: 20%;
      &::after{
        content:"";
        display: block;
        position: absolute;
        width: 78px;
        height: 2px;
        background: #333333;
        left: 50%;
        transform: translateX(-50%);
      }
      
    }


    margin-top: 60px;
    .el-tabs__header.is-top{
      margin-bottom: 0!important;
    }
    .el-tabs__item {
      // font-family: FZXIYSK--GBK1-0 !important;
      font-size: 18px;
      margin-bottom: 10px;
      // font-weight: bold;
      padding: 0 40px!important;
      &#tab-1{
        padding-left: 20px!important;
      }
      &#tab-3{
        padding-right: 20px!important;
      }
      
    }
    .el-tabs__item:hover {
      color: #000;
    }
  }
}
.afters {
  width: 100%;
  text-align: center;
}
.olli {
  height: auto;
}
.aa {
  color: red;
}
.aboutTab {
  .el-tabs__nav.is-top {
    left: 40%;
  }
  /* box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05) */
}
.aboutTab > div.flex > h3 {
  width: 84px;
  font-size: 20px;
}

.aboutTab > div.flex > ul {
  width: 475px;
  font-size: 17px;
  opacity: 0.8;
  font-weight: bold;
  // font-family:FZLTXHJW--GB1-0;
}

.aboutTab > div.flex > ul li {
  margin-bottom: 20px;
  font-size: 17px;
  line-height: 24px;
}

.aboutTab > div.flex > div.pos_a {
  position: absolute;
  right: 60px;
}

.boxShadow-tabBoottom {
  box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  height: 2px;
  clear: both;
}

.listContent {
  padding-top: 82px;
  // padding-bottom: 40px;
  /* box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05); */
  // box-shadow: 0 20px 53px -12px rgba(14, 5, 10, 0.05);
}

.listContent > ol > li {
  margin-bottom: 70px;
}

.listContent > ol > li h3 {
  margin-bottom: 20px;
  position: relative;
}

.listContent > ol > li h3 time {
  /* content: ''; */
  width: 45px;
  height: 39px;
  border-radius: 50%;
  display: inline-block;
  background: rgba(245, 245, 245, 1);
  position: absolute;
  left: -60px;
  top: -8px;
  font-size: 13px;
  text-align: center;
  padding-top: 0.375rem;
  color: #999;
}

.listContent > ol > li h3 + div > div:last-child {
  position: relative;
  height: auto;
  padding-left: 50px;
}

.listContent > ol > li h3 + div > div:last-child p {
  position: absolute;
  bottom: 0px;
}

.listTabs .el-tabs__item.is-active {
  color: #000;
}

.listTabs .el-tabs__nav {
  text-align: center;
  // width: 100%;
}


.el-tabs__nav {
  text-align: center;
  // width: 100%;
}
</style>