var chrome = require("chrome");

chrome.storage.local.get("ready", function(result) {
  console.log(result);
  if (result.ready) location.href = "/foo";
});
