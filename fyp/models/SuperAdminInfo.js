const mongoose = require('mongoose');

const SuperAdminInfoSchema = new mongoose.Schema({
    SuperAdminId: {
        type: mongoose.Schema.Types.ObjectId, // This SuperAdminId is Refrencing 'Admin' collection.
        ref: 'SuperAdmin',
        required:true
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    areaPinCode: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    phone: { type: String, required: true },

}, { timestamps: true });

export default mongoose.models.SuperAdminId || mongoose.model('SuperAdminId', SuperAdminInfoSchema)