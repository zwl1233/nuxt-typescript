<template>
  <section class="app-Order_list-content-course">
    <!-- 单 -->
    <div class="MyCourses-content">
      <div class="Order_list-content app-couse-list-count" >
        <el-row>
          <el-col
            :span="8"
            v-for="(items) in SingleList"
            :key="items.courseId"
            style="position: relative;"
          >
            <span class="app-ChangeSing-718" >
              <img
                style="width:45px;height:45px;"
                :src="items.courseType==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
                alt
              >
            </span>
            <div class="grid-content" style="height:192px" :class="{gray:items.isGray}">
             
              <img
                @click="jumpSingle(items.courseId)"
                alt
                v-lazy="items.coursePictureUri"
                style="height:115px;cursor:pointer;width:203px"
              >
              <dl class="text-center">
                <dt class="fz16 c3" style="cursor:pointer" @click="jumpSingle(items.courseId)">
                  <!-- @click="jumpGame(items.courseId,items.courseName)" -->

                  <span class="webkovf" style="margin-top: 10px;">{{items.courseName.slice(0,10)}}</span>
                  <!-- <span class="fz12 c4a5">|</span>
                  <span class="webkovf">{{items.courseSubtitle}}</span>-->
                </dt>
                <dd class="fz12 c9" v-if="items.purchased">{{items.studyTips}} <span style="margin-left:8px">共{{items.classHourCount}}课</span></dd>
                <dd
                  class="fz12 c9"
                  style="cursor:pointer;"
                  v-if="!items.purchased"
                  @click="jumpSingle(items.courseId)"
                >{{items.studyTips}}</dd>
              </dl>
            </div>
          </el-col>
        </el-row>

        <!-- <div class="text-center app-zhuan-full" v-if="item.isTurnFullCourse">
          <button
            class="btn-turnOrder"
            style="cursor:pointer;"
            @click="jumpFull(item.courseFullId,item.isTurnFullCourse)"
          >转报全阶</button>
          <p class="fz14 c4a5">转为全阶后可优惠{{item.transCourseFullSavePrice}}元</p>
        </div> -->
        <!-- <div class="text-center" v-if="!item.isTurnFullCourse">
          <button class="btn-turnOrder" style="background:#acacac">转全阶</button>
          <p
            class="fz14 c4a5"
            style="color:#acacac"
          >转成全阶后可优惠{{item.transCourseFullSavePrice}}元</p>
        </div>-->
      </div>
     
    </div>
    <div v-if="FullList.length>0"></div>
    <!-- 全下 -->
    <div class="MyCourses-content" v-for="(item) in FullList" :key="item.courseFullId">
      <h3 class="fz17 c4c49 pos_r c4c49 fonS" style="font-weight:400" v-if="item.isFull">
        <span class="pos_a" v-if="item.isFull">
          <img
            :src="item.courseType==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
            alt
          >
        </span>
        <!-- {{item.courseName}} | {{item.courseSubtitle}} -->
        <span
          @click="jumpFull(item.courseFullId,item.isTurnFullCourse)"
          class="cursor-pointer bold fz18"
        >{{item.courseName}}</span>
      </h3>
      <div class="Order_list-content app-couse-list-count" v-if="item.isFull">
        <el-row>
          <el-col
            :span="8"
            v-for="(items) in item.userCourseSingleResponseVos"
            :key="items.courseId"
          >
            <div class="grid-content" style="height:192px" :class="{gray:items.isGray}">
              <img
                @click="jumpSingle(items.courseId)"
                alt
                v-lazy="items.coursePictureUri"
                style="height:115px;cursor:pointer;width:203px"
              >
              <dl class="text-center">
                <dt class="fz16 c3" style="cursor:pointer" @click="jumpSingle(items.courseId)">
                  <!-- @click="jumpGame(items.courseId,items.courseName)" -->

                  <span class="webkovf" style="margin-top: 10px;">{{items.courseName}}</span>
                  <!-- <span class="fz12 c4a5">|</span>
                  <span class="webkovf">{{items.courseSubtitle}}</span>-->
                </dt>
                <dd class="fz12 c9" v-if="items.purchased">{{items.studyTips}} <span style="margin-left:8px">共{{items.classHourCount}}课</span></dd>
                <dd
                  class="fz12 c9"
                  style="cursor:pointer;"
                  v-if="!items.purchased"
                  @click="jumpSingle(items.courseId)"
                >{{items.studyTips}}</dd>
              </dl>
            </div>
          </el-col>
        </el-row>

        <div class="text-center app-zhuan-full" v-if="item.isTurnFullCourse">
          <button
            class="btn-turnOrder"
            style="cursor:pointer;"
            @click="jumpFull(item.courseFullId,item.isTurnFullCourse)"
          >转报全阶</button>
          <p class="fz14 c4a5">转为全阶后可优惠{{item.transCourseFullSavePrice}}元</p>
        </div>
        <!-- <div class="text-center" v-if="!item.isTurnFullCourse">
          <button class="btn-turnOrder" style="background:#acacac">转全阶</button>
          <p
            class="fz14 c4a5"
            style="color:#acacac"
          >转成全阶后可优惠{{item.transCourseFullSavePrice}}元</p>
        </div>-->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { cutStr } from "@/plugins/utils"; //计算字符长度
