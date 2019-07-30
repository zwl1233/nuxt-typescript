export const state = () => ({
  visible: false,
  picture: "", //封面图
  url: "", //视频路径
  options: {
    autoplay: false,
    lang: "zh-cn",
    theme: "#FADFA3",
    loop: false,
    lang: "zh-cn",
    screenshot: false,
    hotkey: true,
    preload: "auto",
    volume: 0.7,
    mutex: false,
    video: {
      //   url:"",
      // quality: [
      //   {
      //     name: "高清",
      //     url: "",
      //   },
      //   {
      //     name: "清晰",
      //     url:"",
      //   }
      // ],
      defaultQuality: 1,
      pic: 'demo.png', //封面图
      // thumbnails: 'thumbnails.jpg',
    },
    contextmenu: [
      // {
      //     text: '自定义1',
      //     link: 'https://github.com/DIYgod/DPlayer'
      // },
      // {
      //     text: '自定义2',
      //     link: 'https://github.com/DIYgod/DPlayer'
      // }
    ], //自定义右键菜单

  },
  time: 0,
  classhoursId:""
})

export const mutations = {
  changeVisible(state, flag) {
    state.visible = flag
  },
  changeUrl(state, {
    picture,
    quality
  }) {
    console.log(picture, quality)
    // url="http://vjs.zencdn.net/v/oceans.mp4"
    state.options.video.quality = quality
    // state.options.video.quality[0].url=url
    // state.options.video.quality[1].url=url
    state.options.video.pic = picture
  },
  changeTime(state, time) {
    if (!time) {
      time = 0
    }
    state.time = Number(time)
  },
  changeClassHourId(state,id){
      state.classhoursId=id
  }
}
