<template>
  <section>
    <div
      class="Order_list-content"
      v-for="(item,index) in $store.state.my.mymanagement.getmanagementList"
      :key="index"
    >
      <div class="clear pos_r">
        <h4 class="c097 fz17 normal" :style="{color:item.refundStatusColor}">
          {{item.refundStatusText}}
          </h4>
        <time class="fz14 c7271">
          <span>{{formData(item.refundTime,"","add")}}</span>
          <span>订单编号：{{item.orderSn}}</span>
        </time>
        <!-- <span class="c077 fz14 pos_a">
                应付总额：<strong class="c097 fz32">￥3280.00</strong>
        </span>-->
      </div>
      <div class="app-orderlist-givebox" v-if="item.refundStatusText=='退款成功'">
        <p class="app-orderlist-giving"></p>
        <span class="app-orderlist-givebox-span">
          <i class="el-icon-info" style="color:#c4a57f"></i>&nbsp;
          <span>用户已退款</span>
          <!-- <span>{{item.giftInfo.nickName}}&nbsp;( {{item.giftInfo.phoneNum}} )</span>
                      <span>
                        <b style="color:#c4a57f" v-if="item.giftInfo.isReceive">已领取</b>
                        <b style="color:#097276" v-else>未领取</b>
          </span>-->
        </span>
      </div>
      <div
        class="flex"
        v-for="(items,indexs) in item.courseIdList"
        :key="items.courseId"
        style="marginTop:20px"
      >
        <div class="dis_in_block pos_r Order_list-content-img">
          <div class="dis_in_block pos_r Order_list-content-img">
            <img alt width="159" height="144" v-lazy="items.coursePictureThumbUri">
          </div>
        </div>
        <div class="dis_in_block pos_r Order_list-content-text" style="    margin-top: -36px;">
          <div class="dis_in_block">
            <p class="fz16 c3" style="marginTop:33px;margin-bottom:20px;margin-left: -7px;">
              <span class="c998"></span>
              <span class="c648" style="color:#000">{{items.courseName}}</span>
            </p>
            <strong class="c097 dis_block fz16">
              {{items.coursePrice}}元
              <!-- <price :number="items.coursePrice" style="display:inline-block;marginLeft:-10px;"/> -->
            </strong>
          </div>

          <div class="dis_in_block" v-if="indexs==0">
            <div style="marginBottom:23px" v-for="(items,index) in item.operation" :key="index">
              <button
                class="btn-yellow-invoice"
                style="cursor:pointer;"
                @click="CancelRefude(item)"
              >撤销退款</button>
            </div>
            <!-- <button class="btn-yellow-loading">发票开具中</button> -->
            <!-- <button class="btn-yellow-order">取消订单</button> -->
          </div>
          <div class="dis_in_block" v-if="indexs!==0"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import price from "@/components/price"; //价格小数点
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { formData } from "@/plugins/utils";
export default {
  components: {
    price
  },
  data() {
    return {};
  },
  methods: {
    formData,
    //取消退款
    async CancelRefude(type) {
      this.$store.commit("system/getCookie");
      let userstoken = this.$store.state.system.token;
      console.log(type);
      let data = await this.$axios.post("/order/closerefund", {
        orderId: type.orderId,
        token: ""
      });
      //  console.log(data)
      this.$message({
        message: this.$selfMsg.backRefund,
        type: "success",
        duration: 5000,
      });
      this.update();
    },
    //更新列表数据
    async update() {
      console.log(this.$store.state.my.mymanagement.tabId);
      let data = await this.$axios.post("/refund/list", {
        refundStatus: this.$store.state.my.mymanagement.tabId, //订单状态
        pageIndex: 1, //页码
        token: ""
      });
      console.log(data, "123");
      this.Managementlist(data.result.refundResponseVos);
    },
    ...mapMutations({
      Managementlist: "my/mymanagement/getmanagement" //退款管理list
    })
  }
  //     methods: {
  //         async typelist(tab){
  //             let data = await this.$axios.post("/order/list",{
  //                 orderStatus:tab.index,//订单状态
  //                 pageIndex:1//页码
  //             })
  //             this.getOrderList(data.result)
  //             },
  //             ...mapMutations({
  //             changeTab: "myHomeWork/changeTab", //切换tab
  //             getOrderList:"myHomeWork/getOrderList",//获取list
  //         })
  //   }
};
</script>

<style>
</style>
