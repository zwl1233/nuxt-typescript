<template>
  <section>
    <el-dialog
      :visible.sync="modelflag"
      custom-class="PerfectInformation-Model app-Modal-content"
      width="639px"
      center
      :before-close="closeModal"
    >
      <div class="Model-content ">
        <h4 class="fz17 c4c49">完善个人信息</h4>
        <div class="leftClass-tab">
          <div class="PersonalInformation-content">
            <el-form
              ref="form"
              :model="form"
              label-width="100px"
              :rules="rules"
            >
              <el-form-item
                label="性别"
                prop="sex"
              >
                <el-radio-group v-model="form.sex" class="app-Modal-content-input app-radio-group-color-change">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>

              </el-form-item>
              <el-form-item
                label="职业"
                prop="careerId"
              >
                <el-select
                  v-model="form.careerId"
                  placeholder="请选择职业"
                  class="app-Modal-content-input"
                >
                  <el-option
                    v-for="item in careerAry"
                    :key="item.enum_item_key"
                    :label="item.enum_item_name"
                    :value="item.enum_item_key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="学历"
                prop="educationId"
              >
                <el-select
                  v-model="form.educationId"
                  placeholder="请选择学历"
                  class="app-Modal-content-input"
                >
                  <el-option
                    v-for="item in educationAry"
                    :key="item.enum_item_key"
                    :label="item.enum_item_name"
                    :value="item.enum_item_key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="生日"
                prop="birthday"
              >
                <el-date-picker
                class="app-Modal-content-input"
                  type="date"
                  placeholder="请选择生日"
                  v-model="form.birthday"
                ></el-date-picker>

              </el-form-item>
              <el-form-item
                label="所在行业"
                prop="industryId"
              >
                <el-select
                class="app-Modal-content-input"
                  v-model="form.industryId"
                  placeholder="请选择所在行业"
                >
                  <el-option
                    v-for="item in industryAry"
                    :key="item.enum_item_key"
                    :label="item.enum_item_name"
                    :value="item.enum_item_key"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="所在地"
                class="app-change-location-require"
                prop="location"
              >
                <Cascader @getLocation="getLocation"></Cascader>
              </el-form-item>
            </el-form>
            <div class="user-item text-center">
              <button
                class="btn-Agreed"
                style="cursor:pointer;"
                @click="submit('info')"
              >同 意</button>
            </div>
          </div>

          <!-- <div class="PersonalInformation-content">

            <div class="PersonalInformation-item">

              <div class="input-border">
                <label>性别</label>
                <div>
                  <el-radio
                    v-model="gender"
                    label="1"
                  >男</el-radio>
                  <el-radio
                    v-model="gender"
                    label="2"
                  >女</el-radio>
                </div>
              </div>
              <div class="input-border">
                <label>职业</label>
                <div>
                  <el-select
                    v-model="professional"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="input-border">
                <label>学历</label>
                <div>
                  <el-select
                    v-model="schooling"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="input-border">
                <label>生日</label>
                <div>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </div>

              <div class="input-border">
                <label>所在行业</label>
                <div>
                  <el-select
                    v-model="industry"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div class="input-border">
                <label>所在地</label>
                <div>
                  <el-select
                    v-model="home"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>

              </div>
              <div class="input-border">
                <div class="home-select">
                  <div class="home-head">
                    <el-radio
                      v-model="home_head"
                      label="1"
                    >国内</el-radio>
                    <el-radio
                      v-model="home_head"
                      label="2"
                    >海外</el-radio>
                  </div>
                  <div class="home-content">
                    所在地
                    <el-tabs
                      :tab-position="homeSelect"
                      style="height: 200px;"
                    >
                      <el-tab-pane label="北京">
                        <ul class="fz14 c7271">
                          <li>
                            <a href="##">北京市</a>
                          </li>
                          <li>
                            <a href="##">北京市</a>
                          </li>
                          <li>北京市</li>
                        </ul>
                      </el-tab-pane>
                      <el-tab-pane label="重庆">
                        <ul class="fz14 c7271">
                          <li>重庆市</li>

                        </ul>
                      </el-tab-pane>
                      <el-tab-pane label="福建">
                        <ul class="fz14 c7271">
                          <li>福州</li>
                          <li>厦门</li>
                          <li>莆田</li>
                          <li>三明</li>
                          <li>泉州</li>
                          <li>漳州</li>
                          <li>南平</li>
                          <li>龙岩</li>
                          <li>宁德</li>
                        </ul>
                      </el-tab-pane>
                      <el-tab-pane label="广东">
                        <ul class="fz14 c7271">
                          <li>广东省</li>

                        </ul>
                      </el-tab-pane>
                    </el-tabs>

                  </div>

                </div>
              </div>

              <div class="user-item text-center">
                <button
                  class="btn-Agreed"
                  style="cursor:pointer;"
                  @click="doing('info')"
                >同 意</button>
              </div>
            </div>

          </div> -->
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import Cascader from "@/components/Cascader";
import { formData } from "@/plugins/utils";

