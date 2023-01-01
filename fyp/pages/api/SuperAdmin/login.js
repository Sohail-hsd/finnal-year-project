import connectDB from "../../../middleware/Connection";
import SuperAdmin from "../../../models/superAdmin";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Step # 1 : First search the superAdmin by email. if found!
// Step # 2 : Get the superAdmin password from DB and decrypt it. by (password sercret key). and convert the password
//            from bytes to string.
// Step # 3 : Compare it to the superAdmin provide password. if match!
// Step # 4 : create a json web token using JWT_SECRETE_KEY, add superAdmin info like (email, name) and send it to frontend.

export const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { email, password } = req.body;
      if (email, password) {
        let superAdmin = await SuperAdmin.findOne({ email: email });
        if (superAdmin) {
          const bytes = CryptoJS.AES.decrypt(
            superAdmin.password,
            `${process.env.SUPER_ADMIN_PASSWORD_SECRET_KEY}`
          );
          const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(decryptedPassword)
          if (req.body.password === decryptedPassword) {
            const token = jwt.sign(
              { email: superAdmin.email, id: superAdmin._id, name: superAdmin.name },
              `${process.env.SUPER_ADMIN_JWT_SECRET_KEY}`
            );
            return res
              .status(200)
              .json({
                status: true,
                email: superAdmin.email,
                name: superAdmin.name,
                token,
              });
          }

          return res
            .status(403)
            .json({ status: false, Error: "Invalid Email Or Password" });
        } else {
          return res
            .status(403)
            .json({ status: false, Error: "Invalid Email Or Password" });
        }
      } else
        return res
          .status(501)
          .json({ status: false, Error: "Invalid arguments" });
    } catch (error) {
      res.status(500).json({ status: "internal server error" });
    }
  }
  res
    .status(500)
    .json({ status: "internal server error. (Method not allowed)" });
};

export default connectDB(handler);
