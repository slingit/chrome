var QCodeDecoder = require("qcode-decoder");
var chrome = require("chrome");

var video = document.getElementById("camera-video");
QCodeDecoder().decodeFromCamera(video, function(error, result) {
  console.log(error, result);
  if (result) {
    alert(result);
  }
});
