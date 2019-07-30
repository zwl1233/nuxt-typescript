<template>
  <article class="listContent  clear">
    <ol class="w1000 m-auto">
      <li v-for="(item,index) in list" :key="index" class="olli">
        <h3 class="fz24 fonS" style="font-weight:400">
          <time class="fzMicroYaHei" style="margin-left: -10px;"> &nbsp;{{item.publishTime.split("-")[1]}}  
            <br>
            {{item.publishTime.split("-")[2].slice(0,2)}}日 
          </time> 
          <span class="fzSim-Sun" >
          <!-- {{item.articleColumnName}}  |   -->
          {{item.articleTitle}}
          </span>
        </h3>
        <div class="layui-row flex">
          <div class="layui-col-xs6 layui-col-md5 fiximg">
            <img v-lazy="item.thumbUrl" alt>
          </div>
          <div class="layui-col-xs12 layui-col-md7 titletext" style="padding-left:68px !important;" >
            <ul class="fz14 c9">
              <li  class="fzMicroYaHei">
                {{item.articleIntroduction}}
                <br/>
                <br/>
                 <a :href="item.articleUrl" target="view_window" class="c077">查看全文</a>
                <!-- <div> <a :href="item.articleUrl" target="view_window" class="c077">查看全文</a></div> -->
              </li>
            </ul>
            
          </div>
        </div>
      </li>
    </ol>
  </article>
</template>

<script>
export default {
  data() {
    return {
        list:[]
    };
  },
  props: ["articleList"],
  created() {
      this.list=this.articleList
  },
  methods:{
      updataList(data) {
          this.list=data
      },
  },
  watch:{
     articleList(newVal,oldVal){
        this.updataList(newVal)
     }
  },
};
</script>
<style>

.titletext ul li{
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp:8;
    text-overflow: ellipsis;
   /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    max-height: 208px;
    line-height: 26px;
   
}
</style>

<style lang="less" scoped>
.titletext ul{
   position: relative;
    a{
      position: absolute;
      bottom: -40px;
    }
}

.fiximg img{
  width: 410px;
  height: 236px;
}
.listContent {
  padding-top: 82px;
  // padding-bottom: 40px;
  /* box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05); */
  // box-shadow: 0 20px 53px -12px rgba(14, 5, 10, 0.05);
}

.listContent > ol > li {
  margin-bottom: 55px;
}

.listContent > ol > li h3 {
  margin-bottom: 20px;
  position: relative;
}

.listContent > ol > li h3 time {
  /* content: ''; */
  width: 55px;
  height: 51px;
  border-radius: 50%;
  display: inline-block;
  background: rgba(245, 245, 245, 1);
  position: absolute;
  left: -60px;
  top: -8px;
  font-size: 16px;
  text-align: center;
  padding-top: 0.375rem;
  color: #999;

}

.listContent > ol > li h3 + div > div:last-child {
  position: relative;
  height: auto;
  // padding-left: 93px;
}

.listContent > ol > li h3 + div > div:last-child p {
  position: absolute;
  bottom: 0px;
}
</style>

