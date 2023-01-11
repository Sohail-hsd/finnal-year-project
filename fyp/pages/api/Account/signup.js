// import UserInfo from "../../../models/UserInfo";
import connectDB from "../../../middleware/Connection";
import User from "../../../models/User";
const CryptoJS = require("crypto-js");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (firstName, lastName, email, password) {
        console.log(req.body.password);
        let check = await User.findOne({ email });
        if (!check) {
          const cyperText = CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
          ).toString();
          const resetToken = makeid(24);
          let user = new User({ firstName,lastName, email, password: cyperText, resetToken });
          await user.save();
          // let { _id } = await user.save();
          // console.log(_id);
          // let userInfo = new UserInfo({
          //   userId: _id,
          //   name,
          //   address,
          //   areaPinCode,
          //   city,
          //   district: state,
          //   phone,
          // });
          // await userInfo.save();
          res.status(200).json({ status: true, Message: "Account created" });
        } else {
          res
            .status(400)
            .json({ status: false, Error: "Invalid Info, Please try again." });
        }
      } else
        return res
          .status(501)
          .json({ status: false, Error: "Invalid arguments" });
    } catch (error) {
      console.error({ error: error });
      res.status(400).json({ status: false, Error: "Internal Srever Error" });
    }
  } else {
    res
      .status(400)
      .json({ status: false, Error: "This method is not allowed" });
  }
};

export default connectDB(handler);
