import Admin from "../../../models/Admin";
import connectDB from "../../../middleware/Connection";
import SuperAdminAuth from "../../../middleware/SuperAdminAuth";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // console.log(req.body.superAdminId);
      // console.log(req.query.userId);
      // console.log(req.query.all);
      // console.log(req.superUserId);
      let users;
      if (req.superAdminId) {
        if (req.query.email) {
          users = await Admin.find(
            { email: req.query.email },
            { resetToken: 0 }
          );
          console.log("req.query.email");
          if (users.length)
            return res.status(200).json({ status: true, users });
          else
            return res.status(503).json({ status: false, Error: "Not Found" });
        }
        if (req.query.username) {
          users = await Admin.find(
            { name: req.query.username },
            { resetToken: 0 }
          );
          console.log(users);
          if (users.length)
            return res.status(200).json({ status: true, users });
          else
            return res.status(503).json({ status: false, Error: "Not Found" });
        }
        if (req.query.userId && req.query.userId.length == 24) {
          //   users = await Admin.find( { _id: req.query.userId },{resetToken:0} )
          users = await Admin.find(
            { _id: req.query.userId },
            { resetToken: 0 }
          );
          if (users.length) return res.status(200).json({ status: true, users });
          else
            return res.status(503).json({ status: false, Error: "Not Found" });
        }
        if (req.query.all) {
          users = await Admin.find({}, { resetToken: 0 });
          if (users) return res.status(200).json({ status: true, users });
          else
            return res.status(503).json({ status: false, Error: "Not Found" });
        } else
          return res
            .status(400)
            .json({ status: false, Error: "Invalid request" });
      } else
        return res.status(401).json({ status: false, Error: "Unauthorized" });
    } catch (error) {
      console.error({ error: error });
      res.status(400).json({ status: false, Errror: error });
      return;
    }
  }
  return res.status(501).json({ Error: "Method not allow" });
};

export default connectDB(SuperAdminAuth(handler));
