const mongoose = require('mongoose');

const SuperAdminUserSchema = new mongoose.Schema({
    // userInfoId: { type: mongoose.Schema.Types.ObjectId, ref:"UserInfo" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: {type:String, default:"11222", unique: true}
}, { timestamps: true });

SuperAdminUserSchema.post('save', function() {
    console.log('Saved in', Date.now() - this.createdAt, 'ms');
    return this._id
  });

export default mongoose.models.SuperAdminUser || mongoose.model("SuperAdminUser", SuperAdminUserSchema)