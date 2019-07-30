<template>
  <div>
    <!-- <textarea name id :placeholder="placeholder" v-show="!focusFlag" @focus="focus"></textarea> -->
    <div :class="['app-editor',hasBorder=='true'?'':'app-editor-nullBorder']">
      <p class="app-editor-placeholder" v-if="focusFlag" @click="placeFocus">{{placeholder}}</p>
      <div id="wangeditor">
        <div ref="editorElem" style="text-align:left" class="richEdit"></div>
      </div>
      <div class="tool">
        <div id="toolbar" ref="toolbar" v-show="kinds.includes('emoji')"></div>
        <div class="uploadImg" @click="flag=!flag" v-show="kinds.includes('picture')">
          <i class="el-icon-picture cb19 fz16"></i>
          <span style="white-space:nowrap;margin-top:1px;color:rgba(0,0,0,.7);transform:translateY(1px)">
            图片
            <span class="f12" style="margin-left:5px;color:rgba(0,0,0,.7)">({{imgAry.length}}/9)</span>
          </span>
        </div>
      </div>
      <div
        :class="['upload__tip',kinds.includes('emoji')?'app-upload__tip':'']"
        v-show="flag"
        style="width:310px"
      >
        <!-- <div class="upload__tipTitle"> -->
        <!-- <p> -->
        <!-- <span class="fz14 c3"> -->
        <!-- 本地上传 -->
        <!-- <span class="fz12 c30">({{imgAry.length}}/9)</span> 图片张数  弃用 -->
        <!-- </span> -->
        <!-- <span class="fr cb49" style="cursor:pointer" @click="flag=false">×</span> -->
        <!-- </p> -->
        <!-- <p class="fz12 c30 mt-15 mb-15">共{{imgAry.length}}张，还能上传{{9-imgAry.length}}张</p> -->
        <!-- <p class="fz12 c30 mt-15 mb-15"></p> -->
        <!-- </div> -->
        <ul>
          <li v-for="(item,index) in imgAry" :key="index" class="rich_upload_img">
            <img :src="item.thumbUrl" alt style="object-fit:cover">
            <div class="upload_mask">
              <el-upload
                action
                accept="image/png, image/jpeg, image/jpg, image/webp, image/bmp"
                :http-request="customUploadReplace.bind(this,index)"
              >
                <i class="el-icon-sort" title="替换"></i>
              </el-upload>
              <i class="el-icon-delete" title="删除" @click="remove(index)"></i>
            </div>
          </li>
          <li v-if="imgAry.length<9">
            <el-upload
              class="upload-demo Bask_homework_upload"
              action
              :file-list="fileList2"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/bmp"
              :http-request="customUpload"
              style="    
              display: flex;
              width: 100%;
              height: 100%;
              border: 1px dashed #ae907b;
              text-align: center;
              box-sizing:border-box;
              justify-content:center;
              align-items:center;"
            >
              <!-- <span class="c3d fz34"> -->
              <i
                class="el-icon-plus c3d"
                style="color:#ae907b!important;font-size:55px"
                v-if="!loading"
              ></i>
              <i
                class="el-icon-loading c3d"
                style="color:#ae907b!important;font-size:55px"
                v-if="loading"
              ></i>
              <!-- </span> -->
            </el-upload>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import emoji2 from "@/assets/emoji2.js";
