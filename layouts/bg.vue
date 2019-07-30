<template>
  <el-container class="app-change-bg">
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

<style lang="less">
    .app-change-bg{
        background: rgb(248, 243, 238);
    }
</style>
