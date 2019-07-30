<template>
  <article class="Health_class" style="padding-bottom:60px">
    <h3 class="text-center cb69" style="font-size:35px;font-weight:400">养生课</h3>
    <p class="text-center c030 app-index-Subheading" style="margin-top:18px">中医养生基础课</p>
    <!-- <div class="layui-carousel m-auto" id="test9">
                <div carousel-item="">
                    <div>
                        <img src="assets/img/Health_class1.png" width=49% height="100%" class="fl" style="margin-right:1%;">
                        <img src="assets/img/Health_class2.png" width=49% height="100%" class="fl" style="margin-left:1%;">
                    </div>
                    <div>
                            <img src="assets/img/Health_class1.png" width=49% height="100%" class="fl" style="margin-right:1%;">
                            <img src="assets/img/Health_class2.png" width=49% height="100%" class="fl" style="margin-left:1%;">
                    </div>
                  
                </div>
    </div>-->

    <!-- 
                单阶的直播课是矩形-在右边
                全阶直播-是圆形⭕️ 在左上角
                具体问倪老板        
    -->

    <!--单阶 1 个-->
    <div class="m-auto w1000">
      <article class="ChanJie">
        <div class="pos_r dis_in_block">
          <span class="pos_a live-icon">
            <!--直播课程-->
            <img :src="require('@/assets/img/course1.png')" alt>
            <!--录播课程-->
            <!-- <img src="./assets/img/course2.png" alt=""> -->
          </span>
          <img :src="require('@/assets/img/Recommended_course3.png')" alt>

          <!--
                            curriculum
                            已结课  Have_class
                            开课中     In_course
                            正在报名   sign_up
                            报名未开始  Not_started                             
          -->

          <span class="pos_a curriculum Have_class">已结课</span>
        </div>
        <div class="dis_in_block ml-30">
          <h3 class="fz24 c30 fonS">
            <span class="fz14 live fonH">直播课</span>
            第一阶 | 篆隶筑基
          </h3>
          <p class="pos_r">
            <span class="fz34 c097 fonA">16280元</span>
            <span class="fz14 c9">共20课</span>
          </p>
          <div class="curriculumBtn">
            <button class="btn-yellow-order">赠课给他人</button>
            <button class="btn-green-over">已报名</button>
          </div>
        </div>
      </article>
    </div>

    <!--单阶 2 个 展示的状态 -->
    <div class="m-auto"></div>

    <!--单阶 3 个 展示的状态 -->
    <div class="m-auto w1000 dis_flow">
      <article class="ChanJie-More">
        <ul>
          <li>
            <div class="pos_r dis_in_block">
              <img :src="require('@/assets/img/Recommended_course1.png')" alt>
              <!--
                                    curriculum
                                    已结课  Have_class
                                    开课中     In_course
                                    正在报名   sign_up
                                    报名未开始  Not_started                             
              -->
              <span class="pos_a curriculum In_course">开课中</span>
            </div>
            <div class="dis_in_block ml-30">
              <h3 class="fz24 c30 fonS">
                <span class="fz14 live fonH">直播课</span>
                第二阶 | 楷书精进
              </h3>
              <p class="pos_r">
                <span class="fz34 c097 fonA">16280元</span>
                <span class="fz14 c9">共20课</span>
              </p>
            </div>
          </li>
          <li>
            <div class="pos_r dis_in_block">
              <img :src="require('@/assets/img/Recommended_course2.png')" alt>
              <!--
                                    curriculum
                                    已结课  Have_class
                                    开课中     In_course
                                    正在报名   sign_up
                                    报名未开始  Not_started                             
              -->
              <span class="pos_a curriculum sign_up">正在报名</span>
            </div>
            <div class="dis_in_block ml-30">
              <h3 class="fz24 c30 fonS">
                <span class="fz14 live fonH">直播课</span>
                第三阶 | 小楷写经
              </h3>
              <p class="pos_r">
                <span class="fz34 c097 fonA">16280元</span>
                <span class="fz14 c9">共20课</span>
              </p>
            </div>
          </li>
          <li>
            <div class="pos_r dis_in_block" >
              <img :src="require('@/assets/img/Recommended_course3.png')" alt>
              <!--
                                    curriculum
                                    已结课  Have_class
                                    开课中     In_course
                                    正在报名   sign_up
                                    报名未开始  Not_started                             
              -->
              <span class="pos_a curriculum Not_started">报名未开始</span>
            </div>
            <div class="dis_in_block ml-30" style="top:-140px">
              <h3 class="fz24 c30 fonS">
                <span class="fz14 live fonH">直播课</span>
                第三阶 | 小楷写经
              </h3>
              <p class="pos_r">
                <span class="fz34 c097 fonA">16280元</span>
                <span class="fz14 c9">共20课</span>
              </p>
            </div>
          </li>
        </ul>
      </article>
    </div>

    <p class="clear c030 text-center fz16 mt-40 les" >
      <!-- <a href="" style="color: rgb(135, 124, 117);">查看所有课程</a> -->
      <nuxt-link to="/classList?tabid=4" tag="li"  class="app-index-look-more">
            查看所有课程
          </nuxt-link> 
    </p>
  </article>
