<template>
  <div class="FreeVideo app-FreeVideo">
    <h1 class="les">
      视频分享
      <p class="app-index-Subheading">好看的，智慧的，滋养的</p>
    </h1>
    <div class="Video" style="margin-top:60px">
      <!-- <video controls :poster="imgurl"  v-lazy='imgurl' width="554" height="313" >
                <source :src="VideoUri" :type="VideoUri">
      </video>-->
      <div class="app-videoPlay-box">
        <div class="app-videoPlay-box-playIcon" @click="play" v-show="iconFlag">
          <img src="~assets/img/ico-FreeVideo-cf2.png" alt>
        </div>
        <div class="app-FreeVideo-play" ref="dplayer"></div>
      </div>
      <!-- <div>
        <div class="app-FreeVideo-play"></div>
      </div>-->
    </div>
    <div class="VideoLink" style="margin-top:47px">
      <ol class="m-auto Free_videoList app-change-Free-videoList">
        <li style="cursor:pointer">
          <span
            :class="{active:index==idx,text:(index+1)%2==0,right:(index+1)%3==1}"
            v-for="(item,index) in FreevideodataAry"
            :key="index"
            @click="cli(item.coursePictureUri,item.courseVideoUri,index)"
          >{{item!==null?item.courseName:''}}</span>
        </li>
      </ol>

    </div>
          <p class="lookAll les" style="margin-top:0px;padding-top:43px">
        <a href="Videosharing" class="app-index-look-more">查看所有</a>
      </p>
  </div>
</template>

<script>
import DPlayer from "dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default {
  data() {
    return {
      imgurl: "",
      idx: 0,
      VideoUri: "",
      dp: null,
      iconFlag: true
    };
  },
  props: {
    FreevideodataAry: {
      type: null
    }
  },
  methods: {
    //切换视屏资源
    cli(src, videoSrc, index) {
      if (index == this.idx) return;
      // if (this.alreadyVideo.includes(index)) {
      //   console.log(videoSrc)
      //   this.dp.switchVideo({
      //     url: videoSrc,
      //     pic: src
      //   });
      //   this.imgurl = src;
      //   this.idx = index;
      //   return;
      // }
      // this.alreadyVideo.push(index);
      this.imgurl = src;
      this.idx = index;
      this.iconFlag = true;
      if (index == 0) {
        //第一条已经转化了的
        this.VideoUri = videoSrc;
        console.log(videoSrc);
        this.dp = new DPlayer({
          container: document.getElementsByClassName("app-FreeVideo-play")[0],
          autoplay: false,
          theme: "#FADFA3",
          loop: false,
          lang: "zh-cn",
          screenshot: false,
          hotkey: false,
          preload: "auto",
          volume: 0.7,
          mutex: true,
          video: {
            quality: videoSrc,
            defaultQuality: 2,
            pic: src
          }
        });
        this.watchEvent();
        return;
      }
      this.$axios.post("utility/getUrl", { key: videoSrc }).then(res => {
        if (res.code == 0) {
          this.dp = new DPlayer({
            container: document.getElementsByClassName("app-FreeVideo-play")[0],
            autoplay: false,
            theme: "#FADFA3",
            loop: false,
            lang: "zh-cn",
            screenshot: false,
            hotkey: false,
            preload: "auto",
            volume: 0.7,
            mutex: true,
            video: {
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
              ],
              defaultQuality: 2,
              pic: src
            }
          });
          this.watchEvent();
          // this.dp.switchVideo({
          //   // url: res.result.highUrl,
          //   quality: [
          //     {
          //       name: "高清",
          //       url: res.result.highUrl
          //     },
          //     {
          //       name: "标清",
          //       url: res.result.url
          //     },
          //     {
          //       name: "流畅",
          //       url: res.result.lowUrl
          //     }
          //   ],
          //   pic: src,
          //   defaultQuality: 2,
          // });
        }
      });
    },
    play() {
      this.iconFlag = false;
      this.dp.play();
    },
    watchEvent() {
      //播放事件
      this.dp.on("play", () => {
        this.iconFlag = false;
      });
      console.log(this.dp);
      // console.log(this.$refs.dplayer.querySelector(".dplayer-controller"))
      // this.$refs.dplayer.querySelector(".dplayer-controller").style.opacity=0
    }
  },
  mounted() {
    console.log(this.FreevideodataAry, "数组");
    //拿到第一条转化好的路劲
    this.FreevideodataAry.forEach((item, i) => {
      if (i == 0) {
        this.imgurl = item.coursePictureUri;

        this.VideoUri = item.courseVideoUri;
      }
    });
    this.dp = new DPlayer({
      container: document.getElementsByClassName("app-FreeVideo-play")[0],
      autoplay: false,
      theme: "#FADFA3",
      loop: false,
      lang: "zh-cn",
      screenshot: false,
      hotkey: false,
      preload: "auto",
      volume: 0.7,
      mutex: true,
      video: {
        quality: this.VideoUri,
        defaultQuality: 2,
        pic: this.imgurl
      }
    });
    this.$refs.dplayer.oncontextmenu=()=>false;
    this.watchEvent();
  }
};
</script>

<style lang="less">
.app-FreeVideo {
  padding-bottom: 60px;
  .app-videoPlay-box {
    position: relative;
    width: 554px;
    height: 313px;
    // background: red;
    margin: 0 auto;
    .app-videoPlay-box-playIcon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 50%;
      z-index: 2;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .app-FreeVideo-play {
      width: 100%;
      height: 100%;
    }
  }
  .app-FreeVideo-play:hover .dplayer-controller {
    display: block;
    opacity: 1;
  }
  .dplayer-controller {
    display: none;
    opacity: 0;
    transform: all 15s;
  }
  .dplayer-controller-mask {
    opacity: 0;
  }
  .app-change-Free-videoList{
    &>li>span{
       &:nth-child(3n-2){
        text-align: left!important;
      }
      &:nth-child(3n-1){
        text-align: center!important;
      }
      &:nth-child(3n){
        text-align: right!important;
      }
    &:hover{
      color: #6a9092;
      &::before{
        background: #6a9092;
      }
     
      // &:nth-child(1){
      //   text-align: left!important;
      // }
      // &:nth-child(1){
      //   text-align: left!important;
      // }
      // &:nth-child(1){
      //   text-align: left!important;
      // }
    }}
  }
}
/* 免费视频 */
.FreeVideo {
  width: 100%;
  margin: 0 auto;
  // height: 730px;
  text-align: center;
  // background: #fffdf9;
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
  .Video {
    // margin-top: 50px;
  }
  .m-auto {
    margin: 0px auto;
  }
  .Free_videoList {
    width: 1000px;
    margin-top: 45px;
    li {
      // height: 50px;
      line-height: 50px;
      color: #999899;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
        font-size: 0;
      .text {
        text-align: center;
      }
      .right {
        text-align: left;
      }
      span {
        // border-bottom: 1px solid #ddd7d1;
        border-bottom: 1px solid transparent;
        width: 33.3%;
        flex: 1;
        min-width: 33.3%;
        max-width: 33.3%;
        font-size: 16px;
        text-align: center !important;
        cursor: pointer;
      }
      span:last-child {
        text-align: right;
      }
      span::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50px;
        background: #999899;
        margin-top: -3px;
        margin-right: 5px;
        vertical-align: middle;
      }
      span.active {
        color: #6a9092;
      }
      span.active::before {
        background: #097276;
      }
    }
  }
  .ViewMore {
    a {
      color: #030000;
      text-decoration: none;
    }
    clear: both;
    font-size: 16px !important;
    margin-top: 40px !important;
  }
}
</style>
