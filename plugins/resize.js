// 弃用

// 监听窗口变化  导致页面错乱  不同屏下
console.log("窗口变化")
let detectZoom = () => {
    
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();
    console.log(screen,ua)

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }
  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
console.log(ratio,"比例")
  // document.getElementsByTagName('body')[0].style.width=ratio+'%'
  return ratio;
};
// detectZoom()

// window.addEventListener("resize",()=>{
//     let n=detectZoom();
//     console.log(n,"缩放比例")
// })

//获取屏幕分辨率

let getWidth=()=>{
  return window.screen.availWidth
}
// getWidth()
//设置根元素的大小

let setRem=()=>{
  let W=getWidth()
  //1440 下 fontSize:1px
  let n=W*1/1440
  document.getElementsByTagName('html')[0].style.fontSize=n+'px';
  document.getElementsByTagName('body')[0].style.fontSize="16rem";
  console.log(n,"1440下的rem")
}
// setRem()
