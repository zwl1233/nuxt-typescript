<template>
  <span>{{msg}}</span>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      timer:null,
    };
  },
  props: ["codeFlag", "changeCode"],
  created() {
      console.log("create")
    this.msg = "获取验证码";
  },
  methods: {
    //倒计时开始  默认60秒
    createTime() {
      this.msg = "59s";
      this.timer = setInterval(() => {
        this.msg = parseFloat(this.msg)-1+"s";
        if (parseFloat(this.msg) < 1) {
          clearInterval(this.timer);
          this.msg = "获取验证码";
          this.changeCode(false);
        }
      }, 1000);
    }
  },
  watch: {
    codeFlag(newVal, oldVal) {
      if (newVal != oldVal) {
        if (newVal) {
            console.log("试试")
          this.createTime();
        }
      }
    }
  },
  beforeDestroy () {
    console.log("销毁")
      clearInterval(this.timer)
  }
};
</script>

