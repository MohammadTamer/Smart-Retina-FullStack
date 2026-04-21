import { FaEye } from "react-icons/fa";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#152066] dark:bg-slate-950 text-white py-8 px-6 md:px-12 border-t-4 border-[#1e88e5] dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Side: Branding & Academic Info */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">

          {/* Logo */}
          <div className="flex items-center text-xl font-bold mr-0 md:mr-6 mb-4 md:mb-0">
            <FaEye className="mr-2 text-blue-400" /> Smart Retina
          </div>

          {/* Vertical Divider (Hidden on Mobile) */}
          <div className="hidden md:block w-px h-10 bg-blue-500/30 mr-6"></div>

          {/* Text Info */}
          <div className="flex flex-col">
            <span className="text-sm text-blue-100 font-medium tracking-wide">
              Faculty of Computer and Information Science
            </span>

            {/* السطر الجديد Bold */}
            <span className="text-sm text-blue-200 font-bold mt-1">
              Ain Shams University
            </span>

            <span className="text-xs text-blue-300 mt-1">
              Supervised by:{" "}
              <span className="text-white font-medium">
                Dr. Dina Elsayad
              </span>{" "}
              ,{" "}
              <span className="text-white font-medium">
                T.A. Manar Sultan
              </span>
            </span>
          </div>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-xs text-blue-400 font-light mt-2 md:mt-0">
          &copy; 2026 Smart Retina. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;