export default {
  computed: {
    ...mapState({
      SingleList: state => state.my.Mycourse.SingleList, //单阶数据
      FullList: state => state.my.Mycourse.FullList, //全阶数据
      list: state => state.my.Mycourse.MycourseList, //appid
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
    })
  },
  methods: {
    ...mapMutations({
      getCookie: "system/getCookie", //获取用户cookie
      changeTab: "about/changeTab", //切换tab
      changePage: "about/changePage", //加载更多
      changeCourseId: "games/changeCourseId", //改变课程id
      changeCourseName: "games/changeCourseName", //改变课程名
      changeCourseTemplate: "games/changeCourseTemplate",
      getCourseDetail: "games/getCourseDetail"
    }),
    //截取字节长度的字符串
    cutStr,
    mounted() { 
        console.log('我我我我哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇')
    },
    //用户转全阶
    async Fullscalepurchase(paydatas) {
      console.log(paydatas);
      let quanid = paydatas.courseFullId; //全阶id
      this.$axios
        .post("/usercourse/singleturnfull", {
          courseId: quanid,
          token: "",
          sourceId: 32,
          orderType: 1
        })
        .then(res => {
          if (res.result) {
            this.$router.push({
              name: "payment",
              query: {
                orderid: res.result.orderId,
                istype: 2,
                fullid: quanid,
                isTurnFull: true
              }
            });
          } else {
            this.$message({
              duration: 5000,
              message: res.msg,
              type: "error"
            });
          }
        });
      console.log();
    },
    pay(item) {
      this.$axios
        .post("/course/buysingle", {
          courseId: item.courseId,
          sourceId: 1,
          token: "",
          orderType: 1
        })
        .then(res => {
          if (res.result) {
            this.$router.push({
              name: "payment",
              query: {
                orderid: res.result.orderId,
                istype: 1,
                fullid: item.courseId,
                isTurnFull: false
              }
            });
          } else {
            this.$message({
              duration: 5000,
              message: res.msg,
              type: "error"
            });
            console.log(res);
          }
        });
      // this.linkdetail(data);
      console.log(item.courseId);
    },
    // jumpGame(courseId, name) {
    //   console.log(name);
    //   console.log("课程id123", courseId);
    //   this.changeCourseId(courseId);
    //   this.changeCourseName(name);

    //   this.$axios
    //     .post("/usercourse/detail", { token: "", id: courseId })
    //     .then(res => {
    //       console.log(res);
    //       this.getCourseDetail(res.result);

    //       // this.changeCourseTemplate(res.result.courseTemplateClasshourCount)
    //       if (res.result.courseTemplateClasshourCount == 3) {
    //         this.$router.push({
    //           path: "/gameplaythree",
    //           query: { courseId: courseId }
    //         });
    //       } else if (res.result.courseTemplateClasshourCount == 5) {
    //         this.$router.push({
    //           path: "/gameplayfive",
    //           query: { courseId: courseId }
    //         });
    //       }
    //     });
    // },
    //跳转全阶详情
    jumpFull(id, type) {
      let routeData = this.$router.resolve({
        name: "fullOrder",
        query: {
          courseId: id,
          istype: type
        }
      });
      window.open(routeData.href, "_blank");
    },
    //跳转单阶详情
    jumpSingle(id) {
      this.$router.push({
        name: "singleOrder",
        query: { courseId: id }
      });
      // window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="less">
.app-ChangeSing-718{
    top:-22.5px;
    left:-22.5px;
    display:inline-block;
    position: absolute;
    z-index: 999;
}
.app-Order_list-content-course {
  padding-bottom: 30px;
  .Order_list-content::after {
    margin-top: 40px !important;
    // display: none;
    // background: red;
  }
  .Orderlistcontent::after {
    content: url(~assets/img/turnOrder.png);
    margin-top: 40px !important;
  }
}
.app-couse-list-count {
  .el-row {
    // width: 678px;
    padding-right: -24px;
    .el-col {
      &:nth-child(3n) {
        margin-right: 0 !important;
      }
    }
  }
}
.MyCourses .MyCourses-content:last-child .Order_list-content::after {
  // background: red;
  display: none;
}
// .MyCourses .MyCourses-content .Order_list-content::after {
//   content: url(~assets/img/turnOrder.png);
// }
// .MyCourses .MyCourses-content .Order_list-content div.text-center {
//   margin-top: 39px;
// }
// .MyCourses .MyCourses-content .Order_list-content div.text-center p {
//   margin-top: 13px;
//   margin-bottom: 5px;
// }
// .MyCourses .MyCourses-content .Order_list-content .el-col-8 {
//   margin-right: 41px;
//   width: 272px;
// }
// .MyCourses .MyCourses-content .Order_list-content .el-col-8:last-child {
//   margin-right: 0px;
// }
// .MyCourses .MyCourses-content .Order_list-content .grid-content {
//   box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
// }
// .MyCourses .MyCourses-content .Order_list-content .grid-content img {
//   width: 100%;
//   height: 100%;
// }
// .MyCourses .MyCourses-content .Order_list-content .grid-content dl dt {
//   margin-top: 9px;
//   margin-bottom: 6px;
// }
// .MyCourses .MyCourses-content .Order_list-content .grid-content dl dt span {
//   padding: 0px 16px;
// }
// .MyCourses .MyCourses-content .Order_list-content .grid-content dl dd {
//   margin-left: 0px;
//   padding-bottom: 20px;
// }
.Define-OrderContent {
  padding-bottom: 0px;
}
.Define-OrderContent .Class_list-content-text > h3 {
  margin-top: 19px;
}
.Define-OrderContent .Class_list-content-img img {
  width: 270px;
  height: 154px;
}
.Define-OrderContent .Class_list-content-text {
  height: 154px;
}

.webkovf {
  /* width: 110px; */
  overflow: hidden;
  text-align: center;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
