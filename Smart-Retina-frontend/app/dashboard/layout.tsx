import ProtectedRoute from "@/components/ProtectedRoute";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Only users with the "patient" role can see what's inside
        <ProtectedRoute allowedRoles={["patient"]}>

            {children}

        </ProtectedRoute>
    );
}