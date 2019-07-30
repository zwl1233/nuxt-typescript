<template>
  <el-dialog
    :visible="visible"
    width="1000px"
    custom-class="app-change-work-detail app-change-el-dislog"
    @close="close(false)"
  >
    <section class="lookImg">
      <div class="lookImg-pic">
        <img :src="info.originalThumbUrl" alt>
      </div>
      <div class="lookImg-operation">
        <i class="el-icon-arrow-left" title="上一张" @click="prev"></i>
        <i class="el-icon-arrow-right" title="下一张" @click="next"></i>
        <i class="el-icon-zoom-in" title="查看原图" @click="jump"></i>
      </div>
      <div class="lookImg-info">
        <p class="lookImg-info-name fonS">{{info.introduction}}</p>
        <p class="lookImg-info-size" style="font-size:12px" v-if="info.longwidth">{{info.longwidth}}</p>
        <p class="lookImg-info-author fonS">
          {{info.author}}
        </p>
         <p class="lookImg-info-star" >
            <img
            @click="give"
              class="app-star"
              :src="info.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
            >
            <span class="lookImg-info-num">
              {{info.likeNum}}
            </span>
          </p>
      </div>
      <div class="lookImg-close" @click="close(false)" title="关闭"><i class="el-icon-close"></i></div>
    </section>
  </el-dialog>
</template>
<script>
import moment from "moment"
export default {
  data() {
    return {
      //   visible: true
      src: "",
      ind: 0,
      info: {}
    };
  },
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
    },
    changeList: {
      default: () => () => {}
    }
  },
  created() {
    this.ind = this.index;
    this.getSrc(this.ind, this.list);
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
      this.$axios
        .post("/production/detail", {
          token: "",
          productionId: list[index].productionId
        })
        .then(res => {
          this.info = res.result;
          console.log(this.info);
        });
    },
    //跳转图片路径
    jump() {
      window.open(this.info.originalThumbUrl);
    },
    give() {
      this.$axios
        .post("/production/praise", {
          productionId: Number(this.list[this.ind].productionId),
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.changeList(this.list[this.ind].productionId);
            this.getSrc(this.ind, this.list);
          }
        });
    }
  }
};
</script>
<style lang="less">
.app-change-work-detail {
  .lookImg {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: flex-start;
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
      text-align: left;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 150px;
      width: 50px;
      // height: 100%;
      // background: red;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      i {
        font-size: 16px;
        // color: #cdc5bd;
        color: #B49B76;
        margin: 16px 0;
        // color:rgba(153,153,153,1);
        // font-weight: 600;
        cursor: pointer;
      }
      .el-icon-zoom-in{
          margin-top: 65px;
        }
    }
    .lookImg-info {
      position: absolute;
      top: 350px;
      right: 0;
      width: 200px;
      & > p {
        // width: 200px;
        line-height: 27px;
        text-align: left;
      }
      .lookImg-info-name {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.9);
        // font-weight: bold;
      }
      .lookImg-info-size {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height:normal;
        margin-top: 5px;
      }
      .lookImg-info-author {
        margin-top: 12px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      .lookImg-info-star {
        margin-top: 15px;
        line-height: normal;
        // margin-left: 20px;
        img {
          width: 14px;
        }
        .app-star{
            margin-bottom: -2px;
        }
      }
      .lookImg-info-num {
        line-height: normal;
        padding-left: 4px;
        font-size: 12px;
      }
    }
    .lookImg-close{
      position: absolute;
      right: 185px;
      top: 15px;
      i{
        font-size: 16px;
        // color: #999999;
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


