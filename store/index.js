export const strict = false
export const state = () => ({
  isLogin: false
})

export const mutations = {
  logIn(state) {
    state.isLogin=true
  },
  logOut(state){
    state.isLogin=false
  }
}