export default {
  props: {
    PerfectInformation: {
      type: null
    },
    changedoing: {
      type: null
    }
  },
  data() {
    return {
      form: {
        birthday: "", //生日
        // career: "", //职业
        careerId: "", //职业id
        cityId: "", //城市id
        countryId: "", //国家id
        provinceId: "", //省份id
        // education: "", //学历
        educationId: "", //学历id
        // industry: "", //行业
        industryId: "", //行业id
        sex: "", //性别
        location: "" //所在地
      },
      rules: {
        birthday: [
          { required: true, message: "请输入生日", trigger: "change" }
        ], //生日
        careerId: [{ required: true, message: "请输入职业", trigger: "change" }], //职业id
        educationId: [
          { required: true, message: "请输入学历", trigger: "change" }
        ], //学历id
        industryId: [
          { required: true, message: "请输入行业", trigger: "change" }
        ], //行业id
        sex: [{ required: true, message: "请输入性别", trigger: "change" }], //性别
        location: [{ validator: this.vaildLocation, trigger: "change" }] //所在地
      },
      industryAry: [], //行业
      careerAry: [], //职业
      educationAry: [], //学历

      modelflag: false,
      homeSelect: "left",
      activeNames: ["1"],
      gender: "1" /*性别*/,
      home_head: "1",
      value1: "" /*生日*/,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      industry: "", //所在行业
      professional: "", //职业
      schooling: "", //学历
      home: "" //所在地
    };
  },
  components: {
    Cascader
  },
  created() {
    console.log("完善个人信息");
    //获取枚举接口
    this.getIndustry();
    this.getCareer();
    this.getEducation();
  },
  methods: {
    formData,
    //获取所在行业
    getIndustry() {
      this.$axios.post("/utility/enumlist", { enumKey: 15 }).then(res => {
        if (res.code == 0) {
          res.result = res.result.filter(item => {
            return item.enum_item_key != "-1";
          });
          this.industryAry = res.result;
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
          this.careerAry = res.result;
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
          this.educationAry = res.result;
        }
      });
    },
    //提交
    submit(type) {
      this.$refs.form.validate((valid, values) => {
        if (!valid) return;
        // console.log(values)
        // console.log(this.$refs.form)
        console.log(this.form);
        let {
          birthday,
          careerId,
          educationId,
          industryId,
          sex,
          cityId,
          countryId,
          provinceId,
          location
        } = this.form;
        birthday = formData(birthday); //转换日期
        //获取职业
        let career = this.screen(this.careerAry, careerId);
        //获取学历
        let education = this.screen(this.educationAry, educationId);
        //获取行业
        let industry = this.screen(this.industryAry, industryId);
        // let obj = {
        //   birthday,
        //   careerId,
        //   career,
        //   educationId,
        //   education,
        //   industryId,
        //   industry,
        //   sex,
        //   cityId,
        //   countryId,
        //   provinceId,
        //   location
        // };
        // console.log(obj);
        this.$axios
          .post("/user/updateuserinfo", {
            token: "",
            birthday,
            careerId,
            career,
            educationId,
            education,
            industryId,
            industry,
            sex,
            cityId,
            countryId,
            provinceId,
            location
          })
          .then(res => {
            if (res.code == 0) {
              this.$message({
                duration:5000,
                message: this.$selfMsg.addSucess,
                type: "success"
              });
              console.log(res);
              this.modelflag = false;
              this.$emit("changedoing", 'pay');
            }
          });
      });
    },
    //自定义验证所在地
    vaildLocation(rule, value, callback) {
      if (!this.form.location) {
        return callback(new Error("所在地不能为空"));
      }
      callback();
    },
    doing(type) {},
    //获取所在地
    getLocation({ countryId, provinceId, cityId, location }) {
      this.form.location = location;
      this.location = location;
      this.form.countryId = countryId;
      this.form.provinceId = provinceId;
      this.form.cityId = cityId;
    },
    //显示
    flagchange() {
      this.modelflag = true;
    },
    //关闭
    closeModal(){
        //清空form
      this.$refs["form"].resetFields();
      this.modelflag = false;

    },
    //根据id筛选字段
    screen(ary, id) {
      let name = "";
      ary.forEach(item => {
        if (item.enum_item_key == id) {
          name = item.enum_item_name;
        }
      });
      return name;
    }
  }
};
</script>

