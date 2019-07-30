import {
  formData,
  initTime
} from "@/plugins/utils";
import { Message } from 'element-ui';
import message from "@/assets/message"
export const state = () => ({
  info: {
    birthday: "", //生日
    nickName:"",//用户昵称

    career: "", //职业
    careerId: "", //职业id
    education: "", //学历
    educationId: "", //学历id
    email: "", //邮箱
    headThumbnailUri: "", //头像缩略图
    headUri: "", //头像url

    industry: "", //行业描述
    industryId: "", //行业id

    msgNum:"",//未读消息

    bindingWechat:false,//用户是否绑定里微信


    password: "", //密码  格式:********
    phoneNum: "", //手机号 格式:"187****0540"
    provinceId: "", //省份id
    sex: "", //性别id   0 男   1 女
    sexy: "", //性别名称
    studentId: "", //学员id
    studyPeriod: "", //学习周期(秒)
    userName: "", //用户名
    industryAry: [], //行业下拉框
    careerAry: [], //职业下拉框
    educationAry: [], //学历下拉框
    location: "", //所在地描述
    countryAry: [], //国家数组
    cityId: "", //城市id
    provinceId: "", //省份id
    countryId: "", //国家id
    domestic: 2, //国内 1 国外 2
    abroadAry: [], //国外数组
    ProvinceAry: [], //国内省份
    cityAry: [], //国内城市
    visible:{
      localVisible: false,//所在地状态
      avatorVisible:false,//修改头像状态
    },
    // countryDescribe:"",//国家描述
    // provinceDescribe:"",//省份描述
    // cityDescribe:"",//城市描述

    // 最近一笔订单的信息:
    userOrderInfoResponseVo:{
    courseName:"",//商品名称
    courseType:"",//课程类型  1 单阶  2 全阶
    orderId:"",//订单id
    orderSn:"",//订单编号

    orderStatus:"",//订单状态   1: 未支付  2:已支付  3退款中  4已退款  5已取消

    orderType:"",//订单类型  1 付费 2折扣  3 免费  4赠课
    orderWay:"",//付款类型  1 自己下单  2增课  3 被赠课
    paymentType:"",//支付方式    1 微信  2支付宝  3银行转账 4 其它
    createTime:"",//下单时间
    closeTime:"",//取消时间
    finishTime:"",//付款时间
    }
    
  }
})

