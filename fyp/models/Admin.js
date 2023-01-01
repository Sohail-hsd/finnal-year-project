const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema(
  {
    superAdminId: {
      type: mongoose.Schema.Types.ObjectId, // This SuperAdminId Refre to, which super admin add this admin user.
      ref: "SuperAdmin",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: "11222", unique: true },
  },
  { timestamps: true }
);

AdminUserSchema.post("save", function () {
  console.log("Saved in", Date.now() - this.createdAt, "ms");
  return this._id;
});

export default mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);
