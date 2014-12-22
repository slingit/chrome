var qr = require("qrcode.js");

new qr("qrcode", { text: require("uuid").v4() });
