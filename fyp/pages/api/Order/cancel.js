import Order from "../../../models/Order";
import connectDB from "../../../middleware/Connection";
import AdminAuth from "../../../middleware/AdminAuth";

// AdminAuth middleware will verify the Admin. To make sure only admin user can delete the Order
// Then it will delete the Order by id(using qurey / req.body.id)

const handler = async (req, res) => {
  if (req.method == "POST" && req.adminId) {
    try {
      const { id } = req.query;
      console.log(req.adminId);
      if (req.body.length !== null && !id) {
        for (let i = 0; i < req.body.length; i++) {
          await Order.findByIdAndDelete(req.body[i].id);
        }
        return res.status(200).json({ status: "Delete Order Success" });
      }
      if (req.body.length == null && id) {
        let order = await Order.findByIdAndDelete(id);
        console.log(id)
        if (order)
          return res
            .status(200)
            .json({ status: "Deleting User Success", order });
        else return res.status(503).json({ status: false, Error: "Not Found" });
      } else return res.status(401).json({ Error: "Invalid request" });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ Error: "Invalid request to (Cancle Order)", error: error });
    }
  } else
    return res
      .status(400)
      .json({ Error: "Invalid request to method (Cancle Order)" });
};

export default connectDB(AdminAuth(handler));
