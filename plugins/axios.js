import Vue from 'vue'
import md5 from 'js-md5';
import {
  Message
} from 'element-ui';
// import { Session } from 'inspector';
var vm = new Vue({})
export default function (app) {
  // console.log("axios", app)
  let axios = app.$axios;
  let redirect = app.redirect
  console.log(axios)
  // 基本配置
  axios.defaults.withCredentials=true;
  axios.defaults.timeout = 300000
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

  // 请求回调
  axios.onRequest(config => {
    if (config.data !== undefined) {
      //如果有token 则直接获取store里的appid token
      if (config.data.token !== undefined) {
        // console.log('nononono')
        config.data.password = app.store.state.system.password //password
        config.data.token = app.store.state.system.token //token
        config.data.appid = app.store.state.system.appid //appid
        config.data.timestamp = new Date().valueOf() //时间戳

        let md5 = getMd5(config.data) //md5
        config.data.signature = md5
        delete config.data.password
        return config 
      } 
    }

    //请求时开启loading
    if (process.browser) { //判断是否为客户端
      // vm.$loading();
    }
    // console.log("二次封装",config)
  })

  // 返回回调
  axios.onResponse(res => {
    //请求结束后 关闭loading
    if (process.browser) {
      // let load = vm.$loading();
      // load.close();
    }
    // console.log(process.browser,"环境标示")
    if (res.data.code != 0 && res.data.code != 600002 && res.data.code != 999999) {
      console.log('进来了')
      Message({
        duration:5000,
        message: res.data.msg,
        type: 'warning'
      })

    }
    //请登录
    if (res.data.code == 600002) {
      // console.log(11,app)
      app.store.commit("login/Loginpage", true)
    }
    if (res.data.code == 900001) {
      // console.log(11,app)
      app.store.commit("system/clearCookie")
    }
    return res.data
  })

  // 错误回调
  axios.onError(error => {
    //请求出错后  重定向
    // const code = parseInt(error.response && error.response.status)
    // console.log(code)
    // if (code === 404) {
    //   redirect('/404')
    // }
  })


  //根据字母表升序  转化成md5,然后转大写
  function getMd5(params) {
    // console.log(params.password)
    let ary = Object.keys(params) //拿到ary
    ary.sort((a, b) => {
      return a.localeCompare(b)
    })
    let str = ""

    ary.forEach((item) => {
      //  console.log(item)
      if (item == "appid" || item == "password" || item == "token" || item == "timestamp") {
        str += item + params[item]
      }
    })
    // console.log(str)
    let md = md5(str)
    return md.toUpperCase()
  }
  return axios
}

let getMsg=()=>{
  console.log('999999999999')
  let msg=localStorage.getItem("loginmsg")
  if(msg){
    Message({
      duration:2000,
      message: msg,
      type: 'success'
    })
    localStorage.removeItem("loginmsg")
  }
}

getMsg()