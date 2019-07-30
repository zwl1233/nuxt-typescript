<template>
  <div class="LibraryShop">
    <h1 class="les">暄桐文房
      <p class="app-index-Subheading">笔砚精良，人生一乐</p>
    </h1>
    <div class="LibraryShopMain">
      <el-carousel height="300px" ref="libraryAuto" arrow="never">
        <el-carousel-item v-for="(item,index) in LibraryShopImg" :key="index">
          <img :src="item" alt>
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="LibraryShopMain-arrow LibraryShopMain-arrow-left" @click="LibraryShopMainPrev">
        <i class="el-icon-arrow-left"></i>
      </div> -->
      <!-- <div class="LibraryShopMain-arrow LibraryShopMain-arrow-right" @click="LibraryShopMainNext">
        <i class="el-icon-arrow-right"></i>
      </div> -->
    </div>
    <div class="StationeryProducts">
      <ul> 
        <span class="after" @click="jian" v-if="flag"><i class="el-icon-arrow-left"></i></span>
        <li v-for="(item,index) in shopdataAry" :key="index" ref="listli" style="transition:ease 1s all">
          <a :href="item.commodityUrl" target="view_window">
            <img
              :src="item.commodityCoverUrl"
              v-lazy="item.commodityCoverUrl"
              alt
              width="231"
              height="290"
            >
            <p>
              <!-- {{item.commodityType}} -->
              <!-- <span>{{item.commodityName}}</span> -->
            </p>
          </a>
        </li>
        <span class="before" @click="jia" v-if="flag"><i class="el-icon-arrow-right"></i></span>
      </ul>
    </div>
    <p class="lookAll2 les">
      <a href="Libraryshop" style="color:RGBA(8, 114, 118, 1)">进入暄桐文房</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LibraryShopImg: [
        "iconimg/Four_stores.png",
        "iconimg/Four_stores.png",
        "iconimg/Four_stores.png"
      ],
      num:0,
      flag: true,
      length: null
    };
  },
  props: {
    shopdataAry: {
      type: null
    }
  },
  methods: {
    LibraryShopMainPrev(){
      this.$refs.libraryAuto.prev()
    },
    LibraryShopMainNext(){
      this.$refs.libraryAuto.next()

    },
    jia() {
      //左
        var len = this.$refs.listli.length;
      if (this.num >= len-5 ) {
          this.num = len-5;
          var left = -((this.num = this.num+1) * 256 );
      }else{
         var left = -((this.num = this.num+1) * 256 );
      }
      console.log(this.num,left,this.length,len,'-----');
      if (this.length >= 2) {
        this.$refs.listli[0].style.marginLeft = left + "px";
        // console.log(this.$refs.listli[0].style.transform = 'all 3s')
        // this.$refs.listli.style.transform = " else all  3s";
      }
      //transform: translateX(1000px) scale(1);
    }, 
    jian() {
      //右
      var len = this.$refs.listli.length;
      var left = -((this.num = this.num-1) * 256 );
       if (this.num <= 0) {
        this.num = 0;
        left = 0;
      }
      this.$refs.listli[0].style.marginLeft = left + "px";
      console.log(this.num,left,'+++++++++');
    }
  },
  mounted() {
    this.length = Math.ceil(this.shopdataAry.length / 4);
    if (this.length < 2) {
      //判断是否需要翻页
      this.flag = false;
    } else {
      this.flag = true;
    }
    console.log(this.length);
  }
};
</script>

<style lang="less">
.lookAll2 {
  margin-top: 60px;
  width: 100%;
  text-align: center;
  padding-bottom: 60px;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      color: #777;
    }
  }
}
.LibraryShop {
  width: 100%;
  margin: 0 auto;
  // height: 1000px;
  text-align: center;
  // background: #fffdf9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  box-sizing: border-box;
  h1 {
    font-size: 37px;
    font-weight: 400;
    color: #097276;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  .LibraryShopMain {
    text-align: center;
    position: relative;
    .el-carousel {
      width: 1000px;
      margin: 60px auto 27px auto;
    }
  }
    .LibraryShopMain-arrow {
        cursor: pointer;
        color: #cac0b8;
        font-size: 30px;
        font-weight: 600;
        position: absolute;
        margin-top: -15px;
        top: 50%;
      }
      .LibraryShopMain-arrow-left {
        left: 150px;
      }
      .LibraryShopMain-arrow-right {
        right: 150px;
      }
  .StationeryProducts {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    .after {
      // content: url(~assets/img/People_write-left.png);
      position: absolute;
      top: 30%;
      margin-top: -11px;
      left:-70px;
      z-index: 999 !important;
      cursor: pointer;
      font-size: 25px;
      color: #818181;
    }
    .before {
      font-size: 25px;
      // content: url(~assets/img/People_write-right.png);
      position: absolute;
      right: -70px;
      top: 30%;
      margin-top: -11px;
      cursor: pointer;
      color: #818181;
    }
    ul {
      width: 1024px;
      display: flex;
      // height: 366px;
      overflow: hidden;
    }
    ul li:nth-of-type(1) {
      // transition: "else 3s all";
    }
    ul li {
      width: 231px;
      height: 231px;
      margin-right: 25px;
      float: left;
      transition: " all 3s else" !important;
      a{
        display: block;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    ul li:nth-of-type(4) {
    }
    ul li p {
      margin-top: -40px;
      text-align: center;
    }
  }
}
</style>
