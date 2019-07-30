<template>
  <section class="homePage_index">
    <div
      v-swiper:mySwiper="swiperOption"
      class="app-change-swiper"
      v-if="picAry.length>0"
      @mouseover="hideFlag=true"
      @mouseleave="hideFlag=false"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in picAry" :key="item.id">
          <a :href="item.pictureJumpUrl" target="view_window">
            <img :src="item.pictureUri" alt style="width:100%;min-height:400px">
          </a>
        </div>
      </div>
      <div class="swiper-button-prev" v-show="hideFlag">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="swiper-button-next" v-show="hideFlag">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <!-- <el-main style="margin-top:0;width:1366px;margin:0 auto;" class="app-home-page"> -->
    <!-- 图标 -->
    <div class="app-change-index-box" v-if="false">
      <ul class="home_icon">
        <li @click="jump('1')">
          <img :src="require('@/assets/img/图层 78@2x.png')" alt>
          <span style="color:#087276">上课</span>
        </li>
        <li @click="jump('2')">
          <img :src="require('@/assets/img/图层 79@2x.png')" alt>
          <span style="color:#cf7065">报名</span>
        </li>
        <li @click="jump('3')">
          <!-- <img
            src="/img/图层 81@2x.png"
            alt=""
          >-->
          <img :src="require('@/assets/img/图层 81@2x.png')" alt>
          <span style="color:#008aba">赠课给朋友</span>
        </li>
        <li @click="jump('4')">
          <img :src="require('@/assets/img/图层 82@2x.png')" alt>
          <span style="color:#bb5b83">视频</span>
        </li>
      </ul>
    </div>
    <!-- </el-main> -->
    <!-- 写字课 -->
    <div class="app-change-index-box" style="background:#f7f3f0">
      <Writing :writedataAry="writedataAry"/>
    </div>
    <!-- <el-main
      style="margin-top:0;width:100%;margin:0 auto;"
      class="app-home-page app-change-index-content"
    >-->
    <!-- 养生课 -->
    <div class="app-change-index-box" style="background:RGBA(255, 253, 249, 1)">
      <div style="width:100%;background:#FFFCF9">
        <div class="HealthClass">
          <h1 class="les">
            养生课
            <p class="app-index-Subheading">中医养生基础课</p>
          </h1>
          <el-carousel
            ref="autoPic"
            style="marginTop:60px;width:100%;marginLeft:0px"
            indicator-position="none"
            arrow="never"
          >
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="autoPic">
                <img :src="require('@/assets/img/Health_class1.png')" alt>

                <img :src="require('@/assets/img/Health_class2.png')" alt>
              </div>
            </el-carousel-item>
          </el-carousel>

          <p class="lookAll les">
            <nuxt-link to="/classList?tabid=4" class="app-index-look-more">查看所有课程</nuxt-link>
          </p>
          <div class="HealthClass-arrow HealthClass-arrow-left" @click="prev">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="HealthClass-arrow HealthClass-arrow-right" @click="next">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- <HealthClass/> -->
    <!--读书课 -->
    <div class="app-change-index-box" style="background:RGBA(255, 253, 249, 1)">
      <div class="readClass">
        <h1 class="les">
          读书课
          <p class="app-index-Subheading">慢慢读书</p>
        </h1>
        <div class="auto_read_class">
          <div class="auto_read_class_left">
            <el-carousel
              style="width:424px;margin-left:0"
              height="276px"
              arrow="never"
              ref="readClassAutoPic"
            >
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="auto_read_class_left_autoPic">
                  <img :src="require('@/assets/img/Reading_class1.png')" alt>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="readClass-arrow readClass-arrow-left" @click="readClassPrev">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="readClass-arrow readClass-arrow-right" @click="readClassNext">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="auto_read_class_right" style="width:489px">
            <img v-lazy="require('@/assets/img/FreeVideo_lectures8.png')" alt>
            <!-- <el-carousel style="width:488px" height="276px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="auto_read_class_right_autoPic">
                  <img :src="require('@/assets/img/Reading_class1.png')" alt>
                </div>
              </el-carousel-item>
            </el-carousel>-->
          </div>
        </div>
        <p class="lookAll les">
          <nuxt-link to="/classList?tabid=2" class="app-index-look-more">查看所有课程</nuxt-link>
        </p>
      </div>
    </div>
    <!--免费视频 -->
    <div class="app-change-index-box" style="background:RGBA(255, 253, 249, 1)">
      <Freevideo v-if="FreevideodataAry" :FreevideodataAry="FreevideodataAry"/>
    </div>
    <!--教室与老师 -->
    <div class="app-change-index-box" style="background:RGBA(255, 252, 249, 1)">
      <div class="ClassroomAndTeache">
        <h1 class="les">
          教室与老师
          <p class="app-index-Subheading">一间关于美的教室，以传统文化与技艺，滋养当下生活</p>
        </h1>
        <div class="Image">
          <ul>
            <li id="login_container">
              <a href="javascript:;" @click="jumpAbout(4)">
                <img :src="require('@/assets/img/Classroom_teacher1.png')" alt >
                <dl>
                  <dt>暄桐教室</dt>
                  <dd style="padding:0 34px">一间美育教室，以书法为起点，亲近中国传统之美，滋养当下生活</dd>
                </dl>
              </a>
            </li>
            <li>
              <a href="javascript:;" @click="jumpAbout(3)">
                <img :src="require('@/assets/img/Classroom_teacher2.png')" alt>
                <dl>
                  <dt>林曦</dt>
                  <dd style="padding:0 34px">水墨画家，毕业于中央美术学院，暄桐教室的创办人与授课老师</dd>
                </dl>
              </a>
            </li>
            <li>
              <a href="javascript:;" @click="jumpAbout(2)">
                <img :src="require('@/assets/img/Classroom_teacher3.png')" alt>
                <dl>
                  <dt>暄桐线上课</dt>
                  <dd style="padding:0 34px">暄桐教室为喜爱传统文化艺术的同好所精心设置的线上教学系统</dd>
                </dl>
              </a>
            </li>
          </ul>
        </div>
        <p class="lookAll les">
          <a href="about" class="app-index-look-more">查看更多</a>
        </p>
      </div>
    </div>
    <!--同学作品 -->
    <!-- <div class="app-change-index-box"> -->
    <div class="ClassmateWorks">
      <h1 class="les" style="width:1000px;margin:0 auto;">
        同学作业分享
        <p class="app-index-Subheading">从第一笔至今，每一步都踏实</p>
      </h1>
      <div class="tabworks">
        <ClassmateWorks v-if="ClassmateWorksImg" :imgArys="ClassmateWorksImg"/>
      </div>
      <p class="lookAll les" style="margin:0 auto;margin-top:70px;width:1000px;">
        <a href="Students_homework" class="app-index-look-more">查看更多</a>
      </p>
    </div>
    <!-- </div> -->
    <!-- 写字的人 -->
    <div class="app-change-index-box" style="background:RGBA(255, 252, 249, 1)">
      <writerpeople v-if="writepeopledataAry" :writepeopledataAry="writepeopledataAry"/>
    </div>
    <!--文房商店 -->
    <div class="app-change-index-box" style="background:RGBA(255, 253, 249, 1)">
      <LibraryShop v-if="shopdataAry" :shopdataAry="shopdataAry"/>
    </div>
    <!-- <Signin ref="child"/> -->
    <!-- <BackTop/> -->
    <!-- </el-main> -->
  </section>
