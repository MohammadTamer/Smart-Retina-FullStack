"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const auth = useAuth();
  const router = useRouter();

  const user = auth?.user ?? null;
  const loading = auth?.loading ?? true;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        if (user.role === "doctor") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return null;
}