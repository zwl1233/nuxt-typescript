<template>
  <section>
    <blockquote class="cb49" style="marginLeft:65px">课程介绍
      <!-- <i class="el-icon-date iconfont-shufa"></i> -->
    </blockquote>
    <!--介绍-->
    <div class="Introduce" style="margin-top:30px">
      <div v-if="imgAry.length<=0" class="app-Introduce-noData">
        <img
          :src="require('@/assets/img/null-show.png')"
          alt
          style="display:block;margin:15px auto"
        >
        <p class="fz12 c4a5 mt-15 colorNoData">暂时没有介绍哦!</p>
      </div>

      <!-- <img :src="require('@/assets/img/Introduce.png')" alt=""> -->
      <img  v-for="(item,index) in imgAry" :key="index" :src="item" alt="" style="display:block;margin:15px auto;width:300px">
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      imgAry: []
    };
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token, //用户token
      courseId: state => state.games.courseinfo.courseId
      //   tabId: state => state.classlist.tabId, //tabid
      //   page: state => state.classlist.page //page页码
    })
  },
  async created() {
    //  courseId 课程Id courseType 类型 1,单阶 2,全阶
    this.$axios
      .post("/usercourse/courseIntroduce", {
        courseId: this.courseId,
        courseType: 1
      })
      .then(res => {
        console.log(res);
        if (res.code == 0) {
           this.imgAry=res.result
        }
      });
  },
  methods: {
    ...mapMutations({
      getCookie: "system/getCookie" //获取用户cookie
      //   changeTab: "classlist/changeTab", //切换tab
      //   changePage: "classlist/changePage" //加载更多
    })
  }
};
</script>
<style lang="less">
.app-Introduce-noData {
  width: 100%;
  text-align: center;
  height: 400px;
  margin-top: 100px;
}
</style>



