<template>
    <section >
        <div id="box" ></div>
        <div style="width:100%;height:700px;text-align:center;paddingTop:200px;background:white">
        <div id="qrcode"  >
         </div>
         <div id="weixin" >请扫描上方二维码完成微信支付</div>
        </div>  
    </section>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{
            text:null,
        } 
    },
    mounted() {
        if(this.$route.query.data.split('weixin')[0]==''){//微信支付
             let weixindiv = document.querySelector('#weixin')
             let imgurl =  this.$route.query.data
                let qrcode = new QRCode('qrcode', {  
                    width: 100,  
                    height: 100, // 高度  
                    text: imgurl // 二维码内容  
                }) 
            weixindiv.style.display = 'block'    //底部文字显示
        }else{
             let div = document.querySelector('#box')     //支付宝支付
             let weixindiv = document.querySelector('#weixin')
             div.innerHTML=  this.$route.query.data.split('<script>')[0]   //支付宝表单
             document.forms[0].setAttribute('accept-charset', 'gbk');
             document.forms[0].setAttribute('_charset', 'gbk');
             document.forms[0].submit();
             eixindiv.style.display = 'none'    //底部文字隐藏
           
        }
    },
}
</script>
<style>
 #qrcode img{
     text-align:center;
     display:block;
     margin: 0 auto
 }
 #weixin{
     display: none;
     margin-top:30px;
 }
</style>
