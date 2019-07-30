export const state = () => ({
    selectFlag:false,//微信选择绑定/注册

    registerFlag:false,//微信注册页面

    bindingFlag:false,//微信绑定手机号/邮箱页面

    bindUserFlag:false,//绑定用户信息

    code:"",
    state:"",

    openId:"",//微信的openId
    nickName:"试试",//微信的昵称
    headimgurl:"",//微信头像

    bindValue:"",//绑定的手机号/邮箱

    bindType:"",//one 手机   two 邮箱

    confirmCode:"",//验证码


  })
  export const mutations = {
      //改变微信选择绑定
      changeSelectFlag(state,flag){
          console.log(flag)
          state.selectFlag=flag
      },
      //改变微信注册
      changeRegisterFlag(state,flag){
        state.registerFlag=flag
      },
      //改变微信绑定
      changeBingFlag(state,flag){
        state.bindingFlag=flag
      },
      changeBindUserFlag(state,flag){
        state.bindUserFlag=flag
      },
      //微信回调code
      changeCode(state,str){
          state.code=str
      },
      //微信回调state
      changeState(state,str){
        state.state=str
      },
        //微信回调需要的信息
      changeWxInfo(state,obj){
        state.openId=obj.openId
        state.nickName=obj.nickName||""
        state.headimgurl=obj.headimgurl
      },
      changeBindValue(state,value){
        state.bindValue=value
      },

      changeBindType(state,value){
          state.bindType=value
      },
      changeBindConfirmCode(state,code){
        state.confirmCode=code
      }


  }