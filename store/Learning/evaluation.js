export const state = () => ({
  courseType: 1, //课程类型  0:免费  1:单阶
  pageIndex: 1, //页码
  typeKey: 1, // 1: 最新  2:最高分
  data: {
    size: 10, //页条数
    total: 0, //总条数
    courseCommentResponseVos: [], //数据
    userCommentList: [], //我的评价
  },
  comment:"",//评价
})
export const mutations = {
  //设置属性
  setValue(state, {
    attrName,
    attrValue
  }) {
    state[attrName] = attrValue
  },
  //改变页码
  changePage(state) {
    let page = state.pageIndex
    page++
    state.pageIndex = page
  },
  createpage(state,page){
    state.pageIndex = page
  },
  //添加list
  addList(state,payload){
    console.log(payload)
    state.data.courseCommentResponseVos=state.data.courseCommentResponseVos.concat(payload.courseCommentResponseVos)
  }

}

