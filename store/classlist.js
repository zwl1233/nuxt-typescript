export const state = () => ({
    tabId: "1",//tab切换id    1：书法课 2：读书课 3：写作课 4：养生课）
    page:1,//页码
    isGive:false,//判断是否是赠课
    istype:true,//判断是单阶还是全阶
    orderid:null,//订单id
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
    },
    //判断是否是赠课
    changeisGive(state,flag){
      state.isGive=flag
    },
    //判断是单阶还是全阶
    changeistype(state,flag){
      state.istype=flag
    },
    //订单id
    changeorderid(state,id){
      state.orderid=id
    },
  }