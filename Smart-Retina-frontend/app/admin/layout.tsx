import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Only users with the "doctor" role can see what's inside
        <ProtectedRoute allowedRoles={["doctor"]}>

            {children}

        </ProtectedRoute>
    );
}