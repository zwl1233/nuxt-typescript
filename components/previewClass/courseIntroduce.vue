<template>
  <div class="Introduce  m-auto text-center app-safari-margin">
    <div class="Introduce" style="margin-top:30px">
      <div v-if="imgAry.length<=0" class="app-Introduce-noData">
        <img
          :src="require('@/assets/img/nullInstro.png')"
          alt
          style="display:block;margin:15px auto"
        >
        <p class="fz12 c4a5 mt-15 colorNoData">暂时没有介绍哦!</p>
      </div>
      </div>
    <img :src="item" alt v-for="(item,index) in imgAry" :key="index" style="display:block;margin:0 auto;">
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      imgAry:[]
    };
  },
  created() {
    this.$axios
      .post("/usercourse/courseIntroduce", {
        courseId: this.courseId,
        courseType: 1
      })
      .then(res => {
        if (res.code == 0) {
          this.imgAry=res.result
        }
      });
  },
  computed: {
    ...mapState({
      courseId: state => state.singleOrder.courseId
    })
  }
};
</script>

<style lang='less' scoped>
.app-Introduce-noData {
  width: 100%;
  text-align: center;
  height: 400px;
  margin-top: 100px;
}
</style>


