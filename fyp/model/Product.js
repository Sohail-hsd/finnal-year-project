const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    availableQty: { type: Number, required: true },
    rating: { type: Number, default: 3 },
    sellQty: { type: Number, default: 0 },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // This userId is Refrencing 'User' collection.
        ref: 'Admin',
        required:true
    },

}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)