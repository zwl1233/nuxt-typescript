export const state = () => ({
  page: 1,//页码
  pageach: 1,
  pagecoum: 1,
  pageFree:1
})

export const mutations = {
  //改变课程页码
  changePage(state) {
    state.page++
  },
  changePageRes(state) {
    state.page = 1
  },
  //改变写字页码
  changePageach(state) {
    state.pageach++
  },
  changePageachRes(state) {
    state.pageach = 1
  },
  //改变商品页码
  changepagecoum(state) {
    state.pagecoum++
  },
  changepagecoumRes(state) {
    state.pagecoum = 1
  },
  //改变视频页码
  changepageFree(state){
    state.pageFree++
  },
  changepageZero(state){
    state.pageFree=1
  }
}