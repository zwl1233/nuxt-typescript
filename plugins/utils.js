//工具类
import Vue from 'vue'
import moment from "moment"

// //处理时间
// Vue.prototype.formTime = (props, flag, kind) => {
//   //kind 处理时间的方式 
//   if (props) {
//     var date = new Date(props);
//     var year = date.getFullYear();
//     var month = date.getUTCMonth() + 1; //js从0开始取 
//     var date1 = date.getUTCDate(); //世界时间
//     var hour = date.getUTCHours();
//     var minutes = date.getUTCMinutes();
//     var second = date.getUTCSeconds()
//     if (kind === "noUTC") {
//       year = date.getFullYear();
//       month = date.getMonth() + 1; //js从0开始取 
//       date1 = date.getDate();
//       hour = date.getHours();
//       minutes = date.getMinutes();
//       second = date.getSeconds()
//     }

//     if (flag && flag === 'add') {
//       if (parseFloat(hour) < 10) {
//         hour = "0" + hour
//       }
//       if (parseFloat(minutes) < 10) {
//         minutes = "0" + minutes
//       }
//       if (parseFloat(second) < 10) {
//         second = "0" + second
//       } 
//       return `${year}-${month}-${date1}${' '}${hour}:${minutes}:${second}`
//     } else {
//       return year + "-" + month + "-" + date1
//     }
//   } else return;

// }

// //判断是否含有
// Vue.prototype.isKey = (val, list) => {
//   if (val == '') {
//     return true
//   }
//   return list.includes(val) ? true : false
// }

// //处理图片流
// Vue.prototype.handleImg = (flow) => {
//   if (!flow instanceof Blob) {
//     flow = new Blob(flow)
//   }
//   let src = window.URL.createObjectURL(flow)
//   return src
// }

// //获取cookie
// Vue.prototype.getCookie = (cookie) => {
//   let reg = new RegExp("(^| )" + cookie + "=([^;]*)(;|$)");
//   if (document.cookie.match(reg)) {
//     return document.cookie.match(reg)[2]
//   }
// }

// //获取Base64
// Vue.prototype.getBase64 = (blob) => {
//   let url = ""
//   const reader = new FileReader();
//   reader.addEventListener('load', () => {
//     url = reader.result
//   });
//   reader.readAsDataURL(img);
//   return url
// }
//将时间变为 X天X时X分X秒
export const initTime = (time) => {
  console.log(time)
  if (time) {
    return moment(time).format("DD天HH时mm分ss秒")
  } else {
    return ""
  }
}
//处理时间
//data 时间  type:"add" 加上时分秒   isUTC:  是否转为utc时间
//是否转为utc时间   获取日期控件时间时不需要utc时间  后台传来的时间  需要是utc时间
export const formData = (data, isUTC, type,isSecond=true) => {
  // console.log(moment(1552017509).format("YYYY-MM-DD HH:mm:ss"))
  if (data) {
    if (isUTC == "utc") { //utc时间
      if (type == "add") {
        if(!isSecond){
          return moment(data).utc().format("YYYY-MM-DD HH:mm")
        }else{
          return moment(data).utc().format("YYYY-MM-DD HH:mm:ss")
        }
      } else {
        return moment(data).utc().format("YYYY-MM-DD")
      }
    } else { //本地时间
      if (type == "add") {
        if(!isSecond){
          return moment(data).format("YYYY-MM-DD HH:mm")
        }else{
          return moment(data).format("YYYY-MM-DD HH:mm:ss")
        }
      } else {
          let t="Mon Jan 28 2019 00:00:00 GMT+0800"
        return moment(data).format("YYYY-MM-DD")
      }
    }
  } else {
    return ""
  }
}
//处理时间  24小时以内 显示距离几小时  大于24小时 显示 MM-DD
//isCountDown: 是否需要倒计时
export const computingTime = (data,isCountDown)=>{
  //传来的是一个时间
  //计算时间差
  // console.log(data)
  data=moment(data)
  // console.log(data)
  let now=moment()
  let diff=data.diff(now)//毫秒数
  // console.log(diff)
  let n=1000*60*60*24//一天的毫秒数
  if(Math.abs(diff)>n){
    //超过一天 显示 月份-天数
    return data.format("MM-DD HH:mm")
  }else{
    if(isCountDown){
      //需要倒计时  计算出具体多少时间 传出去
      return moment(diff).add(-8,"hour").format("HH:mm:ss")

    }else{
      
      //没有超过一天  显示 多少时间前
      if(data.locale("zh-cn").fromNow()=='几秒前'||data.locale("zh-cn").fromNow()=='几秒内'){
        return "刚刚"
      }else{
        return data.locale("zh-cn").fromNow()
      }
    }
    
  }
}
//处理时间  24小时以内 显示时分   超过 年月/日
export  const computingDataTime=(data)=>{
  //传来的是一个时间
  //计算时间差
  // console.log(data)
  data=moment(data)
  // console.log(data)
  let now=moment()
  let diff=data.diff(now)//毫秒数
  // console.log(diff)
  let n=1000*60*60*24//一天的毫秒数
  if(Math.abs(diff)>n){
    //超过一天 显示 月份-天数
    return data.utc().format("YY/MM/DD")
  }else{
    return data.utc().format("HH:mm")
    // if(isCountDown){
    //   //需要倒计时  计算出具体多少时间 传出去
    //   return moment(diff).add(-8,"hour").format("HH:mm:ss")
    // }else{
    //   //没有超过一天  显示 多少时间前
    //   return data.locale("zh-cn").fromNow()
    // }
  }
}

