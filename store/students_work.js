export const state = () => ({
    list:[]
  })
  export const mutations = {
    changeList(state,list) {
        state.list=list
        console.log(state.list,'我的同学作品哦')
      }
  }