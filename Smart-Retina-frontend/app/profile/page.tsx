"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaCheckCircle, FaSignOutAlt, FaMoon } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logout } = useAuth() as any;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) return null;
  const isDark = mounted && theme === "dark";

  return (
    <ProtectedRoute allowedRoles={["patient", "doctor"]}>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-[#1e293b] dark:text-slate-200 transition-colors duration-300">
        <Navbar />

        <div className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[80vh]">
          
          <div className="w-full max-xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden max-w-xl transition-colors duration-300">
            
            {/* Header Background */}
            <div className="h-32 bg-[#19246c] dark:bg-slate-800 w-full transition-colors duration-300"></div>

            <div className="px-8 pb-10 flex flex-col items-center -mt-16">
              
              {/* Profile Avatar */}
              <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg border border-gray-100 dark:border-slate-800">
                <div className="w-full h-full rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-400 dark:text-blue-500">
                   {user.avatar_url ? (
                     <img src={user.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                   ) : (
                     <FaUserCircle size={80} />
                   )}
                </div>
              </div>

              {/* User Identity */}
              <div className="text-center mt-6">
                <h1 className="text-3xl font-extrabold text-[#152066] dark:text-blue-100">{user.full_name}</h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border 
                    ${user.role === 'doctor' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'}`}>
                      {user.role}
                   </span>
                   <span className="flex items-center gap-1 text-green-600 dark:text-green-500 text-xs font-bold">
                     <FaCheckCircle /> Verified Account
                   </span>
                </div>
              </div>

              {/* Account Details */}
              <div className="w-full mt-10 space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                       <FaEnvelope />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Address</p>
                       <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{user.email}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                       <FaIdBadge />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Account Details</p>
                       <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">Role: <span className="capitalize">{user.role}</span></p>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="w-full mt-4 border-t border-gray-100 dark:border-slate-800 pt-4 space-y-3">
                 
                 {/* Custom Animated Dark Mode Toggle */}
                 {mounted && (
                   <button 
                     onClick={() => setTheme(isDark ? "light" : "dark")}
                     className={`w-full relative flex items-center justify-between px-4 py-4 rounded-2xl border overflow-hidden transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-blue-500
                       ${isDark 
                         ? 'bg-slate-800/80 border-slate-700 shadow-[inset_0_0_20px_rgba(30,58,138,0.2)]' 
                         : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                       }`}
                   >
                     {/* Background Sweep Animation on Hover */}
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>

                     {/* Text & Icon Container */}
                     <div className="relative z-10 flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-sm transition-colors duration-500 ${isDark ? 'bg-slate-900 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                           <FaMoon className={isDark ? 'animate-pulse' : ''} />
                        </div>
                        <span className={`text-sm font-bold transition-colors duration-300 ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                          Dark Mode
                        </span>
                     </div>

                     {/* Animated Toggle Switch */}
                     <div className={`relative z-10 w-12 h-6 rounded-full transition-colors duration-500 flex items-center px-1 ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
                       <div 
                          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'translate-x-6' : 'translate-x-0'}`} 
                       />
                     </div>
                   </button>
                 )}

                 <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold border border-red-100 dark:border-red-900/50 hover:bg-red-600 dark:hover:bg-red-700 hover:text-white transition duration-300 shadow-sm text-sm"
                 >

                    <FaSignOutAlt /> Sign Out
                 </button>
              </div>

            </div>
          </div>

        </div>

        <Footer />
      </main>
    </ProtectedRoute>
  );
};

export default ProfilePage;
