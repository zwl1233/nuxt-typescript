export const state = () => ({
    options:{
        video:{
            // url:"",
            pic:""
        }
    }
  })
  export const mutations = {
  //视频路径
//   changeVideoUrl(state,url){
//       state.options.video.url=url
//   },
  //封面图
  changeVideoPic(state,src){
      state.options.video.pic=src
  },
  changeVideo(state,obj){
      console.log(123,obj)
      state.options=obj
  }
  }