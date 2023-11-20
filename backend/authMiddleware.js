const jwt = require("jsonwebtoken");
const config = require("./config/key.js");

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    req.decoded = jwt.verify(token, config.JWT);
    return next();
  } catch (error) {
    // 인증 실패
    // Token has been expired
    if (error.name === "TokenExpiredError") {
      console.log("auth TokenExpiredError");
      // next();
      return res.status(401).json({
        code: 401,
        message: "로그인 되어있지 않습니다.",
      });
    }
    // JsonWebTokenError
    if (error.name === "JsonWebTokenError") {
      console.log("JsonWebTokenError");
      // next();
      return res.status(401).json({
        code: 401,
        message: "타당하지 않은 토큰 입니다.",
      });
    }
  }
};
