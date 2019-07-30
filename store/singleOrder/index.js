import moment from "moment";

export const state = () => ({
  tabId: "", //tab切换id
  courseId:"",
  studentTime:"",//学习有效期  直播取learnTime  录播取studyValidityPeriod(天数)
  isSignUp:false,//是否报名
  isBeOverdue:false,//  是否过期  直播过了学习截止日期  录播 回放有效期

})

export const mutations = {
  //切换tab
  changeTabId(state, id) {
    state.homework.postFlag=false
     state.tabId = id
  },
  //改变courseId
  changeCourseId(state,id){
      state.courseId=id
  },
  clearInfo(state){
    // state={}
    console.log('清楚信息')
    state.courseId='first'
    state.homework.postFlag=false
    state.evaluation.reviewFlag=false
    state.courseContent.details=false


  },
  changeStundentTime(state,time){
    console.log(time,'时间',moment(time))
    state.studentTime=time
    //判断是否过了期限  过了期限则不可点击  
    // let flag=moment().diff(moment(time))
     time=time.replace(/[\u4e00-\u9fa5]/g,"/")
    let a=moment().valueOf()
    let b=moment(time).valueOf()
    if(a-b>=0){
      //过期
      state.isBeOverdue=true
    }else{
      state.isBeOverdue=false
    }
    console.log(state.isBeOverdue,"时间")
    // state.isBeOverdue=!flag
    // if(flag){
    // //当前在之前  time在当前时间前面  过期
    //   state.isBeOverdue=true
    // }else{
    //   //time不再当前时间前面 而在后面  没有过期
    //   state.isBeOverdue=false
    // }
  },
  //改变报名状态
  changeSign(state,flag){
    state.isSignUp=flag
  }

}
