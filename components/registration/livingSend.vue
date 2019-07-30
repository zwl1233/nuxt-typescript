<template>
  <ul class="app-clear">
    <!-- <li v-html="this.Tips"></li> -->
    <!-- {{this.Tips}} -->
    <li>
      <label for class="fz14 c4c49">课程回放：</label>
      <span class="fz14 c9">
        如果<strong class="c4a5">Ta</strong>需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为
        <strong class="c4a5 fz17">{{obj.backTime}}</strong>天，即当堂直播课程结束后有
        <strong class="c4a5 fz17">{{obj.backTime}}</strong>天补课或复习，课程视频<strong class="c4a5">不提供下载</strong>。
      </span>
    </li>
    <li>
      <label for class="fz14 c4c49">关于退课：</label>
      <span class="fz14 c9">如需退课，请<strong class="c4a5">Ta</strong>于<strong class="c4a5">第一节直播课</strong>开始前，在“我的订单”中提出退课申请，申请审核通过后学费将原路返回<strong class="c4a5">您</strong>的账户。直播课程开始后，将不再接受退课申请。</span>
    </li>
    <li>
      <label for class="fz14 c4c49">开具发票：</label>
      <span class="fz14 c9">如果需要发票，请在<strong class="c4a5">您本人</strong>的“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。</span>
    </li>
  </ul>
</template>
<script>
// 单阶赠课
export default {
  props:["registrObj"],
  data () {
    return {
      obj:{}
    }
  },
  created(){
      this.obj=this.registrObj
  },
  watch: {
    registrObj(newVal){
      this.obj=newVal
    },
    deep:true
  }
    
}
</script>
