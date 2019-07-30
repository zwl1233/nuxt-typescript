<template>
  <section class="Personalinformation app-Personalinformation" style="margin-top: -55px;">
    <!-- <blockquote class="cb49" style="paddingLeft:65px">
      个人信息
      <i class="el-icon-date iconfont-shufa"></i>
    </blockquote>-->

    <div class="overflowDefine define-tabsClass_List define-tabsOrder_list">
      <div class="PersonalInformation-head">
        <div class="app-personalInfo-father">
          <div class="app-personalInfo-pic">
            <div
              class="app-personalInfo-pic-mask"
              @click="closeCascader({attrName:'avatorVisible',attrValue:true})"
            >修改头像</div>
            <img v-lazy="info.headUri" :key="info.headUri" alt>
          </div>
          <span class="fz14 app-change-name"  v-if="!updataName">{{info.nickName}}</span>
           <span
           class="fz14 app-change-namex"
            @click="updataName=true"
            v-if="!updataName"
          >修改昵称</span>
           <span v-if="updataName"  class="app-change-nameinput fz14"  >
            <el-input
               class="fz14"
               style="border-color:#b49876"
              :value="info.nickName"
              ref="nickInput"
              @blur="updataNickName"
              v-focus
              @keyup.enter.native="updataNickName"
            ></el-input>
          </span> 
        </div>
        <div class="mt-10 app-personalInfo-sex">
          <img
            v-if="info.sex=='0'"
            :src="require('@/assets/img/gender_boy.png')"
            class="ovflleft"
            alt
          >
          <img
            v-else-if="info.sex=='1'"
            :src="require('@/assets/img/gender_girl.png')"
            class="ovflleft"
            alt
          >
        </div>
      </div>
      <!-- <div class="mt-15">
              <img :src="require('@/assets/img/gender_girl.png')" alt="">
      </div>-->
      <div class="PersonalInformation-content" style="margin-top: 35px;">
        <h3 class="fz14 fzGB1-0" style="font-weight:normal;">基本信息</h3>
        <div class="PersonalInformation-item fonH">
          <div class="input-border" style="margin-bottom:0" v-if="info.studyPeriod">
            <label>学习时长</label>
            <span class="fz14 c3 bold">{{info.studyPeriod}}</span>
          </div>
          <div class="input-border" style="margin-bottom: 8px;">
            <label>性别</label>
            <div>
              <el-radio-group
                v-model="info.sex"
                @change="sexOnChange"
                class="app-radio-group-color-change"
              >
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="input-border app-Personalinformation-birthday">
            <label>生日</label>
            <div class="app-anse">
              <el-date-picker
                style="width:310px;"
                v-model="info.birthday"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd日"
                @change="birthdayOnChange"
              ></el-date-picker>
            </div>
          </div>
        </div>

        <h3 class="fz14 fzGB1-0" style="font-weight:normal;margin-top:50px">更多</h3>
        <div class="PersonalInformation-item">
          <div class="input-border">
            <label>所在行业</label>
            <div>
              <el-select v-model="info.industry" placeholder="请选择" @change="industryOnChange">
                <el-option
                  v-for="item in info.industryAry"
                  :key="item.enum_item_key"
                  :label="item.enum_item_name"
                  :value="item.enum_item_key"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="input-border">
            <label>职业</label>
            <div>
              <el-select v-model="info.career" placeholder="请选择" @change="careerOnChange">
                <el-option
                  v-for="item in info.careerAry"
                  :key="item.enum_item_key"
                  :label="item.enum_item_name"
                  :value="item.enum_item_key"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="input-border">
            <label>学历</label>
            <div>
              <el-select v-model="info.education" placeholder="请选择" @change="educationOnChange">
                <el-option
                  v-for="item in info.educationAry"
                  :key="item.enum_item_key"
                  :label="item.enum_item_name"
                  :value="item.enum_item_key"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="input-border">
            <label class="app-change-location-require">所在地</label>
            <!-- <div> -->
            <!-- <el-input
                placeholder="请输入内容"
                v-model="info.location"
                @focus="localFocus"
            ></el-input>-->
            <Cascader
              :countryId="info.countryId"
              :provinceId="info.provinceId"
              :cityId="info.cityId"
              :location="info.location"
              @getLocation="getLocation"
            ></Cascader>

            <!-- <el-cascader
                :options="info.countryAry"
                @change="locationOnchange"
                v-model="info.locationAry"
            ></el-cascader>-->
            <!-- </div> -->
          </div>
          <!-- <div class="input-border" id="app-input-Cascader" v-if="false">
            <div class="home-select">
              <div class="home-head">
                <el-radio-group v-model="info.domestic" @change="domesticOnChange">
                  <el-radio :label="1">国内</el-radio>
                  <el-radio :label="2">国外</el-radio>
                </el-radio-group>
              </div>
              <div class="home-content info-Cascader" v-if="info.domestic=='1'">
                <el-tabs
                  :tab-position="homeSelect"
                  style="height: 200px;"
                  v-model="info.provinceId"
                  @tab-click="handleChange"
                >
                  <el-tab-pane
                    v-for="item in info.ProvinceAry"
                    :key="item.value"
                    :label="item.label"
                    :name="item.value"
                  >
                    <ul class="fz14 c7271 info-Cascader-list">
                      <li
                        v-for="ite in info.cityAry"
                        :key="ite.value"
                        @click="chooseLocation({province:item,city:ite})"
                      >{{ite.label}}</li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="home-content info-Cascader" v-else-if="info.domestic=='2'">
                <ul class="abroad-list">
                  <li
                    v-for="item in info.abroadAry"
                    :key="item.value"
                    @click="chooseAbroad(item)"
                  >{{item.label}}</li>
                </ul>
              </div>

              <div
                class="app-input-Cascader-foot"
                @click="closeCascader({attrName:'localVisible',attrValue:false})"
              >关闭</div>
            </div>
          </div> -->
        </div>
        <div class="user-item text-center">
          <button
            class="btn-login app-btn-save"
            @click="saveInfo"
            style="margin-left:121px;margin-bottom: 51px;"
          >保存</button>
        </div>
      </div>
    </div>
    <ImportCorp v-if="info.visible.avatorVisible" :visible="info.visible.avatorVisible"/>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { initTime, formData } from "@/plugins/utils";
