import Product from "../../../models/Product";
import connectDB from "../../../middleware/Connection";
import AdminAuth from "../../../middleware/AdminAuth";

// AdminAuth middleware will verify the Admin. To make sure only admin user can delete the product
// Then it will delete the product by id(using qurey / req.body.id)

const handler = async (req, res) => {
  if (req.method == "POST" && req.adminId) {
    try {
      const { id } = req.query;
      console.log(req.adminId);
      if (req.body && !id) {
        for (let i = 0; i < req.body.length; i++) {
          await Product.findByIdAndDelete(req.body[i].id);
        }
        return res.status(200).json({ status: true, message: "Delete Success" });
      } else if (id) {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "Delete Success" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ Error: "Invalid request to (updateProducts)", error: error });
    }
  } else
    return res
      .status(400)
      .json({ Error: "Invalid request to method (updateProducts)" });
};

export default connectDB(AdminAuth(handler));
