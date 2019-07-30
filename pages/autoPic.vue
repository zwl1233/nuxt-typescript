<template>
  <div class="app-auto-pic" @mouseover="mouseover" @mouseout="mouseout">
    <div
      class="app-auto-pic-content"
      ref="autoContent"
      :style="{width:imgAry.length*584+'px',left:left+'px'}"
    >
      <div class="app-auto-pic-content-item" v-for="(item,index) in imgAry" :key="index">
        <img :src="item" alt>
      </div>
    </div>
    <div class="app-auto-pic-content-left">
        <span @click="prev">
            <i class="el-icon-arrow-left"></i>
        </span>
    </div>
    <div class="app-auto-pic-content-right">
        <span @click="next">
            <i class="el-icon-arrow-right"></i>
        </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgAry: [
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/86405831_8%5B1%5D.jpg?Expires=1860310619&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=JnIQztGPUmlok80RbLi4%2FTVVzhk%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/691e3479b6e9c17c1e9cb4690370bf5b.jpg?Expires=1862140159&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=AmBqQktCMqqhdcf9LG4T%2FNyPmkc%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/86405831_8%5B1%5D.jpg?Expires=1860310619&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=JnIQztGPUmlok80RbLi4%2FTVVzhk%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/picturePath/17d576896d9968fddf1c5399c4a63370.jpg?Expires=1862469704&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=pVzCbKaWetvLzJ%2FbeEv5Q%2Bl83lA%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/86405831_8%5B1%5D.jpg?Expires=1860310619&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=JnIQztGPUmlok80RbLi4%2FTVVzhk%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/86405831_8%5B1%5D.jpg?Expires=1860310619&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=JnIQztGPUmlok80RbLi4%2FTVVzhk%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/691e3479b6e9c17c1e9cb4690370bf5b.jpg?Expires=1862140159&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=AmBqQktCMqqhdcf9LG4T%2FNyPmkc%3D",
        "http://wmk-up.oss-cn-beijing.aliyuncs.com/thumbPath/86405831_8%5B1%5D.jpg?Expires=1860310619&OSSAccessKeyId=LTAInz17TckDMLqG&Signature=JnIQztGPUmlok80RbLi4%2FTVVzhk%3D"
      ],
      left: -279, //当前偏移量
      leftStart:-279,//偏移量初始值
      timer: null, //轮播图
      index: 1, //当前张数
      flag:false,//多次点击事件
    };
  },
  mounted() {
    this.startTime();
  },
  methods: {
    //动画偏移量
    animate(start, end, dur) {
      //总时间
      let v = (end - start) / dur; //速度
      let time = 0; //时间
      let timer = setInterval(() => {
        if (time >= dur) {
          clearInterval(timer);
          this.left = end;
          this.flag=false
          return;
        }
        time += 10;
        this.left = start + v * time;
      }, 5);
    },
    //开启定时器
    startTime() {
      let W = this.imgAry.length * 584; //总宽
      this.timer = setInterval(() => {
          this.index++//下一张
          if(this.index>=this.imgAry.length-1){
              this.left = this.leftStart;
              this.index = 2;
          }
        //临界判断
        this.animate(this.left, this.leftStart+(this.index-1)*-584, 1500);
      }, 3000);
    },
    stopTime(){
        clearInterval(this.timer)
    },
    //鼠标经过
    mouseover(){
        this.stopTime()
    },
    //鼠标离开
    mouseout(){
        this.startTime()
    },
    //上一张
    prev(){
        if(this.flag)return
        this.flag=true
        this.index--
        if(this.index<=0){
            this.index=this.imgAry.length-3
            this.left=this.leftStart+this.index*-584
        }
        this.animate(this.left, this.leftStart+(this.index-1)*-584, 1500);

    },
    //下一张
    next(){
        if(this.flag)return
        this.flag=true
        this.index++
         if(this.index>=this.imgAry.length-1){
            this.index=2
            this.left=this.leftStart
        }
        this.animate(this.left, this.leftStart+(this.index-1)*-584, 1500);

    }
  }
};
</script>
<style lang="less" scoped>
.app-auto-pic {
  width: 1200px;
  height: 329px;
  margin: 60px auto;
  position: relative;
    overflow: hidden;
  .app-auto-pic-content {
    //   transition: all 2s;
    position: absolute;
    //   left:-158px;
    height: 100%;
    .app-auto-pic-content-item {
      width: 584px;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 左遮罩
  .app-auto-pic-content-left {
    width: 306px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    span{
        font-size: 30px;
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        cursor: pointer;
    }
  }
  //右遮罩
  .app-auto-pic-content-right {
    width: 312px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 0;
    top: 0;
    span{
        font-size: 30px;
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        cursor: pointer;
    }
  }
}
</style>

