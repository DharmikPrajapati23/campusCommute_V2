// src/components/Footer.jsx

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left Section - About */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Campus Commute</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Safe, convenient and eco-friendly transportation across campus.
            Getting you where you need to be, on time.
          </p>
        </div>

        {/* Right Section - Contact & Social */}
        <div className="md:w-1/2 md:text-right">
          <p className="text-sm text-gray-400">
            <a href="mailto:transport@ganpatUniversity.edu" className="hover:text-white">
              transport@ganpatUniversity.edu
            </a>{" "}
            |{" "}
            <a href="tel:+911234567890" className="hover:text-white">
              +91 123 456 7890
            </a>
          </p>

          <div className="flex md:justify-end space-x-4 mt-3">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          Designed by Dharmik Prajapati for a better campus experience.
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Campus Commute. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


// // src/components/Footer.jsx

// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // For social media icons

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12 px-6">
//       {" "}
//       {/* Changed background to dark gray */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Section 1: Campus Transportation Info */}
//         <div className="col-span-1">
//           <h3 className="text-xl font-bold mb-4">Campus Commute</h3>
//           <p className="text-sm text-gray-300 leading-relaxed">
//             {" "}
//             {/* Adjusted text color for better contrast */}
//             Your reliable partner for safe, convenient, and eco-friendly
//             transportation across campus. Committed to getting you where you
//             need to be, on time, every time.
//           </p>
//         </div>

//         {/* Section 2: Quick Links */}
//         <div className="col-span-1">
//           <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <a
//                 href="/routes"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Routes & Schedules
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/booking"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Book a Ride
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/faq"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 FAQs
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/contact"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Contact Us
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/about"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 About Us
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Section 3: Services */}
//         <div className="col-span-1">
//           <h3 className="text-xl font-bold mb-4">Our Services</h3>
//           <ul className="space-y-2">
//             <li>
//               <a
//                 href="/shuttle-service"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Campus Shuttle
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/on-demand"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 On-Demand Rides
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/accessibility"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Accessible Transport
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/event-transport"
//                 className="text-gray-300 hover:text-white transition-colors duration-300"
//               >
//                 Event Transport
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Section 4: Contact & Social */}
//         <div className="col-span-1">
//           <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
//           <p className="text-sm text-gray-300 mb-4">
//             Email:{" "}
//             <a
//               href="mailto:alok@gmail.com"
//               className="hover:underline"
//             >
//               transport@ganpatUniversity.edu
//             </a>
//             <br />
//             Phone:{" "}
//             <a href="tel:+918238871505" className="hover:underline">
//               +91 123 456 7890
//             </a>
//             <br />
//             Office: Campus Admin Building, Ground Floor
//           </p>

//           <div className="flex space-x-4 mt-4">
//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-300"
//             >
//               {" "}
//               {/* Adjusted icon color */}
//               <FaFacebook size={24} />
//             </a>
//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-300"
//             >
//               <FaTwitter size={24} />
//             </a>
//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-300"
//             >
//               <FaInstagram size={24} />
//             </a>
//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-300"
//             >
//               <FaLinkedin size={24} />
//             </a>
//           </div>
//         </div>
//       </div>
    
//       <div className="text-center mt-12 pt-8 border-t border-gray-700">
//         {" "}
       
//         <p className="text-sm text-gray-400">
//           &copy; {new Date().getFullYear()} Campus Commute. All rights reserved.
//         </p>{" "}
       
//         <p className="text-xs text-gray-500 mt-1">
//           Designed by Dharmik & Alok with{" "}
//           <span role="img" aria-label="heart">
//             ❤️
//           </span>{" "}
//           for a better campus experience.
//         </p>{" "}
       
//       </div>
//     </footer>
//   );
// };

// export default Footer;