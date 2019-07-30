<template>
    <article class="Writingclass Writingclasssection">
        <h3 class="text-center les">写字课</h3>
        <p class="text-center app-index-Subheading">以一支毛笔，开启中国传统文化的大门，从书法之美到生活之美</p>
        <div class="Writingclass-content">
          <div class="Writingclass-text" >
            <h2  @click="fullpush(writedataAry.courseFullId)">{{writedataAry.courseName}}</h2>
            <div class="dis_block">
              <OriginaPrice text="原学费" :num="writedataAry.courseFullPrice"/>
              <!-- 原学费  -->
              <!-- <s style="font-weight:600;margin-left:7px">
                {{writedataAry.courseFullPrice}}元 -->
                <!-- <price
                hasSymbol='false'
                isFloor='false'
                isFixed='false'
                  v-if="writedataAry.courseFullPrice"
                  :number="writedataAry.courseFullPrice"
                  special="special"
                  style="display:inline-block"
                /> -->
                <!-- </s> -->
              </div>
            <strong class="truePrice" style="display:flex;align-items:center">
              {{writedataAry.courseDiscountPrice}}元
                <!-- <price
                  hasSymbol='false'
                  isFloor='false'
                  isFixed='false'
                  v-if="writedataAry.courseDiscountPrice"
                  :number="writedataAry.courseDiscountPrice"
                  style="display:inline-block"
                /> -->
              <span class="fz14 c9 fonS" style="font-weight:400;margin-left:11px;">共{{writedataAry.classHourCount}}课</span>
              </strong>
            <div class="All_course">
              <h1 class="fonH">全阶课程</h1> 
              <!-- 购买 -->
              <div class="join les" v-if="writedataAry.canBuy" @click="fullpush(writedataAry.courseFullId)" >
                <div class="triangle"></div>
                {{writedataAry.buyButtonText}}
              </div>
              <div class="join les"
              style="background:#ccc;border-color:#ccc;"
              v-else  >
                <div class="triangle"></div>
                {{writedataAry.buyButtonText}}
              </div>
              <!-- 赠课 -->
               <div class="giveAway les"  v-if="writedataAry.canGift" @click="fullpush(writedataAry.courseFullId)">
                 {{writedataAry.giftButtonText}}
              </div>
              <div class="giveAway les"   style="background:#ccc;border-color:#ccc;" v-else   >
                 {{writedataAry.giftButtonText}}
              </div>
            </div>
          </div>
          <div class="Writingclass-phase">
            <div class="Writingclass-line">
              <span style="background:#cfc8c5"
               v-for="(item,index) in writedataAry.courseSingleResponseVos"
                :key="item.courseId" 
                :style="{background:index+1==1?'#648ea2':index+1==2?'#969a70':index+1==3?'#b69271':index+1==4?'#ad4e3f':''}"
                >
                        {{index+1}}
              </span>
              <div class="line" :style="{height:writedataAry&&writedataAry.courseSingleResponseVos?writedataAry.courseSingleResponseVos.length*25+'%':0}"></div>
            </div>
            <ul>
              <li  v-for="(item,index) in writedataAry.courseSingleResponseVos" :key="item.courseId">
                <p>
                  <!-- {{item.sortName}} | -->
                  <samp> <span 
                  style="cursor:pointer"
                  @click="singlepush(item.courseId)"
                  :style="{color:index+1==1?'#648ea2':index+1==2?'#969a70':index+1==3?'#b69271':index+1==4?'#ad4e3f':'',cursor:'pointer'}"
                  >{{item.courseName}}</span></samp>
                  <!-- 可报名 -->
                  
                  <button 
                  class="les"
                  v-if="item.canBuy"
                  @click="singlepush(item.courseId)"
                  :style="{background:index+1==1?'#e9e7e7':index+1==2?'#969a70':index+1==3?'#b69271':index+1==4?'#ad4e3f':'',outline:'none'}"
                  >
                   {{item.buyButtonText}}
                  </button>
                  <!-- 已报名 -->
                  <button 
                   class="les"
                  v-else
                  :style="{background:'#e9e7e7'}"
                  >
                   {{item.buyButtonText}}
                  </button>
                </p>
                <p>
                  <strong :style="{color:index+1==1?'#648ea2':index+1==2?'#969a70':index+1==3?'#b69271':index+1==4?'#ad4e3f':''}">
                     {{item.courseFullPrice}}元
                     <!-- <price
                       class="price-strong fonH"
                        v-if="item.courseFullPrice"
                        :number="item.courseFullPrice"
                        style="display:inline-block;"
                      /> -->
                    </strong>
                  <small class="c9" >共{{item.classHourCount}}课</small>
                  <span class="les" style="font-size: 14px;float:right;color:#666;opaciy:.6">{{item.statusName}}</span>
                </p>
              </li>
        <!-- "color:#969a70"  style="background:#969a70"  style="color:#969a70"-->
        <!-- style="color:#b69271"  style="background:#b69271" style="color:#b69271" -->
        <!-- style="color:#ad4e3f"  style="background:#ad4e3f" style="color:#ad4e3f" -->
            </ul>
          </div>
        </div>
        <p class="lookAll les">
          <nuxt-link to="/classList" class="app-index-look-more">
            查看所有课程
          </nuxt-link>
        </p> 
           
      </article>
