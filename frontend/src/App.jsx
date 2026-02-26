// src/App.jsx
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import Body from "./pages/Body";
import About from "./pages/About";
import ApplyPass from "./pages/ApplyPass";
import Help from "./pages/Help";
import Chat from "./pages/Chat";
import ViewPass from "./pages/ViewPass";
import Admin_Home from "./admin_pages/Admin_Home";
import Admin_Login from "./admin_pages/Admin_Login";
import Manage_Bus from "./admin_pages/Manage_Bus";
import Manage_Students from "./admin_pages/Manage_Students";
import Manage_College from "./admin_pages/Manage_College";
import AdminAuthGuard from "./components/AdminAuthGuard";
import FloatingChatbot from "./pages/FloatingChatbot";
import { addUser } from "./utils/userSlice";

import { useNavigate } from "react-router-dom";
import { setNavigator } from "./utils/navigationHelper";


const AppRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Register navigate for axiosInstance interceptor
    setNavigator(navigate);

    // Rehydrate user from localStorage on refresh
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      try {
        dispatch(addUser(JSON.parse(storedUser)));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [navigate, dispatch]);


// // Small wrapper so we can use hooks with Provider
// const AppRoutes = () => {
//   const dispatch = useDispatch();

//   // Rehydrate user from localStorage on every refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (storedUser && token) {
//       try {
//         dispatch(addUser(JSON.parse(storedUser)));
//       } catch {
//         // bad JSON -> clear
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//       }
//     }
//   }, [dispatch]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Body />
              <FloatingChatbot />
            </>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="applypass" element={<ApplyPass />} />
          <Route path="help" element={<Help />} />
          <Route path="chat" element={<Chat />} />
          <Route path="viewpass" element={<ViewPass />} />
        </Route>

        <Route path="/admin/login" element={<Admin_Login />} />

        <Route
          path="/admin/home"
          element={
            <AdminAuthGuard>
              <Admin_Home />
            </AdminAuthGuard>
          }
        />
        <Route
          path="/admin/bus-management"
          element={
            <AdminAuthGuard>
              <Manage_Bus />
            </AdminAuthGuard>
          }
        />
        <Route
          path="/admin/student-details"
          element={
            <AdminAuthGuard>
              <Manage_Students />
            </AdminAuthGuard>
          }
        />
        <Route
          path="/admin/college-details"
          element={
            <AdminAuthGuard>
              <Manage_College />
            </AdminAuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={appStore}>
    <AppRoutes />
  </Provider>
);

export default App;


// import "./App.css";
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import { Provider } from "react-redux";
// import appStore from "./utils/appStore";
// import Homepage from "./pages/Homepage";
// import Body from "./pages/Body";
// import About from "./pages/About";
// import ApplyPass from "./pages/ApplyPass";
// import Help from "./pages/Help";
// import Chat from "./pages/Chat";
// // import Admin from "./pages/Admin";
// import ViewPass from "./pages/ViewPass";
// import BusPassDownload from "./pages/ViewPass"; 
// import Admin_Home from './admin_pages/Admin_Home';
// import Admin_Login from './admin_pages/Admin_Login';
// import Manage_Bus from './admin_pages/Manage_Bus';
// import Manage_Students from './admin_pages/Manage_Students';
// import Manage_College from './admin_pages/Manage_College';
// import AdminAuthGuard from './components/AdminAuthGuard';
// import FloatingChatbot from './pages/FloatingChatbot';

// const App = () => {
//   return (
//     <Provider store={appStore}>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={
//             <>
//               <Body />
//               <FloatingChatbot />
//             </>
//           }>
//             <Route index element={<Homepage />} /> {/* Default route */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/applypass" element={<ApplyPass />} />
//             <Route path="/help" element={<Help />} />
//             <Route path="/chat" element={<Chat />} />
//             <Route path="/viewpass" element={<BusPassDownload />} />
//           </Route>
//           <Route path="/admin/login" element={<Admin_Login />} />
//           <Route path="/admin/home" element={
//             <AdminAuthGuard>
//               <Admin_Home />
//             </AdminAuthGuard>
//           } />
//           <Route path="/admin/bus-management" element={
//             <AdminAuthGuard>
//               <Manage_Bus />
//             </AdminAuthGuard>
//           } />
//           <Route path="/admin/student-details" element={
//             <AdminAuthGuard>
//               <Manage_Students />
//             </AdminAuthGuard>
//           } />
//           <Route path="/admin/college-details" element={
//             <AdminAuthGuard>
//               <Manage_College />
//             </AdminAuthGuard>
//           } />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// export default App;