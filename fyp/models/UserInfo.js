const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // This userId is Refrencing 'User' collection.
        ref: 'User',
        required:true
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    areaPinCode: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    phone: { type: String, required: true },

}, { timestamps: true });

export default mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema)