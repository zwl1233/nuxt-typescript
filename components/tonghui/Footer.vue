<template>
  <footer class="footer">
    <article class="footer-left">
      <div class="fl" style="text-align:center">
        <h3 style="font-weight:400">微信公众号</h3>
        <img :src="require('@/assets/img/Qr_code.jpeg')" style="width:79px;height:79px" alt>
      </div>
      <div class="fl" style="text-align:center">
        <h3 style="font-weight:400">新浪微博</h3>
        <img :src="require('@/assets/img/Qr_code2.jpeg')" alt style="width:79px;height:79px">
      </div>
    </article>
    <article class>
      <dl>
        <dt>暄桐</dt>
        <dd class="lh18">写字是一种生活</dd>
      </dl>
      <dl>
        <dt>联系我们</dt>
        <dd class="lh18">北京市朝阳区光华路9号天阶大厦</dd>
        <dd class="lh18">xuantongjiaoshi@126.com</dd>
      </dl>
      <dl class="dlLast">
        <dt>版权申明</dt>
        <dd class="lh18">暄桐教室所有视频著作权归暄桐文化（北京）有限公司所有，未经允许不得传播</dd>
      </dl>
      <p>Powered by 暄桐教室 京ICP备17020743号</p>
    </article>
  </footer>
</template>
<script>
import {encryption,decrypt} from "@/plugins/utils/"
export default {
  data() {
    return {
        key:"",
        vi:""
    };
  },
  created() {
      this.key=CryptoJS.enc.Latin1.parse('abcdef1234567890')
      this.iv=CryptoJS.enc.Latin1.parse('abcdef1234567890')
      let obj={name:"周文龙",sex:0,age:22,password:"zhouwenlong",text:"加密测试一下",str:"  "}
      let text=JSON.stringify(obj)
      let str=this.encryption(text)
      console.log("加密字符串:",str)
      let data=this.decrypt(str)
      console.log("解密字符串",data)
  },
  methods: {
      encryption,
      decrypt
  }
};
</script>

<style lang="less" scoped>
.footer {
  width: 1090px;
  margin: 0px auto;
  .lh18 {
    line-height: 18px;
  }
  .footer-left {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 1px;
      height: 115px;
      background: #d9d3cf;
      right: 0;
      top: 5px;
    }
  }
}

.footer article {
  margin: 63px 0px;
  float: left;
}

.footer article > dl {
  margin-right: 60px;
  display: inline-block;
  vertical-align: top;
}

.footer article > dl > dt {
  margin-bottom: 24px;
  font-size: 16px;
  color: #3e3a39;
}

.footer article > dl > dd {
  font-size: 12px;
  color: #585757;
}

.footer article:nth-child(1) > div h3 {
  margin-bottom: 24px;
  font-size: 16px;
  color: #3e3a39;
}
.footer article:nth-child(1) {
  display: flex;
  padding-right: 44px;
  margin-right: 44px;
  // border-right:1px solid #d9d3cf;
}

.footer article:nth-child(1) > div:nth-child(1) {
  margin-right: 50px;
}

.footer article:nth-child(2) dl:nth-child(3) {
  width: 280px;
  margin: 0px;
}

.footer article:nth-child(2) dl + p {
  margin-top: 38px;
  font-size: 12px;
  color: #585757;
  opacity: 0.7;
}
// .footer{
//   width: 100%;
//   height: 306px;
//   background: rgba(19, 20, 24, 1);
//   font-size: 14px;
//   color:rgba(198, 198, 198, 1);

//   .footer_top{
//     width: 100%;
//     height: 230px;
//     display: flex;
//     justify-content: space-around;
//     align-items: top;
//     padding-top: 35px;
//     box-sizing: border-box;
//     dl{
//       dt{
//         font-size: 16px;
//         color:rgba(153, 153, 153, 1);
//         margin-bottom: 20px;
//       }
//       dd{
//           margin-bottom: 15px;
//         }
//     }
//   }
//   .footer_bottom{
//     font-size: 12px;
//     text-align: center;
//     width: 100%;
//     line-height: 76px;
//     height: 76px;
//     border-top: 1px solid rgba(30, 31, 36, 1);
//     box-sizing: border-box;

//   }
// }
</style>
