var QCodeDecoder = require("qcode-decoder");
var api = require("../api");
var chrome = require("chrome");

var video = document.getElementById("camera-video");
var decoder = new QCodeDecoder();

decoder.decodeFromCamera(video, function(error, groupId) {
  if (!groupId) return;
  decoder.stop();
  document.body.innerHTML = "Loading…";

  api.put("/devices/me", { group_id: groupId });

  api.on("group:join", function(id) {
    if (id == groupId) {
      chrome.storage.local.set({ groupId: groupId, paired: true }, function() {
        location.href = "/index.html";
      });
    }
  });
});
