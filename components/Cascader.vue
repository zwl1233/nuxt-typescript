<template>
  <div class="self-cascader">
    <div class="self-cascader-mask" @click="flag=false" v-if="flag"></div>
    <div>
      <el-input placeholder="请输入内容" v-model="location_self" @focus="flag=true" readonly></el-input>
    </div>
    <div class="input-border" id="app-input-Cascader" v-if="flag">
      <div class="home-select">
        <div class="home-head">
          <el-radio-group v-model="domestic" @change="chooseCountry">
            <el-radio :label="1">国内</el-radio>
            <el-radio :label="2">国外</el-radio>
          </el-radio-group>
        </div>
        <div class="home-content info-Cascader" v-if="domestic=='1'">
          <!--国内-->
          <el-tabs
            :tab-position="homeSelect"
            style="height: 200px;"
            v-model="province_id"
            @tab-click="handleChange"
          >
            <el-tab-pane
              v-for="item in provinceAry"
              :key="item.value"
              :label="item.label"
              :name="item.value"
            >
              <ul class="fz14 c7271 info-Cascader-list" v-if="cityAry.length>0">
                <li
                  v-for="ite in cityAry"
                  :key="ite.value"
                  :class="[ite.value==city_id?'selected':'']"
                  @click="chooseCity(item,ite)"
                >{{ite.label}}</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="home-content info-Cascader" v-else-if="domestic!='1'">
          <!--国外-->
          <ul class="abroad-list">
            <li
              v-for="item in countryAry"
              :key="item.value"
              :class="[item.value==country_id?'selected':'']"
              @click="handleCountry(item)"
            >{{item.label}}</li>
          </ul>
        </div>

        <div class="app-input-Cascader-foot" @click="close">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeSelect: "left",
      countryAry: [], //国家
      provinceAry: [], //省份
      domestic: 1, //国内 1 国外 2
      cityAry: [], //城市
      country_id: "",
      province_id: "",
      city_id: "",
      location_self: "",
      flag: false, //弹出层状态
    };
  },
  created() {
    this.getCountry();
    this.getProvince();
    this.country_id = this.countryId||"1";
    this.province_id = this.provinceId||"1";
    this.city_id = this.cityId||"1";
    this.location_self = this.location||"";
    if (this.country_id== "1") {
      this.domestic = 1;
    } else {
      this.domestic = 2;
    }
    if (this.country_id == "1") {
      this.getCity(this.province_id);
    }
  },
  props: ["countryId", "provinceId", "cityId", "location", "getLocation"],
  methods: {
    getCountry() {
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
          this.countryAry = res.result.slice(1);
        }
      });
    },
    getProvince() {
      this.$axios
        .post("/utility/searchprovince", {
          id: 1
        })
        .then(res => {
          if (res.code == 0) {
            res.result = res.result.map(item => {
              item.label = item.provincial;
              item.value = item.id.toString();
              delete item.provincial;
              delete item.id;
              return item;
            });
          }
          this.provinceAry = res.result;
        });
    },
    getCity(id) {
      this.$axios
        .post("/utility/searchcity", {
          id
        })
        .then(res => {
          if (res.code == 0) {
            res.result = res.result.map(item => {
              item.label = item.city;
              item.value = item.id.toString();
              delete item.city;
              delete item.id;
              return item;
            });
            this.cityAry = res.result;
          }
        });
    },
    handleChange(tab) {
      console.log(tab.name);
      this.province_id = tab.name;
      this.getCity(tab.name);
    },
    //选择国内 国外
    chooseCountry(val) {
      console.log(val);
      this.domestic = val;
    },
    //选择国家
    handleCountry(value) {

      console.log(222,value);
      this.location_self = value.label;
      this.country_id = value.value;
      this.province_id = "";
      this.city_id = "";
      this.close();
      const { country_id, province_id, city_id, location_self } = this;
      this.$emit("getLocation", {
        countryId: country_id,
        provinceId: province_id,
        cityId: city_id,
        location: location_self
      });
    },
    //选择城市
    chooseCity(provice, city) {
      this.country_id = "1";
      this.province_id = provice.value;
      this.city_id = city.value;
      this.location_self = "中国" + provice.label + city.label;
      this.close();
      const { country_id, province_id, city_id, location_self } = this;
      // this.getLocation({countryId:country_id,provinceId:province_id,cityId:city_id,location:location_self})
      this.$emit("getLocation", {
        countryId: country_id,
        provinceId: province_id,
        cityId: city_id,
        location: location_self
      });
    },
    //关闭
    close() {
      this.flag = false;
    },
     click(e) {
      e = e || window.event;
      var elem = e.target || e.srcElement;
      while (elem) {
        if (elem.className && elem.className.indexOf("self-cascader") > -1) {
          return;
        }
        elem = elem.parentNode;
      }
      this.flag = false;
    },
  },
  watch: {
    countryId(newVal, oldVal) {
      console.log(newVal, "国家");
      this.country_id = newVal;
      if (newVal == "1") {
        this.domestic = 1;
      } else {
        this.domestic = 2;
      }
    },
    provinceId(newVal, oldVal) {
      console.log(newVal, oldVal, "省份");
      this.province_id = newVal;
      this.getCity(newVal);
    },
    cityId(newVal, oldVal) {
      console.log(newVal, oldVal, "城市");
      this.city_id = newVal;
    },
    location(newVal, oldVal) {
      console.log(newVal, oldVal, "所在地");
      this.location_self = newVal;
    },
    flag(newVal) {
      console.log(newVal);
      if (newVal) {//打开
        document.documentElement.addEventListener("click", this.click); //document事件
      } else {// 关闭
        document.documentElement.removeEventListener("click", this.click);
      }
    }
  }
};
</script>
<style lang="less">
#app-input-Cascader {
  // padding-left: 120px;
  box-sizing: border-box;
  .home-select {
    padding: 0;
    height: 280px;
    .home-head {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .home-content {
      margin-top: 0;
      .el-tabs__active-bar{
        display: none;
      }
      .el-tabs__item.is-left.is-active{
        color:#c4a57f;
      }
    }
    .info-Cascader {
      .el-tabs__nav {
        height: 200px !important;
        overflow-x: hidden;
        overflow-y: auto;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        .el-tabs__item {
          width: auto !important;
          min-width: 98px;
          text-align: center;
        }
      }
      .info-Cascader-list {
        max-width: 120px;
        height: 200px;
        overflow: auto;
        & > li {
          cursor: pointer;
          float: none;
        }
      }
      /* 国外 */
      .abroad-list {
        width: 100%;
        height: 200px;
        overflow: auto;
        padding-left: 20px;
        box-sizing: border-box;
        & > li {
          margin: 10px 0;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }
      }
    }
    .app-input-Cascader-foot {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      width: 100%;
      color: #333;
      text-align: right;
      padding-right: 20px;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
  .el-tabs__item.is-left {
    font-size: 14px !important;
  }
}
.self-cascader {
  .self-cascader-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    z-index: -1;
  }
  width: 310px !important;
  height: auto !important;
  font-size: 14px !important;
  .selected {
    color: #c4a57f !important;
  }
}
</style>