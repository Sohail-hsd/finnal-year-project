import connectDB from "../../../middleware/Connection";
import User from "../../../models/User";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Step # 1 : First search the user by email. if found!
// Step # 2 : Get the user password from DB and decrypt it. by (password sercret key). and convert the password
//            from bytes to string.
// Step # 3 : Compare it to the user provide password. if match!
// Step # 4 : create a json web token using JWT_SECRETE_KEY, add user info like (email, name) and send it to frontend.

export const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { email, password } = req.body;
      if ((email, password)) {
        let user = await User.findOne({ email: email });
        if (user) {
          const bytes = CryptoJS.AES.decrypt(
            user.password,
            `${process.env.PASSWORD_SECRET_KEY}`
          );
          const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(decryptedPassword)
          if (req.body.password === decryptedPassword) {
            const token = jwt.sign(
              {
                email: user.email,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
              },
              `${process.env.JWT_SECRET_KEY}`
            );
            return res.status(200).json({
              status: true,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
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
