<template>
  <div class="app-pagination page" v-if="total>pageSize">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeAry"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   currentPage: 1 //当前页数
      // layout:"total, sizes, prev, pager, next, jumper",//排列顺序
      // layout:"prev,pager,next"
    };
  },
  props: {
    //   sizeChange:{//pagesize改变触发的函数
    //       type:Function,
    //       default:()=>()=>{},
    //   },
    //   currentChange:{//页码改变函数
    //       type:Function,
    //       default:()=>()=>{},
    //   },
    getList: {
      //获取数据   默认有一个pageIndex获取数据
      type: Function,
      required: true
    },
    currentPage: {
      //当前页码
      default: () => 1
    },
    pageSizeAry: {
      //一页显示条数选择项
      type: Array,
      default: () => [10]
    },
    pageSize: {
      required: true
      //默认一页显示多少条
    },
    layout: {
      //分页器布局
      type: String,
      default: () => "prev,pager,next"
    },
    total: {
      required: true
    },
    top: {
      //top值
      default: () => "default"
    }
  },
  methods: {
    //pagesize改变
    handleSizeChange() {},
    //page改变
    handleCurrentChange(val) {
      console.log(document.documentElement.scrollTop, "top");
      // this.currentPage=val,
      //当前页
      this.getList(val);
      this.$nextTick(() => {
        // document.body.scrollTop=0
        // document.documentElement.scrollTop = 0;
        if (this.top == "default") {
          document.documentElement.scrollTop = 0;
          window.pageYOffset = 0;
          document.body.scrollTop = 0;
        } else {
          document.documentElement.scrollTop = Number(this.top);
          window.pageYOffset = Number(this.top);
          document.body.scrollTop = Number(this.top);
        }
      });
    }
  }
};
</script>
<style lang="less">
.app-pagination.page{
  button{
    border-radius: 3px;
  }
  .el-pager{
    &>li{
      border-radius: 3px;
    }
  }

}
</style>


