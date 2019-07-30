export const state = () => ({
      tabId:'first',
      courseId:"",//全阶id
      singList:[],//所包含到单阶课程
  })
  
  export const mutations = {
    changeTabId(state,id){
      state.tabId=id
    },
    //改变课程列表
    changeSingList(state,list){
      state.singList=list
    },
    changeCourseId(state,id){
      state.courseId=id
    }


  }