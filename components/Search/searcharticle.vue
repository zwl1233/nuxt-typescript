<template>
  <section>
    <div>
      <div class="Class_list-content articleDefine fzMicroYaHei " style="color:rgba(153,153,153,1);">
        <p class="Courselist_Search fz14 mb-15" v-if="numbers">
          为您搜索到<span class="c1e7">{{numbers}}</span>个相关结果
        </p>
        <div class="clear" v-for="(item,index) in articlelist" :key="index">
          <h3 class="fz24 c30 pos_r">
            <span class="fonS" style="font-weight:normal;">{{item.articleColumn}} | {{item.articleTitle}}</span>
          </h3>
          <div class="dis_in_block pos_r Class_list-content-img">
            <img v-lazy="item.thumbUrl" style="width:410px;height:236px" alt>
          </div>
          <div class="dis_in_block pos_r Class_list-content-text" style="width:557px;height:236px">
            <p class="c9 fz14 fonS" style="overflow: hidden;">{{item.articleIntroduction}}</p>
            <a :href="item.articleUrl" target="view_frame" style="bottom:auto!important" @click="clickNum(item.articleId)" class="fz14 c077 pos_a fzGB1-0">查看全文</a>
          </div>
        </div>
      </div>
    </div>
    <div class="m-auto afters" style="text-align:center;margin-bottom: 40px !important;" @click="timer" v-if="flag">{{tit}}</div>
    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    ScrollBottom
  },
  props: {
    searchtext: {
    
      type: null
    }
  },
  data() {
    return {
       tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null,
      articlelist: [],
       numbers:null
    };
  },
  mounted() {
    this.getdata();
    this.tit = "加载更多";
    this.$refs.mychild.get();
  },
  computed: {
    ...mapState({
      page: state => state.search.pageach
    })
  },
  methods: {
    ...mapMutations({
      changePage: "search/changePageach" //我的课程获取list
    }),
    clickNum(id){
       this.$axios
        .post("article/addClickNum", {
          articleId: id,
        })
        .then(res => {
            console.log(res)
        })
        
    },
    timer(fn) {
      if(this.tit == "抱歉,没有搜索到相关内容"){
        return
      }
      let that = this;
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      this.Timingopen = setInterval(function() {
        that.changePage();
        that.getListadd();
      }, 1000);
    },
    getListadd() {
      
      let that = this;
      clearInterval(this.Timingopen);
      this.$axios
        .post("/search/articlelist", {
          pageIndex: this.page,
          searchKeyword: this.searchtext
        })
        .then(res => {
          let newarr = res.result.searchArticleResponseVos;
          if (newarr.length == 0) {
            this.tit = "抱歉,没有搜索到相关内容";
            this.$refs.mychild.gets();
          } else {
            newarr.forEach((item, i) => {
              that.articlelist.push(item);
            });
            this.$refs.mychild.get();
            this.tit = "加载更多";
          }
        });
    },
    getdata() {
      this.$axios
        .post("/search/articlelist", {
          pageIndex: 1,
          searchKeyword: this.searchtext
        })
        .then(res => {
          this.articlelist = res.result.searchArticleResponseVos;
          this.numbers =  res.result.total
          if(this.articlelist.length==0){
            this.$refs.mychild.gets()
            this.tit = "抱歉,没有搜索到相关内容"
          }else{
            this.$refs.mychild.get()
            this.tit = "加载更多"
          }
          console.log(this.articlelist,'我是搜索文章');
        });
    },
  }
};
</script>

<style>
</style>
