import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
const loading=require("@/assets/img/loading-gif2.gif")
const error=require("@/assets/img/bg.png")

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error,
  loading,
  attempt: 1
})