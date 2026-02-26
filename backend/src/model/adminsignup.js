const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // ✅ Removed isStrongPassword validator — bcrypt hash would fail it
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Use JWT_SECRET from env, not hardcoded "Alok@123"
adminSchema.methods.getJWT = async function () {
  const admin = this;
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

adminSchema.methods.validatePassword = async function (passwordInputByAdmin) {
  const admin = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByAdmin,
    admin.password
  );
  return isPasswordValid;
};

module.exports = mongoose.model("Admin", adminSchema);



// const mongoose = require("mongoose")
// const validator = require("validator")
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt')
// const fs = require("fs");
// const path = require("path");


// const adminSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       validate(value) {
//         if (!validator.isStrongPassword(value)) {
//           throw new Error("Password must be stronger.");
//         }
//       },
//     },
//     // secretkey: {
//     //   type: String,
//     //   required: true,
//     //   default: "Admin@5657",
//     // },
//     name: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true}
// );



// adminSchema.methods.getJWT = async function () {
//   const admin = this;

//   const token = await jwt.sign({ id: admin.id }, "Alok@123", {
//     expiresIn: "7d",
//   });

//   return token;
// };

// adminSchema.methods.validatePassword = async function (passwordInputByAdmin) {
//   const admin = this;
//   const passwordHash = admin.password;
// console.log(admin, "  ", passwordHash)

//   const isPasswordValid = await bcrypt.compare(
//     passwordInputByAdmin,
//     passwordHash
//   );

//   return isPasswordValid;
// };


// module.exports = mongoose.model("Admin", adminSchema);