<style lang="less">
.PersonalInformation-content{
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
    border-color:#b49876;
  }
}
.app-Modal-content{
  .app-Modal-content-input{
    width: 310px;
    &>.el-input.el-input--suffix.is-focus>input{
      border-color:#b49876;
    }
  }

}
/** 完善个人信息model **/
.PerfectInformation-Model {
  /*** 所在地级联菜单 ***/
}
.PerfectInformation-Model .el-dialog__body {
  padding: 0px 66px 40px;
}
.PerfectInformation-Model .el-dialog__header {
  padding: 20px 20px 30px;
}
.PerfectInformation-Model
  .el-dialog__header
  .el-dialog__headerbtn
  .el-dialog__close {
  color: #c4a57f;
  top: 14px;
  position: relative;
  font-size: 17px;
  font-weight: 600;
}
.PerfectInformation-Model .Model-content {
  margin-top: 15px;
}
.PerfectInformation-Model .Model-content > h4 {
  position: relative;
  top: -34px;
}
.PerfectInformation-Model .el-tabs--left .el-tabs__active-bar.is-left {
  // right: -9px;
  // top: 10px;
  right:4px;
  top:17px;
  width: 20px !important;
  height: 20px !important;
}
.PerfectInformation-Model .home-content {
  border-top: 1px solid rgba(180, 152, 118, 0.2);
  margin-top: 20px;
}
.PerfectInformation-Model .home-content .el-tabs__nav-scroll {
  overflow: inherit !important;
  height: 224px;
  border-right: 1px solid rgba(180, 152, 118, 0.2);
}
.PerfectInformation-Model .home-content .el-tabs__nav {
  text-align: center;
  width: 100%;
}
.PerfectInformation-Model .home-content .el-tabs--left .el-tabs__item.is-left {
  width: 98px;
}
.PerfectInformation-Model .home-content .el-tabs__item {
  font-size: 14px;
  color: #333;
}
.PerfectInformation-Model .home-content .el-tabs__active-bar {
  display: block;
}
.PerfectInformation-Model .home-content .el-tabs__item.is-active::after {
  display: none;
}
.PerfectInformation-Model .home-content div.el-tabs__content ul {
  float: left;
  width: 200px;
}
.PerfectInformation-Model .home-content div.el-tabs__content ul li {
  padding-left: 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  float: left;
}
.PerfectInformation-Model .home-content div.el-tabs__content ul li a {
  color: #727172;
}
.leftClass-tab {
  /*** 安全设置 ***/
  /** 个人信息 ***/
}
.leftClass-tab .el-tabs__content div > blockquote.cb49 {
  margin-left: 65px;
}
.leftClass-tab .el-collapse.SecuritySettings {
  border-top: 0px;
}
.leftClass-tab .SecuritySettings .Operation_change {
  width: 85%;
  margin-left: 61px;
}
.leftClass-tab .SecuritySettings {
  /** +86 宽度更改 **/
  /** 获取验证码 宽度更改 **/
  /*** end ***/
}
.leftClass-tab .SecuritySettings .el-collapse-item__header {
  border-bottom-color: rgba(196, 165, 127, 0.2);
}
.leftClass-tab .SecuritySettings .el-collapse-item__header.is-active {
  border-bottom: 1px dashed rgba(196, 165, 127, 0.2);
}
.leftClass-tab .SecuritySettings .el-collapse-item__wrap {
  border-bottom: 0px;
}
.leftClass-tab .SecuritySettings .Message-verify .el-input {
  width: 90%;
}
.leftClass-tab .SecuritySettings .Message-verify .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.leftClass-tab .SecuritySettings .Message-verify .btn-verify {
  width: 139px;
  height: 40px;
  color: #000;
  margin-left: 10px;
  font-size: 14px;
  border: 0px;
  border-radius: 3px;
  background: rgba(196, 165, 127, 0.34);
}
.leftClass-tab .SecuritySettings .user-item {
  margin-bottom: 17px;
}
.leftClass-tab .SecuritySettings .btn-login {
  width: 310px;
  height: 36px;
  background: #c4a57f;
  border-radius: 3px;
  border: 0px;
  color: #fff;
  font-size: 18px;
}
.leftClass-tab .SecuritySettings .input-border {
  display: flex;
}
.leftClass-tab .SecuritySettings .input-border > label {
  display: inline-block;
  width: 140px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #333;
  margin-right: 16px;
  text-align: right;
}
.leftClass-tab .SecuritySettings .input-border div {
  width: 100%;
}
.leftClass-tab .SecuritySettings .input-border div .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.leftClass-tab .SecuritySettings .input-border div .el-input-group__prepend {
  border-color: rgba(196, 165, 127, 0.3);
  background: #fff;
}
.leftClass-tab .SecuritySettings .input-border div .el-input__inner {
  width: 310px;
  height: 36px;
  border: 1px solid rgba(196, 165, 127, 0.3);
  border-radius: 3px;
}
.leftClass-tab .SecuritySettings .el-input-group--prepend .el-input__inner {
  width: 243px !important;
}
.leftClass-tab .SecuritySettings .el-input--suffix {
  width: 200px !important;
}
.leftClass-tab .SecuritySettings .el-input--suffix + button.btn-verify {
  width: 100px;
}
.leftClass-tab .SecuritySettings .SecuritySettings-content {
  width: 426px;
  margin: 0px auto;
  margin-top: 35px;
  margin-bottom: 65px;
}
.leftClass-tab .SecuritySettings .user-item > label {
  display: inline-block;
  width: 140px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #333;
  margin-right: 16px;
  text-align: right;
}
.leftClass-tab .SecuritySettings .user-item > .Message-verify {
  width: 310px;
}
.leftClass-tab .PersonalInformation-head {
  margin-top: 64px;
}
.leftClass-tab .PersonalInformation-head > img {
  width: 115px;
  height: 115px;
  border-radius: 50%;
}
.leftClass-tab .PersonalInformation-head > span {
  display: inline-block;
  vertical-align: top;
  margin-left: 17px;
  height: 115px;
  line-height: 115px;
}
.leftClass-tab .PersonalInformation-head > div > img {
  padding-right: 70px;
  width: 23px;
  height: 23px;
}
.leftClass-tab .PersonalInformation-content .Message-verify .el-input {
  width: 90%;
}
.leftClass-tab .PersonalInformation-content .Message-verify .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.leftClass-tab .PersonalInformation-content .Message-verify .btn-verify {
  width: 139px;
  height: 40px;
  color: #000;
  margin-left: 10px;
  font-size: 14px;
  border: 0px;
  border-radius: 3px;
  background: rgba(196, 165, 127, 0.34);
}
.leftClass-tab .PersonalInformation-content .btn-login {
  width: 310px;
  height: 36px;
  background: #c4a57f;
  border-radius: 3px;
  border: 0px;
  color: #fff;
  font-size: 18px;
}
.leftClass-tab .PersonalInformation-content .PersonalInformation-item {
  width: 426px;
  margin: 0px auto;
  margin-top: 16px;
  margin-bottom: 74px;
  /*** 所在地级联菜单 ***/
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border {
  margin-bottom: 17px;
  display: flex;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  > label {
  display: inline-block;
  width: 140px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #333;
  margin-right: 16px;
  text-align: right;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  > label
  + span {
  height: 36px;
  line-height: 36px;
  display: inline-block;
  width: 100%;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  > label
  + div {
  width: 100%;
  height: 36px;
  line-height: 36px;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  div
  .el-input__inner {
  border-color: rgba(196, 165, 127, 0.3);
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  div
  .el-input-group__prepend {
  border-color: rgba(196, 165, 127, 0.3);
  background: #fff;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .input-border
  div
  .el-input__inner {
  width: 310px;
  height: 36px;
  border: 1px solid rgba(196, 165, 127, 0.3);
  border-radius: 3px;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content {
  border-top: 1px solid rgba(180, 152, 118, 0.2);
  margin-top: 20px;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs__nav-scroll {
  overflow: inherit !important;
  height: 224px;
  border-right: 1px solid rgba(180, 152, 118, 0.2);
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs__nav {
  text-align: center;
  width: 100%;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs--left
  .el-tabs__item.is-left {
  width: 98px;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs__item {
  font-size: 14px;
  color: #333;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs__active-bar {
  display: block;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  .el-tabs__item.is-active::after {
  display: none;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  div.el-tabs__content
  ul {
  float: left;
  width: 200px;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  div.el-tabs__content
  ul
  li {
  padding-left: 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  float: left;
}
.leftClass-tab
  .PersonalInformation-content
  .PersonalInformation-item
  .home-content
  div.el-tabs__content
  ul
  li
  a {
  color: #727172;
}
.PerfectInformation-Model {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #b49876;
    background: #b49876;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #b49876;
  }
}
</style>