export const mutations = {
  //修改昵称
  changeNickName(state,name){
    console.log(name,12212)
    state.info.nickName=name
  },

  //获取个人信息
  getInfo(state, data) {
    state.info = { ...state.info,
      ...data
    }
    //处理生日
    state.info.birthday = formData(state.info.birthday, "utc")

    if(state.info.userOrderInfoResponseVo){
          //处理下单时间
    state.info.userOrderInfoResponseVo.createTime=formData(state.info.userOrderInfoResponseVo.createTime,"utc","add")

    //处理取消时间
    state.info.userOrderInfoResponseVo.closeTime=formData(state.info.userOrderInfoResponseVo.closeTime,"utc","add")

    //处理付款时间
    state.info.userOrderInfoResponseVo.finishTime=formData(state.info.userOrderInfoResponseVo.finishTime,"utc","add")
   
    //处理课程类型 1 单阶  2 全阶
    state.info.userOrderInfoResponseVo.courseType=["","单阶","全阶"][state.info.userOrderInfoResponseVo.courseType]

    //处理订单状态   1: 未支付  2:已支付  3退款中  4已退款  5已取消
    state.info.userOrderInfoResponseVo.orderStatus=["","未支付","已支付","退款中","已退款","已取消"][state.info.userOrderInfoResponseVo.orderStatus]

    //处理订单类型  1 付费 2 折扣  3 免费  4 赠课
    state.info.userOrderInfoResponseVo.orderType=["","付费","折扣","免费","赠课"][state.info.userOrderInfoResponseVo.orderType]

    //处理付款类型  1 自己下单  2 赠课  3 被赠课
    state.info.userOrderInfoResponseVo.orderWay=["","自己下单","赠课","被赠课"][state.info.userOrderInfoResponseVo.orderWay]
   
    //处理付款类型  1 微信  2 支付宝  3 银行转账 4 其它
    state.info.userOrderInfoResponseVo.paymentType=["","微信","支付宝","银行转账","其它"][state.info.userOrderInfoResponseVo.paymentType]

    }else{
      state.info.userOrderInfoResponseVo={
        courseName:"",//商品名称
        courseType:"",//课程类型  1 单阶  2 全阶
        orderId:"",//订单id
        orderSn:"",//订单编号
    
        orderStatus:"",//订单状态   1: 未支付  2:已支付  3退款中  4已退款  5已取消
    
        orderType:"",//订单类型  1 付费 2折扣  3 免费  4赠课
        orderWay:"",//付款类型  1 自己下单  2增课  3 被赠课
        paymentType:"",//支付方式    1 微信  2支付宝  3银行转账 4 其它
        createTime:"",//下单时间
        closeTime:"",//取消时间
        finishTime:"",//付款时间

      }
    }


    //处理学习周期
    state.info.studyPeriod = initTime(state.info.studyPeriod)
    const {
      countryId,
      provinceId,
      cityId
    } = state.info
    //处理所在地id
    state.info.countryId=state.info.countryId?state.info.countryId.toString():""
    state.info.provinceId=state.info.provinceId?state.info.provinceId.toString():""
    state.info.cityId=state.info.cityId?state.info.cityId.toString():""
    if(state.info.countryId=="1"){
      //国内
      state.info.domestic='1'
    }else{
      //国外
      state.info.domestic='2'
    }
  },
  //性别
  sexOnChange(state, value) {
    console.log(state)
    console.log(value)
    state.info.sex = value
  },
  //生日
  birthdayOnChange(state, moment) {
    console.log("生日", formData(moment))
    state.info.birthday = formData(moment)

  },
  //获取下拉选择框
  selectAry(state, {
    attrName,
    attrValue
  }) {

      state.info[attrName] = attrValue
    // state.info[attrName] = attrValue
  },
  //所在行业
  industryOnChange(state, id) {
    state.info.industryId = id
    let ary = state.info.industryAry
    ary.forEach((item) => {
      if (item.enum_item_key == id) {
        state.info.industry = item.enum_item_name
      }
    })
  },
  //职业
  careerOnChange(state, id) {
    console.log("职业",id)
    state.info.careerId = id
    let ary = state.info.careerAry
    ary.forEach((item) => {
      if (item.enum_item_key == id) {
        state.info.career = item.enum_item_name
      }
    })

  },
  //学历
  educationOnChange(state, id) {
    state.info.educationId = id
    let ary = state.info.educationAry
    ary.forEach((item) => {
      if (item.enum_item_key == id) {
        state.info.education = item.enum_item_name
      }
    })

  },
  //所在地
  locationOnchange(state, val) {
    console.log("所在地", val)
  },
  //国内 国外
  domesticOnChange(state, val) {
    console.log(val)
    state.info.domestic = val
  },
  //选择所在地
  chooseLocation(state,value){
    const {province,city}=value
    state.info.provinceId=province.value
    state.info.cityId=city.value
    state.info.location="中国"+province.label+city.label
    state.info.visible.localVisible=false
  },
  //国外选择
  chooseAbroad(state,val){
    console.log(val)
    state.info.location=val.label
    state.info.countryId=val.value
    state.info.provinceId=""
    state.info.cityAry=""
    state.info.visible.localVisible=false
  },
  //所在地获取焦点
  localFocus(state,e){
    console.log(1)
    state.info.visible.localVisible=true
  },

  //改变visible
  closeCascader(state, {attrName,attrValue }){
    state.info.visible[attrName] = attrValue
  },
  //改变为读消息数
  changeMsgNum(state,num){
    console.log(num)
    state.info.msgNum=Number(state.msgNum)-Number(num)
  },
  //清除个人信息
  clearInfo(state){
    state.info= {
      birthday: "", //生日
      nickName:"",//用户昵称
  
      career: "", //职业
      careerId: "", //职业id
      education: "", //学历
      educationId: "", //学历id
      email: "", //邮箱
      headThumbnailUri: "", //头像缩略图
      headUri: "", //头像url
  
      industry: "", //行业描述
      industryId: "", //行业id
  
      msgNum:"",//未读消息
  
  
      password: "", //密码  格式:********
      phoneNum: "", //手机号 格式:"187****0540"
      provinceId: "", //省份id
      sex: "", //性别id   0 男   1 女
      sexy: "", //性别名称
      studentId: "", //学员id
      studyPeriod: "", //学习周期(秒)
      userName: "", //用户名
      industryAry: [], //行业下拉框
      careerAry: [], //职业下拉框
      educationAry: [], //学历下拉框
      location: "", //所在地描述
      countryAry: [], //国家数组
      cityId: "", //城市id
      provinceId: "", //省份id
      countryId: "", //国家id
      domestic: 2, //国内 1 国外 2
      abroadAry: [], //国外数组
      ProvinceAry: [], //国内省份
      cityAry: [], //国内城市
      visible:{
        localVisible: false,//所在地状态
        avatorVisible:false,//修改头像状态
      },

      // countryDescribe:"",//国家描述
      // provinceDescribe:"",//省份描述
      // cityDescribe:"",//城市描述
      userOrderInfoResponseVo:{
        courseName:"",//商品名称
        courseType:"",//课程类型  1 单阶  2 全阶
        orderId:"",//订单id
        orderSn:"",//订单编号
    
        orderStatus:"",//订单状态   1: 未支付  2:已支付  3退款中  4已退款  5已取消
    
        orderType:"",//订单类型  1 付费 2折扣  3 免费  4赠课
        orderWay:"",//付款类型  1 自己下单  2增课  3 被赠课
        paymentType:"",//支付方式    1 微信  2支付宝  3银行转账 4 其它
        createTime:"",//下单时间
        closeTime:"",//取消时间
        finishTime:"",//付款时间
        }
    }
  },

  //解除微信绑定
  untiedWechat(state,flag){
    state.info.bindingWechat=flag
  }


}

