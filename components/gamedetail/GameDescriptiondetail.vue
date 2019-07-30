<template>
  <section>
    <el-dialog
      :visible.sync="GameDescription"
      custom-class="GameDescription-Model"
      width="600px"
      center
      :before-close="closes"
    >
      <div class="Model-content">
        <h4 class="fz17 c4c49" style="top:28px">开课前请了解</h4>
        <div class="Agreement-text">
          <div class="fz14 c30 Agreement-content app-change-index-richText" v-html="content">
            这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们
            写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到… 虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: ["changeDescription", "GameDescription", "content"],
  methods: {
    closes() {
      console.log("关闭");
      this.changeDescription(false);
    }
  }
};
</script>

<style lang="less">
.GameDescription-Model {
  // .el-dialog{
  background: rgba(255, 255, 255, 0.9) !important;
  // }
}
/**  游戏闯关介绍  GameDescription-Model **/
.GameDescription-Model .el-icon-close {
  font-size: 18px;
  font-weight: bold;
  color: #c4a57f;
  position: relative;
  top: 11px;
}
.GameDescription-Model .el-icon-close:hover {
  color: #c4a57f;
  cursor: pointer;
}
.GameDescription-Model .Model-content h4 {
  position: absolute;
  top: 5px;
}
.GameDescription-Model .Model-content .Agreement-text {
  margin-top: 19px;
  height: 374px;
  line-height: 30px;
  overflow-y: auto;
}
.GameDescription-Model .Model-content .Agreement-text .Agreement-content {
  width: 509px;
  margin: 0px auto;
}
</style>
