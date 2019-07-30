
// import axios from 'axios'
import moment from "moment"
//昵称
export const nickName=[{ required: true, message: "请输入昵称", trigger: "blur" },
{ min: 2, max: 30, message: "长度在 2-30 个字符", trigger: "blur" }]

//发票抬头
export const invoiceRise=[{ required: true, message: "请填写发票抬头", trigger: "blur" },
{ min: 2, max: 30, message: "长度在 2-30 个字符", trigger: "blur" }]

//纳税人编号
export const invoiceSn=[{ required: true, message: "请填写纳税人识别号", trigger: "blur" },
{ min: 2, max: 30, message: "长度在-30 个字符", trigger: "blur" }]

//获取字符长度
export const getBLen = function(str) {
	if (str == null) return 0;
	if (typeof str != "string"){
		str += "";
	}
	return str.replace(/[^\x00-\xff]/g,"01").length;
}


//密码的自定义验证
let passVaild=(rule,value,callback)=>{
  console.log("mima",value)
  if(value.length==0){
    return callback(new Error('请输入密码'))
  }
  if(value.length>13||value.length<8){
    return callback(new Error("密码长度8-13位，须包含数字+字母"))
  }
  
  let reg=/\d+/
  let reg1=/[a-zA-Z]+/
  let reg2=/^[A-Za-z0-9]{8,13}$/;
  if(reg.test(value)&&reg1.test(value)&&reg2.test(value)){
  return callback()
  }else{
    return callback(new Error("密码长度8-13位，须包含数字+字母"))
  }
}

//获取this
let that;
export default function (app) {
     that = app
}
//昵称自定义验证
let nickNameVaild=(rule,value,callback)=>{
  if(value.length==0){
    return callback(new Error('请输入昵称'))
  } 
  else if(getBLen(value)>32||getBLen(value)<2){
    return callback(new Error('长度为2-32个字符'))
  }else{
    console.log(process,1)
    that.$axios.post("/user/checkNickname", {
      nickname:value
    }).then(res=>{
        //  console.log(res.data)
          if(res.result){
            return   callback(new Error('此昵称已存在'))
          }else{
            return  callback()
          }
    })
  }

  
}


export const vaild={
    //手机验证码
    short:[
        { required: true, message: "请输入六位验证码", trigger: "blur" },
        { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
      ],
      //密码验证
      password:[
        {validator: passVaild, trigger: 'blur'}
      ],
      nickName:[{validator: nickNameVaild, trigger: 'blur'}]
}




//密码的自定义验证
export function passVaildssss(rule,value,callback){
  console.log("mima",value)
  if(value.length==0){
    return callback(new Error('请输入密码'))
  }
  if(value.length>13||value.length<8){
    return callback(new Error("密码长度8-13位，须包含数字+字母"))
  }
  let reg=/\d+/
  let reg1=/[a-zA-Z]+/
  if(reg.test(value)&&reg1.test(value)){
  return callback()
  }else{
    return callback(new Error("密码长度8-13位，须包含数字+字母"))
  }
}