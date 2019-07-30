<template>
  <article class="w1140 m-auto">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mt-40 dis_in_block">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">课程列表</el-breadcrumb-item> -->
      <el-breadcrumb-item>同学作业分享</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="w1000 m-auto">
      <div class="fz18 cb19 mt-60">
        <!-- <img class="middle" :src="require('@/assets/img/ico-Students_homework-cb19.png')" alt> -->
        <img class="middle app-change-icon" :src="require('@/assets/changeIcon/2.png')" alt> 
        <span class="middle">同学作业分享</span>
      </div>

      <div class="Students_homework-content mt-40">
        <el-row :gutter="25">
          <WaterFall :data="[1,2]"/>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="homeworkModel" custom-class="homework-Model" center>
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
              <a href="#javascript;;" @click="prev" class="dis_block">
                <img :src="require('@/assets/img/Model-left.png')" alt>
              </a>
              <a href="#javascript;;" @click="next" class="dis_block">
                <img :src="require('@/assets/img/Model-right.png')" alt>
              </a>
            </div>

            <div class="bigSearch mb-20">
              <a href="#javascript;;">
                <img :src="require('@/assets/img/Model-bigSearch.png')" alt>
              </a>
            </div>
            <div class="Model-text">
              <p class="fz14 c7271 mb-30">
                <span class="c030 fz18 mt-20">蔬食</span>
                <span class="dis_block mt-20">{{homeworkModellist.longwidth}}</span>
                <span class="dis_block mt-20">{{homeworkModellist.author}}</span>
              </p>
              <p class="c7271 fz12">
                <i
                  class="el-icon-star-on"
                  :style="{'cursor':'pointer',color:zecolor}"
                  @click="Give"
                ></i>

                
                <span class="dis_block mt-10">{{homeworkModellist.likeNum}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </article>
</template>

<script>
import WaterFall from "@/components/Waterfall.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      homeworkModel: false,
      homeworkModellist: [],
      index: 0,
      zecolor: "#727171"
    };
  },
  components: {
    WaterFall
  },
  computed: {
    ...mapState({
      appid: state => state.system.appid, //appid
      userstoken: state => state.system.token //用户token
    })
  },
  mounted() {},
  methods: {
    async auto() {
      let data = await this.$axios.post("/production/list", {
        pageIndex: 2,
        token: this.userstoken,
        appid: this.appid
      });
      console.log(data.result.productionResponseVos, "我是作品");
      this.changeList(data.result.productionResponseVos);
    },
    async homeworkModels(idx) {
      //列表页详情数据
      this.homeworkModel = true;
      this.index = idx; //传入id
      let data = await this.$axios.post("/production/detail", {
        productionId: idx
      });
      console.log(idx);
      console.log(data.result);
      this.homeworkModellist = data.result;
    },
    async next() {
      //下一张
      let data = await this.$axios.post("/production/nextdetail", {
        nextOrPrevious: "next",
        productionId: this.index
      });
      console.log(data.result);
      this.index = data.result.productionId;
      this.homeworkModellist = data.result;
    },
    async prev() {
      //上一张
      let data = await this.$axios.post("/production/nextdetail", {
        nextOrPrevious: "previous",
        productionId: this.index
      });
      console.log(data.result);
      this.index = data.result.productionId;
      this.homeworkModellist = data.result;
    },
    async Give() {
      //点赞
      let data = await this.$axios.post("/production/praise", {
        productionId: this.index
      });
      this.zecolor = "yellow";
      console.log(data.result);
    },
    ...mapMutations({
      changeList: "students_work/changeList" //我的课程切换tab
    })
  }
};
</script>

<style lang="less">
.el-main {
  background: white;
}
/****** 同学作业  Students_homework-content ****/

.Students_homework-content .el-col {
  position: relative;
  margin-bottom: 25px;
}
.Students_homework-content .el-col:hover .Students_homework-model {
  display: block;
  cursor: pointer;
}
.Students_homework-content .el-col .Students_homework-model {
  display: none;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: calc(90%);
  top: 0px;
  height: 100%;
  text-align: center;
}
.Students_homework-content .el-col .Students_homework-model .homework-height {
  margin-top: -46px;
  margin-left: -86px; //abc
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  p:nth-of-type(1) {
    margin-top: 0px;
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
  .el-col
  .Students_homework-model
  .homework-height
  > p:nth-child(2) {
  margin-top: 20%;
  margin-bottom: 10%;
}
.Students_homework-content
  .el-col
  .Students_homework-model
  .homework-height
  > p:last-child {
  color: #fff;
}
.homework-Model {
  width: auto;
  margin-left: 6%;
  margin-right: 6%;
}
.homework-Model .el-dialog__header {
  display: none;
}
.homework-Model .homeworkModel-content {
  position: relative;
  padding-top: 7%;
  padding-bottom: 7.1%;
}
.homework-Model .homeworkModel-content .Model-content-img {
  min-height: 600px;
  img {
    max-width: 700px;
  }
  padding-left: 25%;
  padding-right: 5%;
}
.homework-Model .homeworkModel-content .Model-content-text {
  position: absolute;
  right: 0;
}
.homework-Model .homeworkModel-content .Model-content-text .close {
  margin-top: 75px;
  margin-bottom: 230px;
}
.homework-Model
  .homeworkModel-content
  .Model-content-text
  .shuffling
  > a:nth-child(1) {
  margin-bottom: 37px;
}
.homework-Model .homeworkModel-content .Model-content-text .bigSearch {
  margin-top: 85px;
}
.homework-Model .homeworkModel-content .Model-content-text .Model-text {
  bottom: 0px;
}
.homework-Model
  .homeworkModel-content
  .Model-content-text
  .Model-text
  > span:nth-child(2) {
  margin-top: 5px;
  margin-bottom: 18px;
}
//  <el-col :span="6" >
//                                                     <img :src="require('@/assets/img/Students_homework1.png" alt="">
//                                                     <div class="Students_homework-model" @click="homeworkModel = true">
//                                                         <div class="homework-height">
//                                                             <p class="fz18 cf">临弘仁山水</p>
//                                                             <p class="fz14 cf">— 赵莎 —</p>
//                                                             <p>
//                                                                 <i class="el-icon-star-on dis_block"></i>
//                                                                 <span>128</span>
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                             </el-col>
</style>
