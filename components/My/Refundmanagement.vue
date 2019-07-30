
<template>
    <section class="app-refound">
        <!-- <blockquote class="cb49" style="paddingLeft:65px">
                 退款管理
                <i class="el-icon-date iconfont-shufa"></i>
          </blockquote> -->
          <div>
      <el-tabs class="overflowDefine define-tabsClass_List define-tabsOrder_list app-refound-tab" @tab-click="typelist">
        <el-tab-pane>
          <span slot="label" class="fz14">全部</span>
          <MyRefundmanagement/>
        </el-tab-pane>
        <el-tab-pane label="待支付">
          <span slot="label" class="fz14">退款审核中</span>
         <MyRefundmanagement/>
        </el-tab-pane>
        <el-tab-pane label="已支付">
          <span slot="label" class="fz14"> 已退款</span>
           <MyRefundmanagement/>
        </el-tab-pane>
      </el-tabs>
    </div>
     <div class="m-auto afters" v-if="flag" @click="timer">{{tit}}</div>
    <ScrollBottom @timer="timer" ref="mychild"/>
    </section>
</template>
 
<script>
// 弃用
import MyRefundmanagement from "@/components/My/MyAllList/MyRefundmanagement";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
export default {
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      flag: true, //是否有滚动条
      Timingopen: null
    };
  },
    components:{
        MyRefundmanagement,
        ScrollBottom
    },
     computed: {
    ...mapState({
      refundidx:state => state.my.mymanagement.page,  //我的退款页码
      refundtab:state => state.my.mymanagement.tabId,  //我的退款页码
    })
  },
 mounted() {
     this.$axios.post("/refund/list", {
        pageIndex: 1, 
        refundStatus: -1,
        token: ''
      }).then(res=>{
         this.Managementlist(res.result.refundResponseVos);
         this.createPage(1)
         if(res.result.refundResponseVos.length==0){
             this.$refs.mychild.gets()
             this.tit = "目前没有更多数据"
         }else{
            this.$refs.mychild.get()
            this.tit = "加载更多"
         }
      })
  },
    methods: {
     ...mapMutations({
      changeTabManagement: "my/mymanagement/changeTab", //退款管理tab
      Managementlist: "my/mymanagement/getmanagement", //退款管理list
      ManagementchangePage: "my/mymanagement/changePage", //退款管理获取page
      Managementaddlist: "my/mymanagement/addlist",
      createPage:"my/mymanagement/createPage"
     }),
     timer(fn) {
       if(this.tit == "目前没有更多数据"){
        return
      }
      let that = this;
      // fn=null  //关闭滚动条
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      that.Timingopen = setInterval(function() {
        that.ManagementchangePage(); //订单
        that.getListadd();
      }, 1000);
    },
    async getListadd(type) {
      clearInterval(this.Timingopen);
     let data = await this.$axios.post("/refund/list", {
          pageIndex:this.refundidx,
          refundStatus: this.refundtab,
          token:''
        });
        let newarr = data.result.refundResponseVos;
        if (newarr.length == 0) {
          this.tit = "目前没有更多数据";
          this.$refs.mychild.gets();
        } else {
          this.Managementaddlist(newarr);
          this.$refs.mychild.get();
        }
    },
   async typelist(tab){
       let data = await this.$axios.post("/refund/list",{
        refundStatus:tab.index,//订单状态
        pageIndex:1,//页码
        token:''
      })
      if(data.result.refundResponseVos.length==0){
         this.tit = "目前没有更多数据"
         this.$refs.mychild.gets();
      }else{
        this.tit = "加载更多"
        this.$refs.mychild.get()
      }
      this.changeTabManagement(tab.index)
      this.Managementlist(data.result.refundResponseVos)
      // this.$emit('repeat')
    }
  }
}
</script>

<style lang="less">
.app-refound-tab{
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
  .el-tabs__content{
    // min-height: 600px;
  }
    .el-tabs__active-bar {
      display: block !important;
      margin-left: 30%;
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
        border: 5px solid white;
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
    .el-tabs__item.is-top:last-child {
      padding-right: 0 !important;
    }
    .el-tabs__nav-wrap:after {
      // opacity: 0.4;
    // background: radial-gradient(#eaeaea, #c4a57f, #eaeaea);
    background-color:transparent!important;
        background-size: contain!important; 
    background: url(~assets/img/tabs_after.png) no-repeat;
    }
}
</style>