</template>
<script>
import Signin from "@/components/login/SINGNIN";
import ClassmateWorks from "@/components/index/ClassmateWorks"; //写字课
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Writing from "@/components/index/Writing"; //写字课
import Freevideo from "@/components/index/Freevideo"; //免费视频
import writerpeople from "@/components/index/writerpeople"; //写字的人
import LibraryShop from "@/components/index/LibraryShop"; //免费视频
// import BackTop from "@/components/BackTop"; //回到顶部
// import HealthClass from "@/components/index/HealthClass";//养生课

export default {
  layout: "homePage_index",
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
    })
  },
  asyncData() {
    console.log((window.screen.availHeight * 2) / 3);
    return {
      H: (window.screen.availHeight * 2) / 3
    };
  },
  data() {
    return {
      flag: false,
      picAry: [], //首页轮播
      writedataAry: [], //写字课数据
      ClassmateWorksImg: null, //同学作品轮播
      FreevideodataAry: null, //免费视频数据
      writepeopledataAry: null, //写字的人
      shopdataAry: null, //商店
      picFlagAry: [],
      autoFlag: false,
      swiperOption: {
        loop: true,
        autoplay: true,
        allowTouchMove: false,
        // slidesPerView: "auto",
        // centeredSlides: true,
        // spaceBetween: 30,
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true
          // paginationClickable:true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      hideFlag: false,
    };
  },
  components: {
    Writing, //写字课
    Freevideo, //免费视频
    writerpeople, //写字的人
    LibraryShop, //文房商店
    ClassmateWorks,
    // BackTop,
    Signin
    // HealthClass,//养生课
  },
  mounted() {
    console.log(this.$selfMsg, "thisthis");
    // console.log(this.$refs.child,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    // this.$refs.child.changgif(2);
   

    this.backPos();

    this.getPic();
    this.getwritedata();
    this.getFreevideodata();
    this.workstudents();
    this.getshopdata();
    this.getwriterpeople();
  },
  methods: {
    //路由跳转
    jump(kind) {
      switch (kind) {
        case "1":
          if (this.userstoken) {
            this.changeTabId("0");
            this.chanaddtext("我的课程");
            this.$router.push("/My");
          } else {
            this.Loginpage(true);
          }
          break;
        case "2":
          this.$router.push("/classList");
          break;
        case "3":
          this.$router.push("/classList");
          break;
        case "4":
          this.$router.push("/Videosharing");
          break;
      }
    },
    ...mapMutations({
      backPos: "system/backPos",
      changeTabId: "my/changeTabId", //改变tabId
      chanaddtext: "my/chanaddtext",
      Loginpage: "login/Loginpage", //弹出登录框
      changeTab: "about/changeTab" //切换关于页面的tab
    }),
    //判断图片尺寸 自适应处理
    pictureAuto(url, index) {
      //获取屏宽
      let W = document.documentElement.clientWidth;
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width < W) {
          //平铺情况下能否铺满屏
          console.log("宽高", img.width, img.height, W);
          this.picFlagAry[index] = true;
        }
      };
    },
    //上一张
    prev() {
      this.$refs.autoPic.prev();
    },
    next() {
      this.$refs.autoPic.next();
    },
    readClassPrev() {
      this.$refs.readClassAutoPic.prev();
    },
    readClassNext() {
      this.$refs.readClassAutoPic.next();
    },
    //获取轮播图
    getPic() {
      this.$axios.post("/carouselimg/list").then(res => {
        if (res.code == 0) {
          this.picAry = res.result;
          res.result.forEach((item, index) => {
            this.picFlagAry[index] = false;
            this.pictureAuto(item.pictureUri, index);
          });
        }
      });
    },
    //同学作品
    workstudents() {
      this.$axios
        .post("/production/recommendlist", {
          pageIndex: 1,
          token: ""
        })
        .then(res => {
          this.ClassmateWorksImg = res.result.productionResponseVos;
          console.log(this.ClassmateWorksImg, "ttttttttttttttttttttttttttt");
        });
    },
    //免费视频
    getFreevideodata() {
      this.$axios
        .post("/coursefree/recommendlist", { pageIndex: 1 })
        .then(res => {
          //  this.FreevideodataAry = res.result.courseFreeResponseVos
          //默认获取第一条
          let videoinfo = res.result.courseFreeResponseVos;
          this.$axios
            .post("utility/getUrl", { key: videoinfo[0].courseVideoUri })
            .then(data => {
              if (data.code == 0) {
                videoinfo[0].courseVideoUri = [
                  {
                    name: "高清",
                    url: data.result.highUrl
                  },
                  {
                    name: "标清",
                    url: data.result.url
                  },
                  {
                    name: "流畅",
                    url: data.result.lowUrl
                  }
                ]; //data.result
                this.FreevideodataAry = videoinfo;
              }
            });
        });
    },
    //写字课
    getwritedata() {
      this.$axios
        .post("/course/recommendlist", { courseTypeKey: "7", token: "" })
        .then(res => {
          this.writedataAry = res.result.courseFullResponseVos[0];
          console.log(res.result.courseFullResponseVos[0], "写字课");
        });
    },
    //教室与老师
    // getteachdata(){
    //    this.$axios.post("/article/recommendlist",{token:''}).then(res=>{
    //         console.log(res,'教室与老师')
    //     });
    // },
    //写字的人
    getwriterpeople() {
      this.$axios.post("/article/recommendlist", {}).then(res => {
        this.writepeopledataAry = res.result.artivityResponseVos;
      });
    },
    //商品
    async getshopdata() {
      let shopdata = await this.$axios.post("/commodity/recommendlist", {}); //商店
      let shopdataArys;

      shopdataArys = shopdata.result.commodityResponseVos;
      // shopdataArys.forEach((item, i) => {
      //   shopdataArys.push(item);
      // });
      // shopdataArys.forEach((item, i) => {
      //   shopdataArys.push(item);
      // });
      // shopdataArys.forEach((item, i) => {
      //   shopdataArys.push(item);
      // });
      this.shopdataAry = shopdataArys; //商店
    },
    //跳转关于
    jumpAbout(tabId) {
      this.changeTab(tabId.toString());
      this.$router.push("about");
    }
  }
};
</script>

