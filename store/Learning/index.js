export const state = () => ({
      tabId:"first",
      courseId:0,//课程id
      courseName:"",//课程名
  })
  export const mutations = {
    changeTabId(state,id){
      console.log(state)
      state.homework.postFlag=false
      state.tabId=id
    },
    changeCourseId(state,id){
      console.log("课程id",id)
      state.courseId=id
    },
    changeCourseName(state,name){
      console.log("课程名",name)
      state.courseName=name
    }
  }