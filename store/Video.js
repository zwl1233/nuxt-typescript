export const state = () => ({
    id: '',
    list:{
      discussionId:"",//帖子id
      courseVideoUri:"",//视频链接
      isLiked:false,//是否点赞
      likeNum:null
    },//视频详情
  })
  export const mutations = {
    //课程id
    changeID(state,ids) {
      state.id=ids
      console.log(444,state.id)
    },
    //帖子id
    changeDiscussionId(state,id){
      state.list.discussionId=id
    },
    changeList(state,list) {
        state.list=list
      },
      changeCourseVideoUri(state,url){
        state.list.courseVideoUri=url
      },
      changeParise(state,flag){
        state.list.isLiked=flag
      },
      changeParisenum(state,num){
         state.list.likeNum=num
        console.log(num,'看好啊了111111111111111')
      }
  }