export const state = () => ({
    tabId:0,//tab切换
    gethomeworkList:{},//作业list
    typeKey:1,
    page:1
  })
  export const mutations = {
      //切换tab
    changeTab(state,id){
      console.log('id',id)
    //  console.log("走",tab,event)
      state.tabId=id
      state.page = 1
    },
    changetypeKey(state,key){//订阅未订阅
      state.typeKey = key
    },
    changePage(state){ 
      //加载更多
      state.page++   
      console.log(state.page,'page')
    },
    //获取作业list
    gethomeworkList(state,list){
      console.log(list,'我是作业')
      list = list.map((item, index) => {
        if (
          item.userHomeWorkCommnetResponseVos &&
          item.userHomeWorkCommnetResponseVos.length > 0
        ) {
          item.userHomeWorkCommnetResponseVos = item.userHomeWorkCommnetResponseVos.map(
            ite => {
              console.log(ite);
              ite.replyFlag = false;
              return ite;
            }
          );
        }
        return item;
      });
      console.log(list)
      state.gethomeworkList=list
    },
    addlist(state,newarr){
      newarr.forEach((item)=>{
        if (
          item.userHomeWorkCommnetResponseVos &&
          item.userHomeWorkCommnetResponseVos.length > 0
        ) {
          item.userHomeWorkCommnetResponseVos = item.userHomeWorkCommnetResponseVos.map(
            ite => {
              console.log(ite);
              ite.replyFlag = false;
              return ite;
            }
          );
        }
              state.gethomeworkList.push(item)
      })
  }
  }