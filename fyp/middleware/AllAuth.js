const jwt = require("jsonwebtoken");

// Step # 1 : Verify the token, sent by client.
// Step # 2 : If token is verified, Set the req.userId = to the doceded id from the token.
// Step # 3 : Then return the handler fucntion with (req,res).
// Step # 4 : If token is not verified, Return Error.

const AllAuth = (handler) => async (req, res) => {
  // if (req.method == 'POST') {
  try {
    console.log("AllAuth");
    let token = req.headers.authorization;
    let verified;
    // Verifing Authorization token --- [Done]
    verified = verify(process.env.JWT_SECRET_KEY, token);
    if (verified.message = "invalid token") {
      verified = verify(process.env.ADMIN_JWT_SECRET_KEY, token);
      if (verified.message == "invalid token") {
        verified = verify(process.env.SUPER_ADMIN_JWT_SECRET_KEY, token);
      }
    }
    if (verified.message != "invalid token") {
        req.userId = verified.id;
        console.log(verified.id);
      handler(req, res);
    }else{

        res.status(200).json({ verified });
    }
  } catch (error) {
    console.error({ error: error });
    return res.status(401).json({ status: false, Error: error });
  }
  // }
  // else return res.status(403).json({ status: false, Error: 'This method is not allowed' })
};

const verify = (sercret, token) => {
  let check = jwt.verify(token, sercret, function (err, decoded) {
    if (err) return err;
    else return decoded;
  });
  return check;
};

export default AllAuth;
