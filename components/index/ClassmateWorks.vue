<template>
  <!-- -->
  <section>
    <div class="app-auto-pic" @mouseenter="mouseover" @mouseleave="mouseout">
      <div
        class="app-auto-pic-content"
        ref="autoContent"
        :style="{width:imgAry.length*w1+'px',left:left+'px'}"
      >
        <div
          class="app-auto-pic-content-item"
          v-for="(item,index) in imgAry"
          :key="index"
          :style="{width:w1+'px'}"
        >
          <img :src="item.pictureUrl" alt>
        <div class="app-auto-pic-pas fonS" @click="lookImg(imgAry,index,'pictureUrl')">
            <p class="app-auto-pic-paise">
              <img
                class="app-star"
                :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                @click.stop="couselink(item.productionId)"
                alt
              >
            </p>
            <div class="app-auto-pic-pas-text">
              <h2>{{item.introduction}}</h2>
              <!-- <p style="font-size:10px;">{{item.productionLong}}cm×{{item.productionWidth}}cm</p> -->
              <p style="font-size:14px;marginTop:16px">{{item.longwidth}}</p>
              <p class="p-bottom">—&nbsp;{{item.author}}&nbsp;—</p>
            </div>
          </div>
        </div>
      </div>

      <div class="app-auto-pic-content-left" :style="{width:w2+'px'}">
        <span @click="prev">
          <i class="el-icon-arrow-left"></i>
        </span>
      </div>
      <div class="app-auto-pic-content-right" :style="{width:w2+'px'}">
        <span @click="next">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="app-auto-compon" :style="{width:w1+'px','margin-left':w2+'px'}">
      <!-- :style="{width:leftwidth + 'px',left:0 + 'px'}" -->
      <span
        id="auto-span"
        :style="{width:leftwidth + 'px',}"
        v-for="(item,index) in imgArys.slice(0,imgArys.length-3)"
        :key="index"
        @mouseenter="mouseOver(index)"
        @mouseleave="mouseOut"
        :class="{curSpan:isClass(index)}"
      ></span>
    </div>
    <!-- <ViewImg
      v-if="viewFlag"
      :visible="viewFlag"
      :list="ViewImgList"
      :index="viewIndex"
      :close="viewClose"
      :field="field"
    />-->
    <WorksDetail
      v-if="viewFlag"
      :visible="viewFlag"
      :list="ViewImgList"
      :index="viewIndex"
      :close="viewClose"
      :field="field"
      :changeList="changeList"
    />
  </section>
