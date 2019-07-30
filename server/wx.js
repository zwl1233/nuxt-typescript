var fs = require('fs');

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  console.log(bitmap,1212)
  // convert binary data to base64 encoded string
  return 'data:text/css;base64,'+new Buffer(bitmap).toString('base64');
}

// 将微信权限文件写入根目录
function setFile(){
  //读取文件
  let data=fs.readFileSync("../xuantong_pc/MP_verify_InG3pNY2Gu3kLnYm.txt","utf-8")
  fs.writeFileSync("../xuantong_pc/dist_uat/MP_verify_InG3pNY2Gu3kLnYm.txt", data,)

}

// console.log("微信css",base64_encode('../xuantong_pc/assets/wx.css'))


setFile()