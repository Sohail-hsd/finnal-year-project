import Order from "../../../models/Order";
import connectDB from "../../../middleware/Connection";
import Auth from "../../../middleware/Auth";
import Product from "../../../models/Product";
// import pincodes from '../../../pincodes.json'

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if the cart is tampered --- [Done]
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    for (let item in cart) {
      sumTotal = cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });

      // Chack if the cart item is out of stock --- [Done]
      console.log(product.availableQty < cart[item].qty);
      if (product.availableQty < cart[item].qty) {
        return res.status(403).json({
          success: false,
          error: "Sorry! The products is not available in that much quantity.",
        });
      }

      console.log(product.price !== cart[item].price);
      if (product.price !== cart[item].price) {
        return res.status(403).json({
          success: false,
          error:
            "The price of some products in  your cart is changed. Please try again",
        });
      }
    }

    // Checking if the pin code is serviceable or not [pending]

    // if (!Object.keys(pincodes).includes(req.body.pin)) {
    //   return res
    //     .status(403)
    //     .json({
    //       success: false,
    //       error: "The pin code you have enter is not serviceable.",
    //     });
    // }
    console.log(sumTotal !== req.body.SubTotal);
    if (sumTotal !== req.body.SubTotal) {
      return res.status(403).json({
        success: false,
        cart: "clear",
        error:
          "The price of some products in  your cart is changed. Please try again",
      });
    }
    // if (req.body.SubTotal <= 0) {
    //   return res
    //     .status(403)
    //     .json({
    //       success: false,
    //       cart: "clear",
    //       error: "Please, Build your cart and try again.",
    //     });
    // }
    console.log(
      req.body.phone.length < 11 || !Number.isInteger(Number(req.body.phone))
    );
    if (
      req.body.phone.length < 11 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      return res.status(403).json({
        success: false,
        error: "Please, Enter a valid phone number of 11 digits.",
      });
    }
    console.log(
      req.body.pin.length > 5 || !Number.isInteger(Number(req.body.pin))
    );
    if (req.body.pin.length > 5 || !Number.isInteger(Number(req.body.pin))) {
      return res
        .status(403)
        .json({ success: false, error: "Please, Provide a valid pin code." });
    }

    // Chack if the detials are valid --- [pending]

    // Initiate an Order, Coressponding ot this OrderId. --- [Done]
    try {
      let orderId = Math.floor(Math.random() * Date.now())
      let order = new Order({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        orderID: orderId,
        address: `${req.body.district}, ${req.body.state}, ${req.body.address}`,
        city: req.body.district,
        state: req.body.state,
        areaPinCode: req.body.pin,
        amount: req.body.SubTotal,
        products: req.body.cart,
        status: "Initiate",
        userId: req.userId,
      });
      await order.save();

      return res
        .status(200)
        .json({ success: true, error: "Order placed,Successfully" });
      // return res.status(200).json({ status: "Order Initiated" })
    } catch (error) {
      return res.status(401).json({ success: false, error: error.message });
    }
  }
};

// function makeid(length) {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

export default connectDB(Auth(handler));
