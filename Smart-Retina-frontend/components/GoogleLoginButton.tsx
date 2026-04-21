"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext"; // <--- Import Context

interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  user_role: string;
}

export default function GoogleLoginButton() {
  const { login } = useAuth() as any; // <--- Get login from context

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/google`, {
          token: tokenResponse.access_token,
        });

        // Delegate everything to the Context!
        await login(res.data.access_token, res.data.user_role);

      } catch (error: any) {
        console.error("Login Failed:", error.response?.data || error.message);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <div className="flex justify-center">
      <button
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
        onClick={() => googleLogin()}
      >
        <FcGoogle className="text-xl" />
        <span>Google account</span>
      </button>
    </div>
  );
}