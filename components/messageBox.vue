<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    custom-class="app-change-messageBox"
    width="303px"
    :before-close="onCancel"
  >
    <span>{{msg}}</span>
    <span slot="footer" class="dialog-footer" v-if="isConfirm=='true'">
      <el-button type="primary" @click="onCancel">确 定</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-else>
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onOK">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    isConfirm: {
      type: null,
      default: () => "true"
    },
    visible: {
      //是否可见
      type: null
    },
    onCancel: {//取消
      type: null,
      default: () => () => {
        this.visible = false;
      }
    },
    onOK: {//确认
      type: null
    },
    title: {//标题
      default: () => "确认"
    },
    msg: {//信息
    require:true,
      type: null
    }
  },
  watch: {}
};
</script>
<style lang="less">
.app-change-messageBox {
  height: 206px;
  box-shadow: 0px 5px 59px 0px rgba(14, 5, 10, 0.05);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.95);
  .el-dialog__header{
    .el-dialog__title {
      font-size: 16px;
      color: rgba(76, 73, 72, 1);
    }
    button {
      i {
        color: #c4a57f;
        &:hover {
          color: #c4a57f;
        }
      }
    }
  }
  .el-dialog__body {
    text-align: center;
    color: rgba(51, 51, 51, 1);
  }
  .el-dialog__footer {
    text-align: center;
    .dialog-footer {
      width: 208px;
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
    }
    button {
      width: 80px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      padding: 0;
      font-size: 16px;
      box-shadow: 0px 5px 59px 0px rgba(14, 5, 10, 0.05);
      box-sizing: border-box;
      outline: none;
    }
    // 确认按钮
    .el-button--primary {
      background: rgba(180, 152, 118, 0.9) !important;
      border-radius: 3px;
      border: 1px solid rgba(196, 165, 127, 1) !important;
    }
    //取消按钮
    .el-button--default {
      border: 1px solid rgba(196, 165, 127, 1);
      border-radius: 1px;
      color: rgba(196, 165, 127, 1);
      border-radius: 3px;
      background: rgb(255, 255, 255);
    }
  }
}
</style>


