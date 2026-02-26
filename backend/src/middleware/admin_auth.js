const jwt = require("jsonwebtoken");
const Admin = require("../model/adminsignup");

const adminAuth = async (req, res, next) => {
  try {
    // ✅ Read from Authorization header, same pattern as userAuth
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "Please Login!" });
    }

    // ✅ Use JWT_SECRET from env, not hardcoded string
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findOne({ id: decodedObj.id });
    if (!admin) {
      throw new Error("Admin not found");
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "ERROR: " + err.message });
  }
};

module.exports = { adminAuth };


// const jwt = require("jsonwebtoken");
// const Admin = require("../model/adminsignup"); // Fixed import path

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token_admin } = req.cookies;
//     if (!token_admin) {
//       return res.status(401).send("Please Login!");
//     }

//     const decodedObj = jwt.verify(token_admin, "Alok@123"); // Use the same secret as in model

//     const { id } = decodedObj; // Fixed field name to match JWT payload

//     const admin = await Admin.findOne({ id: id }); // Fixed to use Admin model
//     if (!admin) {
//       throw new Error("Admin not found");
//     }

//     req.admin = admin; // Fixed to use admin instead of user
//     next();
//   } catch (err) {
//     res.status(400).send("ERROR: " + err);
//   }
// };

// module.exports = {
//   adminAuth,
// };