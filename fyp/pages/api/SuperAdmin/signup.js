// import SuperAdminInfo from '../../../models/SuperAdminInfo';
import connectDB from "../../../middleware/Connection";
import SuperAdmin from "../../../models/SuperAdmin";
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
      const { name, email, password } = req.body;
      if ((name, email, password)) {
        console.log(req.body.password);
        let check = await SuperAdmin.findOne({ email });
        console.log(check);
        if (!check) {
          const cyperText = CryptoJS.AES.encrypt(
            password,
            process.env.SUPER_ADMIN_PASSWORD_SECRET_KEY
          ).toString();
          const resetToken = makeid(24);
          let superAdmin = new SuperAdmin({
            name,
            email,
            password: cyperText,
            resetToken,
          });
          let { _id } = await superAdmin.save();
          console.log(_id);
          // let superAdmin = new SuperAdmin({ adminId: _id, name, phone })
          // await superAdmin.save()
          return res
            .status(200)
            .json({ status: true, Message: "Account created" });
        } else {
          return res
            .status(400)
            .json({ status: false, Error: "Invalid Credentials" });
        }
      } else
        return res
          .status(501)
          .json({ status: false, Error: "Invalid arguments" });
    } catch (error) {
      console.error({ error: error });
      return res
        .status(400)
        .json({ status: false, Error: "Internal Srever Error" });
    }
  } else {
    return res
      .status(400)
      .json({ status: false, Error: "This method is not allowed" });
  }
};

export default connectDB(handler);
