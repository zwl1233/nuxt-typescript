<template>
  <span class="text fonH">
    <span>{{text}}：{{num}}</span>元
  </span>
</template>
<script>
export default {
  props: ["text", "num"]
};
</script>
<style lang="less" scoped>
.text {
  & > span {
    font-weight: 600;
    position: relative;
    color: rgba(0,0,0,.6);
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: rgba(221, 221, 221, .6);
      top: 8px;
      transform: rotate(-2deg);
    }
  }
}
</style>



