<template>
  <section class="searchssection">
    <div>
       <p class="Courselist_Search fz14 mb-15 fzMicroYaHei" style="color:rgba(153,153,153,1);" v-if="numbers>0">
          为您搜索到<span class="c1e7">{{numbers}}</span>个相关结果
        </p>
      <div class="Class_list-content"
         v-for="(item,index) in courselist"
        :key="item.courseFullId"
      >
        <!-- 全展示 -->
      <div  v-if="item.isFull">
          <quanfull :item="item" />
      </div>
      <!-- 单个单展示 -->
      <div v-if="!item.isFull">
        <dan :item="item"/>
      </div>
      <!-- 单阶列表-->
      <div class="SwiperSpace" v-if="item.isFull">
        <swiper             
          :swiperData="item.courseSingleResponseVos"
          :sum.sync="index"
          :ifs="Math.ceil(item.courseSingleResponseVos.length/4)"
        />
      </div>
      <div :class="{'app-abcd-eldiv8s':item.isFull}" >
       <div class="eldiv8s">
          <span></span>
       </div>
      </div>
      <!-- <div  v-if="sortType==2">
       <div class="app-sortType-eldiv8s">
          <span></span>
       </div>
      </div> -->
      <!-- 全下单 -->
      <div  v-if="item.isFull">
        <danfull :item="item"/>
      </div>
        <!-- <div class="clear" v-for="(item,index) in courselist" :key="index">
          <div class="dis_in_block pos_r Class_list-content-img">
            <img v-lazy="item.coursePictureUri" width="410" height="236" alt>
          </div>
          <div class="dis_in_block pos_r Class_list-content-text">
            <h3 class="fz24 fonS" style="font-weight:400;marginBottom:25px">{{item.courseName}}</h3>
            <p class="c9 fz14 fzMicroYaHei" style="height:181px;overflow: hidden;" v-if="item.courseType!=2">{{item.courseAbstract}}</p>
          </div>
        </div> -->
       
      </div>
    </div>
    <div class="m-auto afters" style="text-align:center;margin-bottom: 40px !important;margin-top:40px!important"  v-if="numbers<=0">{{tit}}</div>
    <!-- <ScrollBottom @timer="timer"  ref="mychild"/> -->
  </section>
</template>

<script>
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import quanfull from "@/components/classlistlevel/quanfull"; //全
import dan from "@/components/classlistlevel/dan"; //单
import danfull from "@/components/classlistlevel/danfull"; //全下单
import swiper from "@/components/classlistlevel/swiper"; //底部单阶商品的左右更多
export default {
  props: {
    searchtext: {
      type: null
    }
  },
  components: {
    ScrollBottom,
    quanfull,
    dan,
    danfull,
    swiper
  },
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null,
      courselist: [],
      numbers:null
    };
  },
  mounted() {
    this.getdata();
    // this.tit = "加载更多";
    //  this.$refs.mychild.get();
  },
  computed: {
    ...mapState({
      page: state => state.search.page
    })
  },
  methods: {
    ...mapMutations({
      changePage: "search/changePage" //我的课程获取list
    }),
    //倒计时
    timer(fn) {
      if(this.tit == "抱歉,没有搜索到相关内容"){
        return
      }
      let that = this;
      // this.$refs.mychild.get();
      // this.tit = "正在加载...";
      this.Timingopen = setInterval(function() {
        that.changePage();
        that.getListadd();
      }, 1000);
    },
    getListadd(){
       
        let that = this;
        clearInterval(this.Timingopen)
        this.$axios
        .post("/search/appCourselist", {
          pageIndex:this.page,
          searchKeyword: this.searchtext
        })
        .then(res => {
            let newarr = res.result.courseFullResponseVos
            if (newarr.length == 0) {
            this.tit = "抱歉,没有搜索到相关内容";
            this.$refs.mychild.gets();
          } else {
              newarr.forEach((item,i)=>{
                     that.courselist.push(item)
            })
            this.$refs.mychild.get();
             this.tit = "加载更多";
          }
        });
    },
    //初始获取数据
    getdata() {
      this.$axios
        .post("/search/appCourselist", {
          pageIndex: 1,
          searchKeyword: this.searchtext
        })
        .then(res => {
          this.courselist = res.result.courseFullResponseVos;
          this.numbers =  res.result.total
          if(this.numbers<=0){
            this.tit="抱歉,没有搜索到相关内容"
          }
          // if(this.courselist.length==0){
          //   this.$refs.mychild.gets()
          //   this.tit = "目前没有更多数据"
          // }else{
          //   this.$refs.mychild.get()
          //   this.tit = "加载更多"
          // }
          console.log(this.courselist,'我是课程搜索');
        });
    },
  }
};
</script>

