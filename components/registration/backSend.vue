<template>
<ul class="app-clear">
          <!-- <li v-html="this.Tips"></li> -->
          <!-- {{this.Tips}} -->

          <li>
            <label for class="fz14 c4c49">关于退课：</label>
            <span class="fz14 c9">录播形式的虚拟内容服务，报名后，不支持退课，这个很重要，请注意哦。</span>
          </li>
          <li>
            <label for class="fz14 c4c49">开具发票：</label>
            <span class="fz14 c9">如果您需要发票，请在“我的订单”中提出发票申请，教室将为您开具电子发票。</span>
          </li>
          <!-- <li>
            <label for class="fz14 c4c49">有 效 期：</label>
            <span class="fz14 c9">至2018年09月30日</span>
          </li> -->

        </ul>
    
</template>
<script>
// 全阶赠课
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
