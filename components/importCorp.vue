<template>
  <el-dialog
    title="修改头像"
    :visible="visible"
    width="640px"
    custom-class="app-change-corp-dialog"
    @close="closeCascader({attrName:'avatorVisible',attrValue:false})"
  >
    <div class="app-corp">
      <vueCropper
        style="width:300px;height:300px;display:inline-block;background:white;border:1px solid #acacac"
        ref="cropper"
        :img="imgBase64"
        :outputSize="size"
        :outputType="outputType"
        :canScale="options.canScale"
        :autoCrop="options.autoCrop"
        :full="options.full"
        :canMove="options.canMove"
        :centerBox="options.centerBox"
        :mode="options.mode"
        :autoCropWidth="options.autoCropWidth"
        :autoCropHeight="options.autoCropHeight"
        :fixed="options.fixed"
        :fixedNumber="options.fixedNumber"
        @cropMoving="cropMoving"
      ></vueCropper>
      <div class="corp-box" v-if="corpUrl">
        <div class="corp-box-pic">
          <img :src="corpUrl" alt>
        </div>
        <p class="corp-box-text">预览效果</p>
        <p class="corp-box-text1">图片仅支持JPEG、JPG、PNG格式</p>
      </div>
    </div>

    <!-- <span slot="footer" class="dialog-footer"> -->
    <div class="app-corp-footer">
      <div class="app-corp-footer-footer-left">
        <el-upload
          action
          class="upload-demo app-change-upload-demo"
          accept="image/png, image/jpeg, image/jpg, image/webp,image/bmp"
          :http-request="customUpload"
          :file-list="fileList"
        >
          <el-button size="small" class="app-crop-selectPic">选取图片</el-button>
        </el-upload>
      </div>
      <div class="app-corp-footer-footer-right">
        <el-button type="primary" @click="onOK">保存</el-button>
      </div>
    </div>

    <!-- <el-button @click="closeCascader({attrName:'avatorVisible',attrValue:false})">取 消</el-button> -->

    <!-- </span> -->
  </el-dialog>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      fileList: [],
      imgBase64: "",
      size: 1, //裁剪生成图片的质量
      outputType: "jpg", //裁剪生成图片的格式
      options: {
        canScale: false, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        full: true, //是否输出原图比例的截图
        canMove: false, //上传图片是否可以移动
        centerBox: true, //截图框是否被限制在图片里面
        mode: "contain", //图片默认渲染方式
        autoCropWidth: 150, //初始化截图框的宽
        autoCropHeight: 150, //初始化截图框的高
        // fixed: true,
        infoTrue:false,//截图框信息
        fixedNumber: [1,1]
      },
      corpUrl: "", //所截图的url
      corpBlob: null //所截图的blob
    };
  },
  props: ["visible"],
  components: {
    VueCropper
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info
    })
  },
  methods: {
    //自定义上传
    customUpload(files) {
      console.log(files);
      console.log(this.fileList);
      let file = files.file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result;
      };
    },
    ...mapMutations({
      closeCascader: "my/info/closeCascader",
      selectAry: "my/info/selectAry"
    }),
    onOK() {
      //获取blob流
      this.$refs.cropper.getCropBlob(blob => {
        this.corpBlob = blob;
      });
      if (!this.corpBlob) {
        this.$message({
          duration: 5000,
          message: this.$selfMsg.selectImg,
          type: "success"
        });
        return;
      }
      let formData = new FormData();
      formData.append("profile", this.corpBlob);
      formData.append("nickName", "");//是否需要水印
      // formData.append("nickName", this.info.nickName);//
      //发送请求

      console.log(formData, "formData");
      this.$axios.post("/utility/uploadPicture", formData).then(res => {
        if (res.code == 0) {
          console.log(res);
          this.corpUrl = res.result.filePath;
          let thumbUrl = res.result.thumbUrl;
          this.$axios
            .post("/user/updateuserhead", {
              headUri: this.corpUrl,
              headThumbnailUri: thumbUrl,
              token: ""
            })
            .then(ress => {
              if (ress.code == 0) {
                this.$message({
                  duration: 5000,
                  message: this.$selfMsg.update,
                  type: "success"
                });
              }
            });

          this.selectAry({ attrName: "headThumbnailUri", attrValue: thumbUrl });
          this.selectAry({ attrName: "headUri", attrValue: this.corpUrl });
          this.closeCascader({ attrName: "avatorVisible", attrValue: false });
        }
      });
      // //获取base64
      // this.$refs.cropper.getCropData(data => {
      //   // console.log(data)
      //   this.corpUrl = data;
      // });
      // console.log("onok");
      // this.selectAry({ attrName: "headThumbnailUri", attrValue: this.corpUrl });
      // this.closeCascader({ attrName: "avatorVisible", attrValue: false });
    },
    //截图框移动的回调函数
    cropMoving() {
      console.log("移动中");
      //获取blob
      this.$refs.cropper.getCropBlob(data => {
        // console.log(data)
        this.corpBlob = data;
      });
      //获取base64
      this.$refs.cropper.getCropData(data => {
        // console.log(data)
        this.corpUrl = data;
      });
    }
  }
};
</script>
<style lang="less">
.app-change-corp-dialog {
  width: 600px;
  height: 500px;
  .el-dialog__title {
    color: rgba(51, 51, 51, 1);
  }
  .el-dialog__header {
    padding-top: 30px;
    padding-left: 39px;
    padding-right: 41px;
    .el-dialog__headerbtn {
      top: 33px;
      right: 41px;
      i {
        color: rgba(196, 165, 127, 1);
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .el-dialog__body {
    padding-left: 39px;
    padding-right: 45px;
    padding-bottom: 43px;
  }
  .app-corp {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .corp-box {
      display: inline-block;
      width: 210px;
      height: 300px;
      padding-top: 55px;
      box-sizing: border-box;
      // border-radius: 50%;
      // overflow: hidden;
      // background: #fff;
      .corp-box-pic {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        background: #fff;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        text-align: center;
      }
      .corp-box-text {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        margin-top: 19px;
      }
      .corp-box-text1 {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        margin-top: 10px;
      }
    }
    .crop-info{
      display: none;
    }
    .crop-point{
      background-color:rgba(180, 152, 118, 1);
    }
    .cropper-view-box{
      outline:1px solid rgba(180, 152, 118, 1);
      outline-color:rgba(180, 152, 118, .75);
      border-radius: 50%;
    }
    // .cropper-face{
    //   background: rgba(0, 0, 0, 0.5);
    //   opacity: 1;
    //   &::after{
    //     content:"";
    //     position: absolute;
    //     width: 100%;
    //     height:100%;
    //     background: #fff;
    //     opacity: .1;

    //   }
    // }
    .cropper-crop-box{
      // display: block;
      
    }
  }
  .upload-demo {
    // margin-bottom: 10px !important;
  }
  .app-corp-footer {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .app-crop-selectPic {
      width: 87px;
      height: 40px;
      color: rgba(187, 162, 131, 1);
      font-size: 16px;
      border: 1px solid rgba(187, 162, 131, 1);
      opacity: 0.9;
      border-radius: 1px 1px 1px 1px;
      background: #fff;
      padding: 8px 10px;
      border-radius: 3px;
      letter-spacing: 1px;
      &:hover {
        border: 1px solid rgba(187, 162, 131, 1);
        background: #fff;
      }
    }
    .app-corp-footer-footer-right {
      margin-left: 40px;
      button {
        width: 87px;
        height: 40px;
        opacity: 0.9;
        border-radius: 1px 1px 1px 1px;
        border-radius: 3px;
        background: rgba(180, 152, 118, 1)!important;
        border: none;
        color: #fff;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>

<style lang="less">
.app-change-upload-demo {
  .el-upload-list.el-upload-list--text {
    & > li {
      display: none;
    }
    // & > li:last-child {
    //   display: block;
    // }
  }
}
</style>

