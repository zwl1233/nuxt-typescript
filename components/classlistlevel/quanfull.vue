<template>
  <section>
    <div class="dis_in_block pos_r Class_list-content-img">
      <span class="pos_a">
        <img
          style="width:52px;height:52px"
          v-bind:src="item.courseTypeId==1?require('@/assets/img/course1.png'):require('@/assets/img/course2.png')"
          alt
        >
      </span>
      <img
        style="cursor:pointer"
        @click="fullpush(item.courseFullId)"
        v-lazy="item.coursePictureUri"
        alt
      >
    </div>
    <div class="dis_in_block pos_r Class_list-content-text">
      <h3 class="nobold fonS" style="margin-top:22px;font-family:FZXIYSK--GBK1-0">
        <span
          class
          @click="fullpush(item.courseFullId)"
          style="width:450px;text-overflow: clip;cursor: pointer;"
          :title="item.courseName"
        >{{item.courseName}}</span>
      </h3>
      <ul class="fz14 fl">
        <li class="Finepitch">
          <p style="marginTop:17px;display:flex;align-items:center;marginBottom:12px">
            <strong class="c097 fz28 fonH">{{item.courseDiscountPrice}}元</strong>
            <span class="chapter fzGB1-0" style="margin-left:15px;">共{{item.classHourCount}}课</span>
            <span class="app-change-classList-status fzGB1-0">{{item.statusName}}</span>
          </p>
          <OriginaPrice text="原学费" class="fzMicroYaHei" :num="item.courseFullPrice"/>
        </li>
      </ul>
      <!-- 按钮 -->
      <div class="app-clear fr">
        <p v-if="item.courseTypeId!=1" style="min-height:20px;margin-top:21px"></p>
        <p v-if="item.courseTypeId==1" style="float:right;color: #c4a57f;margin-top:21px">
          报名截止至
          <span v-if="!item.purchased" class="fzGB1-0" style="font-size:14px">
            <time v-if="item.statusName=='报名未开始'">报名未开始</time>
            <time v-else>
              <timer
                style="display:inline-block;fontSize:14px"
                :date="JSON.parse(item.courseDynamicElement).signDeadlineTime==undefined?null:JSON.parse(item.courseDynamicElement).signDeadlineTime"
              />
            </time>
          </span>
        </p>
        <div class="fzGB1-0" style="clear:both;float:right;margin-top:19px;">
          <!-- 赠课 -->
          <button
            class="btn-yellow-border"
            style="margin-right: 20px;font-size:19px"
            v-if="item.canGift"
            @click="fullpush(item.courseFullId)"
          >{{item.giftButtonText}}</button>
          <button
            class="btn-yellow-border"
            style="margin-right: 20px;background:#acacac;outline:none;color:white;border:none;font-size:19px"
            v-else
          >{{item.giftButtonText}}</button>
          <!-- 报名 -->
          <button
            class="btngreen-over"
            v-if="item.canBuy"
            style="font-size:19px"
            @click="fullpush(item.courseFullId)"
          >{{item.buyButtonText}}</button>
          <button
            class="btngreen-over"
            v-else
            style="background:#acacac;outline:none;font-size:19px"
          >{{item.buyButtonText}}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import timer from "@/components/classlistlevel/Timer"; //倒计时和多少天过期组件
import OriginaPrice from "@/components/originalPrice";
export default {
  components: {
    timer, //定时器组件
    OriginaPrice //学费
  },
  props: {
    item: {
      type: null
    }
  },
  methods: {
    //进去全阶页面
    fullpush(id) {
      this.$router.push({
        name: "fullOrder",
        query: {
          courseId: id
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>