export default {
  data() {
    return {
      editor: null,
      flag: false, //上传图片
      imgAry: [], //上传图片数组[{filePath:"",thumbUrl:""}]
      fileList2: [],
      loading: false, //加载
      focusFlag: true
    };
  },
  props: {
    kinds: {
      type: Array,
      default: function() {
        return [];
      }
    },
    placeholder: {
      // type:"String",
      default: function() {
        return "";
      }
    },
    hasBorder: {
      default: () => "true"
    }
  }, //kinds, []  emoji 表情  picture 上传图片 区分哪些功能需要展示
  mounted() {
    this.len = this.imgLength;
    const emoji = require("@/assets/emoji.json");
    let ary = [];
    let ary1 = [];
    emoji.forEach(item => {
      let obj = {};
      obj.alt = item.value;
      obj.src = item.url;
      ary.push(obj);
    });
    emoji2.forEach(item => {
      let obj = {};
      obj.alt = item.value;
      obj.src = item.icon;
      ary1.push(obj);
    });

    this.editor = new E(this.$refs.toolbar, this.$refs.editorElem);
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      "emoticon" //表情
    ];
    //配置编辑区域第z-index
    this.editor.customConfig.zIndex = 2;
    this.editor.customConfig.onfocus = () => {
      this.focusFlag = false;
    };
    this.editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      console.log(html, "变化");
      this.focusFlag = false;
    };
    this.editor.customConfig.onblur = html => {
      // html 即编辑器中的内容
      let str1 = this.editor.txt.html();
      let str = this.editor.txt.text();
      str = str
        .replace(/&nbsp;/g, "")
        .replace(/<br>/g, "")
        .replace(/ /g, "");
      if (str == "" && !str1.includes("<img")) {
        this.focusFlag = true;
      }
    };

    // 关闭粘贴样式的过滤
    this.editor.customConfig.pasteFilterStyle = true;
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = true;
    // 自定义处理粘贴的文本内容
    this.editor.customConfig.pasteTextHandle = function(content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      console.log(content, "粘贴");
      content = content.replace(/<[^>]+>/g, ""); //去掉所有的html标记
      content = content.replace(/\&nbsp;/g, "");
      content = content.replace(/ /g, "");
      return content;
      //  console.log(title)
      //  return title
      // return content + '<p>在粘贴内容后面追加一行</p>'
    };

    // this.editor.customConfig.emotions=[
    //   {
    //     title:"emoji",
    //     type:'image',
    //     content:ary
    //   },
    //   {
    //     title:"表情",
    //     type:'image',
    //     content:ary1
    //   },
    //    {
    //     title:"emoji2",
    //     type:'emoji',
    //     content:['😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','☺','😇','😐','😑','😶','😏','😣','😥','😮','😯','😪','😫','😴','😌','😛','😜','😝','😒','😓','😔','😕','😲','😷','😖','😞','😟','😤','😢','😭','😦','😧','😨','😬','😰','😱','😳','😵','😡','😠']
    //   }
    // ]
    console.log(this.editor);
    // this.editor.UI.menus.emoticon={
    //   normal:"<span>表情<span>",
    //   selected:"选中"
    // }
    this.editor.create();
    this.hidePic();
  },
  methods: {
    //获取焦点
    focus() {
      this.focusFlag = true;
    },
    //获取内容
    getHtml() {
      console.log(this.editor.txt.html());
      let str1 = this.editor.txt.html();
      let str = this.editor.txt.text();
      let n = this.initLength(str1, str);
      console.log(n, "长度");
      if (n >= 2000) {
          return "内容过多"
      }
      //判断没有写内容的时候
      str = str
        .replace(/&nbsp;/g, "")
        .replace(/<br>/g, "")
        .replace(/ /g, "");
      // console.log(1111,str,str1)
      if (str == "" && !str1.includes("<img")) {
        return null;
      } else {
        return this.editor.txt.html();
      }
    },
    //计算长度
    initLength(html, text) {
      console.log(html, "html");
      console.log(text, "text");
      console.log(text.length, "文本长度");
      let n = 0;
      html.replace(/<img/g, word => {
        n++;
      });
      return text.length + n;
    },
    //清空内容
    clearHtml() {
      this.editor.txt.clear();
    },
    //自定义上传
    customUpload(files) {
      //自定义上传
      let file = files.file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        e.target.result;
        let img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // size:18 width:15 long:12  1600*1200  正规比例
          let picWidth = Math.ceil(img.width / 1600 *15);
          let picLong = Math.ceil(img.height / 1200 *12);
          let wordSize = Math.ceil(img.height / 1200 * 18);
          if(wordSize<=13){
            wordSize=13
          }
          let formData = new FormData();

          formData.append("picWidth", picWidth);
          formData.append("picLong", picLong);
          formData.append("wordSize", wordSize);

          formData.append("profile", file);
          formData.append("nickName", this.info.nickName);
          this.loading = true;
          this.$axios.post("/utility/uploadPicture", formData).then(res => {
            console.log(res);
            this.loading = false;
            let obj = {};
            obj.filePath = res.result.filePath;
            obj.thumbUrl = res.result.thumbUrl;
            this.imgAry.push(obj);
          });
        };
      };

      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   let img = reader.result;
      //   this.imgAry.push(img);
      // };
    },
    //替换
    customUploadReplace(index, files) {
      console.log(files, index);
      let file = files.file;
      // 转base64
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        e.target.result;
        let img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          console.log(img.width, img.height);
          let picWidth = Math.ceil(img.width / 1600 * 15);
          let picLong = Math.ceil(img.height / 1200 * 12);
          let wordSize = Math.ceil(img.height / 1200 * 18);
          if(wordSize<13){
                      wordSize=13
            }

          let formData = new FormData();

          formData.append("picWidth", picWidth);
          formData.append("picLong", picLong);
          formData.append("wordSize", wordSize);
          formData.append("profile", file);
          formData.append("nickName", this.info.nickName);
          this.loading = true;
          this.$axios.post("/utility/uploadPicture", formData).then(res => {
            console.log(res);
            this.loading = false;
            let obj = {};
            obj.filePath = res.result.filePath;
            obj.thumbUrl = res.result.thumbUrl;
            this.imgAry[index] = obj;
          });
        };
      };

      let formData = new FormData();
      formData.append("profile", file);
      formData.append("nickName", this.info.nickName);
      this.loading = true;
      this.$axios.post("/utility/uploadPicture", formData).then(res => {
        console.log(res);
        this.loading = false;
        let obj = {};
        obj.filePath = res.result.filePath;
        obj.thumbUrl = res.result.thumbUrl;
        this.imgAry[index] = obj;
      });
    },
    //删除图片
    remove(id) {
      this.imgAry = this.imgAry.filter((item, index) => {
        return id != index;
      });
    },
    //获取图片url
    getImageUrl() {
      return this.imgAry;
    },
    //清空图片数组
    clearImgAry() {
      this.imgAry = [];
      this.flag = false;
    },
    //改变上传框的显示
    changeUploadFlag(flag) {
      this.flag = flag;
    },
    //点击placeholder获取焦点
    placeFocus() {
      this.focusFlag = false;
      this.$refs.editorElem.children[0].focus();
    },
    click(e) {
      e = e || window.event;
      var elem = e.target || e.srcElement;
      while (elem) {
        if (elem.className && elem.className.indexOf("upload__tip") > -1) {
          return;
        }
        elem = elem.parentNode;
      }
      this.flag = false;
    },
    hidePic(e) {
      //点击表情 隐藏图片
      // console.log('测试点击')
      if (this.kinds.includes("emoji") && this.kinds.includes("picture")) {
        //表情和图片都有的时候
        let ele = this.$refs.toolbar.children[0].children[0]; //表情的icon
        ele.addEventListener("click", () => {
          this.flag = false;
        });
      }
    }
  },
  watch: {
    flag(newVal) {
      console.log(newVal);
      if (newVal) {
        //打开
        document.documentElement.addEventListener("click", this.click); //document事件
      } else {
        // 关闭
        document.documentElement.removeEventListener("click", this.click);
      }
    }
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info
    })
  }
};
</script>
<style lang="less">
.app-editor-nullBorder {
  #wangeditor .richEdit {
    border: none !important;
    height: 79px !important;
  }
}
.app-editor {
  position: relative;
  .app-editor-placeholder {
    position: absolute;
    z-index: 10;
    color: #999999;
    top: 14px;
    left: 12px;
    font-size: 14px;
  }
  .el-upload-list__item {
    display: none;
  }
  .w-e-icon-happy {
    // font-size: 12px;
    color: #b19575 !important;
  }
  .el-icon-picture {
    &::before {
      display: none;
    }
    &::after {
      content: "";
      background: url("~assets/changeIcon/35.png") no-repeat;
      width: 15px;
      height: 15px;
      display: block;
      background-size: cover;
      background-position: center center;
    }
  }
  .w-e-icon-happy {
    &::before {
      content: "";
      background: url("~assets/changeIcon/34.png") no-repeat;
      width: 15px;
      height: 15px;
      display: inline-block;
      background-size: cover;
      background-position: center center;
    }
  }
}
#wangeditor {
  margin: 0 auto;
  margin-top: 50px;
  // 文本域
  .richEdit {
    width: 100%;
    height: 90px;
    margin: 0 auto;
    border: 1px solid rgba(196, 165, 127, 0.5);
    background: RGBA(251, 250, 248, 1);
    .w-e-text {
      //     width: 400px;
      // display: inline-block;
      // word-wrap: break-word;
      // margin-bottom: 20px;
      // height: auto;

      overflow-y: auto !important;
      p {
        font-size: 14px;

        opacity: 0.7;
      }
    }
  }
  .w-e-text-container .w-e-panel-container {
    top: 130px;
    margin-left: 0 !important;
    left: 0 !important;
    box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
    border-radius: 4px;
    border: none;
    .w-e-icon-close.w-e-panel-close {
      display: none;
    }
  }
}
/* 菜单栏 */
.w-e-toolbar {
  width: 60px;
  display: inline-block;
  .w-e-menu {
    margin-left: -17px !important;
    font-size: 19px;
    height: 19px;
    padding: 0 !important;
    color: rgba(0, 0, 0, 0.7);
  }
}
.tool {
  display: flex;
  align-items: center;
  margin-top: 13px;
  .uploadImg {
    display: flex;
    align-items: center;
    width: 80px;
    font-size: 12px;
    padding-top: 6px;
    box-sizing: border-box;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
  .w-e-menu {
    margin-left: -33px;
  }
  .w-e-icon-happy {
    &::after {
      content: "表情";
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
      vertical-align: middle;
    }
    &::before {
      vertical-align: middle;
      margin-right: 4px;
      font-size: 14px;
    }
  }
}

.rich_upload_img {
  position: relative;
  &:hover .upload_mask {
    display: flex;
  }
  .upload_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background: rgba(0, 0, 0, 0.6);
    display: none;
    justify-content: space-around;
    align-items: center;
    i {
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.upload__tip {
  position: absolute;
  margin-top: 10px;
  width: calc(310px);
  height: auto;
  padding: 20px 20px 10px;
  background: #ffffff;
  box-shadow: 0px 7px 22px 0px rgba(34, 23, 19, 0.07);
  border-radius: 4px;
  /* float: left; */
  z-index: 11;
}
.app-upload__tip {
  left: 43px;
}
.upload__tip::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #fff;
  left: 16px;
  top: -16px;
}
.upload__tip > ul {
  float: left;
}
.upload__tip > ul li {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}
.Learning_body
  .Learning_content
  .Bask_homework
  .upload__tip
  > ul
  li:nth-child(3n) {
  margin-right: 0px;
}
.upload__tip > ul li > img {
  width: 100%;
  height: 100%;
}
.Bask_homework_upload {
  display: inline-block;
  width: 76px;
  height: 76px;
  border: 2px dashed #ddd;
  text-align: center;
}
.Bask_homework_upload > div > span.c3d.fz34 {
  line-height: 70px;
}

.w-e-panel-container {
  position: relative;
  &::before {
    content: "";
    width: 0;
    height: 10px;
    position: absolute;
    top: -10px;
    left: 15px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
  }
}
.w-e-text-container .w-e-panel-container .w-e-emoticon-container .w-e-item {
  margin-bottom: 8px;
}
</style>