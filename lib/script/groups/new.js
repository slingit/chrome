var QRCode = require("qrcode.js");
var uuid = require("uuid");
var api = require("../api");
var chrome = require("chrome");

var getGroupId = function(done) {
  chrome.storage.local.get("groupId", function(result) {
    if (result.groupId) return done(result.groupId);
    var groupId = uuid.v4();
    chrome.storage.local.set({ groupId: groupId }, function() {
      done(groupId);
    });
  });
};

getGroupId(function(groupId) {
  api.put("/devices/me", { group_id: groupId });

  api.on("group:join", function(id) {
    if (id == groupId) {
      location.href = "/index.html";
    }
  });

  new QRCode("qr", { text: groupId });
});
