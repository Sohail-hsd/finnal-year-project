import Order from "../../../model/Order";
import User from "../../../model/User";
import connectDB from "../../../middleware/Connection";
import Auth from "../../../middleware/Auth";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      console.log(req.body.orderId);
      let user = await User.findOne({ id: req.userId });
      let orders;
      if (user) {
        if (req.body.orderId) {
          orders = await Order.findOne({
            userId: req.userId,
            orderId: req.body.orderId,
          });
        }
        if (!req.body.orderId) {
          orders = await Order.find({
            userId: req.userId,
          });
        }

        if (orders) return res.status(200).json({ status: true, orders });
        else return res.status(503).json({status:false,Error:"Not Found"})
      } else
        return res.status(401).json({ status: false, Error: "Unauthorized" });
    } catch (error) {
      console.error({ error: error });
      res.status(400).json({ status: false, Errror: error });
    }
  }
  return res.status(501).json({ Error: "Method not allow" });
};

export default connectDB(Auth(handler));