<style lang="less" scoped>
// 衍生body 首页
.homePage_index {
  background: RGBA(255, 253, 249, 1);
  min-width: 1366px;
  //轮播图
  .app-change-swiper {
    margin-top: 75px;
    max-width: 1920px;
  }
  //图标
  .home_icon {
    width: 1000px;
    background: RGBA(255, 252, 249, 1);
  }
  //写字课
  .Writingclass {
    width: 1000px;
    margin: 0 auto;
  }
  //养生课
  //读书课
  .readClass {
    background: RGBA(255, 253, 249, 1);
  }
  //视频分享
  .app-FreeVideo {
    background: RGBA(255, 253, 249, 1);
  }
  //教室与老师
  .ClassroomAndTeache {
    background: RGBA(255, 252, 249, 1);
    margin-bottom: 40px;
    padding-bottom: 60px;
  }
  //同学作品
  .ClassmateWorks {
    background: RGBA(255, 252, 249, 1);
  }
  //写字的人
  .Writer {
    background: RGBA(255, 252, 249, 1);
  }
  //文房商店
  .LibraryShop {
    background: RGBA(255, 252, 249, 1);
  }
}
</style>


<style lang="less" scoped>
// 首页轮播图
.app-change-autoPic {
  width: 100%;
  min-width: 1366px;
  .thumbImg {
    width: 100%;
    height: auto;
  }
  .el-carousel__container {
    height: auto !important;
    .el-carousel__item,
    .el-carousel__mask {
      height: auto;
    }
  }
}
// margin-top: -75px;
/* 轮播图 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.app-homePage-autoImg {
  min-width: 1366px;
  width: 100%;
  height: 698px;
  background-repeat: no-repeat;
  background-position: center center;
}
/* 图标 */
.home_icon {
  // width: 100%;
  width: 1000px;
  // padding: 0 120px;
  background: #fffcf9;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  height: 180px;
  li {
    cursor: pointer;
    width: 200px;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(3) {
      width: 300px;
    }
    &:nth-child(1) {
      justify-content: flex-start;
    }
    &:nth-child(4) {
      justify-content: flex-end;
    }
    span {
      margin-left: 20px;
    }
  }
}

