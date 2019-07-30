export const state = () => ({
  reviewFlag:false,//通关回顾
  details:false,//学习详情
  info:"",//课时信息
})
  
  export const mutations = {
    //改变通关回顾的状态
    changeFlag(state,flag){
      console.log(flag,"阿萨")
      state.reviewFlag=flag
    },
    //学习详情
    changeDetails(state,obj){
      console.log(obj.info)
      state.details=obj.flag
      state.info=obj.info
    },
    //单独改变info
    changeInfo(state,info){
      state.info=info
    }
    
  
  }
  