//弃用
export const state = () => ({
  courseinfo:{
    details: false,//学习详情
    BaskHomework:false,//晒作业
    GameDescription:false,//游戏闯关说明
    courseId:"",//课程id
    courseName:"",//课程名
    courseTemplate:3,//课程模板id
    courseTemplateClasshourCount:"",//单节课程课时数量（根据templateid获取课程模板信息给到前端）
    courseTemplatePicUri:"",//模版图片
    hasSignUp:"",//该课程当前用户是否已经报名（true：已报名，false：未报名），未报名用户不可以学习，只可查看
    isCollection:false,//是否收藏了
  }
    
  })
  
  export const mutations = {
    changeDetails(state,flag){//学习详情
      state.courseinfo.details = flag
    },
    changeBaskHomework(state,flag){//晒作业
      state.courseinfo.BaskHomework = flag
    },
    changeGameDescription(state,flag){//介绍
        console.log(flag)
        state.courseinfo.GameDescription = flag
    },
    changeCourseId(state,id){//改变课程id
      state.courseinfo.courseId=id
    },
    changeCourseName(state,name){
      state.courseinfo.courseName=name
    },
    changeCourseTemplate(state,num){
      state.courseinfo.courseTemplate=num
    },
    getCourseDetail(state,info){
      console.log(1111,info)
      state.courseinfo={...state.courseinfo,...info}
    }
  }