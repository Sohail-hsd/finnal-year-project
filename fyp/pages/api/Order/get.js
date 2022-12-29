import Order from "../../../models/Order";
import User from "../../../models/User";
import connectDB from "../../../middleware/Connection";
import Auth from "../../../middleware/Auth";



const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // console.log(req.body.orderId);
      // console.log(req.query.orderId);
      // console.log(req.query.all);
      let user = await User.findOne({ id: req.userId });
      let orders;
      if (user) {
        if (req.body.orderId && !req.query.orderId) {
          orders = await Order.findOne({
            userId: req.userId,
            orderId: req.body.orderId,
          });
          console.log("req.body.orderId");
        }
        if (!req.body.orderId && req.query.orderId) {
          orders = await Order.findOne({
            userId: req.userId,
            orderId: req.query.orderId,
          });
          console.log("req.query.orderId");
        } else if (req.query.all) {
          orders = await Order.find({
            userId: req.userId,
          });
        }

        if (orders) return res.status(200).json({ status: true, orders });
        else return res.status(503).json({ status: false, Error: "Not Found" });
      } else
        return res.status(401).json({ status: false, Error: "Unauthorized" });
    } catch (error) {
      console.error({ error: error });
      res.status(400).json({ status: false, Errror: error });
      return
    }
  }
  return res.status(501).json({ Error: "Method not allow" });
};

export default connectDB(Auth(handler));
