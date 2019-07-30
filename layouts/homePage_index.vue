<template>
  <div>
    <el-header>
      <Header></Header>
    </el-header>
    <nuxt/>
    <el-footer style="height:350px;min-width:1366px">
      <Footer></Footer>
    </el-footer>
  </div>
</template>
<script>
import Footer from '@/components/tonghui/Footer'
import Header from '@/components/tonghui/Header'
export default {
     components:{
    Header,
    Footer
  }
}
</script>

