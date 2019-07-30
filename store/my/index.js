export const state = () => ({
    tabId:"0",//tab切换
    addtext:'我的课程',
    page:1
  }) 
  export const mutations = {
      //切换tab
   changeTabId(state,id){
       state.tabId=id
   },
    chanaddtext(state,text){
    state.addtext=text
    },
    changeindex(state,idx){
        state.page = idx
    }   
  }