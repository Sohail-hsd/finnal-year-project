import Product from "../../../models/Product";
import connectDB from "../../../middleware/Connection";
import AdminAuth from "../../../middleware/AdminAuth";

// AdminAuth will verify the admin user to make sure only admin user can update the product.
// After that it will update the product by id (using req.query / req.body).

const handler = async (req, res) => {
  if (req.method == "POST" && req.adminId) {
    try {
      const { id } = req.query;
      console.log(req.adminId);
      console.log(req.body)
      if (req.body && !id) {
      //   let updated;
      //   for (let i = 0; i < req.body.length; i++) {
      //     updated = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
      //   }
      //  return  res.status(200).json({ status:true,message: "Updated Success" });
      } else if (req.body && id) {
        let updated = await Product.findByIdAndUpdate(id, req.body);
        // console.log(updated)
        return res.status(200).json({ status:true, message: "Updated Success", updated });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ Error: "Invalid request to (updateProducts)", status: false });
    }
  } else
    return res
      .status(400)
      .json({ Error: "Invalid request to method (updateProducts)", status:false });
};

export default connectDB(AdminAuth(handler));
