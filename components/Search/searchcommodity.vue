<template>
  <section>
    <div>
      <div class="Class_list-content">
        <p
          class="Courselist_Search fz14 mb-15 fzMicroYaHei"
          v-if="numbers"
          style="color:rgba(153,153,153,1);"
        >
          为您搜索到
          <span class="c1e7">{{numbers}}</span>个相关结果
        </p>
        <div class="clear">
          <div class="goods_list" style="width:1000px;overflow: hidden;">
            <el-col :span="6" v-for="(item,index) in commoditylist" :key="index">
              <img
                :src="item.commodityCoverUrl"
                v-lazy="item.commodityCoverUrl"
                alt
                style="width:231px;height:231px"
              >
              <div class="buy-model">
                <div class="goods_list-content">
                  <p class="fz16 cf">{{item.commodityName}}</p>
                  <p class="fz14 cf">
                    <price
                      :number="item.commodityPrice"
                      style="display:inline-block;background: rgba(0,0,0,0);"
                    />
                  </p>
                  <a :href="item.commodityUrl" target="view_window">
                    <button class="fz16 btn-buy">购买</button>
                  </a>
                </div>
              </div>
            </el-col>
          </div>
        </div>
      </div>
    </div>
    <p class="m-auto afters" style="text-align:center;margin-bottom: 40px !important;" @click="timer" >{{tit}}</p>
    <ScrollBottom @timer="timer" ref="mychild"/>
  </section>
</template>

<script>
import ScrollBottom from "@/components/about/scrollbottom"; //滚动条组件
import price from "@/components/price"; //价格小数点
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    ScrollBottom,
    price
  },
  props: {
    searchtext: {
      type: null
    }
  },
  data() {
    return {
      tit: "加载更多", //加载更多提示文本
      Timingopen: null,
      commoditylist: [],
      numbers: null
    };
  },
  mounted() {
    this.getdata();
    this.tit = "加载更多";
    this.$refs.mychild.get();
  },
  computed: {
    ...mapState({
      page: state => state.search.pagecoum
    })
  },
  methods: {
    ...mapMutations({
      changePage: "search/changepagecoum" //我的课程获取list
    }),
    timer(fn) {
      if (this.tit == "抱歉,没有搜索到相关内容") {
        return;
      }
      let that = this;
      this.$refs.mychild.get();
      this.tit = "正在加载...";
      this.Timingopen = setInterval(function() {
        that.changePage();
        that.getListadd();
      }, 1000);
    },
    getListadd() {
      let that = this;
      clearInterval(this.Timingopen);
      this.$axios
        .post("/search/commoditylist", {
          pageIndex: this.page,
          searchKeyword: this.searchtext
        })
        .then(res => {
          let newarr = res.result.searchCommodityResponseVos;
          if (newarr.length == 0) {
            this.tit = "抱歉,没有搜索到相关内容";
            this.$refs.mychild.gets();
          } else {
            newarr.forEach((item, i) => {
              that.commoditylist.push(item);
            });
            this.$refs.mychild.get();
            this.tit = "加载更多";
          }
        });
    },
    getdata() {
      this.$axios
        .post("/search/commoditylist", {
          pageIndex: 1,
          searchKeyword: this.searchtext
        })
        .then(res => {
          this.commoditylist = res.result.searchCommodityResponseVos;
          this.numbers = res.result.total;
          if (this.commoditylist.length == 0) {
            this.$refs.mychild.gets();
            this.tit = "抱歉,没有搜索到相关内容";
          } else {
            this.$refs.mychild.get();
            this.tit = "加载更多";
          }
          console.log(this.commoditylist, "我是搜索商品");
        });
    }
  }
};
</script>

<style lang="less">
.Class_list-content {
  position: relative;
  .el-col {
    margin-bottom: 21px;
    position: relative;
  }
  .el-col:hover .buy-model {
    display: block;
  }
  .buy-model {
    background: rgba(0, 0, 0, 0.6);
    width: 231px;
    height: 231px;
    position: absolute;
    top: 0px;
    display: none;
    text-align: center;
    .goods_list-content {
      width: 100%;
      height: 100%;
      // position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
      & > p:nth-child(1) {
        padding-top: 97px;
        padding-bottom: 7px;
        letter-spacing: 2px;
      }
      & > p:nth-child(2) {
        margin-top: 7px;
        margin-bottom: 27px;
      }
    }
  }

  // .el-col:last-child::after{
  //   position: absolute;
  //   left: 0;
  //   content: 'ssssssssssssssssssssssssssss';
  //   left:0;
  //   width: 1000px;
  //   height: 300px;
  //   background: red;
  //   display: inline-block;
  // }
}
</style>
