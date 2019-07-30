<template>
<!-- 弃用 -->
  <section class="app-game-tabs">
    <div class="checkpoint_leftBtn pos_a">
      <input
        type="button"
        @click="showdiv"
        style="cursor:pointer;"
        class="btn-green-checkpoint"
        value="切换课程"
      > 
      <input
        type="button"
        class="btn-green-checkpoint"
        value="收藏课程"
        @click="collection"
        v-if="!isCollection"
      >
      <input
        type="button"
        class="btn-green-checkpoint"
        value="取消收藏"
        @click="removeCollection"
        v-if="isCollection"
      >
      <input
        type="button"
        class="btn-green-checkpoint"
        value="说明"
        @click="introduce"
      >
    </div>
    <div
      id="show"
      v-if="flag"
    >
      <ul class="gameTab-list">
        <li v-for="(item) in canStudylist" :key="item.courseId">
          <div class="fl">
            <img
              :src="item.coursePictureThumbUri"
              alt=""
            >
          </div>
          <div class="fl">
            <h6 class="fz14 c30">{{item.courseName}}</h6>
            <p class="fz12" style="line-height:22px">{{item.courseSubtitle}}</p>
            <time class="fz12">
              <!-- <span class="c9">已进行至第1课，共3课</span> -->
              <span class="c9">{{item.studyTips}}</span>
              <span class="c30 fr btnmt4">
                <li
                  class=" exact-active active-link  active-link"
                  v-if="item.classHourNum==5" 
                  @click="jump(item.courseId,'five')"
                >继续学习>></li>
                <li
                  class=" active-link  exact-active  active-link"
                  v-if="item.classHourNum==3"
                  @click="jump(item.courseId,'three')"
                >继续学习>></li>
                  
              </span>
            </time>
          </div>
        </li>
        <!-- 
        <li>
          <div class="fl">
            <img
              :src="require('@/assets/img/FreeVideo_lectures2.png')"
              alt=""
            >
          </div>
          <div class="fl">
            <h6 class="fz14 c30">第二阶 | 楷书精进</h6>
            <p class="fz12">《从书法之美到生活之美》</p>
            <time class="fz12">
              <span class="c9">已进行至第1课，共5课</span>
              <span class="c30 fr btnmt4">
                <nuxt-link
                  to="/gameplayfive"
                  tag="li"
                >继续学习>></nuxt-link>
              </span>
            </time>
          </div>
        </li>
        <li>
          <div class="fl">
            <img
              :src="require('@/assets/img/FreeVideo_lectures6.png')"
              alt=""
            >
          </div>
          <div class="fl">
            <h6 class="fz14 c30">第二阶 | 楷书精进</h6>
            <p class="fz12">《从书法之美到生活之美》</p>
            <time class="fz12">
              <span class="c9">已进行至第1课，共10课</span>
              <span class="c30 fr btnmt4">
                <nuxt-link
                  to="/gameplay"
                  tag="li"
                >继续学习>></nuxt-link>
              </span>
            </time>
          </div>
        </li> -->
      </ul>
      <div class="course_no_data" v-if='canStudylist.length<=0'>
        <img :src="require('@/assets/img/null-show.png')" alt="">
        <p class="fz12 c4a5 mt-15">暂时没有课程哦！</p>
      </div>
    </div>
    <GameDescriptiondetail v-if="GameDescription" />
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import GameDescriptiondetail from "@/components/gamedetail/GameDescriptiondetail"; //介绍

export default {
  data() {
    return {
      flag: false, //学习-了解
      canStudylist:[],
    };
  },
  components: {
    GameDescriptiondetail, //介绍
  },
  created(){
    this.getCourse()
  },
  computed:{
      ...mapState({
      GameDescription: state => state.games.courseinfo.GameDescription, //介绍
      courseId:state=>state.games.courseinfo.courseId,//课程id
      isCollection:state=>state.games.courseinfo.isCollection,//是否收藏
    })
  },
  methods: {
     ...mapMutations({
      changeGameDescription: "games/changeGameDescription", //介绍
      getCourseDetail:"games/getCourseDetail",//修改课程信息
      changeCourseName:"Learning/changeCourseName",//修改课程名字
    }),
    showdiv() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    //游戏闯关说明
    introduce(){
      console.log("游戏闯关说明")
      this.changeGameDescription(true)
    },
    //切换课程
    getCourse(){
      this.$axios.post("/usercourse/canstudylist",{token:""}).then((res)=>{
        if(res.code==0){
          this.canStudylist=res.result
        this.canStudylist=res.result
        this.$axios.post("/usercourse/detail",{token:"",id:this.courseId}).then((data)=>{
          if(data.code==0){
            console.log(data.result)
                this.getCourseDetail(data.result)
                this.changeCourseName(data.result.courseName)
          }
          })
        }
        console.log(res.result)
      })
    },
    collection(){
      console.log(1231,this.courseId)
      this.$axios.post("/usercourse/collection",{id:this.courseId,token:""}).then((res)=>{
        console.log(res)
        if(res.code==0){
          this.$axios.post("/usercourse/detail",{token:"",id:this.courseId}).then((data)=>{
                this.getCourseDetail(data.result)
                this.$message({
                  duration:5000,
                  message: this.$selfMsg.collection,
                  type: 'success'
              });
          })
        }else{
          this.$message({
            duration:5000,
            message:res.msg,
            type:"warning"
          })
        }
        
      })
    },
    removeCollection(){
      this.$axios.post("/usercourse/cancleCollection",{id:this.courseId,token:""}).then((res)=>{
        if(res.code==0){
           this.$message({
                  duration:5000,
                  message: this.$selfMsg.cancel,
                  type: 'success'
              });
          this.$axios.post("/usercourse/detail",{token:"",id:this.courseId}).then((data)=>{
                this.getCourseDetail(data.result)
          })
        }
        
      })

    },
    jump(courseId,kind){
      if(kind=="three"){
        this.$router.push({name:"gameplaythree",query:{courseId,}})

      }else if(kind=="five"){
        this.$router.push({name:"gameplayfive",query:{courseId,}})

      }
    }
  }
};
</script>

<style lang="less">
.app-game-tabs{
  .exact-active:hover{
    color:#C4A57F;
  }
}
.course_no_data{
  width: 300px;
    height: 80px;
    align-items: center;
    text-align: center;
    img{
      width: 60px;
    }
}
.btnmt4 {
  margin-top: 5px !important;
}
.checkpoint_body
  .checkpoint_content
  .checkpoint_title
  + .pos_r
.checkpoint_leftBtn {
  z-index: 2;
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
</style>
