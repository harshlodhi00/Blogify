const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {
  createTokenForUser,
  validateToken,
} = require("../services/authentication");

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

userDetailSchema.static(
  "matchPasswordAndCreateToken",
  async function (userEmail, userPassword) {
    const user = await this.findOne({ userEmail });
    if (!user) {
      throw new Error("User Not Found");
    }

    const userEnteredHashedPassword = createHmac("sha256", user.salt)
      .update(userPassword)
      .digest("hex");

    if (userEnteredHashedPassword === user.userPassword) {
      const token = createTokenForUser(user);
      return token;
    } else {
      throw new Error("Password Does Not Match");
    }
  }
);

const UserDetail = model("userDetail", userDetailSchema);

module.exports = UserDetail;
