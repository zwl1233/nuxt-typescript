<template>
  <div class="scrollWater" ref="scrollWater">
    <ul class="list">
      <li ref="aryOne">
        <div
          :class="['div',item.curHeight<minHeight?'app-change-scrollWater-autoHeight':'']"
          v-for="(item,index) in ary1"
          :key="index"
        >
          <img v-lazy="item.src" alt  >
          <div class="Students_homework-model" @click="homeworkModels(item.id)">
            <div class="app-change-homework-height">
              <p class="fz18 cf">{{item.introduction}}</p>
              <p class="lookImg-info-size" style="margin-bottom: 3px;color:white">{{item.longwidth}}</p>
              <p class="fz14 cf">— {{item.author}} —</p>
              <p>
                <img
                  class="app-star"
                  style="display:inline-block"
                  :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                >
                <span class="app-zwl-starNum">
                {{item.likeNum}}
                </span>
              </p>
              <!-- <p style="color:white"></p> -->
            </div>
          </div>
        </div>
      </li>
      <li>
        <div  :class="['div',item.curHeight<minHeight?'app-change-scrollWater-autoHeight':'']"  v-for="(item,index) in ary2" :key="index">
          <img v-lazy="item.src" alt  >
          <div class="Students_homework-model" @click="homeworkModels(item.id)">
           <div class="app-change-homework-height">
              <p class="fz18 cf fonS">{{item.introduction}}</p>
              <p class="lookImg-info-size fz12" style="margin-bottom: 3px;color:white">{{item.longwidth}}</p>
              <p class="fz14 cf fonS">— {{item.author}} —</p>
              <p>
                <img
                  class="app-star"
                  style="display:inline-block"
                  :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                >
                <span class="app-zwl-starNum">
                {{item.likeNum}}
                </span>
              </p>
              <!-- <p style="color:white">{{item.likeNum}}</p> -->
            </div>
          </div>
        </div>
      </li>
      <li>
        <div :class="['div',item.curHeight<minHeight?'app-change-scrollWater-autoHeight':'']"  v-for="(item,index) in ary3" :key="index">
         <img v-lazy="item.src" alt  >
          <div class="Students_homework-model" @click="homeworkModels(item.id)">
            <div class="app-change-homework-height">
              <p class="fz18 cf fonS">{{item.introduction}}</p>
              <p class="lookImg-info-size fz12" style="margin-bottom: 3px;color:white">{{item.longwidth}}</p>
              <p class="fz14 cf fonS">— {{item.author}} —</p>
              <p>
                <img
                  class="app-star"
                   style="display:inline-block"
                  :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                >
                <span class="app-zwl-starNum">
                {{item.likeNum}}
                </span>
              </p>
              <!-- <p style="color:white">{{item.likeNum}}</p> -->
            </div>
          </div>
        </div>
      </li>
      <li>
        <div :class="['div',item.curHeight<minHeight?'app-change-scrollWater-autoHeight':'']"  v-for="(item,index) in ary4" :key="index">
          <img v-lazy="item.src" alt  >
          <div class="Students_homework-model" @click="homeworkModels(item.id)">
            <div class="app-change-homework-height">
              <p class="fz18 cf fonS">{{item.introduction}}</p>
              <p class="lookImg-info-size fz12" style="margin-bottom: 3px;color:white">{{item.longwidth}}</p>
              <p class="fz14 cf fonS">— {{item.author}} —</p>
              <p>
                <img
                  class="app-star"
                  style="display:inline-block"
                  :src="item.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                >
                <span class="app-zwl-starNum">
                {{item.likeNum}}
                </span>
              </p>
              <!-- <p style="color:white">{{item.likeNum}}</p> -->
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- <el-dialog :visible.sync="homeworkModel" custom-class="homework-Model" center>
      <div class="Model-content">
        <div class="homeworkModel-content flex" :name="homeworkModellist.productionId">
          <div class="Model-content-img fl">
            <img
              :src="homeworkModellist.originalThumbUrl"
              v-lazy="homeworkModellist.originalThumbUrl"
              alt
              min-height="679"
            >
          </div>
          <div class="Model-content-text fr">
            <div class="close" @click="homeworkModel = false">
              <a href="#javascript;;">
                <img :src="require('@/assets/img/Model-close.png')" alt>
              </a>
            </div>
            <div class="shuffling">
              <a href="javascript:;" @click="prev" class="dis_block" title="上一张">
                <img :src="require('@/assets/img/Model-left.png')" alt>
              </a>
              <a href="javascript:;" @click="next" class="dis_block" title="下一张">
                <img :src="require('@/assets/img/Model-right.png')" alt>
              </a>
            </div>

            <div class="bigSearch mb-20">
              <a href="javascript:;" title="查看大图" @click="jump(homeworkModellist.originalThumbUrl)">
                <img :src="require('@/assets/img/Model-bigSearch.png')" alt>
              </a>
            </div>
            <div class="Model-text">
              <p class="fz14 c7271 mb-30">
                <span class="c030 fz18 mt-20">{{homeworkModellist.introduction}}</span>
                <span class="dis_block mt-20">{{homeworkModellist.longwidth}}</span>
                <span class="dis_block mt-20">{{homeworkModellist.author}}</span>
              </p>
              <p class="c7271 fz12">
                <img
                  class="app-star"
                  style="cursor:pointer"
                  :src="homeworkModellist.isLiked?require('@/assets/img/starClick.png'):require('@/assets/img/star.png')"
                  alt
                  @click="Give"
                >
                <span class="dis_block mt-10">{{homeworkModellist.likeNum}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog> -->
    <WorksDetail
      v-if="homeworkModel"
      :visible="homeworkModel"
      :list="dataAry"
      :index="index"
      :close="viewClose"
      :field="field"
      :changeList="updateGive"
    />
    <div class="m-auto afters "  @click="changelist" v-if="flag">{{tit}}</div>
  </div>
</template>
<script>
import WorksDetail from "@/components/worksDetail"; //作品详情
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  props: {
    productiondata: {
      type: null
    }
  },
  data() {
    return {
      tit: "加载更多",
      flag: true,
      homeworkModel: false,
      index: 0, //详情id
      zecolor: "#727171",
      homeworkModellist: [], //
      ary1: [],
      ary2: [],
      ary3: [],
      ary4: [],
      aryHeight: [
        { index: 0, H: 0 },
        { index: 1, H: 0 },
        { index: 2, H: 0 },
        { index: 3, H: 0 }
      ],
      page: 1,
      dataAry: [], //顺序数组
      minHeight: 120,//最小高度
      field:"pictureUrl",//原图的字段
    };
  },
  props: ["data"],
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
    })
  },
  mounted() {
    //处理数据
    this.$axios
      .post("/production/list", {
        pageIndex: 1,
        token: ""
      })
      .then(res => {
        console.log(res, "res");
        let data = res.result.productionResponseVos;
        if (data.length == 0) {
          //  this.$refs.mychild.gets()
          this.tit = "暂时都在这里了...";
        } else {
          //  this.$refs.mychild.get()
          this.tit = "加载更多";
        }
        this.initImgAry(data);
      });
  },
  methods: {
    ...mapMutations({
      Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
      Mobileverion: "login/Mobilephoneverification", //用户没有登录 请先登录
      Loginpage: "login/Loginpage" //改变登录页面状态
    }),
    //查看详情
     homeworkModels(idx) {
      //列表页详情数据
      console.log(idx);
      this.homeworkModel = true;
      this.dataAry.forEach((item,index)=>{
        if(idx==item.productionId){
          this.index=index//拿到所点击的索引
        }
      })

      // let data = await this.$axios.post("/production/detail", {
      //   productionId: idx,
      //   token: ""
      // });
      // console.log(idx);
      // console.log(data.result);
      // this.homeworkModellist = data.result;
    },
    async next() {
      //找到索引
      let ind = this.dataAry.findIndex(item => {
        return item.id == this.index;
      });
      ind++; //下一张
      if (ind >= this.dataAry.length) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.lastImg,
          type: "warning"
        });
        return;
      }
      //通过该索引找到id
      this.dataAry.forEach((item, index) => {
        if (index == ind) {
          // this.index=item.productionId
          this.homeworkModels(item.id);
        }
      });

      //下一张
      // let data = await this.$axios.post("/production/nextdetail", {
      //   nextOrPrevious: "next",
      //   productionId: this.index,
      //   token: this.userstoken,
      //   appid: this.appid
      // });
      // console.log(data);
      //  this.index = data.result.productionId
      //  this.homeworkModellist=data.result
    },
    async prev() {
      let ind = this.dataAry.findIndex(item => {
        return item.id == this.index;
      });
      ind--;
      if (ind < 0) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.firstImg,
          type: "warning"
        });
        return;
      }
      //通过该索引找到id
      this.dataAry.forEach((item, index) => {
        if (index == ind) {
          // this.index=item.productionId
          this.homeworkModels(item.id);
        }
      });

      //上一张
      // let data = await this.$axios.post("/production/nextdetail", {
      //   nextOrPrevious: "previous",
      //   productionId: this.index,
      //   token: this.userstoken,
      //   appid: this.appid
      // });
      // console.log(data.result);
      // this.index = data.result.productionId;
      // this.homeworkModellist = data.result;
    },
    async Give() {
      //  if(this.userstoken==null){
      //     this.Mailboxlogin(false)
      //     this.Mobileverion(false)
      //     this.Loginpage(true)
      //     return
      // }
      //点赞
      this.$axios
        .post("/production/praise", {
          productionId: this.index,
          token: ""
        })
        .then(res => {
          if (res.code == 0) {
            this.homeworkModels(this.index);
          }
        });
      // this.zecolor = "red";
    },
    //处理数据
    initImgAry(ary) {
      let W = this.$refs.aryOne.clientWidth - 20; //当前图片的宽
      ary.forEach((item, index) => {
        if (!item.productionLong || !item.productionWidth) {
          console.log("不合理的数据", item);
        }
        this.aryHeight = this.aryHeight.sort((a, b) => a.H - b.H);
        let curH = (item.productionLong / item.productionWidth) * W; //当前图片的高
        if (curH < this.minHeight) {//最小高度为108px
          this.aryHeight[0].H += this.minHeight;
        } else {
          this.aryHeight[0].H += curH;
        }
        //this.aryHeight[0].H += (item.height / item.width) * W; //当前图片的高
        let n = this.aryHeight[0].index;
        //console.log(n)
        switch (n) {
          case 0:
            this.ary1.push({
              src: item.thumbUrl,
              id: item.productionId,
              ...item,
              curHeight: curH
            });
            //this.ary1.push(item.src);
            break;
          case 1:
            this.ary2.push({
              src: item.thumbUrl,
              id: item.productionId,
              curHeight: curH,
              ...item
            });
            break;
          case 2:
            this.ary3.push({
              src: item.thumbUrl,
              id: item.productionId,
              curHeight: curH,
              ...item
            });
            break;
          case 3:
            this.ary4.push({
              src: item.thumbUrl,
              id: item.productionId,
              curHeight: curH,
              ...item
            });
            break;
        }
        this.dataAry.push(item);
        console.log(this.dataAry);
      });
      this.sortData();
      console.log("顺序数组", this.dataAry);

      //监听滚动事件
      window.onscroll = this.scrollFn.bind(this);
    },
    //排序数据
    sortData() {
      let data = [];
      let ary = [this.ary1, this.ary2, this.ary3, this.ary4];
      ary.sort((a, b) => a.length - b.length);
      //ary[3]//最长
      ary[3].forEach((item, index) => {
        if (this.ary1[index]) {
          data.push(this.ary1[index]);
        }
        if (this.ary2[index]) {
          data.push(this.ary2[index]);
        }
        if (this.ary3[index]) {
          data.push(this.ary3[index]);
        }
        if (this.ary4[index]) {
          data.push(this.ary4[index]);
        }
      });
      this.dataAry = data;
      console.log(this.ary1, "数组");
    },
    changelist() {
      if (this.tit == "暂时都在这里了...") {
        return;
      }
      this.tit = "正在加载...";
      setTimeout(() => {
        this.page++;
        this.$axios
          .post("/production/list", {
            pageIndex: this.page,
            token: this.userstoken,
            appid: this.appid
          })
          .then(res => {
            let data = res.result.productionResponseVos;
            if (data.length == 0) {
              return (this.tit = "暂时都在这里了...");
            } else {
              this.tit = "加载更多";
              //处理数据
              this.initImgAry(data);
            }
          });
      }, 1000);
    },
    //监听滚动事件
    scrollFn() {
      let H = this.$refs.scrollWater.scrollHeight; //真实高度
      let S = document.documentElement.scrollTop; //滚动量
      let C_H = document.documentElement.clientHeight; //屏高

      if (S >= H - 500) {
        window.onscroll = null;
        //请求数据
        this.changelist();
        // this.tit = "正在加载...";
        // setTimeout(() => {
        //   this.page++;
        //   this.$axios
        //     .post("/production/list", {
        //       pageIndex: this.page,
        //       token: this.userstoken,
        //       appid: this.appid
        //     })
        //     .then(res => {
        //       let data = res.result.productionResponseVos;
        //       if (data.length == 0) {
        //         return (this.tit = "目前没有更多数据");
        //       } else {
        //         this.tit = "加载更多";
        //         //处理数据
        //         this.initImgAry(data);
        //       }
        //     });
        // }, 1000);
      }
    },
    //查看大图
    jump(url) {
      window.open(url);
    },
    //关闭作品详情
    viewClose(flag){
      this.homeworkModel=flag
    },
    //更新点赞
    updateGive(id){
      this.ary1=this.ary1.map((item)=>{
        if(id==item.productionId){
          item.isLiked=true
          item.likeNum+=1;
        }
        return item
      })
      this.ary2=this.ary2.map((item)=>{
        if(id==item.productionId){
          item.isLiked=true
          item.likeNum+=1;
        }
        return item
      })
      this.ary3=this.ary3.map((item)=>{
        if(id==item.productionId){
          item.isLiked=true
          item.likeNum+=1;
        }
        return item
      })
      this.ary4=this.ary4.map((item)=>{
        if(id==item.productionId){
          item.isLiked=true
          item.likeNum+=1;
        }
        return item
      })

    }
  },
  components: {
    WorksDetail,
  },
  beforeDestroy () {
    window.onscroll = null;
  }
};
</script>
<style lang="less" scoped>
.app-change-homework-height {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
    &:nth-child(2) {
      margin-bottom: 20px;
    }
    &:nth-child(3) {
      margin-bottom: 10px;
    }
    .app-star {
      width: 16px !important;
      // height: 16px;
      margin: 0 auto;
    }
  }
  .app-zwl-starNum{
        color: white;
    padding-left: 4px;
    font-size: 12px;
    display: inline-block;
    transform: translateY(-3px);
  }
}
// 高度不足 图片居中处理
.app-change-scrollWater-autoHeight {
  height: 120px;
  & > img {
    object-fit: cover;
    height:100%;
  }
}
.afters {
  width: 100%;
  text-align: center;
  margin-bottom: 40px !important;
}
.scrollWater {
  width: 100%;
  height: auto;
  .list {
    width: 100%;
    height: auto;
    overflow: hidden;
    li {
      float: left;
      width: 25%;
      padding-right: 20px;
      box-sizing: border-box;
      > div {
        width: 100%;
        margin: 20px 0;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
.div {
  position: relative;
}
.Students_homework-content .div:hover .Students_homework-model {
  display: block;
  cursor: pointer;
}
.Students_homework-content .div .Students_homework-model {
  display: none;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  // width: 200px;
  width: calc(100%);
  top: 0px;
  // height: 100px;
  height: 100%;
  text-align: center;
}
.Students_homework-content .div .Students_homework-model .homework-height {
  // margin-top: -30px;
  // margin-left: -46px; //abc
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  p:nth-of-type(1) {
    margin-top: 0px;
    width: 220px;
    height: 24px;
    top: 40px;
  }
  p {
    margin-top: -10px;
    position: relative;
    .sha:nth-of-type(1) {
      margin-left: 30px;
    }
    .sha {
      margin-right: 40px;
    }
    .sha:nth-of-type(2) {
      margin-left: 40px;
    }
  }
  p b {
    position: absolute;
    font-weight: normal;
    display: inline-block;
    width: 70px;
    text-align: center;
    margin-left: -30px;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.Students_homework-content
  .div
  .Students_homework-model
  .homework-height
  > p:nth-child(2) {
  margin-top: 20%;
  margin-bottom: 10%;
}
.Students_homework-content
  .div
  .Students_homework-model
  .homework-height
  > p:last-child {
  color: #fff;
}
</style>