export const actions = {
  //获取国家
  getCountry({
    commit,
    state
  }) {
    //获取国家
    this.$axios.post("/utility/searchcountry").then(res => {
      if (res.code == 0) {
        res.result = res.result.map(item => {
          item.label = item.country_name;
          item.value = item.country_id.toString();
          //国外只需要选择国家
          delete item.country_name;
          delete item.country_id;
          return item;
        });
        console.log(res.result);
        //国外
         commit("selectAry",{attrName:"abroadAry",attrValue:res.result.slice(1)})
      }
    })
    //获取国内省份
    this.$axios.post("/utility/searchprovince",{
      id:1
    }).then((res)=>{
      if(res.code==0){
        console.log(res.result)
        res.result = res.result.map((item) => {
          item.label = item.provincial;
          item.value = item.id.toString();
          delete item.provincial;
          delete item.id;
          return item;
        })
        commit("selectAry",{attrName:"ProvinceAry",attrValue:res.result})
      }
    })
    //获取传入的省份id
    console.log("身份",state.info.provinceId)
    if(state.info.provinceId){
      this.$axios.post("/utility/searchcity",{
        id:state.info.provinceId
      }).then((res)=>{
        if(res.code==0){
          res.result = res.result.map((item) => {
            item.label = item.city;
            item.value = item.id.toString();
            delete item.city;
            delete item.id;
            return item;
          })
          console.log(res.result)
          commit("selectAry",{attrName:"cityAry",attrValue:res.result})
        }
      })
    }
  },
  //所在地tab切换
  handleChange({commit,state},tab){
    console.log(tab.name)
    this.$axios.post("/utility/searchcity",{
      id:tab.name
    }).then((res)=>{
      if(res.code==0){
        res.result = res.result.map((item) => {
          item.label = item.city;
          item.value = item.id.toString();
          delete item.city;
          delete item.id;
          return item;
        })
        console.log(res.result)
        // commit("selectAry",{attrName:"provinceId",attrValue:tab.name})
        commit("selectAry",{attrName:"cityAry",attrValue:res.result})
      }
    })
  },
  //保存
  saveInfo({commit,state}){
    const {nickName,birthday,career,careerId,cityId,countryId,education,educationId,headThumbnailUri,headUri,industry,industryId,provinceId,sex }=state.info
    console.log('保存')
    console.log(state)
    this.$axios.post("/user/updateuserinfo",{
      token:"",
      nickName,
      birthday,
      career,
      careerId,
      cityId,
      countryId,
      education,
      educationId,
      headThumbnailUri,
      headUri,
      industry,
      industryId,
      provinceId,
      sex,
    }).then((res)=>{
      if(res.code==0){
        console.log(121,this)
        this.$axios.post("/user/getuserinfo", {
          token: ""
        }).then((data)=>{
            if(data.code==0){
              console.log(111,this)
              Message({
                duration:5000,
                message: message.saveSucess,
                type: 'success'
              });
              commit("getInfo",data.result)
            }else{
              Message({
                duration:5000,
                message: data.msg,
                type: 'warning'
              });
            }
        })
      }
    })

  }
}
