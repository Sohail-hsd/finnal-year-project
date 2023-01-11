const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // This userId is Refrencing 'Admin' collection.
        ref: 'User',
        required:true
    },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    orderID: { type: String, required: true, unique: true },
    transactionID: { type: String },
    paymentInfo: { type: String, default: '' },
    products: { type: Object, required: true }, // Object that will store all the order products.
    address: { type: String, required: true },
    apartment: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    amount: { type: Number },
    status: { type: String, default: 'Pending', required: true },
    deliveryStatus: { type: String, default: 'unshipped', required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)