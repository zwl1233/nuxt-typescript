<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main style="min-height:600px"  class="app-change-body">
      <nuxt/>
    </el-main>        
    <el-footer style="height:350px">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>
<script>
import Footer from '@/components/tonghui/Footer'
import Header from '@/components/tonghui/Header'
export default {
  components:{
    Header,
    Footer
  }
};
</script>

<style>
.el-container{
  position: relative;
}

html {
  /* font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif; */
    font-family: FZLTHJW--GB1-0;
  /* font-size: 16px; */
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  width:100%;
}
ul,li{
  list-style: none
}
.el-header{
  width: 100%;
  min-width: 1366px;
  padding: 0;
  position: absolute;
  top: 0;
  z-index: 10000;
}
.el-main{
  padding: 0;
  width: 100%;
  margin-top: 75px;
  overflow: hidden;

}
.el-footer{
  width: 100%;
  padding: 0;
  height: auto;
  background: #F1EDEB;
  /* font-size:  */
  color:rgba(0,0,0,1);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
