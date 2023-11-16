const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const config = require("../config/key.js");
const { createTransport } = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.postOtherProfile = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, config.JWT);
    const { userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({
        isSuccess: false,
        message: "유저 정보가 없습니다.",
        token,
      });

      return;
    }
    const userInfo = await UserInfo.findOne({ user: user._id });

    const info = {
      userName: user.userName,
      keyWord: user.keyWord,
      totalTrade: user.totalTrade,
      rate: user.rate,
      numEvaluators: user.numEvaluators,
      major: userInfo.major,
      campus: userInfo.campus,
      description: userInfo.description,
      photo: userInfo.photo,
    };

    res.json({
      info,
      isSuccess: true,
      message: "프로필 정보 가져오기에 성공하였습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "서버 오류 발생",
      token,
    });
  }
};

exports.getMyProfile = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    req.decoded = jwt.verify(token, config.JWT);
    const { userName } = req.decoded;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({
        isSuccess: false,
        message: "유저 정보가 없습니다.",
        token,
      });

      return;
    }

    const userInfo = await UserInfo.findOne({ user: user._id });

    const info = {
      userName: user.userName,
      name: user.name,
      studentId: user.studentId,
      email: user.email,
      phone: user.phone,
      keyWord: user.keyWord,
      totalTrade: user.totalTrade,
      rate: user.rate,
      numEvaluators: user.numEvaluators,
      major: userInfo.major,
      campus: userInfo.campus,
      description: userInfo.description,
      photo: userInfo.photo,
    };

    res.json({
      info,
      isSuccess: true,
      message: "프로필 정보 가져오기에 성공하였습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "서버 오류 발생",
      token,
    });
  }
};

exports.patchProfile = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, config.JWT);
    const { userName } = req.decoded;
    const { major, campus, photo, phone, description } = req.body;

    const user = await User.findOneAndUpdate({ userName }, { phone });
    if (!user) {
      res.status(404).json({
        isSuccess: false,
        message: "유저 정보가 없습니다.",
        token,
      });

      return;
    }
    const userInfo = await UserInfo.updateOne(
      { user: user._id },
      { major, campus, photo, description }
    );

    res.json({
      isSuccess: true,
      message: "회원정보 변경에 성공하였습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "서버 오류 발생",
      token,
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { userName, passWord } = req.body;

    const user = await User.findOne({ userName });

    // 존재하지 않는 아이디
    if (!user) {
      res.status(401).json({
        isSuccess: false,
        message: "가입되지 않은 사용자입니다.",
      });
      return;
    }

    // 패스워드와 아이디가 다른 경우
    if (user.passWord !== passWord) {
      res.status(403).json({
        isSuccess: false,
        message: "아이디 또는 패스워드가 잘못 되었습니다.",
      });
      return;
    }

    //  정상적인 로그인
    if (user.passWord === passWord) {
      const key = config.JWT;
      // 받은 요청에서 db의 데이터를 가져온다 (로그인정보)
      const { name, studentId } = user;
      const token = jwt.sign(
        {
          type: "JWT",
          userName,
          name,
          studentId,
        },
        key,
        {
          issuer: "Sungkyunmungo",
        }
      );
      // res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

      res.status(200).json({
        message: "로그인에 성공하였습니다.",
        isSuccess: true,
        token,
      });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isSuccess: false,
      message: "서버에서 오류가 발생하였습니다. 나중에 다시 시도하세요.",
    });
  }
};

exports.postLogout = async (req, res, next) => {
  try {
    // cookie 지우기
    res.clearCookie("token", req.cookies.token);
    res.json({
      isSuccess: true,
      message: "로그아웃에 성공하였습니다.",
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: "서버에서 오류가 발생하였습니다. 나중에 다시 시도하세요.",
    });
  }
};

// 회원가입 요청
exports.postJoin = async (req, res, next) => {
  try {
    const { userName, name, passWord, phone, email, studentId, major, campus } =
      req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        userName,
        name,
        passWord,
        phone,
        studentId,
        code: "O",
      }
    );

    const userInfo = await UserInfo.create({ user: user._id, major, campus });

    res.status(200).json({
      isSuccess: true,
      message: "회원가입에 성공하였습니다.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, message: "서버 오류 발생" });
  }
};

