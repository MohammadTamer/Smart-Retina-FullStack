"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GoogleOAuthProvider clientId="1034034926384-ibgqfm7c88fvimjis0u3ljmo34vps2ts.apps.googleusercontent.com">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
}