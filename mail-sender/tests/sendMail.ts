var http = require("follow-redirects").http;
var fs = require("fs");

var options = {
  method: "POST",
  hostname: "localhost",
  port: 3000,
  path: "/api/v1/send-mail",
  headers: {
    "Content-Type": "application/json",
  },
  maxRedirects: 20,
};

var req = http.request(options, function (res: any) {
  var chunks: any = [];

  res.on("data", function (chunk: any) {
    chunks.push(chunk);
  });

  res.on("end", function (_chunk: any) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error: any) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  recipients: [
    {
      email: "ankush.bhardwajofficial@gmail.com",
      name: "Ankush",
    },
    {
      email: "ankush.bhardwaj@custiv.com",
      name: "Farzeen",
    },
  ],
  subject: "Hello world",
  emailBody: "Hello world to {{ name }}",
});

req.write(postData);

req.end();
