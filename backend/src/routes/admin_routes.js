const express = require("express");
const router = express.Router();

// ✅ Logout is now stateless — token lives in localStorage client-side
// Kept as a route so frontend can call it without errors
router.post("/admin/logout", (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { adminAuth } = require('../middleware/admin_auth');
// const { FRONTEND_URL } = require('../../config');


// // Admin logout route
// router.post('/admin/logout', adminAuth, (req, res) => {
//   try {
//     // Clear the admin token cookie using the same attributes used when setting it
//     // Use the same path, sameSite and secure flags so the browser recognizes and removes it
//     res.clearCookie('token_admin', {
//       path: '/',
//       httpOnly: true,
//       sameSite: 'lax',
//       secure: process.env.NODE_ENV === 'production'
//     });
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Logged out successfully' 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Logout failed', 
//       error: error.message 
//     });
//   }
// });

// // Support GET logout (useful for top-level navigation so SameSite=lax cookies are sent)
// router.get('/logout', adminAuth, (req, res) => {
//   try {
//     res.clearCookie('token_admin', {
//       path: '/',
//       httpOnly: true,
//       sameSite: 'lax',
//       secure: process.env.NODE_ENV === 'production'
//     });

//     const frontendLogin = `${FRONTEND_URL}/admin/login`;
//     // If client expects HTML, redirect to frontend login page so user sees login UI
//     if (req.accepts('html')) {
//       return res.redirect(frontendLogin);
//     }

//     res.status(200).json({ success: true, message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
//   }
// });


// router.get('/admin/logout', (req, res) => {
//   try {
//     res.clearCookie('token_admin', {
//       path: '/',
//       httpOnly: true,
//       sameSite: 'lax',
//       secure: process.env.NODE_ENV === 'production'
//     });

//   const frontendLogin = `${FRONTEND_URL}/admin/login`;
//   return res.redirect(frontendLogin);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
//   }
// });

// module.exports = router;