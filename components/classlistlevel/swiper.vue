<template>
    <section class="app-swiper-fullquan">
        <span class="after" v-on:click="jian" v-if="flag"><i class="el-icon-arrow-left"></i></span>
        <ul class="flex w1000 m-auto Class_list-carousel swipermain" >
                <li v-for="(items,i) in swiperData" :key="items.courseId" 
                 class="app-li-hov fzMicroYaHei"
                 ref="listli" :class="{noright:(i+1)%4==0}">
                      <span class="fz14 app-li-hov-span fzMicroYaHei" @click="singlepush(items.courseId)">{{items.courseName}}</span>
                      <span class="dis_block mt-10">
                           <!-- pos_r -->
                              <!-- <strong class="fz12 ">
                                  {{items.courseFullPrice}}元
                              </strong> -->
                      <span class="app-425-ysng" style="top:-2px">
                          <!-- pos_a -->
                           <strong class="fz12 fzMicroYaHei">{{items.courseFullPrice}}元</strong>
                           <b style="float:right;font-weight:normal">
                          <!-- 可赠课 -->
                          <a href="javascript:;" class="ones" 
                            v-if="items.canGift"
                            @click="singlepush(items.courseId)"
                           >
                            <!-- {{items.giftButtonText}} -->
                            赠课
                            </a>
                            <!-- 可报名 -->
                            <a href="javascript:;" class="twos" 
                            @click="singlepush(items.courseId)"
                             v-if="items.canBuy
                             ">
                             {{items.buyButtonText}}
                             </a>
                             <!-- 不可赠课 -->
                             <a href="javascript:;" class="oness" 
                            v-if="!items.canGift"
                            style="color:black;!important"
                           >
                            <!-- {{items.giftButtonText}} -->
                            赠课
                            </a>
                            <!-- 已购买和不可报名 -->
                            <a href="javascript:;" class="twoss" v-if="!items.canBuy">{{items.buyButtonText}}</a>
                            </b>
                      </span>
                    </span>
                </li>
           </ul>
         <span class="before" v-on:click="jia"  v-if="flag"><i class="el-icon-arrow-right"></i></span> 
    </section>
</template>

<script>
import price from '@/components/price'  //价格小数点
    export default {
      data(){
           return{
               num:0,
               flag:null
           }
       },
        components:{
            price
        },
       props:{
           swiperData:{//单阶数据
               type:null
           },
           sum:{// i
               type:null
           },
           ifs:{//是否大于一页的个数
               type:null
           },
       },
        methods:{
            //进去单阶页面
            singlepush(id){
            this.$router.push({
                name:"singleOrder",
                query: {
                    courseId:id
                }
                });
            },
          jia(){
              //左
               var len = this.$refs.listli.length
               if(this.num>=this.ifs){
                  this.num=this.ifs
                  var left = -((this.num) * 262)
              }else{
                  var left = -((this.num=this.num+1) * 262)
              }
             console.log(this.num,len,this.ifs)
              if(this.ifs>=2){
              this.$refs.listli[0].style.marginLeft = left+'px'
              this.$refs.listli[0].style.transform = 'ease all  3s'
              }
             
               
          },
        jian(){
            //右
           
            var len = this.$refs.listli.length
           
            if(this.num<=0){
                this.num=0
                var left =  ((this.num) * 262)
            }else{
                var left =  -((this.num=this.num-1) * 262)
            }
             this.$refs.listli[0].style.marginLeft = left+'px'
             console.log(this.num,'??')       
        }
       },
     
       mounted() {
           if(this.ifs<2){
               //判断是否需要翻页
              this.flag=false  
           }else{
               this.flag=true
           }
         console.log(5%4==0)
       }
    }
</script>
<style lang="less" scoped>
 .Class_list-carousel li span.dis_block a {
     padding: 0px 0px 0px 8px;
 }
.app-425-ysng{
    
    // background: red;
    a:last-child{
        border:none !important;
    }
}
.app-li-hov{
    border-right: 1px solid #dcc9b2;
     padding: 0 0 0 32px;
     margin-top: 51px;
    cursor:pointer;
    text-align: left;
     transition: all 1s!important;
}
.app-li-hov:first-child{
    
    padding: 0px 0px 0px 0px !important;
}
.app-li-hov:last-child{
    border:none !important;
}
.app-li-hov:hover{
    .app-li-hov-span{
        color:rgba(7,118,122,1);
       
    }
    strong{
        color:rgba(7,118,122,1);
        
        
    }
    
}
.SwiperSpace .after{
    // content: url(~assets/img/People_write-left.png);
    position: absolute;
    top: 48%;
    // margin-top:-11px;
    left:-80px;
    z-index: 999 !important;
    cursor:pointer;
    font-size: 35px;
    color: #C4A57F;
    opacity: 0.5;
}
.SwiperSpace .before{
    // content: url(~assets/img/People_write-right.png);
    position: absolute;
    right:-80px;
    top: 48%;
    // margin-top:-11px;
    cursor:pointer;
    font-size: 35px;
    color: #C4A57F;
    opacity: 0.5;
}
.swipermain{
    overflow: hidden;
}
.swipermain li{
}
.Class_list-carousel li:nth-child(1) .c777{
    color:#07767A;
}
.Class_list-carousel li {
    color: #000 !important;
}
.Class_list-carousel li span:nth-of-type(1){
    display: inline-block;
    width: 197px;
    overflow: hidden;
    // text-overflow: ellipsis;
    margin-right: 32px;

white-space: nowrap;
}
// .Class_list-carousel li span:nth-of-type(2){
//     width: 227px;
// }
.Class_list-carousel li span:nth-of-type(2) strong{
    // margin-right: 50px !important;
}

.Class_list-carousel li span:nth-of-type(2) span{
    left:70px !important;
    text-align: left;
  
}
// .Class_list-carousel li span:nth-of-type(2) a:nth-of-type(2){
//     border-left: none;
//     display: inline;
//     margin-left: -10px;
// } 
.app-425-ysng{

}
.ones{
    // top: -2px;
    color:rgba(196,165,127,1) !important;
    font-size: 14px;
    max-width: 100px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    // overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 5px;
    border-right:1.2px solid #C4A57F !important;
    border-color: #C4A57F !important;
    padding-right: 10px !important;
}
.oness{
    color:#000000 !important;
    font-size: 14px;
    max-width: 100px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    // overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 5px;
    border-right:1.2px solid #000000 !important;
    border-color: #000000 !important;
    padding-right: 10px !important;
    opacity:0.6;
}
.twos{
    color:rgba(196,165,127,1) !important;
    font-size: 14px;
    // width: 75px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    // overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    // margin-top: 5px;
    border: none !important;
}

.twoss{
     color:#000000 !important;
    opacity:0.6;
    // color:#acacac !important;
    font-size: 14px;
    // width: 75px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    // overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    // margin-top: 5px;
    border: none !important;
}
.classlistarticle .Class_list-carousel li{
    padding: 0px 0px;
    padding-left: 32px;
    // padding-right: 90px;
    // padding-left: 20px;
}
.classlistarticle .Class_list-carousel .noright{
    // border: none;
    //     padding-right: 45px;
}

</style>