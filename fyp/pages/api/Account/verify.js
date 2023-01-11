const jwt = require("jsonwebtoken");

const handler = (req, res) => {
  // if (req.method == 'POST') {
  try {
    return new Promise((resolve, reject) => {
      let token = req.headers.authorization;
      // Verifing Authorization token --- [Done]
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            console.log("UnAuthorized")
          res
            .status(401)
            .json({ status: false, Error: "Invaid User session Token", err });
          reject();
        } else if (decoded.id) {
        //   req.userId = decoded.id;
          console.log("Authorized");
          // console.log(first)
          res
            .status(200)
            .json({ status: true, email: decoded.email, name: decoded.firstName + " " + decoded.lastName });
          resolve();
        }
      });
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

export default handler;
