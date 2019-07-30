<template>
  <section >
    <div class="paisuc-div">
      <div class="div-end">
        <span class="pa" style="width:20px;height:20px;display:inline-block">
          <!-- <img :src="require('@/assets/img/支付完成@2x.png')" alt> -->
          <img class="app-change-icon" style="vertical-align:inherit" :src="require('@/assets/changeIcon/5.png')" alt>
        </span>
        <span class="fonS" style="font-weight:normal;color:#BAA182">支付成功，祝学习开心~</span>
      </div>
      <p class="p-endp fzMicroYaHei">已成功支付学费：
        <span>
            <span v-if="this.$route.query.flag==1" style="color:#BAA182">{{this.$route.query.pic}}</span>
            <span v-if="this.$route.query.flag==2" style="color:#BAA182">{{this.$route.query.pic}} 
              <!-- <price  :number="this.$route.query.pic" style="display:inline-block"/> -->
              </span>
            </span> 元
        <span>订单编号：{{this.$route.query.orderSn}}</span>
      </p>
      <p class="p-endp2 fzMicroYaHei">成功支付后，订单状态的更新可能延迟，可半小时后再次查询</p>
      <p class="p-timer"><span style="color:rgba(186,161,130,1);">{{index}}s</span> 后自动跳转至首页</p>
      <p class="p-button-end" >
         <nuxt-link to="/My" tag="li">
          <button class="btn-yellow-border btn-yellow-order fzGB1-0" style="cursor:pointer;font-size:14px;width: 114px;height: 28px;">查看我的课程</button>
         </nuxt-link>
        </p>
    </div>
  </section>
</template>

<script>
import price from "@/components/price"; //价格小数点
export default {
components: {
    price
  },
  data(){
    return{
      index:10,
      timer:null
    }
  },
  mounted() {
    let that = this
    // that.timer =   setInterval(function(){
    //    that.index--;
    //      if(that.index<=0){
    //      clearInterval(that.timer)
    //      that.auto()
    //      return
    //    }
    //  },1000)
  },
  methods: {
    auto(){
        this.$router.push({
                path:"/",
        });
    }
  },
  beforeDestroy() {
     clearInterval(this.timer)
  },
};
</script>

<style lang="less">
.el-main {
  background: white;
}
.paisuc-div {
  margin: 100px auto;
  width: 900px;
  height: 370px;
  background: rgba(249, 249, 249, 1);
  // text-align: center;
  padding-left: 200px;
  padding-top: 95px;
  .div-end {
    // margin-left: 200px;
    width: 260px;
    height: 50px;
    font-size: 24px;
    font-family: STSongti-SC-Bold;
    font-weight: bold;
    color: rgba(38, 194, 103, 1);
    line-height: 24px;
    position: relative;
    .pa {
      position: absolute;
      left: -35px;
      top: 2px;
    }
  }
  .p-endp {
    // text-align: center;
    width: 641px;
    height: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    // margin-left:95px;
    span:nth-of-type(1) {
      color: #ffa800;
    }
    span:nth-of-type(2) {
      margin-left: 30px;
    }
  }
  .p-endp2 {
    width: 566px;
    // margin-left: 83px;
    margin-top: 5px;
    height: 20px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
  .p-timer{
    width:124px;
    height:13px;
    font-size:12px;
    font-family:FZLTXHJW--GB1-0;
    font-weight:bold;
    color:#999999;
    line-height:18px;
    margin-top: 30px;
    // margin-left: 200px;
  }
  .p-button-end{
    margin-top: 15px;
    // margin-left: -380px;
  }
}
</style>
