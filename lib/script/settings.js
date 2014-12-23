document.getElementById("clear").addEventListener("click", function() {
  chrome.storage.local.clear(function() {
    location.href = "/index.html";
  });
});

document.getElementById("send").addEventListener("click", function() {
  chrome.tabs.query({active: true}, function(tabs) {
    document.body.innerHTML = tabs[0].url;
  });
});
