import moment from "moment"
export const state = () => ({
     appid:'48832f76dc1411e898f900163e048dd6', //appid
     password:'6581a04d-dc14-11e8-98f9-00163e048dd6',  //password
     token:null,  //token
     time:null,   //nowtime
     storagelist:null
  })
  function deleteMyCookie2(name) {  
    var date = new Date();
         date.setTime(date.getTime()-10000); //删除一个cookie，就是将其过期时间设定为一个过去的时间
         document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path=/";
         document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path=/";
     }
  
  export const mutations = {
    getCookie(state){//获取用户token
        var arr;
        var reg = new RegExp("(^| )" + 'userlogin' + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
           state.token =  decodeURIComponent(arr[2]);
        }
        else{
            this.state.token = null;
        }
    },
    nowTime(state){  //当前时间
      // let year =   new Date().getFullYear()
      //  let mouth =   new Date().getMonth()+1
      //  let day =   new Date().getDate()
      //  let hours = new Date().getHours()
      //  let minutes = new Date().getMinutes()
      //  let seconds = new Date().getSeconds()
      //  let time = year+'-'+mouth+'-'+ day +' '+hours+':'+minutes+':'+seconds
      let time=moment().format("YYYY-MM-DD HH:mm:ss")
       return state.time = time
    },
    //清除cookie
    clearCookie(state){
        state.token=null
        document.cookie = "userlogin" + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        // delCookie("userlogin")

        deleteMyCookie2("userlogin")

        // window.location.reload();
        // document.execCommand("Refresh")
        //回到首页
        // history.go(0)
        //清除个人信息
        console.log(this,'this')
        this.commit("my/info/clearInfo")
        this.$router.push('/')//回到首页
    },
    //登录刷新
    loginRefresh(){
      let H=document.documentElement.scrollTop
      sessionStorage.setItem("scrollTop", H);
      history.go(0)
    },
    //回到当前位置
    backPos(){
      if (sessionStorage.getItem("scrollTop")) {
        document.documentElement.scrollTop = sessionStorage.getItem(
          "scrollTop"
        );
        sessionStorage.removeItem("scrollTop");
      }

    },
    changstorage(state,list){
       state.storagelist = list
    }
  }