//获取this
let that;
export default function (app) {
     that = app
}

//手机号正则
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}
export function validgifPhone(rule, value,callback) {
  if (!value){
    return  callback(new Error('请输入手机号'))
  }else  if (!isvalidPhone(value)){
    return   callback(new Error('请输入正确的11位手机号'))
  }else {
    return  callback()
  }
}
let shortCode,CodeTyep

//手机号判断
export function validPhone(rule, value,callback) {
    shortCode = value
    CodeTyep=1
    if (!value){
      return  callback(new Error('请输入手机号'))
    }else  if (!isvalidPhone(value)){
      return   callback(new Error('请输入正确的11位手机号'))
    }else {
      if(that.store.state.login.isnewsouse){
          that.$axios.post("/user/checkPhone", {
            phone:value
          }).then(res=>{
            if(res.result){
              return  callback()
            }else{
              return   callback(new Error('此手机号尚未注册'))
            }
          })
      }else{
        that.$axios.post("/user/checkPhone", {
          phone:value
        }).then(res=>{
          if(res.result){
            return   callback(new Error('此手机号已存在'))
          }else{
             return  callback()
          }
        })
       
      }
    }
}

//邮箱判断
export function isEmail(rule, value,callback) {
  shortCode = value
  CodeTyep=2
  if (!value){
    return  callback(new Error('请输入邮箱地址'))
  }else  if (!isvalidEmail(value)){
    return   callback(new Error('请输入正确的邮箱地址'))
  }else {
    if(that.store.state.login.isnewsouse){
      that.$axios.post("/user/checkEmail", {
        email:value
      }).then(res=>{
        if(res.result){
          return  callback()
        }else{
          return   callback(new Error('此邮箱地址尚未存在'))
        }
      })
    }else{
      that.$axios.post("/user/checkEmail", {
        email:value
      }).then(res=>{
        if(res.result){
          return  callback(new Error('此邮箱地址已存在'))
        }else{
          return   callback()
        }
      })
      // return  callback()
    }
      
  }
}
export function nowTime(state){  //当前时间
  let year =   new Date().getFullYear()
   let mouth =   new Date().getMonth()+1
   let day =   new Date().getDate()
   let hours = new Date().getHours()
   let minutes = new Date().getMinutes()
   let seconds = new Date().getSeconds()
   let time = year+'-'+mouth+'-'+ day +' '+hours+':'+minutes+':'+seconds
   return time
}
//验证码接口
export function vaildShort(rule, value,callback){
  const reg = /^\d{6}$/g
   console.log(value.length,'验证码')
  if (!value){
    return  callback(new Error('请输入六位验证码'))
  }else  if (!reg.test(value)){
    return   callback(new Error('验证码长度为六位'))
  }else {
     if(!shortCode){
        return   callback()
        //  return   callback(new Error('请先输入账号'))
     }
       that.$axios.post("/user/checkConfirmCode", {
          confirmCode:value, //验证码
          type:CodeTyep, //1:手机校验码 2：邮箱验证码")
          findWay:shortCode, //找回方式  手机号/邮箱账号
          nowTime: nowTime(), //当前时间  
          isExist:false
        })
        .then(res => { 
          if(res.result){
            return   callback()
          }else{
            return   callback(new Error(res.msg))
          }
          })
   
  }
}
//网易验证
export function Verionesuc(rule, value,callback){
    if (!that.store.state.login.Vedislaysuccess){
       return callback(new Error('请先进行验证'))
    }else {
       return callback()
    }
}


