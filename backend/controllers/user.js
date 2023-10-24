const User = require("../models/user");
const UserInfo = require("../models/userInfo");

exports.postJoin = async (req, res, next) => {
  try {
    const { userName, name, passWord, phone, email, studentId, major, campus } =
      req.body;

    const user = await User.create({
      userName: userName,
      name: name,
      passWord: passWord,
      phone: phone,
      email: email,
      studentId: studentId,
    });
    //
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
  }
};
