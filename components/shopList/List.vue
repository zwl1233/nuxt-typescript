<template>
    <section>
            <el-col :span="6" v-for="(item,index) in list" :key="item.commodityId" :class="{appnomborder:(index+1)%4==0}">
                <!-- {{(index+1)%4==0}} -->
                <img   v-lazy='item.commodityCoverUrl' alt=""   style="width:231px;height:231px;">
                    <div class="buy-model"  style="cursor:pointer" > 
                        <p class="fz16 cf" style="letter-spacing:1px">{{item.commodityName}}</p>
                        <!-- item.commodityPrice -->
                        <p class="fz14 cf">
                            <price :number="item.commodityPrice" style="display:inline-block;background: rgba(0,0,0,0);"/>
                            </p>
                        <a :href="item.commodityUrl" target="view_window">
                        <button class="fz16 btn-buy">购买</button>
                        </a>
                    </div>
            </el-col>
    </section>
</template>

<script>
import price from '@/components/price'  //价格小数点
export default {
    data () {
        return {
            list:[]
        }
    },
    components:{
        price
    },
    props:{
        datalist:{
            type:null
        }
    },
    methods: {
        auto(){
            return '99999'
        }
    },
    mounted () {
        this.list=this.datalist
    },
    watch: {
       datalist(newVal,oldVal){
           console.log(newVal)
           this.list=newVal
       } ,
       deep:true,
    }

}
</script>

<style >
 .appnomborder{
     margin-right:0px !important;
 }
</style>
