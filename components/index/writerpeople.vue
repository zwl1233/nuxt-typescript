<template>
  <div class="Writer">
    <h1 class="les">
      写字的人
      <p class="app-index-Subheading">他们有各自的样子，恰好都爱写字</p>
    </h1>
    <!-- 弃用 -->
    <div class="WriterMain app-clear" v-if="false">
      <div class="WriterMainText" style="float:left">
        <h4 class="fonS" style="font-weight:400">{{writepeopledataAry[0].articleTitle.slice(0,12)}}</h4>
        <!-- <p style="overflow:hidden;max-height:150px" :class="['fonS',textFlag?'app-writer-ellipsis':'']" ref="text"> -->
        <p
          style="overflow:hidden"
          class="fonS"
          ref="text"
        >{{writepeopledataAry[0].articleIntroduction.slice(0,100)}}{{writepeopledataAry[0].articleIntroduction.length>100?"...":''}}</p>
        <!-- <br> -->
        <a
          style="marginTop:15px;display:block"
          :href="writepeopledataAry[0].articleUrl"
          target="view_window"
          v-if="writepeopledataAry[0].articleIntroduction.length>100"
        >查看全文</a>

        <time class="fonH" style="font-size:15px;color:#837B78;position:absolute;bottom:8px">
          <!-- 2018.6.18 -->
          {{initTime(writepeopledataAry[0].publishTime)}}
        </time>
      </div>
      <dl class="app-clear">
        <dt>
          <a :href="writepeopledataAry[0].articleUrl" target="view_window">
            <img
              :src="writepeopledataAry[0].thumbUrl"
              style="object-fit:cover"
              v-lazy="writepeopledataAry[0].thumbUrl"
              alt
              width="267"
              height="313"
            >
          </a>
        </dt>
        <!-- <dd v-for="(item,index) in writepeopledataAry.slice(1)" :key="index">
          <a :href="item.articleUrl" target="view_window">
            <img :src="item.thumbUrl" v-lazy="item.thumbUrl" alt width="131" height="144">
          </a>
        </dd>-->
        <dd v-for="(item,index) in writepeopledataAry" :key="1+index">
          <a :href="item.articleUrl" target="view_window">
            <img :src="item.thumbUrl" v-lazy="item.thumbUrl" alt width="131" height="144">
          </a>
        </dd>
        <dd v-for="(item,index) in writepeopledataAry" :key="2+index">
          <a :href="item.articleUrl" target="view_window">
            <img :src="item.thumbUrl" v-lazy="item.thumbUrl" alt width="131" height="144">
          </a>
        </dd>
      </dl>
    </div>
    <div class="app-change-WriterMain-box app-clear">
      <div class="app-change-WriterMain-box-text">
        <h4 class="fonS" style="font-weight:400">
          {{writepeopledataAry[0].articleTitle}}
        </h4>
        <p style class="fonS" ref="text">
          <!-- 那个停顿就像是灰尘全都落下来的感觉，很安静。写字时间4年她的学堂：暄桐教室她的老师：林曦 写字的人14问01. 您的工作是什么？我之前的工作是做流行趋势的研究... -->
          {{writepeopledataAry[0].articleIntroduction.slice(0,70)}}{{writepeopledataAry[0].articleIntroduction.length>70?"...":''}}
          <br>
          <br>
          <a
            :href="writepeopledataAry[0].articleUrl"
            target="view_window"
            v-if="writepeopledataAry[0].articleIntroduction.length>70"
          >查看全文</a>
        </p>
        <time>{{initTime(writepeopledataAry[0].publishTime)}}</time>
      </div>
      <div class="app-change-WriterMain-box-ary">
        <div class="app-change-WriterMain-box-big">
          <a :href="writepeopledataAry[0].articleUrl" target="view_window">
            <img
              :src="writepeopledataAry[0].picIndexBig"
              style="object-fit:cover"
              v-lazy="writepeopledataAry[0].picIndexBig"
              alt
              width="267"
              height="313"
            >
          </a>
        </div>
        <ul class="app-change-WriterMain-box-list">
          <li v-for="(item,index) in writepeopledataAry.slice(1)" :key="index">
            <a :href="item.articleUrl" target="view_window">
              <img v-lazy="item.picIndexSmall" alt>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-change-WriterMain-more">
      <p class="lookAll1 les">
        <a href="about" class="app-index-look-more">查看更多</a>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    writepeopledataAry: {
      type: null
    }
  },
  data() {
    return {
      // textFlag:false
    };
  },
  mounted() {
    // let H=this.$refs.text.scrollHeight
    // console.dir(this.$refs.text)
    //   console.log(H,"高度")
    //   if(H>150){
    //       this.textFlag=true
    //   }else{
    //     this.textFlag=false
    //   }
  },
  methods: {
    initTime(time) {
      return moment(time).format("YYYY.M.DD");
    }
  }
};
</script>


