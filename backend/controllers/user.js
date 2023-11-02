const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const config = require("../config/key.js");
const { createTransport } = require("nodemailer");

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
    console.log(user);

    const userInfo = await UserInfo.create({ user: user._id, major, campus });
    //
    console.log(userInfo);

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
    >2
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
