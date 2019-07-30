<template>
  <div class="video-dPlayer"  ref="videoPlay"></div>
</template>
<script>
// <VueDPlayer ref="player" :options="options"></VueDPlayer>
// import VueDPlayer from "vue-dplayer";
import DPlayer from "dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      videoObj: {},
      dp:null
    };
  },
  computed: {
    ...mapState({
      options: state => state.videoPlay.options //当前list
    })
  },
  components: {
    // VueDPlayer
  },
  mounted() {
     this.dp = new DPlayer({
      container: document.getElementsByClassName("video-dPlayer")[0],
      autoplay: false,
      lang: "zh-cn",
      theme: "#FADFA3",
      loop: false,
      lang: "zh-cn",
      screenshot: false,
      hotkey: true,
      preload: "auto",
      volume: 0.7,
      mutex: false,
      video: this.options.video
    });
    // console.log(this.$refs.videoPlay)
    this.$refs.videoPlay.oncontextmenu=()=>false;
    // dp.seek(2)
    // dp.notice("你上次观看至", 2000);
    
  },
  watch: {
    options(newVal, oldVal) {
      console.log("watch", newVal, oldVal);
      console.log(this.options.video);
      this.dp = new DPlayer({
        container: document.getElementsByClassName("video-dPlayer")[0],
        autoplay: false,
        lang: "zh-cn",
        theme: "#FADFA3",
        loop: false,
        lang: "zh-cn",
        screenshot: false,
        hotkey: true,
        preload: "auto",
        volume: 0.7,
        mutex: false,
        video: this.options.video
      });
      // this.dp.on('canplay',()=>{
        console.log('可以播放视频')
        // this.dp.seek(2);
        // this.dp.notice('已切换到上次观看到时间',3000)
        // setInterval(()=>{
        //   console.log(this.dp.video.currentTime)
        // },10000)
      // })
      // dp.notice('您上次观看至',2)
    }
  }
};
</script>
<style lang="less">
.video-dPlayer{
  width: 1000px;
  height: 564px;
}
</style>


