document.getElementById("clear").addEventListener("click", function() {
  chrome.storage.local.clear(function() {
    location.href = "/index.html";
  });
});