// 이메일 전송
exports.postEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sendEmail(email);
    res.json({ isSuccess: true, message: "발송 완료" });
  } catch (err) {
    console.error(err);
    res.status(409).json({ isSuccess: false, message: "발송 실패" });
  }
};

// 코드 verification
exports.postCode = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    if (code === user.code) res.json({ isSuccess: true, message: "인증 완료" });
    else
      res
        .status(409)
        .json({ isSuccess: false, message: "인증 번호가 다릅니다." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ isSuccess: false, message: "서버 에러 다시 시도하세요." });
  }
};

// 코드 담은 이메일 전송
const sendEmail = async (email) => {
  try {
    const code = generateRandomNumber();

    // 중복된 요청 방지
    const findedUser = await User.findOneAndUpdate({ email }, { code });
    if (!findedUser) {
      const user = await User.create({ email, code });
      console.log(`New email: ${user}`);
    }
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: config.mailer.gmailUser,
        clientId: config.mailer.gmailClientId,
        clientSecret: config.mailer.gmailClientSecret,
        refreshToken: config.mailer.gmailRefreshToken,
        accessToken: config.mailer.gmailAccessToken,
      },
    });

    const mailOptions = {
      to: email,
      subject: "[Sungkyunmungo] 회원가입 이메일 인증 메일입니다.",
      html: `<h3>성균문고</h3>
      <div
      style="
        border: solid 5px rgb(0, 0, 0);
        display: inline-block;
        padding: 2px 20px;
      "
    >
      <p>안녕하세요! 성균문고 입니다.</p>
      <p>회원 가입 이메일 인증을 위하여 아래 코드를 입력해주세요.</p>
      <p style="font-size: large">인증 번호: <b>${code}</b></p>
    </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};

// id 중복 검사
exports.postUserNameCheck = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const docs = await User.find({});
    if (userCheck(docs, "userName", userName)) {
      res
        .status(409)
        .json({ isSuccess: false, message: "이미 사용중인 아이디 입니다." });
      return;
    }
    res.json({ isSuccess: true, message: "사용 가능한 아이디 입니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, message: "서버 오류 발생" });
  }
};

// 닉네임 중복 검사
exports.postNameCheck = async (req, res, next) => {
  try {
    const { name } = req.body;
    const docs = await User.find({});
    if (userCheck(docs, "name", name)) {
      res
        .status(409)
        .json({ isSuccess: false, message: "이미 사용중인 닉네임 입니다." });
      return;
    }
    res.json({ isSuccess: true, message: "사용 가능한 닉네임 입니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, message: "서버 오류 발생" });
  }
};

// 이메일 중복 검사
const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.code === "O") {
    res
      .status(409)
      .json({ isSuccess: false, message: "이미 가입된 이메일 입니다." });
    return;
  }

  res.json({ isSuccess: true, message: "가입 가능한 이메일 입니다." });
};

const generateRandomNumber = (min = 111111, max = 999999) => {
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randNum);
};

const userCheck = (docs, field, val) => {
  const bool = docs.some((doc) => {
    return doc[field] === val;
  });
  return bool;
};

//user 전체 조회
exports.findAllUser = async (req, res, next) => {
  try {
    var users = await User.find();

    res.status(200).json({
      isSuccess: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//user 평점 주기
exports.rateUser = async (req, res, next) => {
  try {
    const { userId, rate } = req.body;
    var user = await User.findById(userId);

    // 평점을 받는 유저는 존재해야 한다.
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "해당 유저가 존재하지 않습니다." });
    }

    // 평점은 1~5점 이어야 한다.
    if (rate < 1 || rate > 5) {
      return res
        .status(500)
        .json({ success: false, message: "평점은 1~5점 사이어야 합니다." });
    }

    const filter = { _id: userId };
    const update = {
      $set: { rate: user.rate + rate, numEvaluators: user.numEvaluators + 1 },
    };

    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json({
      isSuccess: true,
      message: "평점 주기가 완료되었습니다.",
      updatedRate: doc.rate,
      updatedNumEvaluators: doc.numEvaluators,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
