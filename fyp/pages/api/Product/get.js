import Product from "../../../models/Product";
import connectDB from "../../../middleware/Connection";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const { item, id, limit = 2 } = req.query;
    let products;
    let items = {};
    try {
      if (item && id) {
        products = await Product.findOne({ category: item, _id: id });
        return res.status(200).json({ products });
      } else if (!item && id) {
        products = await Product.findOne({ _id: id });
        return res.status(200).json({ products });
      } else if (item && !id) {
        products = await Product.find({ category: item });
      } else if (!item && !id) {
        products = await Product.find({}).limit(limit);
        return res.status(200).json({products})
    }
    // Loop though all products {T-shirt}, if item in tshirt object, update its color and size array. To findout which are avilable in what verients.
      for (let item of products) {
        if (item.title in items) {
          if (
            !items[item.title].color.includes(item.color) &&
            item.availableQty > 0
          ) {
            items[item.title].color.push(item.color);
          }
          if (
            !items[item.title].size.includes(item.size) &&
            item.availableQty > 0
          ) {
            items[item.title].size.push(item.size);
          }
        } else {
          items[item.title] = JSON.parse(JSON.stringify(item));
          if (item.availableQty > 0) {
            items[item.title].color = [item.color];
            items[item.title].size = [item.size];
          }
        }
      }
      return res.status(200).json({ items });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: false,
          message: "Internal server error",
          error: error,
        });
    }
  }
};

export default connectDB(handler);
