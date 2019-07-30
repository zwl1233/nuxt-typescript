<template>
  <div class="mt-60" style="min-height:600px">
    <div class="Contains-course">
      <el-row>
        <el-col :span="6" v-for="(items) in item" :key="items.courseId">
          <!-- <div :class="{gray:items.isGray}">
          <div class="grid-content">
            <img v-lazy="items.coursePictureUri" width="261" height="148" alt>
            <dl class="text-center">
              <dt class="fz16 c3">
                <span class="fz12 c4a5"></span>{{items.courseName}}
              </dt>
              <dd class="fz12 " >
                <span class="fz16 c097 app-import" >{{items.courseFullPrice}}元</span>
                <span class="c9" >共{{items.classHourCount}}课 {{items.statusName}}</span>
                </dd>
            </dl>
          </div>
          </div>-->
          <ul class="text-center">
            <li style="cursor:pointer;background:white" @click="jumpSingle(items.courseId)">
              <div :class="{active:items.isGray}">
                <div>
                  <img v-lazy="items.coursePictureUri" style="width:203px;height:115px" alt>
                </div>
                <div>
                  <p class="fz16 c3 text-left  fzGB1-0" style="marginTop:10px;margin-left:20px;">{{items.courseName}}</p>
                  <p
                    style="marginTop:10px;marginBottom:17px;text-align:left;paddingLeft:20px;paddingRight:20px;line-height:18px"
                  >
                    <span class="c097 fz14 fzSTHeitiSC-um">
                      <b>{{items.courseFullPrice}}元</b>
                    </span>
                    <span class="fzGB1-0" style="float:right;font-size:12px">
                      <span class="fz12 c9">共{{items.classHourCount}}课</span>
                      <span class="fz12 c9">{{items.statusName}}</span>
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: null
    }
  },
  methods: {
    jumpSingle(id) {
      let routeData = this.$router.resolve({
        name: "singleOrder",
        query: {
          courseId: id
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>


<style lang="less">
.Contains-course {
  margin-top: 50px;
  padding:0 50px;
}
.Contains-course ul li {
  width: 203px;
  display: inline-block;
  margin-right: 24px;
  margin-bottom: 20px;
}
.Contains-course ul li > div:nth-child(1) img {
  width: 261px;
  height: 115px;
}
.Contains-course ul li > div:nth-child(2) {
  margin-top: 15px;
  padding-left: 19px;
  padding-right: 19px;
  padding-bottom: 20px;
  box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
}
.Contains-course ul li > div:nth-child(2) p:last-child {
  margin-top: 9px;
}
.Contains-course ul li .active div:nth-child(1) {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.Contains-course ul li .active div:nth-child(2) p.fz16.c3 {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: rgb(104, 87, 87);
}
</style>

