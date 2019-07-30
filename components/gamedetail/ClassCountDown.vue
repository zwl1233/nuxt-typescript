<template>
  <span :style="{display:isCountDown?'block':'inline-block'}">{{msg}}</span>
</template>
<script>
import { formData, computingTime } from "@/plugins/utils";
import moment from "moment";
export default {
  data() {
    return {
      msg: "", //倒计时
      timer: null,
      isCountDown:false,//是否是倒计时
    };
  },

  mounted() {
    console.log(this.time, "倒计时时间");
    // this.initTime(this.time);
    this.changeTime(this.time)
  },
  methods: {
    computingTime,
    //大于一天直接显示  小于一天使用倒计时显示
    initTime(time) {
      //判断时间
      let data = moment(time).add(-8,'h');
      let now = moment();
      let diff = data.diff(now); //毫秒数
      let n = 1000 * 60 * 60 * 24; //一天的毫秒数
      if (Math.abs(diff) > n) {
        //超过一天
        this.msg = data.format("YYYY.MM.DD");
      } else {
        this.countDownTime(data);
      }
      console.log(this.msg,"121212")
    },
    countDownTime(time) {
      let data = moment(time).utc();
      this.msg = this.computingTime(data, true); //对应的倒计时时间
      this.timer = setInterval(() => {
        // if(this.changeLiving){
        //     this.changeLiving()
        //   }
        if (
          moment().valueOf() >=
          data.valueOf()
        ) {
          
          clearInterval(this.timer);
          if(this.changeLiving){
            this.changeLiving()
          }
          return;
        }
        this.msg = this.computingTime(data, true);
      }, 1000);
    },
    changeTime(time){
      let now=moment()//当前时间
      let data=moment(time)//目标时间
      let diff = data.diff(now); //毫秒数
      let n = 1000 * 60 * 60 * 24; //一天的毫秒数
      if (Math.abs(diff) > n) {
        // debugger
        //超过一天 显示超过多少天
        this.isCountDown=false
        this.msg = Math.ceil(Math.abs(diff)/n)+'天';
      } else {
        //没有超过一天  显示倒计时
        this.isCountDown=true
        this.countDownTime(data);
        
      }
    }
  },
  props: ["time","changeLiving"]
};
</script>

