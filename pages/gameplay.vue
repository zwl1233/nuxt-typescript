<template>
<!-- 弃用 -->
  <article class="checkpoint_body">
    <div class="w1140 m-auto  checkpoint_content">
      <div class="checkpoint_title">
        <h3 class="fz24 c30 dis_in_block">{{courseName}}</h3>
        <span class="fz18 c077 ml-20">已收藏</span>
      </div>
      <div class="pos_r game_center">
        <gametab />
        <div class="checkpoint_Imgbg ">
          <div class="pos_r">
            <!-- 通关回顾 -->
            <div
              class="pos_a checkPoint_review"
              style="cursor:pointer"
              @click="changeBaskHomework(true)"
            >
              <span class="dis_block cb49 fz16 mb-10">通关回顾</span>
              <img
                :src="require('@/assets/img/checkPoint_review.png')"
                alt=""
              >
            </div>
            <ul class="checkPoint_headList">
              <li
                v-for="item in userClassHourResponseVos"
                :key="item.classhourId"
              >
                <span>
                  <img
                    :src="require('@/assets/img/checkPoint_praise2.png')"
                    alt=""
                  >
                  <img
                    :src="require('@/assets/img/checkPoint_praise2.png')"
                    alt=""
                  >
                  <img
                    :src="require('@/assets/img/checkPoint_praise2.png')"
                    alt=""
                  >
                  <img
                    :src="require('@/assets/img/checkPoint_praise1.png')"
                    alt=""
                  >
                </span>
                <img
                  :src="require('@/assets/img/checkPoint_head1.png')"
                  alt=""
                  @click="doing(item.classhourId)"
                >
                <!--  -->
                <!-- <img
                  :src="item.copyBookUri"
                  alt=""
                  @click="doing(item.classhourId)"
                > -->
                <p class="fz12 text-center c9">{{item.classhourReason}}</p>
                <!-- <p class="cff3b fz12 text-center">
                        <span>回放倒计时</span>
                        <time>13:00:30</time>
                      </p>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
      <gamebottom
        :courseId="courseId"
        :courseName="courseName"
      />
    </div>
    <BaskHomeworkdetail v-if="BaskHomework" />
    <Studydetail
      v-if="details"
      :classhoursId="classhoursId"
    />
  </article>
</template>

<script>
//  <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head2.png')"
//                   alt=""
//                 >
//                 <!-- <p class="fz12 text-center c9">回放已过期</p> -->
//                 <p class="cff3b fz12 text-center">
//                   <span>回放倒计时</span>
//                   <time>13:00:30</time>
//                 </p>

//                 <div class="model-hover">
//                   <p class="fz12 c30">
//                     <span>第二节</span>
//                     <time class="fr">2018.09.12</time>
//                   </p>
//                   <h4 class="fz14">《颜勤礼碑》练习1</h4>
//                   <p class="fz12">
//                     <label
//                       for=""
//                       class="c30"
//                     >颜真卿：</label>
//                     <span class="c30">天真雄浑</span>
//                     <span class="c9 fr">完成度<span class="cb49">90%</span></span>
//                   </p>
//                   <p class="fz12">回放倒计时13:00:30</p>
//                 </div>

//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head3.png')"
//                   alt=""
//                 >
//                 <p class="fz12 text-center c9">回放剩余七天</p>

//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head4.png')"
//                   alt=""
//                 >
//                 <p class="fz12 text-center c9">直播结束</p>
//               </li>
//               <li class="active">
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head5.png')"
//                   alt=""
//                 >
//                 <p class="fz12 text-center c077">正在直播</p>
//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head6.png')"
//                   alt=""
//                 >
//                 <!-- <p class="fz12 text-center c9">回放已过期</p> -->
//                 <p class="c3 fz12 text-center">
//                   <span>直播倒计时</span>
//                   <time>13:01:55</time>
//                 </p>