/* 养生课 */
.HealthClass {
  width: 100%;
  margin: 0 auto;
  // height: 640px;
  text-align: center;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  padding-bottom: 60px;
  box-sizing: border-box;
  position: relative;
  h1 {
    font-size: 35px;
    font-weight: 400;
    color: #b69271;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  .autoPic {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    img {
      width: 48%;
      height: 100%;
      &:nth-child(1) {
        float: left;
      }
      &:nth-child(2) {
        float: right;
      }
    }
  }
  .HealthClass-arrow {
    cursor: pointer;
    color: #cac0b8;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: 50%;
    margin-top: 15px;
  }
  .HealthClass-arrow-left {
    left: -60px;
  }
  .HealthClass-arrow-right {
    right: -60px;
  }
}
/* 读书课 */
.readClass {
  width: 100%;
  margin: 0 auto;
  // height: 650px;
  text-align: center;
  background: #fffcf9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  padding-bottom: 60px;
  box-sizing: border-box;
  // position: relative;
  h1 {
    font-size: 35px;
    font-weight: 400;
    color: #008aba;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  .auto_read_class {
    display: flex;
    width: 100%;
    height: 276px;
    margin-top: 60px;
    justify-content: space-between;
    img {
      width: 100%;
      height: 100%;
    }
    .auto_read_class_left {
      position: relative;
    }
    .auto_read_class_left_autoPic {
      width: 100%;
      height: 100%;
    }
    .auto_read_class_right {
      img {
        height: 100%;
        width: auto;
      }
    }
  }
  .readClass-arrow {
    cursor: pointer;
    color: #cac0b8;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    margin-top: -15px;
    top: 50%;
  }
  .readClass-arrow-left {
    left: -60px;
  }
  .readClass-arrow-right {
    right: -60px;
  }
}

