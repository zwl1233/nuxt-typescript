export const state = () => ({
    tabId:1,//tab切换
    page:1,
    MycourseList:[],//课程list 
    // dancouselist:null,
    SingleList:[],//单阶数据
    FullList:[]//全阶数据
  }) 
  export const mutations = {
      //切换tab
    changeTab(state,id){ 
      console.log('id',id)
      state.tabId=id
      state.page=1 
    },
    //我的课程list
    MycourseList(state,list){
      console.log(list,'我是课程')
      state.MycourseList=list
      //处单阶全阶
      let SingleList = [] ;
      let FullList = []
      list.forEach((item,i)=>{
        if(!item.isFull){
          SingleList.push(item.userCourseSingleResponseVos[0])
        }else{
          FullList.push(item)
        }
      })
      state.SingleList = SingleList
      state.FullList = FullList
      console.log(state.SingleList,'单')
      console.log(state.FullList,'全')
    },
    changedanlist(state,list){
      state.dancouselist=list
    },
    changePage(state){ 
      //加载更多
      state.page++   
      console.log(state.page,'page')
    },
    addlist(state,newarr){
        newarr.forEach((item)=>{
                  state.MycourseList.push(item)
        })
    }
  }