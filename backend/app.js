require("dotenv").config({ path: "./database/dbConfig.env" });
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

//운영 모드에서 추가적인 경로 설정
let apiPath = "";
if (process.argv[2] == "prod") {
  apiPath = "/api";
}

app.get(`${apiPath}/board`, (req, res) => {
  res.send({ title: "Github Actions Deploy Test!!" });
});

const path = require("path");
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

//위에선언된 모든 라우터에게 적용 [가장 마지막 코드로 존재해야 함]
// 새로고침 에러 예외처리
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});
