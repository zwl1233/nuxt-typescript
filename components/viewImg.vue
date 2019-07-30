<template>
  <el-dialog
    :visible="visible"
    width="1000px"
    custom-class="app-view-img app-change-el-dislog"
    @close="close(false)"
    append-to-body
  >
    <section class="lookImg">
      <div class="lookImg-pic">
        <img :src="src" alt>
      </div>
      <div class="lookImg-operation">
        <i class="el-icon-arrow-left" title="上一张" @click="prev"></i>
        <i class="el-icon-arrow-right" title="下一张" @click="next"></i>
        <i class="el-icon-zoom-in" title="查看原图" @click="jump"></i>
      </div>
       <div class="lookImg-close" @click="close(false)" title="关闭">
         <i class="el-icon-close"></i>
         </div>
    </section>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      //   visible: true
      src: "",
      ind: 0
    };
  },
  //   props:["visible","close","list","index"],
  props: {
    visible: {
      //弹出框状态
      type: Boolean,
      default: () => false
    },
    close: {
      //关闭函数
      type: Function,
      default: () => () => {}
    },
    list: {
      //图片数组
      type: Array,
      default: () => []
    },
    index: {}, //索引
    field: {
      //对数组所取的字段
      type: String,
      default: () => ""
    }
  },
  created() {
    this.ind = this.index;
    this.src = this.getSrc(this.ind, this.list);
    console.log(this.src);
  },
  methods: {
    //下一张
    next() {
      if (this.ind >= this.list.length - 1) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.lastImg,
          type: "warning"
        });
        return;
      }
      this.ind++;
      this.src = this.getSrc(this.ind, this.list);
    },
    //上一张
    prev() {
      if (this.ind <= 0) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.firstImg,
          type: "warning"
        });
        return;
      }
      this.ind--;
      this.src = this.getSrc(this.ind, this.list);
    },
    //获取当前的图片地址
    getSrc(index, list) {
      console.log(index, list.length);
      if (typeof list[index] == "string") {
        return list[index];
      } else {
        console.log(this.field);
        console.log(list[index][this.field]);
        return list[index][this.field];
      }
    },
    //跳转图片路径
    jump() {
      window.open(this.src);
    }
  }
};
</script>
<style lang="less">
.app-view-img {
  .lookImg {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-around;
    .lookImg-pic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 700px;
      height: 500px;
      line-height: 500px;
      text-align: center;
      img {
        max-width: 700px;
        max-height: 500px;
        // transform: translateY(50%);
      }
    }
    .lookImg-operation {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 50px;
      width: 50px;
      // height: 100%;
      // background: red;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      i {
        font-size: 16px;
        color: #B49B76;
        margin: 16px 0;
        cursor: pointer;
        
      }
      .el-icon-zoom-in{
          margin-top: 45px;
        }
    }
    .lookImg-close{
      position: absolute;
      right: 84px;
      top: 15px;
      i{
        font-size: 16px;
        color: #B49B76;
        cursor: pointer;
        
      }
    }
  }
  .el-dialog__headerbtn{
    display: none;
  }
}
</style>


