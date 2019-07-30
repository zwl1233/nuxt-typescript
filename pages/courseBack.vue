<template>
  <div class="app-back-room" ref="ll">
    <iframe :src="src" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { Message } from "element-ui";
export default {
  //   async asyncData(app) {
  //   console.log(app, "app");
  //   let src=""
  //   let data = await app.$axios.post("/userclasshour/playcheck", {
  //     classhourId:app.query.id,
  //     token:"",
  //   });
  //   if (data.code == 0) {//code  0  成功  1 首页  2课程详情页
  //     if (data.result.code == 0) {
  //        src=`http://118.190.202.65:8086/userclasshour/playback?token=${app.store.state.system.token}&classhourId=${app.query.id}`;
  //     } else if (data.result.code == 1) {
  //       //重定向到首页
  //       Message({
  //       duration:2000,
  //       message:data.msg,
  //       type: 'warning'
  //     })
  //       app.redirect("/");
  //     } else if (data.result.code == 2) {
  //       //重定向到课程详情页
  //       Message({
  //       duration:2000,
  //       message: data.msg,
  //       type: 'warning'
  //     })
  //       // app.redirect("/singleOrder", { courseId: data.result.courseId });
  //       app.redirect({})
  //     }
  //   }
  //   return {
  //         src
  //       };
  // },
  data() {
    return {
      src: "",
      timer:null,
    };
  },
  async created() {
    //认证请求
    let data = await this.$axios.post("/userclasshour/playcheck", {
      classhourId: this.$route.query.id,
      token: ""
    });
    if (data.code == 0) {
      //code  0  成功  1 首页  2课程详情页
      if (data.result.code == 0) {
        //10.112.124.114   118.190.202.65
        this.src = `http://118.190.202.65:8086/userclasshour/playback?token=${
          this.token
        }&classhourId=${this.$route.query.id}`;
      } else if (data.result.code == 1) {
        //重定向到首页
        Message({
          duration: 5000,
          message: this.$selfMsg.pleaseLogin,
          type: "warning"
        });
        this.Loginpage(true)
        this.$router.push("/");
      } else if (data.result.code == 2) {
        //重定向到课程详情页
        // Message({
        //   duration: 5000,
        //   message: this.$selfMsg.payCourse,
        //   type: "warning"
        // });
        this.$router.push({
          name: "singleOrder",
          query: { courseId: data.result.courseId },
          params:{
            message:"请您先报名"
          },
        });
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.system.token //用户token
    })
  },
  mounted() {
    // let html=localStorage.getItem('callbackHTML')
    // this.$refs.ll.innerHTML=html;
    // console.log(document.body)
    // document.body.innerHTML=html
    // document.close();
    this.timer=setInterval(()=>{
      this.checkLogin()
    },5000)
  },
  methods: {
    ...mapMutations({
      Loginpage: "login/Loginpage", //弹出登录框
    }),
    checkLogin(){
      this.$axios.post("utility/checkLogin",{token:""}).then(res=>{
        if(res.code==0){
          console.log(res)
        }
      })
    }
  },
  beforeCreate () {
    clearInterval(this.timer)
  }
};
</script>
<style lang="less">
.app-back-room {
  width: 100%;
  height: 800px;
}
</style>


