//全局路由钩子
//权限验证
//需要登陆才能进的页面
let routerSelf = ["/My","/wirtehomework"]



// 弃用  中间件使用拦截
export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    //获取cookie
    if (!app.store.state.system.token) {
      app.store.commit("system/getCookie")
    }
    console.log(to.path)
    // if(routerSelf.includes(to.path)){
    //   if(!app.store.state.system.token){
    //     // app.router.push("/")
    //     next({path:"/"})
    //   }else{
    //     next()
    //   }
    // }else{
    //   next()
    // }

    //获取个人信息
    // if(app.store.state.system.token&&!app.store.state.my.info.info.headUri){
    //   // app.$axios.post("/user/getuserinfo",{token:""}).then((res)=>{
    //   //   if(res.code==0){
    //   //     app.store.commit("my/info/getInfo",res.result)
    //   //   }
    //   // })

    // }
    next()

      //判断是否需要权限登陆
    // if (routerSelf.includes(to.path)) {
    //   //判断是否登陆
    //   if (app.store.state.system.token) {
    //     next()
    //   } else {
    //     //没有登陆
    //     if (to.path == "/classList") {
    //       next()
    //     } else {
    //       next('/classList')
    //     }
    //   }
    // } else {
    //   next()
    // }
  })
}
