const userDB = require("../../data/user");

async function withdrawUser(req, res) {
  try {
    const userId = req.userId;

    userDB.withdrawUser(userId);

    return res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  withdrawUser,
};