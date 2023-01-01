import User from "../../../models/User";
import connectDB from "../../../middleware/Connection";
import SuperAdminAuth from "../../../middleware/SuperAdminAuth";

// SuperAdminAuth middleware will verify the SuperAdmin. To make sure only SuperAdmin user can delete the User
// Then it will delete the Users by id(using qurey / req.body)

const handler = async (req, res) => {
  if (req.method == "POST" && req.superAdminId) {
    try {
      const { id } = req.query;
      console.log(req.superAdminId);
      console.log(id);
      if (req.body.length != null && !id) {
        for (let i = 0; i < req.body.length; i++) {
         let users = await User.findByIdAndDelete(req.body[i].id);
        }
        return res
          .status(200)
          .json({ status: "Deleting User Success", users });
      }
      if (req.body.length == null && id) {
        let users = await User.findByIdAndDelete(id);
        if (users)
          return res
            .status(200)
            .json({ status: "Deleting User Success", users });
        else return res.status(503).json({ status: false, Error: "Not Found" });
      } else {
        return res.status(401).json({ Error: "Invalid request" });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ Error: "Invalid request", error: error });
    }
  } else return res.status(400).json({ Error: "Invalid request to method" });
};

export default connectDB(SuperAdminAuth(handler));
