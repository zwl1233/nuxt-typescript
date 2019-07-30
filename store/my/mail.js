export const state = () => ({
  list: [
    // {
    //   lastSendMessage:"",//最后发消息内容
    //   lastSendTime:"",//最后发消息日期
    //   senderHeadUri:"",//发件人头像图片地址	
    //   senderId:"",//发件人类型对应的Id
    //   senderType:"",//发件人类型（1：学员，2，公告，教师通知3：通知 系统消息）
    //   unReadMessageCount:"",//未读消息数量
    // },
  ], //消息列表
  tabId:"",//tabId
})
export const mutations = {
  changeList(state, list) {
    state.list = list
  },
  changeTabId(state,id){
    state.tabId=id
  },
  //清空数据
  clearData(state){
      state.list=[]
      state.tabId=""

  }

}
