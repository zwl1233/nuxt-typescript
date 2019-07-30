import Vue from "vue"
Vue.directive('showpas', {
  bind(el) {
    el.classList.add("app-password-showHid")
    console.log(el)
    let input = el.children[0] //input框
    //插入图标
    let span = document.createElement("span");
    let span_inner = document.createElement("span");
    let span_icon = document.createElement("i");
    // span.className="app-change-input-showPas"
    span_inner.className = "el-input__suffix-inner";
    span.className = "el-input__suffix";
    span_icon.className = "iconfont icon-yanjing"; //默认状态  iconfont icon-yanjing1  查看状态
    span_inner.appendChild(span_icon);
    span.appendChild(span_inner);
    if (el.children.length <= 1) {
      el.appendChild(span);
    }
    span.addEventListener("click", e => {
      console.log("click")
      //事件默认行为
      // if (e.preventDefault) {
      //   e.preventDefault();
      // } else {
      //   window.event.returnValue == false;
      // }
      // //事件冒泡
      // if (e && e.stopPropagation)
      //   //因此它支持W3C的stopPropagation()方法
      //   e.stopPropagation();
      // else {
      //   //否则，我们需要使用IE的方式来取消事件冒泡
      //   window.event.cancelBubble = true;
      // }
      let name = span_icon.className
      if (name == 'iconfont icon-yanjing') {
        //闭合
        span_icon.className = 'iconfont icon-yanjing1'
        input.focus()
        span.classList.add("db")
        input.setAttribute('type', "text")
      } else {
        //查看
        span_icon.className = 'iconfont icon-yanjing'
        input.setAttribute('type', "password")
        input.focus()
        span.classList.add("db")
      }


      // span_icon.className="iconfont icon-yanjing1"
    });
    // console.log(input)
    input.addEventListener('focus', e => {
      //事件默认行为
    //   if (e.preventDefault) {
    //     e.preventDefault();
    //   } else {
    //     window.event.returnValue == false;
    //   }
    //   //事件冒泡
    //   if (e && e.stopPropagation)
    //     //因此它支持W3C的stopPropagation()方法
    //     e.stopPropagation();
    //   else {
    //     //否则，我们需要使用IE的方式来取消事件冒泡
    //     window.event.cancelBubble = true;
    //   }
      span.classList.add("db")
    })
    input.addEventListener('change', e => {
      span.classList.remove("db")
      //事件默认行为
      //  console.log("blur")
      // if (e.preventDefault) {
      //   e.preventDefault();
      // } else {
      //   window.event.returnValue == false;
      // }
      //事件冒泡
      // if (e && e.stopPropagation)
      //   //因此它支持W3C的stopPropagation()方法
      //   e.stopPropagation();
      // else {
      //   //否则，我们需要使用IE的方式来取消事件冒泡
      //   window.event.cancelBubble = true;
      // }
      // if(){}
      // span.style.display='none'
      // span.setAttribute('style',"display:none")
      // span.classList.remove("db")
    })
    // 脱离焦点
    input.addEventListener("blur", e => {
      span.classList.remove("db")
    })

  },
  update(el, binding) {
    // console.log(binding.value,binding.oldValue)
    if (binding.value != binding.oldValue) {
      let span = el.children[1]
      // console.dir(span)
      // span.style.display='block'
    //   span.classList.add("db")
    }
    // console.log(el,'更新前')
    // let span=el.children[1]
    // console.dir(span)
    // // span.setAttribute('style',"display:block")
    // span.style.display='block'
  },
  unbind(el) {
    // console.log(el,'更新后')
    // console.log(el, '更新后')
    // let span=el.children[1]
    // console.dir(span)
    // span.style.display='block'
    // span.setAttribute('style',"display:block")

  }
})

Vue.directive('norecord',{
  bind(el,{value}){
    let input=document.createElement("input")
    input.setAttribute("type",value)
    input.style.display='none'
    el.insertBefore(input,el.children[0])
  },
  unbind(el) {
    let input=el.children[0]
    if(input.style.display=="none"){
      el.removeChild(input)
    }
  }
})
