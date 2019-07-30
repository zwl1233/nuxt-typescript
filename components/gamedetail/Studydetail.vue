<template>
  <section>
    <el-dialog
      :visible="details"
      custom-class="learningDetails-Model app-learningDetails-Model app-study-detail"
      width="max-content"
      center
      :before-close="closes"
    >
      <div class="Model-content-left dis_in_block">
        <h3 style="margin-bottom:13px;font-size：16px;color:rgba(0,0,0,.7)">{{info.classhourName}}</h3>
        <p style="color:rgba(196, 165, 127, 1);font-size:14px">{{info.classhourIntroduction}}</p>
        <article>
          <h4 class="model-50">
            <span>
              <!-- <img :src="require('@/assets/img/WatchVideo_bg.png')" alt> -->
              <img :src="require('@/assets/changeIcon/3.png')" alt style="width:20px;height:20px;display:block">
            </span>
            <span class="fz14 middle" style="margin-left:8px">上课</span>
          </h4>
          <ul class="WatchVideo_ul" style="display:flex;justify-content:flex-start">
            <!-- 直播 -->
            <li v-if="classhourType==1">
              <!-- <a :href="classHourInfo.isLiving?info.courseUrl:'javascript:;'" target="view_window"> -->
              <a href="javascript:;" @click="jump(classHourInfo)">
                <!-- <img v-lazy="info.coverPictureUrl" alt> -->
                <div class="app-living-pic">
                  <img :src="require('@/assets/img/nullInstro.png')" alt>
                  <!-- 两true 显示 文本+时间  两false 显示文本  一真一假显示时间 -->
                  <!-- 时间+文本 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="classHourInfo.isStar&&classHourInfo.classhourNeedCountDown"
                  >
                    {{classHourInfo.classhourReason}}
                    <ClassCountDown
                      style="display:block"
                      :time="classHourInfo.classhourCountDownTime"
                      :changeLiving="changeLiving.bind(this)"
                    />
                  </p>
                  <!-- 时间 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="!(classHourInfo.classhourNeedCountDown&&classHourInfo.isStar)"
                  >{{classHourInfo.classhourCountDownTime}}</p>

                  <!-- 文本 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="classHourInfo.classhourNeedCountDown==false&&classHourInfo.isStar==false"
                  >
                    <span v-if="classHourInfo.classhourReason=='正在直播'">正在直播</span>
                    <span v-else>{{classHourInfo.classhourReason}}</span>
                  </p>
                </div>
              </a>
            </li>
            <!-- 回放 -->
            <li v-if="classhourType==2">
              <a href="javascript:;"  @click="jump(classHourInfo)">
                <!-- <img v-lazy="info.coverPictureUrl" alt> -->
                <div class="app-living-pic">
                  <img :src="require('@/assets/img/nullInstro.png')" alt>
                  <!-- 两true 显示 文本+时间  两false 显示文本  一真一假显示时间 -->
                  <!-- 时间+文本 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="classHourInfo.isStar&&classHourInfo.classhourNeedCountDown"
                  >
                    {{classHourInfo.classhourReason}}
                    <ClassCountDown
                      style="display:block"
                      :time="classHourInfo.classhourCountDownTime"
                      :changeLiving="changeLiving.bind(this)"
                    />
                  </p>
                  <!-- 时间 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="!(classHourInfo.classhourNeedCountDown&&classHourInfo.isStar)"
                  >{{classHourInfo.classhourCountDownTime}}</p>

                  <!-- 文本 -->
                  <p
                    class="fz12 text-center cb49 text_white"
                    v-if="classHourInfo.classhourNeedCountDown==false&&classHourInfo.isStar==false"
                  >
                    <span v-if="classHourInfo.classhourReason=='正在直播'">正在直播</span>
                    <span v-else>{{classHourInfo.classhourReason}}</span>
                  </p>
                </div>
              </a>
            </li>
            <!-- 录播 -->
            <li
              @click="changeVideo(info.coverPictureUrl,info.courseUrl,info.rememberVideoTime,classhoursId)"
              v-if="classhourType==3"
              style="width:212px;height:120px"
            >
              <a href="javascript:;" style="width:100%;height:100%">
                <img
                  v-lazy="info.coverPictureUrl"
                  alt
                  style="width:100%;height:100%;object-fit:cover"
                >
              </a>
            </li>
            <li>
              <img
                v-lazy="info.copyBookUri"
                @click="lookImg(info.copyBookUri)"
                style="width:120px;height:120px;object-fit:cover;cursor:pointer"
                alt
              >
            </li>
          </ul>
        </article>
        <article>
          <h4 style="margin-bottom:2px">
            <span>
              <!-- <img :src="require('@/assets/img/show_bg.png')" alt> -->
              <img :src="require('@/assets/changeIcon/15.png')" alt style="width:20px;height:20px;display:block">
            </span>
            <span class="fz14 middle" style="margin-left:8px">本课内容</span>
          </h4>
          <div
            class="fz14 c9 show_content app-show_content"
            ref="textExplain"
            v-if="info.classhourContent&&info.classhourContent.length>0"
          >
            <!-- 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到… -->
            <!-- {{JSON.parse(this.info.classhourContent).blocks[0].text.slice(0.10)}} -->

            <div style="width:478px;height:auto;">
              <pre class="explainPre fonH">{{info.classhourContent}}</pre>
              <!-- <a
                href="javascript:;"
                @click="showAll(true)"
                v-if="this.info.classhourContent.length>300&&msgInfo.length<=n+3"
                class="fz14 c077 app-show_content-show"
              >展开</a>
              <a
                href="javascript:;"
                @click="showAll(false)"
                v-if="this.info.classhourContent.length>300&&msgInfo.length>=this.info.classhourContent.length"
                class="fz14 c077 app-show_content-show"
              >收起</a>-->
            </div>
          </div>
          <!-- 如果内容为空，展示空的数据img -->
          <div class="null-content text-center" style="margin-top:97px;" v-else>
            <img :src="require('@/assets/img/null-show.png')" alt>
            <p class="fz12 c4a5 mt-15">暂时没有更多信息哦</p>
          </div>
        </article>
      </div>
      <div class="Model-content-right dis_in_block">
        <article>
          <h4>
            <span>
              <!-- <img :src="require('@/assets/img/LevelTask_bg.png')" alt> -->
              <img :src="require('@/assets/changeIcon/16.png')" alt style="width:20px;height:20px;display:block">
            </span>
            <span class="fz14 middle" style="margin-left:8px">作业任务</span>
          </h4>
          <!-- v-if="info.userHomeworkAssignResponseVos.length>0" -->
          <div
            class="LevelTask_content"
            style="box-sizing:border-box;"
            v-if="info.userHomeworkAssignResponseVos.length&&info.userHomeworkAssignResponseVos.length>0"
          >
            <ul>
              <li
                :class="[item.homeworkSubmitTypeText=='未提交'?'app-change-pyli-notSubm':'',item.homeworkSubmitTypeText=='已提交'?'app-change-pyli-Subm':'',item.homeworkSubmitTypeText=='已评阅'?'app-change-pyli-haveRead':'']"
                v-for="item in info.userHomeworkAssignResponseVos"
                :key="item.homeworkAssignId"
              >
                <span>
                  <span class="c077">{{item.homeworkSubmitTypeText}}</span>
                </span>
                <!-- <span v-if="item.homeworkSubmitTypeText=='已提交'">
                  <span class="c077" style="color:#c4a57f">{{item.homeworkSubmitTypeText}}</span>
                </span>
                <span v-if="item.homeworkSubmitTypeText=='已评阅'">
                  <span class="c077" style="color:#077478">{{item.homeworkSubmitTypeText}}</span>
                </span>-->
                <!-- <span class="fz14 c077">{{item.homeworkSubmitTypeText}}</span> -->
                <span class="fz14 c3 ml-15">{{item.homeworkTitle}}</span>
                <!-- 未提交 -->
                <input
                  type="button"
                  :class="['outline','app-zwl-homework']"
                  value="交作业"
                  @click="JumpWorks(item.homeworkAssignId)"
                  v-if="item.homeworkSubmitTypeText=='未提交'"
                >
                <!-- 已提交 -->
                <input
                  :class="['outline','app-not-hover']"
                  type="button"
                  value="查看"
                  @click="JumpWorks(item.homeworkAssignId)"
                  v-if="item.homeworkSubmitTypeText=='已提交'"
                >
                <!-- 评阅 -->
                <input
                 :class="['outline','app-not-hover']"
                  type="button"
                  value="查看"
                  @click="JumpWorks(item.homeworkAssignId)"
                  v-if="item.homeworkSubmitTypeText=='已评阅'"
                >
              </li>
            </ul>
          </div>
          <!-- 如果内容为空，展示空的数据img -->
          <div
            class="null-content text-center"
            style="margin-top:40px"
            v-if="info.userHomeworkAssignResponseVos&&info.userHomeworkAssignResponseVos.length<=0"
          >
            <img :src="require('@/assets/img/null-LevelTask.png')" alt>
            <p class="fz12 c4a5 mt-15">作业还没有布置哦</p>
          </div>
        </article>
        <article>
          <h4>
            <span>
              <!-- <img :src="require('@/assets/img/equipment_bg.png')" alt> -->
              <img :src="require('@/assets/changeIcon/17.png')" alt style="width:20px;height:20px;display:block">
            </span>
            <span class="fz14 middle" style="margin-left:8px">文房文具</span>
          </h4>
          <div
            class="equipment_content"
            style="margin-top:13px"
            v-if="info.userClassHourToolResponseVos&&info.userClassHourToolResponseVos.length>0"
          >
            <ul>
              <li
                v-for="item in info.userClassHourToolResponseVos"
                :key="item.toolId"
                class="app-equipment_content-pic"
              >
                <img v-lazy="item.toolUri" alt>
              </li>
            </ul>
          </div>
          <!-- 如果内容为空，展示空的数据img -->
          <div
            class="null-content text-center"
            style="margin-top:20px;margin-bottom: 30px;"
            v-if="info.userClassHourToolResponseVos&&info.userClassHourToolResponseVos.length<=0"
          >
            <img :src="require('@/assets/img/null-equipment.png')" alt>
            <p class="fz12 c4a5 mt-15">稍后告诉你哦</p>
          </div>
        </article>
        <article style="margin-top:6px">
          <h4 class="model-li35">
            <span>
              <!-- <img :src="require('@/assets/img/guide_bg.png')" alt> -->
              <img :src="require('@/assets/changeIcon/18.png')" alt style="width:20px;height:20px;display:block">
            </span>
            <span class="fz14 middle" style="margin-left:8px">
              学习资料
              <span
                style="color:rgba(177, 149, 117, 1);font-size:12px;font-weight:400"
                v-if="coursematerial.length>0"
              >（请在{{initStundenTime(studentTime)}}前下载）</span>
            </span>
          </h4>
          <div 
            class="guide_content text-left ml-30"
            style="padding-left:2px;box-sizing:border-box;"
            v-if="coursematerial.length>0"
          >
            <div v-for="item in coursematerial" :key="item.materialId" style="width:78%">
              <div class="fz14 model-li35" style="margin-bottom:5px">
                <!-- 暄桐线上课程【篆隶筑基】自测考卷答案.doc -->
                {{item.fileFullName}}
              </div>
              <p class="model-li35">
                <span class="fz12 c9">大小：{{item.fileSizeText}}</span>
                <!-- <a
                  :href="item.fileUri"
                  class="cb19"
                  target="view_window"
                  :download="item.fileFullName"
                >下载文件</a>-->
                <a
                  href="javascript:;"
                  class="cb19 fz12"
                  style="margin-left:17px"
                  @click="Download(item.fileUri,item.fileFullName,item.suffixName,item.materialId)"
                >下载</a>
              </p>
            </div>
            <!-- <div>
              <div class="fz14 model-li35">
                暄桐线上课程【篆隶筑基】自测考卷答案.doc
              </div>
              <p class=" model-li35">
                <span class="fz12 c9">大小：51.2KB</span>
                <a
                  href="##"
                  class="cb19"
                >
                  下载文件
                </a>
              </p>
            </div>-->
            <!-- <div>
                                <div class="fz14">
                                        暄桐线上课程【篆隶筑基】自测考卷答案.doc   
                                </div>
                                <p class="mt-5">
                                <span class="fz12 c9">大小：51.2KB</span>
                                <a href="##" class="cb19">
                                        下载文件    
                                </a>
                                </p>
            </div>-->
          </div>
          <!-- 如果内容为空，展示空的数据img -->
          <div
            class="null-content text-center"
            v-if="coursematerial.length<=0"
            style="margin-top:40px"
          >
            <img :src="require('@/assets/img/null-guide.png')" alt>
            <p class="fz12 c4a5 mt-15">书童正在准备哦</p>
          </div>
        </article>
      </div>
      <VideoModal v-if="visible" :getList="updateTime"></VideoModal>
      <ViewImg
        v-if="viewFlag"
        :visible="viewFlag"
        :list="ViewImgList"
        :index="viewIndex"
        :close="viewClose"
        :field="field"
      />
    </el-dialog>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ClassCountDown from "@/components/gamedetail/ClassCountDown"; //倒计时
