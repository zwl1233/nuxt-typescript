<template>
  <article class="w1140 m-auto">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mt-40 dis_in_block fzGB1-0  ">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Videosharing' }">视频分享</el-breadcrumb-item>
      <!-- <el-breadcrumb-item ><span class="cb19">【林曦老师欢迎你】暄桐教室线上课程</span></el-breadcrumb-item> -->
    </el-breadcrumb> 
    <div class="w1000 m-auto">
      <div class="fz18 cb19 mt-60">
        <!-- <img class="middle" :src="require('@/assets/img/ico-FreeVideo-cb19.png')" alt> -->
        <img class="middle app-change-icon" :src="require('@/assets/changeIcon/3.png')" alt> 
        <span class="middle">视频分享</span>
      </div>
      <div class="FreeVideo_lectures-content">
        <div class="w1000 m-auto">
          <div class="lectures-content">
            <el-row :gutter="25">
              <el-col :span="8" v-for="(item,index) in videolist" :key="item.courseId" style="marginBottom:45px;" >
              <!-- :class="{eldiv8s:(index%3)+1==1}" -->
              <!-- {{(index%3)+1==1}} -->
                <a>
                  <!-- href="VideoSharingDetails" -->
                  <div class="grid-content" style="marginBottom:20px">
                    <div  @click="click(item.courseId,item.discussionId)">
                      <img :src="item.courseThumPictureUri" alt width="317" height="179">
                    </div>
                    <div>
                      <div class="dis_in_block"  style="width:200px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        <span class="c89 fz16 ">{{item.courseName}}</span>
                        <!-- <span class="fz12 c4a5">|</span> -->
                        <!-- <span class="c5957 fz16 " >{{item.courseAbstract}}</span> -->
                      </div>
                      <div class="dis_in_block fr fz12 c9">
                        <span>
                          <i class="el-icon-view" style="font-size: 16px;vertical-align:sub"></i>
                          <label for class="iconNum">{{item.clickVolume}}</label>
                          <!-- <span>{{item.clickVolume}}</span> -->
                        </span>
                        <!-- <span class="ml-15" @click="couselink(item.courseId)" v-if="!item.isLiked">
                          <i class="el-icon-star-off" style="font-size: 16px;"></i>
                          <label for>{{item.likeNum||0}}</label>
                        </span>
                        <span class="ml-15"  v-if="item.isLiked" >
                          <i class="el-icon-star-off" style="color:red;font-size: 16px" ></i>
                          <label for>{{item.likeNum}}</label>
                        </span> -->
                        <span class="ml-15" @click="couselink(item.courseId)" >
                          <img class="app-star" :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')" alt="">
                          <span style="display:inline-block;transform:translateY(-1px)">{{item.likeNum||0}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
                <div v-if="isClass(index,videolist)" class="eldiv8s"><span></span></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--分页-->
        <div class="clear text-center mt-20">
            <!-- <span class="demonstration">页数较少时的效果</span> -->

          <!-- <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagenum"
            ></el-pagination>
          </div> -->
          <Pagination :total="pagenum" :pageSize="size" :getList="getList"></Pagination>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Pagination from "@/components/Pagination"
export default {
  data() {
    return {
      activeName: "second",
      videolist: [],
      pages:1,
      pagenum: 0,
      size:10,
    };
  },
  mounted() {
    this.getdata();
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
    // 判断是否含有类名
    isClass(index,ary){
      console.log(index+1,ary.length,'length')
      if(index+1==ary.length-2){
        return
      }
      if(ary.length%3==0){
        if(index%3==0){
          return true
        }else{
          return false
        }
      }else{
        let n=ary.length%3//1 2
        if(n==1){
          if(index%3==0){
            if(index==ary.length-1){
              return false
            }else{
              return true
            }
          }
        }
        if(n==2){
          if(index%3==0){
            if(index==ary.length-2){
              return false
            }else{
              return true
            }
          }
        }
        
      }
      
    },
    ...mapMutations({
      changetab: "Video/changeID", //我的课程切换tab
      // changeList: "Video/changeList"
    }),
    //初始获取list数据
    async getdata() {
      let data = await this.$axios.post("/coursefree/list", {
        pageIndex: 1,
        token: ''
      });
      console.log(data, "我是视频分享");
      this.pagenum=data.result.total
      this.size=data.result.size
      this.videolist = data.result.courseFreeResponseVos;
    },
    //传入id获取对应list详情    视频详情
    async click(id,discussionId) {
      this.$router.push({ path: "/VideoSharingDetails",query:{id:id,discussionId:discussionId} }); //跳转页面
    },
    getList(page){
      this.pages = page
      this.$axios.post("/coursefree/list",{
        token:"",
        pageIndex:page||1
      }).then((res)=>{
        if(res.code==0){
          this.pagenum=res.result.total
          this.size=res.result.size
          this.videolist = res.result.courseFreeResponseVos;
        }
      })
    },
    //课程点赞
    couselink(id){
      this.$axios.post("/coursefree/praise",{
       courseFreeId:id,
       token:''
      }).then((res)=>{
        if(res.code==0){
        this.getList(this.pages)
        }
          console.log(res)
      })
    }
  },
  components: {
    Pagination
  }
};
</script>

<style lang="less">
.el-main {
  background: white;
}
.FreeVideo_lectures-content{
  .el-row{
    .el-col{
        .eldiv8s{
          // background: red;
        }
    }
  }
 .eldiv8s{
   span:last-child{
     background: red;
   }
 }
 .eldiv8s{
  position: absolute;
  span{
    display:inline-block;
    width: 1000px;
  }
  span::after{
    position: absolute;
     content: url(~assets/img/turnOrder.png);
    
    // content: url(~assets/img/lectures.png);
    width: 100%;
    margin: 0px auto;
    display: inline-block;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    height: 25px;
    top:-25px;
  }
}
}

.lectures-content::after {
  display: none !important;
  content: url(~assets/img/lectures.png);
  width: 100%;
  margin: 0px auto;
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
/****免费视频及讲座-list****/
.FreeVideo_lectures-content {
  margin-top: 36px;
}
.FreeVideo_lectures-content .lectures-content .grid-content > div:nth-child(1) {
  width: 317px;
  height: 179px;
  position: relative;
}

.FreeVideo_lectures-content 
  .lectures-content
  .grid-content:hover{
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
// .FreeVideo_lectures-content 
//   .lectures-content
//   .grid-content
//   > div:nth-child(1):hover::after {
//   cursor: pointer;
//   content: url(~assets/img/ico-FreeVideo-cf.png);
//   width: 317px;
//   height: 179px;
//   background: rgba(0, 0, 0, 0.6);
//   position: absolute;
//   top: 0px;
//   text-align: center;
//   vertical-align: middle;
//   left: 0px;
//   line-height: 210px;
// }
.FreeVideo_lectures-content
  .lectures-content
  .grid-content
  > div:nth-child(1)
  > img {
  width: 100%;
  height: 100%;
}
.FreeVideo_lectures-content .lectures-content .grid-content > div:nth-child(2) {
  margin-top: 16px;
}
.FreeVideo_lectures-content
  .lectures-content
  .grid-content
  > div:nth-child(2)
  > div.dis_in_block:nth-child(1) {
  overflow: hidden;
  width: 190px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .FreeVideo_lectures-content
//   .lectures-content
//   .grid-content
//   > div:nth-child(2)
//   > div.dis_in_block:nth-child(1):hover {
//   cursor: pointer;
//   color: #b19575;
// }
// .FreeVideo_lectures-content
//   .lectures-content
//   .grid-content
//   > div:nth-child(2)
//   > div.dis_in_block:nth-child(1):hover
//   > span {
//   color: #b19575;
// }
.FreeVideo_lectures-content
  .lectures-content
  .grid-content
  > div:nth-child(2)
  > div.dis_in_block:nth-child(2) {
  height: 18px;
  line-height: 18px;
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
</style>