//邮箱简单正则
export function issouemail(str) {
  const reg = /@/g
  return reg.test(str)
}
//邮箱判断验证
export function isvalidEmail(str) {
  const reg = /^.*@.+\..+$/
  return reg.test(str)
}

//手机号判断或邮箱判断
export function validPhoneandemail(rule, value,callback) {
  if (!value){
    return  callback(new Error('请输入手机号或邮箱地址'))
  }
  else{
    if(issouemail(value)){
        if(!isvalidEmail(value)){
          return   callback(new Error('请输入正确的邮箱地址'))
        }else{
          if(that.store.state.login.isnewsouse){
            that.$axios.post("/user/checkEmail", {
              email:value
            }).then(res=>{
              if(res.result){
                return  callback()
              }else{
                return   callback(new Error('此邮箱地址尚未注册'))
              }
            })
          }
        }
    }else{
        if (!isvalidPhone(value)){
          return   callback(new Error('请输入正确的11位手机号'))
        }else{ 
          if(that.store.state.login.isnewsouse){
            that.$axios.post("/user/checkPhone", {
              phone:value
            }).then(res=>{
              if(res.result){
                return  callback()
              }else{
                return   callback(new Error('此手机号尚未注册'))
              }
            })
        }
        }
    }
  }
}

//根据字节长度截取字符串
export const cutStr=(str, L)=>{
  var result = "",
    strlen = str.length, // 字符串长度
    chrlen = str.replace(/[^\x00-\xff]/g, "**").length; // 字节长度

  if (chrlen <= L) {
    return str;
  }

  for (var i = 0, j = 0; i < strlen; i++) {
    var chr = str.charAt(i);
    if (/[\x00-\xff]/.test(chr)) {
      j++; // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
    }
    if (j <= L) {
      // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr;
    } else {
      // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      return result;
    }
  }
}

//加密
export const encryption=(data)=>{
let key=CryptoJS.enc.Latin1.parse('abcdef1234567890')
    var srcs=CryptoJS.enc.Utf8.parse(data)
    var encrypted=CryptoJS.AES.encrypt(srcs,key,{
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
}

//解密
export const decrypt=(data)=>{
let key=CryptoJS.enc.Latin1.parse('abcdef1234567890')
  var stime=new Date().getTime();
  var decrypt=CryptoJS.AES.decrypt(data,key,{
      mode:CryptoJS.mode.ECB,
      padding:CryptoJS.pad.Pkcs7,
  });
  var result=JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt))
  var etime=new Date().getTime()
  console.log("解密时间",etime-stime)
  return result
}