import VideoModal from "@/components/videoModal";
import moment from "moment";
import ViewImg from "@/components/viewImg"; //查看大图

export default {
  data() {
    return {
      info: {
        classhourId: "", //课时大纲Id
        courseUrl: "", // 课时播放地址
        coverPictureUrl: "", //视频封面图
        copyBookUri: "", //  本关字帖图片地址
        classhourName: "", // 课时大纲名称
        classhourIntroduction: "", // 课时大纲简介
        classhourContent: "", // 课时大纲内容（闯关说明）
        userHomeworkAssignResponseVos: [
          //   { // 课时大纲相关作业列表（本关任务）
          //   homeworkAssignId: "", // 作业Id，用于点击跳转到写作业页面
          //   homeworkSubmitTypeText: "", // 作业提交状态文本（如：未提交、已提交、已评阅），接口处理前端直接绑定
          //   homeworkSubmitTypeTextColor: "", //作业提交状态文本展示颜色，接口处理前端直接绑定;
          //   homeworkTitle: "" // 作业标题
          // }
        ],
        userClassHourToolResponseVos: [
          // 课时大纲相关装备（必备装备）
          // {
          //   toolId: "", // 装备Id
          //   toolUri: "" // 装备图
          // }
        ]
      },
      msgInfo: "", //闯关说明
      n: 250, //字符串截取的长度
      flag: false, //是否显示展示  ture 展开 收起
      Retract: false, //收起
      coursematerial: [
        // {
        //   materialId:"",//资料id
        //   fileFullName:"",//文件全名
        //   fileSizeText:"",//文件大小
        //   fileUri:"",//下载路径
        // }
      ],
      tt: false,
      videoFlag: false,
      classhourType: "", //1 直播  2回放 3录播

      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "" //所取的字段
    };
  },
  props: ["classhoursId", "courseType", "getCourseList","changeStatus"], //courseType 1:直播  2:录播
  computed: {
    ...mapState({
      details: state => state.singleOrder.courseContent.details, //学习详情
      visible: state => state.videoModal.visible, //video弹出框可见
      courseId: state => state.singleOrder.courseId, //课程id
      studentTime: state => state.singleOrder.studentTime, //学习有效期
      classHourInfo: state => state.singleOrder.courseContent.info //直播里的时间  (列表里的课时信息)
    })
  },
  components: {
    VideoModal,
    ClassCountDown,
    ViewImg
  },
  created() {
    console.log(this.courseType);
    this.getData();
  },
  mounted() {
    console.log(this.classHourInfo, "xinxi");

    this.$nextTick(() => {
      console.log(this.$refs.dialog);
      // this.$refs.dialog.open()
      // console.log(this.$refs.textExplain,111)
    });
  },
  methods: {
    viewClose(flag) {
      this.viewFlag = flag;
    },
    //查看大图
    lookImg(url) {
      let list = [{ url }];
      let index = 0;
      let field = "url";
      this.viewFlag = true;
      this.ViewImgList = list;
      this.viewIndex = index;
      this.field = field;
    },
    //跳转直播
    jumpLiving(id) {
      // this.$router.push({
      //     name:"course",
      //     query: {
      //       id:id
      //     }
      //   });
      let routeData = this.$router.resolve({
        name: "course",
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
    },

    //回放
    jumpBack(id) {
      // this.$router.push({
      //     name:"courseBack",
      //     query: {
      //       id:id
      //     }
      //   });
      let routeData = this.$router.resolve({
        name: "courseBack",
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
    },
    jump(obj){
      console.log(obj)
      if(obj.classhourType==1){
        //直播
        if(obj.classhourReason=="正在直播"){
          obj.isLiving=true
        }
        if(!obj.isLiving)return
        this.changeStatus()
        this.jumpLiving(obj.classhourId)
      }else if(obj.classhourType==2){
        if(obj.classhourReason=="回放已结束")return
        //回放
        this.changeStatus()
        this.jumpBack(obj.classhourId)
      }

    },
    //获取详情
    getDetail() {
      this.$axios
        .post("/userclasshour/detail", {
          token: "",
          classhourId: this.classhoursId
        })
        .then(res => {
          console.log(res.result.classhourId, "??????????");
          this.info = res.result;
          this.classhourType = res.result.classhourType;
          // console.log(res.result.classhourContent.slice(0, 10));
          // if (res.result.classhourContent.slice(0, 10) == "{'blocks':") {
          //富文本处理方式
          // this.msgInfo = JSON.parse(
          //   this.info.classhourContent
          // ).blocks[0].text.slice(0, this.n);
          // if (
          //   this.msgInfo.length <
          //   JSON.parse(this.info.classhourContent).blocks[0].text
          // ) {
          //   this.msgInfo = this.msgInfo + "...";
          // }
          // } else {
          //纯文本
          // this.msgInfo = res.result.classhourContent;
          // console.log(this.msgInfo, 11);
          // if (this.msgInfo.length > this.n) {
          //   this.msgInfo = this.msgInfo.slice(0, this.n) + "...";
          //   console.log(this.msgInfo);
          //   // }
          // }

          // console.log(
          //   12121,
          //   JSON.parse(this.info.classhourContent).blocks[0].text.slice(
          //     0,
          //     this.n
          //   ).length
          // );
          // console.log(,11)
          // classhourId 课时大纲Id
          // courseUrl 课时播放地址
          // copyBookUri  本关字帖图片地址
          // classhourName 课时大纲名称
          // classhourIntroduction 课时大纲简介
          // classhourContent 课时大纲内容（闯关说明）
          // userHomeworkAssignResponseVos：{}课时大纲相关作业列表（本关任务）
          // userClassHourToolResponseVos{} 课时大纲相关装备（必备装备）

          // homeworkAssignId 作业Id，用于点击跳转到写作业页面
          // homeworkSubmitTypeText 作业提交状态文本（如：未提交、已提交、已评阅），接口处理前端直接绑定
          // homeworkSubmitTypeTextColor  作业提交状态文本展示颜色，接口处理前端直接绑定;
          // homeworkTitle 作业标题

          // toolId 装备Id
          // toolUri 装备图
        });
    },
    //获取闯关
    getStrategy() {
      //获取闯关攻略
      this.$axios
        .post("/coursematerial/list", {
          classhourId: this.classhoursId,
          pageIndex: 1
        })
        .then(res => {
          console.log(res.result, "??????????");
          // this.coursematerial=res.result.list
          this.coursematerial = res.result.list;
        });
    },
    //获取数据
    getData() {
      this.getDetail();
      this.getStrategy();
    },
    //更新时间
    updateTime() {
      this.getData();
      this.getCourseList();
    },
    //显示全部
    // showAll(isShow) {
    //   if (isShow) {
    //     //展开
    //     // if(res.result.classhourContent.slice(0, 10) == "{'blocks':"){
    //     //富文本处理方式
    //     // this.msgInfo = JSON.parse(this.info.classhourContent).blocks[0].text;
    //     // }else{
    //     //文本处理方式
    //     // this.msgInfo = this.info.classhourContent;
    //     // }
    //     this.Retract = true;
    //   } else {
    //     //收起
    //     // if(res.result.classhourContent.slice(0, 10) == "{'blocks':"){
    //     //   //富文本处理方式
    //     // this.msgInfo = JSON.parse(
    //     //   this.info.classhourContent
    //     // ).blocks[0].text.slice(0, this.n);
    //     // }else{
    //     //文本处理方式
    //     this.msgInfo = this.info.classhourContent.slice(0, this.n) + "...";
    //     // }

    //     this.Retract = false;
    //   }
    //   // this.flag=false
    //   // this.msgInfo=JSON.parse(this.info.classhourContent).blocks[0].text
    //   // this.n=JSON.parse(this.info.classhourContent).blocks[0].text.
    // },
    ...mapMutations({
      changeDetails: "singleOrder/courseContent/changeDetails", //学习详情
      changeVisible: "videoModal/changeVisible",
      changeUrl: "videoModal/changeUrl",
      changeTime: "videoModal/changeTime", //获取上次观看时间
      changeClassHourId: "videoModal/changeClassHourId", //改变课时id
      changeInfo: "singleOrder/courseContent/changeInfo" //改变课时详情(列表)
    }),
    closes(done) {
      done();
      this.changeDetails({ flag: false, info: "" });
    },
    JumpWorks(id) {
      this.$router.push({
        name: "wirtehomework",
        query: {
          homeworkAssignId: id,
          classhourId: this.classhoursId,
          courseId: this.courseId
        }
      });
    },
    //视频播放
    changeVideo(picture, key, time, id) {
      this.changeTime(time);
      this.changeClassHourId(id);
      this.$axios.post("utility/getUrl", { key }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.changeVisible(true);
          this.changeUrl({
            picture,
            quality: [
              {
                name: "高清",
                url: res.result.highUrl
              },
              {
                name: "标清",
                url: res.result.url
              },
              {
                name: "流畅",
                url: res.result.lowUrl
              }
            ]
          });
        }
      });
    },
    initStundenTime(time) {
      // console.log(moment(time).format('YYYY-MM-DD'))
      return time.replace(/[\u4e00-\u9fa5]/g, "-").slice(0, time.length - 1);
    },
    // .xls,.xlsx,image/png, image/jpeg, image/jpg, image/gif, image/webp
    //图片下载
    Download(url, filename, kind, id) {
      this.$axios
        .post("/coursematerial/download", {
          fileId: id,
          courseHourId: this.classhoursId,
          token: ""
        })
        .then(res => {
          console.log(res);
        });
      let fileAry = ["xls", "xlsx"];
      let imgAry = ["jpeg", "png", "jpg", "gif", "webp"];
      if (fileAry.includes(kind)) {
        //文件下载
        this.fileDownload(url, filename);
      } else {
        //图片下载
        this.getBase64(url, filename);
        // this.imgDownload(url, filename, kind);
      }
    },
    //文件下载
    fileDownload(url, filename) {
      // 创建隐藏的可下载链接
      var eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      eleLink.href = url;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    },
    //图片下载 弃用
    imgDownload(url, filename, kind) {
      //图片下载
      // url = "http://pic15.nipic.com/20110813/1993003_205156492136_2.jpg";
      let img = new Image();
      img.src = url + "#/v=" + new Date().getTime();
      img.setAttribute("crossOrigin", "anonymous");
      console.log(img);
      img.onload = () => {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";

        // 图片转base64地址
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        context.drawImage(img, 0, 0, width, height);
        // 如果是PNG图片，则canvas.toDataURL('image/png')
        eleLink.href = canvas.toDataURL(`image/${kind}`);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      };
    },
    //获取base64
    getBase64(imgUrl, filename) {
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (this.status == 200) {
          let blobUrl = window.URL.createObjectURL(this.response);
          let link = document.createElement("a");
          document.body.appendChild(link);
          link.style.display = "none";
          link.href = blobUrl;
          // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
          link.download = filename;
          // 自触发click事件
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
          // //得到一个blob对象
          // var blob = this.response;
          // //  至关重要
          // let oFileReader = new FileReader();
          // oFileReader.onloadend = function(e) {
          //   let base64 = e.target.result;
          //   // 创建隐藏的可下载链接
          //   var eleLink = document.createElement("a");
          //   eleLink.download = filename;
          //   eleLink.style.display = "none";
          //   eleLink.href = base64;
          //   document.body.appendChild(eleLink);
          //   eleLink.click();
          //   // 然后移除
          //   document.body.removeChild(eleLink);
          // };
          // oFileReader.readAsDataURL(blob);
        }
      };
      xhr.send();
    },
    //改变直播状态
    changeLiving() {
      let obj = {};
      obj.classhourNeedCountDown = false;
      obj.isStar = false;
      obj.classhourCountDownTime = null;
      obj.classhourReason = "正在直播";
      obj.isLiving = true;
      let info = { ...this.classHourInfo, ...obj };
      this.changeInfo(info);
    }
  }
};
</script>


<style lang="less">

.explainPre {
  white-space: pre-wrap;
}
.app-living-pic {
  width: 212px;
  height: 120px;
  background: rgba(196, 165, 127, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    min-width: auto !important;
    height: auto !important;
  }
  p {
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin-top: 5px;
    span {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
.app-learningDetails-Model {
    border-radius: 5px;

  .Model-content-left{
    border-radius: 5px;
  }
  .app-zwl-homework{
      cursor: pointer;
    background: #b19575!important;
    color: #fff!important;
}
  // 本关任务
  // 未提交
  .app-change-pyli-notSubm {
    line-height: 23px !important;
    &::before {
      content: "";
      width: 1px;
      height: 100%;
      position: absolute;
      left: 7px;
      display: inline-block;
      background: #eaeaea;
      top: 10px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 15px;
      height: 15px;
      position: absolute;
      left: 0px;
      background: rgba(204, 204, 204, 1);
      border: 4px solid RGBA(242, 240, 239, 1);
      border-radius: 50%;
      top: 10px;
    }
    & > span > span {
      color: rgba(153, 153, 153, 1);
    }
  }
  //已提交
  .app-change-pyli-Subm {
    line-height: 23px !important;
    &::before {
      content: "";
      width: 1px;
      height: 100%;
      position: absolute;
      left: 7px;
      display: inline-block;
      background: #eaeaea;
      top: 10px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 15px;
      height: 15px;
      position: absolute;
      left: 0px;
      background: rgba(177, 149, 117, 1);
      border: 3px solid RGBA(240, 234, 228, 1);
      border-radius: 50%;
      top: 10px;
    }
    & > span > span {
      color: rgba(177, 149, 117, 1);
    }
  }
  //已批阅
  .app-change-pyli-haveRead {
    line-height: 23px !important;
    &::before {
      content: "";
      width: 1px;
      height: 100%;
      position: absolute;
      left: 7px;
      display: inline-block;
      background: #eaeaea;
      top: 10px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 15px;
      height: 15px;
      position: absolute;
      left: 0px;
      background: #077478;
      border: 4px solid #d7e5e5;
      border-radius: 50%;
      top: 10px;
    }
    & > span > span {
      color: rgba(7, 116, 120, 1);
    }
    & > input {
      background: rgba(180, 152, 118, 1) ;
      color: white ;
    }
  }

  .app-equipment_content-pic {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 0 !important;
    margin-right: 13px !important;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // .learningDetails-Model {
  //   .model-50 {
  //     margin-top: -50px;
  //   }
  //   .model-li35 {
  //     line-height: 35px;
  //   }
  // }
  .app-study-detail {
    article > h4 {
      display: flex;
      align-items: center;
    }
  }
  .app-show_content {
    padding-right: 5px;
    box-sizing: border-box;
    max-height: 200px;
    overflow: auto;
    // height: 250px;
    // display: -webkit-box;
    // overflow: hidden;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
  }
}
.app-equipment_content-pic {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
// .learningDetails-Model {
//   .model-50 {
//     margin-top: -50px;
//   }
//   .model-li35 {
//     line-height: 35px;
//   }
// }
.app-study-detail {
  .el-dialog__body {
    font-size: 0;
    .Model-content-left.dis_in_block {
      font-size: 14px;
    }
  }
  article > h4 {
    display: flex;
    align-items: center;
  }
}
/***  学习了解-详情model  ***/
.Model-content-right {
  width: calc(125px);
  height: calc(369px);
  background: rgba(14, 5, 10, 0.05);
  // box-shadow: 0px 3px 30px 0px rgba(14, 5, 10, 0.05);
  opacity: 0.95;
  vertical-align: top;
  padding: 52px 64px 66px;
  text-align: center;
  position: relative;
}
.Model-content-right div.pos_a {
  bottom: 65px;
}
.Model-content-right div.pos_a p {
  margin-top: 5px;
}
.learningDetails-Model .el-dialog__header {
  display: initial;
  padding: 0px;
  position: absolute;
  z-index: 1;
  right: 10px;
}
.learningDetails-Model .el-dialog__header .el-icon-close {
  color: #c4a57f;
}
.learningDetails-Model .el-dialog__body {
  padding: 0px;
  margin-top: -20px;
}
.learningDetails-Model .middle {
  margin-left: 4px;
  color: rgba(0,0,0,.7);
}
.learningDetails-Model .Model-content-left {
  width: calc(579px);
  padding: 26px;
  box-shadow: none;
  height: 100%;
  /*闯关说明*/
}
.learningDetails-Model .Model-content-left > h3 {
  margin-bottom: 28px;
  margin-top: -6px;
}
.learningDetails-Model .Model-content-left .show_content {
  margin-left: 28px;
  line-height: 25px;
}
.learningDetails-Model .Model-content-left .show_content > a:hover {
  color: darkcyan;
}
.learningDetails-Model .Model-content-right {
  width: calc(562px);
  padding: 71px 33px 52px;
  height: 100%;
}
.learningDetails-Model .Model-content-right article > h4 {
  text-align: left;
}
.learningDetails-Model .Model-content-right article:nth-child(1) {
  height: 165px;
  min-height: 165px;
}
.learningDetails-Model .Model-content-right article:nth-child(2) {
  height: 128px;
}
.learningDetails-Model .Model-content-right article:nth-child(3) {
  height: 148px;
}
.learningDetails-Model .Model-content-right article .LevelTask_content {
  padding-right: 8px;
  margin-left: 28px;
  text-align: left;
  margin-top: 10px;
  height: 100px;
  overflow: auto;
  /* 已批阅 */
  /* 已提交 */
  /* 未提交 */
}
.learningDetails-Model .Model-content-right article .LevelTask_content li {
  position: relative;
  height: 35px;
  line-height: 35px;
  padding-bottom: 22px;
  padding-left: 26px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  ul
  li:last-child::before {
  display: none;
}
.Model-content-right article .LevelTask_content li::after {
  top: 4px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  li
  input {
    margin-right: 20px;
  float: right;
  width: 74px;
  height: 26px;
  border: 1px solid #c4a57f;
  color: #b49876;
  background: transparent;
  font-size: 12px;
  border-radius: 3px;
  line-height: 24px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  li
  > input.app-not-hover:hover {
  cursor: pointer;
  background: #b19575!important;
  color: white!important;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .pyli::after {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0px;
  background: #077478;
  border: 4px solid #d7e5e5;
  border-radius: 50%;
  top: 10px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .pyli::before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  left: 7px;
  display: inline-block;
  background: #eaeaea;
  top: 10px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .tjli::after {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0px;
  background: #b19575;
  border: 4px solid #f0eae4;
  border-radius: 50%;
  top: 10px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .tjli::before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  left: 8px;
  display: inline-block;
  background: #eaeaea;
  top: 10px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .noli::after {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0px;
  background: #ccc;
  border: 4px solid #f2f0ef;
  border-radius: 50%;
  top: 10px;
}
.learningDetails-Model
  .Model-content-right
  article
  .LevelTask_content
  .noli::before {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  left: 8px;
  display: inline-block;
  background: #eaeaea;
  display: none;
  top: 10px;
}
.learningDetails-Model .Model-content-right article .equipment_content {
  line-height: 40px;
}
.learningDetails-Model .Model-content-right article .equipment_content ul {
  text-align: left;
  margin-left: 28px;
}
.learningDetails-Model .Model-content-right article .equipment_content ul li {
  display: inline-block;
  margin-left: 17px;
}
.learningDetails-Model
  .Model-content-right
  article
  .equipment_content
  ul
  li:first-child {
  margin-left: 0px;
}
.learningDetails-Model .Model-content-right article .guide_content {
  margin-top: 10px;
  height: 110px;
  overflow: auto;
}
.learningDetails-Model .Model-content-right article .guide_content > div {
  border-bottom: 1px solid rgba(196, 165, 127, 0.2);
  padding-bottom: 13px;
  margin-bottom: 13px;
}
.learningDetails-Model
  .Model-content-right
  article
  .guide_content
  > div:last-child {
  margin-bottom: 0px;
  border-bottom: 0px;
}
.learningDetails-Model .Model-content-right article .guide_content a:hover {
  color: #c4a57f;
  cursor: pointer;
}
.learningDetails-Model .WatchVideo_ul {
  margin-top: 8px;
  margin-left: 28px;
  margin-bottom: 17px;
}
.learningDetails-Model .WatchVideo_ul li {
  border-radius: 5px;
  width: auto;
  height: 120px;
  overflow: hidden;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
}
.learningDetails-Model .WatchVideo_ul li:last-child {
  margin-left: 0px;
}
.learningDetails-Model .WatchVideo_ul li a {
  position: relative;
  height: 120px;
  display: inline-block;
}
.learningDetails-Model .WatchVideo_ul li a:hover::after {
  cursor: pointer;
  content: url(~assets/img/ico-FreeVideo-cf2.png);
  width: 100%;
  height: 120px;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  text-align: center;
  vertical-align: middle;
  left: 0px;
  top: 0px;
  padding-top: 47px;
}
.learningDetails-Model .WatchVideo_ul li a img {
  min-width: 120px;
  height: 120px;
  max-width: 212px;
}
</style>