<style lang="less" scoped>
.app-change-WriterMain-box {
  width: 100%;
  height: 313px;
  margin-top: 60px;
  .app-change-WriterMain-box-text {
    position: relative;
    float: left;
    width: 196px;
    height: 100%;
    text-align: left;
    h4 {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.9);
      font-weight: 400;
    }
    p {
      margin-top: 28px;
      color: #99908c;
      line-height: 25px;
      font-size: 14px;
      letter-spacing: 1px;
    }
    time {
      font-size: 14px;
      color: rgb(131, 123, 120);
      position: absolute;
      bottom: 0;
    }
      &::after{
    content: "";
    width: 0;
    transform: translateY(-50%);
    height: 10px;
    position: absolute;
    top: 50%;
    right: -335px;
    border-left: 6px solid rgba(192, 189, 187, 1);
    border-right: 6px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent ;
  }
  }
  .app-change-WriterMain-box-ary {
    float: right;
    height: 100%;
    width: calc(100% - 196px - 25px); /* 两边边距25px*/
    .app-change-WriterMain-box-big {
      width: 267px;
      height: 313px;
      float: left;
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .app-change-WriterMain-box-list {
      width: calc(100% - 267px - 66px);
      height: 313px;
      float: right;
      li {
        float: left;
        width: 130px;
        height: 143px;
        margin-right: 28px;
        margin-bottom: 28px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6) {
          margin-bottom: 0;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

}
.app-change-WriterMain-more {
  margin-top: 60px;
  & > p {
    width: 445px;
    float: right;
    text-align: center;
  }
}
</style>


<style lang="less">
// .Writer {
//   .lookAll1 {
//     margin-top: 40px;
//     width: 100%;
//     text-align: center;
//     clear: both;
//     margin-left: 200px;
//     a {
//       text-decoration: none;
//       color: #333;
//       &:hover {
//         color: #777;
//       }
//     }
//   }
// }

/* 写字的人 */
.Writer {
  width: 100%;
  margin: 0 auto;
  min-height: 650px;
  text-align: center;
  height: auto !important;
  // background:#FFFCF9;
  // box-shadow: 0 5px 59px rgba(14, 5, 10, 0.05);
  padding-top: 60px;
  box-sizing: border-box;
  padding-bottom: 60px;
  h1 {
    font-size: 37px;
    font-weight: 400;
    color: #030000;
    p {
      color: #030000;
      font-size: 18px;
      margin-top: 16px;
    }
  }
  // .WriterMain {
  //   position: relative;
  //   width: 100%;
  //   margin: 0 auto;
  //   margin-top: 63px;
  //   clear: both;
  //   text-align: center;
  //   .WriterMainText {
  //     max-width: 230px;
  //     // margin-right: -20px;
  //     display: inline-block;
  //     // margin-left:480px;
  //     text-align: left;
  //     p {
  //       color: RGBA(153, 144, 140, 1);
  //       margin: 24px 0px;
  //       line-height: 25px;
  //       font-size: 14px;
  //       letter-spacing: 3px;
  //     }
  //     time {
  //       // #585757
  //       color: #ccc;
  //       display: block;
  //       margin-top: 64px;
  //     }
  //     h4 {
  //       font-size: 18px !important;
  //       color: #030000;
  //     }
  //     a {
  //       color: #030000;
  //       font-size: 14px;
  //       text-decoration: none;
  //     }
  //   }
  //   dl {
  //     letter-spacing: -3px;
  //     font-size: 0;
  //     width: 730px;
  //     // float: right;
  //     // float: left !important;
  //     // margin-top: -320px;
  //     // margin-left: 700px;
  //     text-align: left;
  //     display: inline-block;
  //     dt,
  //     dd {
  //       display: inline-block;
  //     }
  //     dt {
  //       float: left;
  //       margin-right: 26px;
  //     }
  //     dt::after {
  //       content: url(~assets/img/People_write-right.png);
  //       display: inline-block;
  //       margin: 0px 26px;
  //       display: none;
  //     }
  //     dd {
  //       width: 131px;
  //       height: 144px;
  //       margin-right: 15px;
  //       margin-bottom: 27px;
  //       &:nth-of-type(3n) {
  //         margin-right: 0 !important;
  //       }
  //       img {
  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //     dt + dd {
  //       width: 131px;
  //       height: 144px;
  //     }
  //     dt + dd > img {
  //       /* width: 8.25rem;
  //           height: 9.0625rem; */
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
}
</style>

<style>
.app-writer-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
}
.app-writer-ellipsis::after {
  content: "...";
  position: absolute;
  right: 6px;
  bottom: 0;
  display: block;
  width: 20px;
  height: 20px;
  line-height: 15px;
  background: #fffcf9;
  font-family: sans-serif;
}
</style>
