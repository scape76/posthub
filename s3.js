const fs = require("fs");
const S3rver = require("s3rver");

console.log("s3 bucket is running");

new S3rver({
  port: 9000,
  address: "0.0.0.0",
  directory: "./s3",
  configureBuckets: [
    {
      name: "blogs-app",
      configs: [fs.readFileSync("./cors.xml")],
    },
  ],
}).run();
