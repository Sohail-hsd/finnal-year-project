const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
import Admin from "../model/Admin";

mongoose.set("strictQuery", true);

// Step # 1 : Verify the token, sent by client.
// Step # 2 : If token is verified, Set the req.userId = to the doceded id from the token.
// Step # 3 : Then return the handler fucntion with (req,res).
// Step # 4 : If token is not verified, Return Error.

const AdminAuth = (handler) => async (req, res) => {
  const { authorization } = req.body;
  // if (req.method == 'POST') {
  try {
    console.log("Admin-Auth");
    return new Promise((resolve, reject) => {
      let token = req.headers.authorization;
      // Verifing Authorization token --- [Done]
      jwt.verify(
        token,
        process.env.ADMIN_JWT_SECRET_KEY,
        async (err, decoded) => {
          if (err) {
            res
              .status(401)
              .json({ status: false, Error: "Invaid User session Token" });
            reject();
          } else if (decoded.id) {
            let admin = await Admin.findOne({ _id: decoded.id });
            if (admin) {
              console.log("Verified")
              req.adminId = decoded.id;
              handler(req, res);
              resolve();
            }
            // else {
            //   return res
            //     .status(401)
            //     .json({ status: false, Error: "Invalid admin Session" });
            // }
          }
        }
      );
    });
  } catch (error) {
    console.error({ error: error });
    return res
      .status(401)
      .json({ status: false, Error: "Internal Srever Error" });
  }
  // }
  // else return res.status(403).json({ status: false, Error: 'This method is not allowed' })
};

export default AdminAuth;
