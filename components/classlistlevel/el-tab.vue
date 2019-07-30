<template>
  <section class="xieyisection">
    <!-- 列表--> 
    <div
      class="Class_list-content"
      v-for="(item,index) in listDatas"
      :key="item.courseFullId"
    >
      <!-- 全展示 -->
      <div v-if="item.isFull" >
          <quanfull :item="item" />
      </div>
      <!-- 单个单展示 -->
      <div v-if="!item.isFull">
        <dan :item="item"/>
      </div>
      <!-- 单阶列表-->
      <div class="SwiperSpace" v-if="item.isFull">
        <swiper             
          :swiperData="item.courseSingleResponseVos"
          :sum.sync="index"
          :ifs="Math.ceil(item.courseSingleResponseVos.length/4)"
        />
      </div>
      <div :class="{'app-abcd-eldiv8s':item.isFull}" v-if="sortType==1">
       <div class="eldiv8s">
          <span></span>
       </div>
      </div>
      <div  v-if="sortType==2">
       <div class="app-sortType-eldiv8s">
          <span></span>
       </div>
      </div>
      <!-- 全下单 -->
      <div v-if="item.isFull&&kind==1" >
        <danfull :item="item"/>
      </div>
    </div>
  
  </section>
</template>
<script>

import quanfull from "@/components/classlistlevel/quanfull"; //全
import dan from "@/components/classlistlevel/dan"; //单
import danfull from "@/components/classlistlevel/danfull"; //全下单
import swiper from "@/components/classlistlevel/swiper"; //底部单阶商品的左右更多

import price from "@/components/price"; //价格小数点
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      kind:1,//默认是按时间排序
      list:[],
    };
  },
  components: {
    timer, //定时器组件
    swiper, //更多切换组件
    price, //处理价格
    quanfull,
    dan,
    danfull
  },
  props: {
    listDatas: {
      //接口数据
      type: null,
      validator: function(value) {
        //过滤数据
        value = value.map(item => {
          if (item.courseDynamicElement == "null") {
            item.courseDynamicElement = "{}";
          }
          // item.courseDynamicElement=JSON.parse(item.courseDynamicElement)
          return item;
        });
        //  console.log(123,value)
        return true;
      }
    },
    sortType:{
      type:null
    }
  },
  created(){
    this.kind=this.sortType
    this.list.listDatas
    console.log('类型')
  },
  computed: {
    ...mapState({
      userstoken: state => state.system.token, //用户token
      isGive: state => state.classlist.isGive, //是否是赠课
      istype: state => state.classlist.istype, //单阶全阶
      orderid: state => state.classlist.orderid //订单id
    })
  },
  methods: {
    ...mapMutations({
      Loginpage: "login/Loginpage", //改变登录页面状态
      getCookie: "system/getCookie", //获取用户cookie
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Mobileverion: "login/Mobilephoneverification", //用户没有登录 请先登录
      changeisGive: "classlist/changeisGive", //是否是赠课
      changeistype: "classlist/changeistype", ////判断是单阶还是全阶
      changeorderid: "classlist/changeorderid" //订单id
    }),
  },
  watch:{
    sortType(newVal,oldVal){
      this.kind=newVal
    },
    listDatas(newVal,oldVal){
      console.log(newVal,"新数据")
      console.log(oldVal,"新数据")
      this.list=newVal
    },

  }
};
</script>
<style lang="less" >
.app-sortType-eldiv8s{
  height: 56px;
  span {
      display: inline-block;
      // margin-left: -200px;
    }
    span::after {
      content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 0px;
      height: 25px;
      top: -25px;
    }
}

.app-anddan-eldiv8ss:last-child{
  span{
    background: red;
  }
}
.app-abcd-eldiv8s{
  .eldiv8s span::after{
          margin-top: 11px !important;;
          margin-bottom: 66px !important;
  }
  .eldiv8s{
      // background: red;
  }
}
// .app-abcd-eldiv8s:last-child{
//   display: block;
  // display: none;
  // margin-bottom: 40px;
// }
.xieyisection{
  .Class_list-content{
  //  background: red;
  //  padding-bottom: 80px;
    .app-abcd-eldiv8s{
      // background: yellow;
      .eldiv8s{
         display: block !important;
      }
    }
  }
  .Class_list-content:last-child{
    // .app-abcd-eldiv8s{
    //   background: red;
    //    display: block !important;
    // }
    .app-sortType-eldiv8s{
      display: none;
    }
    .eldiv8s{
          display: none
    }
  }
    .eldiv8s {
    span {
      display: inline-block;
      // margin-left: -200px;
    }
    span::after {
      content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 22px;
      height: 25px;
      top: -25px;
    }
  }
  
}
.SwiperSpace {
  position: relative;
  height: 120px;
}
.el-carousel {
  width: 1120px;
  margin-left: -60px;
}
.tim {
  display: inline-block;
}
.btngreenover {
  width: 140px;
  height: 40px;
  background: #000000;
  opacity: 0.2;
  color: #fff;
  border-radius: 2px;
  font-size: 21px;
}
.btngreen-over {
  outline: none;
  width: 140px;
  height: 40px;
  background: #07767a;
  color: #fff;
  border-radius: 2px;
  border: none;
  font-size: 22px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.btn-yellow-border {
  cursor: pointer;
  font-size: 19px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.Class_list-content  .Class_list-content-img img {
  width: 488px;
  height: 291px;
}

.Class_list-content  .Class_list-content-img  span img {
  width: 52px;
  height: 52px;
  /* border: 3px solid #fff; */
  position: absolute;
  display: inline-block;
  left: -30px;
  top: -30px;
  border-radius: 50%;
  /* background: #C4A57F;
    color: #fff; */
  text-align: center;
  /* line-height: 20px;
    padding-top: 3px; */
}
.Fixedshape {
  width: 488px !important;
  height: 276px !important;
  display: inline-block;
  background-image: url("/img/timg.gif");
  background-position: center center;
}
.nobold {
  color: black !important;
  font-size: 24px;
  margin-top: 22px;
  margin-bottom: 32px;
  // font-family: FZXIYSK;
  font-family: FZXIYSK--GBK1-0;
}
.chapter {
  font-size: 14px;
  margin-left: 50px;
  font-weight: normal;
  color: #999999;
}
.price {
  top: 20px;
}
.price output {
  margin-bottom: 20px !important;
  display: inline-block;
}
.app-couse-yichu{
   overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