<style lang="less">
.app-sortType-eldiv8s{
  height: 56px;
  span {
      display: inline-block;
      // margin-left: -200px;
    }
    span::after {
     content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 22px;
      height: 25px;
      top: -25px;
    }
}

.app-anddan-eldiv8ss:last-child{
  span{
    background: red;
  }
}
// .app-abcd-eldiv8s{
//   .eldiv8s{
//      display: block !important;
//   }
//   background: red;
 
// }
// .app-abcd-eldiv8s:last-child{
//   display: block;
  // display: none;
  // margin-bottom: 40px;
// }
.searchssection{
   .Class_list-content-text{
        vertical-align: top;
        margin-top: -5px !important;
        margin-left: 32px !important;
        width: 465px;
        height: 276px;
        .nobold{
              margin-bottom: 9px !important;
        }
  }
  padding-bottom: 50px;
  .Class_list-content{
  //  background: red;
  //  padding-bottom: 80px;
    .app-abcd-eldiv8s{
      // background: yellow;
      .eldiv8s{
         display: block !important;
      }
    }
  }
  .Class_list-content:last-child{
    // .app-abcd-eldiv8s{
    //   background: red;
    //    display: block !important;
    // }
    .app-sortType-eldiv8s{
      display: none;
    }
    .eldiv8s{
          display: none
    }
  }
    .eldiv8s {
    span {
      display: inline-block;
      // margin-left: -200px;
    }
    span::after {
      content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 50px;
      height: 25px;
      top: -25px;
    }
  }
  
.SwiperSpace {
  position: relative;
  height: 120px;
}
.el-carousel {
  width: 1120px;
  margin-left: -60px;
}
.tim {
  display: inline-block;
}
.btngreenover {
  width: 140px;
  height: 40px;
  background: #000000;
  opacity: 0.2;
  color: #fff;
  border-radius: 2px;
  font-size: 21px;
}
.btngreen-over {
  outline: none;
  width: 140px;
  height: 40px;
  background: #07767a;
  color: #fff;
  border-radius: 2px;
  border: none;
  font-size: 22px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.btn-yellow-border {
  cursor: pointer;
  font-size: 19px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.Class_list-content  .Class_list-content-img img {
  width: 488px;
  height: 291px;
}

.Class_list-content  .Class_list-content-img  span img {
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
.Fixedshape {
  width: 488px !important;
  height: 276px !important;
  display: inline-block;
  background-image: url("/img/timg.gif");
  background-position: center center;
}
.nobold {
  color: black !important;
  font-size: 24px;
  margin-top: 22px;
  margin-bottom: 32px;
  // font-family: FZXIYSK;
  font-family: FZXIYSK--GBK1-0;
}
.chapter {
  font-size: 14px;
  margin-left: 50px;
  font-weight: normal;
  color: #999999;
}
.price {
  top: 20px;
}
.price output {
  margin-bottom: 20px !important;
  display: inline-block;
}
.app-couse-yichu{
   overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.Class_list-carousel li:last-child {
    border-right: 0;
  }
}
 
</style>
