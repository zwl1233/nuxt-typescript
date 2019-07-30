<template>
    <section>
        <div class="Class_list-content">
        <p class="Courselist_Search fz14 mb-15 fzMicroYaHei" v-if="numbers" style="color:rgba(153,153,153,1);">
          为您搜索到<span class="c1e7">{{numbers}}</span>个相关结果
        </p>
        <div class="lectures-content app-search-lectures-content">
            <el-row :gutter="25">
              <el-col :span="8" v-for="(item,index) in coursefreelist" :key="item.courseId" style="marginBottom:45px;" >
                <a>
                  <div class="grid-content" style="marginBottom:20px">
                    <div  @click="click(item.courseId,item.discussionId)" style="width:317px;height:179px">
                      <img :src="item.courseThumPictureUri" alt style="width:317px;height:179px">
                    </div>
                    <div style="margin-top:16px">
                      <div class="dis_in_block"  style="width:200px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        <span class="c89 fz16">{{item.courseName}}</span>
                    
                      </div>
                      <div class="dis_in_block fr fz12 c9">
                        <span class="app-zwl-span-icon">
                          <i class="el-icon-view" style="font-size: 16px;"></i>
                          <label for class="iconNum">{{item.clickVolume}}</label>
                        </span>
                        <span class="ml-15 app-zwl-span-icon" style="transform: translateY(-3px);" @click="couselink(item.courseId,index)" >
                          <img class="app-star" :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')" alt="">
                          <label for style="vertical-align:text-bottom">{{item.likeNum||0}}</label>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
                <!-- <div v-if="isClass(index,videolist)" class="eldiv8s"><span></span></div> -->
              </el-col>
            </el-row>
          </div>
      </div>
        <p class="m-auto afters" style="text-align:center;margin-bottom: 40px !important;" @click="timer" >{{tit}}</p>
      <ScrollBottom @timer="timer" ref="mychild"/>
    </section>
</template>

<script>
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            tit: "加载更多", //加载更多提示文本
            Timingopen: null,
            coursefreelist:[],
            numbers:null
        }
    },
    props: {
    searchtext: {
      type: null
    }
    },
    components:{
        ScrollBottom
    },
     computed: {
    ...mapState({
      page: state => state.search.pageFree
    })
    },
    mounted() {
        this.getdata()
        this.tit = "加载更多";
        this.$refs.mychild.get();
    },
    methods: {
        ...mapMutations({
        changePage: "search/changepageFree" //我的课程获取list
        }),
        //传入id获取对应list详情    视频详情
        async click(id,discussionId) {
        this.$router.push({ path: "/VideoSharingDetails",query:{id:id,discussionId:discussionId} }); //跳转页面
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
            .post("search/coursefreelist", {
            pageIndex: this.page,
            searchKeyword: this.searchtext
            })
            .then(res => {
            let newarr = res.result.courseFreeResponseVos;
            if (newarr.length == 0) {
                this.tit = "抱歉,没有搜索到相关内容";
                this.$refs.mychild.gets();
            } else {
                newarr.forEach((item, i) => {
                that.coursefreelist.push(item);
                });
                this.$refs.mychild.get();
                this.tit = "加载更多";
            }
            });
        },
        //初始获取数据
        getdata() {
            // /search/coursefreelist
            //  searchKeyword: this.searchtext
        this.$axios
            .post("/search/coursefreelist", {
                pageIndex: 1,
               searchKeyword: this.searchtext
            })
            .then(res => {
                this.coursefreelist = res.result.courseFreeResponseVos
                 this.numbers =  res.result.total
                 console.log(res.result.courseFreeResponseVos,'我是视频搜索')
                if(this.coursefreelist.length==0){
                    this.$refs.mychild.gets()
                    this.tit = "抱歉,没有搜索到相关内容"
                }else{
                    this.$refs.mychild.get()
                    this.tit = "加载更多"
                }
            // console.log(this.coursefreelist,'我是课程搜索');
            });
        },
        //课程点赞
        couselink(id,index){
            this.$axios.post("/coursefree/praise",{
            courseFreeId:id,
            token:''
            }).then((res)=>{
                if(res.code==0){
                     this.coursefreelist[index].isLiked = true
                     this.coursefreelist[index].likeNum++
                }
                console.log(res)
            })
        }
    },
}
</script>

<style lang="less">
.app-search-lectures-content::after{
    display: none;
}
.lectures-content
  .grid-content:hover{
    >div{
      position: relative;
    }
    >div:nth-child(1)::after{
     cursor: pointer;
      content: url(~assets/img/ico-FreeVideo-cf.png);
      width: 317px;
      height: 179px;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0px;
      text-align: center;
      vertical-align: middle;
      left: 0px;
      line-height: 210px;
    }
    >div:nth-child(2){
       > div.dis_in_block:nth-child(1) {
        cursor: pointer;
        color: #b19575;
      }
      > div.dis_in_block:nth-child(1)
      > span {
        color: #b19575;
      }
    }
  }
  .app-zwl-span-icon{
    display: inline-block;
    height: 18px;
    line-height: 18px;
    .iconNum{
          vertical-align: super;
    }
  }
</style>
