<template>
  <section class="sectindex">
    <!-- <blockquote class="cb49" style="paddingLeft:65px">
      我的订单
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote> -->
    <div>
      <el-tabs
        class="overflowDefine define-tabsClass_List define-tabsOrder_list app-sectindex-tab"
        @tab-click="typelist"
      >
        <el-tab-pane v-for="item in ordertypelist" :key="item.typeId">
          <span slot="label" class="fz14 fzGB1-0" >{{item.typeName}}</span>
          <OrdList :typeId="item.typeId" :changeMychildGet="changeMychildGet"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-auto afters"  @click="timer"  v-if="flag">{{tit}}</div>
    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import OrdList from "./orderList.vue";
export default {
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      ordertypelist: [],
      Timingopen: null
    };
  },
  components: {
    OrdList,
    ScrollBottom
  },
  computed: {
    ...mapState({
      orderList: state => state.myHomeWork.orderList, //当前tab
      oderidx: state => state.my.order.page, //我的订单页码
      odertab: state => state.my.order.tabId
    })
  },
 mounted() {
   this.pageZero()
    this.$axios.post("/order/typelist", {}).then(res=>{
         this.ordertypelist = res.result;
    })
   this.$axios.post("/order/list", {
      orderStatus: -1, //订单状态
      pageIndex: 1,
      token: ""
    }).then(res=>{
         this.getOrderList(res.result.orderResponseVos);
         if(res.result.orderResponseVos.length==0){
             this.$refs.mychild.gets()
             this.tit = "暂时没有哦..."
         }else{
            this.$refs.mychild.get()
            this.tit = "加载更多"
         }
    })
   
  },
  methods: {
    ...mapMutations({
      changeTab: "my/order/changeTab", //订单切换tab
      getOrderList: "my/order/getOrderList", //订单获取list
      orderchangePage: "my/order/changePage", //我的订单获取page
      orderaddlist: "my/order/addlist",
      pageZero: "my/order/pageZero", //我的订单获取page
    }),
    changeMychildGet(){
      // alert('888')
        this.$refs.mychild.get();
        this.tit = "加载更多";
    },
    //定时器
    timer(fn) {
      if(this.tit == "暂时没有哦..."){
        return
      }
      let that = this;
      // fn=null  //关闭滚动条
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.orderchangePage(); //订单
        that.getListadd();
      }, 1000);
    },
    //加载更多
    async getListadd(type) {
      clearInterval(this.Timingopen);
      console.log(this.odertab);
      let data = await this.$axios.post("/order/list", {
        pageIndex: this.oderidx,
        orderStatus: this.odertab,
        token: ""
      });
      let newarr = data.result.orderResponseVos;
      console.log(newarr);
      if (newarr.length == 0) {
        this.tit = "暂时没有哦...";
        this.$refs.mychild.gets();
      } else {
        this.tit = "加载更多";
        this.orderaddlist(newarr);
        this.$refs.mychild.get();
      }
    },
    async typelist(tab) {
      if (tab.index == 0) {
        let data = await this.$axios.post("/order/list", {
          orderStatus: -1, //订单状态
          pageIndex: 1, //页码
          token: ""
        });
        if(data.result.orderResponseVos.length==0){
          this.$refs.mychild.gets()
           this.tit = "暂时没有哦..."
        }else{
          this.$refs.mychild.get()
          this.tit = "加载更多"
        }
        this.getOrderList(data.result.orderResponseVos);
        this.changeTab(-1);
      } else {
        if(tab.index==3){
          tab.index=4
        }
        let data = await this.$axios.post("/order/list", {
          orderStatus: tab.index, //订单状态
          pageIndex: 1, //页码
          token: ""
        });
        if(data.result.orderResponseVos.length==0){
          this.$refs.mychild.gets()
          this.tit = "暂时没有哦..."
        }else{
          this.$refs.mychild.get()
          this.tit = "加载更多"
        }
        this.getOrderList(data.result.orderResponseVos);
        this.changeTab(tab.index);
      }
      console.log(tab.index);
    }
  }
};
</script>

<style lang="less">
.app-sectindex-tab{
  & > .el-tabs__header.is-top {
    & > .el-tabs__nav-wrap.is-top {
      & > .el-tabs__nav-scroll {
        & > .el-tabs__nav.is-top {
          & > .el-tabs__item {
            width: 120px;
          }
        }
      }
    }
  }
  .el-tabs__active-bar {
    display: block !important;
    margin-left: 13.5%;
    // position: relative;
    // width: 0!important;
    border: none !important;
    background: transparent;

    &:after {
      position: absolute;
      // width: 10px;
      background: rgba(196, 165, 127, 1);
      // height: 10px;
      border-radius: 50%;
      // background: red;
      left: 50%;
      top: -12px;
      margin-left: -10px;
      content: "";
      width: 20px !important;
      height: 20px !important;
      border: 4px solid white;
      box-shadow: 0px 7px 7px 2px rgba(14, 5, 10, 0.05);
    }
  }
  .is-active::after {
    display: none !important;
    width: 0;
  }
  .el-tabs__item.is-top:nth-child(2) {
    padding-left: 0 !important;
  }
  .el-tabs__item.is-top:last-child{
    padding-right: 0!important
  }
  .el-tabs__nav-wrap:after {
    // opacity: 0.4;
    // background: radial-gradient(#eaeaea, #c4a57f, #eaeaea);
    background-color:transparent!important;
        background-size: contain!important; 
    background: url(~assets/img/tabs_after.png) no-repeat;
  }
  
}
.sectindex .btn-green-pay {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.sectindex .myordersection .Order_list-content-text button {
  cursor: pointer;
}
</style>
