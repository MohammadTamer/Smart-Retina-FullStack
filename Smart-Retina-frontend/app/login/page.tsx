"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

// --- Define the Validation Schema with Zod ---
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the type from the schema so TypeScript knows what our data looks like
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth() as any; // Get login function from AuthContext

  // ---  Setup useForm ---
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePassword = () => setShowPassword(!showPassword);

  // --- Handle Form Submission ---
  const onSubmit = async (data: LoginFormData) => {
    // console.log("Form Data Submitted:", data);
    setLoginError(null);
    try {
      // fastAPI OAuth2 expects Form Data (x-www-form-urlencoded) and the field name 'username'
      const formData = new FormData();
      formData.append("username", data.email);
      formData.append("password", data.password);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const userRole = res.data.user_role || "patient";
      await login(res.data.access_token, userRole);

    } catch (error: any) {
      console.error("Login Failed:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.detail) {
        setLoginError(error.response.data.detail);
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#152066] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 relative overflow-hidden transition-colors duration-300">

      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-5xl h-[600px] bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl flex overflow-hidden relative z-10">

        {/* LEFT SIDE: Branding */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-start p-12 relative bg-gradient-to-br from-[#152066] to-[#2563eb] text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              AI-Powered <br /> <span className="text-cyan-300">Precision.</span>
            </h2>
            <p className="text-blue-100/80 text-lg font-light leading-relaxed max-w-sm">
              Log in to access your dashboard, manage patient scans, and utilize our deep learning diagnostic tools.
            </p>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className={"w-full md:w-1/2 bg-white dark:bg-slate-900 flex flex-col justify-center p-8 md:p-12 relative transition-colors duration-300 " + (loginError ? 'overflow-y-scroll scrollbar-hide' : '')}>

          <Link href="/" className={"absolute top-5 left-8 text-gray-500 hover:text-[#152066] flex items-center text-sm font-medium transition "}>
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className={"max-w-md w-full mx-auto space-y-8 mt-6" + (loginError ? " mt-24 " : "")}>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#1e293b] dark:text-blue-100">Welcome Back</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Please enter your details to sign in.</p>
            </div>
            {/* --- Backend Error Display --- */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
                {loginError}
              </div>
            )}
            {/* --- FORM START --- */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Email Field */}
              <div>
                <div className="relative group">
                  <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.email ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-700 outline-none transition-all placeholder:text-gray-400 text-gray-700 dark:text-slate-200
                      ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"}
                    `}
                  />
                </div>
                {/* Error Message */}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative group">
                  <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${errors.password ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:bg-white dark:focus:bg-slate-700 outline-none transition-all placeholder:text-gray-400 text-gray-700 dark:text-slate-200
                      ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"}
                    `}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {/* Error Message */}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                  Remember me
                </label>
                {/* <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Forgot Password?
                </a> */}
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#152066] hover:bg-[#1e2b85] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : "Sign In"}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 dark:text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-200 dark:border-slate-800"></div>
            </div>


            <GoogleLoginButton />

            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-bold ml-1 hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;