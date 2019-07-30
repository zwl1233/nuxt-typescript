export const state = () => ({
    tabId: "1",//tab切换id
    page:1,//页码
  })
  
  export const mutations = {
      //切换tab
    changeTab(state,id){
      //  console.log(id,'id2615')
        state.tabId=id
        state.page=1
    },
    //改变页码
    changePage(state){ 
       state.page++   
    }
  }