</template>

<script>
import timer from '@/components/classlistlevel/Timer'   //倒计时和多少天过期组件
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import OriginaPrice from "@/components/originalPrice"//学费
import price from "@/components/price"; //价格小数点
export default {
  data(){ 
    return{
        Tips:'',//报名前提示
        Agreement:'', //报名协议
        myfullid:null,
        lineHeight:0,//线条长度
    }
  },
    components:{
      timer,
      price,
      OriginaPrice,//学费
  },
  props:{
      writedataAry:{
          type:null
      }
  },
  computed: {
    ...mapState({
        userstoken: state => state.system.token, //用户token
    })
  },
  methods: {
    ...mapMutations({
          Loginpage: "login/Loginpage", //改变登录页面状态
          getCookie:'system/getCookie', //获取用户cookie
          Mailboxlogin: "login/Mailboxlogin", //判断是手机登录还是邮箱登录
          Mobileverion: "login/Mobilephoneverification", //用户没有登录 请先登录
    }),
    //进去全阶页面
    fullpush(id){
      this.$router.push({
          name:"fullOrder",
          query: {
            courseId:id
          }
        });
    },
     //进去单阶页面
    singlepush(id){
      this.$router.push({
          name:"singleOrder",
          query: {
            courseId:id
          }
        });
    },
  }
}
</script>

<style lang="less">
.login {
  
  .errorhandlinglogin {
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
  }
  .el-errorhandling {
    margin-top: 20px;
  }
  .el-h4 {
    margin-top: -20px !important;
  }
  .el-small {
    margin-bottom: 20px;
    margin-top: 60px !important;
  }
  .el-password {
    margin-top: 10px;
    margin-bottom: 60px; 
  }
  .el-smallnew {
    margin-top: 70px !important;
  }
}
.el-main{
    background: white;
}
.lookAll {
  margin-top: 15px;
  width: 100%;
  text-align: center;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      color: #777;
    }
  }
}
/* 写字课 */
  .Writingclass {
    width: 100%;
    // height: 750px;
    // height: 690px;
    padding-bottom: 60px;
    background: RGBA(247, 243, 240, 1);
    padding-top: 60px;
    box-sizing: border-box;
    h3.text-center {
      width: 100%;
      text-align: center;
      font-size: 35px;
      font-weight: 400;
      color: #087276;
    }
    p.text-center {
      width: 100%;
      text-align: center;
      color: #030000;
      margin-top: 16px;
      margin-bottom: 60px;
      font-size: 18px;
    }
    .Writingclass-content {
      font-family: FZXIYSK--GBK1-0;
      width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .Writingclass-text {
        h2 {
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 9px;
          cursor: pointer;
        }
        h4 {
          font-weight: 400;
          font-size: 16px;
          margin-bottom: 5px;
          // line-height: 30px;
        }
        p {
          color: #585757;
          font-size: 12px;
        }
        .dis_block {
          color: #585757;
          font-size: 14px;
          margin-top: 32px;
          margin-bottom:13px;
        }
        .truePrice {
          color: #097276;
          font-size: 35px;
          // font-family: FZLTHJW;
           font-family:FZLTHJW--GB1-0
        }
        .All_course {
          margin-top: 77px;
          h1 {
            color: #030000;
            font-size: 40px;
            font-weight: 400;
            margin-bottom: 33px;
          }
          div {
            width: 158px;
            height: 45px;
            line-height: 43px;
            text-align: center;
            font-size: 24px;
            display: inline-block;
            color: white;
            border-radius: 3px;
            cursor: pointer;
            position: relative;
            .triangle {
              position: absolute;
              border-color: rgba(129, 129, 129, 1) transparent transparent transparent;
              border-style: solid;
              border-width: 10px;
              width: 0;
              height: 0;
              position: absolute;
              top: -22px;
              left: 50%;
              margin-left: -10px;
            }
          }
          .join {
            background: #097276;
            border: 1px solid #078186;
          }
          .giveAway {
            background: #d28f31;
            border: 1px solid #c58b38;
            margin-left: 45px;
          }
        }
      }
      .Writingclass-phase {
        position: relative;
        .Writingclass-line {
          width: 30px;
          height: 81%;
          position: absolute;
          left: -70px;
          span {
            display: block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 50%;
            background: red;
            font-size: 18px;
            color: white;
            font-weight: 500;
            position: relative;
            z-index: 10;
            margin-bottom: 80px;
          }
          .line {
            width: 2px;
            height: 100%;
            background: RGBA(203, 202, 200, .3);
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -3px;
          }
        }
        ul {
          li {
            height: 100px;
            p {
              font-size: 20px;
              margin-top: 5px;
              &:nth-child(1) {
                samp {
                  font-family: monospace, monospace;
                }
                button {
                  width: 90px;
                  height: 26px;
                  line-height: 25px;
                  text-align: center;
                  font-size: 14px;
                  border-radius: 2px;
                  color: white;
                  border: 0;
                  margin-left: 100px;
                  cursor: pointer;
                  float: right;
                  outline: none;
                }
              }
              &:nth-child(2) {
                strong {
                  font-size: 26px;
                }
                small {
                  font-size: 15px;
                }
                // span {
                //   font-size: 12px;
                // }
              }
            }
          }
        }
      }
    }
  }
</style>
