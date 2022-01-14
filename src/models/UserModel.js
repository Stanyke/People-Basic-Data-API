const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    providerId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    timestamp: { type: Number, required: true },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
  }
);

// Used when the user object need to be destructured as in ...user._doc
// instead use ...user.toJSON()
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.__v;

  return userObject;
};

const user = model("User", UserSchema);
module.exports = user;
