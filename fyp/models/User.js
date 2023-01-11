const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // userInfoId: { type: mongoose.Schema.Types.ObjectId, ref:"UserInfo" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, unique: true, require: true }, // (uniqure= false) for now.
  },
  { timestamps: true }
);

UserSchema.post("save", function () {
  console.log("Saved in", Date.now() - this.createdAt, "ms");
  return this._id;
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
