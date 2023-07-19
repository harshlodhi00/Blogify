const { Schema , model} = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userDetailSchema = new Schema(
  {
    userFullName: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      require: true,
    },
    userPassword: {
      type: String,
      require: true,
    },
    profileImgURL: {
      type: String,
      default: "/images/user_default.avif",
    },
  },
  { timestamps: true }
);

userDetailSchema.pre("save", function (next) {
  const user = this;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.userPassword)
    .digest("hex");
    this.userPassword = hashedPassword;
    this.salt = salt;
    next();
});

const UserDetail = model("userDetail", userDetailSchema);

module.exports = UserDetail;
