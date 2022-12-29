import Product from "../../../models/Product";
import connectDB from "../../../middleware/Connection";
import AdminAuth from "../../../middleware/AdminAuth";

// First AdminAuth will run to verify the user.
// After that it will add the product.

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
    for (let i = 0; i < req.body.length; i++) {
        let p = new Product({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          price: req.body[i].price,
          size: req.body[i].size,
          color: req.body[i].color,
          availableQty: req.body[i].availableQty,
          userId: req.adminId,
        });
        await p.save();
      }
      // console.log(req.body)
      return res.status(200).json({ status: "Success" });

    } catch (error) {
      return res.status(400).json({ Error: error });
    }
  } else return res.status(400).json({ Error: "This method is not allowed" });
};

export default connectDB(AdminAuth(handler));
