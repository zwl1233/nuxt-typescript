
export const state = () => ({
    centerDialogVisible: false,//登录页面显示
    Logonhandover:false, //手机和邮箱登录切换

    newlogin:false,   //注册页面
    activeclass:true,//注册切换

    Verificationdisplay:false, //所有验证码验证 
    Vedislaysuccess:false, //验证成功

    Mobilephoneverification:false, //手机验证切换

    Forgetpassword:false, //忘记密码页面

    // WechatModel:true,
    WechatModel:false,  //绑定页面
    WechatModelist:{},  //判断哪些需要绑定
    // WechatModelist:{needMobile:true,needEmail:true},
    bindflag:'one',

    isnewsouse:true,  //注册查询,

    // isPrevent:false,//防止重复
  })
  
  export const mutations = {
      //显示登录页面
      Loginpage(state,loginpage){
        state.centerDialogVisible=loginpage
      },
      //手机登录邮箱登录切换
      Mailboxlogin(state,Mailboxloginpage){
        state.Logonhandover =  Mailboxloginpage
      },
      //注册页面显示 登录页面隐藏
      Newuser(state,New){       
        state.centerDialogVisible = false
        state.newlogin = New
        console.log(New,'new')
      }, 
      //注册切换
      activeclass(state,Class){  
        state.activeclass = Class
      },
      //网易验证
      Vedislay(state,flag){
        state.Verificationdisplay = flag
      },
      //网易验证成功
      Vedislaysuccess(state,success){
        state.Vedislaysuccess = success
      },
      //手机验证
      Mobilephoneverification(state,Logon){ 
        state.Mobilephoneverification = Logon
      },
      //忘记密码页面显示  登录页面隐藏
      Forgetpassword(state,pageflag){ 
        state.centerDialogVisible = false
        state.Forgetpassword = pageflag
      },
      //绑定页面显示 登录页面隐藏
      WechatModelBin(state,WechatModelpage){ 
        state.centerDialogVisible = false
        state.newlogin = false
        state.WechatModel = WechatModelpage
      },
      //需要绑定的数据
      Bindingdata(state,data){
        console.log(data,'datdtadtatdtadtatdat')
        state.WechatModelist = data
      },
      //绑定切换的active
      Bindingswitch(state,text){
        console.log(22222,text)
        state.Bindingswitchtext=text
      },
      //绑定
      bindflagchange(state,text){
        state.bindflag=text
      },
      //注册查询
      isnewsousechange(state,flag){
        state.isnewsouse = flag
      }
  }