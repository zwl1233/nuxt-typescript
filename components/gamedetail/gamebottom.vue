
<template>
<!-- 弃用 -->
  <section>
    <div class="checkpoint_btn text-center">
      <button @click="jump('first')">晒作业</button>
      <button>
        <!-- <nuxt-link
          to="/Learning"
          tag="li"
        >评价</nuxt-link> -->
        <li @click="jump('second')">评价</li>
      </button>
      <button @click="jump('third')">介绍</button>
      <!-- <input type="button" value="晒作业" @click="doing('Sunwork')">
                        <input type="button" value="评价">
                        <input type="button" value="介绍" @click="doing('introduce')"> -->
    </div>
  </section>
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  props:["courseId","courseName"],
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      details: state => state.games.courseinfo.details,
    })
  },
  methods: {
    ...mapMutations({
      getCookie: "system/getCookie", //获取用户cookie
      Mobileverion: "login/Mobilephoneverification", //用户没有登录 请先登录
      changeDetails: "games/changeDetails", //学习详情
      changeCourseId:"Learning/changeCourseId",//课程id
      changeCourseName:"Learning/changeCourseName",//课程名
      changeTabId:"Learning/changeTabId",//Learning下的tabod
    }),
    doing(type) {
      //显示
      if (type == "Sunwork") {
        console.log("1");
        this.changeBaskHomework(true);
      } else {
        this.changeGameDescription(true);
      }
    },
    jump(tabId){
      console.log(this.courseId)
      this.changeTabId(tabId)
      //跳转路由
      this.changeCourseId(this.courseId)
      this.changeCourseName(this.courseName)
      console.log("跳转路由")
      this.$router.push({name:"Learning",query:{courseId:this.courseId}})

    }
  }
};
</script>

<style>
.GameDescription-Model .Model-content h4 {
  top: 30px !important;
}
.checkpoint_body .checkpoint_content .checkpoint_btn > button {
  border: 0px;
  width: 90px;
  color: #fff;
  height: 32px;
  background: #b49876;
  border-radius: 3px;
  margin-bottom: 70px;
  margin-left: 26px;
}
.checkpoint_body .checkpoint_content .checkpoint_btn > button:first-child {
  margin-left: 0px;
}
.checkpoint_body .checkpoint_content .checkpoint_btn > button:hover {
  cursor: pointer;
  background: #ceab82;
}
</style>
