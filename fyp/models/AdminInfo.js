const mongoose = require('mongoose');

const AdminInfoSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId, // This adminId is Refrencing 'Admin' collection.
        ref: 'Admin',
        required:true
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    areaPinCode: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    phone: { type: String, required: true },

}, { timestamps: true });

export default mongoose.models.AdminInfo || mongoose.model('AdminInfo', AdminInfoSchema)