import { getBLen } from "@/plugins/vaildRule";
import ImportCorp from "@/components/importCorp";
import Cascader from "@/components/Cascader";
export default {
  data() {
    return {
      homeSelect: "left",
      updataName: false, //是否修改昵称
      autofocus: true
    };
  },
  async created() {
    console.log("个人信息初始化");
    //个人信息
    let data = await this.$axios.post("/user/getuserinfo", {
      token: ""
    });
    if (data.code == 0) {
      this.getInfo(data.result);
    }
    //获取枚举接口
    this.getIndustry();
    this.getCareer();
    this.getEducation();
    //获取对应国家 省份 城市
    // this.getCountry();
  },
  mounted() {
    console.log(this, this.$refs.nickInput, 111);
  },
  components: {
    ImportCorp,
    Cascader
  },

  methods: {
    //修改昵称
    updataNickName(e) {
      if (e.target.value == "") {
        this.updataName = false;
      } else {
        console.log(e.target.value);
        if (getBLen(e.target.value) > 32 || getBLen(e.target.value) < 2) {
          this.$message({
            duration: 5000,
            message: this.$selfMsg.nickName,
            type: "warning"
          });
        }else{
        this.changeNickName(e.target.value);
        }
        this.updataName = false;
      }
    },
    initTime,
    formData,
    ...mapMutations({
      getInfo: "my/info/getInfo",
      sexOnChange: "my/info/sexOnChange",
      birthdayOnChange: "my/info/birthdayOnChange",
      selectAry: "my/info/selectAry",
      industryOnChange: "my/info/industryOnChange",
      careerOnChange: "my/info/careerOnChange",
      educationOnChange: "my/info/educationOnChange",
      locationOnchange: "my/info/locationOnchange",
      domesticOnChange: "my/info/domesticOnChange",
      chooseLocation: "my/info/chooseLocation",
      chooseAbroad: "my/info/chooseAbroad",
      localFocus: "my/info/localFocus",
      localBlur: "my/info/localBlur",
      closeCascader: "my/info/closeCascader",
      changeNickName: "my/info/changeNickName"
    }),
    ...mapActions({
      getCountry: "my/info/getCountry",
      handleChange: "my/info/handleChange",
      saveInfo: "my/info/saveInfo"
    }),
    //获取所在地信息
    getLocation({ countryId, provinceId, cityId, location }) {
      console.log(countryId, provinceId, cityId, location);
      this.selectAry({ attrName: "countryId", attrValue: countryId });
      this.selectAry({ attrName: "provinceId", attrValue: provinceId });
      this.selectAry({ attrName: "cityId", attrValue: cityId });
      this.selectAry({ attrName: "location", attrValue: location });
    },

    //获取所在行业
    getIndustry() {
      this.$axios.post("/utility/enumlist", { enumKey: 15 }).then(res => {
        if (res.code == 0) {
          res.result = res.result.filter(item => {
            return item.enum_item_key != "-1";
          });
          this.selectAry({ attrName: "industryAry", attrValue: res.result });
        }
      });
    },
    //获取职业
    getCareer() {
      this.$axios.post("/utility/enumlist", { enumKey: 16 }).then(res => {
        if (res.code == 0) {
          console.log(123, res.result);
          res.result = res.result.filter(item => {
            return item.enum_item_key != "-1";
          });
          this.selectAry({ attrName: "careerAry", attrValue: res.result });
        }
      });
    },
    //获取学历
    getEducation() {
      this.$axios.post("/utility/enumlist", { enumKey: 17 }).then(res => {
        if (res.code == 0) {
          res.result = res.result.filter(item => {
            return item.enum_item_key != "-1";
          });
          this.selectAry({ attrName: "educationAry", attrValue: res.result });
        }
      });
    }
  },
  computed: {
    ...mapState({
      info: state => state.my.info.info
    })
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.children[0].focus();
      }
    }
  }
};
</script>

