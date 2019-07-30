<template>
    <section>   
        <s v-if="special">{{this.str}}元</s>   
        <span v-if="!special">{{this.str}}元</span>
    </section>
</template>

<script>
export default {
    data() {
        return {
            str:''
        }
    },
    props:{
        number:{   //价格
            type:null
        },
        special:{  //特殊价格  -s原学费
            type:null
        },
        hasSymbol:{//是否需要符号 ¥
            type:null,
            default:()=>'true'
        },
        isFloor:{//是否需要向下取整
            type:null,
            default:()=>'false'
        },
        isFixed:{//是否保留两位小数
            type:null,
            default:'true'
        }
    },
    mounted() {
        let str=null
        if(this.isFloor=='true'){//是否需要向下取整
            str=Math.floor(this.number)
        }else{
            str=this.number
        }
        //是否需要保留两位小数
        // if(this.isFixed=='true'){
            // str=Number(str).toFixed(2)
        // }
        //是否需要符号
        if(this.hasSymbol=='true'){
            str=str
        }
        this.str=str
        
        // this.str =   this.number %1 == 0 ? this.number +'.00':Math.floor(this.number * 100) / 100    //小数点后两位
    },
}

</script>

<style>

</style>
