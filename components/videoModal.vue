
<template>
  <el-dialog
    :visible="visible"
    :show-close="showClose"
    custom-class="videoDialog"
    width="80%"
    :append-to-body="appendBody"
    :before-close="close"
  >
    <VueDPlayer ref="player" :options="options" style="width:100%;height:600px"></VueDPlayer>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
export default {
  data() {
    return {
      timer: null,
      appendBody: true,
      showClose: false
      // url1:"http://vjs.zencdn.net/v/oceans.mp4",
      // options: {
      //   autoplay:true,
      //   video: {
      //     quality: [
      //       {
      //         name: "高清",
      //         url: this.url1,
      //         // type: 'hls',
      //       },
      //       {
      //         name: "清晰",
      //         url:this.url1,
      //         // type: 'normal'
      //       }
      //     ],
      //     defaultQuality: 0
      //     // pic: 'demo.png',
      //     // thumbnails: 'thumbnails.jpg',
      //   }
      // }
    };
  },
  props:["getList"],
  mounted() {
    let that=this
    this.seedVideo()
    
    this.$nextTick(() => {
      console.log(this.$refs.player.dp.video.currentTime, "dplayer");
      if (Number(this.time)) {
        this.$refs.player.dp.video.currentTime;
        this.$refs.player.dp.seek(Number(this.time));
        this.$refs.player.dp.notice("已跳至上次观看记录", 3000);
      }
    this.$refs.player.oncontextmenu=()=>false;

      this.initTimer();
    });

  },
  methods: {
    ...mapMutations({
      changeVisible: "videoModal/changeVisible"
    }),
    //关闭
    close() {
      console.log(this.getList)
      console.log("关闭")
      this.getList()
      this.changeVisible(false);

    },
    //记录时长
    initTimer() {
      //30秒一次
      this.timer = setInterval(() => {
        let time = Math.floor(this.$refs.player.dp.video.currentTime);
        console.log(this.$refs.player.dp.video.currentTime, "dplayer");
        this.$axios.post("/utility/rememberVideoTime", {
          classhourId: this.classhoursId,
          token: "",
          time: time
        });
      }, 30000);
    },
    //观看过视频
    seedVideo(){
      this.$axios.post("/utility/rememberVideoIsPlay",{
        token:"",
        classhourId: this.classhoursId,
      })
    }
  },
  computed: {
    ...mapState({
      visible: state => state.videoModal.visible, //弹出框可见
      options: state => state.videoModal.options,
      time:state=>state.videoModal.time,//上次播放时间
      classhoursId:state=>state.videoModal.classhoursId,//课时id
    })
  },
  components: {
    VueDPlayer
  },
  beforeDestroy() {
    this.changeVisible(false);
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
.videoDialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>


