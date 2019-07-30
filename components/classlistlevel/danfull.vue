<template>
    <section>
          <div style="marginBottom:40px;" v-for="(newcoursesing) in item.courseSingleResponseVos" :key="newcoursesing.courseId" class="app-danfull-eldiv8s">
            <div class="dis_in_block pos_r Class_list-content-img" >
              <span class="pos_a"> 
                <img
                style="width:52px;height:52px"
                  v-bind:src="newcoursesing.courseType==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
                  alt
                >
              </span>
              <img @click="singlepush(newcoursesing.courseId)" v-lazy="newcoursesing.coursePictureUri" alt style="cursor:pointer">
            </div>
            <div class="dis_in_block pos_r Class_list-content-text" >
              <h3 class="nobold  fonS" style="margin-top:22px;">
                <span class @click="singlepush(newcoursesing.courseId)" :title="newcoursesing.courseName" style="width:450px;text-overflow: clip;cursor: pointer;">{{newcoursesing.courseName}}</span>
              </h3>
              <ul class="fz14 fl" style="width:100%">
                <li class="Finepitch">
                  <!-- <label class="c9">原价：</label>
                  <time class="c3">
                  <s style="margin-left:7px;font-weight: 600">
                      {{newcoursesing.courseFullPrice}}元
                    </s>
                    </time> -->
                    <p style="marginTop:17px;display:flex;align-items:center">
                    <strong class="c097  fz28 fzGB1-0" >
                        {{newcoursesing.courseFullPrice}}元
                  </strong>
                <span class="chapter fzGB1-0" style="margin-left:15px;">共{{newcoursesing.classHourCount}}课 </span>
                  <span class="app-change-classList-status fzGB1-0" >{{newcoursesing.statusName}}</span>
                  </p>
              </li>
              </ul>
              <!-- 价格 -->
              <div >
                <p v-if="item.courseTypeId!=1" style="min-height:20px;margin-top:21px;width:100%;float:right"></p>
                <p 
                v-if="newcoursesing.courseType==1"
                style="float:right;color: #c4a57f;marginTop:21px">
                <!-- 报名截止至 -->
                <span v-if="!newcoursesing.purchased" class="fzGB1-0" style="font-size:14px">
                <time v-if="newcoursesing.statusName=='报名未开始'">
                    报名未开始 
               </time>
                <time v-else>
                <timer
                  style="display:inline-block;fontSize:14px"
                    :date="JSON.parse(newcoursesing.courseDynamicElement).signDeadlineTime==undefined?null:JSON.parse(newcoursesing.courseDynamicElement).signDeadlineTime"
                  />
                </time>
                </span>
                <!-- <time>{{JSON.parse(newcoursesing.courseDynamicElement).signDeadlineTime.split(' ')[0].replace(/-/g,'-')}}</time></p> -->
                <div class="fzGB1-0" style="clear:both;float:right;marginTop:19px;">
                  <!-- 赠课 -->
                    <button
                      class="btn-yellow-border"
                      style="margin-right: 20px;font-size:19px"
                      v-if="newcoursesing.canGift"
                      @click="singlepush(newcoursesing.courseId)"
                    >{{newcoursesing.giftButtonText}}</button>
                    <button
                      class="btn-yellow-border"
                      style="background:#acacac;border:none;color:white;outline:none;margin-right: 20px;font-size:19px"
                      v-else
                    >{{newcoursesing.giftButtonText}}</button>
                    <!-- 报名 -->
                     <button
                      class="btngreen-over"
                      v-if="newcoursesing.canBuy"
                      style="font-size:19px"
                     @click="singlepush(newcoursesing.courseId)"
                    >{{newcoursesing.buyButtonText}}</button>
                    <button
                    class="btngreen-over"
                    v-else
                    style="background:#acacac;outline:none;font-size:19px"
                  >{{newcoursesing.buyButtonText}}</button> 
                
                </div>
              </div>
            </div>
            <!-- <div class="app-anddan-eldiv8ss">
              <span class="app-anddan-eldiv8ss-span"></span>
            </div> -->
      </div>
      
    </section>
</template>

<script>
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件
export default {
components: {
    timer, //定时器组件
   
  },
  props: {
        item:{
            type:null
        }
  },
    methods: {
      //进去单阶页面
    singlepush(id){
      this.$router.push({
          name:"singleOrder",
          query: {
            courseId:id
          }
        });
    },
    },
}
</script>

<style lang="less">
.app-danfull-eldiv8s::after{
 content: url(~assets/img/lectures.png);
      width: 100%;
      margin: 0px auto;
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 0px;
      height: 25px;
      top: -25px;
}
// .app-danfull-eldiv8s:last-child::after{
  // background: red;
  // display: none;
// }





.xieyisection{
.Class_list-content:last-child{
    // background: yellow;
    .app-danfull-eldiv8s:last-child::after{
      // background: red;
      display: none;
    }
  }
  }


// .app-danfull-eldiv8s{
// .app-anddan-eldiv8ss{
//   // background: red;
//     .app-anddan-eldiv8ss-span {
//       display: inline-block;
//       // margin-left: -200px;
//     }
//     .app-anddan-eldiv8ss-span::after {
//       content: url(~assets/img/lectures.png);
//       width: 100%;
//       margin: 0px auto;
//       display: inline-block;
//       text-align: center;
//       margin-top: 20px;
//       margin-bottom: 0px;
//       height: 25px;
//       top: -25px;
//     }
//   }
//   }

</style>