</template>
<script>
import WorksDetail from "@/components/worksDetail"; //查看大图
export default {
  props: {
    imgArys: {
      type: null
    }
  },
  data() {
    return {
      imgAry: [],
      left: -279, //当前偏移量
      leftStart: -279, //偏移量初始值
      timer: null, //轮播图
      index: 1, //当前张数
      flag: false, //多次点击事件
      leftwidth: null,
      spanindex: 0,
      viewFlag: false, //查看大图
      ViewImgList: [], //大图的数组
      viewIndex: 0, //对应的index
      field: "", //所取的字段
      w1: 0, //中间的宽度
      w2: 0 //左右两边的宽度
    };
  },
  mounted() {
    this.imgAry = this.imgArys;
    let length = this.imgArys.length;
    this.imgArys.forEach((item, idx) => {
      if (idx < 2) {
        this.imgArys.push(item);
      }

      if (idx == length - 1) {
        this.imgArys.unshift(item);
      }
    });
    this.imgAry = this.imgArys;
    this.initWidth();

    this.startTime();
    document.addEventListener("visibilitychange", this.small);
    window.addEventListener("resize", this.initWidth);
  },
  methods: {
    //判断是否当前图片
    isClass(ind) {
      //ind span的索引
      let n = this.imgAry.length - 3; //真实图片的张数
      if ((this.index - 1) % n == ind) {
        return true;
      } else {
        return false;
      }
    },
    //焦点鼠标经过事件
    mouseOver(ind) {
      if (this.flag) return;
      let n = this.imgAry.length - 3; //真实图片的张数
      this.stopTime();
      this.flag = true;
      this.index = ind + 1;
      this.animate(
        this.left,
        this.leftStart + (this.index - 1) * -this.w1,
        1500
      );
    },
    //焦点鼠标离开
    mouseOut() {
      if (!this.flag) return;
      this.startTime();
    },
    //动画偏移量
    animate(start, end, dur) {
      //总时间
      let v = (end - start) / dur; //速度
      let time = 0; //时间
      let timer = setInterval(() => {
        if (time >= dur) {
          clearInterval(timer);
          this.left = end;
          this.flag = false;
          return;
        }
        time += 10;
        this.left = start + v * time;
      }, 5);
    },
    //开启定时器
    startTime() {
      console.log('开启')
      let W = this.imgAry.length * this.w1; //总宽
      this.timer = setInterval(() => {
        this.leftspan = this.leftwidth * this.spanindex;
        this.index++; //下一张
        // console.log(this.spanindex, "idx");
        if (this.index >= this.imgAry.length - 1) {
          this.left = this.leftStart;
          this.index = 2;
        }
        //临界判断

        this.animate(
          this.left,
          this.leftStart + (this.index - 1) * -this.w1,
          1500
        );
      }, 4500);
    },
    stopTime() {
      console.log("定时器停止");
      console.log(this.timer)
      clearInterval(this.timer);
    },
    //鼠标经过
    mouseover() {
      this.stopTime();
    },
    //鼠标离开
    mouseout() {
      this.startTime();
    },
    //上一张
    prev() {
      if (this.flag) return;
      this.flag = true;
      this.index--;
      if (this.index <= 0) {
        this.index = this.imgAry.length - 3;
        this.left = this.leftStart + this.index * -this.w1;
      }
      this.animate(
        this.left,
        this.leftStart + (this.index - 1) * -this.w1,
        1500
      );
    },
    //下一张
    next() {
      if (this.flag) return;
      this.flag = true;
      this.index++;
      if (this.index >= this.imgAry.length - 1) {
        // debugger
        this.index = 2;
        this.left = this.leftStart;
      }
      this.animate(
        this.left,
        this.leftStart + (this.index - 1) * -this.w1,
        1500
      );
    },
    couselink(id, e) {
      this.$axios
        .post("/production/praise", {
          productionId: id,
          token: ""
        })
        .then(res => {
          if (res.result) {
            this.$axios
              .post("/production/recommendlist", {
                pageIndex: 1,
                token: ""
              })
              .then(res => {
                this.imgAry = res.result.productionResponseVos;
                //   console.log(this.ClassmateWorksImg,'ttttttttttttttttttttttttttt')
              });
          }
        });
    },
    //监听窗口事件
    small() {
      if (document.visibilityState == "hidden") {
        console.log("隐藏");
        this.stopTime();
      } else {
        console.log("显示");
        this.startTime();
      }
    },
    //查看大图
    lookImg(list, index, field) {
      console.log("时间");
      this.viewFlag = true;
      this.ViewImgList = list;
      this.viewIndex = index;
      this.field = field;
    },
    viewClose(flag) {
      this.viewFlag = flag;
    },
    //计算宽度
    initWidth() {
      console.log("计算宽度");
      let W = document.documentElement.clientWidth;
      if (W <= 1366) {
        W = 1366;
      }
      this.w1 = W * 0.4;
      this.w2 = W * 0.3;
      this.left = -(this.w1 - this.w2);
      this.leftStart = -(this.w1 - this.w2);
      this.leftwidth = this.w1 / (this.imgAry.length - 3);
    },
    //点赞成功
    changeList(id) {
      this.imgAry = this.imgAry.map(item => {
        if (id == item.productionId) {
          item.isLiked = true;
          item.likeNum += 1;
        }
        return item;
      });
    }
  },
  components: {
    WorksDetail
  },
  beforeDestroy() {
    clearInterval(this.timer);
    document.removeEventListener("visibilitychange", this.small);
    window.removeEventListener("resize", this.initWidth);
  }
};
</script>
<style lang="less" scoped>
.app-auto-compon {
  // position: relative;
  margin-top: -40px;
  width: 584px;
  height: 3px;
  //   background: #ccc;
  margin-left: 320px;
  text-align: left;
  span {
    display: inline-block;
    background: #ccc;
    height: 3px;
    // position: absolute;
  }
  .curSpan {
    background: RGBA(8, 114, 118, 1);
  }
}
.app-auto-pic {
  width: 100%;
  //   329
  height: 329px;
  min-width: 1366px;
  margin: 60px auto;
  position: relative;
  overflow: hidden;
  .app-auto-pic-content {
    //   transition: all 2s;
    position: absolute;
    //   left:-158px;
    height: 100%;
    cursor: pointer;
    .app-auto-pic-content-item:hover {
      .app-auto-pic-pas {
        display: block;
      }
    }
    .app-auto-pic-content-item {
      width: 584px;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      position: relative;
      .app-auto-pic-pas {
        display: none;
        padding-top: 30px;
        position: absolute;
        top: 0px;
        color: white;
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        .app-auto-pic-pas-text{
          position: absolute;
          width: 100%;
          top: 135px;
          left: 50%;
          transform: translateX(-50%);
          &>p{
            &:nth-child(3){
                margin-top: 40px;
            }
          }
        }
        h2 {
          font-size: 36px;
          letter-spacing: 2px;
          font-weight: 400;
        }
        .app-auto-pic-paise {
          margin-bottom: 80px;
          text-align: right;
          padding-right: 30px;
          img {
            width: 20px;
            right: 0;
          }
        }
        p {
          line-height: 15px;
          margin-top: 10px;
        }
        .p-bottom {
          margin-top: 55px;
        }
      }
    }
  }
  // 左遮罩
  .app-auto-pic-content-left {
    width: 305px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    span {
      font-size: 30px;
      color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
  //右遮罩
  .app-auto-pic-content-right {
    width: 311px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 0;
    top: 0;
    span {
      font-size: 30px;
      color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
}
//1366一下

@media screen and (max-width: 2000px) {
  .app-auto-pic {
    height: 329px !important;
  }
}
@media screen and (max-width: 1500px) {
  .app-auto-pic {
    height: 329px !important;
  }
}
</style>