/* 教室与老师 */
.ClassroomAndTeache {
  width: 100%;
  margin: 0 auto;
  // height: 610px;
  text-align: center;
  // background: #fffcf9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  box-sizing: border-box;
  h1 {
    font-size: 37px;
    font-weight: 400;
    color: #030000;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  .Image {
    width: 100%;
    margin: 0 auto;
    margin-top: 60px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        a {
          display: block;
        }
        // flex: 1;
        // padding: 0px 8px;
        width: 317px;
        // &:nth-child(1){
        //   padding-left: 0;
        // }
        // &:nth-child(3){
        //   padding-right: 0;
        // }
        dl dt {
          margin: 15px auto 10px;
          font-size: 20px;
          color: #3e3732;
        }
        dl dt + dd {
          line-height: 25px;
          font-size: 15px;
          color: #898989;
          text-align: left;
        }
      }
    }
  }
}

/* 同学作品 */
.ClassmateWorks {
  width: 100% !important;
  margin: 0 auto;
  // height: 670px;
  padding-bottom: 60px;
  text-align: center;
  // background: #fffdf9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 20px;
  box-sizing: border-box;
  h1 {
    font-size: 37px;
    font-weight: 400;
    color: #030000;
    margin-bottom: 30px;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  .tabworks {
    margin-top: 50px;
    width: 100%;
    margin: 0 auto;
    img {
      width: 609px;
    }
  }
}
/* 写字的人 */
.Writer {
  width: 100%;
  margin: 0 auto;
  height: 650px;
  text-align: center;
  // background: #fffcf9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  box-sizing: border-box;
  h1 {
    font-size: 37px;
    font-weight: 400;
    color: #030000;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 19px;
    }
  }
  // .WriterMain {
  //   margin-top: 63px;
  //   clear: both;
  //   text-align: center;
  //   .WriterMainText {
  //     width: 200px;
  //     margin-left: 480px;
  //     text-align: left;
  //     p {
  //       color: #585757;
  //       margin: 24px 0px;
  //       line-height: 24px;
  //       font-size: 14px;
  //     }
  //     time {
  //       color: #585757;
  //       display: block;
  //       margin-top: 64px;
  //     }
  //     h4 {
  //       font-size: 18px !important;
  //       color: #030000;
  //     }
  //     a {
  //       color: #030000;
  //       font-size: 14px;
  //       text-decoration: none;
  //     }
  //   }
  //   dl {
  //     width: 780px;
  //     float: left !important;
  //     margin-top: -320px;
  //     margin-left: 700px;
  //     dt,
  //     dd {
  //       display: inline-block;
  //     }
  //     dt {
  //       float: left;
  //     }
  //     dt::after {
  //       content: url(~assets/img/People_write-right.png);
  //       display: inline-block;
  //       margin: 0px 26px;
  //     }
  //     dd {
  //       margin-right: 15px;
  //       margin-bottom: 27px;
  //     }
  //     dt + dd {
  //       width: 131px;
  //       height: 144px;
  //     }
  //     dt + dd > img {
  //       /* width: 8.25rem;
  //       height: 9.0625rem; */
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
}
.autoPic {
  background-size: cover;
}
//查看所有课程
.lookAll {
  margin-top: 60px;
  width: 100%;
  text-align: center;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      color: #777;
    }
  }
}
//底线阴影
.app-border-readClass {
  width: 100%;
  height: 8px;
  box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
}
.app-change-index-content {
  background: #fffcf9;
}
.app-change-index-box {
  width: 100%;
  background: #fffcf9;
  box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  & > div {
    width: 1000px !important;
    margin: 0 auto;
  }
}
.app-change-index-center {
  width: 1000px;
  margin: 0 auto;
}
</style>
<style lang="less">
.app-change-swiper {
  width: 100%;
  height: auto;
  .swiper-button-prev {
    left: 20px;
    background: none;
    font-size: 36px;
    color: white;
    cursor: pointer;
    outline: none;
  }
  .swiper-button-next {
    right: 20px;
    background: none;
    font-size: 36px;
    color: white;
    cursor: pointer;
    outline: none;
  }
  .swiper-pagination {
    bottom: 20px;
    .swiper-pagination-bullet-active-main {
    }

    & > span {
      outline: none;
    }
    outline: none;
  }
  .swiper-pagination-bullet-active {
    background: white !important;
  }
}
</style>