<style lang="less">
.Personalinformation{
  .app-personalInfo-sex{
    padding-left:375px;
  }
.app-personalInfo-father {
  // background: red;
  position: relative;
  // margin-left: 235px;
  .app-change-name {
      position: absolute;
      top:25px;
      left:450px;
      width: 203px;
      height:16px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  .app-change-nameinput {
    position: absolute;
    top:25px;
    left:450px;
    .el-input__inner{
      border-color: #b49876;
      outline:none;
    }
  }
  .app-change-namex {
        position: absolute;
        top:65px;
        left:450px;
        cursor:pointer;
        color: #b49876;
  }
}
}
.app-anse {
  .el-input__inner {
    color: #b49876;
  }
}
.app-Personalinformation {
  .app-Personalinformation-birthday {
    .app-anse{
      .el-input__inner{
        padding-left: 15px!important;
      }
    }
    .el-input__icon {
      display: none !important;
    }
  }
}
.Personalinformation {
  .PersonalInformation-head div .ovflleft {
    padding-right: 0px !important;
    // margin-left: -70px !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #b49876 !important;
    background: #b49876 !important;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #b49876 !important;
  }
}

.app-personalInfo-pic {
  margin-left: 340px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  position: relative;
  // margin-left: -270px;
  // margin-right: 50px;
  &:hover .app-personalInfo-pic-mask {
    display: flex;
  }
  .app-personalInfo-pic-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
  }
  img {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
  }
}
.app-btn-save {
  cursor: pointer;
}

// #app-input-Cascader {
//   padding-left: 120px;
//   box-sizing: border-box;
//   .home-select {
//     padding: 0;
//     height: 280px;
//     .home-head {
//       height: 40px;
//       line-height: 40px;
//       padding-left: 20px;
//       box-sizing: border-box;
//     }
//     .home-content {
//       margin-top: 0;
//     }
//     .info-Cascader {
//       .el-tabs__nav {
//         height: 200px !important;
//         overflow-x: hidden;
//         overflow-y: auto;
//         .el-tabs__item {
//           width: auto;
//           min-width: 98px;
//           text-align: center;
//         }
//       }
//       .info-Cascader-list {
//         max-width: 120px;
//         height: 200px;
//         overflow: auto;
//         & > li {
//           cursor: pointer;
//           float: none;
//         }
//       }
//       /* 国外 */
//       .abroad-list {
//         width: 100%;
//         height: 200px;
//         overflow: auto;
//         padding-left: 20px;
//         box-sizing: border-box;
//         & > li {
//           margin: 10px 0;
//           cursor: pointer;
//           font-size: 14px;
//           color: #333;
//         }
//       }
//     }
//     .app-input-Cascader-foot {
//       height: 40px;
//       line-height: 40px;
//       font-size: 14px;
//       width: 100%;
//       color: #333;
//       text-align: right;
//       padding-right: 20px;
//       cursor: pointer;
//       box-sizing: border-box;
//     }
//   }
// }
</style>