//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head7.png')"
//                   alt=""
//                 >
//                 <p class="fz12 text-center c9">
//                   <time>2018.10.23</time>
//                 </p>
//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head8.png')"
//                   alt=""
//                 >
//                 <p class="fz12 text-center c9">
//                   <time>2018.10.29</time>
//                 </p>
//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head9.png')"
//                   alt=""
//                 >
//                 <!-- <p class="fz12 text-center c9">
//                       <time>2018.10.29</time>
//                       </p>-->
//               </li>
//               <li>
//                 <span>
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise2.png')"
//                     alt=""
//                   >
//                   <img
//                     :src="require('@/assets/img/checkPoint_praise1.png')"
//                     alt=""
//                   >
//                 </span>
//                 <img
//                   :src="require('@/assets/img/checkPoint_head10.png')"
//                   alt=""
//                 >
//                 <!-- <p class="fz12 text-center c9">
//                         <time>2018.10.29</time>
//                 </p>-->
//               </li>
import gametab from "@/components/gamedetail/gametab"; //gametab左上按钮
import gamebottom from "@/components/gamedetail/gamebottom"; //gamebottom中间按钮
import Studydetail from "@/components/gamedetail/Studydetail"; //学习详情
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import BaskHomeworkdetail from "@/components/gamedetail/BaskHomeworkdetail"; //通关回顾
export default {
  async asyncData(api) {
    console.log(api.store.state.games.courseinfo.courseId); //课程id
    let courseId = api.store.state.games.courseinfo.courseId;
    let info = await api.$axios.post("/usercourse/detail", {
      token: "",
      id: courseId
    });
    info = info.result;
    let res = await api.$axios.post("/userclasshour/list", {
      token: "",
      courseId
    });
    console.log(res.result);
    let userClassHourResponseVos = res.result.userClassHourResponseVos;
    let total = res.result.total;

    // api.$axios
    //   .post("/userclasshour/list", {
    //     token: "",
    //     courseId: id
    //   })
    //   .then(res => {
    //     let userClassHourResponseVos = [
    //       {
    //         classhourCountDownTime: "occaecat ut Excepteur", //课时大纲是否需要倒计时结束时间（配合classhourReason使用）
    //         classhourId: 43149173, //课时大纲Id
    //         classhourIntroduction: "officia", //课时大纲简介
    //         classhourName: "dolore culpa consequat", //课时大纲名称
    //         classhourNeedCountDown: true, //课时大纲是否需要倒计时（配合classhourReason使用）
    //         classhourReason: "enim commodo", //课时大纲当前描述（展示如：正在直播，回放剩余N天），后端处理，前端直接展示
    //         copyBookUri: "occaecat in", //本关字帖图片地址（新加字段，需要后台管理系统增加本字段的支持）
    //         courseType: "voluptate culpa labore ex sint",
    //         currentLearningNode: false, //是否当前学习节点（用于定义学习进度到哪个课时大纲了，展示学习路径使用）
    //         sortNo: 29811291, //课时序号（用于模板的序号）
    //         startTime: "1999-09-09T11:18:31.479Z", //startTime
    //         userHomeworkAssignCompletionResponseVos: [//课时大纲作业完成情况列表
    //           {
    //             completeColor: false,//当前用户完成作业指示灯展示颜色）
    //             hasCompleted: false,//当前用户是否已完成作业（true：已完成，false：未完成）
    //             homeworkAssignId: 38949311,//任务ID
    //             homeworkTitle: "dolor consectetur",//任务标题
    //             homeworkTypeId: -37497745,//作业类型ID
    //             homeworkTypeText: "et Duis moll"//作业类型文本
    //           }
    //         ]
    //       }
    //     ];
    //     userClassHourResponseVos = res.result.userClassHourResponseVos;
    //     console.log(res);
    //     // let userClassHourResponseVos = [
    //     //   {
    //     //     classhourCountDownTime: "occaecat ut Excepteur", //课时大纲是否需要倒计时结束时间（配合classhourReason使用）
    //     //     classhourId: 43149173, //课时大纲Id
    //     //     classhourIntroduction: "officia", //课时大纲简介
    //     //     classhourName: "dolore culpa consequat", //课时大纲名称
    //     //     classhourNeedCountDown: true, //课时大纲是否需要倒计时（配合classhourReason使用）
    //     //     classhourReason: "enim commodo", //课时大纲当前描述（展示如：正在直播，回放剩余N天），后端处理，前端直接展示
    //     //     copyBookUri: "occaecat in", //本关字帖图片地址（新加字段，需要后台管理系统增加本字段的支持）
    //     //     courseType: "voluptate culpa labore ex sint",
    //     //     currentLearningNode: false, //是否当前学习节点（用于定义学习进度到哪个课时大纲了，展示学习路径使用）
    //     //     sortNo: 29811291, //课时序号（用于模板的序号）
    //     //     startTime: "1999-09-09T11:18:31.479Z", //startTime
    //     //     userHomeworkAssignCompletionResponseVos: [//课时大纲作业完成情况列表
    //     //       {
    //     //         completeColor: false,//当前用户完成作业指示灯展示颜色）
    //     //         hasCompleted: false,//当前用户是否已完成作业（true：已完成，false：未完成）
    //     //         homeworkAssignId: 38949311,//任务ID
    //     //         homeworkTitle: "dolor consectetur",//任务标题
    //     //         homeworkTypeId: -37497745,//作业类型ID
    //     //         homeworkTypeText: "et Duis moll"//作业类型文本
    //     //       }
    //     //     ]
    //     //   }
    //     // ];
    //     // userClassHourResponseVos = res.result.userClassHourResponseVos;
    //     let total = res.result.total;
    //   });
    return {
      userClassHourResponseVos,
      total,
      info,
      courseId: info.courseId
    };
  },
  data() {
    return {
      img1: require("@/assets/img/checkpoint_Imgbg.png"),
      classhoursId: ""
    };
  },
  computed: {
    ...mapState({
      details: state => state.games.courseinfo.details,
      BaskHomework: state => state.games.courseinfo.BaskHomework, //通关回顾
      courseName:state=>state.games.courseinfo.courseName
    })
  },
  components: {
    gametab, //gametab左上按钮
    gamebottom, //gamebottom中间按钮
    Studydetail, //学习详情
    BaskHomeworkdetail //通关回顾
  },
  methods: {
    doing(id) {
      //学习详情显示
      this.changeDetails(true);
      this.classhoursId = id;
    },
    ...mapMutations({
      changeDetails: "games/changeDetails", //学习详情
      changeBaskHomework: "games/changeBaskHomework" //通关回顾
    })
  }
};

