var chrome = require("chrome");

chrome.storage.local.get("ready", function(result) {
  location.href = result.ready ? "/settings.html" : "/setup.html";
});