</template>

<script>
export default {};
</script>

<style lang="less">
.Writingclass-phase ul li p:last-child>span:last-child{
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
}

.Writingclass-phase ul li p:last-child>span.fz15{
    position: relative;
    top: -3px;
    margin-left: 4px;
}

.ChanJie{
    /* height: 276px; */
    display: flow-root;
    position: relative;
    padding-bottom: 20px;
    /* background: url(../img/lectures.png) no-repeat; */
}

/*全阶*/
.ChanJie span.live-icon {
    margin-left: -6%;
    margin-top: -6%;
}
.ChanJie span.live-icon img{
    width: 100%;
    height: 100%;
}


.ChanJie span.curriculum{
    top: 20px;
    right: 0px;
}

.ChanJie::after{
    content: url(~assets/img/lectures.png);
    width: 100%;
    margin: 0px auto;
    display: inline-block;
    text-align: center;
    margin-top: 33px;
}

.ChanJie .pos_r img{
    width: 488px;
    height: 276px;
}


/**********   课程-进行的时间   ******/

/*课程进行*/
.curriculum{
    padding: 6px 9px 6px 16px;
    border-radius:21px 0px 0px 21px;
    font-size: 16px;
    color: #fff;
}


/*已结课*/
.Have_class{
    background: #648EA2;
}

/*开课中*/
.In_course{
    background: #969A70;
}

/*正在报名*/
.sign_up{
    background: #B69271;
}

/*报名未开始*/
.Not_started{
    background: #AD4E3F;
}

.live {
  background: #c4a57f;
  border-radius: 4px;
  padding: 6px 9px;
  color: #fff;
  position: relative;
  top: -3px;
}
.ChanJie div:nth-child(1) {
  float: left;
}
.ChanJie div:nth-child(2) {
  height: 276px;
  width: 478px;
  float: left;
  position: relative;
}
.ChanJie div:nth-child(2) h3.fz24 {
  margin-top: 15px;
}
.ChanJie div:nth-child(2) p.pos_r {
  margin-top: 15px;
}
.ChanJie div:nth-child(2) p.pos_r span.fz14 {
  position: relative;
  top: -5px;
  margin-left: 5px;
}
.ChanJie .curriculumBtn {
  position: absolute;
  right: 0px;
  bottom: 30px;
}
.ChanJie .curriculumBtn > button:last-child {
  margin-left: 20px;
}
.ChanJie-More .curriculumBtn {
  position: absolute;
  right: 0px;
  bottom: 30px;
}
.ChanJie-More .curriculumBtn > button:last-child {
  margin-left: 20px;
}
.ChanJie-More ul li {
  width: 50%;
  float: left;
  margin-bottom: 110px;
}
.ChanJie-More ul li:last-child {
  width: 100%;
  text-align: center;
}
.ChanJie-More ul li:last-child div:nth-child(2) {
  margin-left: 30px;
}
.ChanJie-More ul li div:nth-child(1) img {
  width: 478px;
  height: 270px;
}
.ChanJie-More ul li div:nth-child(1) span.curriculum {
  top: 20px;
  right: 0px;
}
.ChanJie-More ul li div:nth-child(2) {
  position: relative;
  direction: ltr;
  text-align: left;
  margin-left: 0px;
}
.ChanJie-More ul li div:nth-child(2) h3.fz24 {
  margin-top: 15px;
}
.ChanJie-More ul li div:nth-child(2) p.pos_r {
  margin-top: 15px;
}
.ChanJie-More ul li div:nth-child(2) p.pos_r span.fz14 {
  position: relative;
  top: -5px;
  margin-left: 5px;
}

</style>