// const img1 =  require('@/assets/img/checkpoint_Imgbg.png')
</script>

<style  scoped>
.game_center {
  width: 1140px;
  height: 700px;
  margin: 0 auto;
}
/* show */
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show {
  position: absolute;
  margin-left: 108px;
  z-index: 3;
  width: auto;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
  border-radius: 3px;
  padding: 31px 39px 31px 30px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: #fff;
  left: -16px;
  top: 10px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul {
  max-height: 241px;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: -35px;
  padding-right: 45px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li {
  clear: both;
  float: left;
  padding-bottom: 18px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 18px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li:last-child {
  margin-bottom: 0px;
  border-bottom: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:nth-child(1) {
  width: 95px;
  height: 55px;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 11px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:nth-child(1)
  > img {
  width: 100%;
  height: 100%;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:last-child
  > time
  > span:last-child {
  margin-left: 20px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  + #show
  > ul
  > li
  div:last-child
  > time
  > span:last-child:hover {
  color: #c4a57f;
  cursor: pointer;
}

/* body */
.checkpoint_body {
  background: #f8f3ee;
  width: 100%;
  height: 100%;
  display: flex;
}
.checkpoint_body .checkpoint_content .checkpoint_title {
  padding-top: 57px;
  margin-bottom: 36px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn {
  z-index: 999;
  left: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  > input {
  display: block;
  margin-bottom: 22px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_leftBtn
  > input:hover {
  cursor: pointer;
  background: #159094;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg {
  background: url("~assets/img/checkpoint_Imgbg.png") no-repeat top center;
  width: 100%;
  height: 702px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_review {
  top: 280px;
  left: 54px;
  text-align: center;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList {
  height: 582px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li {
  width: 104px;
  position: absolute;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li::before {
  width: 23px;
  height: 23px;
  background: #b49b76;
  color: #fff;
  display: inline-block;
  border-radius: 55px;
  text-align: center;
  line-height: 23px;
  font-size: 14px;
  position: absolute;
  z-index: 1;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li::after {
  position: absolute;
  display: none;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::after,
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)::after {
  display: block;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li.active::before {
  background: #207175;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1) {
  top: 155px;
  left: 120px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::after {
  content: url(~assets/img/001-2@2x.png);
  top: -144px;
  left: 79px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(1)::before {
  content: "1";
  right: -23px;
  top: -25px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2) {
  top: 104px;
  left: 390px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::after {
  content: url(~assets/img/002-3@2x.png);
  left: 50px;
  top: -97px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(2)::before {
  content: "2";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3) {
  top: 30px;
  left: 563px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::after {
  content: url(~assets/img/003-4@2x.png);
  right: -188px;
  top: -24px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(3)::before {
  content: "3";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4) {
  top: 4px;
  left: 872px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)::after {
  content: url(~assets/img/004-5@2x.png);
  right: -38px;
  top: 36px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)
  > span {
  position: absolute;
  right: -3px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)
  > p {
  margin-left: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(4)::before {
  content: "4";
  left: -32px;
  top: 23px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(5) {
  top: 175px;
  right: 12px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(5)::after {
  content: url(~assets/img/005-6@2x.png);
  right: -5px;
  bottom: -192px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(5)
  > span {
  position: absolute;
  right: -3px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(5)
  > p {
  margin-left: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(5)::before {
  content: "5";
  left: -32px;
  top: 23px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(6) {
  bottom: -9px;
  right: 12px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(6)::after {
  content: url(~assets/img/006-7@2x.png);
  right: 40px;
  bottom: 116px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(6)::before {
  content: "6";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(7) {
  bottom: -4px;
  right: 340px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(7)::after {
  content: url(~assets/img/007-8@2x.png);
  bottom: 110px;
  right: 43px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(7)::before {
  content: "7";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(8) {
  bottom: 15px;
  right: 570px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(8)::after {
  content: url(~assets/img/008-9@2x.png);
  left: -163px;
  bottom: 26px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(8)::before {
  content: "8";
  left: 43px;
  top: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(9) {
  bottom: 55px;
  left: 252px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(9)::after {
  content: url(~assets/img/009-10@2x.png);
  left: -182px;
  bottom: -54px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(9)::before {
  content: "9";
  left: 43px;
  bottom: -34px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(10) {
  bottom: -90px;
  left: 30px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(10)::after {
  content: url(~assets/img/010-00@2x.png);
  left: -26px;
  top: -592px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(10)
  > span {
  position: absolute;
  right: -3px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(10)
  > p {
  margin-left: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:nth-child(10)::before {
  content: "10";
  left: 33px;
  top: -40px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  > span {
  width: 15px;
  display: inline-block;
  vertical-align: top;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  > span
  > img {
  margin-bottom: 5px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  > span
  > img:last-child {
  margin-bottom: 0px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  > span
  + img {
  width: 75px;
  height: 75px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  > img
  + p {
  width: 72px;
  margin-left: 21px;
  margin-top: 4px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:hover {
  cursor: pointer;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li:hover
  .model-hover {
  display: block;
  cursor: pointer;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  .model-hover {
  display: none;
  width: calc(226px);
  height: calc(85px);
  background: #ffffff;
  box-shadow: 0px 6px 32px 0px rgba(172, 172, 172, 0.09);
  border-radius: 6px;
  padding: 12px 15px;
  position: absolute;
  right: -270px;
  top: 0;
  z-index: 2;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  .model-hover::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #fff;
  left: -16px;
  top: 30px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  .model-hover
  > h4.fz14 {
  margin-top: 4px;
  margin-bottom: 5px;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
  .checkpoint_Imgbg
  .checkPoint_headList
  li
  .model-hover
  > p:last-child {
  margin-top: 5px;
}
</style>
