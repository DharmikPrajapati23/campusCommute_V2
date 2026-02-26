import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const AdminAuthGuard = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        // ✅ Send admin_token manually since axiosInstance uses "token" by default
        await api.get("/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsVerified(true);
      } catch {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return isVerified ? children : null;
};

export default AdminAuthGuard;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/axiosInstance';
// import { BASE_URL } from '../utils/constants';
// import { removeUser } from '../utils/userSlice';

// const AdminAuthGuard = ({ children }) => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const adminToken = localStorage.getItem('adminToken');
//         // If no user in Redux store or no admin token, redirect to login
//         if (!user && !adminToken) {
//           navigate('/admin/login');
//           return;
//         }

//         // Verify token with backend
//         const response = await api.get(`/admin/verify`);

//         if (!response.data.success) {
//           // Token is invalid, clear user and redirect
//           dispatch(removeUser());
//           navigate('/admin/login');
//         }
//       } catch (error) {
//         console.error('Auth verification failed:', error);
//         // Clear user and redirect to login on any error
//         dispatch(removeUser());
//         navigate('/admin/login');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, [user, dispatch, navigate]);

//   // Show loading spinner while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   // If user is authenticated, render the protected content
//   return children;
// };

// export default AdminAuthGuard;