// const http = require("http");
// const path = require("path");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 8000; //포트번호 설정
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
const config = require("./config/key");

const adminRoutes = require("./routes/admin");
const boardRoutes = require("./routes/board");
const userRoutes = require("./routes/user");

// const errorControllers = require("./controllers/error");

//post를 사용할 수 있게
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DB 설정
mongoose
  .connect(config.mongoURI, {
    // 몽고디비 연결 주소를 넣어주도록 한다.
    useNewUrlParser: true,
    useUnifiedTopology: true, //옵션 -> 에러를 막아준다.
  })
  .then(() => console.log("MongoDB Connected...")) // 연결될 경우에 던져주기
  .catch((err) => console.log(err)); //에러를 출력

// CORS 문제 해결
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "성균문고 API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//router 목록
app.use("/admin", adminRoutes); // 라우터 객체 사용 -> /admin으로 시작하는 경우 모두 adminRoutes로
app.use("/board", boardRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => res.send("TEAM8"));
app.get("/", function (req, res) {
  res.send("hello NodeJs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
