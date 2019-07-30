export const state = () => ({
    list:[],
    tabId:'create_time', //"create_time" 最新 "discussion_num" 最热
    page:1,//页码
    courseType:1,//课程类型 1:单阶
    postFlag:false,//帖子详情
    postId:"",//帖子id
}) 
export const mutations = {
  getlist(state,list){  //数据
    state.list = list
    console.log(list)
  },
  changetab(state,id) {//晒作业
    state.tabId = id
    state.page = 1
  },
  changepage(state){ //page
    state.page++
  },
  changepagesouse(state){  //key
    state.tabId = 'create_time'
    state.page = 1
  },
  changeFlag(state,index){
    console.log(index)
    state.list[index].flag=!state.list[index].flag
    console.log(state.list)
  },
  changePostFlag(state,flag){
    state.postFlag=flag
  },
  //修改帖子id
  changePostId(state,id){
    state.postId=id
  }
}